/** Mantém apenas os dígitos do CPF. */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Formata para 000.000.000-00, tolerando entrada parcial (usado no input). */
export function formatCpf(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

/** Valida os dois dígitos verificadores do CPF. */
export function isValidCpf(value: string): boolean {
  const d = onlyDigits(value);
  if (d.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(d)) return false;

  for (const [length, position] of [
    [9, 10],
    [10, 11],
  ]) {
    let sum = 0;
    for (let i = 0; i < length; i++) sum += Number(d[i]) * (position - i);
    const check = (sum * 10) % 11 % 10;
    if (check !== Number(d[length])) return false;
  }
  return true;
}

/**
 * O Supabase Auth autentica por e-mail, então o CPF vira um e-mail interno
 * estável. O CPF real fica na tabela `students`.
 */
export function cpfToAuthEmail(cpf: string): string {
  return `${onlyDigits(cpf)}@cpf.linguas.eprof.app`;
}
