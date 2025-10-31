const studentFields = [
  { name: "Name", id: "userName", placeholder: "Enter your name", type: "text" },
  { name: "Email", id: "userEmail", placeholder: "Enter your email", type: "email" },
  { name: "ID", id: "userPassword", placeholder: "Enter ID", type: "number" },
  { name: "Age", id: "userAge", placeholder: "Enter your age", type: "number" },
  { name: "Phone", id: "userPhone", placeholder: "Enter phone number", type: "tel" },
  { name: "Address", id: "userAddress", placeholder: "Enter your address", type: "text" },
  { name: "City", id: "userCity", placeholder: "Enter city", type: "text" },
  { name: "Pincode", id: "userPincode", placeholder: "Enter pincode", type: "number" },
  { name: "DOB", id: "userDob", placeholder: "Select date of birth", type: "date" },
  { name: "Profile Picture", id: "userImage", placeholder: "Choose Image", type: "file" },
];

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students[id];

  if (!student) {
    document.body.innerHTML = "<h2>Student not found!</h2>";
    return;
  }

  let previewImageBase64 = student.pic || "";

  const form = document.getElementById("editForm");

  const container = document.createElement("div");
  container.classList.add("form-container");

  const leftDiv = document.createElement("div");
  leftDiv.classList.add("form-left");

  const rightDiv = document.createElement("div");
  rightDiv.classList.add("form-right");

  leftDiv.innerHTML = studentFields
    .filter((f) => f.type !== "file")
    .map(
      (field) => `
      <div class="input-group">
        <label for="${field.id}">${field.name}</label>
        <input id="${field.id}" type="${field.type}" placeholder="${field.placeholder}" 
          value="${student[field.id] || ""}">
        <small class="error" id="error-${field.id}"></small>
      </div>
    `
    )
    .join("");

  rightDiv.innerHTML = `
    <h3>Preview</h3>
    <img id="imagePreview" class="image-preview" src="${previewImageBase64}" alt="Preview">
    <input id="userImage" type="file" accept="image/*">
  `;

  container.appendChild(leftDiv);
  container.appendChild(rightDiv);

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("btn");
  btnDiv.innerHTML = `<button type="submit">Submit</button>`;

  form.innerHTML = "";
  form.appendChild(container);
  form.appendChild(btnDiv);

  const fileInput = document.getElementById("userImage");
  const imagePreview = document.getElementById("imagePreview");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImageBase64 = e.target.result;
        imagePreview.src = previewImageBase64;
      };
      reader.readAsDataURL(file);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    const updatedStudent = {};

    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
    document.querySelectorAll("input").forEach((el) => el.classList.remove("error-border"));

    studentFields.forEach((f) => {
      const input = document.getElementById(f.id);
      const errorEl = document.getElementById(`error-${f.id}`);
      if (!input || f.type === "file") return;

      if (input.value.trim() === "") {
        errorEl.textContent = `${f.name} is required`;
        input.classList.add("error-border");
        isValid = false;
      }
      updatedStudent[f.id] = input.value.trim();
    });

    if (!isValid) return;

    updatedStudent.pic = previewImageBase64;

    students[id] = updatedStudent;
    localStorage.setItem("students", JSON.stringify(students));

    window.location.href = `../pages/profile.html?id=${id}`;
  });
});
