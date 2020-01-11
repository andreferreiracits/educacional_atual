<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%
    IList<AlternativaView> alternativas = ((ProvaColegiada.TabelaViews.Answer.AssociativaView)Model.TipoRespostaView.TipoView).AlternativasDireita(Model.Questao, Model.AlternativaAdicionada);

    if (alternativas.Count > 0)
    {
        foreach (AlternativaView alternativa in alternativas)
	    {
            string letraAsso = "";
            if ((int) alternativa.LetraAssociado != 0)
            {
                letraAsso = Convert.ToString(alternativa.LetraAssociado).Trim();
            }
            %>
	            <li id="alternativaDireita_<%= alternativa.Id %>" class="Alternativa AreaAssociativa <%= alternativa.Css %>">
		            <div class="opcaoLetra hide"><%= alternativa.Letra %></div> 
                    <div class="ui-SeguraDivAsso">
                        <div class="boxRecebeAssociado">
                            <input type="hidden" name="idAssociado" value="<%= alternativa.idAssociado %>" />
                            <input type="text" name="ltAssociado" value="<%=letraAsso%>" maxlength="1" />
                        </div>
                    </div>
		            <div class="opcaoCampo">            
			            <input type="hidden" id="hidTemHtml_<%= alternativa.Id %>" name="hidTemHtmlD" value="<%= (alternativa.Texto.TemHtml) ? "1" : "0" %>" />
			            <%= Html.TextArea("txtAlternativaD", alternativa.Texto.Texto, new { @id = "txtAlternativa" + alternativa.Id, @cols = "20", @rows = "18", @class = "txtareaResposta " + alternativa.Estilo, @maxchar = alternativa.Limite, @maxcharmsg = String.Format(Model.MsgLimiteCharAlternativa, alternativa.Limite) })%>
			            <ul class="opcoesAdicionais">                
				            <li class="editorTxt"><a title="Permite apenas texto puro sem formatação. A formatação atual será perdida.">Editor texto</a></li>
				            <li class="editorHtml"><a title="Permite a formatação do texto (negrito. itálico, etc.) e a inclusão de recursos como imagens, simuladores e fórmulas matemáticas.">Editor HTML</a></li>
				            <li class="localBtnRemoverD">
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