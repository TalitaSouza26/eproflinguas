# eProf Línguas — especificação do quiz

Referência de produto. Toda tela e toda geração de questão devem obedecer ao que está aqui.

## Produto

- Módulo separado do eprof.app, repositório e banco próprios.
- Público: alunos do Ensino Fundamental I e II. Disciplina: inglês.
- Cadastro independente: nome, CPF, senha e ano escolar.
- Trilha de quizzes organizada por faixa escolar. Cada quiz tem 10 questões.

## Faixas escolares

| Faixa | Diretriz de conteúdo |
| --- | --- |
| 1º–2º | Vocabulário mais simples. |
| 3º–5º | Ampliação de vocabulário e combinação de formatos. |
| 6º–7º | Questões mais variadas. |
| 8º–9º | Mais peso em completar frase e contexto. |

## Fluxo da questão

1. Uma pergunta por vez. Nada de várias questões na mesma tela.
2. Progresso sempre visível: `Pergunta 3 de 10` + barra.
3. A barra avança por questão concluída, não por acerto — ela indica posição, não desempenho.
4. Não é possível voltar. Confirmou e avançou, a resposta está encerrada.
5. Selecionar uma alternativa não envia nada. O envio é o clique em "Confirmar resposta".
6. "Confirmar resposta" nasce desabilitado e só ativa com uma alternativa selecionada.
7. Antes de confirmar, o aluno troca de alternativa livremente.
8. Feedback imediato e na própria tela. Sem modal.
9. Acerto: alternativa correta em verde + ✓ + mensagem curta ("Muito bem! House significa casa.").
10. Erro: escolha do aluno em vermelho + ×, correta em verde + ✓, mensagem acolhedora ("Quase! House significa casa."). Nunca "Você errou" nem linguagem punitiva.
11. Depois de confirmar, as alternativas ficam travadas e o CTA vira "Continuar".
12. Explicação de uma frase. O quiz não vira aula entre questões.

## Acessibilidade e movimento

- Estado nunca é comunicado só por cor: verde acompanha ✓, vermelho acompanha ×.
- O card inteiro da alternativa é clicável, não apenas o radio.
- Animação mínima: uma microinteração curta no feedback, nada de celebração longa.
- Pergunta, alternativas, dica e CTA mantêm posição fixa entre questões — nada "pula".

## Bubo

- Assistente, não protagonista. No desktop, ocupa uma área lateral de apoio.
- Posição estável; mudam expressão, pose e mensagem — nunca o layout.
- Estados: neutro (respondendo), dica, acerto, erro.
- Não substitui o feedback textual, complementa.

## Dica

- Opcional e acionada pelo aluno; nunca aberta por padrão.
- Não entrega a resposta. Ajuda a recuperar o conhecimento.
  Ex.: para *house* — "Pense no lugar onde uma família mora."

## Alternativas

- Quatro cards clicáveis com estados: default, hover, selected, correct, incorrect.

## Geração por IA

- Respeita a faixa escolar em vocabulário, extensão da frase, complexidade e formato.
- Exatamente uma alternativa objetivamente correta. Nunca duas semanticamente válidas.
- Distratores plausíveis. Nada de opção absurda só para completar quatro.
- Sem pegadinhas: verifica inglês, não interpretação capciosa do enunciado.
- Idioma previsível: instrução da interface em português, conteúdo em inglês conforme o objetivo pedagógico.
- Toda questão carrega um `topic`, que alimenta o "o que praticar mais" do resultado.

## Formatos de questão

A interface é construída sobre um union de formatos para aceitar novos sem reescrita:

- `word_meaning` — palavra → significado (em uso hoje).
- `meaning_word` — significado → palavra.
- `sentence_gap` — completar frase (peso maior nas faixas maiores).
- `image_word` — imagem → palavra (previsto no modelo, fora do fluxo atual).

Áudio de pronúncia é um slot opcional por questão (`audioText`).

## Resultado

- Tela própria ao fim das 10 questões. Nunca devolver o aluno direto à Home.
- Prioriza aprendizagem, não competição: "8 de 10 respostas corretas" + os tópicos que precisam de mais prática.
- Próximo passo explícito: voltar ao início, refazer o quiz ou continuar a trilha.
- A trilha avança independentemente da nota. Não há nota mínima nem reprovação.

## Identidade visual

- Moderno e limpo, com a clareza do Duolingo, porém mais maduro e menos infantil.
- Gamificação contida: sem moedas, sem chuva de estrelas, sem efeitos lúdicos que desviem da aprendizagem.
- Tipografia: Manrope.
- Paleta: dois azuis como base + laranja de apoio.

## Navegação

- Menu lateral: Início, Quizzes, Conquistas, Configurações, Sair.
- Sem "Meu progresso" (vive na Home) e sem "Perfil" (vive em Configurações).
- Home: "Continue sua trilha", resumo de progresso enxuto e progresso por trilha em barras. Sem gráfico de evolução.
- Login: duas colunas — branding com Bubo de um lado, formulário do outro.

## Acesso

