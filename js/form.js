let student = [
    { name: "Name", id: "userName", placeholder: "Enter your name", type: "text" },
    { name: "email", id: "userEmail", placeholder: "Enter your email", type: "email" },
    { name: "ID", id: "userPassword", placeholder: "Enter iD", type: "number" },
    { name: "age", id: "userAge", placeholder: "Enter your age", type: "number" },
    { name: "phone", id: "userPhone", placeholder: "Enter phone number", type: "tel" },
    { name: "address", id: "userAddress", placeholder: "Enter your address", type: "text" },
    { name: "city", id: "userCity", placeholder: "Enter city", type: "text" },
    { name: "pincode", id: "userPincode", placeholder: "Enter pincode", type: "number" },
    { name: "dob", id: "userDob", placeholder: "Select date of birth", type: "date" },
    { name: "Profile Picture", id: "userImage", placeholder: "Choose Image", type: "file" },
    { name: "submit", id: "submit", placeholder: "submit", type: "submit" }
];

function setInputs() {
    let str = "";

    student.forEach(field => {
        if (field.type === "submit") {
            str += `
        <div class="btn">
          <button id="${field.id}" type="${field.type}">${field.placeholder}</button>
        </div>`;
        } else {
            str += `
        <div>
          <label for="${field.id}">${field.placeholder}</label>
          <input name="${field.name}" id="${field.id}" placeholder="${field.placeholder}" type="${field.type}">
        </div>`;
        }
    });

    document.getElementById("form").innerHTML = str;
}

setInputs();

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let obj = {};
    let inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== "file" && inputs[i].type !== "submit") {
            obj[inputs[i].id] = inputs[i].value;
        }
    }

    let fileInput = document.getElementById("userImage");
    let file = fileInput.files[0];


    if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            obj.pic = event.target.result;
            saveStudent(obj);
        };
        reader.readAsDataURL(file);
    } else {
        obj.pic = "";
        saveStudent(obj);
    }
});

function saveStudent(studentObj) {

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(studentObj);
    localStorage.setItem("students", JSON.stringify(students));
    window.location.href = "../index.html";
}