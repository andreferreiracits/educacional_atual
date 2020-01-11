<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


<br /><span class="gabaritoLetra">Respostas corretas:</span>
<%
    IList<string> retorno = new List<string>();
    foreach (AlternativaView alternativa in Model.Alternativas)
    {
        retorno = alternativa.Texto.Texto.Split('|').ToList<string>();

        if (retorno[0] == "input") {
            retorno.RemoveAt(0);
            %><br /><span class="gabaritoLetra"><%=String.Join(" - ", retorno.ToArray())%></span><%    
        } else if (retorno[0] == "combo"){
            %><br /><span class="gabaritoLetra"><%=retorno[1]%></span><%    
        }
        
    }
        
%>

