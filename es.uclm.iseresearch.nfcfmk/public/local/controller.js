/**
 * http://usejsdoc.org/
 */


var Controller = function(model, view) {
	var self = this

	this.firstGalleryButtonClicked = function() {
		model.firstGallery()
	}

	this.prevGalleryButtonClicked = function() {
		model.prevGallery()
	}

	this.nextGalleryButtonClicked = function() {
		model.nextGallery()
	}

	this.lastGalleryButtonClicked = function() {
		model.lastGallery()
	}

	this.firstPhotoButtonClicked = function() {
		model.firstPhoto()
	}

	this.prevPhotoButtonClicked = function() {
		model.prevPhoto()
	}

	this.nextPhotoButtonClicked = function() {
		model.nextPhoto()
	}

	this.lastPhotoButtonClicked = function() {
		model.lastPhoto()
	}
}