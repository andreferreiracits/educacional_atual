<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<int>" %>
<% 
    int qtdItensPagina = ViewData["qtdItensPagina"] == null ? 10 : (int)ViewData["qtdItensPagina"];
    if(Model > 10) {
%>
<tfoot>
    <tr>
        <td id="mostraPaginas" colspan="3" width="670">
            <% if(Model > qtdItensPagina) { %>
            <div id="Pagination" class="pagination"></div>
            <% } %>
        </td>
        <td class="itens_pagina" width="206">
            <p><%=Model %><%= Model > 1 ? " itens" : " item" %></p>
            <input type="hidden" id="intTotalItensPaginaGruposDeTurma" value="<%=Model %>" />
            <div class="bootstrap" id="comboQtdPaginacaoGrupo">
				<div class="btn-group">                     
			        <button href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtQtdPaginacaoGrupo"> 
                        <%=qtdItensPagina%> itens por página&nbsp;<span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" id="cbQtdPaginacaoGrupo">
                        <li qtdP="10">
                            <input type="radio" name="ckQtdPaginacaoGrupo" id="ckQtdPaginacaoGrupo10" <%=qtdItensPagina == 10 ? "checked=\"checked\"" : "" %> />
			                <label for="ckQtdPaginacaoGrupo10">10 itens por página&nbsp;</label>
			            </li>
                        <% if(Model > 10) { %>    	
                            <li qtdP="20">
                                <input type="radio" name="ckQtdPaginacaoGrupo" id="ckQtdPaginacaoGrupo20" <%=qtdItensPagina == 20 ? "checked=\"checked\"" : "" %> />
			                    <label for="ckQtdPaginacaoGrupo20">20 itens por página&nbsp;</label>
			                </li>                        
                        <% } %>	
                        <% if(Model > 20) { %>    	
                            <li qtdP="30">
                                <input type="radio" name="ckQtdPaginacaoGrupo" id="ckQtdPaginacaoGrupo30" <%=qtdItensPagina == 30 ? "checked=\"checked\"" : "" %> />
			                    <label for="ckQtdPaginacaoGrupo30">30 itens por página&nbsp;</label>
			                </li>                        
                        <% } %>	 
                        <% if(Model > 30) { %>    	
                            <li qtdP="40">
                                <input type="radio" name="ckQtdPaginacaoGrupo" id="ckQtdPaginacaoGrupo40" <%=qtdItensPagina == 40 ? "checked=\"checked\"" : "" %> />
			                    <label for="ckQtdPaginacaoGrupo40">40 itens por página&nbsp;</label>
			                </li>                        
                        <% } %>	  
                        <% if(Model > 40) { %>    	
                            <li qtdP="50">
                                <input type="radio" name="ckQtdPaginacaoGrupo" id="ckQtdPaginacaoGrupo50" <%=qtdItensPagina == 50 ? "checked=\"checked\"" : "" %> />
			                    <label for="ckQtdPaginacaoGrupo50">50 itens por página&nbsp;</label>
			                </li>                        
                        <% } %>	                                                    
			        </ul>
			    </div>  
			</div>
        </td>
    </tr> 
</tfoot>
<% } %>

