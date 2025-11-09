window.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".cards");
  const students = JSON.parse(localStorage.getItem("students")) || [];

  if (students.length === 0) {
    cardsContainer.innerHTML = "<p>No students added yet.</p>";
    return;
  }

  cardsContainer.innerHTML = students.map((student, index) => `
    <a href="./pages/profile.html?id=${index}" class="card-link">
      <div class="card">
        <img src="${student.userImage || student.pic || ''}" alt="Student Picture">
        <h3>${student.userName || "No Name"}</h3>
        <p><strong>Age:</strong> ${student.userAge || "N/A"}</p>
        <p><strong>Address:</strong> ${student.userAddress || "N/A"}</p>
        <p><strong>DOB:</strong> ${student.userDob || "N/A"}</p>
      </div>
    </a>
  `).join("");
});

function openProfile(index) {
  localStorage.setItem("selectedStudentIndex", index);
  window.location.href = "./pages/profile.html";
}