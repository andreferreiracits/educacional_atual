<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/BarraEsquerda.Master" debug="true" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<List<Grupo.Models.Grupos>>" %>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
    
    <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/grupos_3.2.0.css<%=Url.TimeStampLink() %>" />
    <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/seletor_3.2.0.css<%=Url.TimeStampLink() %>" />
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/grupos_4.2.11.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/jquery.AvaSelector_3.4.7.js<%=Url.TimeStampLink() %>"></script>

    <%
    int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
    int qtdRegistroPorPagina = Convert.ToInt32(ViewData["qtdRegistroPorPagina"]);
    bool podeCriarGrupo = Convert.ToBoolean(ViewData["podeCriarGrupo"]);
    %>	

    <div id="wrapper">
<header id="headerGrupo">
        <div class="topo_titulo">
			<h1 class="blokletters left"> Grupos</h1>
            <% 
            if (podeCriarGrupo)
            {
                %>
                <a href="/AVA/Grupo/Home/CriarGrupo/" id="btCriarGrupo" class="btn_cinza right fancybox.ajax">Criar Grupos</a>
                <%   
            }    
            %>
			<div class="linha clearfix"></div>
		</div>

    </div>

    <div class="filtroGrupo">
		<strong>Filtrado por:</strong>
		<form action="javascript: void(null);">
			<div class="bootstrap">
			    <div class="btn-group">
			        <a href="javascript: void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle" id="txtTipoGrupoFiltro"> 
                        <span class="FontAwesome"></span>Todos os grupos <span class="caret"></span>
                    </a>
			        <ul class="dropdown-menu" id="cbTipoGrupo">
			            <li><label for="cbTipoGrupoFiltro_0">Todos os grupos</label></li>
			            <li class="divider"></li>
			            <li><input type="checkbox" id="cbTipoGrupoFiltro_1" name="cbTipoGrupoFiltro" value="1"><label for="cbTipoGrupoFiltro_1">Meus Grupos</label></li>
			            <li><input type="checkbox" id="cbTipoGrupoFiltro_2" name="cbTipoGrupoFiltro" value="2"><label for="cbTipoGrupoFiltro_2">Grupos do Portal</label></li>
			            <li><input type="checkbox" id="cbTipoGrupoFiltro_3" name="cbTipoGrupoFiltro" value="3"><label for="cbTipoGrupoFiltro_3">Grupos da Escola</label></li>
			        </ul>
			    </div> 
			</div>
            <span class="nomePesquisaGrupo">
				<input type="text" id="txtGrupo" placeholder="Filtrar por nome de grupo"/>
			</span>
			<a href="javascript: void(0);" class="btn_cinza" onclick="filtrarListaGrupo();">Filtrar</a>
		</form>
	</div>
</header> 

    <div class="itensGrupo" id="boxCarregaGrupos">
        <%Html.RenderPartial("Partials/ListarGruposDisponiveis", Model, new ViewDataDictionary { { "idUsuarioLogado", idUsuarioLogado }, { "qtdRegistroPorPagina", qtdRegistroPorPagina } });%>
    </div>    
</asp:Content>
