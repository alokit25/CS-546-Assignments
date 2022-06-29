const questionOne = function questionOne(arr) {
  let equation = [];
  let result = {};

  //if input is invalid or null returning an empty object
  if(arguments.length == 0){
    return {}
  }

  //Calculating the equation
  arr.forEach(function(a){
    var equ = Math.abs(Math.pow(a, 2) - 7)
    equation.push(equ);
  })
  
  
  //Creating a function to check if a number is prime or not
  function checkPrime(number) {
    if (number <= 1) {
      return false;
    } else {
      for (let i = 2; i < number; i++) {
        if (number % i == 0) {
          return false;
        }
      }
      return true;
    }
  }
  //Placing the equation array in the function
  equation.forEach(function(input){
    const isPrime = checkPrime(input);
    if(isPrime){
      result[input] = true;
    }
    else{
      result[input] = false;
    }
  })
  return result;
};


const questionTwo = function questionTwo(arr) {
  return [...new Set(arr)];
};


const questionThree = function questionThree(arr) {
  // Refined array without duplicates
  let refinedArr = [...new Set(arr)];
  // Creating a new object to store the anagrams
  let anagrams = {};
  // Sorting the words and finding the anagrams
  for ([index, word] of refinedArr.entries()) {
    let sortedWord = word.split("").sort().join("");
    anagrams[sortedWord] = !anagrams[sortedWord] ? [word] : anagrams[sortedWord].concat(word);
  }
  let filteredAnagram = Object.keys(anagrams).reduce(function (r, e) {
    if (
      Object.values(anagrams)
        .filter((v) => v.length > 1)
        .includes(anagrams[e])
    )
      r[e] = anagrams[e];
    return r;
  }, {});

  return filteredAnagram;
};


const questionFour = function questionFour(num1, num2, num3) {
  //Taking average of the three inputs
  let average = (num1 + num2 + num3) / 3;
  
  const fact = (n) => (n ? n * fact(n - 1) : 1);
  let arr = [num1, num2, num3];
  //Doing Factorial of each number and adding them together
  arr = arr.map(fact);
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  //Finding the final result 
  let finalResult = Math.floor(sum / average);
  return finalResult;
};

module.exports = {
  firstName: "",
  lastName: "",
  studentId: "",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
