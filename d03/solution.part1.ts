const text = await Deno.readTextFile("./input.txt");

const rucksacks = text.split("\n").map(
  (a) =>
    [
      Array.from(a.substring(0, Math.floor(a.length / 2))),
      Array.from(a.substring(Math.floor(a.length / 2))),
    ] as [string[], string[]],
);

function getPriority(char: string) {
  const code = char.charCodeAt(0);
  if (code >= "a".charCodeAt(0)) {
    return code - "a".charCodeAt(0) + 1;
  } else {
    return code - "A".charCodeAt(0) + 27;
  }
}

function findDuplicatees([left, right]: [string[], string[]]) {
  const duplicatees = new Set<string>();
  const map = new Map<string, boolean>();
  for (const item of left) {
    map.set(item, true);
  }
  for (const item of right) {
    if (map.has(item)) {
      duplicatees.add(item);
    }
  }
  return duplicatees;
}

const prioritiesSum = (() => {
  let sum = 0;
  for (const sack of rucksacks) {
    for (const duplicate of findDuplicatees(sack)) {
      sum += getPriority(duplicate);
    }
  }
  return sum;
})();

console.log(
  prioritiesSum,
);
