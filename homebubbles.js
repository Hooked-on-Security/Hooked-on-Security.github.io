const bubbleContainer = document.querySelector(".bubbles");

const bubbleCount = 10;

for ( let i = 0; i < bubbleCount; i++) {

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 50 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left = `${Math.random() * 100}%` ;

    const duration = Math.random() * 15 + 10;
    bubble.style.animationDuration = `${duration}s`;

    bubble.style.animationDelay = `${Math.random() * 20}%` ;

    bubbleContainer.appendChild(bubble);
}