<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="dlgAnularQuestao" title="Anular Questão" class="popup SEC02511">
<%  using (Html.BeginForm("CarregarVisualizarQuestoesProva", "Agendamento", FormMethod.Post, new { @id = "formAnularQuestao", @class = "tbl" }))
	{ %>
    <input type="hidden" value="" id="idAplicacaoSalvar" name="idAplicacaoSalvar" />
    <input type="hidden" value="2" id="tipoShow" name="tipoShow" />
	<div class="popupConteudo">
    <div class="cabecalhoAnular"></div>
	<table id="tblQuestoes" class="tabela scroll scrollAnular" cellpadding="0" cellspacing="0" border="0" width="860">
        <thead>
            <tr>
                <td style="width: 5px; " class="bordaGrupo"></td>
                <td style="width:615px; padding-left:10px;" colspan="3">Enunciado</td>
                <td style="width:70px;">Valor</td>
                <td style="width:170px;">Identificador</td>
                <td style="width:110px;">Anulada</td>
            </tr>
        </thead>
        <tbody>
            <tr class="vazio"><td colspan="6"></td></tr>
        </tbody>
    </table>

	</div>
    <div class="clear"></div>
    <div id="containerConfirAnular">
        <div id="boxConfirAnular">
            <p>Selecione uma opção e confirme se deseja anular a questão</p>
            <label><input type="radio" name="intTipoAnular" id="intTipoAnularCom" value="<%=(int)ProvaColegiada.Models.Question.QuestaoAnulada.TipoAnulada.ComNota %>" checked="checked" />Soma Valor</label>
            <label><input type="radio" name="intTipoAnular" id="intTipoAnularSem" value="<%=(int)ProvaColegiada.Models.Question.QuestaoAnulada.TipoAnulada.SemNota %>" />Excluir Valor</label>
            <div class="clear"></div>
            <div class="popupBotoes">
                <div class="btnEspacamento">
			        <a id="btnCancelarAnularConfirm" class="btnNav">Cancelar</a>
		        </div>
		        <div class="btnEspacamento direita">
			        <a id="btnNaoAnular" class="btnNav">Não</a>
                    <a id="btnSimAnular" class="btnNav">Sim</a>
		        </div>
            </div>
        </div>
    </div>
    <div class="popupBotoes">
		<div class="btnEspacamento">
			<a id="btnCancelarAnular" class="btnNav">Cancelar</a>
		</div>
		<div class="btnEspacamento direita">
			<a id="btnConcluirAnular" class="btnNav">Anular</a>
		</div>
	</div>
<%  } %>
</div>

