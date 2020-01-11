<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<AdminAVA.Models.EscolaAVARelatoriosGeral>"%>

<%
    var tipo = ViewData["tipo"];
    int idUnidade = Convert.ToInt32(ViewData["unidade"]);
    var strClassDia = "";
    var strClassSemana = "";
    var strClassMes = "";
    var strClassPeriodo = "";
    var strDataInicio = "";
    var strDataFim = "";
    var strIntervaloData = "";

    if (tipo.Equals("dia"))
    {
        strClassDia = "bt_selected";
        strIntervaloData = ViewData["dtmDia"].ToString();    
    }
    else if (tipo.Equals("semana"))
    {        
        strClassSemana = "bt_selected";

        strIntervaloData = ViewData["dtmSemanaInicio"].ToString() + " a " + ViewData["dtmSemanaFim"].ToString();     
    }
    else if (tipo.Equals("mes"))
    {
        strClassMes = "bt_selected";
        switch (Model.intMes)
        {
            case 1:
                strIntervaloData = "Janeiro";
                break;
            case 2:
                strIntervaloData = "Fevereiro";
                break;
            case 3:
                strIntervaloData = "Março";
                break;
            case 4:
                strIntervaloData = "Abril";
                break;
            case 5:
                strIntervaloData = "Maio";
                break;
            case 6:
                strIntervaloData = "Junho";
                break;
            case 7:
                strIntervaloData = "Julho";
                break;
            case 8:
                strIntervaloData = "Agosto";
                break;
            case 9:
                strIntervaloData = "Setembro";
                break;
            case 10:
                strIntervaloData = "Outubro";
                break;
            case 11:
                strIntervaloData = "Novembro";
                break;
            case 12:
                strIntervaloData = "Dezembro";
                break;
            default:
                break;
        }
        
    }   
    else if (tipo.Equals("periodo"))
    {        
        strClassPeriodo = "bt_selected";
        strDataInicio = ViewData["dtmSemanaInicio"].ToString();
        strDataFim = ViewData["dtmSemanaFim"].ToString();
        strIntervaloData = strDataInicio + " a " + strDataFim;
    }
    else
    {
        strClassDia = "bt_selected";
        strIntervaloData = ViewData["dtmDia"].ToString();   
    }
    
    bool bolCPPuro = (bool)Session["bolCPPuro"];

 %>
     
<div class="le_filtros">
	<div id="filtro_aval">
		<div class="topo_filtro">
			<h3>Filtro - <%=strIntervaloData%></h3>
			<a href="javascript:void(0);" class="btAbreFechaFiltro">Fechar<span class="aberto"></span></a>
		</div>
		<div class="boxFiltro">
            <div class="itens">
				<h4>Exibir Itens:</h4>	
                <% 
                if (tipo.Equals("dia"))
                {
                    %>
                    <input type="radio" name="rbTipo" id="dia" checked value="dia">
                    <%
                }
                else
                {
                    %>
                    <input type="radio" name="rbTipo" id="dia" value="dia">
                    <%    
                }    
                %>		
				<label for="dia">
					<strong>Hoje</strong>
				</label>

                <% 
                if (tipo.Equals("mes"))
                {
                    %>
                    <input type="radio" name="rbTipo" id="mes" checked value="mes">
                    <%
                }
                else
                {
                    %>
                    <input type="radio" name="rbTipo" id="mes" value="mes">
                    <%    
                }    
                %>
				<label for="mes">	
					<strong>Mês</strong>
				</label>
				<br>

                <% 
                if (tipo.Equals("semana"))
                {
                    %>
                    <input type="radio" name="rbTipo" id="semana" checked value="semana">
                    <%
                }
                else
                {
                    %>
                    <input type="radio" name="rbTipo" id="semana" value="semana">
                    <%    
                }    
                %>				
				<label for="semana">
					<strong>Semana</strong>
				</label>

                <% 
                if (tipo.Equals("periodo"))
                {
                    %>
                    <input type="radio" name="rbTipo" id="periodo" checked value="periodo">
                    <%
                }
                else
                {
                    %>
                    <input type="radio" name="rbTipo" id="periodo" value="periodo">
                    <%    
                }
                string disabled = "";
                if (strDataInicio.Equals(""))
                {
                    disabled = "disabled=disabled";
                }
                %>
				<label for="periodo">	
					<strong>Período</strong> de
				</label>
                <input <%=disabled%> type="text" class="periodo" value="<%=strDataInicio%>" id="periodoInicioPainel" name="periodoInicioPainel"/>até
				<input <%=disabled%> type="text" class="periodo" value="<%=strDataFim%>" id="periodoFimPainel" name="periodoFimPainel" />							
			</div>
            
            <%
            if (Model.lUnidade.Count > 0)
            {
                %>
                <div class="itens">
				    <h4>Unidades:</h4>
                    <select id="cbUnidadeEstatistica">
                        <option value="0">Todas</option>                        
                        <%
                        foreach (var unidade in Model.lUnidade)
                        {
                            if (unidade.id == idUnidade)
                            {
                                %>
                                <option selected value="<%=unidade.id%>"><%=unidade.strUnidade%></option>
                                <%
                            }
                            else
                            {
                                %>
                                <option value="<%=unidade.id%>"><%=unidade.strUnidade%></option>
                                <%  
                            }                           
                        }
                        %>
                    </select>
			    </div>  
                <%  
            }    
            %>
			
			<div class="itens_botoes">
				<a class="btn_laranja salvar" href="javascript: void(0);" onclick="filtrarRelatorio()">Filtrar</a>
			</div>
            <input type="hidden" id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy") %>" />
		</div>	
	</div>
