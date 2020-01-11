<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.QuestaoView>" %>

<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.Models" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Classificações</title>
    <base id="baseSite" href="<%= UtilView.UrlCompleta(Request) %>" />
    <%=Html.BundleCss(
        "Content/css/jquery-ui-1.8.4.custom.css",
        "Content/css/principal.css",
        "Content/css/tabela.css",
        "Content/css/arvore.css",
        "Content/css/mceView.css",
        "Content/css/questao.css",
        "Content/css/form.css",
        "Content/css/popup.css"
       
    )%>
    
    <style>
        body
        {
            margin: 0;
        }
        table.tabela tbody tr:hover {
            background-color: #FFF;
        }
    </style>

    <%= Html.BundleScript("Scripts/jquery-1.7.min.js",
            "Scripts/jquery.ui.widget.js",
            "Scripts/util/jquery-ui-1.8.5.custom.min.js",
            "Scripts/util/jquery.ui.combo.js",
            "Scripts/class/Carregando3.0.0.js",
            "Scripts/class/Mensagem3.1.0.js",
            "Scripts/class/Tabela.js",
            "Scripts/class/Ordenacao.js",
            "Scripts/view/geral.js",
            "Scripts/class/NovaClassificacao.js",
            "Scripts/class/NovaArvore.js",
            "Scripts/view/classificacaoQuestao.js"
     
            )%>
    <% foreach (string jsClassificacao in EnumClassificacaoView.JSTipoClassificacao)
       { %>
       <script src="<%= UtilView.Url(jsClassificacao) %>" type="text/javascript"></script>
    <% } %>

    <script type="text/javascript">
        function Tour() { 
            onInitTour();
        };

        function inicializar() {
            
            mensagem = new Mensagem("alerta");
            //confirm = new Confirm("alerta");
            //mensagemAnexo = new Mensagem("alertaAnexo");

            initClassificacaoQuestao();
        }
        function carregarClassificacao() {
            $.ajax({
                url: caminhoBase + '/Questoes/ClassificacaoQuestao/',
                data: $('#frmQuestao').serialize(),
                type: "POST",
                success: function (dados, status, xhttp) { retornoClassificacaoQuestao(dados); }
            });
        }
        function retornoClassificacaoQuestao(dados) {
            if (!retornoErro(dados)) {
                destroyDialogoClassificacao();

                $("div#cxaClassificacaoQuestao").html($(dados));
            }

            trocarTela('classificacao');
        }
    </script>
    

</head>
<body>
    <div id="MainAvaliacoes" class="SEC02511">
        <div id="infoQuestao">
        <% using (Html.BeginForm("SalvarQuestao", "Questoes", FormMethod.Post, new { @id = "frmQuestao" }))
					{
						%>
						<input type="hidden" id="idQuestaoSalvar" name="idQuestaoSalvar" value="<%= Model.Id %>" />    
						<%
					}%>

        <% if (Model.btnsAdicionarClassificacao.Length > 0) {%>
		<div class="areaTipoClassificacao">
			<div class="linhaPar">
				<label class="SEC02511_titulo strong">Classificação:</label>
				<span class="SEC02511_texto">
					<% foreach (string v in Model.btnsAdicionarClassificacao)
					{
						Html.RenderPartial(v);
					} %>
					
				</span>
			</div>
		</div>

		<div class="areaClassificacaoTabela" id="areaClassificacaoQuestao">
			 <% foreach (string v in Model.tabelasClassificacao)
			{
				Html.RenderPartial(v, Model.Classificacao);
			} %>
		</div>
		<%} %>
        </div>
    </div>

<%
    
    if (Model.ClassificacoesBanco.Length > 0)
    {
        foreach (EnumClassificacaoView classificaView in Model.ClassificacoesBanco)
        {
            Html.RenderAction(classificaView.TipoView.ActionDialogoAdicionar, classificaView.TipoView.Controller);
        }
    }
%>

</body>
</html>
