$(document).ready(function(){
	var canvas = $('#graphic'), 
	ctx = canvas[0].getContext('2d'),
	step = 10,
	speed = 20;
	function gameBlock(color, sizex, sizey, posx, posy){
		this.color = color;
		this.sizex = sizex;
		this.sizey = sizey;
		this.posx = posx;
		this.posy = posy;
		this.dirRight = function(oldPos, step) {this.posx = oldPos+step;};
		this.moveUp = function(oldPos, step) {this.posy = oldPos+step;};
		this.checkFinal = function(posX, sizeX, size){
			if(size == 1 && posX < (canvas.width()/2+sizeX) && (posX+sizeX) > (canvas.width()/2-sizeX)) var isGood = true;
			else if((posX < (canvas.width()/2+100) && (posX+100) > (canvas.width()/2-100)) 
				&& (( posX+sizeX/2)+10 > blocks[size-2].posx && ( posX+sizeX/2)-10 < blocks[size-2].posx+blocks[size-2].sizex))
			 		var isGood = true;
			else var isGood = false;
			if(isGood){
				var center = canvas.width()/2-(posX+(sizeX/2));
				console.log(Math.round(100-(Math.abs(center)/75)*100));
				//sendScore();
				nextBlock();
			}
			else{
				clearInterval(checkFail);
				clearInterval(moveRight);
			}
		};
	} 
	//var rekt = new gameBlock('blue', 50, 50, 0, 100);
	var blocks = new Array();
	blocks[0] = new gameBlock('blue', 100, 50, 0, canvas.height()-50);
	function newBlock(id, width, height, posY){
		blocks[id] = new gameBlock('#'+Math.floor(Math.random()*16777215).toString(16),width,height,0,posY);
	}
	function nextBlock(){
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
		if(blocks[blocks.length-1].posx > (canvas.width()/2+blocks[blocks.length-1].sizex)){
			clearInterval(checkFail);
			clearInterval(moveRight);
		}
	}
	function draw(){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    	/*ctx.fillStyle = blocks[0].color;
    	ctx.fillRect(blocks[0].posx, blocks[0].posy, blocks[0].sizex, blocks[0].sizey);*/
    	if(blocks.length<=8){
    		for(var i = 0; i < blocks.length; i++){
				if(blocks[i].posy >0){
					ctx.fillStyle = blocks[i].color;
	    			ctx.fillRect(blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
	    		}
			}
    	}
    	else{ 
    		for(var i = blocks.length-8; i < blocks.length; i++){
				if(blocks[i].posy >0){
					ctx.fillStyle = blocks[i].color;
	    			ctx.fillRect(blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
	    		}
			}
		}
		ctx.moveTo(canvas.width()/2+blocks[0].sizex,0);
		ctx.lineTo(canvas.width()/2+blocks[0].sizex,canvas.height());
		ctx.stroke();
		ctx.moveTo(canvas.width()/2-blocks[0].sizex,0);
		ctx.lineTo(canvas.width()/2-blocks[0].sizex,canvas.height());
		ctx.stroke();
	}
	$(window).keydown(function(ev){
		if(ev.keyCode == 32){
			/*clearInterval(checkFail);
			clearInterval(moveRight);*/
			blocks[blocks.length-1].checkFinal(blocks[blocks.length-1].posx, blocks[blocks.length-1].sizex, blocks.length);
		}
		/*if(ev.keyCode == 13){
			checkFail = setInterval(rektangle, 16);
			moveRight = setInterval(function() {blocks[0].dirRight(blocks[0].posx, step);}, speed);
		}*/
	});
	setInterval(draw, 15);
	var checkFail = setInterval(rektangle, 25);
	var moveRight = setInterval(function() {blocks[blocks.length-1].dirRight(blocks[blocks.length-1].posx, step);}, speed);
});