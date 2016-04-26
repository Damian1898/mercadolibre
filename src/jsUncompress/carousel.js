function qS(selector) {
	return document.querySelector(selector);
}

var carousel = new ch.Carousel(qS('.more-products'), {
	"limitPerPage": 3
});