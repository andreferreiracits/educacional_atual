<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<%
    IList<AlternativaView> alternativas = Model.Alternativas.Where(a => a.Correta).ToList();

    string retorno = "";
    for (int i = 0; i < alternativas.Count; i++)
    {
        retorno += alternativas[i].Letra;
        if (i == alternativas.Count - 2)
        {
            retorno += " e ";
        }
        else if (i < alternativas.Count - 2)
        {
            retorno += ", ";
        }
    }
    
%>
<br />
<span class="gabaritoLetra">Alternativa(s) correta(s):  <%=retorno%></span>