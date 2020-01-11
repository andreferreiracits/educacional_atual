<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<table border="1">
    <thead>
        <tr>
            <%foreach (System.Data.DataColumn col in Model.Columns) { %>
                <%if(col.Caption == "a1"){%>
                    <th colspan="3">Classificação</th>
                <%} else {%>
                    <%if((col.Caption == "a2") || (col.Caption == "a3")){%>

                    <%} else {%>
                        <th><%=col.Caption %></th>
                    <%}%>
                <%}%>
            <%} %>
        </tr>
    </thead>
    <tbody>
    <% foreach(System.Data.DataRow row in Model.Rows) { %>
        <tr>
            <% foreach (var cell in row.ItemArray) {%>
                <td><%=cell.ToString() %></td>
            <%} %>
        </tr>
    <%} %>         
    </tbody>
</table>
