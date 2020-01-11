<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Login.Master"  Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage"   %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder5" runat="server" >  
        <script type="text/javascript" src="<%=Url.CDNLink("/Common/jquery-ui-1.8.2.custom/development-bundle/jquery-1.7.js")%><%=Url.TimeStampLink() %>"></script>
        <script type="text/javascript" src="<%=Url.CDNLink("/Common/jquery-ui-1.8.2.custom/js/jquery-ui-1.8.2.custom.min.js")%><%=Url.TimeStampLink() %>"></script>               
        <script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/LoginMaster.js")%><%=Url.TimeStampLink() %>"></script>
        
</asp:Content>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentPlaceHolderConteudo" runat="server">

<%
int IdEscola = (int)ViewData["IdEscola"];
    
String AcademicoDominio = (String)ViewData["AcademicoDominio"];
String strInstituicao = AcademicoDominio;


String urlMeuEspaco = (String)ViewData["urlMeuEspaco"];
String Escola_URL = (String)ViewData["Escola_URL"];
String LoginID = (String)ViewData["LoginID"];
String complementoURL = (String)ViewData["complementoURL"];
String strLogin = (String)ViewData["strLogin"];
String IdUsuario = (String)ViewData["IdUsuario"];
String IdPapel = (String)ViewData["IdPapel"];
String CodUEscola = (String)ViewData["CodUEscola"];
String StrCodEscola = (String)ViewData["StrCodEscola"];
String ReturnUrl = (String)ViewData["ReturnUrl"];    
    
    

%>
<!-- Centralizando conteudo  -->
<script language="javascript">
    function init() {
        if (!document.getElementById) return
        var imgOriginSrc;
        var imgTemp = new Array();
        var imgarr = document.getElementsByTagName('img');
        for (var i = 0; i < imgarr.length; i++) {
            if (imgarr[i].getAttribute('hsrc')) {
                imgTemp[i] = new Image();
                imgTemp[i].src = imgarr[i].getAttribute('hsrc');
                imgarr[i].onmouseover = function () {
                    imgOriginSrc = this.getAttribute('src');
                    this.setAttribute('src', this.getAttribute('hsrc'))
                }
                imgarr[i].onmouseout = function () {
                    this.setAttribute('src', imgOriginSrc)
                }
            }
        }
    }
    //onload = init;
</script>

<div id="content" class="resolucao clearfix" style="letter-spacing: normal !important;">
    <div class="clearfix">
        <div class="box_3col">
	        <table width="100%" border="0" cellspacing="0" cellpadding="0">           
	        <tr>
		        <td colspan="2">
		        <!-- CONTEÚDO -->
                            <br />
					        <div style="color: #fff; background: #08467f; padding: 5px; padding-left:20px"><h2>Área de Acesso Restrito</h2></div>
					        <div style="margin:20px">
					        
					        <div>
						        O Portal é composto por áreas de 
						        acesso livre e áreas de acesso restrito. 
						        Você tentou acessar uma área restrita. 
						        
							        Se já é nosso usuário,
							        <div style="padding:20px" align="center"><input name="button" type="button" class="botao" onClick="window.location.href='<%=Url.Action("Login", "Home", new { area = "Login" }) %>?ReturnUrl=<%=Request.QueryString["ReturnUrl"] %>';" value="Faça seu login aqui"></div>
                 		
                 			        Obtenha maiores informações sobre todas as ferramentas e facilidades que o nosso portal oferece, entrando em contato conosco. <br />
                 			        						        
					        </div>
					        <hr />
                            <br />
                            <br />
					        
                            <br />
                            <br />
					        
					
					        </div>
				
  		        <!-- FIM DO CONTEÚDO -->
		        </td>
	        </tr>
	        </table>
        </div>
    </div>
</div>
</asp:Content>