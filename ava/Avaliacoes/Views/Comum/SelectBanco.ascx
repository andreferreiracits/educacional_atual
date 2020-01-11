<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SelectInputModel>" %>
<%@ Import Namespace="Avaliacoes.Framework.Bancos" %>
<%@ Import Namespace="Avaliacoes.Framework.Bancos.Interfaces" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Entidades" %>
<%@ Import Namespace="ProvaColegiada.Refactor.Model.Interfaces" %>

<% 
    IList<IBanco> bancos = Html.Bancos(EnumAcessoBanco.Escrita);
    foreach (IBanco banco in bancos)
    {
        IBancoView bancoview = banco.ToView<IBancoView>();
        %>
        <label><input name="<%=Model.Field %>" type="radio" value="<%:bancoview.Id %>" <%=bancoview.check(Model.Ativo) %>><%:bancoview.Nome %></label>
        <%
    }
%>
