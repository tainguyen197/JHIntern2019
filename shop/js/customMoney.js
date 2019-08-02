customMoney = number => {
  if (!isNaN(number)) {
    number = number
      .toString()
      .split("")
      .reverse();

    for (let i = 1, index = 1; i < number.length; i++) {
      if (index % 3 === 0) {
        number.splice(i, 0, ".");
        index = 1;
        i++;
      } else {
        index++;
      }
    }
    return number.reverse().join("");
  }
  return null;
};
