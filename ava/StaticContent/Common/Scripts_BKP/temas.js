jQuery(function ($) {

    varTemaRel = undefined;
    //Carregar TEMA
    /*var linkCSS = "/AVA/StaticContent/Content/TES/css/";
    $.ajax({
        url: "/AVA/barras/home/CarregarTema",
        success: function (data) {
            rel = data;
            tema = rel.split("_");
            tema = tema[1];
            temaValidar = rel.split("_")[0];
            if ((rel == "" || rel === undefined) || temaValidar != "AVA") {
                tema = "laranja";
                rel = "AVA_laranja";
            }

            $("#cssAVA").attr("href", linkCSS + tema + ".css");
            $(".trocarTemas:first").attr("rel", rel);
            varTemaRel = rel;
        },
        error: function (data) {
            alert("Erro ao carregar o tema");
        }
    });*/

    //Ao clicar no botão do tema
   /* $("#ava_barratopo").delegate(".trocarTemas", "click", function (e) {

        rel = $(this).attr("rel");
        tema = rel.split("_");
        tema = tema[1];

        $("#cssAVA").attr("href", linkCSS + tema + ".css?v=1");
        $(".trocarTemas:first").attr("rel", rel);
        $.ajax({
            url: "/ava/barras/home/trocarTemaUsuario",
            data: {
                tema: rel
            },
            type: "POST",
            success: function (data) {
                data = parseInt(data);
                if (data != 0) {
                    //$(".trocarTemas:first").attr("rel", rel);
                } else {
                    alert("Erro ao trocar o tema");
                }
            },
            error: function (data) {
                alert("Erro ao tentar trocar o tema!");
            }
        });
        e.preventDefault;
    });*/
});
