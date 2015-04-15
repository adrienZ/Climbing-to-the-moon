function createImage(src, width, height){
	var image = new Image();
	image.src = src;
	image.width = width;
	image.height = height;
	return image;
}
//AJOUTER LES ITEM SUIVANT CETTE SYNTAXE: var nom = createImage(src, width, height);
var lit = createImage('assets/world1/lit.svg', 1150, 577);
var peluche = createImage('assets/world1/peluche.svg', 337, 318);
var maison = createImage('assets/world2/maison.svg', 255, 145);


//FIN ITEM
var canvas = $('#graphic'),
	canvasM,
	ctx = canvas[0].getContext('2d'),
	step = 5,
	speed = 15,
	score = 0,
	dead = 0,
	first = true,
	world = 1,
	scrollBG = 0,
	move = 0;
function gameBlock(img, sizex, sizey, posx, posy){
	this.img = img;
	this.sizex = sizex;
	this.sizey = sizey;
	this.posx = posx;
	this.posy = posy;
	/*this.dirRight = function(oldPos, step) {this.posx = oldPos+step;};
	this.moveUp = function(oldPos, step) {this.posy = oldPos+step;};*/
}
function dirRight(oldPos, step){
	return oldPos+step;
}
function moveUp(oldPos, step){
	return oldPos+step;
}
var bg = initbg();
function initbg(){
	switch(world){
		case 1:
			var bgI = new Image();
			bgI.src = 'assets/bg/bg1.svg';
			bgI.onload = function(){
			bg = null;
			return bg = new gameBlock(bgI, canvas.width(), bgI.height, 0, canvas.height()-bgI.height);};
			break;
		case 2:
			var bgI = new Image();
			bgI.src = 'assets/bg/bg2.svg';
			bgI.onload = function(){
				bg = null;
				return bg = new gameBlock(bgI, canvas.width(), bgI.height, 0, canvas.height()-bgI.height);};
			break;
		case 3:
			var bgI = new Image();
			bgI.src = 'assets/bg/bg3.svg';
			bgI.onload = function(){
				bg = null;
				return bg = new gameBlock(bgI, canvas.width(), bgI.height, 0, canvas.height()-bgI.height);};
			break;
		case 4:
			var bgI = new Image();
			bgI.src = 'assets/bg/bg4.svg';
			bgI.onload = function(){
				bg = null;
				return bg = new gameBlock(bgI, canvas.width(), bgI.height, 0, canvas.height()-bgI.height);};
			break;
		case 5:
			var bgI = new Image();
			bgI.src = 'assets/bg/bg5.svg';
			bgI.onload = function(){
				bg = null;
				return bg = new gameBlock(bgI, canvas.width(), bgI.height, 0, canvas.height()-bgI.height);};
			break;
	}
}

function getItem(id){
	switch(world){
		case 1://item monde 1
			switch(id){
				case 1:
					return lit;
					break;
				case 2:
					return peluche;
					break;
			}
		case 2://item monde 2
			switch(id){
				case 1:
					return maison;
					break;
				case 2:
					return peluche;
					break;
			}
		case 3://item monde 3
			switch(id){
				case 1:
					return nuage;
					break;
				case 2:
					return nuage2;
					break;
			}
		case 4://item monde 4
			switch(id){
				case 1:
					return aste;
					break;
				case 2:
					return aste2;
					break;
			}
	}
}