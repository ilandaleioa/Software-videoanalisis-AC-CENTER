// Genera códigos de activación para la versión completa de la herramienta.
// Uso:  node generar-codigo.mjs [cantidad]
// Entrega cada CÓDIGO a la persona usuaria y pega su HUELLA en la lista ACFC_LIC_HASHES
// del bloque «ACFC · LICENCIA» del HTML. El código en claro no se guarda en ningún sitio.
import { createHash, randomInt } from "node:crypto";

const SAL = "acfc-lezama-talks|";                       // debe coincidir con el HTML
const ABC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";         // sin O/0, I/1 para evitar confusiones
const n = Math.max(1, parseInt(process.argv[2] || "1", 10));

for (let i = 0; i < n; i++) {
  const g = () => Array.from({ length: 4 }, () => ABC[randomInt(ABC.length)]).join("");
  const codigo = `${g()}-${g()}-${g()}`;
  const huella = createHash("sha256").update(SAL + codigo.replace(/[^A-Z0-9]/g, "")).digest("hex");
  console.log(`${codigo}   "${huella}",`);
}
