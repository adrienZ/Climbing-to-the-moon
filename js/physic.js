/*$('#graphic').attr('width', $(window).width());
$('#graphic').attr('height', ($(window).height()));*/
var blocks = new Array();
function physic(){ //initialise les premiers objets et les loops de physique
	var item1 = getItem(1);
	var getH = Math.round(item1.height/item1.width * viewportW/4);
	blocks[0] = new gameBlock(item1, viewportW/4, getH, canvas.width()/2-((viewportW/4)/2), canvas.height()-getH);
	nbrblock = 1;
	$(window).off("keypress");
	nextBlock();
	keyEvent();
	iCheckFail(1);
	iMoveRight(1);
}
function checkFinal(posX, sizeX, size){ //Défini si l'item est bien placé. (SEULEMENT PAR RAPPORT A CELUI DU DESSOUS SINON LE JEU DEVIENT ENNUYEUX A JOUER)
	var weirdConstr = false;
	var objM = posX+sizeX/2;
	if(size == 1 && posX < (canvasM+sizeX) && (posX+sizeX) > (canvasM-sizeX)) var isGood = true;
	else if((posX < (canvasM+100) && (posX+sizeX) > (canvasM-100)) 
	&& ((objM)+10 > blocks[size-2].posx && (objM)-10 < blocks[size-2].posx+blocks[size-2].sizex))
		var isGood = true;
	else var isGood = false;
	if(isGood)
	{
		var center = canvasM-(posX+(objM));
		score += world*Math.abs(Math.round(100-(Math.abs(center)/75)*100));
		nbrblock++;
		var checked = checkScore();
		if(isLast == 1){}
		else if(checked == 0){
			$('#next').prop("disabled", false);
			unlock = 1;
			$('#unlock').html("Next world unlocked!");
			$('#imgTete').css("left", "95%");
			$("#barI").css('left', "0%");
			$('#next').css("background-image", "url('./assets/css/world"+(world+1)+unlock+".svg')");
		}
		else{
			if(checked-5 > 0) $('#imgTete').css("left", checked-5+"%");
			else $('#imgTete').css("left", "0%");
			$("#barI").css('left', (checked-112)+"%");
		}
		document.getElementById('sfx').play();
		nextBlock();
	}
	else{
		$(window).off("keyup");
		dropAn(1);
		iCheckFail(0);
		iMoveRight(0);
		$('#pause').prop("disabled", true);
		document.getElementById('lose').play();
		$(window).off("keypress");
	}
}
function newBlock(id, height, posY, width, img){ //Actually create the item
	move = true;
	$('#nbrblock').html(nbrblock);
	$('#blockscore').html(score);
	if(blocks.length >= 4) {
		scrollAn(parseInt(height), scrollBG);
	}
	if(scrollBG + parseInt(height) == canvas.height()) ground =0;
	step = worldStep + Math.round(blocks.length/10);
	blocks[id] = new gameBlock(img,width,height,0,posY);
	if(blocks.length > 30) blocks.shift();
	cacheBl = renderCache(canvas.width(), canvas.height(), 0);
}
function nextBlock(){ //Determine next item's caracteristics
	var img = getItem(0);
	if(img.width>img.height){
		var tempoW = Math.floor(viewportW/8)-((blocks.length)+world/2);
		if(tempoW < 30) tempoW = 30;
		var tempoH = img.height/img.width * tempoW;
	}
	else{
		var tempoH = Math.floor(viewportH/6)-((blocks.length)+5/2);
		if(tempoH < 30) tempoH = 30;
		var tempoW = img.width/img.height * tempoH;
	}
	if(blocks.length>=4){
		for(var i = 0; i < blocks.length; i++){
			blocks[i].posy = moveUp(blocks[i].posy, tempoH);
		}
		newBlock(blocks.length, tempoH, blocks[blocks.length-1].posy-tempoH, tempoW, img);
	}
	else {
		newBlock(blocks.length, tempoH, blocks[blocks.length-1].posy-tempoH, tempoW, img);
	}
}
function rektangle(){ //Vérifie que l'item ne sorte pas des limites du jeu
	if(blocks[blocks.length-1].posx > (canvasM+150)){
		$(window).off("keyup");
		iCheckFail(0);
		iMoveRight(0);
		dropAn(1);
		$('#pause').prop("disabled", true);
		document.getElementById('lose').play();
		$(window).off("keypress");
	}
}
var checkFail, moveRight;
function iCheckFail(bool){//Set the interval for checking and moving
	if(bool) checkFail = setInterval(rektangle, 100);
	else clearInterval(checkFail);
}
function iMoveRight(bool){
	if(bool) moveRight = setInterval(function() {blocks[blocks.length-1].posx = dirRight(blocks[blocks.length-1].posx, step);}, 15);
	else clearInterval(moveRight);
}
function keyEvent(){
	$(window).on("keypress", function(event){
			if(event.charCode == 32){
				checkFinal(blocks[blocks.length-1].posx, blocks[blocks.length-1].sizex, blocks.length);
			}//Key event for spacebar
	});
}