<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Relatorios.TotalDuvidaFlipped>>" %>
<%@ Import namespace="ProvaColegiada.Models.Relatorios" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<input type="hidden" id="TotalDuvidasTurma" value="<%=ViewData["TotalDuvidas"] %>" />
<div class="linhaBotoes"><a id="btnOcultarNome" class="btn direita">Ocultar nomes</a><a id="btnMostrarNome" class="btn direita">Mostrar nomes</a></div>
<table class='QuestoesDuvidas' cellpadding="0" cellspacing="0" border="0">
    <thead>
        <tr>
            <th colspan="3" class="Questao">
                Questão
            </th>
            <th class="Duvidas">
                Dúvidas e comentários
            </th>
        </tr>
    </thead>
    <tbody>
    <% 
        if (Model.Count > 0)
        {

            foreach (TotalDuvidaFlipped valor in Model)
            {
           %>
           <tr class="tooltipextra">
           <td class="btnView"><a class="tooltip" rel="<%= Url.Action("DuvidasQuestao", new { @id = valor.Aplicacao.ToString(), @idSeg = valor.Questao.ToString() })%>"></a></td>
           <td class="Ordem"><%=valor.Ordem%></td>
           <td class="Enunciado"><%= valor.Enunciado.Length > 70 ? Html.Encode(valor.Enunciado.Substring(0, 67) + "...") : Html.Encode(valor.Enunciado)%></td>
           <td><%=valor.Total%></td>
           </tr>
           <%
            }
        }
        else
        {
            %>
            <tr><td colspan="4" align="center">Nenhuma dúvida ou comentário</td></tr>
            <%
        } %>
    </tbody>
</table>
