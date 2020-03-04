class Memory {
  constructor() {
    /**
     * When Float64Array is called with a activeSpace argument,
     * an internal array buffer is created in memory,
     * of size activeSpace multiplied by BYTES_PER_ELEMENT bytes,
     * containing zeros.
     */
    this.memory = new Float64Array(1024);
    /**
     * Mimick linked list where head is referencing the first space in an array
     */
    this.head = 0;
  }

  allocate(size) {
    // Cannot allocate space if item/array doesn't have the capacity
    if (this.head + size > this.memory.activeSpace) {
      return null;
    }
    // If we have capacity then allocate space
    let start = this.head;

    this.head += size;
    return start;
  }

  free(ptr) {}

  copy(toIdx, fromIdx, size) {
    // Shouldn't copy if the location where we're at is the location we want to copy to
    if (fromIdx === toIdx) {
      return;
    }

    if (fromIdx > toIdx) {
      // Iterate forwards
      for (let i = 0; i < size; i++) {
        this.set(toIdx + i, this.get(fromIdx + i));
      }
    } else {
      // Iterate backwards
      for (let i = size - 1; i >= 0; i--) {
        this.set(toIdx + i, this.get(fromIdx + i));
      }
    }
  }

  get(ptr) {
    // Similar to how we set values
    return this.memory[ptr];
  }

  set(ptr, value) {
    // Storing value in a memory address called pointer (ptr)
    this.memory[ptr] = value;
  }
}

module.exports = Memory;
