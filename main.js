$(document).ready(function(){
	var canvas = $('#graphic'), 
	ctx = canvas[0].getContext('2d'),
	step = 10,
	speed = 20,
	score = 0;
	function gameBlock(color, sizex, sizey, posx, posy){
		this.color = color;
		this.sizex = sizex;
		this.sizey = sizey;
		this.posx = posx;
		this.posy = posy;
		this.dirRight = function(oldPos, step) {this.posx = oldPos+step;};
		this.moveUp = function(oldPos, step) {this.posy = oldPos+step;};
	} 
	function checkFinal(posX, sizeX, size){
		if(size == 1 && posX < (canvas.width()/2+sizeX) && (posX+sizeX) > (canvas.width()/2-sizeX)) var isGood = true;
		else if((posX < (canvas.width()/2+100) && (posX+sizeX) > (canvas.width()/2-100)) 
			&& (( posX+sizeX/2)+10 > blocks[size-2].posx && ( posX+sizeX/2)-10 < blocks[size-2].posx+blocks[size-2].sizex))
		 		var isGood = true; // il manque {} ?
		else var isGood = false;         //same
		if(isGood)
		{
			var center = canvas.width()/2-(posX+(sizeX/2));
			score += Math.round(100-(Math.abs(center)/75)*100);
			//sendScore();
			nextBlock();
		}
		else{
			dropAn();
			clearInterval(moveRight);
			clearInterval(checkFail);
		}
	}
	//var rekt = new gameBlock('blue', 50, 50, 0, 100);
	var blocks = new Array();
	blocks[0] = new gameBlock('blue', 100, 50, canvas.width()/2-50, canvas.height()-50);
	nextBlock();
	function newBlock(id, width, height, posY){
		blocks[id] = new gameBlock('#'+Math.floor(Math.random()*16777215).toString(16),width,height,0,posY);
	}
	function nextBlock(){
		$('#blockscore').html(blocks.length);
		$('#nbrblock').html(score);
		var tempoH = Math.floor((Math.random()*50)+25);
		var tempoW = Math.floor((Math.random()*50)+25);
		if(blocks.length>=5){
			for(var i = 0; i < blocks.length; i++){
				/*if(i==0){
					blocks[0].moveUp(blocks[0].posy, blocks[0].sizey);
					var totalSize = blocks[0].sizey;
				}
				else{*/
					//blocks[i].moveUp(blocks[i].posy, blocks[i-1].sizey);
					blocks[i].moveUp(blocks[i].posy, tempoH);
				//}
			}
			newBlock(blocks.length, tempoW, tempoH, blocks[blocks.length-1].posy-tempoH);
			//console.log((canvas.height()-(blocks[blocks.length-1].posy)));
		}
		else {
			if(blocks.length == 1) newBlock(blocks.length, tempoW, tempoH, canvas.height()-50-tempoH);
			else newBlock(blocks.length, tempoW, tempoH, blocks[blocks.length-1].posy-tempoH);
		}
		/*checkFail = setInterval(rektangle, 16);
		moveRight = setInterval(function() {blocks[blocks.length-1].dirRight(blocks[blocks.length-1].posx, step);}, speed);*/
	}
	function rektangle(){
		if(blocks[blocks.length-1].posx > (canvas.width()/2+blocks[0].sizex)){
			clearInterval(checkFail);
			clearInterval(moveRight);
		}

	}
	var ani05 = 0, ani05n = 0, ani30 = 0, ani10 = 0;
	function dropAn(){
		var sutepu = 1;
		var go = true;
		function incre(){
			sutepu += 0.3;
			var conti = false;
			if(blocks[blocks.length-1].posx < (canvas.width()/2) && !conti){
				if(ani05n<0.3) {
					ani05 -= 0.02;
					ani05n += 0.02;
					ani30 -= 10;
					ani10 += 10;
				}
				else conti = true;
			}
			else if(!conti) {
				if(ani05<0.3) {
					ani05 += 0.02;
					ani05n -= 0.02;
					ani30 += 10;
					ani10 -= 15;
				}
				else conti = true;
			}
			if(conti && ani10<300) ani10 += sutepu;
			else if(ani10>300) {
				go = false;
			}
			if(go) setTimeout(incre, 20);
		}
		setTimeout(incre, 200);
	}
	function draw(){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    	/*ctx.fillStyle = blocks[0].color;
    	ctx.fillRect(blocks[0].posx, blocks[0].posy, blocks[0].sizex, blocks[0].sizey);*/
    	ctx.setTransform(1,0,0,1,0,0);
		ctx.beginPath();
		ctx.moveTo(canvas.width()/2+blocks[0].sizex,0);
		ctx.lineTo(canvas.width()/2+blocks[0].sizex,canvas.height());
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(canvas.width()/2-blocks[0].sizex,0);
		ctx.lineTo(canvas.width()/2-blocks[0].sizex,canvas.height());
		ctx.stroke();
		if(blocks.length<=7){
    		for(var i = 0; i < blocks.length-1; i++){
				ctx.beginPath();
				ctx.fillStyle = blocks[i].color;
	    		ctx.fillRect(blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
			}
			ctx.beginPath();
			ctx.setTransform(1,ani05, ani05n, 1, ani30, ani10);
			ctx.fillStyle = blocks[i].color;
	    	ctx.fillRect(blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
    	}
    	else{ 
    		for(var i = blocks.length-7; i < blocks.length-1; i++){
				ctx.beginPath();
				ctx.fillStyle = blocks[i].color;
	    		ctx.fillRect(blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
			}
			ctx.beginPath();
			ctx.setTransform(1,ani05, ani05n, 1, ani30, ani10);
			ctx.fillStyle = blocks[i].color;
	    	ctx.fillRect(blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
		}
	}
	$(window).keypress(function(ev){
		if(ev.keyCode == 32){
			/*clearInterval(checkFail);
			clearInterval(moveRight);*/
			checkFinal(blocks[blocks.length-1].posx, blocks[blocks.length-1].sizex, blocks.length);
		}
		/*if(ev.keyCode == 13){
			checkFail = setInterval(rektangle, 16);
			moveRight = setInterval(function() {blocks[0].dirRight(blocks[0].posx, step);}, speed);
		}*/
	});
	$(window).on("tap", function(ev){
		checkFinal(blocks[blocks.length-1].posx, blocks[blocks.length-1].sizex, blocks.length);
	});
	setInterval(draw, 15);
	var checkFail = setInterval(rektangle, 25);
	var moveRight = setInterval(function() {blocks[blocks.length-1].dirRight(blocks[blocks.length-1].posx, step);}, speed);
});
