
const memory = require('./memory');
class ourArray {
  constructor() {
    this.activeSpace = 0;
    this.totalSpace = 0;
    this.ptr = memory.allocate(this.activeSpace)
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
    if(this.ptr === null) {
      throw new Error('Out of memory');
    }
    //linear time complexity
    memory.copy(this.ptr, oldPtr, this.activeSpace);
    memory.free(oldPtr);
    this.totalSpace = size;
  }

  get(index) {
    if(index < 0 || index >= this.activeSpace) {
      throw new Error("Index Error");
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if(this.activeSpace === 0) {
      throw new Error('Index Error');
    }
    const value = memory.get(this.ptr + this.activeSpace - 1);
    this.activeSpace--;
    return value;
  }

  insert(index, value) {
    if(index < 0 || index >= this.activeSpace) {
      throw new Error("Index error");
    }
    if(this.activeSpace >= this.totalSpace) {
      this._resize((this.activeSpace + 1) * 3);
    }
    memory.copy(this.ptr + index + 1, this.ptr + index, this.activeSpace - index);
    memory.set(this.ptr + index, value);
    this.activeSpace++;
  }

  remove(index) {
    if(index < 0 || index >= this.activeSpace) {
      throw new Error('Index error');
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.activeSpace - index - 1
    );
    this.activeSpace--;
  }
}

function main(){

  // Create an instance of the Array class
  let arr = new ourArray();

  // Add an item to the array
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  arr.pop();
  arr.pop();
  arr.pop();

  console.log(arr);
}

main()

//What is the length, capacity and memory address of your array?
  //Length = 1
  //Capacity = 3
  //Memory Address = 1


//What is the length, capacity and memory address of your array? Explain the result of your program after adding the new lines of code.

  
//memory address 1,2,3,4,5,6
//  arr.push(3); // length is 0 + 1 * 3
//  arr.push(5); // 
//  arr.push(15); // another resize takes place, increases capacity to 12 (3+1) * 3)
//  arr.push(19); 
//  arr.push(45);
//  arr.push(10);

  //#3 
    //What is the length, capacity, and address of your array? 
      //length is 3, capacity is still 12, address is 1, 2, 3, 4, 5, 6