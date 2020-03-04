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

  console.log(arr);
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


// #5) 

const URLify = (str) => {
  let newStr = str //constant O(1)
  while(newStr.includes(' ')) { //linear O(n) because we don't know how many spaces in the string
    newStr = newStr.replace(' ', '%20');
  }
  return newStr;
}

// console.log(URLify('www.thinkful.com /tauh ida parv een'));

// #6) 
//Imagine you have an array of numbers. Write an algorithm to remove all numbers less than 5 from the array. 

const filterArray = (arr) => {

  //every element needs to be checked, no matter size of array, so O(n) linear time complexity
  for(let i = arr.length - 1; i >= 0; i--) {
    if(arr[i] < 5) {
      arr.splice(i, 1) 
    }
  }
  return arr;
}

console.log(filterArray([1,3,6,7,8]));
