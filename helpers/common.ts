function insertSameElementsRandomly(arr:Array<any>, element:any) {
  // Step 1: Generate two random positions within the array length.
  const position1 = Math.floor(Math.random() * (arr.length + 1));
  let position2 = Math.floor(Math.random() * (arr.length + 1));
  
  // Ensure that position2 is different from position1
  while (position2 === position1) {
    position2 = Math.floor(Math.random() * (arr.length + 1));
  }

  // Step 2: Insert the same element at the random positions.
  arr.splice(position1, 0, element);
  // If position2 comes after position1, we need to account for the shift due to the first insertion.
  if (position2 > position1) {
    position2++; // Increment position2 to adjust for the previous insertion.
  }
  arr.splice(position2, 0, element);
}



export {
    insertSameElementsRandomly
}