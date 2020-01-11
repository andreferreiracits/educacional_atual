
console.log("atualizado");
$(document).ready(function () {
    if (dtmInicio != undefined && dtmFim != undefined) {


        var form = $("<form>").attr("action", "http://www.educacional.com.br/ava/avaliacoes/Agendamento/ListagemAgendamentoUsuario");
        $("<input>").attr("name", "dtmInicio").val(dtmInicio).appendTo(form);
        $("<input>").attr("name", "dtmFim").val(dtmFim).appendTo(form);

        $.ajax({
            url: form.attr("action"),
            data: form.serialize(),
            type: "POST",
            success: function (dados, status, xhttp) {
                respostaJsonAvaliacoes = dados;
                console.log(dados);
            }
        });

    }
});