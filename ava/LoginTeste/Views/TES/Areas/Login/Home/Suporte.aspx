<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SimpleContent.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
<script language="JavaScript">
    alert("<%= ViewData["msg"] %>");
    window.navigate("https://secureup.educacional.com.br/Universitario/Suporte/");
</script>
</asp:Content>