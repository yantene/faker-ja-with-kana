# faker-ja-with-kana

A Japanese name extension for Faker.js that provides Japanese names with kanji, kana (hiragana), and Hepburn romanization.

## Installation

```bash
npm install faker-ja-with-kana
```

## Usage

### Direct Import of fakerJA

If you want to use only the Japanese name generator without importing other modules, you can directly import `fakerJA`:

```typescript
import { fakerJA } from 'faker-ja-with-kana';

// Generate Japanese names
const firstName = fakerJA.person.firstNameWithKana();
const lastName = fakerJA.person.lastNameWithKana();
console.log(firstName, lastName);
```

### Basic Usage with fakerJA

```typescript
import { fakerJA } from 'faker-ja-with-kana';

// Use fakerJA directly - person module is already replaced with Japanese names
const firstName = fakerJA.person.firstNameWithKana();
console.log(firstName);
// Output: { kanji: "太郎", kana: "たろう", hepburn: "TARO" }

const lastName = fakerJA.person.lastNameWithKana();
console.log(lastName);
// Output: { kanji: "田中", kana: "たなか", hepburn: "TANAKA" }

// Generate gender-specific names
const maleName = fakerJA.person.firstNameWithKana('male');
const femaleName = fakerJA.person.firstNameWithKana('female');
```

### Custom Faker Instance

```typescript
import { faker } from '@faker-js/faker';
import { createFakerJA } from 'faker-ja-with-kana';

// Create a custom fakerJA instance
const myFakerJA = createFakerJA(faker);

const fullName = {
  first: myFakerJA.person.firstNameWithKana('female'),
  last: myFakerJA.person.lastNameWithKana()
};

console.log(`${fullName.last.kanji} ${fullName.first.kanji}`);
```

### Standalone Japanese Person Module

```typescript
import { faker } from '@faker-js/faker';
import { createJapanesePerson } from 'faker-ja-with-kana';

// Create standalone Japanese person module
const jpPerson = createJapanesePerson(faker);

const firstName = jpPerson.firstNameWithKana();
const lastName = jpPerson.lastNameWithKana();
```

### Advanced Usage

```typescript
import { faker } from '@faker-js/faker';
import { JapanesePerson } from 'faker-ja-with-kana';

// Direct instantiation
const jpPerson = new JapanesePerson(faker);

// Generate full name
const fullName = {
  first: jpPerson.firstNameWithKana('female'),
  last: jpPerson.lastNameWithKana()
};

console.log(`${fullName.last.kanji} ${fullName.first.kanji}`);
console.log(`${fullName.last.kana} ${fullName.first.kana}`);
console.log(`${fullName.last.hepburn} ${fullName.first.hepburn}`);
```

## Features

- **Authentic Japanese Names**: Uses real Japanese name data with kanji and kana readings
- **Gender-specific Generation**: Generate male or female names, or random selection
- **Multiple Formats**: Returns kanji, hiragana kana, and Hepburn romanization (uppercase)
- **Phonological Accuracy**: Applies proper Japanese phonological changes in romanization:
  - Consonant changes: `np` → `mp`, `nb` → `mb`, `nm` → `mm`
  - Long vowel simplification: `uu` → `u`, `ou` → `o`, `oo` → `o`, `ee` → `e`, `aa` → `a`
  - Examples: ようこ → YOKO, ゆうた → YUTA, しゅうへい → SHUHEI, しょうへい → SHOHEI, いいだ → IIDA

## API

### `firstNameWithKana(sex?: 'male' | 'female'): NameWithKana`

Generates a Japanese first name with kanji, kana, and Hepburn romanization.

- `sex` (optional): Specify 'male' or 'female' to generate gender-specific names. If not specified, randomly selects from both male and female names.

### `lastNameWithKana(): NameWithKana`

Generates a Japanese last name (family name) with kanji, kana, and Hepburn romanization.

### `NameWithKana` Interface

```typescript
interface NameWithKana {
  kanji: string;    // Japanese kanji characters
  kana: string;     // Japanese hiragana reading
  hepburn: string;  // Hepburn romanization
}
```

## Data Source

This package uses Japanese name data from the included data files:
- `family_name.dat` - Japanese family names
- `male_given_name.dat` - Japanese male given names  
- `female_given_name.dat` - Japanese female given names

Each name entry contains both the kanji representation and the corresponding hiragana reading.

## Dependencies

- `@faker-js/faker` - The core Faker.js library
- `hepburn` - For converting hiragana to Hepburn romanization

## Data

- Data source: Wikidata (CC0-1.0)
- Data files: Data files in the `data/` directory

## License

- Code: MIT License
- Name data: Wikidata, CC0-1.0 License0