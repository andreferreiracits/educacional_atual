<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Arvore<ProvaColegiada.ValueObjects.NoVO>>" %>
<%@ Import Namespace="ProvaColegiada.ValueObjects" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<ul class="arvore">
<%
    foreach (NoVO no in Model.Nos)
    {

        NoEnemVO noH = (NoEnemVO)no;
%>
    <li class="no">
        <% 
        if (no.TemFilhos)
        {
                %>
                <img class="mais ico" src="<%= UtilView.Url("/Content/imgcss/icoMais.png") %>" alt="exibir">
                <%
        }
        else
        {
                %>
                <input id="chkFolha_n_enem_<%= no.Ids %>" class="selecionar ico" type="checkbox" name="chkClassificacao_<%=EnumTipoClassificacao.Enem.Id %>" value="<%= no.Id %>">
                <%
        }
                    
        %>
        
        <span class="nome">
            <a class="txt">
                <label for="chkFolha_n_enem_<%=no.Ids %>"><%=Html.Encode(noH.Nome)%></label>
            </a>
        </span>
        <% 
            if (no.TemFilhos)
                Html.RenderPartial("../Classificacao/Enem/ArvoreAdicionar", new Arvore<NoVO>(no.Filhos, Model.Editavel, Model.Selecionavel));
        %>

    </li>
<% } %>
</ul>