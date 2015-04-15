function createImage(src, width, height){
	var image = new Image();
	image.src = src;
	image.width = width;
	image.height = height;
	return image;
}
//AJOUTER LES ITEM SUIVANT CETTE SYNTAXE: var nom = createImage(src, width, height);. Penser à modifier la fonction getItem également. Pour les background, suivre la syntaxe en dessous
var basebg1 = new Image();
	if(tom) basebg1.src= "assets/bg/base1.png";
	else basebg1.src= "assets/bg/base1.png";
	basebg1.height = viewportH;
	basebg1.width = viewportW;
var basebg2 = new Image();
	basebg2.src= "assets/bg/base2.png";
	basebg2.height = viewportH;
	basebg2.width = viewportW;
var bg1 = new Image();
	if(tom) bg1.src= "assets/bg/bg1.svg";
	else bg1.src= "assets/bg/bg1.svg";
	bg1.width = viewportW;
	bg1.height = viewportH;
var bg2 = new Image();
	bg2.src= "assets/bg/bg2.svg";
	bg2.width = viewportW;
var bg4 = new Image();
	bg4.src= "assets/bg/bg4.svg";
	bg4.width = viewportW;
var lit = createImage('assets/world1/lit.svg', 1150, 577);
var peluche = createImage('assets/world1/peluche.svg', 318, 318);
var maison = createImage('assets/world2/maison.svg', 255, 145);
var etage = createImage('assets/world2/etage.svg', 547, 219);
var toit = createImage('assets/world2/toit.svg', 354, 68);
var nuage = createImage('assets/world3/nuage.svg', 488, 276);
var nuage2 = createImage('assets/world3/nuage2.svg', 778, 480);
var terre = createImage('assets/world4/terre.svg', 758, 209);
var aste = createImage('assets/world4/astero.png', 1032, 582);
var terref = createImage('assets/world4/terref.svg', 876, 876);




//FIN ITEM
//Variables globales
var canvas = $('#graphic'),
	canvasM,
	ctx = canvas[0].getContext('2d'),//Initialise les élements du canvas
	step = 0, // Variable qui sert à varier la vitesse
	score = 0, //Score global
	world = 1, //Le monde actuel, démarre à 1
	scrollBG = 0, //Décalage du Background par rapport au bas. A ne pas modifier en dehors des fonctions prévus à cet effet
	move = 0, //Si le background est en train de monter
	altItem = 0, //Compteur pour l'alternance des item (exemple au monde 2)
	unlock = 0, //Si le monde suivant est dévérouillé
	music = 1, //Si la musique est activé
	ground = 1, //Si le sol est visible
	worldStep = 6, //Vitesse d'arrivé des objets au début du monde. Est incrémenté à chaque nouveau monde.
	nbrItem1 = 2, //Nombre d'item aux mondes 1,2,3,4
	nbrItem2 = 2,
	nbrItem3 = 2,
	nbrItem4 = 2,
	tom = 1,
	paused = 0,
	musicVolume = 0.5;
function gameBlock(img, sizex, sizey, posx, posy){
	this.img = img;
	this.sizex = sizex;
	this.sizey = sizey;
	this.posx = posx;
	this.posy = posy;
	//Définition des objets de jeu
}
function dirRight(oldPos, step){
	return oldPos+step;//Fait avancer l'objet vers la droite
}
function moveUp(oldPos, step){
	return oldPos+step; //Fait monter l'objet
}
var bg = initbg(); //initialise le premier background
function initbg(){
	switch(world){
		case 1:
			return bg1;
			break;
		case 2:
			return bg2;
			break;
		case 3:
			return bg2;
			break;
		case 4:
			return bg4;
			break;
		case 5:
			//return bg5;
			break;
	}
}

function getItem(def){
	switch(world){
		case 1://item monde 1
			if(def) return lit;//Item à la base
			else
				switch(Math.floor((Math.random()*nbrItem1)+1)){
					case 1:
						return lit;
						break;
					case 2:
						return peluche;
						break;
				};
		case 2://item monde 2
			if(def) return maison;//Item à la base
			else
				switch(altItem%nbrItem2){
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
			if(def) return maison;//Item à la base
			switch(Math.floor((Math.random()*nbrItem3)+1)){
				case 1:
					return nuage;
					break;
				case 2:
					return nuage2;
					break;
			}
		case 4://item monde 4
			if(def) return terre;
			switch(Math.floor((Math.random()*nbrItem3)+1)){
				case 1:
					return aste;
					break;
				case 2:
					return terref;
					break;
			}
	}
}