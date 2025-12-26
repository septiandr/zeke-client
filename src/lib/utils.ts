export function parseCountryFromName(name: string) {
  // ambil "(Brazil)" di akhir
  const m = name.match(/\s*\(([^)]+)\)\s*$/);
  const country = m ? m[1].trim() : null;
  const cleanName = m ? name.replace(/\s*\([^)]+\)\s*$/, "").trim() : name.trim();
  return { cleanName, country };
}
