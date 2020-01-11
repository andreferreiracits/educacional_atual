<%@ Page Language="C#" ValidateRequest="false" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.Models.Exam.Aplicacao>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import namespace="ProvaColegiada.Models.Exam.Realizador" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <base id="baseSite" href="<%= UtilView.UrlCompleta(Request) %>" />

	<title>Relatório</title>
	<% Html.RenderPartial("CssPadrao"); %>
	<link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/questao.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/flipped.css") %>" />

	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.7.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery-ui-1.8.5.custom.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.mensagem.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.combo.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.selecionar.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.meio.mask.js") %>"></script> 
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.selectcombo.1.0.0.js") %>"></script> 

    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Carregando3.0.0.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Mensagem3.0.0.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Confirm3.0.0.js") %>"></script>
    
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/QuestaoResumo.js") %>"></script>
    <script src="<%= UtilView.Url("/Scripts/class/Flipped.js") %>" type="text/javascript"></script>

    <script type="text/javascript" language="javascript">

        var carregando, mensagem, caminhoBase, flipped; 
        $(document).ready(function () {
            caminhoBase = $('base').attr('href') == undefined ? "./" : $('base').attr('href');
            mensagem = new Mensagem("alerta");
            carregando = new Carregando("carregandoGeral");
            flipped = new Flipped();
        });

        function retornoErro(dados) {
            if ($(dados).hasClass('erro')) {
                mensagem.exibir($(dados));
                return true;
            }
            return false;
        }
        function viewQuestao(idProvaRealizada, posQuestao) {
            flipped.questaoRealizada(idProvaRealizada, posQuestao);
        }
        function viewRealizada(idProvaRealizada) {
            flipped.provaRealizada(idProvaRealizada)
        }
    </script>

</head>
<body class="bodyAvaliacoes">
    <div id="MainAvaliacoes" class="MainAvaliacoesDebug SEC02511">
    <div id="alerta" class="mensagem comBotao"></div>
    <% using (Html.BeginForm("Relatorio", "FlippedLearning", FormMethod.Post, new { @id = "frmRelatorioFlipped", @class = "tbl" })) { %>
    <div class="TituloJanela"><span><%=Html.Encode(Model.Nome) %></span></div>
    <input type="hidden" name="idAplicacao" value="<%=Model.Id %>"/>
    <div class="clear"></div>
    <div class="relatorio">
        <div class="relatorioSuperior">
            <div class="destaqueAzul">
            <!--% Html.RenderPartial("../Relatorio/FlippedLearning/DadosAgendamento", Model); %-->
                <div class="rlCabEsquerda">
                    <p>Período do agendamento: <span class="dataAzul"><%=String.Format("{0:dd/MM/yyyy}", Model.Realizacao.Inicio)%> <%=String.Format("{0:HH:mm}h", Model.Realizacao.Inicio)%> até <%=String.Format("{0:dd/MM/yyyy}", Model.Realizacao.Fim)%> <%=String.Format("{0:HH:mm}h", Model.Realizacao.Fim)%></span></p>
                </div>
                <div class="rlCabDireita">
                
                </div>
            </div>
        </div>
        <div class="clear"></div>
        <div id="comboGrupos">
            <span>Turma/grupo: </span>
            <%
           if (Model.Realizadores.Count == 1)
           {
           %>
           <input type="hidden" name="slcGrupoFlipped" id="slcGrupoFlipped" value="<%=Model.Realizadores[0].Id %>" />
           <%
           }
           else
           {
               IList<SelectListItem> listaGrupos = new List<SelectListItem>();
               listaGrupos.Add(new SelectListItem { Selected = true, Text = "Selecione uma turma/grupo", Value = "-1" });
               foreach (AbstractTipoRealizadores grupo in Model.Realizadores)
               {
                   listaGrupos.Add(new SelectListItem { Selected = false, Text = grupo.Nome, Value = grupo.Id.ToString() });
               }
               Response.Write(Html.DropDownList("slcGrupoFlipped", listaGrupos, new { @class = "slc" }));
           }
            
                
            %>

        </div>
        <div class="btnTipos">
        <ul class="btnTipos">
            <li>
                <a id="btnListaAlunos" class="">Lista de alunos</a>
            </li>
            <li>
                <div id="LabelTotalDuvidas">0</div>
                <a id="btnListaDuvidas" class="">Dúvidas e comentários</a>
            </li>
        </ul>
        </div>
        <div class="clear"></div>
        <div class="relatorioConteudo">
        		        
        </div>
    </div>
    <% } %>
    </div>
</body>
</html>
