<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.ItemRealizacao>>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tbody>
<%  if (Model.Count > 0)
    {
        foreach (ItemRealizacao item in Model)
        {
            if (item.Capa == false)
            {
            %>
            <tr class="bg linhaQuestao">
                <td width="10%"><%= item.Nome%></td>
                <td width="30%">
                    <span class=""> <%=item.Correcao %></span>
                </td>
            </tr>
<%          }
        }
    } %>
    </tbody>
</table>