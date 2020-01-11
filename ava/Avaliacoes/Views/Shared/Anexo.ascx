<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Anexo>" %>
<div>
    <span id="nomeAnexo" class="nome"><%=Model.Nome %></span>
    <a id="btnAnexo" href="<%=Model.Id%>" class="btnExcluir"><%=Model.TextoRemover %></a>
    <input type="hidden" id="txtNomeArquivo" name="txtNomeArquivo" value="<%=Model.Nome %>" />

    <input type="hidden" id="txtCaminhoArquivo" name="txtCaminhoArquivo" value="<%= Page.ResolveUrl(Model.Caminho) %>"
</div>