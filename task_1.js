const SOLVED = 1;
const ONE_SCORE = 1;
const ARRAY_COLUMNS_LENGTH_SAME_SIZE = 1;
const NOT_SOLVED = 0;

const testArrStudents = [
 [1, 0, 1, 1],
 [0, 0, 0, 1, 1],
 [1, 1, 1, 1],
];

const isArrayColumnsSameSize = (arr) => {
 if (!Array.isArray(arr)) return new Error("expected Array");
 const arrayColumnsLength = new Map();
 let isTwoDimensionalArray = true;
 for (let i = 0; i < arr.length; i++) {
  const arrElement = arr[i];

  if (!Array.isArray(arrElement)) {
   isTwoDimensionalArray = false;
   break;
  }

  arrayColumnsLength.set(arrElement.length, arrElement.length);
 }
 if (!isTwoDimensionalArray)
  return new Error("expected two dimensional Array");
 console.log(arrayColumnsLength.size)
 return arrayColumnsLength.size === ARRAY_COLUMNS_LENGTH_SAME_SIZE;
};

const getTaskPrices = (studentsArr, totalTasks, totalStudents) => {
 const taskPrices = new Map();

 for (let i = 0; i < totalTasks; i++) {
  let numberTimesTaskWasSolved = 0;
  studentsArr.forEach((student) => {
   if (student[i] === SOLVED) numberTimesTaskWasSolved++;
  });
  const taskPrice = totalStudents - numberTimesTaskWasSolved + ONE_SCORE;
  taskPrices.set(i, taskPrice);
 }

 return taskPrices;
};

// first solution to the task
const getStudentsScores1 = (studentsArr) => {
 if (!isArrayColumnsSameSize(studentsArr)) {
  return new Error("expected the same array columns length");
 }

 const totalTasks = studentsArr[0].length;
 const totalStudents = studentsArr.length;
 const taskPrices = getTaskPrices(studentsArr, totalTasks, totalStudents);

 return studentsArr.map((student, studentIndex) => {
  let studentTotalSumMark = 0;
  student.forEach((studentTask, studentTaskIndex) => {
   if (studentTask === SOLVED) {
    studentTotalSumMark += taskPrices.get(studentTaskIndex);
   }
  });

  return `${studentTotalSumMark}, - набрал ${studentIndex + 1} ученик`;
 });
};

// second solution to the task
const getStudentsScores2 = (studentsArr) => {
 if (!isArrayColumnsSameSize(studentsArr)) {
  return new Error("expected the same array columns length");
 }

 return studentsArr.map((student, studentIndex) => {
  let studentTotalSumMark = 0;

  student.forEach((studentTask, studentTaskIndex) => {
   if (studentTask === SOLVED) {
    studentTotalSumMark += ONE_SCORE;

    studentsArr.forEach((checkStudent, checkStudentIndex) => {
     if (
      checkStudentIndex !== studentIndex &&
      checkStudent[studentTaskIndex] === NOT_SOLVED
     ) {
      studentTotalSumMark += ONE_SCORE;
     }
    });
   }
  });

  return `${studentTotalSumMark}, - набрал ${studentIndex + 1} ученик`;
 });
};

console.log(getStudentsScores1(testArrStudents));
console.log(getStudentsScores2(testArrStudents));