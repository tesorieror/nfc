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

function tagDiscoveredButtonClicked() {
	controller.tagDiscovered({
		id : document.getElementById('tagDiscoveredInputTextID').value
	})
}

function init() {
	// model = new Model()
	// model.addListener(modelChanged)
	controller = new Controller(model, window)
	// updatePhoto()

}