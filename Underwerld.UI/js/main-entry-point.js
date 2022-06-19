class UI {

	constructor() {
		let returnKeyCode = "Enter";
		document.addEventListener("keyup", (ev) => {
			if (ev.key === returnKeyCode) {
				this.#submitCommand();
			}
		});
    }

	#consoleOutElement;
	#consoleInElement;

	render() {
		if (!this.#consoleOutElement || !this.#consoleInElement) {
			console.log("render insert");
			this.#insert();
			this.render = this.#update;
        }
	}

	#insert() {
		let consoleOut = document.createElement("textarea");
		consoleOut.id = "console-out";
		consoleOut.disabled = true;
		this.#consoleOutElement = document.getElementById("game-container").appendChild(consoleOut);

		let consoleIn = document.createElement("input");
		consoleIn.type = "text";
		consoleIn.id = "console-in";
		consoleIn.placeholder = "> command";
		this.#consoleInElement = document.getElementById("game-container").appendChild(consoleIn);
	}

	#dateOptions = { day: "2-digit", year: "numeric", month: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" };

	#update(output) {
		let dt = new Date();
		this.#consoleOutElement.value += `[${dt.toLocaleDateString("en-GB", this.#dateOptions)}] ${output}\n`;
	}

	#submitCommand() {

		let cmd = this.#consoleInElement.value.trim();

		if (this.#consoleInElement.value.trim() == "") {
			return;
		}

		this.#consoleInElement.value = "";
		let match = true;
		// Replace with config injection
		switch (cmd) {
			case "whereami":
				this.render("you are here");
				break;
			default:
				match = false;
		}

		if (!match) {
			this.render(`unrecognised command: ${cmd}`)
		}
    }
}

class World {

	#cities = [];

	generateCities(numberOfCities) {
		for (let i = 0; i < numberOfCities; i++) {
			this.#cities = new City(`City${i}`, 10, 10);
        }
    }

}


class Location {
	constructor(typeName) {
		this.#typeName = typeName;
	}

	#typeName;
	#players = [];

	movePlayer(player) {
		this.#players.push(player);
    }
}

class City {

	constructor(name, x, y) {
		this.#name = name;
		this.#createLocations(x, y);
	}

	#name;
	#locations = [];

	name = () => this.#name;

	#createLocations(x, y) {
		for (let i = 0; i < x; i++) {
			let pos = [];
			for (let j = 0; j < y; j++) {
				pos[j] = new Location("normal");
			}
			this.#locations[i] = pos;
        }
	};

	travel(player, x, y) {
		this.#locations[x][y].movePlayer(player)
		console.log(`${player.name()} arrived at ${this.#name}`);
		return this.#locations[x][y];
    }

}

class Player {

	constructor(name) {
		this.#name = name;
	}

	location;
	#name;

	name = () => this.#name;

	travel(city) {
		this.location = city.travel(this, 5, 5);
    }
}

class HtmlComponent {

	load(filePath, parentElement) {

		fetch(filePath)
			.then(response => response.text())
			.then(data => this.#insert(data, parentElement));
	}

	#insert(child, parentElement) {
		parentElement.innerHTML += child;
	}

}

document.addEventListener("DOMContentLoaded", () => {

	//new HtmlComponent().load("components/logo.html", document.getElementById("game-container"));

	let ui = new UI("console");
	ui.render();

	ui.render("loading world...");

	let world = new World();

	ui.render("generating cities...");

	world.generateCities(5);

	ui.render("creating player...");

	player = new Player("John Jay");

	ui.render("done");
});
