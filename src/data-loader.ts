import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface NameData {
  kanji: string;
  kana: string;
}

let familyNames: NameData[] | null = null;
let maleGivenNames: NameData[] | null = null;
let femaleGivenNames: NameData[] | null = null;

export function loadFamilyNames(): NameData[] {
  if (!familyNames) {
    familyNames = loadData("family_name.dat");
  }
  return familyNames;
}

export function loadMaleGivenNames(): NameData[] {
  if (!maleGivenNames) {
    maleGivenNames = loadData("male_given_name.dat");
  }
  return maleGivenNames;
}

export function loadFemaleGivenNames(): NameData[] {
  if (!femaleGivenNames) {
    femaleGivenNames = loadData("female_given_name.dat");
  }
  return femaleGivenNames;
}

function loadData(filename: string): NameData[] {
  const dataPath = join(__dirname, "..", "data", filename);
  const content = readFileSync(dataPath, "utf-8");
  const lines = content.trim().split("\n");
  return lines.map((line: string) => {
    const [kanji, kana] = line.split("\t");
    return { kanji: kanji.trim(), kana: kana.trim() };
  });
}
