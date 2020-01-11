<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Refactor/Avaliacao.Master" Inherits="Avaliacoes.Framework.Web.Master.AvaliacaoViewPage<Avaliacoes.Componentes.Avaliacoes.Models.IAvaliacaoView>" %>

<asp:Content ID="Css" ContentPlaceHolderID="AvlCss" runat="server">
	<%=Html.BundleCss(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.YUI, "Areas/Avaliacoes/Content/editar-0.{0.0}.css", "Areas/Avaliacoes/Content/grupo-questoes-0.{0.0}.css")%>
    <%=Html.BundleCss(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.YUI, "refactor-content/avl_css/tbl_list-0.{0.0}.css")%>
    <% Html.RenderAction("CssEditar", Model.Controller, new { area = "Avaliacoes" }); %>
</asp:Content>

<asp:Content ID="Titulo" ContentPlaceHolderID="AvlTitulo" runat="server">
	- Editando Avaliação
</asp:Content>

<asp:Content ID="Conteudo" ContentPlaceHolderID="AvlContent" runat="server">
    
    <a href="<%=Url.Content("~/Avaliacoes/Widget/DialogoGrupos") %>" data-render="avl_load_widget" id="avl_dlg_grupo" data-event-is_load="dialogGroupIsLoad"></a>
    <a href="<%=Url.Content("~/Questao/Widget/DialogoBuscaQuestoes") %>" data-render="avl_load_widget" id="avl_dlg_busca_questao"></a>
    <a href="<%=Html.BundleFile("Areas/Avaliacoes/Help/cadastro-{0.0.0}.htm") %>" data-render="avl_help" id="help_cadastro_avaliacao">Ajuda</a>
	<section id="avl_cad">
        <header>
            <h1>Cadastro de avaliação</h1>
            <p><a href="<%=Url.Content("~/Criacao") %>" title="Voltar a listagem das avaliações" data-render="avl_auto_link" data-listener-event="voltarLista" data-event-pre="avl_load-show">Voltar a listagem das avaliações</a></p>
        </header>

        <section role="status">
            <p>Estado da avaliação: <strong>Em Elaboração</strong></p>
        </section>

        <form id="avl_form_save">
            <input type="hidden" name="Avaliacao[Id]" value="<%=Model.Id %>" />
            <input type="hidden" name="Avaliacao[CodigoOrigem]" value="<%=Model.CodigoOrigem %>" />
        </form>

        <section>
            <ul id="avl_stps_menu" data-render="avl_stps">
                <li><a href="#avl_stps_config" aria-selected="true" title="Estrutura da prova" data-chainfire-pre_next="stpConfig" >Estrutura da prova</a></li>
                <li><a href="#avl_stps_quest" title="Questões" data-chainfire-pre_next="stpQuestoes"  data-event-end_open="stpQuestoes">Questões</a></li>
                <li><a href="#avl_stps_confirm" title="Resumo" data-event-end_open="stpConfirm">Resumo</a></li>
            </ul>
        </section>

        <%Html.RenderPartial("PassoConfiguracoes", Model); %>

        <%Html.RenderPartial("PassoQuestoes"); %>

        <%Html.RenderPartial("PassoConfirmacao"); %>
            
        <footer>
            <a href="<%=Url.Content("~/Criacao") %>" class="btn_cancel">Cancelar</a>
        </footer>
    </section>

</asp:Content>

<asp:Content ID="JsRodape" ContentPlaceHolderID="AvlScriptBottom" runat="server">
    <% Html.RenderPartial("Refactor/Scripts/Gerais"); %>
	<% Html.RenderPartial("Refactor/Scripts/TinyOld"); %>
    <% Html.RenderAction("JsEditar", Model.Controller, new { area = "Avaliacoes" }); %>
</asp:Content>
