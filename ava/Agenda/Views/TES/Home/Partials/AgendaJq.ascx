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
			
			<div id="calendar1" class="calendar1">
			</div>
            
            <% 
            if (!bolProjetos && !bolPaginaEscola)
            {
                %>
                <form>
				    <ul class="filtro_agenda_eventos filtro_agenda_home">
					    <strong>Filtrar por &#9660;</strong>
					    <li>	
						    <input type="checkbox" id="filtroPortal" class="meusChecks" value="3" checked>
						    <label for="filtroPortal">Educacional</label>
					    </li>
					    <li>	
						    <input type="checkbox" id="filtroEscola" class="meusChecks" value="2" checked>
						    <label for="filtroEscola">Escola</label>
					    </li>
					    <li>	
						    <input type="checkbox" id="filtroTurma" class="meusChecks" value="4" checked>
						    <label for="filtroTurma">Turma</label>
					    </li>
					    <li>	
						    <input type="checkbox" id="filtroPessoal" class="meusChecks" value="1" checked>
						    <label for="filtroPessoal">Pessoal</label>
					    </li>
                        <%
                            if (flagGrupo)
                            {
                            %>
                            <li>	
						        <input type="checkbox" id="filtroGrupo" class="meusChecks" value="5" checked>
						        <label for="filtroGrupo">Grupos</label>
					        </li>
                            <%
                            } 
                        %>
				    </ul>
			    </form>			    
                <%       
            }
            
            if ((!bolProjetos && !bolPaginaEscola) || (bolPaginaEscola && bolComunicadorPagina) || (bolProjetos && bolTutorProjetos))
            {
                string classe = bolAVAMural ? "opcao_criar" : "btn_cinza";
                %>
                <a id="criar_EventoAgenda" class="<%=classe%> criar_fora">Criar</a>
                <%
            }   
            %>


        

         

            <!-- <ul class="">
                <div class="filho_selecionado" title="Aluno 02 - QA (PE/PP)">
                    <img src="/AVA/StaticContent/Common/img/geral/avatar.jpg">Aluno 02 - QA (PE/PP)
                </div>
                <li class="ativo" data-ix="0" title="Aluno 02 - QA (PE/PP)">
                    <img src="/AVA/StaticContent/Common/img/geral/avatar.jpg">Aluno 02 - QA (PE/PP)
                </li>
            <!-- </ul> -->
            
            <div id="dadosAuxAgenda" class="dadosAuxAgenda"></div>
            
		</div>		
	</div>


