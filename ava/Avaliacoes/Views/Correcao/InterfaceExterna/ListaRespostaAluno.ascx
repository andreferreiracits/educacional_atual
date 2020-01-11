<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<ProvaColegiada.TabelaViews.RespostaAluno>>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div>
<%
    Paginacao paginacao = (Paginacao)ViewData["paginacao"];
    int i = 0;
    if (Model != null &&  Model.Count > 0){
        foreach (RespostaAluno resposta in Model){
%>
                <div id="r<%= i++ %>" class="boxRespostaAluno <%= resposta.CssCorrigida %>">
                    <%= Html.Hidden("hidIdQuestao", resposta.IdQuestao) %>
                    <div class="infoQuestaoAluno">
	                    <div class="tituloQuestaoAluno">Questão</div>
                        <a class="btn direita btnOcultarEnunciado" id="btnOcultarEnunciado<%=i%>"><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
                    </div>
                    <div class="boxQuestao">
						<div class="textoQuestao mceView boxEnunciadoReduzido" id="boxEnunciadoReduzido<%=i%>"><%= resposta.EnunciadoReduzido%></div>
                        <div class="textoQuestao mceView boxEnunciado" id="boxEnunciado<%=i%>"><%= resposta.Enunciado%></div>
					</div>
                    <% if (!String.IsNullOrWhiteSpace(resposta.SugestaoProfessor)){%>
					<div class="areaBoxComentProf">
						<div class="boxSugestaoProfessor">
							<label class="ComentProf">Resposta modelo</label>
							<%= resposta.SugestaoProfessor%>
						</div>
					</div>
                    <%}%>
                    <% Html.RenderPartial("InterfaceExterna/BoxAreaRespostaExt", resposta); %>
                </div>
<%      }
    } else {
%>
        <div class="vazio">
                <div class="boxRespostaAlunoVazio">Nenhuma questão encontrada.</div>
        </div>
<%  }   
%>
    <table id="infoDados" data-naocorrigidas="<%=ViewData["naocorrigidas"] %>" data-corrigidas="<%=ViewData["corrigidas"] %>" data-todas="<%=ViewData["total"] %>">
        <% Html.RenderPartial("Paginacao", paginacao); %>
    </table>
</div>