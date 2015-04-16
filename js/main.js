    var tom;
if($(window).width()<500 || $(window).height()<500 ) {
    $("#graphic").remove();
    $("#button").html('Fenêtre trop petite');
}
else{
    $('#button').click(function() {    // click on the play button will pop the character menu  if the window is large enough
        $('#button').fadeOut(500);
        $('.choose').css({display: 'block'}); 
        //removing the boy and the moon
        $('#avatar').slideUp(1000);
        $('#moon').slideUp(2000);
        
    });
}
if($(window).width()<1280 || $(window).height()<720) {
    var decalageCan = 5;
    while((720/1280 * ($(window).width()-decalageCan))>$(window).height()){
        decalageCan = decalageCan + 1;
    }
    $('#graphic').attr('width', $(window).width()-decalageCan);
    $('#graphic').attr('height', (720/1280 * $(window).width()-decalageCan));
}
var viewportW = $('#graphic').attr('width');
var viewportH = $('#graphic').attr('height');
$('.game').css('width', viewportW);
$('.game').css('height', viewportH);
$('.game').css('top', ($(window).height()-viewportH)/2);
$('.game').css('left', ($(window).width()-viewportW)/2);
$(window).resize(function() {
    $('.home').remove();
    $("#graphic").remove();
    $("body").css({"font-size":"5em", "text-shadow": "0px 0px 3px rgba(0, 0, 0, 1)"});
    $("body").html("Merci de raffraichir la page après un changement de résolution.");
});
// click on the cross to close the character menu
$('#close').click(function() {
    
    $('.choose').css({display: 'none'});   
    $('#button').fadeIn(500);
    // pop-back the boy and the moon
    $('#avatar').slideDown(1000);
    $('#moon').slideDown(2000);   
    
});


// WHEN CHOOSING A CHARACTER , LAUNCH THE INTRO
$('.character').click(function(e) {
    //remove home content
    $('.home').remove();
    $('body').css({background : "none"});
    $('body').css({display : "hidden"});

    if(e.currentTarget.id == "tom1") //CHOOSING TOM
    {
        
        tom = "b"; //register the choice
        $('.picture').css({display: 'block'}); //first picture of the intro  
        setTimeout(function(){$('.picture').css({display: 'none'});
            $('.picture').css({background: ' url(./img/story1b.svg) no-repeat center',display:'block','background-size':'cover',width:'100vw',height:"100vh",});}, 6000);
            setTimeout(function() {
            $('.picture').css({display: 'none'});
            $('.game').fadeIn();
            $('body').css({display : "block"});
            $("body").css({"background-image": "url('./img/background.svg')", "background-size": "cover","background-repeat": "repeat-y"});
            drawBg(1,1);},10000);
        }
    else {
        tom = "g";
        $("#imgTete").attr('src', "./assets/css/gtete.svg");
         $('.picture').css({background: ' url(./img/story0g.svg) no-repeat center','background-size':'contain',width:'100vw',height:"100vh",display: 'block'});
        setTimeout(function(){$('.picture').css({display: 'none'});
            $('.picture').css({background: ' url(./img/story1g.svg) no-repeat center',display:'block','background-size':'cover',width:'100vw',height:"100vh",});}, 6000);
        setTimeout(function() {
            $('.picture').css({display: 'none'});
            $('.game').fadeIn();
            $('body').css({display : "block"});
            $("body").css({"background-image": "url('./img/background.svg')", "background-size": "cover","background-repeat": "repeat-y"});
            drawBg(1,1);},10000);
        }
    if(world == 1)$('#go').css("background-image", "url('./assets/css/start"+world+tom+".svg')");
    else $('#go').css("background-image", "url('./assets/css/start"+world+".svg')");
    $("#go").css({"width":"30vh", "height":"15vh"});
    $("#go").html("");
    $('#go').prop("disabled", false);
    goCss();//After the intro has been set, draw everything corresponding to the character chose.
});
