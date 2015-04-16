var isStart = 0;
function start(){ //Start the game
	canvasM = canvas.width()/2; //Define the canvas width
	isStart = 1;
	$('#pause').prop("disabled", false);
	$("#go").off('click');
	$('#imgTete').css("left", "0%");
	$("#barI").css('left', "-107%");
	if(world == 1)$('#go').css("background-image", "url('./assets/css/retry"+world+tom+".svg')");
	else $('#go').css("background-image", "url('./assets/css/retry"+world+".svg')");
	$("#go").css({"width":"6vh", "height":"6vh"});
	$('#go').prop("disabled", true);
	$("#go").on('click',function(){ restart(0);}); //Enable pause button and the like
	drawBg(1,1);
	setInterval(draw, 15);
	if(music)document.getElementById('music').volume= 0.5;
	document.getElementById('music').play();//Play music (no volume if it's off)
	$(document).on('keyup',function(event){if(event.keyCode == 27) pause();}); //enable pause on escape
	physic(); //launch physic
}
function restart(nextworld){
	if(!nextworld)score= 0;
	ani05 = 0, ani05n = 0, ani30 = 0, ani10 = 0; 
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	$('#imgTete').css("left", "0%");
	$("#barI").css('left', "-107%");
    blocks = [];
    scrollBG = 0;//Reset score and anim
    $("#go").off('click');
	$("#go").on('click',function(){ restart(0);});
    ground = 1;
    drawBg(1,1);
    step = worldStep;//Reset steps for blockspeed
    $('#pause').prop("disabled", false);
	$('#go').prop("disabled", true);
	if(world == 1)$('#go').css("background-image", "url('./assets/css/retry"+world+tom+".svg')");
	else $('#go').css("background-image", "url('./assets/css/retry"+world+".svg')");
	$("#go").css({"width":"6vh", "height":"6vh"});
	$(document).on('keyup',function(event){if(event.keyCode == 27) pause();});
	physic();//Same as start...
}
function checkScore(){//La hauteur à atteindre pour le niveau suivant
	switch(world){
		case 1:
			if(nbrblock>=10) return 0;
			else return ((nbrblock/10)*100);
			break;
		case 2:
			if(nbrblock>=20) return 0;
			else return ((nbrblock/20)*100);
			break;
		case 3:
			if(nbrblock>=30) return 0;
			else return ((nbrblock/30)*100);
			break;
		case 4 :
			if(nbrblock>=999) return 0;
			else return ((nbrblock/999)*100);
			break;
		default:
			return 0;
			break;
	}
}

function nextWorld(){//Go to next world function
	if(world != 5){
		$('#next').prop("disabled", true);
		$("#unlock").html("");
		dropAn(0);
		worldStep += 3;
		totalBlk += nbrblock;
		nbrblock = 0;
		iCheckFail(0);
		iMoveRight(0);
		unlock = 0;
		$('#imgTete').css("left", "0%");
		$("#barI").css('left', "-107%");
		$(window).off("keypress");
		$(window).off("keyup");
		world++;
		bg = initbg();
	}
}
function musicControl(){ //Control the music
	if(music){
		$('#musicControl').prop("disabled", true);
		music = 0;
		if(world>1) $('#musicControl').css("background-image", 'url("./assets/css/mute'+world+'.svg")');
		else $('#musicControl').css("background-image", 'url("./assets/css/mute'+world+tom+'.svg")');
		document.getElementById('music').volume= 0;
		console.log("okojojo");
		setTimeout(function(){$('#musicControl').prop("disabled", false);}, 10);
	}
	else{
		$('#musicControl').prop("disabled", true);
		music = 1;
		if(world>1) $('#musicControl').css("background-image", 'url("./assets/css/sound'+world+'.svg")');
		else $('#musicControl').css("background-image", 'url("./assets/css/sound'+world+tom+'.svg")');
		if(!paused)document.getElementById('music').volume= 0.5;
		setTimeout(function(){$('#musicControl').prop("disabled", false);}, 10);
	}
}
function pause(){ //pause the game
	if(paused){
		if(music)document.getElementById('music').volume= 0.5;
		$('#pause').prop("disabled", true);
		keyEvent();
		paused = 0;
		iCheckFail(1);
		iMoveRight(1);
		if(world>1) $('#pause').css("background-image", 'url("./assets/css/pause'+world+'.svg")');
		else $('#pause').css("background-image", 'url("./assets/css/pause'+world+tom+'.svg")');
		setTimeout(function(){$('#pause').prop("disabled", false);}, 10);
	}
	else{
		document.getElementById('music').volume= 0;
		$('#pause').prop("disabled", true);
		paused = 1;
		$(window).off("keypress");
		iCheckFail(0);
		iMoveRight(0);
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
document.getElementById('music').addEventListener('canplaythrough', function() { //Wait until everything is loaded to enable start
	if(world == 1)$('#go').css("background-image", "url('./assets/css/start"+world+tom+".svg')");
	else $('#go').css("background-image", "url('./assets/css/start"+world+".svg')");
	$("#go").css({"width":"30vh", "height":"15vh"});
	$("#go").html("");
	$('#go').prop("disabled", false);
	drawBg(1,1);
}, false);


function goCss(){ //Update css with the world
	if(world>1){
		$('#pause').css("background-image", "url('./assets/css/pause"+world+".svg')");
		if(music) $('#musicControl').css("background-image", "url('./assets/css/sound"+world+".svg')");
		else $('#musicControl').css("background-image", "url('./assets/css/mute"+world+".svg')");
		$('#scorepoint').css("background-image", "url('./assets/css/score"+world+".svg')");
		$('#nbrbl').css("background-image", "url('./assets/css/bloc"+world+".svg')");
	}
	else{
		$('#pause').css("background-image", "url('./assets/css/pause"+world+tom+".svg')");
		if(music) $('#musicControl').css("background-image", "url('./assets/css/sound"+world+tom+".svg')");
		else $('#musicControl').css("background-image", "url('./assets/css/mute"+world+tom+".svg')");
		$('#scorepoint').css("background-image", "url('./assets/css/score"+world+tom+".svg')");
		$('#nbrbl').css("background-image", "url('./assets/css/bloc"+world+tom+".svg')");

	}
	if(world<4) $('#next').css("background-image", "url('./assets/css/world"+(world+1)+unlock+".svg')");
}
goCss();