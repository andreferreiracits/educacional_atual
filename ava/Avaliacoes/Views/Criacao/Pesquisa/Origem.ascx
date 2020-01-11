<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<div class="boxOrigem">
    <% if (Model.Prova.Compartilhada == Compartilhada.Privada) {%>
        <label><input type="checkbox" name="chkOrigemBusca" id="Checkbox1"  value="<%= (int)Compartilhada.Privada %>" /> Minhas</label>
    <% } %>
    <% if (Model.Prova.Compartilhada == Compartilhada.Privada || Model.Prova.Compartilhada == Compartilhada.Escola)
        {%>
        <label><input type="checkbox" name="chkOrigemBusca" id="Checkbox2" value="<%= (int)Compartilhada.Escola %>" /> Da minha escola</label>
    <% } %>
        <label><input type="checkbox" name="chkOrigemBusca" id="Checkbox3" value="<%= (int)Compartilhada.Portal %>" /> Do <%=this.TextosRecursos()["TextoPortal_"+ this.Usuario().TipoPortal.Id]%></label>
</div>