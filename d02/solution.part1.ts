const text = await Deno.readTextFile("./input.txt");
function toCharCodeRelative(a: string, b: string) {
  return a.charCodeAt(0) - b.charCodeAt(0);
}

function resultPoints(left: string, right: string) {
  return [3, 0, 6].at(
    toCharCodeRelative(left, "A") -
      toCharCodeRelative(right, "X"),
  ) ?? (() => {
    throw new Error("Incorrect data");
  })();
}

function pickPoints(right: string) {
  return toCharCodeRelative(right, "X") + 1;
}

const result = text.split("\n")
  .map((a) => a.split(" "))
  .reduce(
    (prev, [left, right]) =>
      prev + resultPoints(left, right) + pickPoints(right),
    0,
  );

console.log(result);
