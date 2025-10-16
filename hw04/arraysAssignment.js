// Student Array
const students = [
  { name: "Alice", grades: [85, 92, 78, 90] },

  { name: "Bob", grades: [75, 88, 95, 100] },

  { name: "Charlie", grades: [60, 72, 68, 74] },

  { name: "David", grades: [92, 88, 95, 98] },

  { name: "Eve", grades: [100, 100, 100, 100] },
];

// Avg Calc Function
const calculateAverage = (grades) => {
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / grades.length;
};

// All DOM Functions
function initListeners() {
  // Declare all variables
  const allStudents = document.getElementById("allStudents");
  const allPass = document.getElementById("allPass");
  const perfectScore = document.getElementById("perfectScore");
  const topStudents = document.getElementById("topStudents");
  const studentAvgs = document.getElementById("studentAvgs");
  const totalGradesElement = document.getElementById("totalGrades");
  const studentNames = students.map((student) => student.name).join(", ");
  allStudents.innerHTML += studentNames;

  const allPassed = students.every((student) =>
    student.grades.every((grade) => grade >= 60)
  );
  allPass.innerHTML += allPassed ? "Yes" : "No";

  const anyPerfect = students.some((student) =>
    student.grades.every((grade) => grade === 100)
  );
  perfectScore.innerHTML += anyPerfect ? "Yes" : "No";

  const topStudentNames = students
    .filter((student) => calculateAverage(student.grades) >= 90)
    .map((student) => student.name)
    .join(", ");
  topStudents.innerHTML += topStudentNames;

  students.forEach((student) => {
    const avg = calculateAverage(student.grades).toFixed(2);
    const li = document.createElement("li");
    li.textContent = `Name: ${student.name} , Average Grade: ${avg}`;
    studentAvgs.appendChild(li);
  });

  const totalGradesValue = students.reduce(
    (acc, student) => acc + student.grades.length,
    0
  );

  totalGradesElement.innerHTML += totalGradesValue;
}

window.onload = initListeners;
