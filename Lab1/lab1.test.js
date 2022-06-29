const lab1 = require("./lab1");

//Question one 5 calls
console.log(lab1.questionOne([2]));
console.log(lab1.questionOne([5,3,10]));
console.log(lab1.questionOne([]));
console.log(lab1.questionOne());
console.log(lab1.questionOne([6,8,4])); 
 
//Question two 5 calls
console.log(lab1.questionTwo([1, 2, 3, 2, 1]));
console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1])); 
console.log(lab1.questionTwo([1, '1', 1, '1', 2])); 
console.log(lab1.questionTwo([3, 'a', 'b', 3, '1'])); 
console.log(lab1.questionTwo([]));  

//Question three 5 calls
console.log(lab1.questionThree(["bar", "car", "car", "arc"])); 
console.log(lab1.questionThree(["cat", "act", "foo", "bar"]));
console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
console.log(lab1.questionThree([]));

//Question four 5 calls
console.log(lab1.questionFour(1, 3, 2)); 
console.log(lab1.questionFour(2, 5, 6));
console.log(lab1.questionFour(3, 8, 9));
console.log(lab1.questionFour(4, 7, 11));
console.log(lab1.questionFour(5, 9, 12));