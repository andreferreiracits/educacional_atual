<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<% 
var strTextoBotao = "";
var strClassBotao = "";
    
bool ehPOL = false;
int idEscola = Convert.ToInt32(ViewData["idEscola"]);
  
if (idEscola == 3760001){
    ehPOL = true;   
}

bool bolAdmRede = Convert.ToBoolean(ViewData["bolAdmRedeSocial"]);

if (bolAdmRede)
{
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
            <td colspan="4">                                
                <span id="bt_novocaminho">
                    <a href="javascript: void(0);" class="ne-salvar large awesome awesome-green" id="btSalvarCaminho" onclick="criarTarefa();">Criar tarefa</a>
                </span>
                <br /><br />
                
                <div id="filtro_aval" class="clearfix">
                    <div class="topo_filtro">
        				<h3>Filtro</h3>
        				<a href="javascript: void(0);" id="escorregaFiltro"><%=strTextoBotao %><span class="<%=strClassBotao %>"></span></a>
        			</div>
                    <div id="conteudo_filtro">
                        <input id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy")%>" type="hidden" />
                        <input id="idEscola" value="<%=idEscola%>" type="hidden" />

                    <div class="f_aval">                                       
                        <input placeholder="Palavra-chave" type="text" value="" id="strPesquisa" size="30" />                               
                                
                        <p class="data_criacao">                            
                            <input type="text" size="8" id="dataInicio" readonly="true" value="" class="ph" placeHolder="     /     /"/>

                            até <input type="text" size="8" id="dataFim" readonly="true" value="" class="ph" placeHolder="     /     /"/>                            
                        </p>
                    </div>

                    <div class="f_aval lista">  
                        <strong>Tipo:</strong>
						<div> 
							<input type="checkbox" checked="checked" value="1" id="meus_cam" name="tipopesquisa"/>
							<label for="meus_cam"> Minhas</label>
						</div>
                        <div>
                        <% if (!ehPOL)
                            {%>
							<input type="checkbox" checked="checked" value="2" id="escola_cam" name="tipopesquisa"/>
							<label for="escola_cam"> Escola</label>
                            <% } %>
						</div>
                           
						<!--<div>
							<input type="checkbox" checked="checked" value="3" id="portal_cam" name="tipopesquisa">
							<label for="portal_cam"> Portal</label>  
						</div>	-->
                             
					</div>  
                                                
                    <div class="f_aval lista">  
                        <strong>Status:</strong>
						<div> 
							<input type="checkbox" checked="checked" value="1" id="comp_escola" name="statuspesquisa"/>
							<label for="comp_escola"> Compartilhado</label>
						</div>
                        <div>
							<input type="checkbox" checked="checked" value="2" id="privado" name="statuspesquisa"/>
							<label for="privado"> Privado</label>
						</div>
                        <%if (ehPOL)
                        {
                            %>
                            <div>
								<input type="checkbox" value="3" id="comp_portal" name="statuspesquisa"/>
								<label for="comp_portal"> Compartilhado para POL</label>
							</div>
                            <div>
								<input type="checkbox" value="4" id="revisao" name="statuspesquisa"/>
								<label for="revisao"> Em Revisão</label>
							</div>
                                <%     
                        }    
                        %>
					</div>  

                       

                    <%if (bolAdmRede)
                        { %>
                    <div class="f_aval">  
                        <strong>Visualizar como:</strong><br/>
						<select id="sVerComo" disabled="disabled">
							<option value="1">Do professor</option>							
							<option value="3" selected>Meus</option>
						</select>
								
						<div id="divSelecaoUsuarios" style="display:none;"></div>
					</div> 
                     <%} %>       
                    <div class="f_aval_bts">
                        <input type="hidden"id="bolAdmin" value="<%=bolAdmRede %>" />
                        <input type="hidden" id="bolAvaPuro" value="<%=ViewData["bolAVAPuro"] %>" />
                        <a class="btn_cor color" onclick="filtrarTarefa();" href="javascript: void(0);">Filtrar</a>  
                        <a class="btn_cinza" onclick="limparfiltroTarefa();" href="javascript: void(0);">Limpar</a>                       
                    </div>
                    </div>
                </div>  
                
                <div class="le_filtros">
                    <span>Filtrado por: </span>                  
                </div>

                <!--
                <div class="le_filtros">
                    <span>Filtrando por:</span>
                    <div class="lajotinhas">
                        <ul class="lajotinha_filtro">
                            <li id="1"><span class="lajotinha">Minhas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(1,1,1)"></a></span></span></li>
                            <%if (!bolAdmRede && !ehPOL)
                            { %>
                                <li id="2"><span class="lajotinha">Escola<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(2,1,2)"></a></span></span></li>
                            <%} %>
                            
                            <%  if (Convert.ToInt32(ViewData["bolAVAPuro"]) == 0)
                            { %>
                            <li id="3"><span class="lajotinha">Portal<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(3,1,3)"></a></span></span></li>
                            <%} %>

                            <%  
                            if (ehPOL && !bolAdmRede)
                            {
                                %>
                                <li id="5"><span class="lajotinha">Compartilhado para POL<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(5,2,6)"></a></span></span></li>
                                <li id="6"><span class="lajotinha">Em revisão<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(6,3,6)"></a></span></span></li>
                                <%
                            }    
                            %>
                            <li id="4"><span class="lajotinha">Compartilhado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(4,1,6)"></a></span></span></li>
                            <li id="7"><span class="lajotinha">Privado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(7,4,6)"></a></span></span></li>
                        </ul>
                        <div id="le_filtros_pesquisaUsuario">
                        </div>
                    </div>
                </div>
                -->
            </td>
        </tr>
        <tr class="tableheader">
            <%if (bolAdmRede)
              { %>
            <th width="13%">Por</th>
            <%} %>
            <th width="63%">Tarefa</td>
            <%if (!bolAdmRede)
              { %>
            <th width="13%" class="center">Autor</th>
            <%} %>            
            <th width="11%" class="center">Status</th>
            <th width="13%" class="center">Data de criação</th>
        </tr>
    </THEAD>                
    <TBODY class="tablebody" id="caminhos_paginando">
        
    </TBODY>
    <TFOOT>
        <tr>
            <td id="mostraPaginas" colspan="4">
                <div id="Pagination" class="pagination">
                </div>
            </td>
        </tr> 
    </TFOOT>    
</table><!--trhover-->