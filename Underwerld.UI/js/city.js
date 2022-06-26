import Location from "./location.js";

export default class City {

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
		return this.#locations[x][y];
	}

}