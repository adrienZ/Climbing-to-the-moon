var blocks = new Array();
var isStart = 0;
//Just launch vital fonction
function start(){
	canvasM = canvas.width()/2;
	isStart = 1;
	$("#go").off('click');
	$("#go").html("Try again");
	$('#go').prop("disabled", true);
	$("#go").on('click',function(){ restart(0);});
	drawBg(1,1);
	setInterval(draw, 15);
	if(music) document.getElementById('music').play();
	physic();
}
function restart(nextworld){
	first = false;
	if(!nextworld)score= 0;
	ani05 = 0, ani05n = 0, ani30 = 0, ani10 = 0;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    blocks = [];
    scrollBG = 0;
	$('#go').prop("disabled", true);
	physic();
}
function checkScore(){
	switch(world){
		case 1:
			if(blocks.length>5) return 1;
			break;
		case 2:
			if(blocks.length>30) return 1;
			break;
		case 3:
			if(blocks.length>40) return 1;
			break;
		case 4 :
			if(blocks.length>50) return 1;
			break;
		default:
			return 0;
			break;
	}
}

function nextWorld(){
	if(world != 5){
		$('#next').prop("disabled", true);
		dropAn(0);
		step += 5;
		iCheckFail(0);
		iMoveRight(0);
		$(window).off("keypress");
		world++;
		bg = initbg();
	}
}
function musicControl(){
	if(music){
		music = 0;
		$('#musicControl').html("Music On");
		document.getElementById('music').volume= 0;
	}
	else{
		music = 1;
		$('#musicControl').html("Music Off");
		document.getElementById('music').volume= 0.5;
	}
}

$("#go").on('click',function(){ start();});
$("#musicControl").on('click',function(){ musicControl();});
$("#next").on('click',function(){ nextWorld();});