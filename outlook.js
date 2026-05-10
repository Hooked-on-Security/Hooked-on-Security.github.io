const sender = document.getElementById("sender");
const email = document.getElementById("email");
let currButton= null;

sender.addEventListener("click", () => {
    currButton = "sender"

    showPopup(
        "Good thinking",
        "That’s worth checking, but the best first step is verifying the sender address. Click the sender email next.",
        "Got it",
        "./assets/lightbulb.png",
        function() {
            closePopup();
        }
    );
});

email.addEventListener("click", () => {
    currButton = "email"
    showPopup(
        "Excellent first step",
        "Checking the sender is one of the most important security checks. Next, you’ll reflect briefly then inspect the address more closely.",
        "Continue",
        "./assets/thumbsup.png",
        function() {
            reflection1('outlook');
        }
    );
});

function scene3Popup(elem) {
    elem.classList.add("clicked");

    showPopup(
        "Correct",
        "Notice the sender uses “@drexel.com”, not “@drexel.edu”. That mismatch is a major red flag.",
        "Continue",
        "./assets/thumbsup.png",
        function () {
            closePopup();
            outlookScene4('scene3');
        }
    );
}

function scene4Popup(elem) {
    elem.classList.add("clicked");

    showPopup(
        "Correct",
        "Attackers rely on display names (like “John Doe” in this case) to build trust. Always verify the actual address.",
        "Continue",
        "./assets/thumbsup.png",
        function () {
            closePopup();
            outlookScene5('scene4');
        }
    );
}

function scene5Popup() {
    showPopup(
        "Perfect",
        "You previewed the destination first. The URL points to a non-Drexel domain: http://hookedonsecurity.com/malicious-site-fake-training. That’s a strong red flag.",
        "Continue",
        "./assets/thumbsup.png",
        function () {
            closePopup();
            outlookScene6('scene5');
        }
    );
}

function scene6Popup(elem) {
    elem.classList.add("clicked");

    showPopup(
        "Correct",
        "Urgency is a common tactic. It reduces careful thinking and pushes fast clicks.",
        "Continue",
        "./assets/thumbsup.png",
        function () {
            closePopup();
            outlookScene7('scene6');
        }
    );
}

function scene9ReplyPopup() {
    showPopup(
        "Not the safest choice",
        "Replying confirms your email address is active to the attacker.",
        "Continue",
        "./assets/incorrect.png",
        function () {
            closePopup();
        }
    );
}

function scene9ForwardPopup() {
    showPopup(
        "Not recommended",
        "Forwarding spreads the risk to others.",
        "Continue",
        "./assets/incorrect.png",
        function () {
            closePopup();
        }
    );
}

function scene9DeletePopup() {
    showPopup(
        "Better but not enough",
        "Deleting removes it from your inbox but doesn’t report the threat.",
        "Continue",
        "./assets/incorrect.png",
        function () {
            closePopup();
        }
    );
}

function scene9VerifyPopup() {
    showPopup(
        "That’s not what we’re looking for",
        "Take a closer look and try again.",
        "Continue",
        "./assets/incorrect.png",
        function () {
            closePopup();
        }
    );
}


function scene9Popup() {
    showPopup(
        "Excellent choice",
        "Choosing “Report Phishing” is the safest. It reduces the risk and protects the others.",
        "Proceed to Knowledge Check",
        "./assets/thumbsup.png",
        function () {
            closePopup();
            window.location.href = "1-knowledge-check.html";
        }
    );
}

function redflag1Popup() {
    showPopup(
        "Red flag marked",
        "Good. You found 1 of 3. Keep looking",
        "Continue",
        "./assets/redflag.png",
        function () {
            closePopup();
        }
    );
}

function redflag2Popup() {
    showPopup(
        "Red flag marked",
        "Good. You found 2 of 3. Keep looking",
        "Continue",
        "./assets/redflag.png",
        function () {
            closePopup();
        }
    );
}

function redflag3Popup() {
    showPopup(
        "All red flag marked",
        "You identified: (1) sender domain mismatch, (2) suspicious link destination, (3) urgency/pressure language. Great work.",
        "Continue",
        "./assets/redflag.png",
        function () {
            closePopup();
            reflection2('scene7');
        }
    );
}

let foundRedflags = 0;

function redflagClick(elem) {
    if (elem.classList.contains("clicked")) {
        return;
    }

    elem.classList.add("clicked");

    elem.style.backgroundColor = "rgba(250, 189, 228, 0.5)";
    elem.style.outline = "2px solid rgba(251,0,0,0.7)";

    foundRedflags++;

    if (foundRedflags === 1) {
        redflag1Popup();
    } else if (foundRedflags === 2) {
        redflag2Popup();
    } else if (foundRedflags === 3) {
        redflag3Popup();
    }
}

