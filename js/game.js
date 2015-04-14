var blocks = new Array();
physic();
//Just launch vital fonction
function restart(){
	first = false;
	score= 0;
	ani05 = 0, ani05n = 0, ani30 = 0, ani10 = 0;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    blocks = [];
    scrollBG = 0;
	$('#failed').prop("disabled", true);
	physic();
}
$("#failed").on('click',function(){ restart();})