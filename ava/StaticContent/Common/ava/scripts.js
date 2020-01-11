$(document).ready(function(){

    function passoDois(){
        $("#passo-um").hide();
        $("#passo-dois").show();
    }

    function passoTres(){
        $("#passo-um").hide();
        $("#passo-dois").hide();
        $("#passo-tres").show();
    }


    $("#salvar-passo-um").click(function(){
        passoDois();
    });

    $("#salvar-passo-tres").click(function(){
        passoTres();
    });

    $(".href-educ").click(function(){
        $("#passo-um").show();
        $("#passo-dois").hide();
        $("#passo-tres").hide();
    });
});
