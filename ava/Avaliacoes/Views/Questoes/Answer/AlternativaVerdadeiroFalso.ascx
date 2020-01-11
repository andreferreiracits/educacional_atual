<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>



<%
if (Model.Alternativas.Count > 0)
{
    foreach (AlternativaView alternativa in Model.Alternativas)
    {
       
 %>

    <li id="alternativa_<%= alternativa.Id %>" class="Alternativa">
        <input type="hidden" id="rdoCorreta_<%= alternativa.Id %>" name="rdoCorreta" value="<%= alternativa.idCorreta %>"/>
	    <div class="opcaoLetra">(<%= alternativa.Letra %>)</div> 
        <div class="opcaoCampo">
            <input type="hidden" id="hidTemHtml_<%= alternativa.Id %>" name="hidTemHtml" value="<%= (alternativa.Texto.TemHtml) ? "1" : "0" %>" />
    	    <%= Html.TextArea("txtAlternativa", alternativa.Texto.Texto, new { @id = "txtAlternativa" + alternativa.Id, @cols = "74", @rows = "18", @class = "txtareaResposta " + alternativa.Estilo, @maxchar = alternativa.Limite, @maxcharmsg = String.Format(Model.MsgLimiteCharAlternativa, alternativa.Limite) })%>
            <ul class="opcoesAdicionais">                
        	    <li class="altResposta opcaoLetraVF <%= alternativa.Css %>">        	    
                    <input type="radio" id="rdoCorreta_V_<%= alternativa.Id %>" name="rdoVF_<%= alternativa.Id %>" value="V" <%= alternativa.Checked %>/>
        	        <label for="rdoCorreta_V_<%= alternativa.Id %>">V</label>
        	    </li>
                <li class="altResposta opcaoLetraVF <%= alternativa.CssFalsa %>">
                    <input type="radio" id="rdoCorreta_F_<%= alternativa.Id %>" name="rdoVF_<%= alternativa.Id %>" value="F" <%= alternativa.CheckedFalsa %>/>
        	        <label for="rdoCorreta_F_<%= alternativa.Id %>">F</label>
                </li>
                <li class="editorTxt"><a title="Permite apenas texto puro sem formatação. A formatação atual será perdida.">Editor texto</a></li>
                <li class="editorHtml"><a title="Permite a formatação do texto (negrito. itálico, etc.) e a inclusão de recursos como imagens, simuladores e fórmulas matemáticas.">Editor HTML</a></li>
                <li class="comentAluno"><a>(Inserir|Exibir|Ocultar) Comentário</a></li>
                <li class="comentDica"><a>(Inserir|Exibir|Ocultar) Dica</a></li>
                <li class="comentProf"><a>(Inserir|Exibir|Ocultar) Sugestão para professor</a></li>
                
                <li class="localBtnRemover">
                    <a class="btnRemover  <%=Model.PermissaoAlterarEstruturaHide %>">
                        <span class="icoRemover"></span> remover alternativa
                    </a>
                </li>
            </ul>
        </div>
        <div class="clear"></div>
<%      Html.RenderPartial("Comentario", alternativa.Comentario); %>
    </li>

<%
    }
}
%>