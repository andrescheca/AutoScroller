var frecuencia = 250; // original 500
var cantidadLineas = 0.5; // original 1
var offset = {right: '20px', top: '20px'};
var scrollerDiv = document.createElement('div');
var posicionSeleccionada = 0;
var scrollDelay;
function createDiv(html) {
	scrollerDiv.setAttribute('id', 'scrollerDiv'); 
	scrollerDiv.style.width = '30px'; 
	scrollerDiv.style.height = '147px'; 
	scrollerDiv.style.position = 'fixed'; 
	scrollerDiv.style.right = offset.right; 
	scrollerDiv.style.top = offset.top; 
	scrollerDiv.style.zIndex = 9e4;
	scrollerDiv.style.MozUserSelect='none';
	scrollerDiv.innerHTML = html;
	scrollerDiv.onselectstart = function() { return false; }
	document.body.appendChild(scrollerDiv);
}
function pageScroll() {
	if(posicionSeleccionada>0){
		window.scrollBy(0, cantidadLineas);
		scrollDelay = setTimeout('pageScroll()', frecuencia/posicionSeleccionada/5);
	} else {
		clearInterval(scrollDelay);
		scrollDelay = false;
	}
}

function addRollEvents() {
	var scrollerButtons = document.getElementsByName('scrollerButton');
	for (i = 0; i < scrollerButtons.length; i++) {
		scrollerButtons[i].onmouseover = function(event) {
											//this.style.background = 'rgba(51, 102, 153, 0.5)';
											var indice = 0;
											var indiceEncontrado = false;
											var j = 0;
											do {
												if (event.target.parentNode.childNodes[j] == this) {
													indiceEncontrado = true;
													indice = j;
												}
												j++;
											} while ((j < scrollerButtons.length) && !indiceEncontrado);
											if (indiceEncontrado && indice != (scrollerButtons.length - 1)) {
												// pintar todos los anteriores.
												for (j = 1; j < indice + 1; j++) {
													scrollerButtons[j].style.background = 'rgba(51, 102, 153, ' + (0.3 + (j/10) ) + ')';
												}
											}
										};
		scrollerButtons[i].onmouseout = function(event) {
											if (posicionSeleccionada == 0) {
												for (j = 1; j < (scrollerButtons.length - 1); j++) {
													scrollerButtons[j].style.background = 'rgba(0, 0, 0, 0.1)';
												}
											} else {
												for (j = (posicionSeleccionada + 1); j < (scrollerButtons.length - 1); j++) {
													scrollerButtons[j].style.background = 'rgba(0, 0, 0, 0.1)';
												}
											}
											if(event.target.parentNode.childNodes[0] == this ||
												event.target.parentNode.childNodes[scrollerButtons.length - 1] == this) {
												this.style.background = 'rgba(51, 102, 153, 0.6)';
											}
										};
		scrollerButtons[i].onmousedown = function() {
											var indice = 0;
											var indiceEncontrado = false;
											var j = 0;
											do {
												if (event.target.parentNode.childNodes[j] == this) {
													indiceEncontrado = true;
													indice = j;
												}
												j++;
											} while ((j < scrollerButtons.length) && !indiceEncontrado);
											posicionSeleccionada = indice;
											for (j = 1; j < (posicionSeleccionada); j++) {
												scrollerButtons[j].style.background = 'rgba(51, 102, 153, ' + (0.3 + (j/10) ) + ')';
											}
											for (j = (posicionSeleccionada + 1); j < (scrollerButtons.length - 1); j++) {
												scrollerButtons[j].style.background = 'rgba(0, 0, 0, 0.1)';
											}
											if (!scrollDelay) {
												pageScroll();
											}
											return false;
										};
	}
	// Agregar al primero y al ultimo los eventos de onmousedown.
	scrollerButtons[0].onmousedown = function () {
										if (posicionSeleccionada > 0) {
											posicionSeleccionada--;
											for (j = 1; j < posicionSeleccionada + 1; j++) {
												scrollerButtons[j].style.background = 'rgba(51, 102, 153, ' + (0.3 + (j/10) ) + ')';
											}
											for (j = (posicionSeleccionada + 1); j < (scrollerButtons.length - 1); j++) {
												scrollerButtons[j].style.background = 'rgba(0, 0, 0, 0.1)';
											}
										}
									};
	scrollerButtons[scrollerButtons.length - 1].onmousedown = function () {
										if (posicionSeleccionada < (scrollerButtons.length - 2)) {
											posicionSeleccionada++;
											if (!scrollDelay) {
												pageScroll();
											}
											for (j = 1; j < posicionSeleccionada + 1; j++) {
												scrollerButtons[j].style.background = 'rgba(51, 102, 153, ' + (0.3 + (j/10) ) + ')';
											}
											for (j = (posicionSeleccionada + 1); j < (scrollerButtons.length - 1); j++) {
												scrollerButtons[j].style.background = 'rgba(0, 0, 0, 0.1)';
											}
										}
									};
}
function init() {
	if (!document.getElementById('scrollerDiv')) {
		var html = '';
		var cellHeight = 147 / 7;
		html += '<div name=\'scrollerButton\' style=\'color: #FFF; -webkit-border-top-left-radius: 0.4em; -webkit-border-top-right-radius: 0.4em; -moz-border-radius-topleft: 0.4em; -moz-border-radius-topright: 0.4em; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; background-color: rgba(51, 102, 153, 0.6); cursor: pointer; position: relative; top: -0px; width: 30px; height: ' + cellHeight + 'px;\' align=\'center\'>\u25B2</div>';
		for (i = 0; i<5; i++) {
			html += '<div name=\'scrollerButton\' style=\'background-color: rgba(0, 0, 0, 0.1); cursor: pointer; position: relative; width: 30px; height: ' + cellHeight + 'px;\' align=\'center\'></div>';
		}
		html += '<div name=\'scrollerButton\' style=\'color: #FFF; -webkit-border-bottom-left-radius: 0.4em; -webkit-border-bottom-right-radius: 0.4em; -moz-border-radius-bottomleft: 0.4em; -moz-border-radius-bottomright: 0.4em; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; background-color: rgba(51, 102, 153, 0.6); cursor: pointer; position: relative; bottom: -0px; width: 30px; height: ' + cellHeight + 'px;\' align=\'center\'>\u25BC</div>';
		createDiv(html);
		addRollEvents();
		pageScroll();
	}
}
init();