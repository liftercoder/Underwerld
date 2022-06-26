import UI from "./ui.js";
import World from "./world.js";
import Player from "./player.js";
import EventBus from "./event-bus.js";

document.addEventListener("DOMContentLoaded", () => {

	//new HtmlComponent().load("components/logo.html", document.getElementById("game-container"));

	let eventBus = new EventBus();

	let ui = new UI(eventBus);

	ui.render();

	ui.render("loading world...");

	let world = new World();

	ui.render("generating cities...");

	world.generateCities(5);

	ui.render("creating player...");

	let player = new Player("John Jay");

	eventBus.sub("player-travel", (payload) => {
		let city = world.getCityByName(payload.location);
		if (!city) {
			ui.render("invalid city name");
			return;
		}
		if (player.travel(city)) {
			ui.render(`${player.name()} travelled to ${city.name()}`);
		}
	});

	ui.render("done");
});
