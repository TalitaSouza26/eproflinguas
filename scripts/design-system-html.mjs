/**
 * Gera `docs/design-system.html` a partir de `docs/design-system.tokens.json`.
 *
 * É o arquivo que vai para quem monta o produto fora deste repositório — hoje,
 * em Bubble. Uma página só, sem dependência de rede além da fonte, que abre com
 * dois cliques e não pede login.
 *
 * Existe como script, e não como HTML escrito à mão, porque os valores mudam:
 * gerar garante que a página nunca discorde dos tokens. Depois de mexer no
 * JSON, rode `node scripts/design-system-html.mjs`.
 */
import { readFileSync, writeFileSync } from "node:fs";

const tokens = JSON.parse(readFileSync("docs/design-system.tokens.json", "utf8"));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** O tema único do produto. */
const TEMA = tokens.color.themes[0].id;

/** Resolve o valor de uma cor, seguindo apelido de outro token quando houver. */
function hex(token, todos) {
  const bruto = typeof token.value === "string" ? token.value : token.value[TEMA];
  const apelido = /^\{(.+)\}$/.exec(bruto);
  if (!apelido) return bruto.toUpperCase();
  const alvo = todos.find((t) => t.name === apelido[1]);
  return alvo ? hex(alvo, todos) : bruto;
}

/** O grupo de um token é o nome sem o último pedaço: cabecalho-fundo → cabecalho. */
const grupoDe = (nome) => nome.replace(/-[^-]+$/, "");

const TITULOS = {
  cabecalho: "Cabeçalho",
  "menu-aberto": "Menu aberto",
  conteudo: "Conteúdo",
  destaque: "Destaque",
  acao: "Ação",
  acerto: "Acerto",
  erro: "Erro",
  texto: "Texto",
};

/** Cor de texto legível sobre a amostra, para escrever o hex dentro dela. */
function tintaSobre(valor) {
  const m = /^#([0-9a-f]{6})$/i.exec(valor);
  if (!m) return "#111827";
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  // Luminância relativa simplificada: decide preto ou branco por cima.
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.6 ? "#111827" : "#ffffff";
}

const cores = tokens.color.tokens;
const grupos = [];
for (const t of cores) {
  const g = grupoDe(t.name);
  let bloco = grupos.find((x) => x.chave === g);
  if (!bloco) grupos.push((bloco = { chave: g, titulo: TITULOS[g] ?? g, itens: [] }));
  bloco.itens.push(t);
}

const linhasCor = grupos
  .map(
    (g) => `
      <section class="grupo">
        <h3>${esc(g.titulo)}</h3>
        <div class="cores">
          ${g.itens
            .map((t) => {
              const v = hex(t, cores);
              return `
            <article class="cor">
              <button class="amostra" data-copiar="${esc(v)}" style="background:${esc(v)};color:${tintaSobre(v)}">
                <span>${esc(v)}</span>
                <span class="copiar">copiar</span>
              </button>
              <p class="onde">${esc(t.usage ?? "")}</p>
            </article>`;
            })
            .join("")}
        </div>
      </section>`,
  )
  .join("");

const estilos = tokens.type.groups[0].styles;
const linhasTipo = estilos
  .map(
    (s) => `
      <tr>
        <th scope="row">${esc(s.name)}</th>
        <td class="num">${esc(s.fontSize)}</td>
        <td class="num">${esc(s.fontWeight)}</td>
        <td class="num">${esc(s.lineHeight)}</td>
        <td class="amostra-texto" style="font-size:${esc(s.fontSize)};font-weight:${esc(
          s.fontWeight,
        )};line-height:${esc(s.lineHeight)}${
          s.letterSpacing ? `;letter-spacing:${esc(s.letterSpacing)};text-transform:uppercase` : ""
        }">Olá, João!</td>
      </tr>`,
  )
  .join("");

