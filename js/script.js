const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector('.wrapper .input-field'),
    timeTag = document.querySelector('.time span b'),
    wpmTag = document.querySelector('.wpm span'),
    cpmTag = document.querySelector('.cpm span'),
    tryAgainBtn = document.querySelector('button'),
    mistakeTag = document.querySelector(".mistake span");

let timer, maxTime = 60, timeLeft = maxTime, charIndex = mistake = isTyping = 0;

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener('keydown', () => inpField.focus());
    typingText.addEventListener('click', () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll('span');
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains('incorrect')) { mistake--; }
            characters[charIndex].classList.remove('correct', "incorrect");
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add('correct');
            } else {
                mistake++;
                characters[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }
        let wpm = Math.round((((charIndex - mistake) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add('active');
        mistakeTag.innerText = mistake;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistake;
    }
    else {
        inpField.value = "";
        clearInterval(timer);
    }
}
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}
function resetGame() {
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime, charIndex = mistake = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistake;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}
randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener('click', resetGame);