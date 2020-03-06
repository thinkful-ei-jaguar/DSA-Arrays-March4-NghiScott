const x = require("./memory");
const memory = new x();

class ourArray {
  constructor() {
    this.activeSpace = 0;
    this.totalSpace = 0;
    this.ptr = memory.allocate(this.activeSpace);
  }

  push(value) {
    if (this.activeSpace >= this.totalSpace) {
      this._resize((this.activeSpace + 1) * 3);
    }
    memory.set(this.ptr + this.activeSpace, value);
    this.activeSpace++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of memory");
    }
    //linear time complexity
    memory.copy(this.ptr, oldPtr, this.activeSpace);
    memory.free(oldPtr);
    this.totalSpace = size;
  }

  get(index) {
    if (index < 0 || index >= this.activeSpace) {
      throw new Error("Index Error");
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.activeSpace === 0) {
      throw new Error("Index Error");
    }
    const value = memory.get(this.ptr + this.activeSpace - 1);
    this.activeSpace--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.activeSpace) {
      throw new Error("Index error");
    }
    if (this.activeSpace >= this.totalSpace) {
      this._resize((this.activeSpace + 1) * 3);
    }
    memory.copy(
      this.ptr + index + 1,
      this.ptr + index,
      this.activeSpace - index
    );
    memory.set(this.ptr + index, value);
    this.activeSpace++;
  }

  remove(index) {
    if (index < 0 || index >= this.activeSpace) {
      throw new Error("Index error");
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.activeSpace - index - 1
    );
    this.activeSpace--;
  }
}

function main() {
  // Create an instance of the Array class
  let arr = new ourArray();

  // Add an item to the array
  // arr.push(3);
  // arr.push(5);
  // arr.push(15);
  // arr.push(19);
  // arr.push(45);
  // arr.push(10);
  // arr.pop();
  // arr.pop();
  // arr.pop();

  // console.log(arr);
}

main();

// #2) What is the length, capacity and memory address of your array?
//  Insert arr.push(3);
//   Length = 1
//   Capacity = 3
//   Memory Address = 0

// #2) What is the length, capacity and memory address of your array? Explain the result of your program after adding the new lines of code.
//  arr.push(3); // Resize: length is (0+1) * 3
//  arr.push(5);
//  arr.push(15); // Resize: increases capacity to 12 ((3+1) * 3)
//  arr.push(19);
//  arr.push(45);
//  arr.push(10);
//   Length = 6 // Total active space
//   Capacity = 12 // Total additional space
//   Memory address = 3 // Starting position of the new pointer

// #3) What is the length, capacity, and address of your array? Explain the result of your program after adding the new lines of code.
//  arr.pop();
//  arr.pop();
//  arr.pop();
//   Length = 3 // Total active space
//   Capacity = 12 // Total space
//   Memory address = 3

// #4) Print the 1st item in the array arr.
//   console.log(arr.get(0)); // 3
// Empty the array and add just 1 item: arr.push("tauhida");
//   arr.push("tauhida");
// Print this 1 item that you just added. What is the result? Can you explain your result?
//   NaN
//   Float64Array - integers/float datatype only
// What is the purpose of the _resize() function in your Array class?
//   Resize function add to the available capacity by copying and pasting old blocks and free up values to create the capacity

/**
 * #5
 A common mistake users make when they type in an URL is to put spaces between words or letters. 
 One solution that developers can use to solve this problem is to replace any spaces with a '%20'. 
 Write a method that takes in a string and replaces all its empty spaces with a '%20'. 
 Your algorithm can only make 1 pass through the string.

 Alternative solution:
 function urlifyString(str){
    let spaceCount = 0;
    let index = 0;
    let newString = '';
    for(let i=0; i<str.length; i++){
        if(str[i]===' '){
            newString+='%20'
 
        }else{
            newString += str[i];
        }
        
    }
    return newString;
}
 */

const URLify = str => {
  let newStr = str; //constant O(1)
  while (newStr.includes(" ")) {
    //linear O(n) because we don't know how many spaces in the string
    newStr = newStr.replace(" ", "%20");
  }
  return newStr;
};

// console.log(URLify('www.thinkful.com /tauh ida parv een'));

/**
 * #6
  Imagine you have an array of numbers. Write an algorithm to remove all numbers 
  less than five from the array. 
  Don't use array's built-in `.filter` method here; write the algorithm from scratch.
 */

const filterArray = arr => {
  //every element needs to be checked, no matter size of array, so O(n) linear time complexity
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] < 5) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

// console.log(filterArray([1,3,6,7,8]));

/**
 * #7
 You are given an array containing positive and negative integers.
 Write an algorithm which will find the largest sum in a continuous sequence.
 */

