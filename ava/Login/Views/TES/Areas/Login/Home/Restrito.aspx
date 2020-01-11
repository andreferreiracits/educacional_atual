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
<section id="ava_container" style="width: 490px;">
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

<div id="content" class="resolucao clearfix">
    <div class="clearfix">
        <div class="box_3col">
	        <table width="100%" border="0" cellspacing="0" cellpadding="0">           
            <tbody>
	        <tr>
		        <td colspan="2">
		        <!-- CONTE�DO -->
                            
					        <h2>�rea de Acesso Restrito</h2>
					       
					        
					        <p>
						        O Portal � composto por �reas de 
						        acesso livre e �reas de acesso restrito. 
						        Voc� tentou acessar uma �rea restrita. 
						        Se j� � nosso usu�rio,
                            </p>
							<input name="button" type="button" class="botao" onclick="window.location.href='/ava/Login/Login?ReturnUrl=<%= ReturnUrl%>';" value="Fa�a seu login aqui">
                 		
                			<p>
                                Para saber mais sobre as solu��es do Educacional, <a href="http://www.positivoteceduc.com.br/produtos/educacional/" target="_blank">clique aqui</a>.
                            </p>    						        
					        
				
  		        <!-- FIM DO CONTE�DO -->
		        </td>
	        </tr>
            </tbody>
	        </table>
        </div>
    </div>
</div>
</section>
</asp:Content>