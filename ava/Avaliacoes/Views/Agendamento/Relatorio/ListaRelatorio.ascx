<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.TabelaQuestaoAgendamento<ProvaColegiada.TabelaViews.NotaAluno>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>


<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    
    <tbody>
<% if (Model != null &&  Model.Linhas.Count > 0) {
        foreach (NotaAluno linha in Model.Linhas) { %>
        <tr>
            <td><%=linha.Linha %></td>
			<td style="width:170px;"><%=linha.Codigo %></td>

			<td style="width:270px;">
                <%=linha.Aluno %>
                
                <div class="botoes">
                    <% Html.RenderPartial(linha.BotaoVer, linha); %>
                    <% Html.RenderPartial(linha.BotaoAuditoria, linha); %>
                </div>


            </td>
            <td style="width:120px"><%=linha.Grupo %></td>
            <td style="width:120px"><%=linha.Turma %></td>
			<td style="width:120px"><%=linha.Nota %></td>
        </tr>
<%
        }
    } else { %>
        <tr class="vazio">
            <td colspan="5">Nenhum aluno encontrado.</td>
        </tr>
<% } %>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="5">
                <div class="rlCabEsquerda">
                    Avaliação:    <span><%=Model.NomeProva %></span>
                    </br>
                    Agendamento:  <span><%=Model.Nome %>     </span>
                    </br>
                    Período: <span><%=Model.RealizacaoInicio %> até <%=Model.RealizacaoFim %></span>
                </div>
                <div class="rlCabDireita">
                <%
                  IList<SelectListItem> listaGrupos = new List<SelectListItem>();
                  listaGrupos.Add(new SelectListItem { Selected = true, Text = "Selecionar grupos(s)", Value = "-1" });
                  foreach (string grupo in Model.Linhas.Where(l => !String.IsNullOrWhiteSpace(l.Grupo)).Select(l => l.Grupo).Distinct())
                  {
                      listaGrupos.Add(new SelectListItem { Selected = false, Text = grupo, Value = grupo });
                  }
                  listaGrupos.Add(new SelectListItem { Selected = false, Text = "Usuário sem grupo", Value = "" });
                  %>

                    <%= Html.DropDownList("slcGrupoRelatorio", listaGrupos, new { @class = "slc" })%>
                </div>
            </td>
        </tr>
    </tfoot>
</table>