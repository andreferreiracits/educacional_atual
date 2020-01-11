<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<int>>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


<div id="dlgHabileFiltro" title="Filtrar por Hábile" class="popup SEC02511 dlgFiltroClassificacao">
<%
    using (Html.BeginForm("CarregarConteudoFiltro", "Habile", FormMethod.Post, new { @class = "tbl formClassificacaoFiltro" }))
    {
        foreach (int i in Model)
        {
            %>
                <input type="hidden" class="notsend" name="bancoPertence" value="<%=i %>" />
            <%
        }
        %>
        <div class="popupConteudo">
		    <p>Selecione:</p>
		    <div class="tituloArvoreQuestao">
			    <label>Hábile:</label>
		    </div>
		    <div class="conteudoFiltroSelect boxArvoreScroll">
			    <%--<% Html.RenderPartial("../Classificacao/Habile/ConteudoHabile"); %>--%>
                <% Html.RenderPartial("../Questoes/Classificacao/Habile/Habile"); %> 
		    </div> 
		</div>
		<div class="popupBotoes">
		    <div class="btnEspacamento">
			    <a class="btnNav btnCancelar">Cancelar</a>
		    </div>
		    <div class="btnEspacamento direita">
			    <a class="btnNav btnFiltro">Filtro</a>
		    </div>
		</div>
        <%
    }
%>
</div>

