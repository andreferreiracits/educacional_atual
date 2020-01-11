<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<% 
    IList<AlternativaView> alternativas = ((ProvaColegiada.TabelaViews.Answer.AssociativaView)Model.TipoRespostaView.TipoView).AlternativasDireita(Model.Questao);

    IList<string> retorno = new List<string>();
    
    if (alternativas.Count > 0) {
        foreach (AlternativaView alternativa in alternativas) {
            retorno.Add(alternativa.LetraAssociado.ToString());
        }
    }
%>
<br />
<span class="gabaritoLetra">Preenchimendo da coluna da direita: <%=String.Join(", ",retorno.ToArray())%></span>