const maxSubArray = arr => {
  let sum = 0;
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    // O(n) depends on size of array and runtime increase proportionally
    // Set sum to math.max()
    let item = arr[i];
    // To avoid negative
    sum = Math.max(0, sum + item);
    max = Math.max(max, sum);
    // console.log(item, sum, max);
  }
  return max;
};

// console.log(maxSubArray([-3, 4, 6, -3, 5, -2, 1]));

/**
 * #8
 Imagine you have two arrays which have already been sorted. 
 Write an algorithm to merge the two arrays into a single array, 
 which should also be sorted. 

 Alternative solution:
 function merge_arrays(arr1, arr2) {
	let idx1 = 0, idx2 = 0;
	let ret = [];
	while (idx1 < arr1.length && idx2 < arr2.length) {
		if (arr1[idx1] <= arr2[idx2])
			ret.push(arr1[idx1++]);
		else
			ret.push(arr2[idx2++]);
	}
	// One array is now empty. Join the rest of the other array on.
	if (idx2 < arr2.length) {
		idx1 = idx2;
		arr1 = arr2;
	}
	while (idx1 < arr1.length) 
        ret.push(arr1[idx1++]);
	return ret;
}
*/

const mergeArray = (arr1, arr2) => {
  let arr3 = arr1.concat(arr2); // O(1)
  arr3.sort((a, b) => a - b); // O(n) - runtime depends on array sizes
  return arr3; // O(1)
};

// console.log(mergeArray([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

/**
 * #5
 Write an algorithm that deletes given characters from a string. For example, given a 
 string of "Battle of the Vowels: Hawaii vs. Grozny" and characters to be removed are 
 "aeiou", the algorithm should transform the original string to "Bttl f th Vwls: Hw vs. Grzny". 
 Do not use Javascript's filter, split, or join methods.

 function vowels(str, specifiedChars) {
   // global insensitive - meaning search through the entire string and case insensitive
   const regex = '/[{specifiedChars}]/gi'; 
   // match() return an array with the characters in it
   const matches = str.match(new Regex(regex));
   return matches ? matches.length : 0;
 }
 */

const deleteChars = (string, specifiedChars) => {
  let newStr = string;

  // start by counting down the string
  for (let i = newStr.length - 1; i >= 0; i--) {
    if (specifiedChars.includes(newStr[i])) {
      newStr = newStr.replace(newStr[i], "");
    }
  }
  return newStr;
};

// Can also use regex and replace to resolve it
// new RegExp( pattern: `[${chars}])

// console.log(
//   deleteChars("Battle of the Vowels: Hawaii vs. Grozny", [
//     "a",
//     "e",
//     "i",
//     "o",
//     "u"
//   ])
// );

/**
 * #10
 Given an array of numbers, write an algorithm to find out the products of every number, 
 except the one at that index.
 Input:[1, 3, 9, 4]
 Output:[108, 36, 12, 27]

 Alternative solution:
 const products = arr => {
  // Could use reduce to multiply everything
  const product = arr.reduce((a, b) => a * b);
  output = arr.map(i => product / i);
  return output;
};
 */

const products = arr => {
  let output = []; // O(1)
  let product = 1; // O(1)
  for (let i = 0; i < arr.length; i++) {
    // O(n)
    // 1 * 1 = 1 // 3*1 = 3
    product *= arr[i]; //multiplying everything
  }
  // by the end of the first for loop, product is = 108.
  for (let i = 0; i < arr.length; i++) {
    // O(n)
    output.push(product / arr[i]); //108/1...108/3
  }
  return output;
};

// console.log(products([1, 3, 9, 4]));

/**
 * #11
 Write an algorithm which searches through a 2D array, and whenever it finds a zero should 
 set the entire row and column to zero.
 Nested for loops = quadratic time - could be improved
 Map object - alternative
 */

const replace0 = arr => {
  // Rows and columns with 0s
  const rows = [];
  const cols = [];
  // Find rows and columns with 0s
  for (let i = 0; i < arr.length; i++) {
    // O(n)
    // Skip find with rows has no 0s
    if (arr[i].includes(0)) {
      for (let j = 0; j < arr[i].length; j++) {
        // O(n)
        if (arr[i][j] === 0) {
          rows[i] = true;
          cols[i] = true;
        }
      }
    }
  }

  // Insert 0 for if row or column has 0s
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (row[i] || cols[j]) {
        arr[i][j] = 0;
      }
    }
  }
  return arr;
};

const input = [
  [1, 0, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1]
];

// console.log(replace0(input));

/**
 * #12
 Given two strings, str1 and str2, write a program that checks if str2 is a rotation of str1.
 Usually use a hashmap to avoid nested for loops - avoid quadratic time
 */

const rotation = (str1, str2) => {
  // Key is to concat string 2
  return (str2 + str2).indexOf(st1) !== -1; // boolean value
};

console.log(rotation("amazon", "azonma")); // false
console.log(rotation("amazon", "azonam")); // true