function showPopup(titleText, messageText, buttonText, iconSrc, buttonCallback) {
    const popup = document.querySelector(".popup-overlay");
    const title = document.getElementById("popup-title");
    const message = document.getElementById("popup-message");
    const btn = document.getElementById("popup-btn");
    const closeBtn = document.getElementById("popup-close");
    const icon = document.getElementById("popup-icon");

    title.textContent = titleText;
    message.textContent = messageText;
    btn.textContent= buttonText;

    if (iconSrc) {
        icon.src = iconSrc;
        icon.style.display = "block";
    }   else {
        icon.style.display = "none";
    }

    popup.style.display = "flex";

    btn.onclick = function () {
        if (buttonCallback) {
            buttonCallback();
        }
    }

    
    closeBtn.onclick = function () {
        closePopup()
    }
}

function closePopup() {
    const popup = document.querySelector(".popup-overlay");
    popup.style.display = "none";
}

function destroy(id) {
    const elem = document.getElementById(id);

    if (elem === null) {
        return;
    } 
    elem.remove()
}

// Reflection Options
function toggleSelected(elem) {

    const alreadySelected = elem.classList.contains("selected");
    const parent = elem.parentElement;
    const options = parent.querySelectorAll("p");

    options.forEach(opt => opt.classList.remove("selected"));

    const continueBtn = parent.parentElement.querySelector(".btn-continue");
    
    if (!alreadySelected) {
        elem.classList.toggle("selected");
        continueBtn.disabled = false;
    } else {
        continueBtn.disabled = true;
    }

}

function reflection1(id) {
    if (currButton === "email") {
        destroy(id)
        closePopup();

        destroy("scene1-title");

        // Add template node
        const template = document.createElement('template');
        template.innerHTML = 
        `<section id="scene2">
            <div class="reflection-block">
                <div class="reflection-title">Reflection Prompt (non-graded)</div>
                <div class="reflection-question">What made you choose that action?</div>
            </div>

            <div class="options">
                <p onclick="toggleSelected(this)">The request looked normal</p>
                <p onclick="toggleSelected(this)">I trusted the sender's name</p>
                <p onclick="toggleSelected(this)">I did not notice anything suspicious yet</p>
                <p onclick="toggleSelected(this)">I always check the link first</p>
            </div>

            <div class="buttons">
                <button type="button" class="btn-skip" onclick="outlookScene3('scene2')">Skip</button>
                <button type="button" class="btn-continue" disabled onclick="outlookScene3('scene2')">Continue</button>
            </div>
        </section>`
        ;
        let parent = document.getElementById("scene1");
        parent.appendChild(template.content.firstChild);
    } else if (currButton === "sender") {
        closePopup()
    }
    
}

function outlookScene3(id) {
    if (id) {
        destroy(id);

        const template = document.createElement('template');
        template.innerHTML = 
        `<section id="scene3">
            <div class="reflection-block">
                <div class="reflection-title">Inspect the sender’s email address</div>
                <div class="reflection-question">Click the sender’s email address and examine it closely</div>
            </div>

            <div class="email-block" id="outlook">
                <div class="email-header">Outlook</div>

                <div class="email-info">
                    <p>From: <span id="sender">John Doe - Administrative Support</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hover-item" onclick="scene3Popup(this)">&lt;john.doe@drexel.com&gt;</span></p>
                    <P>To: Faculty Distribution List</P>
                    <P>Subject: Free CPR Training Opportunity - Elkins Park Campus</P>
                </div>

                <div class="email-body">
                    <p>Hello faculty,</p>
                    <p>I’m coordinating CPR training scheduling on behalf of the training team for upcoming sessions at the Elkins Park campus.</p>
                    <p>Please complete registration today so we can finalize the participant list before close of business.</p>
                    <p>We’re working to identify availability and finalize participant lists.</p>
                    <p>Please review the session details and indicate your interest using the link below.</p>
                    <p class="tab"><a href="#">Register for CPR Training Session</a></p>
                    <p>If you have any scheduling questions, feel free to reply and we’ll help coordinate.</p>
                    <p>Thank you,</p>
                    <p>John Doe</p>
                </div>
            </div>
        </section>`
            ;
        let parent = document.getElementById("scene1");
        parent.appendChild(template.content.firstChild);
        }
}

