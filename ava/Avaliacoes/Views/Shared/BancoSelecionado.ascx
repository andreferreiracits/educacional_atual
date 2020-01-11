<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<% using (Html.BeginForm("TrocarBanco", "Home", FormMethod.Post, new { @id = "frmBancoQuestao" }))
   { %>
    <p id="cxaBancoQuestao">
        <label for="idBanco" class="txtSubDestaque">Você está gerenciando o banco:</label>
        <%= Html.Hidden("strAction", ViewContext.Controller.ValueProvider.GetValue("action").RawValue.ToString()) %>
        <%= Html.Hidden("strController", ViewContext.Controller.ValueProvider.GetValue("controller").RawValue.ToString()) %>
<%
            IList<SelectListItem> bancos = (IList<SelectListItem>) ViewData["Bancos"];
            if (bancos.Count > 1)
            {
%>
                <%= Html.DropDownList("idBanco", bancos, new { @class = "slc banco" }) %>
<%
            }
            else
            {
%>
                <%= Html.Hidden("idBanco", bancos[0].Value) %>
                <%= Html.TextBox("txtBancoQuestao", bancos[0].Text, new { @class = "txt readonly banco", @readonly = "readonly" })%>
<%
            }
%>
    </p>
<%  } %>