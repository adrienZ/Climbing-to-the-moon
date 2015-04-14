function scrollAn(h,sH){
	var ok = true;
	/*if(sH+h > -bg.posy){
		sH = 0;
	}*/
	if(scrollBG == (sH+h)) ok = false;
	else{
		scrollBG += 1;
	}
	if(ok)	setTimeout(function(){scrollAn(h,sH);}, 3);
	//Animation de scroll
}
function drawBg(){
	try{
		//if(scrollBG+bg.posy >= 0) scrollBG = 0;
		var pat=ctx.createPattern(bg.img,"repeat");
		ctx.rect(0,0,canvas.width(), canvas.height());
		ctx.setTransform(1,0,0,1,0,scrollBG);
		ctx.fillStyle=pat;
		ctx.fill();
		//ctx.drawImage(bg.img, bg.posx, bg.posy+scrollBG, bg.sizex, bg.sizey);
	}
	catch(e){
		console.log("Image is loading");
		setTimeout(drawBg, 30);
	}
}
function draw(){
	//Rendu non stop de tout les cubes...
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	drawBg();
	ctx.setTransform(1,0,0,1,0,0);
	ctx.beginPath();
	ctx.moveTo(canvas.width()/2+150,0);
	ctx.lineTo(canvas.width()/2+150,canvas.height());
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(canvas.width()/2-150,0);
	ctx.lineTo(canvas.width()/2-150,canvas.height());
	ctx.stroke();
	if(blocks.length<=10){
    	for(var i = 0; i < blocks.length-1; i++){
			ctx.beginPath();
			/*ctx.fillStyle = blocks[i].color;
	 		ctx.fillRect(blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);*/
	 		ctx.drawImage(blocks[i].img, blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
		}
		ctx.beginPath();
		ctx.setTransform(1,ani05, ani05n, 1, ani30, ani10);
		/*ctx.fillStyle = blocks[i].color;
		ctx.fillStyle=pattern;
	 	ctx.fillRect(blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);*/
	 	ctx.drawImage(blocks[i].img, blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
    }
    else{ 
    	for(var i = blocks.length-10; i < blocks.length-1; i++){
			ctx.beginPath();
			/*ctx.fillStyle = blocks[i].color;
	 		ctx.fillRect(blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);*/
	 		ctx.drawImage(blocks[i].img, blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
		}
		ctx.beginPath();
		ctx.setTransform(1,ani05, ani05n, 1, ani30, ani10);
		/*ctx.fillStyle = blocks[i].color;
		ctx.fillStyle=pattern;
	 	ctx.fillRect(blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
	 	//Si on utilise les couleurs (autre chose à modif en fonction)*/
	 	ctx.drawImage(blocks[i].img, blocks[i].posx, blocks[i].posy, blocks[i].sizex, blocks[i].sizey);
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
		if(conti && ani10<800) ani10 += sutepu;
		else if(ani10>800) {
			go = false;
		}
		if(go) setTimeout(incre, 20);
		else $('#go').prop("disabled", false);
	}
	setTimeout(incre, 200);
	//Animation de mort
}
drawBg();