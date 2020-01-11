<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ImpressaoRealizada>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<br />
<table style="width: 100%;">
    <tbody>
        <tr>
            <td style="font-size: 12px; margin-bottom: 10px;"><b>Aluno(a): </b><%=Model.NomeUsuario%></td>
            <td rowspan="4" style="font-size: 14px; border: 1px solid black; width: 100px; text-align:center; vertical-align:middle; font-weight: bold"><%=Model.NotaView %></td>
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
        <tr>
            <td style="font-size: 12px;">&nbsp;</td>
        </tr>
        </tbody>
</table>







