<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.Relatorios.RelatorioAgendamento>" %>

<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<table border="1">
<thead>
    <tr>
        <th colspan="6"><%=Html.Encode("Avaliação:")%> <%=Html.Encode(Model.TitleProva) %></th>
    </tr>
    <tr>
        <th colspan="6"><%=Html.Encode("Agendamento:")%> <%=Html.Encode(Model.Title)%></th>
    </tr>
    <tr>
        <th colspan="6"><%=Html.Encode("Período:")%> <%=Html.Encode(Model.Realizacao) %></th>
    </tr>
</thead>

<tbody>

    <tr>
        <th>Linha</th><th>Codigo</th><th>Aluno</th><th>Grupo</th><th>Turma</th><th>Nota</th>
    </tr>
    <% foreach(NotaAluno nota in Model.Dados){ %>
    <tr>
        <td><%=nota.Linha %></td><td><%=Html.Encode(nota.Codigo)%></td><td><%=Html.Encode(nota.Aluno) %></td><td><%=Html.Encode(nota.Grupo) %></td><td><%=Html.Encode(nota.Turma) %></td><td><%=Html.Encode(nota.Nota)%></td>
    </tr>
    <% } %>
</tbody>
</table>


