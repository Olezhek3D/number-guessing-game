const startGame = document.getElementById("myPlaySubmit");
const contentGame = document.getElementById("gameContent");
const guessBtn = document.getElementById("Submit");
const myLabel = document.getElementById("myLabel");
const inputGuess = document.getElementById("guess");
const attemptsLeft = document.getElementById("attemptsLeft");
const loseSound = document.getElementById("lose");
const correctSound = document.getElementById("correct");
const wrongSound = document.getElementById("wrong");
const menu = document.getElementById("menu");

startGame.onclick = function () {
    startGame.style.display = "none";
    contentGame.style.display = "block";
    menu.style.display = "block"
    function startNewGame() {
        const minNum = 1;
        const MaxNum = 100;
        const answer = Math.floor(Math.random() * (MaxNum - minNum + 1)) + minNum;
        let attempts = 0;
        let running = true;
        let left = 30;

        attemptsLeft.innerHTML = `Осталось ${left} попыток`;
        myLabel.innerHTML = "Попробуй угадать число!";
        inputGuess.value = ""; // Очистка поля ввода
        console.log(answer); // Для отладки

        guessBtn.onclick = function () {
            if (running) {
                let guess = Number(inputGuess.value);
                if (guess > 100 || guess < 1 || isNaN(guess)) {
                    myLabel.innerHTML = "Введи число между 1-100";
                    wrongSound.play();
                } else {
                    attempts++;
                    left--; // Уменьшаем количество оставшихся попыток
                    attemptsLeft.innerHTML = `Осталось ${left} попыток`; // Обновляем текст

                    if (guess < answer) {
                        if (left > 0) {
                            wrongSound.play();
                        }
                        myLabel.innerHTML = "Мало! Введи число побольше!";
                    } else if (guess > answer) {
                        if (left > 0) {
                            wrongSound.play();
                        }
                        myLabel.innerHTML = "Много! Введи число поменьше!";
                    } else {
                        running = false;
                        myLabel.innerHTML = `Молодец! Ты смог(ла) угадать! Это заняло у тебя ${attempts} попыток`;
                        correctSound.play();
                        guessBtn.innerHTML = "Играть снова";
                        guessBtn.onclick = startNewGame; // Перезапускаем игру
                    }

                    if (left === 0 && running) {
                        running = false;
                        myLabel.innerHTML = `К сожалению, попытки закончились. Число было ${answer}`;
                        guessBtn.innerHTML = "Играть снова";
                        loseSound.play();
                        guessBtn.onclick = startNewGame; // Перезапускаем игру
                    }
                }
            }
        };
    }
    menu.onclick = function (){
        startGame.style.display = "block";
        contentGame.style.display = "none";
        menu.style.display = "none"
    }
    startNewGame(); // Запускаем новую игру при старте
};
