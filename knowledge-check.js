function toggleSelected(elem) {
    const parent = elem.parentElement;
    const isMulti = parent.getAttribute("data-multi-select") === "true";

    const alreadySelected = elem.classList.contains("selected");

    if (!isMulti) {
        if (alreadySelected) {
            elem.classList.remove("selected");
            return;
        }
        
        const options = parent.querySelectorAll("p");
        options.forEach(opt => opt.classList.remove("selected"));
    }
    
    elem.classList.toggle('selected')
}

let btn = document.getElementById("complete-btn");

btn.addEventListener("click", () => {
    const questions = document.querySelectorAll(".quiz-block");

    let allAnswered = true;
    let allCorrect = true;

    for(const q of questions) {
        const options = q.querySelectorAll("p");
        let hasSelected = false;

        for(const opt of options) {
            const isSelected = opt.classList.contains("selected");
            const isCorrect = opt.getAttribute("data-answer") === "true";

            if (isSelected) {
                hasSelected = true;
                if (!isCorrect) {
                    allCorrect = false;
                    break;
                }
            }

            if (isCorrect && !isSelected) {
                allCorrect = false;
            }
        };

        if (!hasSelected) {
            allAnswered = false;
        }

        if (!allCorrect || !allAnswered) {
            break;
        }
    };

    const nextUrl = btn.getAttribute("data-next-page");

    if (!allAnswered) {
        showPopup("Incomplete", "Please answer all questions.");
    } else if (!allCorrect) {
        showPopup("Try Again", "Some answers are incorrect. Please try again.");
    } else {
        showPopup("Success", "All correct! Moving to the next page...", nextUrl);
    }
})

function showPopup(titleText, messageText, nextUrl = null) {
    const popup = document.querySelector(".popup-overlay");
    const title = document.querySelector(".popup-box h3");
    const message = document.querySelector(".popup-box p");

    title.textContent = titleText;
    message.textContent = messageText;

    popup.style.display = "flex";

    document.getElementById("popup-btn").onclick = function () {
        popup.style.display = "none";

        if (nextUrl) {
            window.location.href = nextUrl;
        }
    }
}
