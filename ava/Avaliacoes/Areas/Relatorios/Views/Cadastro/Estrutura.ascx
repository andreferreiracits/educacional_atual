<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Interfaces.IRelatorioView>" %>
<% 
    string jacadastrado = Model.JaCadastrado ? "" : "hideI";
%>
<div id="infoRelatorio">
    <div class="cxaTituloPagina">
        <h3 class="tituloStatus">Criação de Relatório</h3>
        <a class="linkPadrao" href="<%=Url.RouteUrl("Default", new { controller="Relatorio", action="Cadastro" } ) %>" >« Voltar a listagem dos relatórios</a>
    </div>
    
    <div id="avisoStatus">
        <div class="bordaEsq"></div>
        <div class="bordaMeio SEC02511_texto"> Estado do relatório: <span id="statusQuestao" class="status"><%= Model.Estado %></span> </div>
        <div class="bordaDir"></div>
    </div>
    
    <ul class="menuNavegacao" data-seletorpasso=".cxaPasso">
        <li class="passo passo0" data-reload="false"> <a href="javascript:void(0);" class="ativo"> Configurações </a> </li>
        <li class="passo passo1" data-link="<%= Url.Action("Resumo", new { areas = "Relatorios", controller = "Cadastro" })%>" data-reload="true" data-formseletor="#frmEstruturaRelatorio" data-content="json" > <a href="javascript:void(0);"> Confirmação </a> </li>
    </ul>
    <div class="cxaPasso">
        <% Html.RenderPartial("Editar", Model); %>
    </div>
    <div class="cxaPasso"></div>

    <div class="navegacaoBotoes">
        <div class="btnEspacamento">

            <a href="<%=Url.Content("~/Relatorio/Cadastro") %>" id="btnCancelar" class="btnCancelar">Cancelar</a>
            <!--%= Html.ActionLink("Cancelar", "Index", "Agendamento", new { @id = "btnCancelar", @class = "btnCancelar" })%-->
        </div>
        <div class="btnEspacamento direita">
            <a class="btnNav hideI" data-event="voltarPasso">« Voltar</a>
            <a class="btnNav" data-event="proximoPasso">Avançar &raquo;</a>
            <a class="btnNav hideI" data-event="finalizarPasso" data-seletor="#frmEstruturaRelatorio" data-content="json" >Gerar Relatório</a>
            <a class="btnNav laranja <%: jacadastrado %>" data-event="onPopup" data-width="1100" data-height="680" data-scroll="true" data-resizable="true" id="visualizarRelatorio" href="<%= Url.RouteUrl("Default", new { controller = "Relatorio", action = "Visualiza", id=Model.Id }) %>">Ver relatório</a>
        </div>
    </div>
</div>