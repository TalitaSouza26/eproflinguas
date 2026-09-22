/**
 * Apaga o fundo claro da ilustração, preservando as partes claras internas.
 *
 * Um corte por limiar simples abriria buracos nas páginas brancas do livro.
 * Aqui o preenchimento parte das bordas e só avança por pixels contíguos
 * parecidos com o fundo, então o que está cercado de desenho fica intacto.
 */
import sharp from "sharp";

const input = process.argv[2];
const output = process.argv[3];
const tolerance = Number(process.argv[4] ?? 38);

const img = sharp(input).ensureAlpha();
const { width, height } = await img.metadata();
const data = await img.raw().toBuffer();

const idx = (x, y) => (y * width + x) * 4;

// Cor de referência: média dos quatro cantos.
const corners = [
  [2, 2],
  [width - 3, 2],
  [2, height - 3],
  [width - 3, height - 3],
];
const bg = [0, 1, 2].map(
  (c) => corners.reduce((sum, [x, y]) => sum + data[idx(x, y) + c], 0) / corners.length,
);

const near = (i) =>
  Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]) <
  tolerance * 3;

const seen = new Uint8Array(width * height);
const queue = [];

for (let x = 0; x < width; x++) {
  queue.push([x, 0], [x, height - 1]);
}
for (let y = 0; y < height; y++) {
  queue.push([0, y], [width - 1, y]);
}

let cleared = 0;
while (queue.length) {
  const [x, y] = queue.pop();
  if (x < 0 || y < 0 || x >= width || y >= height) continue;

  const p = y * width + x;
  if (seen[p]) continue;
  seen[p] = 1;

  const i = p * 4;
  if (!near(i)) continue;

  data[i + 3] = 0;
  cleared++;
  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

// Suaviza a borda: pixels vizinhos de transparente ganham alfa parcial.
const alphaCopy = new Uint8Array(width * height);
for (let p = 0; p < width * height; p++) alphaCopy[p] = data[p * 4 + 3];

for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const p = y * width + x;
    if (alphaCopy[p] === 0) continue;
    const viz = [p - 1, p + 1, p - width, p + width].filter((n) => alphaCopy[n] === 0).length;
    if (viz > 0) data[p * 4 + 3] = Math.round(255 * (1 - viz / 5));
  }
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(output);

console.log(
  `${output}: ${cleared} pixels apagados de ${width * height} (${((cleared / (width * height)) * 100).toFixed(1)}%)`,
);
