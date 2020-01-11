<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.Models.Exam.ProvaRealizada>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>

<div id="dlgRelatorioFlippedProva" title="<%= Html.Encode(Model.Aluno.Nome) %> | <%= Model.Aplicacao.Nome %>" class="popup SEC02511">
        <div class="conteudoPop">
        <p><b>Período em que o aluno realizou o agendamento:</b></p>
        <p><b>Início: </b> <%=String.Format("{0:dd/MM/yyyy}", Model.DataInicio) %> - <%=String.Format("{0:HH:mm}h", Model.DataInicio) %></p>
        <p><b>Fim: </b><%=String.Format("{0:dd/MM/yyyy}", Model.DataFim) %> - <%=String.Format("{0:HH:mm}h", Model.DataFim) %></p>
        </div>
</div>
