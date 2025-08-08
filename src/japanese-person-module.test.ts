import { faker } from "@faker-js/faker";
import { createJapanesePerson, type JapanesePerson } from "../src/index";

describe("JapanesePerson", () => {
  let jpModule: JapanesePerson;

  beforeEach(() => {
    jpModule = createJapanesePerson(faker) as JapanesePerson;
  });

  describe("firstNameWithKana", () => {
    it("should return a name with kanji, kana, and hepburn", () => {
      const name = jpModule.firstNameWithKana();

      expect(name).toHaveProperty("kanji");
      expect(name).toHaveProperty("kana");
      expect(name).toHaveProperty("hepburn");

      expect(typeof name.kanji).toBe("string");
      expect(typeof name.kana).toBe("string");
      expect(typeof name.hepburn).toBe("string");

      expect(name.kanji.length).toBeGreaterThan(0);
      expect(name.kana.length).toBeGreaterThan(0);
      expect(name.hepburn.length).toBeGreaterThan(0);
    });

    it("should return male given name when sex is specified as male", () => {
      const name = jpModule.firstNameWithKana("male");

      expect(name).toHaveProperty("kanji");
      expect(name).toHaveProperty("kana");
      expect(name).toHaveProperty("hepburn");
    });

    it("should return female given name when sex is specified as female", () => {
      const name = jpModule.firstNameWithKana("female");

      expect(name).toHaveProperty("kanji");
      expect(name).toHaveProperty("kana");
      expect(name).toHaveProperty("hepburn");
    });

    it("should return different names on multiple calls", () => {
      const names = new Set();
      for (let i = 0; i < 10; i++) {
        const name = jpModule.firstNameWithKana();
        names.add(name.kanji);
      }

      // Should have some variety (not all the same name)
      expect(names.size).toBeGreaterThan(1);
    });
  });

  describe("lastNameWithKana", () => {
    it("should return a family name with kanji, kana, and hepburn", () => {
      const name = jpModule.lastNameWithKana();

      expect(name).toHaveProperty("kanji");
      expect(name).toHaveProperty("kana");
      expect(name).toHaveProperty("hepburn");

      expect(typeof name.kanji).toBe("string");
      expect(typeof name.kana).toBe("string");
      expect(typeof name.hepburn).toBe("string");

      expect(name.kanji.length).toBeGreaterThan(0);
      expect(name.kana.length).toBeGreaterThan(0);
      expect(name.hepburn.length).toBeGreaterThan(0);
    });

    it("should return different family names on multiple calls", () => {
      const names = new Set();
      for (let i = 0; i < 10; i++) {
        const name = jpModule.lastNameWithKana();
        names.add(name.kanji);
      }

      // Should have some variety (not all the same name)
      expect(names.size).toBeGreaterThan(1);
    });
  });

  describe("hepburn romanization", () => {
    it("should correctly romanize hiragana names", () => {
      const name = jpModule.firstNameWithKana();

      // The hepburn field should be a valid romanization
      expect(name.hepburn).toMatch(/^[a-zA-Z\s]+$/);
    });

    it("should return uppercase romanization", () => {
      const firstName = jpModule.firstNameWithKana();
      const lastName = jpModule.lastNameWithKana();

      expect(firstName.hepburn).toBe(firstName.hepburn.toUpperCase());
      expect(lastName.hepburn).toBe(lastName.hepburn.toUpperCase());
    });

    it("should apply phonological changes", () => {
      // Test the phonological changes using the public test method
      const testCases = [
        // Consonant changes
        { input: "sanpuku", expected: "sampuku" }, // np => mp
        { input: "kinboshi", expected: "kimboshi" }, // nb => mb
        { input: "kinmoku", expected: "kimmoku" }, // nm => mm
        // Long vowel simplification
        { input: "youko", expected: "yoko" }, // ou => o
        { input: "yuuta", expected: "yuta" }, // uu => u
        { input: "shuuhei", expected: "shuhei" }, // uu => u
        { input: "shouhei", expected: "shohei" }, // ou => o
        { input: "tooru", expected: "toru" }, // oo => o
        { input: "iida", expected: "iida" }, // no change
        { input: "regular", expected: "regular" }, // no change
      ];

      testCases.forEach(({ input, expected }) => {
        const result = jpModule.testPhonologicalChanges(input);
        expect(result).toBe(expected);
      });
    });
  });
});
