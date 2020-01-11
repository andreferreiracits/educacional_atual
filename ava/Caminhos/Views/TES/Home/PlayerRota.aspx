<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Caminhos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Caminhos.Models.CaminhoUsuario>" %>



<asp:content id="Content2" ContentPlaceHolderID="PageJsArea" runat="server">   
    <script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/playerRota_2.0.6.js") %><%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/ajaxfileupload(1).js<%=Url.TimeStampLink() %>"></script>

    <script type="text/javascript" src="/AVA/Avaliacoes/Scripts/class/Mensagem3.0.0.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/Avaliacoes/Scripts/class/Carregando3.0.0.js<%=Url.TimeStampLink() %>"></script>
	<script type="text/javascript" src="/AVA/Avaliacoes/Scripts/util/jquery.textareaCounter.plugin.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/Avaliacoes/Scripts/class/Realizacao2.0.0.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/Avaliacoes/Scripts/view/avaliacoes.realizacao-2.0.1.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript">
        var verificaCaminhoEstaEncerrado;
        var idUsuarioAvaliacao = <%=Model.idUsuario %>;
        
        <%
        if (Model.dtmInicio <= DateTime.Now && Model.dtmFimAgendamento > DateTime.Now){
            %>
            verificaCaminhoEstaEncerrado = false;
            <%
        } else {
            %>
            verificaCaminhoEstaEncerrado = true;
            <%
        }
         %>
        
    </script>
</asp:content>

<asp:content id="Content3" ContentPlaceHolderID="PageCssArea" runat="server">   
    <link href="/AVA/Avaliacoes/Content/css/carregando_aplicador.css<%=Url.TimeStampLink() %>" rel="stylesheet" type="text/css" />
    <link href="/AVA/Avaliacoes/Content/css/realizacao2.0.0.css<%=Url.TimeStampLink() %>" rel="stylesheet" type="text/css" />
	<link href="/AVA/Avaliacoes/Content/css/mceView.css<%=Url.TimeStampLink() %>" rel="stylesheet" type="text/css" />
</asp:content>

<asp:content id="Content1" ContentPlaceHolderID="ContentPlaceHolderPrincipal" runat="server">   
    <section id="ava_container" class="as1">
    <div class="player_atividades">
		<h1 class="blokletters"><%=Model.Caminho.intTipo == 1 ? "Caminho de aprendizagem" : "Tarefa" %></h1> 
		<a href="/ava/caminhos" class="voltar_caminhos_tarefas_player btn_cinza">Voltar para a lista de atividades</a>
	</div>
    <div class="abas_player_atividades ui-tabs ui-widget ui-widget-content ui-corner-all" id="abas_player">
	    <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
		    <li class="ui-state-default ui-corner-top ui-tabs-selected ui-state-active">
			    <a class="orientacoes_player" href="#ui-tabs-1">Orientações</a>
		    </li>
		    <li class="ui-state-default ui-corner-top">
			    <a class="orientacoes_player" href="#ui-tabs-2">Visualizar Avaliações</a>
		    </li>
	    </ul>
	    <div class="aba_player_borda_conteudo"></div>
    </div>
    <!--<header id="Hcaminhos">        
        <h1 class="blokletters">Caminhos</h1>
        <p class="blokletters">de aprendizagem</p>                 
    </header>-->
   
    <div id="listaconteudo_caminho">
        <section class="as1 ava_player" id="ava_box_player">     
        <div id="inicioTarefa">
            <!-- <img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /> -->
            <span id="etapa_info_218354" class=" concluido sprite_player bolConcluidoPlaca" tipo="leitura"></span>
            <h2 class="textoInicialTarefa">Clique na tarefa ao lado para iniciar.</h2>
        </div>   
        </section>

        <%Html.RenderPartial("Partials/Placas"); %>      

    </div>
</section>

</asp:content>

