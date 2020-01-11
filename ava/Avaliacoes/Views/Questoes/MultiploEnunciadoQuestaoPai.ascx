<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div class="<%=Model.ShowBoxMultiploEnunciadoBase %>" id="containerMultiplosEnunciadosBase">
    <div class="divisaoQuestao">
	    <h2 class="tituloDivisao">Enunciado base da questão</h2>
	    <span class="textoDivisao"></span>
	    <a href="javascript:;" class="btn direita" id="btnOcultarQuestaoPai"><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
        <%=Html.ActionLink("Adicionar", "AdicionarMultiplasQuestaoBase", "Questoes", new { @class = "btn direita btnQuestaoPai" })%>
    </div>
    <div id="areaEnunciadoBaseContent">
        <table id="tblMultiplosEnunciadoBase" class="tabela scroll scrollEnunciadoBase">
	        <thead>
		        <tr> 
			        <td style="width: 473px; padding-left:10px;" colspan="2">Enunciado</td>
			        <td style="width: 114px;">Autor</td>
			        <td style="width: 161px;">Modificado</td>
			        <td style="width: 107px;">Identificador</td>
		        </tr>
	        </thead>
	        <tbody></tbody>
        </table>
    </div>
</div>
