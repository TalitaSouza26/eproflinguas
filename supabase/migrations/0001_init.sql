-- eProf Línguas — schema inicial.
--
-- As questões vivem no banco: nada é gerado em tempo de execução.
-- Conteúdo (trilhas, fases, questões, alternativas, insígnias) é público para
-- alunos autenticados. Progresso é privado de cada aluno e só o servidor escreve.

create type grade_band as enum ('1-2', '3-5', '6-7', '8-9');
create type question_format as enum ('word_meaning', 'meaning_word', 'sentence_gap', 'image_word');

-- ---------------------------------------------------------------- aluno

-- O login é por CPF: o Supabase Auth usa um e-mail interno derivado do CPF,
-- e o CPF real fica aqui. Não há autocadastro — a escola cria o aluno.
create table students (
  id uuid primary key references auth.users on delete cascade,
  name text not null,
  cpf char(11) not null unique,
  school_year smallint not null check (school_year between 1 and 9),
  band grade_band not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- conteúdo

-- Trilha = campo semântico. `position` é a ordem obrigatória dentro da faixa.
create table tracks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  band grade_band not null,
  position smallint not null,
  unique (band, position)
);

-- Fase = um quiz de 10 questões dentro da trilha.
create table phases (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references tracks on delete cascade,
  number smallint not null check (number > 0),
  title text not null,
  format question_format not null,
  unique (track_id, number)
);

create table questions (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references phases on delete cascade,
  position smallint not null check (position between 1 and 10),
  format question_format not null,
  topic text not null,
  prompt text not null,
  prompt_translation text,
  image_url text,
  audio_text text,
  explanation text not null,
  hint text,
  unique (phase_id, position),
  -- Questão de imagem sem imagem não renderiza.
  constraint image_question_has_image check (format <> 'image_word' or image_url is not null)
);

create table question_choices (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references questions on delete cascade,
  position smallint not null check (position between 1 and 4),
  label text not null,
  is_correct boolean not null default false,
  unique (question_id, position)
);

-- Exatamente uma alternativa correta por questão. É a regra pedagógica mais
-- importante do produto, então vive como índice, não só como validação no app.
create unique index one_correct_choice_per_question
  on question_choices (question_id)
  where is_correct;

-- ---------------------------------------------------------------- insígnias

create table badges (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references phases on delete cascade unique,
  name text not null,
  description text not null,
  image_url text not null
);

create table student_badges (
  student_id uuid not null references students on delete cascade,
  badge_id uuid not null references badges on delete cascade,
  earned_at timestamptz not null default now(),
  primary key (student_id, badge_id)
);

-- ---------------------------------------------------------------- progresso

-- Quantas fases o aluno fechou em cada trilha. O desbloqueio da trilha
-- seguinte é derivado daqui, não gravado.
create table student_track_progress (
  student_id uuid not null references students on delete cascade,
  track_id uuid not null references tracks on delete cascade,
  completed_phases smallint not null default 0,
  updated_at timestamptz not null default now(),
  primary key (student_id, track_id)
);

create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students on delete cascade,
  phase_id uuid not null references phases on delete cascade,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  correct_count smallint not null default 0
);

create index quiz_attempts_student_idx on quiz_attempts (student_id, started_at desc);

create table attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references quiz_attempts on delete cascade,
  question_id uuid not null references questions on delete cascade,
  chosen_choice_id uuid references question_choices on delete set null,
  is_correct boolean not null,
  answered_at timestamptz not null default now(),
  unique (attempt_id, question_id)
);

-- ---------------------------------------------------------------- RLS

alter table students enable row level security;
alter table tracks enable row level security;
alter table phases enable row level security;
alter table questions enable row level security;
alter table question_choices enable row level security;
alter table badges enable row level security;
alter table student_badges enable row level security;
alter table student_track_progress enable row level security;
alter table quiz_attempts enable row level security;
alter table attempt_answers enable row level security;

-- Cadastro: cada aluno enxerga só o próprio.
create policy "aluno lê o próprio cadastro" on students
  for select using (auth.uid() = id);
create policy "aluno atualiza o próprio cadastro" on students
  for update using (auth.uid() = id);

-- Conteúdo: leitura liberada para autenticados. A escrita é do painel
-- administrativo, que usa service role e passa por fora do RLS.
create policy "conteúdo é legível por autenticados" on tracks
  for select to authenticated using (true);
create policy "conteúdo é legível por autenticados" on phases
  for select to authenticated using (true);
create policy "conteúdo é legível por autenticados" on badges
  for select to authenticated using (true);

-- Questões e alternativas: mesma regra. Note que `is_correct` fica visível
-- ao cliente; é aceitável porque a correção acontece no servidor e a
-- pontuação gravada não vem do navegador.
create policy "conteúdo é legível por autenticados" on questions
  for select to authenticated using (true);
create policy "conteúdo é legível por autenticados" on question_choices
  for select to authenticated using (true);

-- Progresso: leitura só do próprio aluno. Escrita não tem policy de propósito
-- — só o servidor grava, com service role, para o navegador não poder
-- inventar acertos nem desbloquear trilha.
create policy "aluno lê o próprio progresso" on student_track_progress
  for select using (auth.uid() = student_id);
create policy "aluno lê as próprias insígnias" on student_badges
  for select using (auth.uid() = student_id);
create policy "aluno lê as próprias tentativas" on quiz_attempts
  for select using (auth.uid() = student_id);
create policy "aluno lê as próprias respostas" on attempt_answers
  for select using (
    exists (
      select 1 from quiz_attempts a
      where a.id = attempt_answers.attempt_id and a.student_id = auth.uid()
    )
  );
