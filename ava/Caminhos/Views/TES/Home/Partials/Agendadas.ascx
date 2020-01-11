<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<%
    var strTextoBotao = "";
    var strClassBotao = "";
    
    bool bolAdmRede = Convert.ToBoolean(ViewData["bolAdmRedeSocial"]);
    var intColSpan = 6;
    
    if (bolAdmRede)
    {
        intColSpan = 7;
        strTextoBotao = "Fechar";
        strClassBotao = "aberto";
    }
    else
    {
        strTextoBotao = "Fechar";
        strClassBotao = "aberto";
    }
%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="trhover">
    <THEAD>                  		
        <tr class="tr_thead">
            <td colspan="<%=intColSpan%>">
                <!---<span id="bt_novocaminho">
                    <a href="javascript: void(0);" class="ne-salvar large awesome awesome-green" id="btSalvarCaminho" onclick="criar();">Criar caminho</a>
                </span>--->
                              

                <div id="filtro_aval" class="clearfix">
                    <div class="topo_filtro">
						<h3>Filtro</h3>
						<a href="javascript: void(0);" id="escorregaFiltro"><%=strTextoBotao %><span class="<%=strClassBotao %>"></span></a>
					</div>
                    <div id="conteudo_filtro">
                        <input id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy")%>" type="hidden" />

                        <div class="f_aval">                                           
                            <input placeholder="Palavra-chave" type="text" value="" id="strPesquisa" size="30" />                               
                                
                            <p class="data_criacao">                                
                                <input type="text" size="8" id="dataInicio" readonly="true" class="ph" value=""  placeholder="       /       /     " />

                                até <input type="text" size="8" id="dataFim" readonly="true" class="ph" value="" placeholder="       /       /     " />                            
                            </p>
                        </div>
                    
                        <div class="f_aval lista">  
                                <strong>Status:</strong>
                                <div> 
                                    <input type="checkbox" checked="" value="1" id="aberto_age" name="cbStatus"/>
                                    <label for="aberto_age"> Aberto</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked="" value="2" id="embreve_age" name="cbStatus"/>
                                    <label for="embreve_age"> Em breve</label>
                                </div>
                                 <div>
                                    <input type="checkbox" checked="" value="3" id="enc_age" name="cbStatus"/>
                                    <label for="enc_age"> Encerrado</label>
                                </div>
                            </div>
                        <%if (bolAdmRede)
                        { %>
                            <div class="f_aval">  
                                <strong>Visualizar como:</strong><br/>
						        <select id="sVerComo">
							        <option value="1">Do professor</option>
							        <option value="2">Do aluno</option>
							        <option value="3" selected>Meus</option>
						        </select>
								
						        <div id="divSelecaoUsuarios" style="display:none;"></div>
					        </div> 
                        <%}%>

                        <div class="f_aval tipos_agendamento">  
                            <strong>Tipos de agendamento:</strong><br>
                            <input type="radio" value="1" name="tpAgendamento" id="rbTpGerais" checked>    
                            <label for="rbTpGerais">Individuais </label> <br>    
                            <input type="radio" value="2" name="tpAgendamento" id="rbTpGrupos">    
                            <label for="rbTpGrupos">Turmas e Grupos</label>                   
                        </div>
                       
                       <div class="f_aval_bts">
                            <input type="hidden"id="bolAdmin" value="<%=bolAdmRede %>" /> 
                            <a class="btn_cor color" onclick="filtrarAgendamento();" href="javascript: void(0);">Filtrar</a>  
                            <a class="btn_cinza" onclick="limparfiltroAgendamento();" href="javascript: void(0);">Limpar</a>                       
                        </div>                       
                    </div>
                </div>
                <div class="le_filtros">
                    <span>Filtrado por: </span>                           
                        <span id="1" class="lajotinha">Aberto<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(1,1,1)"></a></span></span>
                        <span id="2" class="lajotinha">Em breve<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(2,1,2)"></a></span></span>
                        <span id="3" class="lajotinha">Encerrado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(3,1,3)"></a></span></span>
                        <div id="le_filtros_pesquisaUsuario"></div>
                                   
                </div>
                <!--
                <div class="le_filtros">
                    <span>Filtrando por:</span>
                    <div class="lajotinhas">
                        <ul class="lajotinha_filtro">
                            <li id="1"><span class="lajotinha">Aberto<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(1,1,1)"></a></span></span></li>
                            <li id="2"><span class="lajotinha">Em breve<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(2,1,2)"></a></span></span></li>
                            <li id="3"><span class="lajotinha">Encerrado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(3,1,3)"></a></span></span></li>
                        </ul>
                    </div>
                    <div id="le_filtros_pesquisaUsuario">
                </div>      
                -->          
            </td>
        </tr>
        <tr class="tableheader tbHeaderEducadores">
            <%if (bolAdmRede)
              { %>
            <th width="20%" class="center mgle20">Por</th>
            <th width="20%" class="center mgle20">Atividades</th>
            <%}
              else
              { %>
              <th width="35%" class="mgle20">Atividades</th>
            <%} %>
            <th width="15%" class="center">Progresso</th>
            <th width="15%" class="center">Para</th>
            <th width="10%" class="center">Status</th>
            <th width="15%" class="center">Período</th>            
        </tr>
        <%if (bolAdmRede)
              { %>
        <tr class="tableheader tbHeaderAlunos" style="display:none">           
            <th width="15%">Para</th>
            <th width="40%">Tarefas e Caminhos de Aprendizagem</th>            
            <th width="15%" class="center">Professor</th>            
            <th width="15%" class="center">Período</th>
            <th width="15%" class="center">Status</th>
        </tr>
         <%}%>
    </THEAD>

    <TBODY class="tablebody" id="agendadas_paginando">
        
    </TBODY>

    <TFOOT>
        <tr>
            <td id="mostraPaginas" colspan="<%=intColSpan%>">
                <div id="Pagination" class="pagination">
                </div>
            </td>
        </tr> 
    </TFOOT>
</table><!--trhover-->