<%@ Page Title="" Language="C#" MasterPageFile="~/Views/TES/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Agenda" ContentPlaceHolderID="ContentPlaceHolderAgenda" runat="server">
    <%Html.RenderPartial("Partials/AgendaJq");  %>
</asp:Content>
