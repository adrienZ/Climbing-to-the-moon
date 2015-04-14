function physic(){
	function checkFinal(posX, sizeX, size){
		console.log("Checking");
		if(size == 1 && posX < (canvas.width()/2+sizeX) && (posX+sizeX) > (canvas.width()/2-sizeX)) var isGood = true;
		else if((posX < (canvas.width()/2+100) && (posX+sizeX) > (canvas.width()/2-100)) 
			&& (( posX+sizeX/2)+10 > blocks[size-2].posx && ( posX+sizeX/2)-10 < blocks[size-2].posx+blocks[size-2].sizex))
		 		var isGood = true;
		else var isGood = false;
		if(isGood)
		{
			var center = canvas.width()/2-(posX+(sizeX/2));
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
	blocks[0] = new gameBlock(lit, 100, 50, canvas.width()/2-50, canvas.height()-50);
	nextBlock();
	function newBlock(id, width, height, posY){
		var img = getItem(Math.floor((Math.random()*2)+1));
		console.log(lit);
		blocks[id] = new gameBlock(img,width,height,0,posY);
	}
	function nextBlock(){
		$('#blockscore').html(blocks.length);
		$('#nbrblock').html(score);
		var tempoH = Math.floor((Math.random()*50)+25);
		var tempoW = Math.floor((Math.random()*50)+25);
		if(blocks.length>=5){
			for(var i = 0; i < blocks.length; i++){
				blocks[i].moveUp(blocks[i].posy, tempoH);
			}
			newBlock(blocks.length, tempoW, tempoH, blocks[blocks.length-1].posy-tempoH);
			scrollAn(parseInt(tempoH), scrollBG);
		}
		else {
			/*if(blocks.length == 1) newBlock(blocks.length, tempoW, tempoH, canvas.height()-50-tempoH);
			else {*/
				newBlock(blocks.length, tempoW, tempoH, blocks[blocks.length-1].posy-tempoH);
			//}
		}
	}
	function rektangle(){
		if(blocks[blocks.length-1].posx > (canvas.width()/2+blocks[0].sizex)){
			clearInterval(checkFail);
			clearInterval(moveRight);
			dropAn();
			$(window).off("keypress");
			//death();
		}

	}
	function drawLast(){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.setTransform(1,0,0, 1,0,0);
		ctx.drawImage(cached,0,0);
		ctx.beginPath();
		ctx.setTransform(1,ani05, ani05n, 1, ani30, ani10);
		ctx.fillStyle = blocks[blocks.length-1].color;
	    ctx.fillRect(blocks[blocks.length-1].posx, blocks[blocks.length-1].posy, blocks[blocks.length-1].sizex, blocks[blocks.length-1].sizey);
	}
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
	var checkFail = setInterval(rektangle, 50);
	var moveRight = setInterval(function() {blocks[blocks.length-1].dirRight(blocks[blocks.length-1].posx, step);}, speed);
	/*function death(){
		return 0;
	}*/
}