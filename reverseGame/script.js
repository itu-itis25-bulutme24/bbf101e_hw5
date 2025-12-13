// 1. Değişkenleri Tanımlama
const challengeInput = document.getElementById("challenge");
const userInput = document.getElementById("user-input");
const timerElement = document.getElementById("timer");
const messageElement = document.getElementById("message");
const levelElement = document.getElementById("level");
const restartBtn = document.getElementById("restart-btn");
const submitBtn = document.getElementById("submit-btn");

// 2. Dizi (Array) Tanımları - YENİ: Renkler eklendi 
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "black", "white"];

// 3. Oyun Durum Değişkenleri
let level = 1;
let challengeText = "";
let timeLeft = 45;
let timerInterval;

// 4. Rastgele Eleman Seçme Fonksiyonu
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 5. Hedef Metni Oluşturma Fonksiyonu - YENİ: Level 3 eklendi [cite: 11]
function setChallengeText() {
    if (level === 1) {
        challengeText = getRandomElement(months);
    } else if (level === 2) {
        challengeText = getRandomElement(months) + getRandomElement(numbers);
    } else if (level === 3) {
        // Level 3 kuralı: Ay + Sayı + Renk [cite: 8]
        challengeText = getRandomElement(months) + getRandomElement(numbers) + getRandomElement(colors);
    }
    challengeInput.value = challengeText;
}

// 6. Zamanlayıcıyı Başlatma Fonksiyonu
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);
}

// 7. Oyunu Başlatma (Sıfırlama) Fonksiyonu
function startGame() {
    level = 1;
    timeLeft = 45;
    levelElement.textContent = level;
    
    restartBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    
    userInput.value = "";
    messageElement.textContent = "";
    
    setChallengeText();
    startTimer();
}

// 8. Oyunu Bitirme Fonksiyonu
function endGame(won) {
    clearInterval(timerInterval);
    if (won) {
        messageElement.textContent = "Congratulations! You won the game!";
        messageElement.style.color = "green";
    } else {
        messageElement.textContent = "Time's up! You lost the game.";
        messageElement.style.color = "red";
    }
    restartBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
}

// 9. Submit Butonu - YENİ: Kazanma koşulu Level 3'e çekildi 
submitBtn.addEventListener("click", () => {
    const reversedText = userInput.value;
    const correctReversedText = challengeText.split("").reverse().join("");

    if (reversedText === correctReversedText) {
        // Artık oyun Level 3 bitince kazanılıyor [cite: 7]
        if (level === 3) {
            endGame(true);
        } else {
            level++;
            timeLeft = 45;
            levelElement.textContent = level;
            messageElement.textContent = "Correct! Moving to the next level.";
            messageElement.style.color = "green";
            userInput.value = "";
            setChallengeText();
        }
    } else {
        messageElement.textContent = "Incorrect! Try again.";
        messageElement.style.color = "red";
    }
});

// 10. Restart Butonu
restartBtn.addEventListener("click", startGame);

// Oyunu başlat
startGame();