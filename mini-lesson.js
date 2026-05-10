let div = document.getElementById("block1");
if (div != null) {
    div.style.display = "block";
}

let previousStep = 1;

let btn = document.getElementById("continue-btn");

btn.addEventListener("click", () => {
    if (previousStep > 3) {
        window.location.href = "scenario1-landing.html";
        return;
    }
    let id = "block" + (previousStep + 1);
    let block = document.getElementById(id);

    block.style.display = "block";
    
    if (previousStep == 3) {
        btn.innerHTML = "Complete Lesson"
    }

    previousStep++;
})