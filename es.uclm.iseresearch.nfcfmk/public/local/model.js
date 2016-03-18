/**
 * http://usejsdoc.org/
 */

var Aspects = {
	"PHOTO_CHANGED" : 0,
	"GALLERY_CHANGED" : 1
}

var Model = function() {
	var self = this

	this.galleryLength = [ 4, 4, 4, 4 ]
	this.photoIndex = 0
	this.galleryIndex = 0

	this.listeners = [];

	this.addListener = function(listener) {
		self.listeners.push(listener)
	}

	this.removeListener = function(listener) {
		var index = self.listeners.indexOf(listener)
		if (index > -1)
			self.listeners.splice(index, 1)
	}

	function changed(event) {
		for (var i = 0; i < self.listeners.length; i++) {
			self.listeners[i](event)
		}
	}

	this.setPhotoIndex = function(index) {
		self.photoIndex = index
		changed({
			aspect : Aspects.PHOTO_CHANGED,
			data : self.photoIndex,
			error : null
		});
	}

	this.setGalleryIndex = function(index) {
		self.galleryIndex = index
		changed({
			aspect : Aspects.GALLERY_CHANGED,
			data : self.galleryIndex,
			error : null
		})
	}

	this.nextPhoto = function() {
		self
				.setPhotoIndex((self.photoIndex < self.galleryLength[this.galleryIndex] - 1) ? self.photoIndex + 1
						: self.photoIndex)
	}

	this.prevPhoto = function() {
		self.setPhotoIndex((self.photoIndex > 0) ? self.photoIndex - 1
				: self.photoIndex)
	}

	this.firstPhoto = function() {
		self.setPhotoIndex(0)
	}

	this.lastPhoto = function() {
		self.setPhotoIndex(self.galleryLength[self.galleryIndex] - 1)
	}

	this.nextGallery = function() {
		self
				.setGalleryIndex(self.galleryIndex < self.galleryLength.length - 1 ? self.galleryIndex + 1
						: self.galleryIndex)
		self.setPhotoIndex(0)
	}

	this.prevGallery = function() {
		self.setGalleryIndex(self.galleryIndex > 0 ? self.galleryIndex - 1
				: self.galleryIndex)
		self.setPhotoIndex(0)
	}

	this.firstGallery = function() {
		self.SetGalleryIndex(0)
		self.SetPhotoIndex(0)
	}

	this.lastGallery = function() {
		self.setGalleryIndex(self.galleryLength.length - 1)
		self.setPhotoIndex(0)
	}

	/**
	 * Model Query
	 */

	this.getPhotoUrl = function(callback) {
		callback({
			data : buildPhotoUrl(),
			error : null
		})
	}

	this.getPhotoIndex = function(callback) {
		callback({
			data : self.photoIndex,
			error : null
		})
	}

	this.getGalleryIndex = function(callback) {
		callback({
			data : self.galleryIndex,
			error : null
		})
	}

	this.getGalleryLength = function(callback, index) {
		var param = {
			index : index
		}
		callback({
			data : self.galleryLength[param.index],
			error : null
		})
	}

	function buildPhotoUrl() {
		return '/resources/' + 'gallery' + self.galleryIndex + '/' + 'photo'
				+ self.photoIndex + '.png'
	}
}
