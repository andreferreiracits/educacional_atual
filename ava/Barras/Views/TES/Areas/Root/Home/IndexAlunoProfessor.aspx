<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SimpleContent.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>
<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
    <h1>Ta na pagina</h1>
   <% Html.RenderAction("BarraSS", "Home", new { area = "Root" });%>

</asp:Content>














































