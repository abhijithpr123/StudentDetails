window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students[id];

    if (!student) {
        document.body.innerHTML = "<p>Student not found!</p>";
        return;
    }

    document.getElementById("profile-pic").src = student.pic || "";

    const details = document.getElementById("profile-details");
    details.innerHTML = `
    <h2>${student.userName || "No Name"}</h2>
    <p><strong>Email:</strong> ${student.userEmail || "N/A"}</p>
    <p><strong>ID:</strong> ${student.userPassword || "N/A"}</p>
    <p><strong>Age:</strong> ${student.userAge || "N/A"}</p>
    <p><strong>Phone:</strong> ${student.userPhone || "N/A"}</p>
    <p><strong>Address:</strong> ${student.userAddress || "N/A"}</p>
    <p><strong>City:</strong> ${student.userCity || "N/A"}</p>
    <p><strong>Pincode:</strong> ${student.userPincode || "N/A"}</p>
    <p><strong>DOB:</strong> ${student.userDob || "N/A"}</p>
    <div>
        <button id="edit-btn">Edit</button>
        <button id="delete-btn">Delete</button>    
        <button id="back-btn">Back</button>
    </div>
  `;

    document.getElementById("back-btn").addEventListener("click", () => {
        window.location.href = "../index.html";
    });
    document.getElementById("edit-btn").addEventListener("click", () => {
        console.log("edit")
        window.location.href = "../pages/edit.html"
    });
    document.getElementById("delete-btn").addEventListener("click", () => {
        const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;
    students.splice(id, 1);
    localStorage.setItem("students", JSON.stringify(students));
    window.location.href = "../index.html";
    });
});
