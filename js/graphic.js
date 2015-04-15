function scrollAn(h,sH){
	var ok = true;
	if(scrollBG >= (sH+h)){
		ok = false;
		cacheBg = renderCache(canvas.width(), canvas.height(), 1);
		move = false;
	}
	else{
		scrollBG += 5;
	}
	if(ok){
		setTimeout(function(){scrollAn(h,sH);}, 10);
	}
	//Animation de scroll
}
var pat;
function drawBg(isFirst, newBg){
	try{
		if(newBg) pat=ctx.createPattern(bg.img,"repeat");
		ctx.beginPath();
		ctx.rect(0,0,canvas.width(), canvas.height());
		ctx.setTransform(1,0,0,1,0,scrollBG);
		ctx.fillStyle=pat;
		ctx.fill();
		if(isFirst) cacheBg = renderCache(canvas.width(), canvas.height(), 1);
		if(ground){
			switch(world){
				case 1:
					ctx.drawImage(basebg1,0,scrollBG,basebg1.width,basebg1.height);
					break;
			}
		}
	}
	catch(e){
		console.log("Image is loading");
		setTimeout(function(){drawBg(isFirst,newBg);}, 30);
	}
}
function renderCache(width, height, doBg){
	var buffer = document.createElement('canvas');
	    buffer.width = width;
	    buffer.height = height;
	    var ctx2 = buffer.getContext('2d');
	    kek(ctx2,doBg);
	    return buffer;
}
var cacheBg, cacheBl;
function kek(ctx2,doBg){
	if(doBg){
		var pat2=ctx2.createPattern(bg.img,"repeat");
		ctx2.rect(0,0,canvas.width(), canvas.height());
		ctx2.setTransform(1,0,0,1,0,scrollBG);
		ctx2.fillStyle=pat;
		ctx2.fill();
		if(ground){
			switch(world){
				case 1:
					ctx2.drawImage(basebg1,0,scrollBG,basebg1.width,basebg1.height);
					break;
			}
		}
	}
	else{
		ctx2.setTransform(1,0,0,1,0,0);
		ctx2.beginPath();
		ctx2.moveTo(canvas.width()/2+150,0);
		ctx2.lineTo(canvas.width()/2+150,canvas.height());
		ctx2.stroke();
		ctx2.beginPath();
		ctx2.moveTo(canvas.width()/2-150,0);
		ctx2.lineTo(canvas.width()/2-150,canvas.height());
		ctx2.stroke();
		if(blocks.length<=15){
	    	for(var i = 0; i < blocks.length-1; i++){
		 		ctx2.drawImage(blocks[i].img, blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
			}
	    }
	    else{ 
	    	for(var i = blocks.length-15; i < blocks.length-1; i++){
		 		ctx2.drawImage(blocks[i].img, blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
			}
		}
	}

}
function draw(){
	ctx.setTransform(1,0,0,1,0,0);
	if(blocks.length<=4) {
		//ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.drawImage(cacheBg,0,0);
		/*ctx.beginPath();
		ctx.moveTo(canvas.width()/2+150,0);
		ctx.lineTo(canvas.width()/2+150,canvas.height());
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(canvas.width()/2-150,0);
		ctx.lineTo(canvas.width()/2-150,canvas.height());
		ctx.stroke();
		/*for(var i = 0; i < blocks.length-1; i++){
				ctx.beginPath();
		 		ctx.drawImage(blocks[i].img, blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
		}*/
	}
	else if(move){
		drawBg(0,0);
	}
	else{
		ctx.drawImage(cacheBg,0,0);
	}
	//else{
	//	drawBg();
	//}
	ctx.setTransform(1,0,0,1,0,0);
	ctx.drawImage(cacheBl,0,0);
	/*ctx.beginPath();
	ctx.moveTo(canvas.width()/2+150,0);
	ctx.lineTo(canvas.width()/2+150,canvas.height());
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(canvas.width()/2-150,0);
	ctx.lineTo(canvas.width()/2-150,canvas.height());
	ctx.stroke();*/
	ctx.setTransform(1,ani05, ani05n, 1, ani30, ani10);
	ctx.drawImage(blocks[blocks.length-1].img, blocks[blocks.length-1].posx, blocks[blocks.length-1].posy, blocks[blocks.length-1].sizex, blocks[blocks.length-1].sizey);
}
var ani05 = 0, ani05n = 0, ani30 = 0, ani10 = 0;
function dropAn(tryagain,sbt){
	$('#go').prop("disabled", true);
	$('#next').prop("disabled", true);
	var sutepu = 1;
	var go = true;
	function incre(tryagain){
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
		if(conti && ani10<800) ani10 += sutepu;
		else if(ani10>800) {
			go = false;
		}
		if(go) setTimeout(function(){incre(tryagain);}, 15);
		else {
			if(tryagain){
				$('#go').prop("disabled", false);
				if(unlock)$('#next').prop("disabled", false);
			}
			else {
				drawBg(1,1);
				restart(1);
			}
		}
	}
	setTimeout(function(){incre(tryagain);}, 200);
	//Animation de mort
}
drawBg(1,1);