import UI from "./ui.js";
import Player from "./player.js";
import EventBus from "./event-bus.js";
import WorldController from "./world-controller.js";

let errorHandler = (outputFunc, func) => {
	try {
		func();
	} catch (error) {
		outputFunc(`Error: ${error.message}`);
		throw error;
	}
}



document.addEventListener("DOMContentLoaded", () => {

	let eventBus = new EventBus(),
		ui = new UI(eventBus),
		worldController = new WorldController(ui);

	errorHandler((errorMessage) => {
			ui.render(errorMessage);
        },
		() => {

			ui.render(); // sort it out so I don't need this

			worldController.create();

			ui.render("creating player...");

			let player = new Player("John Jay");

			eventBus.sub("player-travel", (payload) => {
				worldController.movePlayer(player, payload.location);
			});

			ui.render("done");
		}
	);
});
