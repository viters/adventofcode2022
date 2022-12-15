import { pipe } from "https://deno.land/x/compose@1.3.5/index.js";
const text = await Deno.readTextFile("./input.txt");

const rucksacks = text.split("\n");

function getPriority(char: string) {
  const code = char.charCodeAt(0);
  if (code >= "a".charCodeAt(0)) {
    return code - "a".charCodeAt(0) + 1;
  } else {
    return code - "A".charCodeAt(0) + 27;
  }
}

const bits = [1, 2, 4];

function getCommonItem(sacks: string[]): string {
  let common = null;
  const map = new Map<string, number>();
  for (let i = 0; i < sacks.length; i++) {
    for (const item of sacks[i].split("")) {
      const val = (map.get(item) ?? 0) | bits[i];
      if (val === 7) {
        /*
          Only one item can be common among three sacks,
          so if we find it (1 | 2 | 4 = 7), we do not need
          to search through rest.
         */
        common = item;
        break;
      }
      map.set(item, val);
    }
    /*
      There is no need to break there, as we always
      need to look through all three sacks.
     */
  }
  if (common == null) {
    throw new Error("Did not find common item");
  }
  return common;
}

const prioritiesSum = (() => {
  let sum = 0;
  for (let i = 0; i < rucksacks.length; i = i + 3) {
    sum += pipe(
      [rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]],
      getCommonItem,
      getPriority,
    );
  }
  return sum;
})();

console.log(
  prioritiesSum,
);
