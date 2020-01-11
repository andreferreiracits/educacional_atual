<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Barras.Models.Atividade>>" %>
<script type="text/javascript">
function ViewRealizacaoProva(id) {
    window.open('/AVA/avaliacoes/Realizacao/index/' + id, 'RealizacaoProva', 'width=800, height=600, scrollbars=1');
}
</script>


<%
if (Model.Count > 0)
{   
    %>    
    <ul class="lista">    
    <%
        foreach (var atividade in Model)
        {
            string strLink = "";
            string dtmInicio = atividade.dtmInicio.Day.ToString().PadLeft(2, '0') + "/" + atividade.dtmInicio.Month.ToString().PadLeft(2, '0') + " " + atividade.dtmInicio.Hour.ToString().PadLeft(2, '0') + "h" + atividade.dtmInicio.Minute.ToString().PadLeft(2, '0');
            string dtmFim = atividade.dtmFim.Day.ToString().PadLeft(2, '0') + "/" + atividade.dtmFim.Month.ToString().PadLeft(2, '0') + " " + atividade.dtmFim.Hour.ToString().PadLeft(2, '0') + "h" + atividade.dtmFim.Minute.ToString().PadLeft(2, '0');
            
            if (atividade.strTipo.ToLower() == "lip_medio")
            {               
                %>
                <li>
                    <div class="infoTipo">
                        <span class="icoAvaliacao tooltip_title" title="Avaliação"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%></p>
                        <a target="_blank" href="javascript: void(0);" onclick="ViewRealizacaoProva(<%=atividade.intOrdemAgendamento%>);return false;"><%=atividade.strTitulo%> 
                            <%
                              if (atividade.strTitulo.Length == 100) {
                                  Response.Write("...");
                              }
                            %></a>
                    </div>

                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <span class="atv_completa" title="Concluída"></span>
                        <%
                    }                
                    %>                     
                </li>  
                <%
            }
            else if (atividade.strTipo.ToLower() == "lip_fundamental") //caminhos
            {
                strLink = "/lip/lip.asp?idUnidade=" + atividade.idRotaAgendamento;

                //***Atenção if atividade.intOrdemAgendamento > 8 o link deve ser para o LIP 2.0. Ainda não foi definido -- Falar com Furtado/Denis.                
                %>
                <li>
                    <div class="infoTipo">
                        <span class="icoAvaliacao tooltip_title" title="Avaliação"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%></p>
                        <a target="_blank" href="<%=strLink%>"><%=atividade.strTitulo%> 
                            <%
                              if (atividade.strTitulo.Length == 100) {
                                  Response.Write("...");
                              }
                            %></a>
                    </div>
                    
                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <span class="atv_completa" title="Concluída"></span>
                        <%
                    }                
                    %>                     
                </li>  
                <%
            }
            else if (atividade.strTipo.ToLower() == "caminho") //caminhos
            {
                strLink = "/ava/caminhos/home/player/" + atividade.idRotaAgendamento + "/0";
                %>
                <li>
                    <span class="atv_ico icoCaminho tooltip_title"></span> 
                    <span class="atv_data"><%=dtmInicio%> até <%=dtmFim%></span>                    
                    <% 
                    if (ViewData["strLogin"].ToString().Length > 0)
                    {
                        %>
                        <a href="/ava/caminhos/home/caminhosAluno" class="atv_desc"><%=atividade.strTitulo%> 
                            <%
                              if (atividade.strTitulo.Length == 100) {
                                  Response.Write("...");
                              }
                            %></a>                                
                        <%
                    }
                    else
                    {
                        %>
                        <a href="<%=strLink%>" class="atv_desc"><%=atividade.strTitulo%> 
                            <%
                              if (atividade.strTitulo.Length == 100) {
                                  Response.Write("...");
                              }
                            %></a>    
                        <%
                    }
                    %>                    

                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <span class="atv_completa" title="Concluída"></span>
                        <%
                    }                   
                    %>                     
                </li>  
                <%
            }
            else if (atividade.strTipo.ToLower() == "tarefa") //tarefas
            {
                strLink = "/ava/caminhos/home/player/" + atividade.idRotaAgendamento + "/0";
                %>
                <li>
                    <span class="atv_ico icoTarefa tooltip_title"></span> 
                    <span class="atv_data"><%=dtmInicio%> até <%=dtmFim%></span>                
                    <% 
                    if (ViewData["strLogin"].ToString().Length > 0)
                    {
                        %>
                        <a href="/ava/caminhos/home/caminhosAluno" class="atv_desc"><%=atividade.strTitulo%> 
                            <%
                              if (atividade.strTitulo.Length == 100) {
                                  Response.Write("...");
                              }
                            %></a>    
                        <%
                    }
                    else
                    {
                        %>
                        <a href="<%=strLink%>" class="atv_desc"><%=atividade.strTitulo%> 
                            <%
                              if (atividade.strTitulo.Length == 100) {
                                  Response.Write("...");
                              }
                            %></a>    
                        <%
                    }
                    %>
                    

                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <span class="atv_completa" title="Concluída"></span>
                        <%
                    }                   
                    %>                     
                </li>  
                <%
            }
            else if (atividade.strTipo.ToLower() == "professor") //agendamentos de professor no grupo
            {
                strLink = "/ava/caminhos/home/agendamento/" + atividade.idRotaAgendamento;
                %>
                <li>
                    <span class="atv_ico icoTarefa tooltip_title"></span> 
                    <span class="atv_data"><%=dtmInicio%> até <%=dtmFim%></span>
                    <a href="<%=strLink%>" class="atv_desc"><%=atividade.strTitulo%> 
                            <%
                              if (atividade.strTitulo.Length == 100) {
                                  Response.Write("...");
                              }
                            %></a>    


                </li>  
                <%
            }
            else //avaliações
            {
                %>
                <li>
                    <span class="atv_ico icoAvaliacao tooltip_title"></span> 
                    <span class="atv_data"><%=dtmInicio%> até <%=dtmFim%></span>                    
                    <% 
                    if (ViewData["strLogin"].ToString().Length > 0)
                    {
                        %>                        
                        <a href="javascript: void(0)" class="atv_desc"><%=atividade.strTitulo%> 
                            <%
                              if (atividade.strTitulo.Length == 100) {
                                  Response.Write("...");
                              }
                            %></a> 
                        <%
                    }
                    else
                    {   
                        %>
                        <a href="javascript: void(0)" onclick="ViewRealizacaoProva(<%=atividade.intOrdemAgendamento%>);return false;" class="atv_desc">
                            <%=atividade.strTitulo%> 
                            <%
                              if (atividade.strTitulo.Length == 100) {
                                  Response.Write("...");
                              }
                            %>
                        </a>    
                        <%
                    }
                    %>                    

                    <%
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <span class="atv_completa" title="Concluída"></span>
                        <%
                    }
                    %>              
                </li>
                <%                
            } 
        }
        %>
    </ul>
    <%
}
else
{
    %>
    <ul class="sem_resultado">
        <p>Até agora, não há nenhuma atividade para os próximos sete dias.</p>
    </ul>
    <%
}
%>