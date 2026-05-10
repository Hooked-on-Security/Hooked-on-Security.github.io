const organizer = document.getElementById("organizer");
let currButton= null;

organizer.addEventListener("click", () => {
    currButton = "organizer"
    organizer.classList.add("clicked");

    showPopup(
        "Perfect",
        "Always verify the sender’s identity — a subtle domain mismatch like “drexel.com” instead of “drexel.edu” is a critical red flag.",
        "Continue",
        "./assets/thumbsup.png",
        function() {
            showPopup(
                "What makes this message feel routine?",
                "<ul style='margin-left: 20px; margin-bottom: -20px'><li>Familiar meeting title </li><li>Internal sender name </li><li>Normal tone </li><li>Shared file format </li></ul>",
                "Continue",
                "./assets/redflag.png",
                function () {
                    closePopup();
                    teamsScene2('scene1');
                }
            )
        }
    );
});

function scene2Popup(elem) {
    elem.classList.add("clicked");

    showPopup(
        "Perfect",
        "You previewed the destination first. The URL points to a non-Drexel domain: http://hookedonsecurity.com/malicious-site-fake-training. That’s a strong red flag.",
        "Continue",
        "./assets/thumbsup.png",
        function () {
            closePopup();
            teamsScene3('scene2');
        }
    );
}

function redflag1Popup() {
    showPopup(
        "Red flag marked",
        "Good. You found 1 of 2. Keep looking",
        "Continue",
        "./assets/redflag.png",
        function () {
            closePopup();
        }
    );
}

function redflag2Popup() {
    showPopup(
        "All Red flag marked",
        "You identified: (1) sender domain mismatch, (2) suspicious link destination. Great work.",
        "Continue",
        "./assets/redflag.png",
        function () {
            closePopup();
            teamsScene4('scene3');
        }
    );
}

