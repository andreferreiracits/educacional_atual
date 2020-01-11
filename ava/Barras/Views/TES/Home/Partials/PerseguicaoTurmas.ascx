<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Barras.Business.Models.EscolaCST>" %>


<div id="listaTurmas">
    <div class="lightbox_carteirinhas" id="fancy_turma">    
	    <div class="ava_lightheader">
		    <h2 class="komika">Turmas</h2>
	    </div>

        <% 
            int intIdPapel = Convert.ToInt32(Session["idPapel"]);   
        %>


        <div class="ava_lightcontent ava_lightcontainer">

<% if(intIdPapel != 2000001 && intIdPapel != 1000001  )
{
%>

		    <div class="filtro turma">
			    <div class="filtrado">
				    <strong>Filtrado por: </strong>
				    <br /><br />
			    </div>
                <%if (Convert.ToInt32(ViewData["totalTurmasCoord"]) > 0)
                  { %>
                <div class="filtroMinhasTodas">
                    <select id="minhasOuTodas">
                        <option value="1">Minhas turmas</option>
                        <option value="2" selected>Todas as turmas</option>
                    </select>                              
                </div>
                <%} %>
                <div id="filtrosEscolaCoord">
			    <form>                                  
                    <%
                        if (!Model.bolRede && !Model.bolUnidade)
                        {
                            %>
                            <input type="hidden" id="idEscola" value="<%=Model.escola.id %>" />
                            <%
                        }
                        
                        if (Model.bolRede)
                        {
                            %>                           
                            <select id="escolaRede">
                                <option value="0">Escola (Todas)</option>
                                <%
                                    if (Model.listaEscolas != null && Model.listaEscolas.Count > 0)
                                    {
                                        for (int i = 0; i < Model.listaEscolas.Count; i++)
                                        {
                                            
                                            %>
                                            <option value="<%=Model.listaEscolas[i].id %>"><%=Model.listaEscolas[i].strNome%></option>
                                            <%
                                        }
                                    }
                                %>						        
					        </select>
                            <%
                        }
                        if (Model.bolUnidade)
                        {
                            %>
                            <select id="unidades" <%=Model.bolRede ? "disabled=\"disabled\"" : "" %>>
                                <option value="0">Unidades (Todas)</option>
                                <%
                                    if (Model.listaUnidades != null && Model.listaUnidades.Count > 0)
                                    {
                                        for (int i = 0; i < Model.listaUnidades.Count; i++)
                                        {   
                                            %>
                                            <option value="<%=Model.listaUnidades[i].id%>"><%=Model.listaUnidades[i].strUnidade%></option>
                                            <%
                                        }
                                    }
                                %>
				            </select>
                            <%
                        }
                    %>
					
					<select id="nivelEnsino" disabled="disabled">
						<option value="-1">Ensino (Todos)</option>
						
					</select>
					<select id="intAnoSerie" disabled="disabled">
						<option value="0">Série (Todas)</option>
						
					</select>
                    
					<select id="turmas" disabled="disabled">
						<option value="0">Turma (Todas)</option>
						
					</select>    
                    
                    </div>
				    <label>
					    <input type="text" placeholder="Pesquisar por Turmas" id="txtFiltroAvaTurma"/>
					    <span class="icone_pesquisa FontAwesome"></span>
				    </label>
			    </form>	
		    </div>
	        <div class="scroll_cart_turmas">               
                
                <div class="cont_carteirinhas" id="ava_contentlista">
                    <img id="ava_loader" src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />                
                    <script id="myContentTemplate" type="text/x-jquery-tmpl">
                        {{each Result}}                                      
                                    
                                    <a href="${UrlGrupo}" > 
                                        <div class="carteirinha turma" id="cart_${id}" title="${strNome}">
                                            <div class="in_cT">
                                                <img src="${strFoto}" />      
                                                <span>${strNome}</span>
                                            </div>
                                        </div>     
                                    </a>                                                   
                               
                        {{/each}}
                    </script>
                </div>
            </div>

<%
}
%>


<%  else{ %>

    <div class="filtro turma">
		<div class="filtrado">
			<strong>Turmas dos meus filhos </strong>
			<br /><br />
		</div>
                
            
	</div>

    <div class="scroll_cart_turmas">               
                
                <div class="cont_carteirinhas" id="ava_contentlista">
                    <img id="ava_loader" src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />                
                    <script id="myContentTemplate" type="text/x-jquery-tmpl">
                        {{each Result}}                                      
                                    
                                    <a href="${UrlGrupo}" > 
                                        <div class="carteirinha turma" id="cart_${id}" title="${strNome}">
                                            <div class="in_cT">
                                                <img src="${strFoto}" />      
                                                <span>${strNome}</span>
                                            </div>
                                        </div>     
                                    </a>                                                   
                               
                        {{/each}}
                    </script>
                </div>
            </div>
	       

<% } %>		
       
        </div>


       
       <!--  <div class="right">
        <div class="container">
        <a class="btn_cinza left" href="javascript: $.fancybox.close();">Cancelar</a>	
        </div>
        </div> -->
</div>
</div>
