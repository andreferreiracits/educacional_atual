<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Simples.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentPlaceHolderConteudo" runat="server">
    <script type="text/javascript" src="<%=Url.CDNLink("/Common/jquery-ui-1.8.2.custom/development-bundle/jquery-1.7.js") %>"></script>
    <script>
      
        function validaAlteraLogin() {
            var strEmail = $('#strEmail').val();
            var strEmailConfirma = $('#strEmailConfirma').val();
            if ( strEmail == "") {
                alert('Por favor, informe um email.');
                return false;
            } else if (strEmailConfirma == '') {
                alert('Por favor, confirme seu email.');
                return false;                
            }else {
                // expressão regular
                var emailValido=/^.+@.+\..{2,}$/;
 
                if(!emailValido.test(strEmail))
                {
                    alert('O email informado é inválido.');
                    $('#strEmail').focus();
                    return false;
                }

                if (!emailValido.test(strEmailConfirma)) {
                    alert('O email de confirmação é inválido.');
                    $('#strEmailConfirma').focus();
                    return false;
                }

                if (strEmail != strEmailConfirma) {
                    alert('Os emails fornecidos não são iguais. Por favor verifique.');
                    $('#strEmailConfirma').focus();
                    return false;
                }
            }
        }
    </script>
<%
    var strLogin = ViewData["strLogin"].ToString();
    var strSenha = ViewData["strSenha"].ToString();
    var strEmailUser = ViewData["strEmailUser"].ToString();
%>

        <div id="ava_wrap" class="pg_disciplinas clearfix">
        <section id="ava_container" class="as1 centralizaclass">
			<div class="troca_login">
				<h2>Troca de login</h2>
				<p>O seu login continha caracteres especiais não autorizados. Para melhor funcionamento do Portal, ele foi trocado para: </p>
				<p class="novo_login"><%=strLogin %></p>
				
				<h3>Endereço de e-mail</h3>
				<p>O novo login será enviado também para o seu endereço de e-mail.</p>
				<form name="frmLoginAlterado" id="frmLoginAlterado" class="email_troca" onsubmit="return validaAlteraLogin()" action="/AVA/Login/Home/LoginVer">
                    <input type="hidden" name="strLogin" id="strLogin" value="<%=strLogin %>" />
                    <input type="hidden" name="strSenhaSS" id="strSenhaSS" value="<%=strSenha %>" />
                    <input type="hidden" name="bEnviaEmail" id="bEnviaEmail" value="true" />
					E-mail<br/>
					<input type="text" class="erro" name="strEmail" id="strEmail" value="<%=strEmailUser %>"><br/>
					Confirmação<br/>
					<input type="text" name="strEmailConfirma" id="strEmailConfirma" ><br/>
					<input type="submit" value="Enviar" class="btn_laranja salvar">
				</form>
			</div>
        </section>
	</div>
        
    
<br />
<br />
<br />
<br />
<br />
<br />
<br />
</asp:Content>