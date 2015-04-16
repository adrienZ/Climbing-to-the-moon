    var tom;
    // click on the play button will pop the character menu 
    $('#button').click(function() {
        $('#button').fadeOut(500);
        $('.choose').css({display: 'block'}); 
        //removing the boy and the moon
        $('#avatar').slideUp(1000);
        $('#moon').slideUp(2000);
        
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
                $('.picture').css({background: ' url(./img/story2b.svg) no-repeat center',display:'block','background-size':'cover',width:'100vw',height:"100vh",});}, 3000);
            setTimeout(function() {
                $('.picture').css({display: 'none'});
                $('.game').fadeIn();
                $('body').css({display : "block"});
                $("body").css({"background-image": "url('./img/background.svg')", "background-size": "cover","background-repeat": "repeat-y"});
                drawBg(1,1);},5000);
            }
        else {
            tom = "g";
             $('.picture').css({background: ' url(./img/story1g.svg) no-repeat center','background-size':'contain',width:'100vw',height:"100vh",display: 'block'});
            setTimeout(function(){$('.picture').css({display: 'none'});
                $('.picture').css({background: ' url(./img/story2g.svg) no-repeat center',display:'block','background-size':'cover',width:'100vw',height:"100vh",});}, 3000);
            setTimeout(function() {
                $('.picture').css({display: 'none'});
                $('.game').fadeIn();
                $('body').css({display : "block"});
                $("body").css({"background-image": "url('./img/background.svg')", "background-size": "cover","background-repeat": "repeat-y"});
                drawBg(1,1);},5000);
            }
        if(world == 1)$('#go').css("background-image", "url('./assets/css/start"+world+tom+".svg')");
        else $('#go').css("background-image", "url('./assets/css/start"+world+".svg')");
        $("#go").css({"width":"30vh", "height":"15vh"});
        $("#go").html("");
        $('#go').prop("disabled", false);
        goCss();



    });
