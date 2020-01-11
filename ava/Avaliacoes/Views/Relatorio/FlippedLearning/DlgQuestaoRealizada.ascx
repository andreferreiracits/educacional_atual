<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoRealizadaView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>

<div id="dlgRelatorioFlipped" title="<%=ViewData["NomeAluno"] %> | Questão <%=(int)ViewData["OrdemQuestao"] + 1%> | Tentativas do aluno: <%=Model.Tentativas %>" class="popup SEC02511">
        <div id="infoQuestao" class="dialogoConteudo">
    	    <div>
                <div class="areaEnunciado mceView">
                    <%= Model.Enunciado.Texto.TextoView %>	    
                </div>
            </div>

            <div class="resposta">
            <% 
                Html.RenderPartial(Model.ViewTipoRealizadaFlipped, Model.TipoRealizada);
            %>
            
            </div>
            
            <div class="areaDuvidas">
                <h1>Dúvidas e comentários do aluno:</h1>
                <div id="boxListaDuvidas">
                    <% 
                        if (Model.Duvidas.Count > 0)
                        {
                            foreach (DuvidaQuestaoRealizada duvida in Model.Duvidas)
                            {%>

                    <div class="textoDuvidaQuestao">
                        <%=Html.Encode(duvida.Duvida)%>
                    </div>

                    <%}
                        }
                        else
                        {
                            %> Nenhuma dúvida. <%
                        } %>
                </div>
            </div>

        </div>
</div>
