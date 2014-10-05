PrettyEnableButton = {
	state: true,
	toggle: function () {
		this.state = !this.state;
		/*
		var enel = document.getElementById("pw_toggle_enabled");
		if(this.state) {
			enel.removeAttribute('disabled');
		} else {
			enel.setAttribute('disabled', 'yes');
		}
		*/
	}
}
