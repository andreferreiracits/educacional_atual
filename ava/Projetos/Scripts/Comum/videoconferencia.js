
$(document).ready(function () {

    //console.log('videoconferencia');
    $("#agCampoData1,#agCampoData2,#agCampoData3").datepicker({
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior'
    });

    $('#box_pag-orientacoes .input_hora').mask("99:99");
    $('#box_pag-orientacoes .input_hora').on('change', function () {
        var self = $(this);
        var intOpcao = self.attr('data-intopcaodata');

        var valor = self.val();
        var Horario = valor.split(':');

        //Armazendo as horas e minutos nas variaveis
        var hora = Horario[0];
        var minutos = Horario[1];

        if ((hora < 00 || hora > 23) || (minutos > 59 || minutos < 00)) {
            alert('Por favor, preencha a Hora corretamente.');

            $("#agCampoHora" + intOpcao).val('');
        }

    });

    $('#box_pag-orientacoes .btn_enviar').on('click', function () {
        //console.log('agendei');
        var self = $(this);

        var contData = 0;
        var contHora = 0;
        var msg = "";
        var idGrupoSac = $("#idgs").val();
        var idTipoSac = $("#idts").val();
        var txtTema = $.trim($("#agtemaReuniao").val());

        $('#box_pag-orientacoes .input_hora').each(function (index, el) {
            if (el.value == "") { contHora++; }
        });

        $('#box_pag-orientacoes .input_data').each(function (index, el) {
            if (el.value == "") { contData++; }
        });

        if (txtTema == "")
            msg += "Por favor, preencha o Tema.";
        if (contData > '0')
            msg += "\nPor favor, preencha todas as Datas.";
        if (contHora > '0')
            msg += "\nPor favor, preencha todas as Horas.";
        if (idGrupoSac == 0 || idTipoSac == 0)
            msg += "\nO agendamento não foi carregado corretamente. Tente fechar e abrir o navegador novamente!";

        if (msg.length < 1) {            
            
            $('#loadingSac').show();
            self.hide();

            $.post("/Recursos/Projetos/include/videoconferencia_gravasac.asp", {
                idGrupoSac: idGrupoSac,
                idTipoSac: idTipoSac,
                txtTema: txtTema,
                txtDetalhes: $("#agObservacao").val(),
                txtData1: $("#agCampoData1").val(),
                txtHora1: $("#agCampoHora1").val(),
                txtData2: $("#agCampoData2").val(),
                txtHora2: $("#agCampoHora2").val(),
                txtData3: $("#agCampoData3").val(),
                txtHora3: $("#agCampoHora3").val(),
                strEmailUsuario: $("#strEmailUsuario").val()
            }).done(function (data) {

                //console.log(data);
                if (data == '0') {
                    alert("ERRO: Sua mensagem não foi enviada, por gentileza feche o navegador e abra novamente!");
                } else {
                    $("#box_pag-orientacoes .formulario_vc").hide();
                    $("#box_pag-orientacoes .feedback_vc").show();
                }
                $("#loadingSac").hide();
            }).fail(function (err) {
                alert('Não foi possível enviar o SAC neste momento. Tente novamente!');

                $("#loadingSac").hide();
                self.show();
            });
            

        } else {
            alert(msg);
        }

    });

});