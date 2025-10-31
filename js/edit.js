const studentFields = [
  { name: "Name", id: "userName", placeholder: "Enter your name", type: "text", value: `${student.userName}`},
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

function renderForm() {
  const form = document.getElementById("form");
  form.innerHTML =
    studentFields
      .map(
        (field) => `
      <div class="input-group">
        <label for="${field.id}">${field.name}</label>
        <input id="${field.id}" type="${field.type}" placeholder="${field.placeholder}">
        <small class="error" id="error-${field.id}"></small>
      </div>
    `
      )
      .join("") +
    `
    <div class="btn">
      <button type="submit">Submit</button>
    </div>
  `;
}
renderForm();

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {};
  let isValid = true;

  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  document.querySelectorAll("input").forEach((el) => el.classList.remove("error-border"));

  studentFields.forEach((f) => {
    const input = document.getElementById(f.id);
    const errorEl = document.getElementById(`error-${f.id}`);

    if (f.type === "file") {
      if (input.files.length === 0) {
        errorEl.textContent = `Please upload your ${f.name}`;
        input.classList.add("error-border");
        isValid = false;
        return;
      }
    } else if (input.value.trim() === "") {
      errorEl.textContent = `${f.name} is required`;
      input.classList.add("error-border");
      isValid = false;
      return;
    }

    if (f.type !== "file") obj[f.id] = input.value.trim();
  });

  if (!isValid) return;

  const fileInput = document.getElementById("userImage");
  const file = fileInput.files[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    obj.pic = e.target.result;
    saveStudent(obj);
  };
  reader.readAsDataURL(file);
});

function saveStudent(studentObj) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(studentObj);
  localStorage.setItem("students", JSON.stringify(students));
  window.location.href = "../pages/edit.html";
}
