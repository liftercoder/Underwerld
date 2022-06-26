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