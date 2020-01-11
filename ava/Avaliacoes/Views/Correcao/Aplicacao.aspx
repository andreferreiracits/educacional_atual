<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/AnularQuestao.js") %>"></script>
	<%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/correcao.1.{0.0}.js") %>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ajuda.js") %>"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
	<link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/correcao.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/ajudaView.css") %>" />
</asp:Content>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
	<div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
				<div class="clear"></div>
				<div id="alerta" class="mensagem"></div>
                <%
                    using (Html.BeginForm("Correcao", "Correcao", FormMethod.Post, new { @id = "frmCorrecaoAplicacao", @class = "tbl" }))
                    {
                        %>
                        <input type="hidden" name="txtIdAplicacao" value="<%= Model.Id %>" />
                        <%
                    }
                %>
                <div class="correcaoInfo">
                    <span>Agendamento: <span><%= Model.Nome %></span> | Avaliação : <span><%= Model.NomeProva %></span> - <%= Model.Realizacao %></span>
                </div>
                <div class="correcaoExplicativo">
                    <span>Selecione a ordem em que prefere corrigir as questões. Exiba as questões de um mesmo aluno em sequência ou todas as respostas a uma questão em sequência.</span>
                </div>
                <ul class="correcaoOpcoes">
                    <li class="opcaoQuestao">
                        <a id="btnListaQuestao" class="<%= (bool) ViewData["QuestaoAtivo"] ? "ativo" : "" %>">Questão</a>
                    </li>
                    <li class="opcaoAluno">
                        <a id="btnListaAlunos" class="<%= (bool) ViewData["AlunoAtivo"] ? "ativo" : "" %>">Aluno</a>
                    </li>
                </ul>
                <div id="containerListas"></div>
			</div>
		</div>
	</div>
</asp:Content>