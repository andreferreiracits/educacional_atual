<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Site.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>

<asp:Content ContentPlaceHolderID="TitleArea" ID="TitleArea" runat="server">
    <%= this.Resource("page_title")%>
</asp:Content>

<asp:Content ContentPlaceHolderID="PageCssArea" ID="PageCssArea" runat="server">

</asp:Content>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">
  <script type="text/javascript">
      document.domain = "educacional.net";

      /***********************************************
      * IFrame SSI script II- © Dynamic Drive DHTML code library (http://www.dynamicdrive.com)
      * Visit DynamicDrive.com for hundreds of original DHTML scripts
      * This notice must stay intact for legal use
      ***********************************************/
      function applyEventListener(frameid) {
          var currentfr = document.getElementById(frameid);
          if (currentfr.addEventListener)
              currentfr.addEventListener("load", readjustIframe, false);
          else if (currentfr.attachEvent) {
              currentfr.detachEvent("onload", readjustIframe); // Bug fix line
              currentfr.attachEvent("onload", readjustIframe);
          }
      }

      function readjustIframe(loadevt) {
          var crossevt = window.event ? event : loadevt;
          var iframeroot = crossevt.currentTarget ? crossevt.currentTarget : crossevt.srcElement;
          if (iframeroot)
              resizeIframe(iframeroot.id);
      }

      function resizeIframe(frameid) {
          var currentfr = document.getElementById(frameid);
          if (currentfr && !window.opera) {
              currentfr.style.display = "block";
              if (currentfr.Document && currentfr.Document.body.scrollHeight) //ie5+ syntax
              {
                  currentfr.height = currentfr.Document.body.scrollHeight + 10;
                  // currentfr.width = currentfr.Document.body.scrollWidth;
                  currentfr.width = 830;
              } else if (currentfr.contentDocument && currentfr.contentDocument.body.offsetHeight) //ns6 syntax
              {
                  currentfr.width = 830;
                  currentfr.height = currentfr.contentDocument.body.offsetHeight + 10;
                  currentfr.width = currentfr.contentDocument.body.offsetWidth - 20;
              }
          }
      }
  </script>

    <script type="text/javascript">
        function redirectTo(url) {
            $("#mainContent").attr("src", "http://universitario.educacional.net" + url);
        }

        $(function () {
            applyEventListener('mainContent');
        });
    </script>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContextArea" ID="ContextArea" runat="server">
<!--
    <div id="contexto" class="resolucao clearfix">
   	    <div id="holder">
            <div class="iconGG debate ic1_template"></div>
            <h1><%=this.Resource("app_name")%></h1>
            <p><strong><a href="#"><%=this.Resource("meus_debates")%></a> / <%=this.Resource("debate_ativos")%></strong></p>
        </div>
    </div>
-->
    <script type="text/javascript">
    $(function () {
        $(".bg_contexto").hide();
    });
    </script>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
    <div id="content" class="resolucao clearfix">
        <div class="clearfix">
            <div class="box_aviso">
                <div class="iconPP meuespacoPP ic1_template"></div>
                <p><strong><%=this.Resource("alerta_respostas_plural", "#", 2)%></strong></p>
            </div>
        </div>
        <center>
        <iframe id="mainContent" width="830" frameborder="0" framespacing="0" hspace="0" marginheight="0" marginwidth="0">
        Infelizmente este navegador não suporta IFRAMEs.
        </iframe>
        </center>
    </div>
</asp:Content>

<asp:Content ContentPlaceHolderID="SubFooterArea" ID="SubFooterArea" runat="server">
    SubFooterArea
</asp:Content>

<asp:Content ContentPlaceHolderID="FooterArea" ID="FooterArea" runat="server">  
    FooterArea
</asp:Content>