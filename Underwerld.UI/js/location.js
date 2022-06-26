export default class Location {
	constructor(typeName) {
		this.#typeName = typeName;
	}

	#typeName;
	#players = [];

	movePlayer(player) {
		this.#players.push(player);
	}
}