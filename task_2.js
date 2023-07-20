const getSumNumbersAndStrings = (str) => {
 if (!isNaN(Number(str))) return new Error("expected string with numbers");

 const splittingNumbersLetters = numbersLettersSplitting(str);
 let resultNumber = 0;
 let resultArray = [];

 splittingNumbersLetters.forEach((el, index) => {
  const previousElement = splittingNumbersLetters[index - 1];
  const nextElement = splittingNumbersLetters[index + 1];

  if (isLetter(el)) {
   resultArray.push(convertStrToNum(el) * (nextElement ?? 1));
  } else if (isLetter(previousElement) && !isLetter(el)) {
   //skip the element
  } else {
   resultArray.push(Number(el));
  }
 });
 resultArray.forEach((el, index) => {
  const isEvenItem = index % 2 === 0;
  isEvenItem ? (resultNumber += el) : (resultNumber -= el);
 });
 return resultNumber;
};

const numbersLettersSplitting = (str) => {
 return str.match(/[a-z]+|[0-9]+/g);
};

const convertStrToNum = (str) => {
 let result = "";
 let alphabet = " abcdefghijklmnopqrstuvwxyz";
 for (let i = 0; i < str.length; i++) {
  result += alphabet.indexOf(str[i]);
 }
 return result;
};

const isLetter = (str) => {
 if (str === undefined) return false;
 return /[a-z]/.test(str);
};

console.log(getSumNumbersAndStrings("32bk56c890f"));
console.log(getSumNumbersAndStrings("1a3b2a"));
