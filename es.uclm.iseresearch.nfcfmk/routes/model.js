/**
 * http://usejsdoc.org/
 */
var model = new function() {
	var self = this
	this.galleryLength = [ 4, 4, 4, 4 ]
	this.photoIndex = 0
	this.galleryIndex = 0

	this.nextPhoto = function() {
		console.log('NEXT PHOTO')
		this.photoIndex = (this.photoIndex < this.galleryLength[this.galleryIndex] - 1) ? this.photoIndex + 1
				: this.photoIndex;
		return this.getModelState()
	}

	this.prevPhoto = function() {
		console.log('PREV PHOTO')
		this.photoIndex = (this.photoIndex > 0) ? this.photoIndex - 1
				: this.photoIndex;
		return this.getModelState()
	}

	this.firstPhoto = function() {
		console.log('FIRST PHOTO')
		this.photoIndex = 0
		return this.getModelState()
	}

	this.lastPhoto = function() {
		console.log('LAST PHOTO')
		this.photoIndex = this.galleryLength[this.galleryIndex] - 1
		return this.getModelState()
	}

	this.nextGallery = function() {
		console.log('NEXT GALLERY')
		this.galleryIndex = this.galleryIndex < this.galleryLength.length - 1 ? this.galleryIndex + 1
				: this.galleryIndex
		this.photoIndex = 0
		return this.getModelState()
	}

	this.prevGallery = function() {
		console.log('PREV GALLERY')
		this.galleryIndex = this.galleryIndex > 0 ? this.galleryIndex - 1
				: this.galleryIndex
		this.photoIndex = 0
		return this.getModelState()
	}

	this.firstGallery = function() {
		console.log('FIRST GALLERY')
		this.galleryIndex = 0
		this.photoIndex = 0
		return this.getModelState()
	}

	this.lastGallery = function() {
		console.log('LAST GALLERY')
		this.galleryIndex = this.galleryLength.length - 1
		this.photoIndex = 0
		return this.getModelState()
	}

	this.getModelState = function() {
		return {
			photo : this.photoIndex,
			gallery : this.galleryIndex,
		}
	}
}()

module.exports = model