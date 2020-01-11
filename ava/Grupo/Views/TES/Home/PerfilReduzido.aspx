<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Grupos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">   
    <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/grupos_3.2.0.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/seletor_3.2.0.css" />
    <%
        int idEdicao = Convert.ToInt32(ViewData["idEdicao"]);
        if (idEdicao > 0)
        {    
            %>
            <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/grupos_clube.css" />
            <%
        } 
    %>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/grupos_4.2.11.js"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/timelinegrupo(1)_3.1.13.js"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/jquery.AvaSelector_3.4.7.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
    
    <input type="hidden" id="strIdLinkPermanente" value="<%=ViewData["strLinkPermanente"]%>" />

    <div class="perfil_restrito">
        
        <h3>
            Ops!<br> Você não participa deste grupo. <a href="/AVA/Mural">Voltar para o início</a>.
        </h3>    
                
    </div>

</asp:Content>
