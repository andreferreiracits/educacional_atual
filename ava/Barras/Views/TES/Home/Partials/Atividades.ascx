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
    <ul class="clearfix">    
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
	   	                <a target="_blank" href="javascript: void(0);" onclick="ViewRealizacaoProva(<%=atividade.intOrdemAgendamento%>);return false;"><%=atividade.strTitulo%></a>
                    </div>

                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <div class="infoRealizacao">
                            <span class="itemFeito FontAwesome tooltip_title" title="Concluída"></span>
                        </div>
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
	   	                <a target="_blank" href="<%=strLink%>"><%=atividade.strTitulo%></a>
                    </div>
                    
                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <div class="infoRealizacao">
                            <span class="itemFeito FontAwesome tooltip_title" title="Concluída"></span>
                        </div>
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
                    <div class="infoTipo">
						<span class="icoCaminho tooltip_title" title="Caminho de Aprendizagem"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%></p>
	   	                <% 
                        if (ViewData["strLogin"].ToString().Length > 0)
                        {
                            %>
                            <a href="/ava/caminhos/home/caminhosAluno"><%=atividade.strTitulo%></a>                                
                            <%
                        }
                        else
	                    {
                            %>
                            <a href="<%=strLink%>"><%=atividade.strTitulo%></a>    
                            <%
	                    }
                        %>
                    </div>

                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <div class="infoRealizacao">
                            <span class="itemFeito FontAwesome tooltip_title" title="Concluída"></span>
                        </div>
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
                    <div class="infoTipo">
						<span class="icoTarefa tooltip_title" title="Tarefa"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%></p>
	   	                <% 
                        if (ViewData["strLogin"].ToString().Length > 0)
                        {
                            %>
                            <a href="/ava/caminhos/home/caminhosAluno"><%=atividade.strTitulo%></a>    
                            <%
                        }
                        else
	                    {
                            %>
                            <a href="<%=strLink%>"><%=atividade.strTitulo%></a>    
                            <%
	                    }
                        %>
                    </div>

                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <div class="infoRealizacao">
                            <span class="itemFeito FontAwesome tooltip_title" title="Concluída"></span>
                        </div>
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
                    <div class="infoTipo">
						<span class="icoTarefa tooltip_title" title="Tarefa"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%></p>
	   	                <a href="<%=strLink%>"><%=atividade.strTitulo%></a>
                    </div>
                </li>  
                <%
            }
            else //avaliações
            {
                %>
                <li>
                    <div class="infoTipo">
						<span class="icoAvaliacao tooltip_title" title="Avaliação"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%></p>
	   	                <% 
                        if (ViewData["strLogin"].ToString().Length > 0)
                        {
                            %>
                            <span class="tituloTipo"><%=atividade.strTitulo%></span>
                            <%
                        }
                        else
	                    {   
                            %>
                            <a href="javascript: void(0)" onclick="ViewRealizacaoProva(<%=atividade.intOrdemAgendamento%>);return false;"><%=atividade.strTitulo%></a>    
                            <%
	                    }
                        %>
                    </div>

                    <%
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <div class="infoRealizacao">
                            <span class="itemFeito FontAwesome tooltip_title" title="Concluída"></span>
                        </div>
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
    <ul class="clearfix">
        <li>
            <p>Até agora, não há nenhuma atividade para os próximos sete dias.</p>
        </li>        
    </ul>
    <%
}
%>