# eProf Línguas

Módulo de quizzes de inglês para alunos do Ensino Fundamental I e II, do produto eProf.
Repositório e banco próprios, independentes do eprof.app.

> **Estado:** protótipo. As telas estão de pé, mas os dados ainda vêm de mocks em
> TypeScript — o Supabase não está conectado.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Supabase · zod

## Rodando

```bash
npm install
cp .env.example .env.local
npm run dev
```

Sem um Supabase configurado, o login roda em modo de desenvolvimento: **qualquer CPF**
com a senha definida em `LINGUAS_DEV_PASSWORD` (padrão `12345`) entra. Isso depende de
`LINGUAS_DEV_BYPASS_AUTH=1` **e** de `NODE_ENV` diferente de `production` — num deploy o
atalho não liga nem com a variável setada.

## Como o produto funciona

O aluno percorre **trilhas** temáticas em ordem obrigatória. Cada trilha tem **fases**, e
cada fase é um quiz de **10 questões**. Uma questão por vez, sem voltar: o aluno confirma
a resposta, recebe feedback imediato com a explicação, e segue. Ao terminar a trilha, a
seguinte é desbloqueada.

Em paralelo, **insígnias** por categoria (quizzes concluídos, dias seguidos, desempenho,
vocabulário, conversação) sobem de forma independente por cinco níveis: Bronze I,
Bronze II, Prata, Ouro e Diamante.

As regras completas estão em [`docs/spec-quiz.md`](docs/spec-quiz.md) e o conteúdo
pedagógico em [`docs/curriculo.md`](docs/curriculo.md). **Elas valem mais que o código:**
quando algo divergir, a especificação é a referência.

## Estrutura

| Caminho | O que é |
| --- | --- |
| `src/app/(app)/` | Telas do aluno: início, quizzes, conquistas |
| `src/app/login/` | Autenticação por CPF |
| `src/lib/tracks.ts` | Fonte única das trilhas, fases e desbloqueio |
| `src/lib/badges.ts` | Categorias de insígnia, tiers e progresso |
| `src/lib/quiz/curriculum.ts` | Léxico do 1º–2º ano, origem das questões |
| `scripts/generate-seed.mts` | Gera `supabase/seed.sql` a partir do currículo |
| `supabase/migrations/` | Schema do banco |
| `docs/` | Especificação de produto e currículo |

## Conteúdo do banco

As questões vivem no banco — nada é gerado em tempo de execução. Para alterá-las, edite
o currículo e regenere:

```bash
npm run seed:generate
```

O script produz 5 trilhas, 20 fases, 200 questões e 800 alternativas, garantindo em todas
elas quatro opções, exatamente uma correta e nenhuma repetida.

## Pendências conhecidas

- **Supabase não conectado.** Schema e seed prontos; falta credencial e a camada de leitura.
- **79 das 82 imagens das questões não existem.** O caminho já está no banco, então elas
  aparecem sozinhas quando os arquivos chegarem.
- **Questões sem dica.** `hint` está nulo de propósito: dica automática sairia genérica ou
  entregaria a resposta.
- **Falta a arte do tier Diamante** em `public/badges/`.
