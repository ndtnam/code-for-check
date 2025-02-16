
const messages = [
    "cậu có chắc không?",
    "chắc chắn hả??",
    "thoi đừng mà",
    "nghĩ lại thử đi nè",
    "làm ơn đi mà",
    "cậu mà từ chối tớ buồn lắm",
    "tớ sẽ rất buồn...",
    "thật sự tớ sẽ rất buồn đó...",
    "thôi tớ sẽ không hỏi nữa",
    "tớ đùa thôi nè, đồng ý đi cậu ơi ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "dong_y.html";
}