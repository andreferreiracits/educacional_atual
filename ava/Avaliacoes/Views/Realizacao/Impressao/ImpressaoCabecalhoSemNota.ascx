<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ImpressaoRealizada>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<br />
<table style="width: 100%;">
    <tbody>
        <tr>
            <td style="font-size: 12px; margin-bottom: 10px;"><b>Aluno(a): </b><%=Model.NomeUsuario%></td>
        </tr>

        <tr>
            <td style="font-size: 12px;">
            <% if (!String.IsNullOrWhiteSpace(Model.NomeTurma)) { %> 
                <b> Turma: </b><%=Model.NomeTurma%>
            <% } %>
            <% if (!String.IsNullOrWhiteSpace(Model.NomeGrupo)) { %> 
                <b> Grupo: </b><%=Model.NomeGrupo%>
            <% } %>
            </td>
        </tr>

        <tr>
            <td style="font-size: 12px;">&nbsp;</td>
        </tr>
    </tbody>
</table>







