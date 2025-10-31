let uploadedImage = "";

const studentFields = [
  { name: "Name", id: "userName", placeholder: "Enter your name", type: "text" },
  { name: "Email", id: "userEmail", placeholder: "Enter your email", type: "email" },
  { name: "ID", id: "userId", placeholder: "Enter ID", type: "number" },
  { name: "Age", id: "userAge", placeholder: "Enter your age", type: "number" },
  { name: "Phone", id: "userPhone", placeholder: "Enter phone number", type: "tel" },
  { name: "Address", id: "userAddress", placeholder: "Enter your address", type: "text" },
  { name: "City", id: "userCity", placeholder: "Enter city", type: "text" },
  { name: "Pincode", id: "userPincode", placeholder: "Enter pincode", type: "number" },
  { name: "DOB", id: "userDob", placeholder: "Select date of birth", type: "date" },
];

function renderForm() {
  const form = document.getElementById("form");

  const fieldsHTML = studentFields
    .map(
      (field) => `
      <div class="input-group">
        <label for="${field.id}">${field.name}</label>
        <input id="${field.id}" type="${field.type}" placeholder="${field.placeholder}">
        <small class="error" id="error-${field.id}"></small>
      </div>`
    )
    .join("");

  form.innerHTML = `
    ${fieldsHTML}

    <!-- File Upload Section -->
    <div class="file-group">
      <label for="userImage">Profile Picture</label>
      <input id="userImage" type="file" accept="image/*">
      <small class="error" id="error-userImage"></small>
      <img id="preview-img" class="image-preview" style="display:none;" alt="Preview">
    </div>

    <!-- Submit Button -->
    <div class="btn">
      <button type="submit">Submit</button>
    </div>
  `;

  const fileInput = document.getElementById("userImage");
  const previewImg = document.getElementById("preview-img");

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        uploadedImage = event.target.result;
        previewImg.src = uploadedImage;
        previewImg.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });
}

renderForm();

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  const studentObj = {};

  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  document.querySelectorAll("input").forEach((el) => el.classList.remove("error-border"));

  studentFields.forEach((field) => {
    const input = document.getElementById(field.id);
    const errorEl = document.getElementById(`error-${field.id}`);

    if (input.value.trim() === "") {
      errorEl.textContent = `${field.name} is required`;
      input.classList.add("error-border");
      isValid = false;
    }

    studentObj[field.id] = input.value.trim();
  });

  if (!uploadedImage) {
    const errorEl = document.getElementById("error-userImage");
    errorEl.textContent = "Please upload an image";
    isValid = false;
  }

  if (!isValid) return;

  studentObj.pic = uploadedImage;
  saveStudent(studentObj);
});

function saveStudent(studentObj) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(studentObj);
  localStorage.setItem("students", JSON.stringify(students));
  window.location.href = "../index.html";
}
