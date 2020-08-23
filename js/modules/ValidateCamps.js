class ValidateCamps {
	constructor(selectorButton, ...selectorCamps) {
		this.button = document.querySelector(selectorButton);
		this.camps = selectorCamps.map(camp => document.querySelector(camp));
		this.event();
	}
	validate(config) {
		if(this.camps.every(camp => camp.value.length >= config.length)) {
			this.button.removeAttribute('disabled');
		}else {
			this.button.setAttribute('disabled', true);
		}
	}
	event() {
		this.camps.forEach(camp => {
			camp.addEventListener('input', () => {
				this.validate({length: 1});
			});
		});
	}
}

export default ValidateCamps;