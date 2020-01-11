<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SiteMeio.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<AdminAVA.Models.EscolaAVABarraAvisos>" %>

<asp:Content ID="Content3" ContentPlaceHolderID="PagecSSArea" runat="server">
    <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Common/datePicker/css/datepicker.css<%=Url.TimeStampLink() %>" /> 
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="PageJsArea" runat="server">
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/adminAVA.js<%=Url.TimeStampLink() %>"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderDadosMeio" runat="server">
    <section id="ava_container">
        <p>Admin AVA</p>

        <p>Criar novo aviso</p>

        <form id="frmAvisos" method="post">
            <input type=text name="strMensagem" id="strMensagem" size="45" />
            <br />
            De: <input type="text" class="input_data" size="8" id="dtmInicio" name="dtmInicio" placeholder="  /  /" />
            <input type="text" class="input_hora" size="6" id="horaInicio" name="horaInicio" placeholder="   :" />        
            até: <input type="text" class="input_data" size="8" id="dtmFim" name="dtmFim" placeholder="  /  /" />  
            <input type="text" class="input_hora" size="6" id="horaFim" name="horaFim" placeholder="   :" /> 

            <input type="hidden" id="idBarraAviso" name="idBarraAviso" value="0" />
            <input type="hidden" id="bolExcluido" name="bolExcluido" value="0" />

            <br /><br />
            <input type="submit" />
            <input type="button" value="cancelar" />
        </form>
    </section>


</asp:Content>