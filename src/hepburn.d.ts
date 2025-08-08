declare module "hepburn" {
  export function fromKana(kana: string): string;
  export function toHiragana(romaji: string): string;
  export function toKatakana(romaji: string): string;
  export function cleanRomaji(romaji: string): string;
  export function splitKana(kana: string): string[];
  export function splitRomaji(romaji: string): string[];
  export function containsHiragana(text: string): boolean;
  export function containsKatakana(text: string): boolean;
  export function containsKana(text: string): boolean;
  export function containsKanji(text: string): boolean;
}
