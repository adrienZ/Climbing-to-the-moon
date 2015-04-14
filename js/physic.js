function physic(){
	var canvasM = canvas.width()/2;
	function checkFinal(posX, sizeX, size){
		//console.log("Checking");
		var objM = posX+sizeX/2;
		if(size == 1 && posX < (canvasM+sizeX) && (posX+sizeX) > (canvasM-sizeX)) var isGood = true;
		else if((posX < (canvasM+100) && (posX+sizeX) > (canvasM-100)) 
			&& ((objM)+10 > blocks[size-2].posx && (objM)-10 < blocks[size-2].posx+blocks[size-2].sizex))
		 		var isGood = true;
		else var isGood = false;
		if(isGood)
		{
			var center = canvasM-(posX+(objM));
			score += Math.abs(Math.round(100-(Math.abs(center)/75)*100));
			//sendScore();
			nextBlock();
		}
		else{
			dropAn();
			clearInterval(moveRight);
			clearInterval(checkFail);
			$(window).off("keypress");
		}
	}
	var item1 = getItem(1);
	var getH = Math.round(item1.height/item1.width * 300);
	blocks[0] = new gameBlock(item1, 300, getH, canvas.width()/2-150, canvas.height()-getH);
	nextBlock();
	function newBlock(id, height, posY){
		var img = getItem(Math.floor((Math.random()*2)+1));
		width = img.width/img.height * height;
		//console.log("Image: "+ img.src + " " + img.width +'*'+ img.height + " " + width +'*'+ height);
		move = true;
		if(blocks.length >= 4) 	scrollAn(parseInt(height), scrollBG);
		blocks[id] = new gameBlock(img,width,height,0,posY);
		cacheBl = renderCache(canvas.width(), canvas.height(), 0);
	}
	function nextBlock(){
		$('#blockscore').html(blocks.length);
		$('#nbrblock').html(score);
		var tempoH = Math.floor((Math.random()*50)+26);
		if(blocks.length>=4){
			for(var i = 0; i < blocks.length; i++){
				blocks[i].moveUp(blocks[i].posy, tempoH);
			}
			newBlock(blocks.length, tempoH, blocks[blocks.length-1].posy-tempoH);
		}
		else {
			/*if(blocks.length == 1) newBlock(blocks.length, tempoW, tempoH, canvas.height()-50-tempoH);
			else {*/
				newBlock(blocks.length, tempoH, blocks[blocks.length-1].posy-tempoH);
			//}
		}
	}
	function rektangle(){
		if(blocks[blocks.length-1].posx > (canvasM+150)){
			clearInterval(checkFail);
			clearInterval(moveRight);
			dropAn();
			$(window).off("keypress");
			//death();
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
	/*var renderToCanvas = function (width, height) {
	    var buffer = document.createElement('canvas');
	    buffer.width = width;
	    buffer.height = height;
	    draw(buffer.getContext('2d'));
	    return buffer;
	};
	var cached = renderToCanvas(1280, 500);*/
	//ctx.drawImage(cached,0,0);
	//setInterval(drawLast,16);
	//ctx.drawImage(cached, 0, 0);
	var checkFail = setInterval(rektangle, 30);
	var moveRight = setInterval(function() {blocks[blocks.length-1].dirRight(blocks[blocks.length-1].posx, step);}, speed);
	/*function death(){
		return 0;
	}*/
}