function scene4ReplyPopup() {
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

function scene4ForwardPopup() {
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

function scene4DeletePopup() {
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

function scene4VerifyPopup() {
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

function scene4Popup() {
    showPopup(
        "Excellent choice",
        "Choosing “Report Phishing” is the safest. It reduces the risk and protects the others.",
        "Proceed to Knowledge Check",
        "./assets/thumbsup.png",
        function () {
            closePopup();
            window.location.href = "2-knowledge-check.html";
        }
    );
}

let foundRedflags = 0;

function redflagClick(elem) {
    if (elem.classList.contains("clicked")) {
        return;
    }

    elem.classList.add("clicked");

    foundRedflags++;

    if (foundRedflags === 1) {
        redflag1Popup();
    } else if (foundRedflags === 2) {
        redflag2Popup();
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
    message.innerHTML = messageText;
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

function teamsScene2(id) {
    if (currButton === "organizer") {
        destroy(id)
        closePopup();

        const template = document.createElement('template');
        template.innerHTML = 
        `<div class="teams-wrapper" id="scene2">
            <h2 class="teams-title">Department Coordination Meeting, Teams Chat</h2>
            <p class="teams-action">Hover over <span style="text-decoration: underline; text-underline-offset: 5px;">“Staff_Bios_Updated.docx”</span> to preview the URL, then click it to confirm you checked</p>

            <div class="teams-block">
                <div class="teams-header">Microsoft Teams</div>

                <div class="teams-body">
                    <div class="teams-sidebar">
                        <div class="sidebar-section">
                            <strong>Meeting</strong>
                            <p>Department Coordination Meeting</p>
                        </div>

                        <div class="sidebar-section">
                            <strong>Organizer</strong>
                            <p id="organizer">Jane Doe - Administrative Support<br>jane.doe@drexel.com</p>
                        </div>

                        <div class="sidebar-section">
                            <strong>Attendees</strong>
                            <p>Faculty Distribution List</p>
                        </div>

                        <div class="source-context">
                            <strong>Source context:<br>the Teams message appears after a meeting invite and active chat thread.</strong>
                        </div>
                    </div>

                    <div class="teams-chat">
                        <div class="chat-initial">JD</div>

                        <div class="chat-bubble">
                            <div class="chat-sender">Jane Doe</div>

                            <p>Thanks to everyone who joined today’s meeting.</p>
                            <p>For those who couldn’t attend, we’re sharing the staff bios referenced so you can review them when you have time.</p>
                            <p>You can access them here:</p>
                            <p class="hover-item tab" onclick="scene2Popup(this)"><a href="#" title="http://hookedonsecurity.com/malicious-site-fake-training">Staff_Bios_Updated.docx</a></p>
                            <p class="link-footer">Shared after meeting by Jane Doe</p>
                        </div>

                    </div>
                </div>
            </div>
        </div> `
        ;
        let parent = document.getElementById("teams");
        parent.appendChild(template.content.firstChild);
    }
}

function teamsScene3(id) {
    if (id) {
        destroy(id)

        const template = document.createElement('template');
        template.innerHTML = 
        `<div class="teams-wrapper" id="scene3">
            <h2 class="teams-title">Department Coordination Meeting, Teams Chat</h2>
            <p class="teams-action">Click each suspicious element to flag it. You should find exactly 2 red flags.</p>

            <div class="teams-block">
                <div class="teams-header">Microsoft Teams</div>

                <div class="teams-body">
                    <div class="teams-sidebar">
                        <div class="sidebar-section">
                            <strong>Meeting</strong>
                            <p>Department Coordination Meeting</p>
                        </div>

                        <div class="sidebar-section">
                            <strong>Organizer</strong>
                            <p id="organizer">Jane Doe - Administrative Support</p>
                            <p class="redflag-item" onclick="redflagClick(this)">jane.doe@drexel.com</p>
                        </div>

                        <div class="sidebar-section">
                            <strong>Attendees</strong>
                            <p>Faculty Distribution List</p>
                        </div>

                        <div class="source-context">
                            <strong>Source context:<br>the Teams message appears after a meeting invite and active chat thread.</strong>
                        </div>
                    </div>

                    <div class="teams-chat">
                        <div class="chat-initial">JD</div>

                        <div class="chat-bubble">
                            <div class="chat-sender">Jane Doe</div>

                            <p>Thanks to everyone who joined today’s meeting.</p>
                            <p>For those who couldn’t attend, we’re sharing the staff bios referenced so you can review them when you have time.</p>
                            <p>You can access them here:</p>
                            <p class="redflag-item tab" onclick="redflagClick(this)"><a href="#" title="http://hookedonsecurity.com/malicious-site-fake-training">Staff_Bios_Updated.docx</a></p>
                            <p class="link-footer">Shared after meeting by Jane Doe</p>
                        </div>

                    </div>
                </div>
            </div>
        </div> `
        ;
        let parent = document.getElementById("teams");
        parent.appendChild(template.content.firstChild);
    }
}

function teamsScene4(id) {
    if (id) {
        destroy(id)

        const template = document.createElement('template');
        template.innerHTML = 
        `<div class="teams-wrapper" id="scene4">
            <h2 class="teams-title">Department Coordination Meeting, Teams Chat</h2>
            <p class="teams-action">Click each suspicious element to flag it. You should find exactly 2 red flags.</p>

            <div class="teams-block">
                <div class="teams-header">Microsoft Teams</div>

                <div class="teams-body">
                    <div class="teams-sidebar">
                        <div class="sidebar-section">
                            <strong>Meeting</strong>
                            <p>Department Coordination Meeting</p>
                        </div>

                        <div class="sidebar-section">
                            <strong>Organizer</strong>
                            <p id="organizer">Jane Doe - Administrative Support</p>
                            <p>jane.doe@drexel.com</p>
                        </div>

                        <div class="sidebar-section">
                            <strong>Attendees</strong>
                            <p>Faculty Distribution List</p>
                        </div>

                        <div class="source-context">
                            <strong>Source context:<br>the Teams message appears after a meeting invite and active chat thread.</strong>
                        </div>
                    </div>

                    <div class="teams-chat">
                        <div class="chat-initial">JD</div>

                        <div class="chat-bubble">
                            <div class="chat-sender">Jane Doe</div>

                            <p>Thanks to everyone who joined today’s meeting.</p>
                            <p>For those who couldn’t attend, we’re sharing the staff bios referenced so you can review them when you have time.</p>
                            <p>You can access them here:</p>
                            <p class="tab"><a href="#">Staff_Bios_Updated.docx</a></p>
                            <p class="link-footer">Shared after meeting by Jane Doe</p>

                            <div class="scene4-btns">
                                <button type="button" class="button1" onclick="scene4ReplyPopup()">Reply</button>
                                <button type="button" class="button1" onclick="scene4ForwardPopup()">Forward</button>
                                <button type="button" class="button1" onclick="scene4DeletePopup()">Delete</button>

                                <button type="button" class="button2" onclick="scene4VerifyPopup()">
                                    <img src="./assets/checkmark.png" alt="check">Verify with contact
                                </button>
                                <button type="button" class="button3" onclick="scene4Popup()">
                                    <img src="./assets/report.png" alt="siren">Report Phishing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> `
        ;
        let parent = document.getElementById("teams");
        parent.appendChild(template.content.firstChild);
    }
}