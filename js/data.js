function createImage(src, width, height){
	var image = new Image();
	image.src = src;
	image.width = width;
	image.height = height;
	return image;
}
//AJOUTER LES ITEM SUIVANT CETTE SYNTAXE: var nom = createImage(src, width, height);
var basebg1 = new Image();
	basebg1.src= "assets/bg/base1.svg";
	basebg1.height = $('#graphic').height();
	basebg1.width = $('#graphic').width();
var basebg2 = new Image();
	basebg2.src= "assets/bg/base2.svg";
	basebg2.height = $('#graphic').height();
	basebg2.width = $('#graphic').width();
var lit = createImage('assets/world1/lit.svg', 1150, 577);
var peluche = createImage('assets/world1/peluche.svg', 318, 318);
var maison = createImage('assets/world2/maison.svg', 255, 145);
var etage = createImage('assets/world2/etage.svg', 547, 219);
var toit = createImage('assets/world2/toit.svg', 354, 68);
var nuage = createImage('assets/world3/nuage.svg', 792, 450);
var nuage2 = createImage('assets/world3/nuage2.svg', 778, 480);




//FIN ITEM
var canvas = $('#graphic'),
	canvasM,
	ctx = canvas[0].getContext('2d'),
	step = 0,
	speed = 15,
	score = 0,
	dead = 0,
	first = true,
	world = 1,
	scrollBG = 0,
	move = 0,
	altItem = 0,
	unlock = 0,
	music = 1,
	ground = 1,
	worldStep = 6;
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
				return bg = new gameBlock(bgI, canvas.width(), bgI.height, 0, canvas.height()-bgI.height);
			};
			break;
		case 2:
			var bgI = new Image();
			bgI.src = 'assets/bg/bg2.svg';
			bgI.onload = function(){
				bg = null;
				return bg = new gameBlock(bgI, canvas.width(), bgI.height, 0, canvas.height()-bgI.height);
			};
			break;
		case 3:
			var bgI = new Image();
			bgI.src = 'assets/bg/bg2.svg';
			bgI.onload = function(){
				bg = null;
				return bg = new gameBlock(bgI, canvas.width(), bgI.height, 0, canvas.height()-bgI.height);
			};
			break;
		case 4:
			var bgI = new Image();
			bgI.src = 'assets/bg/bg4.svg';
			bgI.onload = function(){
				bg = null;
				return bg = new gameBlock(bgI, canvas.width(), bgI.height, 0, canvas.height()-bgI.height);
			};
			break;
		case 5:
			var bgI = new Image();
			bgI.src = 'assets/bg/bg5.svg';
			bgI.onload = function(){
				bg = null;
				return bg = new gameBlock(bgI, canvas.width(), bgI.height, 0, canvas.height()-bgI.height);
			};
			break;
	}
}

function getItem(def){
	switch(world){
		case 1://item monde 1
			if(def) return lit;
			else
				switch(Math.floor((Math.random()*2)+1)){
					case 1:
						return lit;
						break;
					case 2:
						return peluche;
						break;
				};
		case 2://item monde 2
			if(def) return maison;
			else
				switch(altItem%2){
					case 0:
						altItem++;
						return etage;
						break;
					case 1:
						altItem++;
						return toit;
						break;
				};
		case 3://item monde 3
			if(def) return maison;
			switch(Math.floor((Math.random()*2)+1)){
				case 1:
					return nuage;
					break;
				case 2:
					return nuage2;
					break;
			}
		case 4://item monde 4
			switch(Math.floor((Math.random()*2)+1)){
				case 1:
					return aste;
					break;
				case 2:
					return aste2;
					break;
			}
	}
}