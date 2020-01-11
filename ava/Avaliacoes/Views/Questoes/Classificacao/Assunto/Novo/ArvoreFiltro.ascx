<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Arvore<ProvaColegiada.ValueObjects.NoVO>>" %>
<%@ Import Namespace="ProvaColegiada.ValueObjects" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<ul class="arvore">
<%
    foreach (NoVO noV in Model.Nos)
    {
        NoAssuntoVO no = (NoAssuntoVO)noV;
%>
    <li id="n_areaAssunto_<%=no.Id %>" class="no">
        <% 
        if (no.ERaiz)
        {
                %>
                <input id="chkFolha_n_areaAssunto_<%= no.Ids %>" class="selecionar ico notsend" type="checkbox" name="chkClassificacao_<%=EnumTipoClassificacao.Assunto.Id %>" value="<%= no.Id %>;<%= no.NomeCompleto %>">
                <img class="mais ico" src="<%= UtilView.Url("/Content/imgcss/icoMais.png") %>" alt="exibir">
                <%
        }
        else
        {
                %>
                <input id="chkFolha_n_areaAssunto_<%= no.Ids %>" class="selecionar ico" type="checkbox" name="chkClassificacao_<%=EnumTipoClassificacao.Assunto.Id %>" value="<%= no.Id %>;<%= no.NomeCompleto %>">
                <%
        }
                    
        %>
        
        <span class="nome">
            <a class="txt <%=no.Editavel ? "pertence" : "" %>">
                <label for="chkFolha_n_areaAssunto_<%=no.Ids %>"><%=Html.Encode(no.Nome)%></label>
            </a>
        </span>
        <% 
            if (no.TemFilhos)
                Html.RenderPartial("../Questoes/Classificacao/Assunto/Novo/ArvoreFiltro", new Arvore<NoVO>(no.Filhos, Model.Editavel, Model.Selecionavel));
        %>

    </li>
<% } %>
</ul>