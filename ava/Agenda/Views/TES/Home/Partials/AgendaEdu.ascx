<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%

    bool flagGrupo = (bool)ViewData["flagGrupo"];
    bool bolProjetos = Convert.ToBoolean(ViewData["bolProjetos"]);
    bool bolPaginaEscola = ViewData["bolPaginaEscola"] == null ? false : (bool)ViewData["bolPaginaEscola"];
    bool bolComunicadorPagina = ViewData["bolComunicadorPagina"] == null ? false : (bool)ViewData["bolComunicadorPagina"];
    bool bolTutorProjetos = ViewData["bolTutorProjetos"] == null ? false : (bool)ViewData["bolTutorProjetos"];
    bool bolAVAMural = ViewData["bolAVAMural"] == null ? false : (bool)ViewData["bolAVAMural"];

%>
<script>
    jQuery(function ($) {
    
    $('#inP').tooltip();
    $('#inE').tooltip();
    $('#inV').tooltip();
    
});


</script>
    



    <% 
    if (bolProjetos || bolPaginaEscola)
    {
        %>
        <div class="container" style="width: 415px;">
        <%        
    }
    else
    {
        %>
        <div class="container">
        <%
    }   
    %>

    <ul class="sct_abas" id="id_agenda_filhos" style="display:none">
		<li class="ativo" style="display:none">
			<!-- <a href="javascript:void(0)">Filhos</a> -->
			<ul class="" id="ul_filho" >
               
            </ul>
		</li>
	</ul>

<!-- <ul class="sct_abas" id="id_agenda_filhos" style="display:none">
		<li class="ativo" style="display:none">
			<a href="javascript:void(0)">Filhos</a>
			<ul class="" id="ul_filho" >
                <div class="filho_selecionado" title="Aluno 02 - QA (PE/PP)">
                    <img src="/AVA/StaticContent/Common/img/geral/avatar.jpg">Aluno 02 - QA (PE/PP)
                </div>
                <li class="ativo" data-ix="0" title="Aluno 02 - QA (PE/PP)">
                    <img src="/AVA/StaticContent/Common/img/geral/avatar.jpg">Aluno 02 - QA (PE/PP)
                </li>
                <li data-ix="1" title="Aluno 19 - QA (PE/PP)">
                    <img src="/AVA/StaticContent/Common/img/geral/avatar.jpg">Aluno 19 - QA (PE/PP)
                </li>
            </ul>
		</li>
	</ul> -->

		<div class="main demo">
			
			<!-- <div id="calendar1" class="calendar1">
			</div> -->
            
          
