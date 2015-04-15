if($(window).width()<1280) $('#graphic').attr('width', $(window).width()-5);
if($(window).height()<720) $('#graphic').attr('height', $(window).height()-100);
if($(window).width()<330) {
	$("#graphic").remove();
	window.alert("Votre écran est trop petit pour jouer.");
}
function physic(){
	function checkFinal(posX, sizeX, size){
		//console.log("Checking");
		var weirdConstr = false;
		var objM = posX+sizeX/2;
		if(size == 1 && posX < (canvasM+sizeX) && (posX+sizeX) > (canvasM-sizeX)) var isGood = true;
		else if((posX < (canvasM+100) && (posX+sizeX) > (canvasM-100)) 
			&& ((objM)+10 > blocks[size-2].posx && (objM)-10 < blocks[size-2].posx+blocks[size-2].sizex))
			//&& (blocks.length > 3 && (objM)+10 > blocks[size-3].posx && (objM)-10 < blocks[size-3].posx+blocks[size-3].sizex))
		 		var isGood = true;
		//else if(blocks.length > 3 && !((objM)+10 > blocks[size-3].posx && (objM)-10 < blocks[size-3].posx+blocks[size-3].sizex)){
		//	weirdConstr = true;
		//	var isGood = false;
		//}
		else var isGood = false;
		if(isGood)
		{
			var center = canvasM-(posX+(objM));
			score += world*Math.abs(Math.round(100-(Math.abs(center)/75)*100));
			if(checkScore()){
				$('#next').prop("disabled", false);
				unlock = 1;
			}
			document.getElementById('sfx').play();
			nextBlock();
		}
		else{
			dropAn(1,weirdConstr);
			iCheckFail(0);
			iMoveRight(0);
			document.getElementById('lose').play();
			$(window).off("keypress");
		}
	}
	var item1 = getItem(1);
	var getH = Math.round(item1.height/item1.width * 300);
	blocks[0] = new gameBlock(item1, 300, getH, canvas.width()/2-150, canvas.height()-getH);
	nextBlock();
	function newBlock(id, height, posY, width, img){
		//var img = getItem(0);
		//width = img.width/img.height * height;
		//console.log("Image: "+ img.src + " " + img.width +'*'+ img.height + " " + width +'*'+ height);
		move = true;
		if(blocks.length >= 4) {
			scrollAn(parseInt(height), scrollBG);
		}
		if(scrollBG + parseInt(height) == canvas.height()) ground =0;
		step = worldStep + Math.round(blocks.length/10);
		blocks[id] = new gameBlock(img,width,height,0,posY);
		cacheBl = renderCache(canvas.width(), canvas.height(), 0);
	}
	function nextBlock(){
		$('#nbrblock').html(blocks.length);
		$('#blockscore').html(score);
		var img = getItem(0);
		if(img.width>img.height){
			var tempoW = 150-((blocks.length)+world/2);
			if(tempoW < 30) tempoW = 30;
			var tempoH = img.height/img.width * tempoW;
		}//Math.floor((Math.random()*50)+26);
		else{
			var tempoH = 75-((blocks.length)+5/2);
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
			/*if(blocks.length == 1) newBlock(blocks.length, tempoW, tempoH, canvas.height()-50-tempoH);
			else {*/
				newBlock(blocks.length, tempoH, blocks[blocks.length-1].posy-tempoH, tempoW, img);
			//}
		}
	}
	/*function drawLast(){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.setTransform(1,0,0, 1,0,0);
		ctx.drawImage(cached,0,0);
		ctx.beginPath();
		ctx.setTransform(1,ani05, ani05n, 1, ani30, ani10);
		ctx.fillStyle = blocks[blocks.length-1].color;
	    ctx.fillRect(blocks[blocks.length-1].posx, blocks[blocks.length-1].posy, blocks[blocks.length-1].sizex, blocks[blocks.length-1].sizey);
	}*/
	$(window).on("keypress", function(event){
		if(event.charCode == 32){
			checkFinal(blocks[blocks.length-1].posx, blocks[blocks.length-1].sizex, blocks.length);
		}
	});
	/*$('#failed').on("tap", function(ev){
		checkFinal(blocks[blocks.length-1].posx, blocks[blocks.length-1].sizex, blocks.length);
	});*/
	iCheckFail(1);
	iMoveRight(1);
}
function rektangle(){
	console.log("lo");
	if(blocks[blocks.length-1].posx > (canvasM+150)){
		iCheckFail(0);
		iMoveRight(0);
		dropAn(1);
		document.getElementById('lose').play();
		$(window).off("keypress");
		//death();
	}

}
var checkFail, moveRight;
function iCheckFail(bool){
	if(bool) checkFail = setInterval(rektangle, 100);
	else clearInterval(checkFail);
}
function iMoveRight(bool){
	if(bool) moveRight = setInterval(function() {blocks[blocks.length-1].posx = dirRight(blocks[blocks.length-1].posx, step);}, speed);
	else clearInterval(moveRight);
}