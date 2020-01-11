<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="dlgImpressao" title="Imprimir Avaliação" class="popup SEC02511">
<%  using (Html.BeginForm("ListaQuestoesImprimir", "Criacao", FormMethod.Post, new { @id = "formImprimirAvaliacao", @class = "tbl" }))
	{ %>
	<div class="popupConteudo">
        
	</div>
    <div id="containerDownloadModelos">
        <div id="boxDownloadModelos">
        
        </div>
    </div>
    <div class="clear"></div>
	<div class="popupBotoes">
        
		<div class="btnEspacamento">
			<a id="btnCancelarImpressao" href="javascript:void(0)" class="btnNav">Cancelar</a>
		</div>

        
		<div class="btnEspacamento direita">
            <% if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.TipoPortal != ProvaColegiada.Models.EnumTipoPortal.AprendeBrasil) {%>
			    <a id="btnConcluirImpressao" href="javascript:void(0)" class="btnNav">Imprimir</a>
            <%} else { %>
                <%= Html.ActionLink("Imprimir", "ImprimirHtml", "Criacao", new { @id = "btnConcluirImpressaoHtml", @class = "btnNav" })%>
                <!--a id="btnConcluirImpressaoHtml" href="javascript:void(0)" class="btnNav">Imprimir</a-->
            <% } %>
		</div>
	</div>
    
<%  } %>
</div>
