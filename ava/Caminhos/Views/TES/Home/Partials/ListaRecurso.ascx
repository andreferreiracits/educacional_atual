<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Recurso>" %>

<%
    if (Model.idCategoriaPublicacao == -999)
    {
        %>
        <h5>Selecione o Recurso</h5>
        <%
    }
    else
    {

        if (Model.idCategoriaPublicacao > 0)
        {
            %>
             <div class="busca_recurso">          
                <input type="text" id="strPesquisaRecurso" class="campo ph" value="" placeHolder="PESQUISAR RECURSO">
                <div class="bt_geral"><input type="button" class="okP" value="Buscar" onclick="procurarRecurso(<%=Model.id%>, <%=Model.idCategoriaPublicacao%>)"></div>           
                <%
                    if (Model.idCategoriaPublicacao.Equals(159))
                    {                    
                 %>
                <br />
                <select id="IdPapelEnsino" name="IdPapelEnsino" onchange="mudarDisciplinas(document.getElementById('IdPapelEnsino').options[selectedIndex].value);">
					<option value="0" selected>Todos os níveis</option>
					<option value="1010101">Fundamental 1</option>
					<option value="1010201">Fundamental 2</option>
					<option value="1020001">Ensino Médio</option>
				</select>
                <select id="idDisciplina" name="idDisciplina" disabled="true">
				    <option value="0" selected>Todas as disciplinas</option>
				    
			    </select>
                <%
                    }
                %>
            </div>    
            <%           
        } 
                
                if (Convert.ToBoolean(ViewData["bolAvaPuro"]) && !Convert.ToBoolean(ViewData["bolAvaliacoes"]))
                {  
                 if (Model.idCategoriaPublicacao != 0)
                    {
                        %>
                        <img src="<%=Model.strPathThumb%>" width="55" height="55" alt="<%=Model.strRecurso%>">
                        <span><%=Model.strRecurso%></span>        
                        <p><a href="javascript:void(0);" class="bt_normal" onclick="voltarRecurso(<%=Model.idCategoriaPublicacao%>, <%=Model.id%>);">voltar</a></p>
                        <%
                    }
                }
                else { 
                        %>
                        <img src="<%=Model.strPathThumb%>" width="55" height="55" alt="<%=Model.strRecurso%>">
                        <span><%=Model.strRecurso%></span>        
                        <p><a href="javascript:void(0);" class="bt_normal" onclick="voltarRecurso(<%=Model.idCategoriaPublicacao%>, <%=Model.id%>);">voltar</a></p>
                        <%
                }
               
        
    }
%>

