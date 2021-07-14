import { setMovement } from "../redux/app-reducer";
import { Result } from "../redux/timer-reducer";

interface IParam {
  (arg0: { h: Array<number>, v: Array<number> }): void;
}

export const possibleMove = (arr: Array<number>, setMovement: IParam): void => {
  const multiplicity = Math.sqrt(arr.length)
  let length = multiplicity;
  let v: Array<number> = [], h: Array<number> = []
  for (let i = 0; i < length; i++) {
    h.push(arr[i]);
    if (h.includes(0) && h.length % multiplicity === 0) {
      if (h.length > multiplicity) h.splice(0, h.length - multiplicity)
      break;
    } else if (h.length % multiplicity === 0) {
      length += multiplicity;
    }
  }
  let column = arr.indexOf(0)
  while (column > multiplicity - 1) {
    column -= multiplicity
  }
  for (let j = column; j < arr.length;) {
    v.push(arr[j])
    j += multiplicity
  }
  setMovement({ h, v })
}

const swap = (arr: Array<number>, index1: number, index2: number): Array<number> => arr.map((val, idx, arr) => {
  if (idx === index1) return arr[index2];
  if (idx === index2) return arr[index1];
  return val;
});

export const MoveAside = (arr: Array<number>, from: number, displace: Array<number>): Array<number> => {
  let couple: Array<number> = [];
  let swappedArr = arr;
  let swappedDisplace = [...displace]

  if (swappedDisplace.indexOf(from) < swappedDisplace.indexOf(0)) {
    for (let i = displace.length - 1; i >= 0; i--) {
      couple = [swappedDisplace[i], swappedDisplace[i - 1]]
      if (couple[0] === 0) {
        let swapFrom = swappedArr.indexOf(couple[0])
        let swapTo = swappedArr.indexOf(couple[1])
        swappedArr = swap(swappedArr, swapFrom, swapTo)
        swappedDisplace = [...swap(swappedDisplace, swappedDisplace.indexOf(couple[0]), swappedDisplace.indexOf(couple[1]))]
        possibleMove(swappedArr, setMovement)
      }
      if (couple[1] === from) break;
    }
  } else {
    for (let i = 0; i < displace.length; i++) {
      couple = [swappedDisplace[i], swappedDisplace[i + 1]]
      if (couple[0] === 0) {
        let swapFrom = swappedArr.indexOf(couple[0])
        let swapTo = swappedArr.indexOf(couple[1])
        swappedArr = swap(swappedArr, swapFrom, swapTo)
        swappedDisplace = [...swap(swappedDisplace, swappedDisplace.indexOf(couple[0]), swappedDisplace.indexOf(couple[1]))]
        possibleMove(swappedArr, setMovement)
      }
      if (couple[1] === from) break;
    }
  }
  return swappedArr
}

export const randomizedGrid = (preset: string): Array<number> => {
  const gridSet: Set<number> = new Set();
  let rowLength = Math.sqrt(Number(preset));
  let zeroRow = 1;
  const nextRow = rowLength

  while (gridSet.size < Number(preset)) {
    gridSet.add(getRandomInt(Number(preset)))
  }
  let arrSet: Array<number> = [...gridSet]

  if (nextRow % 2 === 0) {
    while (arrSet.indexOf(0) >= rowLength) {
      rowLength += nextRow
      zeroRow += 1
    }
  } else {
    zeroRow = 0
  }

  if ((isSolved(arrSet) + zeroRow) % 2 !== 0) {
    let index: number = 0, index2: number = 0
    for (let i = 0; i < arrSet.length; i++) {
      if (arrSet[i] > arrSet[i + 1] && arrSet[i] !== 0 && arrSet[i + 1] !== 0) {
        index = i;
        index2 = i + 1;
      }
    }
    arrSet = swap(arrSet, index, index2)
  }
  return arrSet
}

const isSolved = (set: Array<number>): number => {
  let solved = set.reduce((accumulator, currentValue, index, array) => {
    let result = 0
    for (index; index < array.length; index++) {
      if (currentValue > array[index + 1] && array[index + 1] !== 0 && currentValue !== 0) result += 1
    }
    return accumulator += result
  }, 0)
  return solved
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

export const sortBy = (arr: Array<number>, sorting?: string): number[] => {
  let sorted = [...arr]
  if (sorting === undefined) {
    sorted.sort((a, b) => a - b)
    return sorted
  } else if (sorting === 'ascending') {
    const tempSorted = [...sorted]
    sorted = []
    let sortedToString: Array<Array<string>> = tempSorted.sort((a, b) => a - b).map(el => [el.toString()])

    for (let i = 0; i < sortedToString.length; i++) {
      while (sortedToString[i][0].length < 6) {
        sortedToString[i][0] = '0' + sortedToString[i][0]
      }
      for (let j = 0; j < sortedToString[i][0].length; j += 2) {
        sorted.push(Number(sortedToString[i][0][j] + sortedToString[i][0][j + 1]))
      }
    }
    return sorted
  }
  return sorted
}

export const resultSorted = (arr: Array<number>, res: Result[]): Result[] => {
  let newRes: Array<Result> = [],
    i = 0
  while (i < arr.length) {
    for (let k = 0; k < res.length; k++) {
      if (arr[i] === res[k].time) {
        newRes.push(res[k])
      }
      i++
    }
  }
  return newRes;
}

export const isDone = (arr: Array<number>): boolean => {
  const checkedArr = [...arr];
  const arrDone = sortBy(arr)
  arrDone.push(arrDone.shift()!)
  return checkedArr.every((el, i) => el === arrDone[i])
}