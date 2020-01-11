<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

    

<script type="text/javascript">
    $(document).ready(function(){
    $( "#previewTemoUso" ).dialog({        
        autoOpen: false,
        height: 680,
        width: 900,
        modal: true,
        resizable: false,
        draggable: false,
        open: function(event, ui) {
            $(this).parent().find(".ui-dialog-titlebar").hide();
            $(this).parent().find(".ui-dialog-buttonpane").hide();
        },
      });
    });
</script>

	<div class="footer_content ft_mural">

        <a href="https://www.positivoteceduc.com.br/educacional">Quem somos</a>  |  <a href="https://positivote.zendesk.com/hc/pt-br">Fale conosco</a>  |  <a onclick="abrirTermoUso()">Termos de uso</a>
        <p class="copy">Copyright © 1999-<%=DateTime.Now.Year %>.Mundo Positivo.</p>
        <p class="copyright"> Todos os direitos reservados.</p>       
        
        <div class="assinatura"></div>
        
	</div>

    <div id="previewTemoUso" class="preview_img_post preview_anx_post mobile" style="display:none; width: 400px; height: 550px;">
        <div class="topo_botao"> 
			<a href="javascript:void(0);" onclick="fecharModal()" class="btn_cinza left" id="btn_cancelarGeral">Fechar</a>
		</div>    
    </div>