<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<%
if (Model.Alternativas.Count > 0)
{
    AlternativaView alternativa = Model.Alternativas[0];
 %>
    <li id="alternativa_<%= alternativa.Id %>" class="Alternativa <%= alternativa.Css %>">
        <div class="opcaoCampo opcaoCampoDiscursivaManual">
            <input type="hidden" id="hidTemHtml_<%= alternativa.Id %>" name="hidTemHtml" value="<%= (alternativa.Texto.TemHtml || alternativa.Texto.Plano == "" ) ? "1" : "0" %>" />
    	    <%= Html.TextArea("txtAlternativa", (alternativa.Texto.TemHtml) ? alternativa.Texto.Html : alternativa.Texto.Plano, new { @id = "txtAlternativa" + alternativa.Id, @cols = "74", @rows = "18", @class = "txtareaResposta txtareaRespostaDiscursivaManual " + alternativa.Estilo, @maxchar = alternativa.Limite, @maxcharmsg = String.Format(Model.MsgLimiteCharAlternativa, alternativa.Limite) })%>
            <ul class="opcoesAdicionais">                
                <input type="hidden" id="rdoCorreta_<%= alternativa.Id %>" name="rdoCorreta" value="<%= alternativa.Id %>" <%= alternativa.Checked %>/>
                <li class="editorTxt"><a title="Permite apenas texto puro sem formatação. A formatação atual será perdida.">Editor texto</a></li>
                <li class="editorHtml"><a title="Permite a formatação do texto (negrito. itálico, etc.) e a inclusão de recursos como imagens, simuladores e fórmulas matemáticas.">Editor HTML</a></li>
            </ul>
        </div>
        <div class="clear"></div>
    </li>

<%
}
%>