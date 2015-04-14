var blocks = new Array();
var isStart = 0;
//Just launch vital fonction
function start(){
	isStart = 1;
	$("#go").off('click');
	$("#go").html("Try again");
	$('#go').prop("disabled", true);
	$("#go").on('click',function(){ restart();});
	setInterval(draw, 15);
	physic();
}
function restart(){
	first = false;
	score= 0;
	ani05 = 0, ani05n = 0, ani30 = 0, ani10 = 0;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    blocks = [];
    scrollBG = 0;
	$('#go').prop("disabled", true);
	physic();
}
$("#go").on('click',function(){ start();});