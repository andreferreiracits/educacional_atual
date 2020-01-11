<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.PU.CursoCdt>>" %>
<%@ Import Namespace="ProvaColegiada.Models.PU" %>

<tbody id="listaCdts">
<%
    if (Model.Count > 0)
    {
        foreach (CursoCdt c in Model)
        {   %>
        <tr>
            <td>
                <ul class="listaCursoCdt">
                    <li><%= c.Nome %></li>
                    <ul class="listaDisciplinaCdt">
<%                  foreach (DisciplinaCdt d in c.Disciplinas)
                    { %>
                        <li><%= d.Nome%></li>
                        <ul class="listaTurmaCdt">
<%                      foreach (TurmaCdt t in d.Turmas)
                        { %>
                            <li><%= t.Nome%></li>
<%                      } %>
                        </ul>
<%                  } %>
                    </ul>
                </ul>
            </td>
        </tr>
<%      }
    }
    else
    { %>
        <tr>
            <td class="vazio">Nenhum CDT selecionado até o momento</td>
        </tr>
<%  } %>
</tbody>