const tabelaSimples = (familia) =>
  familia.tokens
    .map(
      (t) => `
      <tr>
        <th scope="row">${esc(t.name)}</th>
        <td class="num">${esc(t.value)}</td>
        <td>${esc(t.usage ?? "")}</td>
      </tr>`,
    )
    .join("");

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>eProf Línguas — design system</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap">
<style>
  :root {
    --tinta: #10192b;
    --tinta-fraca: #64748b;
    --linha: #e9eef5;
    --fundo: #ffffff;
    --papel: #f6f8fb;
    --marca: #0c2464;
    --destaque: #f97316;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Nunito, ui-sans-serif, system-ui, sans-serif;
    color: var(--tinta);
    background: var(--papel);
    line-height: 1.6;
  }
  .folha { max-width: 920px; margin: 0 auto; padding: 0 16px 80px; }

  header.capa {
    background: var(--marca);
    color: #fff;
    padding: 48px 0 40px;
    margin-bottom: 40px;
  }
  header.capa .folha { padding-bottom: 0; }
  header.capa h1 { font-size: 44px; line-height: 1.05; font-weight: 800; margin: 0; }
  header.capa p { margin: 10px 0 0; color: #d8e4fb; max-width: 60ch; }

  h2 {
    font-size: 24px;
    font-weight: 800;
    margin: 48px 0 6px;
    padding-top: 28px;
    border-top: 2px solid var(--linha);
  }
  h2:first-of-type { border-top: 0; padding-top: 0; margin-top: 0; }
  h2 + .sub { margin: 0 0 22px; color: var(--tinta-fraca); max-width: 70ch; }

  .grupo { margin: 26px 0 0; }
  .grupo h3 {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
    margin: 0 0 10px;
  }
  .cores { display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
  .cor { background: var(--fundo); border: 1px solid var(--linha); border-radius: 14px; overflow: hidden; }
  .amostra {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    border: 0;
    padding: 18px 14px;
    font: inherit;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    text-align: left;
  }
  .amostra .copiar { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; opacity: .65; }
  .amostra:hover .copiar { opacity: 1; }
  .amostra:focus-visible { outline: 3px solid #2f6bff; outline-offset: -3px; }
  .onde { margin: 0; padding: 12px 14px; font-size: 14px; color: #33415c; }

  table { width: 100%; border-collapse: collapse; background: var(--fundo); border: 1px solid var(--linha); border-radius: 14px; overflow: hidden; }
  th, td { text-align: left; padding: 12px 14px; border-top: 1px solid var(--linha); font-size: 14px; vertical-align: middle; }
  thead th { border-top: 0; background: var(--papel); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--tinta-fraca); }
  tbody th { font-weight: 800; white-space: nowrap; }
  .num { font-variant-numeric: tabular-nums; white-space: nowrap; }
  .amostra-texto { color: var(--marca); }
  .rolagem { overflow-x: auto; }

  .regras { display: grid; gap: 14px; }
  .regra { background: var(--fundo); border: 1px solid var(--linha); border-left: 4px solid var(--destaque); border-radius: 12px; padding: 16px 18px; }
  .regra h3 { margin: 0 0 4px; font-size: 16px; font-weight: 800; }
  .regra p { margin: 0; font-size: 14px; color: #33415c; }

  footer { margin-top: 56px; font-size: 13px; color: var(--tinta-fraca); }

  @media print {
    body { background: #fff; }
    header.capa { background: #fff; color: var(--marca); padding-top: 0; }
    header.capa p { color: var(--tinta-fraca); }
    .amostra .copiar { display: none; }
  }
</style>
</head>
<body>

<header class="capa">
  <div class="folha">
    <h1>eProf Línguas</h1>
    <p>Cores, tipografia e medidas do produto. Clique numa cor para copiar o código.</p>
  </div>
</header>

<main class="folha">

  <h2>Cores</h2>
  <p class="sub">
    O produto tem um tema só, azul. Os nomes dizem <strong>onde a cor é usada</strong>,
    não qual é a cor. Em Bubble, cada um vira uma cor nomeada em Styles.
  </p>
  ${linhasCor}

  <h2>Tipografia</h2>
  <p class="sub">
    <strong>Nunito</strong> para tudo, em dois pesos: 800 em títulos e enunciados,
    400 em corpo de texto. Nada entre os dois. Está no Google Fonts.
  </p>
  <div class="rolagem">
    <table>
      <thead>
        <tr><th>Estilo</th><th>Tamanho</th><th>Peso</th><th>Entrelinha</th><th>Amostra</th></tr>
      </thead>
      <tbody>${linhasTipo}</tbody>
    </table>
  </div>

  <h2>Espaçamento</h2>
  <p class="sub">Os cinco valores que o produto usa. Tudo é múltiplo de 4.</p>
  <div class="rolagem">
    <table>
      <thead><tr><th>Nome</th><th>Valor</th><th>Onde</th></tr></thead>
      <tbody>${tabelaSimples(tokens.spacing)}</tbody>
    </table>
  </div>

  <h2>Cantos</h2>
  <p class="sub">Raio grande em tudo. Quanto mais macia a forma, melhor para a mão de uma criança de 6 anos.</p>
  <div class="rolagem">
    <table>
      <thead><tr><th>Nome</th><th>Valor</th><th>Onde</th></tr></thead>
      <tbody>${tabelaSimples(tokens.radius)}</tbody>
    </table>
  </div>

  <h2>Quatro regras que não dá para deduzir olhando</h2>
  <p class="sub">São as que mais se quebram sem querer.</p>
  <div class="regras">
    <div class="regra">
      <h3>Texto cinza nunca vai sobre azul</h3>
      <p>O grupo Texto só existe sobre card branco. Sobre qualquer azul, use o grupo Cabeçalho. Esse é o erro mais fácil de cometer, e o resultado é ilegível.</p>
    </div>
    <div class="regra">
      <h3>Um laranja por tela</h3>
      <p>Laranja é a cor de “faça isto”. Se houver dois competindo na mesma tela, um está errado — a criança precisa saber onde tocar sem ler, e isso só funciona enquanto o laranja for raro. Azul é identidade e navegação; laranja é ação.</p>
    </div>
    <div class="regra">
      <h3>Acerto e erro nunca são só cor</h3>
      <p>A alternativa respondida sempre leva ícone e palavra junto: borda verde + sinal de confirmação + “Muito bem!”, ou borda vermelha + xis + “Quase!”. Verde e vermelho é o par que mais falha em daltonismo, e está na parte do produto que mais importa.</p>
    </div>
    <div class="regra">
      <h3>O quiz espera mais depois de um erro</h3>
      <p>Avança em 800&nbsp;ms depois de um acerto e 2600&nbsp;ms depois de um erro. O acerto o aluno já entendeu quando o card ficou verde; o erro é onde está o aprendizado, e uma criança de 6 anos não lê a explicação em um segundo.</p>
    </div>
  </div>

  <footer>
    eProf Línguas · documento gerado a partir dos tokens do produto.
  </footer>
</main>

<script>
  document.addEventListener("click", function (e) {
    var botao = e.target.closest("[data-copiar]");
    if (!botao) return;
    var valor = botao.getAttribute("data-copiar");
    var marca = botao.querySelector(".copiar");
    var antes = marca.textContent;
    function avisar(texto) {
      marca.textContent = texto;
      setTimeout(function () { marca.textContent = antes; }, 1200);
    }
    try {
      navigator.clipboard.writeText(valor).then(
        function () { avisar("copiado"); },
        function () { avisar(valor); }
      );
    } catch (err) {
      avisar(valor);
    }
  });
</script>

</body>
</html>
`;

writeFileSync("docs/design-system.html", html);
console.log("docs/design-system.html gerado:", tokens.color.tokens.length, "cores");