function outlookScene4(id) {
    if (id) {
        destroy(id);

        const template = document.createElement('template');
        template.innerHTML = 
        `<section id="scene4">
            <div class="reflection-block">
                <div class="reflection-title">Check the display name vs the real address</div>
                <div class="reflection-question">Click the display name to reveal the actual address again, and flag the mismatch</div>
            </div>

            <div class="email-block" id="outlook">
                <div class="email-header">Outlook</div>

                <div class="email-info">
                    <p>From: <span id="sender" class="hover-item" onclick="scene4Popup(this)">John Doe - Administrative Support</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;john.doe@drexel.com&gt;</span></p>
                    <P>To: Faculty Distribution List</P>
                    <P>Subject: Free CPR Training Opportunity - Elkins Park Campus</P>
                </div>

                <div class="email-body">
                    <p>Hello faculty,</p>
                    <p>I’m coordinating CPR training scheduling on behalf of the training team for upcoming sessions at the Elkins Park campus.</p>
                    <p>Please complete registration today so we can finalize the participant list before close of business.</p>
                    <p>We’re working to identify availability and finalize participant lists.</p>
                    <p>Please review the session details and indicate your interest using the link below.</p>
                    <p class="tab"><a href="#">Register for CPR Training Session</a></p>
                    <p>If you have any scheduling questions, feel free to reply and we’ll help coordinate.</p>
                    <p>Thank you,</p>
                    <p>John Doe</p>
                </div>
            </div>
        </section>`
            ;
        let parent = document.getElementById("scene1");
        parent.appendChild(template.content.firstChild);
        }
}

function outlookScene5(id) {
    if (id) {
        destroy(id);

        const template = document.createElement('template');
        template.innerHTML = 
        `<section id="scene5">
            <div class="reflection-block">
                <div class="reflection-title">Check where the link really goes to</div>
                <div class="reflection-question">Hover over “Register for CPR Training Session” to preview the URL, then click it to confirm you checked</div>
            </div>

            <div class="email-block" id="outlook">
                <div class="email-header">Outlook</div>

                <div class="email-info">
                    <p>From: <span id="sender">John Doe - Administrative Support</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;john.doe@drexel.com&gt;</span></p>
                    <P>To: Faculty Distribution List</P>
                    <P>Subject: Free CPR Training Opportunity - Elkins Park Campus</P>
                </div>

                <div class="email-body">
                    <p>Hello faculty,</p>
                    <p>I’m coordinating CPR training scheduling on behalf of the training team for upcoming sessions at the Elkins Park campus.</p>
                    <p>Please complete registration today so we can finalize the participant list before close of business.</p>
                    <p>We’re working to identify availability and finalize participant lists.</p>
                    <p>Please review the session details and indicate your interest using the link below.</p>
                    <p class="tab" onclick="scene5Popup()"><a href="#" title="http://hookedonsecurity.com/malicious-site-fake-training">Register for CPR Training Session</a></p>
                    <p>If you have any scheduling questions, feel free to reply and we’ll help coordinate.</p>
                    <p>Thank you,</p>
                    <p>John Doe</p>
                </div>
            </div>
        </section>`
            ;
        let parent = document.getElementById("scene1");
        parent.appendChild(template.content.firstChild);
        }
}

function outlookScene6(id) {
    if (id) {
        destroy(id);

        const template = document.createElement('template');
        template.innerHTML = 
        `<section id="scene6">
            <div class="reflection-block">
                <div class="reflection-title">Check the context of the request</div>
                <div class="reflection-question">Click the sentence that pressures you to  act quickly (urgency)</div>
            </div>

            <div class="email-block" id="outlook">
                <div class="email-header">Outlook</div>

                <div class="email-info">
                    <p>From: <span id="sender">John Doe - Administrative Support</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;john.doe@drexel.com&gt;</span></p>
                    <P>To: Faculty Distribution List</P>
                    <P>Subject: Free CPR Training Opportunity - Elkins Park Campus</P>
                </div>

                <div class="email-body">
                    <p>Hello faculty,</p>
                    <p>I’m coordinating CPR training scheduling on behalf of the training team for upcoming sessions at the Elkins Park campus.</p>
                    <p class="hover-item" onclick="scene6Popup(this)">Please complete registration today so we can finalize the participant list before close of business.</p>
                    <p>We’re working to identify availability and finalize participant lists.</p>
                    <p>Please review the session details and indicate your interest using the link below.</p>
                    <p class="tab"><a href="#">Register for CPR Training Session</a></p>
                    <p>If you have any scheduling questions, feel free to reply and we’ll help coordinate.</p>
                    <p>Thank you,</p>
                    <p>John Doe</p>
                </div>
            </div>
        </section>`
            ;
        let parent = document.getElementById("scene1");
        parent.appendChild(template.content.firstChild);
        }
}

