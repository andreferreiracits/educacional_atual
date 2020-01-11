<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ComentarioRealizadaView.ComentarioRealizadaComCorrecaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<%
    if (Model.ShowBtnCorrecao != ComentarioRealizadaView.TipoShow.hide)
    {
        %>
            <tr>
                <td class="textoComentario" colspan="2">
                    <br />
                    <p class="tituloComentario">* Correção do professor:</p>
                    <%= Model.ContentCorrecao %>
                </td>
            </tr>
        <%
    }
%>