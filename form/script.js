// Form gönderildiğinde çalışan ana fonksiyon
function formSubmitted(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engeller

    // 1. İsim Kontrolü
    let nameControl = checkName();
    if (nameControl === 1) {
        alert("Name must be filled!"); //
        return;
    }

    // 2. Öğrenci ID Kontrolü
    let studentIDControl = checkStudentID();
    if (studentIDControl === 1) {
        alert("Student ID must be 9 digits!"); //
        return;
    } else if (studentIDControl === 2) {
        alert("Student ID must be only numbers!"); //
        return;
    }

    // 3. Yaş Kontrolü
    let ageControl = checkAge();
    if (ageControl === 1) {
        alert("Age and birthdate do not match!"); //
        return;
    }

    // 4. Başarılı Gönderim
    let today = new Date(); //
    alert("Form submitted successfully! Date: " + 
          today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()); //
}

// İsim boş mu kontrolü
function checkName() {
    let nameValue = document.getElementById("name").value;
    return (nameValue.trim() === "") ? 1 : 0; //
}

// Yaş ve Doğum Tarihi tutarlılık kontrolü
function checkAge() {
    let enteredAge = parseInt(document.getElementById("age").value);
    let birthdateValue = document.getElementById("birthdate").value;
    
    if (!birthdateValue) return 1;

    // Mevcut yıldan doğum yılını çıkararak hesaplama
    let birthYear = new Date(birthdateValue).getFullYear();
    let currentYear = new Date().getFullYear();
    let calculatedAge = currentYear - birthYear;

    return (enteredAge !== calculatedAge) ? 1 : 0; // Eşit değilse hata döndür
}

// Öğrenci ID format kontrolü
function checkStudentID() {
    let studentID = document.getElementById("id").value;
    if (studentID.length !== 9) { // 9 haneli olmalı
        return 1;
    } else if (isNaN(studentID)) { // Sadece sayı olmalı
        return 2;
    }
    return 0; // Sorun yoksa 0
}