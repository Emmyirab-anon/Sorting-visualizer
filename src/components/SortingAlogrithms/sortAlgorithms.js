//>>>>>>>>>>MERGE SORT<<<<<<<<<<<<<<<
//Merge sort from Clement Mihailescu
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

//<<<<<<<<<<<<<<<Selection Sort<<<<<<<<<<<<<<<<<<<

function swap(auxillaryArray, firstIndex, secondIndex) {
  let temp = auxillaryArray[firstIndex];
  auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
  auxillaryArray[secondIndex] = temp;
}

function selectionSort(auxilliaryArray, animations) {
  for (let i = 0; i < auxilliaryArray.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < auxilliaryArray.length; j++) {
      animations.push(["comparison1", j, minIdx]);
      animations.push(["comparison2", j, minIdx]);
      if (auxilliaryArray[j] < auxilliaryArray[minIdx]) {
        minIdx = j;
      }
    }

    animations.push(["swap", minIdx, auxilliaryArray[i]]);
    animations.push(["swap", i, auxilliaryArray[minIdx]]);
    swap(auxilliaryArray, minIdx, i);
  }
}

export function getSelectionAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  selectionSort(auxiliaryArray, animations);
  array = auxiliaryArray;
  return [animations, array];
}

//<<<<<<<<<<<<<<<Insertion Sort<<<<<<<<<<<

function insertionSort(auxiliaryArray, animations) {
  for (let i = 1; i < auxiliaryArray.length; i++) {
    let key = auxiliaryArray[i];
    let j = i - 1;

    animations.push(["comparison1", j, i]);
    animations.push(["comparison2", j, i]);
    while (j >= 0 && auxiliaryArray[j] > key) {
      animations.push(["overwrite", j + 1, auxiliaryArray[j]]);
      auxiliaryArray[j + 1] = auxiliaryArray[j];
      j = j - 1;
      if (j >= 0) {
        animations.push(["comparison1", j, i]);
        animations.push(["comparison2", j, i]);
      }
    }
    animations.push(["overwrite", j + 1, key]);
    auxiliaryArray[j + 1] = key;
  }
}

export function getInsertionAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  insertionSort(auxiliaryArray, animations);
  array = auxiliaryArray;
  return [animations, array];
}
