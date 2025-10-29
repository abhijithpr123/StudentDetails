document.addEventListener("DOMContentLoaded", () => {
  let cards = document.querySelector(".cards");
  let students = JSON.parse(localStorage.getItem("students")) || [];

  if (students.length === 0) {
    cards.innerHTML = "<p>No students added yet.</p>";
    return;
  }
  cards.innerHTML = students.map((student, index) => `
    <div class="card" onclick="openProfile(${index})">
      <img src="${student.pic}" alt="Student Picture">
      <h3>${student.name}</h3>
      <p><strong>Age:</strong> ${student.age}</p>
      <p><strong>DOB:</strong> ${student.dob}</p>
    </div>
  `).join("");
});

function openProfile(index) {
  localStorage.setItem("selectedStudentIndex", index);
  document.location.href = "./pages/profile.html";
}
