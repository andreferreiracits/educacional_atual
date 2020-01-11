<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Site.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>

<asp:Content ID="CommonJsArea" ContentPlaceHolderID="CommonJsArea" runat="server">
</asp:Content>
<asp:Content ID="TopHeaderArea" ContentPlaceHolderID="TopHeaderArea" runat="server">
</asp:Content>
<asp:Content ID="SubFooterArea" ContentPlaceHolderID="SubFooterArea" runat="server">
</asp:Content>



<asp:Content ID="HeaderArea" ContentPlaceHolderID="HeaderArea" runat="server">
    <div id="barra" class="resolucao clearfix">
    	<a href="#" class="logo_link"></a>
        <img src="<%=Url.ThemedCDNLink("/cssimg/img_barra.jpg")%>" width="900" height="117" />
    
    </div>
</asp:Content>




<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">

<script type="text/javascript">
    /*
    Status 
    1	= Continuar a navagação
    2	= Sair
    3	= Atualizar o Browser
    */

    function Continuar(IdLogBrowser, intStatus) {
        if (intStatus == 2)
            window.location = '<%=Url.Action("BrowserLogout", "Home", new { area = "Login"} ) %>?IdLogBrowser=' + IdLogBrowser + '&intStatus=' + intStatus;
        else
            window.location = '<%=Url.Action("BrowserContinue", "Home", new { area = "Login"} ) %>?IdLogBrowser=' + IdLogBrowser + '&intStatus=' + intStatus + '&strRedirectUrl=<%=ViewData["strRedirectUrl"]%>';
    }
</script>

<div id="content" class="resolucao clearfix">
    <div class="clearfix">

        <div class="box_3col" style="padding: 20px; padding-top: 10px">
            <div class="rotulo">Caro(a) usuário(a),</div>

            <br><br>A versão de seu navegador de Internet (browser) é anterior à versão mínima necessária para o perfeito funcionamento do portal, que é a Internet Explorer 7, 8 ou superior.
								
            <br><br>Você pode atualizar seu navegador clicando no botão "Atualizar versão", logo abaixo.
            <br><br>Se não quiser fazer a atualização, clique em "Continuar" para acessar o portal, mas lembre-se de que poderão ocorrer erros em sua navegação. 							
            <BR><BR>O portal agradece a sua compreensão.
            <br>Equipe do Portal
							
            <br /><br /><br /><br /><hr><br />

            <div style="padding-right:5px" align="right">
                <a href="#" onclick="Continuar(<%=(int)ViewData["IdLogBrowser"] %>, 1);" class="bt menor" style="padding: 1px 5px; line-height: 13px; float: right;">Continuar</a>
                &nbsp;&nbsp;&nbsp;
                <a href="#" onclick="Continuar(<%=(int)ViewData["IdLogBrowser"] %>, 3);" class="bt menor" style="padding: 1px 5px; line-height: 13px; float: right;">Atualizar vers&atilde;o</a>
            </div>
        </div>

    </div>
</div>
	       
		
</asp:Content>






<asp:Content ID="FooterArea" ContentPlaceHolderID="FooterArea" runat="server">
        <table>
		    <tr>
			    <td class="borderedcolumn" style="padding-right: 23px;">
				    <img src="<%=Url.ThemedCDNLink("/cssimg/logo_footer.jpg")%>" alt="Logomarca" />
			    </td>
			    <td style="padding-left: 23px;">
                    <ul>
					    <li><span class="bullet">&bull;</span><a href="#" onclick="window.open('/termos/pop_termos.asp','termos','scrollbars=yes,width=520,height=400,left=50;top=50')"><%: this.Resource("invalid_browser_footer_termos")%></a></li>
				    </ul>
			    </td>
		    </tr>
	    </table>
</asp:Content>
       







