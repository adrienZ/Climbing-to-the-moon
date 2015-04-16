if($(window).width()<330 || $(window).height()<500 ) {
	$("#graphic").remove();
	window.alert("Votre écran est trop petit pour jouer.");
}
else if($(window).width()<1280 || $(window).height()<720) {
	var decalageCan = 5;
	while((720/1280 * ($(window).width()-decalageCan))>$(window).height()){
		decalageCan = decalageCan + 1;
	}
	$('#graphic').attr('width', $(window).width()-decalageCan);
	$('#graphic').attr('height', (720/1280 * $(window).width()-decalageCan));
}
/*$('#graphic').attr('width', $(window).width());
$('#graphic').attr('height', ($(window).height()));*/
var viewportW = $('#graphic').attr('width');
var viewportH = $('#graphic').attr('height');
$('.game').css('width', viewportW);
$('.game').css('height', viewportH);
$('.game').css('top', ($(window).height()-viewportH)/2);
$('.game').css('left', ($(window).width()-viewportW)/2);
var blocks = new Array();
function physic(){
	var item1 = getItem(1);
	var getH = Math.round(item1.height/item1.width * viewportW/4);
	blocks[0] = new gameBlock(item1, viewportW/4, getH, canvas.width()/2-((viewportW/4)/2), canvas.height()-getH);
	nbrblock = 1;
	nextBlock();
	keyEvent();
	iCheckFail(1);
	iMoveRight(1);
}
function checkFinal(posX, sizeX, size){
	var weirdConstr = false;
	var objM = posX+sizeX/2;
	if(size == 1 && posX < (canvasM+sizeX) && (posX+sizeX) > (canvasM-sizeX)) var isGood = true;
	else if((posX < (canvasM+100) && (posX+sizeX) > (canvasM-100)) 
		&& ((objM)+10 > blocks[size-2].posx && (objM)-10 < blocks[size-2].posx+blocks[size-2].sizex))
		/*&& (blocks.length > 3 && (objM)+10 > blocks[size-3].posx && (objM)-10 < blocks[size-3].posx+blocks[size-3].sizex))*/
	 		var isGood = true;
	/*else if(blocks.length > 3 && !((objM)+10 > blocks[size-3].posx && (objM)-10 < blocks[size-3].posx+blocks[size-3].sizex)){
		weirdConstr = true;
		var isGood = false;
	}*/
	else var isGood = false;
	if(isGood)
	{
		var center = canvasM-(posX+(objM));
		score += world*Math.abs(Math.round(100-(Math.abs(center)/75)*100));
		nbrblock++;
		var checked = checkScore();
		if(checked == 0){
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
		dropAn(1);
		iCheckFail(0);
		iMoveRight(0);
		$('#pause').prop("disabled", true);
		$(window).off("keyup");
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
		iCheckFail(0);
		iMoveRight(0);
		dropAn(1);
		$('#pause').prop("disabled", true);
		document.getElementById('lose').play();
		$(window).off("keyup");
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