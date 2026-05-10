function initialize() {
    sessionStorage.removeItem("state")
    sessionStorage.setItem("state", JSON.stringify({scenario1 : false, kc1 : false, scenario2: false, kc2 : false}))
}

function scenario1() {
    let state = JSON.parse(sessionStorage.getItem("state"));

    if(!state) {
        window.location.href = "./mini-lesson.html";
        return;
    }

    state.scenario1 = true;
    sessionStorage.setItem("state", JSON.stringify(state));
}

function kc1() {
    let state = JSON.parse(sessionStorage.getItem("state"));

    if(!state) {
        window.location.href = "./mini-lesson.html";
        return;
    }
    
    if (!state.scenario1) {
        window.location.href = "./scenario1-landing.html";
        return;
    }
    
    state.kc1 = true;
    sessionStorage.setItem("state", JSON.stringify(state));
}

function scenario2() {
    let state = JSON.parse(sessionStorage.getItem("state"));

    if(!state) {
        window.location.href = "./mini-lesson.html";
        return;
    }
    
    if (!state.scenario1) {
        window.location.href = "./scenario1-landing.html";
        return;
    }
    
    if (!state.kc1) {
        window.location.href = "./1-knowledge-check.html";
        return;
    }
    
    state.scenario2 = true;
    sessionStorage.setItem("state", JSON.stringify(state));
}

function kc2() {
    let state = JSON.parse(sessionStorage.getItem("state"));

    if(!state) {
        window.location.href = "./mini-lesson.html";
        return;
    }
    
    if (!state.scenario1) {
        window.location.href = "./scenario1-landing.html";
        return;
    }
    
    if (!state.kc1) {
        window.location.href = "./1-knowledge-check.html";
        return;
    }
    
    if (!state.scenario2) {
        window.location.href = "./scenario2-landing.html";
        return;
    }
    
    state.kc2 = true;
    sessionStorage.setItem("state", JSON.stringify(state));
}

function final() {
    let state = sessionStorage.getItem("state")
    
    if (state != null) {
        state = JSON.parse(state)
        if (state.scenario1 == true && state.kc1 == true && state.scenario2 == true && state.kc2 == true) {
            //Create Certificate 
        } else if (state.scenario1 == true && state.kc1 == true && state.scenario2 == true && state.kc2 == false) {
            //Block create Certificate
            window.location.href = "./2-knowledge-check.html";
        } else if (state.scenario1 == true && state.kc1 == true && state.scenario2 == false && state.kc2 == false) {
            window.location.href = "./scenario2-landing.html";
        } else if (state.scenario1 == true && state.kc1 == false && state.scenario2 == false && state.kc2 == false) {
            window.location.href = "./1-knowledge-check.html";
        } else if (state.scenario1 == false && state.kc1 == false && state.scenario2 == false && state.kc2 == false) {
            window.location.href = "./mini-lesson.html";
        }
    } else {
        //Block create Certificate
            window.location.href = "./mini-lesson.html";
    }
}
