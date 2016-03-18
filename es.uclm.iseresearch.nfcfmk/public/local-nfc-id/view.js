/**
 * http://usejsdoc.org/
 */

var model;
var controller;

function updatePhoto() {
	model.getPhotoUrl(function(result) {
		if (!result.error) {
			document.getElementById('photoID').src = result.data;
		} else {
			console.error(result.error);
		}
	});
}

function modelChanged(info) {
	if (info.aspect == Aspects.PHOTO_CHANGED)
		updatePhoto();
}

function tagDiscoveredButtonClicked(event) {
	controller.tagDiscovered({
		id : document.getElementById('tagDiscoveredSelectID').value,
		data : Actions[document.getElementById('tagDiscoveredSelectID').value]
	})
}

function init() {
	model = new Model()
	model.addListener(modelChanged)
	controller = new NfcController(model, window)
	updatePhoto()
}