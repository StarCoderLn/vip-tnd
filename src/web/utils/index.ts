const add = (x: number, y: number) => {
  return x + y;
};

const multiply = (x: number, y: number) => {
  return x * y;
};

const diminish = (x: number, y: number) => {
  return x - y;
};

const divide = (x: number, y: number) => {
  return Math.floor(x / y);
};

export {
  add,
  multiply,
  diminish,
  divide
};
