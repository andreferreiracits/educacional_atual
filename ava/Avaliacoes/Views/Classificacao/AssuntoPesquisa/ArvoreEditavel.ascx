<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Arvore<ProvaColegiada.ValueObjects.NoVO>>" %>
<%@ Import Namespace="ProvaColegiada.ValueObjects" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<ul class="arvore">
<%
    foreach (NoVO noV in Model.Nos)
    {
        NoAssuntoOpniaoVO no = (NoAssuntoOpniaoVO)noV;
%>
    <li class="no <%=no.Editavel ? "editavel pertence":"" %>">
        <% 
        if (no.ERaiz)
        {
                %>
                <input class="selecionar ico" type="hidden" name="idClassificacao" value="<%= no.Id %>" class="notsend">
                <img class="mais ico" src="<%= UtilView.Url("/Content/imgcss/icoMais.png") %>" alt="exibir">
                <%
        }
        else
        {
                %>
                <input class="selecionar ico" type="checkbox" name="idClassificacao" value="<%= no.Ids %>" disabled="disabled"  class="notsend">
                <%
        }
                    
        %>
        
        <span class="nome">
            <a class="txt <%=no.Editavel ? "editavel pertence" : "naopertence" %>">
                <label><%=Html.Encode(no.Nome)%></label>
            </a>
            <% if (no.Editavel)
               {  %>
            <span class="botoes">
                <a class="btn btnEditarNo">editar</a>
                <%=Html.ActionLink("excluir", "ExcluirClassificacao", "AreaAssuntoPesquisa", new { @class = "btnExcluir btnExcluirNo" })%>
            </span>
            <% } %>
        </span>
        <% if (no.Editavel)
           {  %>
        <span class="edicao">
            <input class="txt" type="text" name="strNomeNo" maxlength="255" value="<%=no.Nome %>">
            <%=Html.ActionLink("salvar", "SalvarClassificacao", "AreaAssuntoPesquisa", new { @class = "btn btnSalvarNo" })%>
            <a class="btn btnCancelarNo">cancelar</a>
        </span>
        <% } %>
        <% 
            if (no.TemFilhos)
                Html.RenderPartial("../Classificacao/AssuntoPesquisa/ArvoreEditavel", new Arvore<NoVO>(no.Filhos, Model.Editavel, Model.Selecionavel, no.Id));
        %>
        <%  if (!no.TemFilhos && no.ERaiz) { %>
        <ul>
            <li class="no">
                <input class="selecionar ico" type="hidden" name="idClassificacao" value="0;<%= no.Id %>" class="notsend">
                <span class="adicionar">
                    <input class="txt" type="text" name="strNomeNo" maxlength="255" value="">
                    <%=Html.ActionLink("salvar", "SalvarClassificacao", "AreaAssuntoPesquisa", new { @class = "btn btnSalvarNo" })%>
                    <a class="btn btnCancelarNo">cancelar</a>
                </span>
                <a class="btn addno">
                    <span class="ico"></span>
                    <span>adicionar assunto</span>
                </a>
            </li>
        </ul>
        <% }  %>
    </li>
    
<% } %>
<% if (Model.Id == 0)
    {
            %>
            <li class="no">
                <input class="selecionar ico" type="hidden" name="idClassificacao" value="<%= Model.Id %>" class="notsend">
                <span class="adicionar">
                    <input class="txt" type="text" name="strNomeNo" maxlength="255" value="">
                    <%=Html.ActionLink("salvar", "SalvarClassificacao", "AreaAssuntoPesquisa", new { @class = "btn btnSalvarNo" })%>
                    <a class="btn btnCancelarNo">cancelar</a>
                </span>
                <a class="btn addno">
                    <span class="ico"></span>
                    <span>adicionar área</span>
                </a>
            </li>
            <%
    } else{%>
        <li class="no">
            <input class="selecionar ico" type="hidden" name="idClassificacao" value="0;<%= Model.Id %>" class="notsend">
            <span class="adicionar">
                <input class="txt" type="text" name="strNomeNo" maxlength="255" value="">
                <%=Html.ActionLink("salvar", "SalvarClassificacao", "AreaAssuntoPesquisa", new { @class = "btn btnSalvarNo" })%>
                <a class="btn btnCancelarNo">cancelar</a>
            </span>
            <a class="btn addno">
                <span class="ico"></span>
                <span>adicionar assunto</span>
            </a>
        </li>
    <%} %>
</ul>