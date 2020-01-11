<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Question.DuvidaQuestaoRealizada>>" %>

<%@ Import namespace="ProvaColegiada.Models.Question" %>
<div>
<input type="hidden" name="limitDuvidas" value="<%= (Model.Count < DuvidaQuestaoRealizada.TOTAL_DUVIDAS) ? 1 : 0 %>" />

<% foreach(DuvidaQuestaoRealizada duvida in Model){%>

<div class="textoDuvidaQuestao">
    <p>Dúvida ou comentário enviado em <%=String.Format("{0:dd/MM/yyyy}", duvida.Envio)%> às <%=String.Format("{0:HH:mm}h", duvida.Envio)%></p>
    <%=Html.Encode(duvida.Duvida) %>
</div>

<%} %>
</div>

