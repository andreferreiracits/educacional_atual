<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%
    IList<AlternativaView> alternativas = Model.Alternativas.Where(a => a.Correta).ToList();
    int valor = 0;
    string retorno = "";
    for (int i = 0; i < alternativas.Count ; i++)
    {
        int tmpVal = (alternativas[i].Letra - 'A');

        valor += (int)(Math.Pow(2, tmpVal));
        retorno += (int)(Math.Pow(2, tmpVal)) + "";
        
        if (i != alternativas.Count-1){
            retorno += " + ";
        } else  {
            retorno += " = ";
        }
    }
        
%>
<br />
<span class="gabaritoLetra">Soma correta: <%= retorno + valor%></span>