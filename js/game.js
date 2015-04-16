var isStart = 0;
function start(){
	canvasM = canvas.width()/2;
	isStart = 1;
	$('#pause').prop("disabled", false);
	$("#go").off('click');
	$("#go").html("Try again");
	$('#go').prop("disabled", true);
	$("#go").on('click',function(){ restart(0);});
	drawBg(1,1);
	setInterval(draw, 15);
	if(music)document.getElementById('music').volume= 0.5;
	document.getElementById('music').play();
	$(document).on('keyup',function(event){
	if(event.keyCode == 27) pause();
	console.log(event.keyCode);});
	physic();
}
function restart(nextworld){
	if(!nextworld)score= 0;
	ani05 = 0, ani05n = 0, ani30 = 0, ani10 = 0;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    blocks = [];
    scrollBG = 0;
    $("#go").off('click');
	$("#go").on('click',function(){ restart(0);});
    ground = 1;
    drawBg(1,1);
    step = worldStep;
    $('#pause').prop("disabled", false);
	$('#go').prop("disabled", true);
	$('#go').html("Try Again");
	$(document).on('keyup',function(event){
	if(event.keyCode == 27) pause();
	console.log(event.keyCode);});
	physic();
}
function checkScore(){//La haute à atteindre pour le niveau suivant
	switch(world){
		case 1:
			if(nbrblock>0) return 1;
			break;
		case 2:
			if(nbrblock>0) return 1;
			break;
		case 3:
			if(nbrblock>0) return 1;
			break;
		case 4 :
			if(nbrblock>999999) return 1;
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
		worldStep += 3;
		totalBlk += nbrblock;
		nbrblock = 0;
		iCheckFail(0);
		iMoveRight(0);
		unlock = 0;
		$(window).off("keypress");
		$(window).off("keyup");
		world++;
		bg = initbg();
	}
}
function musicControl(){
	if(music){
		$('#musicControl').prop("disabled", true);
		music = 0;
		//$('#musicControl').html("Music On");
		if(world>1) $('#musicControl').css("background-image", 'url("./assets/css/mute'+world+'.svg")');
		else $('#musicControl').css("background-image", 'url("./assets/css/mute'+world+tom+'.svg")');
		document.getElementById('music').volume= 0;
		console.log("okojojo");
		setTimeout(function(){$('#musicControl').prop("disabled", false);}, 10);
	}
	else{
		$('#musicControl').prop("disabled", true);
		music = 1;
		//$('#musicControl').html("Music Off");
		if(world>1) $('#musicControl').css("background-image", 'url("./assets/css/sound'+world+'.svg")');
		else $('#musicControl').css("background-image", 'url("./assets/css/sound'+world+tom+'.svg")');
		if(!paused)document.getElementById('music').volume= 0.5;
		setTimeout(function(){$('#musicControl').prop("disabled", false);}, 10);
	}
}
function pause(){
	if(paused){
		if(music)document.getElementById('music').volume= 0.5;
		$('#pause').prop("disabled", true);
		keyEvent();
		paused = 0;
		iCheckFail(1);
		iMoveRight(1);
		if(world>1) $('#pause').css("background-image", 'url("./assets/css/pause'+world+'.svg")');
		else $('#pause').css("background-image", 'url("./assets/css/pause'+world+tom+'.svg")');
		//$('#pause').html("Pause");
		setTimeout(function(){$('#pause').prop("disabled", false);}, 10);
	}
	else{
		document.getElementById('music').volume= 0;
		$('#pause').prop("disabled", true);
		paused = 1;
		$(window).off("keypress");
		iCheckFail(0);
		iMoveRight(0);
		//$('#pause').html("Play");
		if(world>1) $('#pause').css("background-image", 'url("./assets/css/play'+world+'.svg")');
		else $('#pause').css("background-image", 'url("./assets/css/play'+world+tom+'.svg")');
		setTimeout(function(){$('#pause').prop("disabled", false);}, 10);
	}
}

$("#go").on('click',function(){ start();});
$("#pause").on('click',function(){ pause();});
$("#musicControl").on('click',function(){ musicControl();});
$("#next").on('click',function(){ nextWorld();});
$(window).resize(function() {
  
});
document.getElementById('music').addEventListener('canplaythrough', function() { 
	$('#go').html("Start");
	$('#go').prop("disabled", false);
	drawBg(1,1);
}, false);


function goCss(){
	if(world>1){
		$('#pause').css("background-image", "url('./assets/css/pause"+world+".svg')");
		if(music) $('#musicControl').css("background-image", "url('./assets/css/sound"+world+".svg')");
		else $('#musicControl').css("background-image", "url('./assets/css/mute"+world+".svg')");
		//$('#go').css("background-image", "url(../assets/css/start"+world+".svg");
		$('#scorepoint').css("background-image", "url('./assets/css/score"+world+".svg')");
	}
	else{
		$('#pause').css("background-image", "url('./assets/css/pause"+world+tom+".svg')");
		if(music) $('#musicControl').css("background-image", "url('./assets/css/sound"+world+tom+".svg')");
		else $('#musicControl').css("background-image", "url('./assets/css/mute"+world+tom+".svg')");
		//$('#go').css("background-image", "url(../assets/css/start"+world+tom+".svg");
		//$('#next').css("background-image", "url(../assets/css/pause"+world+tom+".svg");
		$('#scorepoint').css("background-image", "url('./assets/css/score"+world+tom+".svg')");

	}
	if(world<4) $('#next').css("background-image", "url('./assets/css/world"+(world+1)+unlock+".svg')");
}
goCss();