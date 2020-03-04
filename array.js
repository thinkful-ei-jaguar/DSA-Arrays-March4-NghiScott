const Memory = require("./memory");

class Array {
  constructor() {
    // Array starts with a length of 0 and a pointer with 0 blocks of memory
    this.length = 0; // Length is active elements being used
    this._capacity = 0; // Total # of spaces regardless of active/inactive state
    /**
     * Create a pointer for self reference and allocate with an initial array
     * length of 0
     */
    this.ptr = Memory.allocate(this.length);
  }

  // Steps to push new element to array
  // 1. Increase amount of memory reserved to make space for new element
  // 2. Set value of the new block to contain the new value
  push(value) {
    // Sensible resizing
    // Resize array and increase length if length is greater than capacity
    // Worst case O(n) and need to resize
    // Best and average case O(1) and don't need to resize
    // Trade off is wasting memory if capacity is greater than length
    // However since it is common to push elements into arrays, it's a worthwhile optimization
    if (this.length >= this._capacity) {
      // Increase array length x3
      this._resize((this.length + 1) * Array.SIZE_RATIO); // (0+1) * 3 = 3  - 2nd time is 12x
    }
    // Set a single memory address
    Memory.set(this.ptr + this.length, value); // (0 + 0) , value
    this.length++; // 1
  }

  _resize(size) {
    const oldPtr = this.ptr;
    // When resize, redefine the position of the current pointer
    // Memory returns null when out of space
    this.ptr = Memory.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of memory");
    }
    // Since we cannot ask for extra spaces directly at end of currently allocated space
    // Copy existing values from old to new chunk of memory in array
    Memory.copy(this.ptr, oldPtr, this.length);
    // Free up old values to make space
    Memory.free(oldPtr);
    // Total # of spaces regardless of active/inactive state
    this._capacity = size;
  }

  get(index) {
    // Index offset
    // If index is out of range return error
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    // Get value stored at memory address
    // Performance of O(1)
    return Memory.get(this.ptr + index);
  }

  pop() {
    // Cannot pop if array is already empty
    if (this.length == 0) {
      throw new Error("Index error");
    }
    // Empty last value in array and leave the extra space rather than resizing
    // Performance of O(1) - arithmetic operations
    const value = Memory.get(this.ptr + this.length - 1);
    // Set total # of occupied spaces
    this.length--;
    return value;
  }

  insert(index, value) {
    // Action to insert a new value anywhere in the array
    // Performance of O(1) - Best case is when inserting at the end of array
    // same as pushing
    // Performance of O(n) - Worst case is when inserting at the beginning of array
    // Has to shift all values by 1 so the oeration runs n times
    // Performance of O(n) - Average case is when inserting in the middle of array
    // O(n/2 or 1/2 n) because we shift half of the elements back 1 position but we ignore constant factor
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    // Shift all values after the new value back 1 position
    Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index); // (3, 2, 0)
    // Put new value in the correct place
    Memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    // Performance of O(1) - Best case - remove at the end of array
    // Performance of O(n) - Worst case - removed at the beginning of array
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    // Move all values after the removed value forward 1 position
    // If: remove(2) => Memory.copy(3+2, 3+2+1, 3-2-1)
    Memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}
Array.SIZE_RATIO = 3;
