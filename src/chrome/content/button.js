// Object containing the plugin enable-state
PrettyEnableButton = {
	state: true,
	toggle: function () {
		this.state = !this.state;
		var enel = document.getElementById("prettyweb-button");
		if(this.state) {
			enel.removeAttribute('disabled');
		} else {
			enel.setAttribute('disabled', 'yes');
		}
	}
}
