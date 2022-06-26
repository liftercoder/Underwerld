export default class UI {

	constructor(eventBus) {
		let returnKeyCode = "Enter";
		document.addEventListener("keyup", (ev) => {
			if (ev.key === returnKeyCode) {
				this.#submitCommand();
			}
		});
		this.#eventBus = eventBus;
	}

	#consoleOutElement;
	#consoleInElement;
	#eventBus;
	#missingArgsError = "invalid number of arguments specified";

	render() {
		if (!this.#consoleOutElement || !this.#consoleInElement) {
			console.log("render insert");
			this.#insert();
			this.render = this.#update;
		}
	}

	reset() {}

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

	reset() {
		this.#consoleOutElement.value = "";
    }

	#dateOptions = { day: "2-digit", year: "numeric", month: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" };

	#update(output) {
		let dt = new Date();
		this.#consoleOutElement.value += `[${dt.toLocaleDateString("en-GB", this.#dateOptions)}] ${output}\n`;
	}

	#error(message) {
		this.render(`*** ${message} ***`);
    }

	#submitCommand() {

		let cmd = this.#consoleInElement.value.trim();

		if (this.#consoleInElement.value.trim() == "") {
			return;
		}

		this.#consoleInElement.value = "";

		let match = true;

		let parts = cmd.split(" ");

		try {
			// Replace with config injection
			switch (parts[0]) {
				case "travel":
					if (parts.length != 2) {
						this.#error(this.#missingArgsError);
						break;
					}
					this.#eventBus.pub("player-travel", { location: parts[1] })
					break;
				case "clear":
					this.reset();
					break;
				default:
					match = false;
			}
		} catch(error) {
			this.render(error.message);
			throw error;
        }

		if (!match) {
			this.render(`unrecognised command: ${cmd}`);
		}
	}
}