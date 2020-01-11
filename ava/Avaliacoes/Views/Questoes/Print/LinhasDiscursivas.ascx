<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<table class="<%=Model.EstiloLinhas %>" cellpadding="0" cellspacing="0" border="0">
    <%
        for (int i = 0; i < Model.TotalLinhas; i++)
        {
            %>
                <tr class="alternativaDiscursivaTR">
                    <%
                        for (int j = 0; j < Model.TotalColunas; j++)
                        {
                            %>
                                <td class="alternativaDiscursivaTD <%= Model.EstiloLinhas %>TD"> </td>
                            <%
                        }
                    %>
                </tr>
            <%
        }
    %>
</table>
<br />