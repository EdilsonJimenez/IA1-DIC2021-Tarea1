// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state) {
	if (state == "DIRTY") return "CLEAN";
	else if (location == "A") return "RIGHT";
	else if (location == "B") return "LEFT";
}

function getActualState() {
	if (states[0] === "A") {
		if (states[1] == "DIRTY") {
			if (states[2] == "DIRTY") {
				return 1;
			} else {
				return 8;
			}
		} else {
			if (states[2] == "DIRTY") {
				return 2;
			} else {
				return 5;
			}
		}
	} else if(states[0] === "B") {
		if (states[2] == "DIRTY") {
			if (states[1] == "DIRTY") {
				return 6;
			} else {
				return 3;
			}
		} else {
			if (states[1] == "DIRTY") {
				return 7;
			} else {
				return 4;
			}
		}
	}
}

function test() {	
	if (lastState == 8) {
		document.getElementById("log").innerHTML += "<br>------ FIN ";
		return;
	};
	if ((lastState === 5 && getActualState() === 4) || lastState == 8) {
		document.getElementById("log").innerHTML += "<br>------ Ensuciando ambos lados ";
		states = ["B", "DIRTY", "DIRTY"];
	}
	lastState = getActualState();

	var location = states[0];
	var state = states[0] == "A" ? states[1] : states[2];
	var action_result = reflex_agent(location, state);

	document.getElementById("log").innerHTML += "<br>Estado ".concat(lastState);
	document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);

	if (action_result == "CLEAN") {
		if (location == "A") states[1] = "CLEAN";
		else if (location == "B") states[2] = "CLEAN";
	}
	else if (action_result == "RIGHT") states[0] = "B";
	else if (action_result == "LEFT") states[0] = "A";
	
	setTimeout(function () {
		test();
	}, 2000);
}

var lastState = 1;
var states = ["A", "DIRTY", "DIRTY"]; //estado 1
test();
