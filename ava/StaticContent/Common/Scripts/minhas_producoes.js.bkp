jQuery(function ($) {

    
    $("#ava_wrap").delegate(".action_minhas", "click", function () {

        var este = $(this);    

        $.ajax({
            url: "/AVA/Barras/Home/MinhasProducoes/",
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            success: function (data) {
                $("#ava_mural_geral").html(data);

                //Carrega Minhas Producoes
                $.ajax({
                    url: "/rede/carrega_mp.asp",
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    success: function (data) {
                        $(".conteudo_PR").html(data);

                        $("#dadosPerfil ul li").removeClass("current");
                        este.parent().addClass("current");

                    },
                    error: function (data) {
                        alert(data.status);
                    }
                });


                //Carrega Estou Participando
                $.ajax({
                    url: "/rede/carrega_ep001.asp",
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    success: function (data) {
                        $(".conteudo_EP").html(data);
                    },
                    error: function (data) {
                        alert(data.status);
                    }
                });



                


            },
            error: function (data) {
                alert(data.status);
            }
        });




    });

});


function buscaMP() {
    $.post('/rede/mp_minhasproducoes_ava.asp', { 'ts': new Date().getTime(), 'filhos': $("#filhos").val(), 'totalFilhos': $("#totalFilhos").val() }, function (data) {
        $('.chama_barra123').html(data);
    });
}