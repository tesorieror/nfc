/**
 * http://usejsdoc.org/
 */

var NfcController = function(model, view) {
	var self = this

	this.tagDiscovered = function(tag) {
		console.log("Tag ID:", tag.id)
		self[Actions[tag.id] + 'TagDiscovered']()
	}

	this.firstGalleryTagDiscovered = function() {
		model.firstGallery()
	}

	this.prevGalleryTagDiscovered = function() {
		model.prevGallery()
	}

	this.nextGalleryTagDiscovered = function() {
		model.nextGallery()
	}

	this.lastGalleryTagDiscovered = function() {
		model.lastGallery()
	}

	this.firstPhotoTagDiscovered = function() {
		model.firstPhoto()
	}

	this.prevPhotoTagDiscovered = function() {
		model.prevPhoto()
	}

	this.nextPhotoTagDiscovered = function() {
		model.nextPhoto()
	}

	this.lastPhotoTagDiscovered = function() {
		model.lastPhoto()
	}
}