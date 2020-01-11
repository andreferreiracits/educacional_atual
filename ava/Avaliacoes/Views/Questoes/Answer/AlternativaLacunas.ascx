<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<input id="lacunas" type="hidden" name="txtLacunas">


<% if (Model.Alternativas.Count > 0) {
    foreach (AlternativaView alternativa in Model.Alternativas) { %>
    <li id="alternativa_<%= alternativa.Id %>" class="Alternativa <%= alternativa.Css %>">
	    <div class="opcaoLetra">(<%= alternativa.Letra %>)</div> 
        <div class="opcaoCampo">
            <input type="hidden" id="hidTemHtml_<%= alternativa.Id %>" name="hidTemHtml" value="<%= (alternativa.Texto.TemHtml) ? "1" : "0" %>" />
    	    <%= Html.TextArea("txtAlternativa", alternativa.Texto.Texto, new { @id = "txtAlternativa" + alternativa.Id, @cols = "74", @rows = "18", @class = "txtareaResposta " + alternativa.Estilo, @maxchar = alternativa.Limite, @maxcharmsg = String.Format(Model.MsgLimiteCharAlternativa, alternativa.Limite) })%>
        </div>
    </li>

<%
    }
}%>