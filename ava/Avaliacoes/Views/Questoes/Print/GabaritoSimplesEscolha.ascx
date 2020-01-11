<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


<%
    foreach (AlternativaView alternativa in Model.Alternativas)
    {
        if (alternativa.Correta)
        {
            %>
            <br /><span class="gabaritoLetra">Alternativa correta: <%=alternativa.Letra %></span>
            <%
        }
    }
        
%>