function outlookScene7(id) {
    if (id) {
        destroy(id);

        const template = document.createElement('template');
        template.innerHTML = 
        `<section id="scene7">
            <div class="reflection-block">
                <div class="reflection-title">Identify all the red flags in this email</div>
                <div class="reflection-question">Click each suspicious element to flag it. You should find exactly 3 red flags</div>
            </div>

            <div class="email-block" id="outlook">
                <div class="email-header">Outlook</div>

                <div class="email-info">
                    <p>From: <span id="sender">John Doe - Administrative Support</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="redflag-item" onclick="redflagClick(this)">&lt;john.doe@drexel.com&gt;</span></p>
                    <P>To: Faculty Distribution List</P>
                    <P>Subject: Free CPR Training Opportunity - Elkins Park Campus</P>
                </div>

                <div class="email-body">
                    <p>Hello faculty,</p>
                    <p>I’m coordinating CPR training scheduling on behalf of the training team for upcoming sessions at the Elkins Park campus.</p>
                    <p class="redflag-item" onclick="redflagClick(this)">Please complete registration today so we can finalize the participant list before close of business.</p>
                    <p>We’re working to identify availability and finalize participant lists.</p>
                    <p>Please review the session details and indicate your interest using the link below.</p>
                    <p class="redflag-item tab" onclick="redflagClick(this)"><a href="#" title="http://hookedonsecurity.com/malicious-site-fake-training">Register for CPR Training Session</a></p>
                    <p>If you have any scheduling questions, feel free to reply and we’ll help coordinate.</p>
                    <p>Thank you,</p>
                    <p>John Doe</p>
                </div>
            </div>
        </section>`
            ;
        let parent = document.getElementById("scene1");
        parent.appendChild(template.content.firstChild);
        }
}

function reflection2(id) {
    if (id) {
        destroy(id)

        const template = document.createElement('template');
        template.innerHTML = 
        `<section id="scene8">
            <div class="reflection-block">
                <div class="reflection-title">Reflection Prompt (non-graded)</div>
                <div class="reflection-question">What made you choose that action?</div>
            </div>

            <div class="options">
                <p onclick="toggleSelected(this)">The request looked normal</p>
                <p onclick="toggleSelected(this)">I trusted the sender's name</p>
                <p onclick="toggleSelected(this)">I did not notice anything suspicious yet</p>
                <p onclick="toggleSelected(this)">I always check the link first</p>
            </div>

            <div class="buttons">
                <button type="button" class="btn-skip" onclick="outlookScene9('scene8')">Skip</button>
                <button type="button" class="btn-continue" disabled onclick="outlookScene9('scene8')">Continue</button>
            </div>
        </section>`
        ;
        let parent = document.getElementById("scene1");
        parent.appendChild(template.content.firstChild);
    } else if (currButton === "sender") {
        closePopup()
    }
    
}

function outlookScene9(id) {
    if (id) {
        destroy(id);

        const template = document.createElement('template');
        template.innerHTML = 
        `<section id="scene9">
            <div class="reflection-block">
                <div class="reflection-title">What action should you take?</div>
                <div class="reflection-question">Choose the safest action from the Outlook toolbar</div>
            </div>

            <div class="email-block" id="outlook">
                <div class="email-header">Outlook</div>

                <div class="email-info">
                    <p>From: <span id="sender">John Doe - Administrative Support</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hover-item" id="email">&lt;john.doe@drexel.com&gt;</span></p>
                    <P>To: Faculty Distribution List</P>
                    <P>Subject: Free CPR Training Opportunity - Elkins Park Campus</P>
                </div>

                <div class="email-body">
                    <p>Hello faculty,</p>
                    <p>I’m coordinating CPR training scheduling on behalf of the training team for upcoming sessions at the Elkins Park campus.</p>
                    <p>Please complete registration today so we can finalize the participant list before close of business.</p>
                    <p>We’re working to identify availability and finalize participant lists.</p>
                    <p>Please review the session details and indicate your interest using the link below.</p>
                    <p class="tab"><a href="#">Register for CPR Training Session</a></p>
                    <p>If you have any scheduling questions, feel free to reply and we’ll help coordinate.</p>
                    <p>Thank you,</p>
                    <p>John Doe</p>
                </div>

                <div class="scene9-btns">
                    <button type="button" class="button1" onclick="scene9ReplyPopup()">Reply</button>
                    <button type="button" class="button1" onclick="scene9ForwardPopup()">Forward</button>
                    <button type="button" class="button1" onclick="scene9DeletePopup()">Delete</button>

                    <button type="button" class="button2" onclick="scene9VerifyPopup()">
                        <img src="./assets/checkmark.png" alt="check">Verify with contact
                    </button>
                    <button type="button" class="button3" onclick="scene9Popup()">
                        <img src="./assets/report.png" alt="siren">Report Phishing
                    </button>
                </div>
            </div>
        </section>`
            ;
        let parent = document.getElementById("scene1");
        parent.appendChild(template.content.firstChild);
        }
}