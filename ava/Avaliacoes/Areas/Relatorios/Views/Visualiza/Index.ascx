<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<int?>" %>
<%
    string nomeController = (string)ViewData["controllerConsulta"];
    string menuAbas = ViewData.Keys.Contains("menuAbas") ? (string)ViewData["menuAbas"] : "../Visualiza/Abas/AbasRelatorioAvaliacao";
    string abaAtiva = ViewData.Keys.Contains("abaAtiva") ? (string)ViewData["abaAtiva"] : "AbaNotas";
    string inputRealizadores = ViewData.Keys.Contains("inputRealizadores") ? (string)ViewData["inputRealizadores"] : "../Visualiza/inputRealizadores";
    string menuAgendamentos = ViewData.Keys.Contains("menuAgendamentos") ? (string)ViewData["menuAgendamentos"] : "MenuAgendamento";
%>

<% using (Html.BeginForm("Consultar", nomeController, new RouteValueDictionary( new { id = Model }), FormMethod.Post, new Dictionary<string, object> { {"data-tipo","form" }})) { %>
<div id="corpoVisuRelatorios">
    <div id="abaNavegaVisuRelatorios" class="abaNavegaVisuRelatorios">
        <div class="titRelatorio"><%: ViewData["tituloRelatorio"] %></div>
        <ul class="abas" data-tipo="menu" data-destino="#conteudoRela">
            <% Html.RenderPartial(menuAbas); %>
        </ul>
        <div class="tipoRelatorio">Relatório por:</div>
    </div>
    <div class="clear"></div>
    <div id="caixaConteudoRelatorio" class="caixaConteudoRelatorio">
        <table>
            <tr>
                <td class="menuColunaTabela aberto" data-tipo="painelretratil" data-botao="#menuRelatorios a.setaMenu">
                <div id="menuRelatorios" class="menuRelatorios">
                    <span data-tipo="clickfor" data-botao="#menuRelatorios a.setaMenu">Recolher menu </span>
                    <a class="setaMenu" href="#"></a>
                </div>
                <div id="menuFiltroRelatorios" class="menuFiltroRelatorios" >
                    <div id="filtroUsuarios" class="filtroUsuarios">
                        <% Html.RenderPartial(inputRealizadores); %>
                        <%--<div class="iconeSeletor"></div>--%>
                    </div>
                    <div id="boxFiltroUsuarios"></div>
                    <% Html.RenderAction(menuAgendamentos, nomeController, new { id = Model }); %>
                    <div class="linha"></div>
                    <div id="realizadores" class="realizadores">
                        <% Html.RenderAction("TotalRealizadores", nomeController, new { id = Model }); %>
                        <a class="direita bold txtAzul botaoLimpar" data-tipo="seletorLimpar" data-boxid="boxFiltroUsuarios" data-submit="true">Ver Todos</a>
                    </div>
                </div>
                </td>
                <td>
                <div id="dadosRelatorios" class="dadosRelatorios">
                    <div id="conteudoRela" class="conteudoRela">
                    <% Html.RenderAction(abaAtiva, nomeController); %>
                    </div>
                    <div class="clear"></div>
                    <div id="navegacaoBotoes" class="navegacaoBotoes">
                        <div class="direita">
                            <a class="btnNav abaDeft abaTurmasAlunos" href="javascript:window.print();">Imprimir</a>
                            <%=Html.ActionLink("Exportar", "Exportar", new RouteValueDictionary(new { id = Model }), new Dictionary<string, object> { { "data-tipo", "btnexportar" }, { "class", "btnNav abaDeft abaNotas" } })%>
                        </div>
                    </div>
                </div>
                </td>
            </tr>
        </table>
        
        
        <div class="clear"></div>
    </div>
</div>
<%} %>