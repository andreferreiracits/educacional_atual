<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>

<div id="dlgVisualizarQuestoes" title="Listagem das Questões" class="popup SEC02511">
    <!--CarregarVisualizarQuestoesProva-->
    <%  using (Html.BeginForm("VisualizarQuestoesProva", "Criacao", FormMethod.Post, new { @id = "frmTabelaQuestoes", @class = "tbl" }))
        
        { %>
            <%= Html.Hidden("txtIdProvaQuestoes", Model.Id)%>
            <%= Html.Hidden("slcQuestoesPagina", 20)%>
            <div class="popupConteudo">
                <table id="tblQuestoes" class="tabela scroll scrollVisualizarQuestao" cellpadding="0" cellspacing="0" border="0">
                    <thead>
                        <tr>
                            <td colspan="2" style="width:305px; padding-left:10px;">Questões</td>
                            <td style="width:250px;">Identificador</td>
                            <td style="width:100px;">Tipo</td>
                        </tr>
                    </thead>
                   <tbody>
                   <tr class="vazio"><td colspan="5"><br /><br /></td></tr>
                   </tbody>
                </table>
                <div class="ferramentas">
                    <div class="resultado"></div>
	                <div class="paginacao"></div>
                </div>
            </div>
        <% } %>
        <div class="popupBotoes">
            <div class="btnEspacamento">
                <a id="btnFecharVisualizar" class="btnNav">Fechar</a>
            </div>
        </div>
    </div>