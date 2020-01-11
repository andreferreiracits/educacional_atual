<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.ItemRealizacao>>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<div class="navegaPaginacao">
	<ul>
        <%
        foreach (ItemRealizacao item in Model){
            %>
        <li>
        <div class="imgPaginacao">
            <div class="paginacaoBtn <%=item.EstiloResumo %> <%=item.EstiloBotao %>">
                <a class="btnPaginacao" href="<%=item.Indice %>"><div><%=item.Nome%></div></a>
            </div>
            <div class="estadoQuestao <%=item.Estilo %>"></div>
        </div>
        </li>
        <% } %>
	</ul>
</div>
