export interface NameWithKana {
  kanji: string;
  kana: string;
  hepburn: string;
}

export interface JapanesePersonInterface {
  firstNameWithKana(sex?: "male" | "female"): NameWithKana;
  lastNameWithKana(): NameWithKana;
}
