import { GameURLType, VALUE_TO_GAME_URL } from "@/constants/game_nickname";

export function getGameUrlFromValue(value: string): GameURLType | "" {
  return VALUE_TO_GAME_URL[value] ?? "";
}
