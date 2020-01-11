<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>

<% int count = 2; %>
    <% foreach ( var c in Model.Classificacoes ){ %>

        <%  using (Html.BeginForm("AdicionarHabilidade", "Questoes", FormMethod.Post, new { @id = String.Format("frmArvore{0}", count), @class = "hide" })){ %>
            <%= Html.Hidden("intTipoClassificacao", c.Key, new { @id = String.Format("tipo{0}", count) })%>
        <%} %>

    <%   count++;
        } %>