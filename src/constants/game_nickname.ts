// game-url.ts
export const GameURL = {
  AOV: "aov",
  COD: "cod",
  FF: "ff",
  GI: "gi",
  HI: "hi",
  HSR: "hsr",
  ML: "ml",
  PB: "pb",
  SUS: "sus",
  VALO: "valo",
  ZZZ: "zzz",
} as const;

export type GameURLType = typeof GameURL[keyof typeof GameURL];

export const VALUE_TO_GAME_URL: Record<string, GameURLType> = {
  "arena-of-valor": GameURL.AOV,
  "call-of-duty-mobile": GameURL.COD,
  "free-fire": GameURL.FF,
  "genshin-impact": GameURL.GI,
  "honkai-impact-3": GameURL.HI,
  "honkai-star-rail": GameURL.HSR,
  "mobile-legends": GameURL.ML,
  "point-blank": GameURL.PB,
  "super-sus": GameURL.SUS,
  "valorant": GameURL.VALO,
  "zenless-zone-zero": GameURL.ZZZ,
};