</div>

<ul class="adm_painel_box">
    <li><i class="ui-img-nots ui-img-mural"></i> Conversas<span><%=Model.totalConversas %></span>
        <ul>
            <li><i class="ui-img-nots ui-img-mural"></i> Criadas por professores<span><%=Model.totalConversasProfessor %></span>
                <ul>
                    <li><i class="ui-img-nots ui-img-curti"></i> Gostaram <span><%=Model.totalConversasProfessorGostaram %></span></li>
                </ul>
            </li>
            <li><i class="ui-img-nots ui-img-mural"></i> Criadas por alunos<span><%=Model.totalConversasAlunos %></span>
                <ul>
                    <li><i class="ui-img-nots ui-img-curti"></i> Gostaram <span><%=Model.totalConversasAlunosGostaram %></span></li>
                </ul>
            </li>
        </ul>
                                        
    </li>                             
</ul>
   
<ul class="adm_painel_box avaML15">
    <li><i class="ui-img-nots ui-img-comenta"></i> Comentários<span><%=Model.totalComentarios %></span>
        <ul>
            <li><i class="ui-img-nots ui-img-comenta"></i> Criados por professores<span><%=Model.totalComentariosProfessor %></span>
                <ul>
                    <li><i class="ui-img-nots ui-img-curti"></i> Gostaram <span><%=Model.totalComentariosProfessorGostaram %></span></li>
                </ul>
                                                
            </li>
                                                
            <li><i class="ui-img-nots ui-img-comenta"></i> Criados por alunos<span><%=Model.totalComentariosAlunos %></span>
                <ul>
                    <li><i class="ui-img-nots ui-img-curti"></i> Gostaram <span><%=Model.totalComentariosAlunosGostaram %></span></li>
                </ul>                        
            </li>                      
        </ul>                         
    </li>                             
</ul>   
<%
    if (!bolCPPuro)
    {
%>
<ul class="adm_painel_box ">
    <li><i class="ui-img-nots ui-img-tarefa"></i> Tarefas criadas<span><%=Model.totalTarefasCriadas%></span>
        <ul>
            <li><i class="ui-img-nots ui-img-tarefa"></i> Agendamentos criados<span><%=Model.totalTarefasAgendadas%></span></li>
        </ul>
    </li>                            
</ul>   
<ul class="adm_painel_box avaML15">
    <li> <i class="ui-img-nots ui-img-caminho"></i> Caminhos criados<span><%=Model.totalCaminhosCriados%></span>
        <ul>
            <li><i class="ui-img-nots ui-img-caminho"></i> Agendamentos criados<span><%=Model.totalCaminhosAgendados%></span></li>
        </ul>
    </li>                             
</ul>   
<ul class="adm_painel_box ">
    <li><i class="ui-img-nots ui-img-recomendei"></i> Conteúdos recomendados<span><%=Model.totalConteudosRecomendados%></span>
        <ul>
            <li><i class="ui-img-nots ui-img-recomendei"></i> por professores<span><%=Model.totalConteudosRecomendadosProfessor%></span></li>
            <li><i class="ui-img-nots ui-img-recomendei"></i> por alunos<span><%=Model.totalConteudosRecomendadosAlunos%></span></li>
        </ul>                      	
    </li>
</ul>
<%
    }    
%>
                                   
<ul class="adm_painel_box avaML15">
    <li> <i class="ui-img-nots ui-img-xquote"></i> Conversas excluídas<span><%=Model.totalConversasExcluidas%></span></li>
    <li><i class="ui-img-nots ui-img-xcomenta"></i> Comentários excluídos<span><%=Model.totalComentariosExcluidos%></span></li>
    <li><i class="ui-img-nots ui-img-denuncia"></i> Denúncias<span><%=Model.totalDenuncias %></span></li>
    <li> <i class="ui-img-nots ui-img-xmural"></i> Suspensões<span><%=Model.totalSuspensoes %></span></li>                               
                                     
</ul>

                                
                                
		

 