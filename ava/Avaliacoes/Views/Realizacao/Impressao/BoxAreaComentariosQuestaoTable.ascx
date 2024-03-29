﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ComentarioRealizadaView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<% if (Model.ShowBtnDica != ComentarioRealizadaView.TipoShow.hide || !String.IsNullOrWhiteSpace(Model.ContentAluno))
    {%>
    <table>
    <% if (!String.IsNullOrWhiteSpace(Model.Dica.TextoView))
        {%>
    
        <tr>
            <td class="textoComentario" colspan="4">
            <p class="tituloComentario">*Dica para a questão:</p>
            <%=Model.Dica.TextoView%>
            </td>
        </tr>
    <% } %>
    <% if (!String.IsNullOrWhiteSpace(Model.ContentAluno))
        {%>
        <tr>
            <td class="textoComentario" colspan="4">
            <p class="tituloComentario">*Comentários do professor sobre a questão:</p>
            <%=Model.ContentAluno%>
            </td>
        </tr>
    <% } %>
    </table>
<% } %>