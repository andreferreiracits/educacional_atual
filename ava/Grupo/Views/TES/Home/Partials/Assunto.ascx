<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.Grupos>" %>

<header>
	<h1>Assuntos</h1>
</header>
    
<ul id="boxListaAnyAssuntoGrupo" class="categorias_grupo">
    <%
    Html.RenderPartial("Partials/ListaAssunto", Model.lAssuntos, new ViewDataDictionary { { "qtd", 4 } });
    %>
</ul>

<ul id="boxListaAllAssuntoGrupo" class="categorias_grupo" style="display: none;">
    <%
    Html.RenderPartial("Partials/ListaAssunto", Model.lAssuntos, new ViewDataDictionary { { "qtd", 0 } });
    %>
</ul>

<div id="boxExcluirAssunto" class="criar excluir_categ" style="display: none">
    <div>
	    <h3><span class="ico FontAwesome"></span> Excluir Assunto</h3>
	    <p>Tem certeza que deseja excluir esse assunto?</p>
	    <a href="javascript:void(0);" class="cancelar left" id="btCancelarExclusaoAssunto">cancelar</a>
	    <a href="javascript:void(0);" class="btn_cor excluir right" id="btExcluirAssunto">excluir</a>
		
	    <div class="clearfix"></div>
	    <p class="obs">* Os posts serão vinculados ao assunto "Geral".</p>
    </div>	
</div>

<div id="boxCriarAssunto" class="criar" style="display: none">
    
</div>

<input type="hidden" id="idGrupo" value="<%=Model.id%>" />

<%
    if (Model.lAssuntos.Count > 4)
    {
        %>
        <a href="javascript:void(0)" class="ver_mais" id="btVerMaisAssunto">ver mais</a>    
        <%        
    }    
    //Alteração Renan: Grupos setados com idEstado = 3 (Congelado) não devem permitir a criação de assuntos
    if (!Model.idEstado.Equals(3))
    {
        %>
        <a href="javascript:void(0)" class="btn_cinza right" id="btCriarAssunto">Criar</a>
        <%
    } 
    %>
<div class="clearfix"></div>
