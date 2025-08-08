import { faker as defaultFaker, type Faker } from "@faker-js/faker";
import { JapanesePerson } from "./japanese-person-module";
import type { JapanesePersonInterface } from "./types";

export type { JapanesePersonInterface } from "./types";
export { NameWithKana } from "./types";

export function createJapanesePerson(faker: Faker): JapanesePersonInterface {
  return new JapanesePerson(faker);
}

// For easier usage, provide the implementation class
export { JapanesePerson };

// Create a faker instance with Japanese person module
export function createFakerJA(
  baseFaker: Faker = defaultFaker,
): Faker & { person: JapanesePersonInterface } {
  const japanesePerson = new JapanesePerson(baseFaker);

  // Create a new faker instance that extends the base faker
  const fakerJA = Object.assign(
    Object.create(Object.getPrototypeOf(baseFaker)),
    baseFaker,
    {
      person: japanesePerson,
    },
  );

  return fakerJA as Faker & { person: JapanesePersonInterface };
}

// Default export: fakerJA instance with Japanese person module
export const fakerJA = createFakerJA();
