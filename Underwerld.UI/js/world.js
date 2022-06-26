import City from "./city.js";

export default class World {

	#cities = [];

	generateCities(numberOfCities) {
		for (let i = 0; i < numberOfCities; i++) {
			this.#cities[i] = new City(`City${i}`, 10, 10);
		}
	}

	getCity = (index) => this.#cities[index];
	getCityByName = (cityName) => this.#cities.find(city => city.name().toLowerCase() == cityName.toLowerCase());

}