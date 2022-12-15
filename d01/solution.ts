const text = await Deno.readTextFile("./input.txt");

const topElvesSum = text
  .split("\n\n")
  .map((a) =>
    a.split("\n")
      .map((a) => parseInt(a))
      .reduce((a, b) => a + b, 0)
  ).map((calories, index) => ({ calories, index }))
  .sort((a, b) => (a.calories < b.calories ? 1 : -1))
  .slice(0, 3).reduce((a, b) => a + b.calories, 0);

console.log(topElvesSum);
