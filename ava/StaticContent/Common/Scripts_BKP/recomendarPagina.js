// JavaScript Document
jQuery(function ($) {

    $("#compartilhar").live("click", function (e) {
        //var elemento = $(".compartilhar");
        var pagina = location.href;
        valorTextArea = $("#compartilharAVA").val();
        $("#txtInput").val(valorTextArea);
        $("#txtInput").val($("#txtInput").val() + " - " + pagina);
        $("#compartilhar").addClass("disable");
        //$("#compartilhar").attr("type", "button");
        $.ajax({
            url: "/AVA/Barras/Home/botaoRecomendar",
            type: "POST",
            data: {
                jsonDestino: montaJSON($(".compartilhamento")),
                idFerramentaTipo: 16,
                urlAtual: pagina
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {
                $(".gostei_compartilhando").hide();
                $("#txtInput").val("");
                $("#compartilharAVA").val("");
                $(".gostei_G").addClass("recm").empty().html("<i class=\"icon_recomends\"></i> Recomendado");
            },
            error: function (data) {
                alert("Erro ao compartilhar");
            }
        });
        e.preventDefault;
    });
});