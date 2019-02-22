module.exports = () => {
  let numbers = [];
  for (var i = 0; i < 4; i++) {
    numbers.push(Math.floor(Math.random() * 100));
  }
  return numbers;
}