<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Shared.Mensagem>" %>

<div data-render="avl_msg" class="<%= (Model.Erro) ? "erro" : "sucesso" %> <%= Model.Estilo %> sessao">
    <p id="mensagem" title="<%= Model.Titulo %>">
        <%= Model.Texto %>
    </p>
</div>