- **Não existe autocadastro.** O aluno é cadastrado pela escola no painel administrativo; a tela de login não oferece "criar conta".
- Login por CPF + senha. O Supabase Auth autentica por um e-mail interno derivado do CPF (`<cpf>@cpf.linguas.eprof.app`); o CPF real vive em `students`.
- Erro de login é sempre genérico ("CPF ou senha incorretos"), para não revelar quais CPFs existem na base.
- "Esqueceu sua senha?" permanece na tela e precisa de um fluxo próprio.

## Decisões da tela de quiz (mock revisado)

O mock enviado divergia da especificação em quatro pontos; o que vale é:

- **Sem botão "Anterior".** O mock trazia um; prevalece a regra 4 (não voltar).
- **Fluxo Confirmar → feedback → Continuar.** O mock ia direto para "Próxima"; prevalece o feedback imediato.
- **Imagens entram no fluxo agora** (`image_word`), com acervo local em `public/quiz/`.
- **Sem seletor de idioma** no topo do quiz: o produto é só de inglês.

Layout: quiz centralizado, com "Voltar", título, barra de progresso laranja e o card branco. A dica do Bubo aparece como botão dentro do card (não em rail lateral), preservando a centralização pedida.

## Trilhas, fases e progressão

### Estrutura

- **Trilha** = campo semântico (tema). **Fase** = um quiz de 10 questões dentro da trilha.
- Ordem fixa das trilhas, do mais próximo da vida da criança para a estrutura da língua:

  1. Casa e família
  2. Escola
  3. Animais
  4. Cores e números
  5. Comida
  6. Verbos do dia a dia
  7. Frases simples

  Campos semânticos primeiro; gramática depois. "Vocabulário" deixou de ser trilha — ele é o que todas as primeiras trilhas ensinam.

### Tamanho da trilha por faixa

O número de fases acompanha a faixa escolar, para a trilha não virar maratona para os menores:

| Faixa | Fases por trilha | Questões até fechar |
| --- | --- | --- |
| 1º–2º | 4 | 40 |
| 3º–5º | 6 | 60 |
| 6º–7º | 8 | 80 |
| 8º–9º | 10 | 100 |

### Regras de progressão

- **Concluir uma fase** = responder as 10 questões. A nota não trava nada: não há reprovação nem nota mínima.
- A **fase seguinte** abre ao concluir a atual.
- A **trilha seguinte** abre quando a atual chega a 100% das fases.
- Refazer uma fase já concluída é sempre permitido.
- Progresso da trilha = `fases concluídas ÷ fases da trilha`.

### Como isso aparece na Home

Trilhas bloqueadas ficam **visíveis, com cadeado e 0%** — o aluno enxerga o caminho à frente sem poder pular etapas.

Isso muda o mock aprovado da Home, que mostrava quatro trilhas com progresso simultâneo (75%, 60%, 40%, 20%). Com trava em 100%, o estado real é: trilhas anteriores em 100%, a atual com progresso parcial, as seguintes em 0% com cadeado.

### Impacto no banco

- `tracks` ganha `position` (já existe) e passa a valer como ordem obrigatória.
- Nova tabela de progresso por aluno e trilha: fases concluídas e se está desbloqueada.
- `quiz_attempts` passa a guardar o número da fase.

## Origem das questões (decisão revista)

As questões **vivem no banco**. A geração por IA em tempo de execução, cogitada antes, foi descartada: tira latência da frente do aluno, elimina o custo por quiz e acaba com o risco de inglês errado sem revisão.

O conteúdo é gerado a partir de `src/lib/quiz/curriculum.ts` pelo script `npm run seed:generate`, que escreve `supabase/seed.sql`. Para mudar conteúdo, edita-se o currículo e roda-se o script — nunca o SQL à mão.

## Patente e insígnias

São dois conceitos independentes. O modelo anterior — cinco categorias, cada uma subindo por cinco tiers — foi descartado por misturar os dois.

### Patente

O nível do aluno. **Um trilho só, medido em palavras aprendidas.** Conta como aprendida a palavra acertada ao menos uma vez numa fase concluída.

| Patente | Palavras |
| --- | --- |
| Bronze I | 20 |
| Bronze II | 50 |
| Prata | 100 |
| Ouro | 200 |
| Diamante | 400 |

A escada é uma lista ordenada em `src/lib/patente.ts`: novos níveis entram acrescentando itens ao fim, sem tocar em tela nenhuma.

### Insígnias

Conquistas avulsas espalhadas pelo percurso, cada uma com sua condição. **Ganha-se uma vez e pronto — não têm níveis.** Quem sobe é a patente.

As não conquistadas ficam **visíveis, em cinza e com a condição à mostra**: o aluno precisa saber o que dá para perseguir.

| Insígnia | Condição |
| --- | --- |
| Primeiro passo | Concluir o primeiro quiz |
| Maratonista | Aprender 30 palavras em um dia |
| De volta | Entrar 2 dias seguidos |
| Persistente | Refazer um quiz |
| Sem erro | Acertar as 10 questões de uma fase |
| Fogo aceso | Estudar 7 dias seguidos |
| Trilha completa | Terminar todas as fases de uma trilha |
| Conversador | Concluir um quiz de diálogo (depende de conteúdo que ainda não existe) |
