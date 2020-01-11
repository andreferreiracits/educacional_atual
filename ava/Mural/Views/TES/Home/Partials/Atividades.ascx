<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Barras.Models.Atividade>>" %>

<% 
if (Model.Count > 0)
{
    %>
    <ul class="clearfix">
        <% 
        foreach (var atividade in Model)
        {
            string strLink = "";
            string dtmInicio = atividade.dtmInicio.Day.ToString().PadLeft(2, '0') + "/" + atividade.dtmInicio.Month.ToString().PadLeft(2, '0') + " " + atividade.dtmInicio.Hour.ToString().PadLeft(2, '0') + ":" + atividade.dtmInicio.Minute.ToString().PadLeft(2, '0');
            string dtmFim = atividade.dtmFim.Day.ToString().PadLeft(2, '0') + "/" + atividade.dtmFim.Month.ToString().PadLeft(2, '0') + " " + atividade.dtmFim.Hour.ToString().PadLeft(2, '0') + ":" + atividade.dtmFim.Minute.ToString().PadLeft(2, '0');
            if (atividade.strTipo.ToLower() == "lip") //caminhos
            {
                strLink = "/lip/lip.asp?idUnidade=" + atividade.idRotaAgendamento;

                //***Atenção if atividade.intOrdemAgendamento > 8 o link deve ser para o LIP 2.0. Ainda não foi definido -- Falar com Furtado/Denis.
                
                %>
                <li>
                    <span>
                        <p class="discreto"><%=dtmInicio%> até <%=dtmFim%></p>
                        
                            <a target="_blank" href="<%=strLink%>"><%=atividade.strTitulo%></a>    
                                          
                    </span>
                    <% 
                    if (atividade.intSituacao > 0)
                    {
                        %>
                        <div class="_fiz"></div>
                        <%
                    }
                    else
                    {
                        %>
                        <div class="_naofiz"></div>
                        <%   
                    }
                    %>                     
                </li>  
                <%
            }else if (atividade.strTipo.ToLower() == "caminho") //caminhos
            {
                strLink = "/ava/caminhos/home/resumo/" + atividade.idRotaAgendamento;
                %>
                <li>
                    <span>
                        <p class="discreto"><%=dtmInicio%> até <%=dtmFim%></p>
                        <% 
                        if (ViewData["strLogin"].ToString().Length > 0)
                        {
                            %>
                            <a href="javascript: void(0);"><%=atividade.strTitulo%></a>
                            <%
                        }
                        else
	                    {
                            %>
                            <a href="<%=strLink%>"><%=atividade.strTitulo%></a>    
                            <%
	                    }
                        %>                        
                    </span>
                    <% 
                    if (atividade.intSituacao == 3)
                    {
                        %>
                        <div class="_fiz"></div>
                        <%
                    }
                    else
                    {
                        %>
                        <div class="_naofiz"></div>
                        <%   
                    }
                    %>                     
                </li>  
                <%
            }
            else //avaliações
            {
                strLink = "/avaliacoesonline/lista_avaliacoes_aluno.asp";
                %>
                <li>
                    <span>
                        <p class="discreto"><%=dtmInicio%> até <%=dtmFim%></p>
                        <% 
                        if (ViewData["strLogin"].ToString().Length > 0)
                        {
                            %>
                            <a href="javascript: void(0);"><%=atividade.strTitulo%></a>
                            <%
                        }
                        else
	                    {
                            %>
                            <a href="<%=strLink%>"><%=atividade.strTitulo%></a>    
                            <%
	                    }
                        %>
                    </span>
                    <% 
                    if (atividade.intSituacao == 3 || atividade.intSituacao == 2)
                    {
                        %>
                        <div class="_fiz"></div>
                        <%
                    }
                    else
                    {
                        %>
                        <div class="_naofiz"></div>
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
            <span>
                <p class="discreto">
                    <% 
                    if (ViewData["strLogin"].ToString().Length > 0)
                    {
                        Response.Write("Seu filho(a) não possui atividades para esta semana.");
                    }
                    else
                    {
                        Response.Write("Você não possui atividades para esta semana.");
                    }
                    %>                    
                </p>
            </span>
        </li>        
    </ul>
    <%
}
%>

