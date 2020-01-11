<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%
    string menu = ViewContext.Controller.ValueProvider.GetValue("controller").RawValue.ToString();
%>

<ul id="menuConteudo" class="abas">

<%
    IDictionary<string, string> botoes = (IDictionary<string, string>)ViewData["ViewBotoesMenu"];

    Html.RenderAction("Aba", "NovaHome", new { @ativo= menu });
    Html.RenderPartial(botoes["Questoes"], menu);
    Html.RenderPartial(botoes["Criacao"], menu);
    Html.RenderPartial(botoes["Aplicacao"], menu);
    //Html.RenderPartial(botoes["Relatorio"], menu);
    Html.RenderPartial(botoes["Correcao"], menu);
    Html.RenderAction("Aba", "Cadastro", new { area = "Relatorios", @ativo = menu });
    Html.RenderPartial(botoes["Aresponder"], menu);
    Html.RenderPartial(botoes["Responsavel"], menu);
    Html.RenderPartial(botoes["Coordenador"], menu);
    Html.RenderPartial(botoes["Simulado"], menu);
    Html.RenderPartial(botoes["Administracao"], menu);
%>    

</ul>