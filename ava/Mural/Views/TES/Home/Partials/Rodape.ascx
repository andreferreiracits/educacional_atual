<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>



        <div class="centralizaclass footerdiv">

           
            <!---<ul id="Ul1" >
                <li class="first"><a href="#" >Atividades</a></li>
                <li><a href="#">Disciplinas</a></li>
                <li><a href="#">Central de Projetos</a></li>
            	<li ><a href="#" ><span class="lip"></span>Livro Integrado</a></li>
                <li class="last"><a href="#" >Acesso Rápido</a></li>
            </ul>--->
        
        	<div class="assina_educa">            
            <img src="/ava/staticContent/Common/img/perfil/logo_educa.png" width="162" height="30" alt="logo educacional">
            <p>Copyright &copy; 1999-2012. Portal Educacional. Todos os Direitos Reservados </p>
            <a href="../../../quemsomos/default.asp">Quem somos</a>  |  <a href="../../../contato">Fale conosco</a>  |  <a href="#" onclick="javascript: window.open('/termos/pop_termos2.asp','termos','scrollbars=yes,width=520,height=400,left=50;top=50')">Termos de uso</a>
            </div>
            
            
        	
        </div>

        <!--
	    <div align="center" style="display:block;font-family:arial;font-size:12px">Se você encontrou conteúdo impróprio nesta página, <a style="cursor: pointer;" class="denunciar" href="/AVA/Barras/Denuncia/DenunciaPagina">denuncie</a>.</div>

        <script>
            jQuery(function ($) {
                lightBoxAVA($('.denunciar'), { 'onComplete': callBackDenuncia });

                function callBackDenuncia() {
                    $('form[name=frmDenuncia]').find('h2').css({ 'position': 'absolute', 'top': '-10px' });
                    $('#enviar_email').click(function () {
                        if ($('#txtMotivo').val() != "") {
                            $.post("/AVA/Barras/Denuncia/DenunciaPaginaGravar", { 'strURL': location.href, 'strMotivo': $('#txtMotivo').val() }, function (data) {
                                alert("E-mail enviado ao administrador de rede social!")

                            });
                        } else {
                            alert("Favor preencher o motivo!");
                            return false;
                        }
                    });
                };

            });
        </script>
        -->