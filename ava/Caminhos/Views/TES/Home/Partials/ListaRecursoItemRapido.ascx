<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.RecursoItem>>" %>

<% 
    string strRecurso = ViewData["strRecurso"].ToString();    
    string strPathRecurso = ViewData["strPathRecurso"].ToString();
    int idRecurso = Convert.ToInt32(ViewData["idRecurso"]);
    int idCategoria = Convert.ToInt32(ViewData["idCategoria"]);
%>


	<THEAD>                  		
        <tr class="table_selected">
            <td width="37%">
                <div class="busca_recurso">
                    <input type="text" class="campo" placeholder="PESQUISAR RECURSO" id="strPesquisaRecurso">
                    <div class="bt_geral"><input type="button" class="okP" value="Buscar" name="btnPesquisaRecursoRapido" onclick="procurarItemRapido(<%=idCategoria%>,<%=idRecurso%>);"></div> 
                    <%
                        if (idCategoria.Equals(159))
                        {                    
                     %>
                    <br />
                    <select id="IdPapelEnsino" name="IdPapelEnsino" onchange="mudarDisciplinas(document.getElementById('IdPapelEnsino').options[selectedIndex].value);">
					    <option value="0" selected>Todos os níveis</option>
					    <option value="1040001">Ed. Infantil</option>
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
                <img width="55" height="55" src="<%=strPathRecurso%>" alt="<%=strRecurso%>">
                <span><%=strRecurso.ToUpper()%></span>
                <p><a style="cursor: pointer;" onclick="voltaListaRecursos();" class="bt_normal">voltar</a></p>
            </td>
        </tr>
    </THEAD>

    <TBODY class="tablebody">
        <tr class="table_aberta">
            <td id="recursoitem_ava" class="tablefix">
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody class="tablebody">
                        <tr>
                            <td id="container_recursoItem">
                                <div>
                                    <%
                                        if (Model.Count > 0)
                                        {
                                            string strBarra = "";
                                            int tamanhoIMG = 55;
                                            if (Model[0].idCategoria == 16 || Model[0].idCategoria == 26)
                                            {
                                                tamanhoIMG = 100;
                                                strBarra = "/";                               
                                            }
                           
                                            foreach (var recursoItem in Model)
                                            {
                                                %>
                                                <div class="ava_box_masonry r-l-desc" id="rItem_<%=recursoItem.id %>">
                                                    <a href="javascript: inserirRecursoRapido(<%=recursoItem.idRecurso%>, <%=recursoItem.idPublicacao%>,0)">
                                                        <img src="<%=strBarra%><%=recursoItem.strThumbItem%>" width="<%=tamanhoIMG%>" height="<%=tamanhoIMG%>">
                                    
                                                        <span>
                                                            <h5><%=recursoItem.strTitulo%></h5>
                                                            <%=recursoItem.strDescricao%>
                                                        </span>
                                                    </a>
                                                    <%
                                                        if (recursoItem.idCategoria.Equals(159))
                                                        {
                                                    %>
                                                    <a href="<%=recursoItem.strLink %>" target="_blank" class="bt_normal ava_visualizar">Visualizar</a>
                                                    <%
                                                        }
                                                    %>
                                                </div>  
                                                <%
                                            }
                            
                                        }else{
                                            Response.Write("Nenhum recurso encontrado.");
                                        }
                                        %>       
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>                
            </td>
        </tr>
    </TBODY>


