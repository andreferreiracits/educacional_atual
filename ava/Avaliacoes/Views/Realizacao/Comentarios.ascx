<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.QuestaoView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>
<%
    int posQuestao = 1;
    foreach (QuestaoView questao in Model)
    {
        if (questao.Enunciado.Comentario.Aluno != null && !String.IsNullOrWhiteSpace(questao.Enunciado.Comentario.Aluno.Texto)) {
            %>
            <p>Questão <%=posQuestao %></p>
            <%=questao.Enunciado.Comentario.Aluno.TextoView%>
            <%
            
            char letra = 'A';

            foreach (AlternativaView alternativa in questao.Alternativas)
            {
                if (alternativa.Comentario.Aluno != null && !String.IsNullOrWhiteSpace(alternativa.Comentario.Aluno.Texto))
                {
                    %>
                    <p><%=letra%></p>
                    <%=alternativa.Comentario.Aluno.TextoView%>
                    <%
                }
                letra++;
            }
            
        }
        posQuestao++;
    }
%>

