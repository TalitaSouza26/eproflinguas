/**
 * Gera `supabase/seed.sql` a partir do currículo tipado.
 *
 *   npm run seed:generate
 *
 * Escrever 200 questões e 800 alternativas à mão seria inviável e frágil.
 * Aqui elas saem das listas de palavras, sempre com as mesmas regras:
 * quatro alternativas, uma correta, distratores do mesmo campo semântico.
 *
 * O arquivo gerado é commitado: os UUIDs ficam estáveis entre execuções
 * porque vêm de um hash do identificador lógico, não de um sorteio.
 */
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { CURRICULUM, PHASE_PLAN, type Word } from "../src/lib/quiz/curriculum.ts";

const BAND = "1-2";
const QUESTIONS_PER_PHASE = 10;
const CHOICES = 4;

/** UUID determinístico: mesma chave lógica, mesmo id em toda geração. */
function uuid(key: string): string {
  const h = createHash("sha1").update(key).digest("hex");
  return [h.slice(0, 8), h.slice(8, 12), h.slice(12, 16), h.slice(16, 20), h.slice(20, 32)].join("-");
}

function sql(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "number") return String(value);
  return `'${value.replace(/'/g, "''")}'`;
}

/** Sorteio determinístico, para o seed não mudar a cada execução. */
function pick<T>(items: T[], count: number, key: string): T[] {
  const scored = items
    .map((item, i) => ({ item, score: createHash("sha1").update(`${key}:${i}`).digest("hex") }))
    .sort((a, b) => a.score.localeCompare(b.score));
  return scored.slice(0, count).map((s) => s.item);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const BADGE_LEVEL = ["Descobridor", "Explorador", "Leitor", "Mestre"];
const BADGE_DESCRIPTION = [
  "Reconheceu as primeiras palavras pela imagem.",
  "Reconheceu o segundo bloco de palavras.",
  "Leu e compreendeu as palavras em inglês.",
  "Dominou o vocabulário da trilha.",
];

const lines: string[] = [
  "-- GERADO por scripts/generate-seed.mts. Não edite à mão:",
  "-- altere src/lib/quiz/curriculum.ts e rode `npm run seed:generate`.",
  "",
  "begin;",
  "",
  "delete from question_choices;",
  "delete from questions;",
  "delete from badges;",
  "delete from phases;",
  "delete from tracks;",
  "",
];

let questionCount = 0;
const missingImages: string[] = [];

for (const track of CURRICULUM) {
  const trackId = uuid(`track:${track.slug}`);
  const allWords = [...track.blocks[0], ...track.blocks[1]];

  lines.push(
    `-- ${track.title}`,
    "insert into tracks (id, slug, title, band, position) values",
    `  (${sql(trackId)}, ${sql(track.slug)}, ${sql(track.title)}, ${sql(BAND)}, ${track.position});`,
    "",
  );

  for (const plan of PHASE_PLAN) {
    const phaseId = uuid(`phase:${track.slug}:${plan.number}`);
    const words = track.blocks[plan.block];

    lines.push(
      "insert into phases (id, track_id, number, title, format) values",
      `  (${sql(phaseId)}, ${sql(trackId)}, ${plan.number}, ${sql(plan.title)}, ${sql(plan.format)});`,
      "",
      "insert into badges (id, phase_id, name, description, image_url) values",
      `  (${sql(uuid(`badge:${track.slug}:${plan.number}`))}, ${sql(phaseId)}, ` +
        `${sql(`${BADGE_LEVEL[plan.number - 1]} de ${track.title}`)}, ` +
        `${sql(BADGE_DESCRIPTION[plan.number - 1])}, ${sql("/badges/insignia-padrao.webp")});`,
      "",
    );

    // 10 questões para 8 palavras: as duas primeiras voltam no fim, com as
    // alternativas em outra ordem. Blocos de 10 itens não repetem nada.
    const sequence: Word[] = [];
    for (let i = 0; i < QUESTIONS_PER_PHASE; i++) sequence.push(words[i % words.length]);

    const questionRows: string[] = [];
    const choiceRows: string[] = [];

    sequence.forEach((word, i) => {
      const position = i + 1;
      const questionId = uuid(`question:${track.slug}:${plan.number}:${position}`);
      const isImage = plan.format === "image_word";

      if (isImage && !word.image) missingImages.push(word.en);

      const prompt = isImage ? "What is this?" : capitalize(word.en);
      const promptTranslation = isImage ? "O que é isto?" : null;
      const imageUrl = isImage ? (word.image ?? `/quiz/${word.en}.webp`) : null;

      questionRows.push(
        `  (${sql(questionId)}, ${sql(phaseId)}, ${position}, ${sql(plan.format)}, ` +
          `${sql(track.title)}, ${sql(prompt)}, ${sql(promptTranslation)}, ${sql(imageUrl)}, ` +
          `${sql(word.en)}, ${sql(`${capitalize(word.en)} significa ${word.pt}.`)}, null)`,
      );

      // Distratores do mesmo campo semântico: outras palavras da própria trilha.
      const others = allWords.filter((w) => w.en !== word.en);
      const distractors = pick(others, CHOICES - 1, `${questionId}:distractors`);
      const options = pick([word, ...distractors], CHOICES, `${questionId}:order`);

      options.forEach((option, j) => {
        const label = isImage ? capitalize(option.en) : option.pt;
        choiceRows.push(
          `  (${sql(uuid(`choice:${questionId}:${j}`))}, ${sql(questionId)}, ${j + 1}, ` +
            `${sql(label)}, ${option.en === word.en})`,
        );
      });

      questionCount++;
    });

    lines.push(
      "insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values",
      questionRows.join(",\n") + ";",
      "",
      "insert into question_choices (id, question_id, position, label, is_correct) values",
      choiceRows.join(",\n") + ";",
      "",
    );
  }
}

lines.push("commit;", "");

writeFileSync("supabase/seed.sql", lines.join("\n"), "utf8");

const uniqueMissing = [...new Set(missingImages)];
console.log(`seed.sql gerado: ${CURRICULUM.length} trilhas, ${CURRICULUM.length * 4} fases, ${questionCount} questões.`);
if (uniqueMissing.length) {
  console.log(`\nFaltam ${uniqueMissing.length} imagens (o caminho já está no banco):`);
  console.log(uniqueMissing.map((w) => `  /quiz/${w}.webp`).join("\n"));
}
