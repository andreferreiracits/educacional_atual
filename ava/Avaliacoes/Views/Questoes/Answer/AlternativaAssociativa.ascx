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
	        <li id="alternativa_<%= alternativa.Id %>" class="Alternativa AreaAssociativa">
		        <div class="ui-SeguraDivAsso"><div id="<%= alternativa.Id %>" class="opcaoLetra ui-AlternativaAsso"><%= alternativa.Letra %></div></div>
		        <div class="opcaoCampo">
			        <input type="hidden" id="hidTemHtml_<%= alternativa.Id %>" name="hidTemHtml" value="<%= (alternativa.Texto.TemHtml) ? "1" : "0" %>" />
			        <%= Html.TextArea("txtAlternativa", alternativa.Texto.Texto, new { @id = "txtAlternativa" + alternativa.Id, @cols = "20", @rows = "18", @class = "txtareaResposta " + alternativa.Estilo, @maxchar = alternativa.Limite, @maxcharmsg = String.Format(Model.MsgLimiteCharAlternativa, alternativa.Limite) })%>
			        <ul class="opcoesAdicionais">                
			            <li class="editorTxt"><a title="Permite apenas texto puro sem formatação. A formatação atual será perdida.">Editor texto</a></li>
			            <li class="editorHtml"><a title="Permite a formatação do texto (negrito. itálico, etc.) e a inclusão de recursos como imagens, simuladores e fórmulas matemáticas.">Editor HTML</a></li>
			
			            <li class="localBtnRemoverE">
				            <a class="btnRemover  <%=Model.PermissaoAlterarEstruturaHide %>">
					            <span class="icoRemover"></span> remover alternativa
				            </a>
			            </li>
			        </ul>
		        </div>
		        <div class="clear"></div>
	        </li>
            <%
	    }
    }
%>