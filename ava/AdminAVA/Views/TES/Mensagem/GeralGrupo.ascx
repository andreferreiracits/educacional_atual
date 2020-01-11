<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<script>

$(function () {
    
    $("#dtmIniPesq").datepicker({
        defaultDate: "-3m",
        numberOfMonths: 3,
        minDate: '-2M',
        maxDate: '+0D',
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        onSelect: function (selectedDate) {
            $("#dtmFimPesq").datepicker("option", "minDate", selectedDate);
        }
    });

    $("#dtmFimPesq").datepicker({
        defaultDate: "-3m",
        numberOfMonths: 3,
        minDate: '-2M',
        maxDate: '+0D',
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        onSelect: function (selectedDate) {
            $("#dtmIniPesq").datepicker("option", "maxDate", selectedDate);
        }
    });

    $("#dtmIniPesq").mask("99/99/9999");
    $("#dtmFimPesq").mask("99/99/9999");

    $(".timeline_filtros").click(function () {
        $('#aviso_style').remove();
    });

    filtra_MsgGrupo();

});

function filtra_MsgGrupo() {

    var strUsuario = $("#strPesquisa").val();
    var strGrupo = $("#strNomeGrupo").val();
    var dtmInicio = $("#dtmIniPesq").val();
    var dtmFim = $("#dtmFimPesq").val();
    var tipoGrupo = $('#sTipoGrupo :selected').val();
    var bolMsgComentMsgExcluido = 0;

    $('#aviso_style').remove();

    if (!valida_data(dtmInicio) || !valida_data(dtmFim)) {
        return false;
    } else {


        data = new Date();
        dia = data.getDate();
        mes = data.getMonth();
        ano = data.getFullYear();

        if (dtmInicio == "" || dtmInicio == null) {
            dtmInicio = dia + "/" + (mes + 1) + "/" + ano;
        }

        if (dtmFim == "" || dtmFim == null) {
            dtmFim = dia + "/" + (mes + 1) + "/" + ano;
        }

        if ($('#check_excluidos').is(':checked')) {
            bolMsgComentMsgExcluido = 1;
        }

        var unidade = -1;
        if ($('#cbUnidade').val() != undefined) {
            unidade = $('#cbUnidade').val();
        }

        $.ajax({
            type: "POST",
            url: "/AVA/Grupo/Home/TimeLineAdmin/",
            cache: false,
            data: {
                idUnidade: unidade,
                strUsuario: strUsuario,
                strGrupo: strGrupo,
                idTipoGrupo: tipoGrupo,
                dtmInicio: dtmInicio,
                dtmFim: dtmFim,
                bolMsgComentMsgExcluido: bolMsgComentMsgExcluido
            },
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            beforeSend: function () {
                $('#gif_carrega').fadeIn('slow', function () {
                    $("#gif_carrega").html('<div style="padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 28%;" id="loader_timeline"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"></div>');
                });
            },
            success: function (data) {
                $('#gif_carrega').fadeOut('slow', function () {
                    $("#loader_timeline").remove();
                });
                $(".timeline").html(data);
                $('.btAbreFechaFiltro').toggle(
			        function () {
			            $('.boxFiltro').slideUp();
			            $(this).html('Abrir<span class="fechado"></span>');
			        }, function () {
			            $('.boxFiltro').slideDown();
			            $(this).html('Fechar<span class="aberto"></span>');
			        }
		        );
            },
            error: function (data) {
                console.debug(data.status);
            }
        });
        return true;
    }
}
</script>

<%
DateTime dataAtual = DateTime.Now;
IList<UsuarioAVA.Models.Unidade> lUnidade = null;
    
if (ViewData["lUnidades"] != null)
{
    lUnidade = (List<UsuarioAVA.Models.Unidade>)ViewData["lUnidades"];
}        

%>
<div class="le_filtros">
	<div id="filtro_aval">
		<div class="topo_filtro">
			<h3>Filtro</h3>
			<a href="javascript:void(0);" class="btAbreFechaFiltro">Fechar<span class="aberto"></span></a>
		</div>
		<div class="boxFiltro">
			<div class="itens">
				<h4>Nome do usuário:</h4>
				<input type="text" size="30" id="strPesquisa" value="" class="nome_usuario" />
				<input name="check_excluidos" id="check_excluidos" value="1" type="checkbox" class="input_mensagem" /><label for="check_excluidos" class="mensagem_excluida"> Mensagens e comentários excluídos</label>
			</div>
            <div class="itens">
				<h4>Nome do grupo:</h4>
				<input type="text" size="30" id="strNomeGrupo" value="" class="nome_usuario" />
				
                <h4>Tipo do grupo:</h4>
				<select id="sTipoGrupo">
                  <option value="0" selected>Todos</option>
                  <option value="1">Portal</option>
                  <option value="2">Escola</option>
                </select>
			</div>
			<div class="itens">
				<h4>Período:</h4>
				de
				<input type="text" size="8" id="dtmIniPesq" value="<%=dataAtual.ToString("dd/MM/yyyy") %>" class="periodo" />até
				<input type="text" size="8" id="dtmFimPesq" value="<%=dataAtual.ToString("dd/MM/yyyy") %>" class="periodo" />	
			</div>
			<%
            if (lUnidade.Count > 0)
            {
                %>
                <div class="itens">
				    <h4>Unidades:</h4>
                    <select id="cbUnidade">
                        <option value="0">Todas</option>                        
                        <%
                        foreach (var unidade in lUnidade)
                        {                            
                            %>
                            <option value="<%=unidade.id%>"><%=unidade.strUnidade%></option>
                            <%                        
                        }
                        %>
                    </select>
			    </div>  
                <%  
            }    
            %>
			<div class="itens_botoes">
				<a href="javascript: void(0);" class="btn_laranja salvar" onclick="filtra_MsgGrupo()">Filtrar</a>
			</div>
		</div>	
	</div>
</div>

<section class="timeline timeline_adm">

</section>

       