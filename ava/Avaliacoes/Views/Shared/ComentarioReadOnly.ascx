<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ComentarioView>" %>

<% if (Model.Professor.Texto.Length > 0)
   { %>
<div class="comentProf areaBoxComentProf areaResumo">
    <div class="boxSugestaoProfessor boxMaior">
        <label class="ComentProf">Sugestão para professores (Opcional. Mostrada para outros professores em questões compartilhadas.)</label>
        <%= Model.Professor.TemHtml ? Model.Professor.Texto : "<p>" + Model.Professor.TextoView + "</p>"%>
    </div>
</div>
<% } %>

<% if (Model.Aluno.Texto.Length > 0)
   { %>
<div class="comentAluno areaBoxComentAluno areaResumoAluno" >
    <div class="boxSugestaoAluno boxMaior">
        <label class="ComentAluno">Comentário (Opcional. Mostrado para o aluno após o encerramento da prova.)</label>
        <%= Model.Aluno.TemHtml ? Model.Aluno.Texto : "<p>" + Model.Aluno.TextoView + "</p>"%>
    </div>
</div>
<% } %>

<% if (Model.Dica.Texto.Length > 0)
   { %>
<div class="comentDica areaBoxComentDica areaResumoDica">
    <div class="boxSugestaoDica boxMaior">
        <label class="ComentDica">Dica (Opcional. Mostrada para o aluno durante a prova.)</label>
        <%= Model.Dica.TemHtml ? Model.Dica.Texto : "<p>" + Model.Dica.TextoView + "</p>"%>
    </div>
</div>
<% } %>