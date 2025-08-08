import type { Faker } from "@faker-js/faker";
import * as hepburn from "hepburn";
import type { NameData } from "./data-loader";
import {
  loadFamilyNames,
  loadFemaleGivenNames,
  loadMaleGivenNames,
} from "./data-loader";
import type { JapanesePersonInterface, NameWithKana } from "./types";

export class JapanesePerson implements JapanesePersonInterface {
  private faker: Faker;

  constructor(faker: Faker) {
    this.faker = faker;
  }

  /**
   * Apply phonological changes to romanized text
   * np => mp, nb => mb, nm => mm
   * Also handles long vowels: uu => u, ou => o, ee => e, oo => o, aa => a
   */
  private applyPhonologicalChanges(romaji: string): string {
    return (
      romaji
        // Consonant changes
        .replace(/np/gi, "mp")
        .replace(/nb/gi, "mb")
        .replace(/nm/gi, "mm")
        // Long vowel simplification
        .replace(/uu/gi, "u")
        .replace(/ou/gi, "o")
        .replace(/oo/gi, "o")
        .replace(/ee/gi, "e")
        .replace(/aa/gi, "a")
    );
  }

  /**
   * Convert kana to hepburn romanization with phonological changes
   */
  private convertToHepburn(kana: string): string {
    const basicRomaji = hepburn.fromKana(kana);
    return this.applyPhonologicalChanges(basicRomaji).toUpperCase();
  }

  /**
   * Public method for testing phonological changes
   * @internal - For testing purposes only
   */
  public testPhonologicalChanges(romaji: string): string {
    return this.applyPhonologicalChanges(romaji);
  }

  firstNameWithKana(sex?: "male" | "female"): NameWithKana {
    let names: NameData[];

    if (sex === "male") {
      names = loadMaleGivenNames();
    } else if (sex === "female") {
      names = loadFemaleGivenNames();
    } else {
      // If no sex specified, randomly choose between male and female names
      const isMale = this.faker.datatype.boolean();
      names = isMale ? loadMaleGivenNames() : loadFemaleGivenNames();
    }

    const randomName = this.faker.helpers.arrayElement<NameData>(names);

    return {
      kanji: randomName.kanji,
      kana: randomName.kana,
      hepburn: this.convertToHepburn(randomName.kana),
    };
  }

  lastNameWithKana(): NameWithKana {
    const names = loadFamilyNames();
    const randomName = this.faker.helpers.arrayElement<NameData>(names);

    return {
      kanji: randomName.kanji,
      kana: randomName.kana,
      hepburn: this.convertToHepburn(randomName.kana),
    };
  }
}
