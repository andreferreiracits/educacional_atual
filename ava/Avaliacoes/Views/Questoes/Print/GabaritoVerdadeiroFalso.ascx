<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%
    IList<string> retorno = new List<string>();
    foreach (AlternativaView alternativa in Model.Alternativas)
    {
        if (alternativa.Correta) {
            retorno.Add("V");
        } else {
            retorno.Add("F");
        }
    }
        
%>
<br />
<span class="gabaritoLetra">Gabarito: <%=String.Join(" - ",retorno.ToArray())%></span>
