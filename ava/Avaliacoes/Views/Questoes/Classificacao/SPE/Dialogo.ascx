<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div id="dlgSPE" title="Associar classificação SPE à questão" class="popup SEC02511">
<%
using (Html.BeginForm("AdicionarSPE", "Questoes", FormMethod.Post, new { @id = "frmAdicionarSPE", @class = "tbl" }))
{ 
%>    
<%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.SPE.Id, new { @id = "intTipoSPE" })%>

    <% Html.RenderPartial("../Questoes/Classificacao/SPE/SPE"); %> 

	<div id="treeSPE" class="boxArvoreScroll">
				
	</div> 
    
	<div class="popupBotoes">
		<div class="btnEspacamento">
			<a id="btnCancelarSPE" class="btnNav">Cancelar</a>
		</div>			
		<div class="btnEspacamento direita">
            <!-- HACK-Pardal -->
			<a id="btnFiltroSPE" class="btnNav btnExtra">Filtro</a>
            <!--<a id="btnFiltro__SPE" class="btnNav btnExtra" onclick='alert("Filtrar essa coisinha.");'>Filtro</a>-->
		</div>
		<div class="btnEspacamento direita">
            <!-- HACK-Pardal -->
			<a id="btnSalvarSPE" class="btnNav">Salvar</a>
            <!--a id="btnSalvar__SPE" class="btnNav" onclick='SalvarSPE();'>Salvar</a-->            
		</div>
	</div>
<%  
} 
%>
</div>