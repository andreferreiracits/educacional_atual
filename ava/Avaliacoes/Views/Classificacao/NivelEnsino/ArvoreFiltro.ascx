<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Arvore<ProvaColegiada.ValueObjects.NoVO>>" %>
<%@ Import Namespace="ProvaColegiada.ValueObjects" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<ul class="arvore">
<%
    foreach (NoVO noV in Model.Nos)
    {
        NoNivelEnsinoVO no = (NoNivelEnsinoVO)noV;
%>
    <li id="n_nivelEnsino_<%=no.Id %>" class="no <%=no.RepresentaRaiz ? "representaraiz" : "" %>">
        
        <% 
            
        /*if (no.RepresentaRaiz)
            continue;*/
            
        if (no.ERaiz)
        {
                %>
                <input id="chkFolha_n_nivelEnsino_<%= no.Ids %>" class="selecionar ico notsend" type="checkbox" name="chkClassificacao_<%=EnumTipoClassificacao.NivelEnsino.Id %>" >
                <% if (no.TemFilhosRaizSelect)
                   {  %>
                <img class="mais ico" src="<%= UtilView.Url("/Content/imgcss/icoMais.png") %>" alt="exibir">
                <%}
        }
        else
        {
                %>
                <input id="chkFolha_n_nivelEnsino_<%= no.Ids %>" class="selecionar ico" type="checkbox" name="chkClassificacao_<%=EnumTipoClassificacao.NivelEnsino.Id %>" value="<%= no.Id %>;<%= Html.Encode(no.NomeCompleto) %>">
                <%
        }
                    
        %>
        
        <span class="nome">
            <a class="txt <%=no.Editavel ? "pertence" : "" %>">
                <label for="chkFolha_n_nivelEnsino_<%=no.Ids %>"><%=Html.Encode(no.Nome)%></label>
            </a>
        </span>
        <% 
            if (no.TemFilhos)
                Html.RenderPartial("../Classificacao/NivelEnsino/ArvoreFiltro", new Arvore<NoVO>(no.Filhos, Model.Editavel, Model.Selecionavel));
        %>

    </li>
<% } %>
</ul>