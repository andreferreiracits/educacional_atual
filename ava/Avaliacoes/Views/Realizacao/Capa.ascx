<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Capa>" %>

<div class="areaConteudo">
    <div class="nomeCapa"><%= Model.Titulo %></div>
    <%= (Model.Instrucao.TemHtml) ? Model.Instrucao.Html : Html.Encode(Model.Instrucao.Plano) %>
    <div class="areaNavInferior">
        <div class="btnNavegando">
            <a id="btnVoltar" class="btnVoltarInativo"></a>
            <a id="btnAvancar" class="btnAvancar"></a>
        </div>
    </div>
</div>