export default class Player {

	constructor(name) {
		this.#name = name;
	}

	location;
	#name;

	name = () => this.#name;

	travel(city) {
		this.location = city.travel(this, 5, 5);
		return this.location;
	}
}