import World from "./world.js";

export default class WorldController {

	constructor(ui) {
		this.#ui = ui;
	}

	#ui;
	#world;

	create() {
		this.#ui.render("loading world...");
		this.#world = new World();
		this.#ui.render("generating cities...");
		this.#world.generateCities(5);
	}

	movePlayer(player, cityName) {
		let city = this.#world.getCityByName(cityName);
		if (!city) {
			this.#ui.render("invalid city name");
			return;
		}
		if (player.travel(city)) {
			this.#ui.render(`${player.name()} travelled to ${city.name()}`);
		}
	}

}