const text = await Deno.readTextFile("./input.txt");

function toCharCodeRelative(a: string, b: string) {
  return a.charCodeAt(0) - b.charCodeAt(0);
}

function toSpace(a: number) {
  return [0, 1, 2, 0, 1, 2].at(a) ?? (() => {
    throw "Incorrect data";
  })();
}

function resultPoints(right: string) {
  return toCharCodeRelative(right, "X") * 3;
}

/*
1 B 0 X = A 0
1 B 1 Y = B 1
1 B 2 Z = C 2

0 A 0 X = C 2
0 A 1 Y = A 0
0 A 2 Z = B 1

2 C 0 X = B 1
2 C 1 Y = C 2
2 C 2 Z = A 0

(LEFT + RIGHT - 1) and in space [0, 2]
 */
function pickPoints(left: string, right: string) {
  return toSpace(
    toCharCodeRelative(left, "A") + toCharCodeRelative(right, "X") - 1,
  ) + 1;
}

const result = text.split("\n")
  .map((a) => a.split(" "))
  .reduce(
    (prev, [left, right]) =>
      prev + resultPoints(right) + pickPoints(left, right),
    0,
  );

console.log(result);
