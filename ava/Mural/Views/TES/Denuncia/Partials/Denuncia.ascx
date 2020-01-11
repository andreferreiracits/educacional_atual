<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<AVASuspensaoDenuncia.Models.Denuncia>" %>

<div class="mp_edt_denuncia" id="mp_edt_denuncia" style="font-family:arial;">	
    <form id="frmDenuncia" name="frmDenuncia">
    	<div class="" style="background: url(/imagens/templates/2010/tema_azul_claro_620.gif) no-repeat top left;height:27px;padding: 13px 0px 0px 10px;border-bottom:solid 1px #D2D2D2;background-position:0 -5px; "><h2>Denúncia de conteúdo impróprio</h2></div>
        <div class="">
			<div align="center" style="font-family:arial;font-size:12px;padding-top: 10px;color:#08A0C5"><b>Escreva porque você achou o conteúdo da página impróprio.</b></div>			
			<div style="float:left;padding:10px;font-family:arial;font-size:12px;">
				<div style="overflow:hidden;padding-bottom:5px;">
					<div style="float:left;width:50px;"><b>Nome</b></div>
					<div style="float:left;"><%=Model.usuario.strNome%></div>
				</div>
				<div style="overflow:hidden;padding-bottom:5px;">
					<div style="float:left;width:50px;"><b>Motivo</b></div>
					<div style="float:left;">
						<textarea name="txtMotivo" id="txtMotivo" cols="55" rows="6" style="border:solid 1px #0099CC"><%=Model.strTexto%></textarea>
					</div>
				</div>
				<div style="overflow:hidden;padding-bottom:5px;padding-right: 20px">
					<div id="enviar_email" style="float:right;padding:3px 15px;background-color:#A1D6E8;border:solid 2px #0099CC;color:#FFF;font-family:arial;font-weight:bold;font-size:14px;cursor:pointer;">Enviar</div>
				</div>
				<div align="center" style="font-family:arial;font-size:10px;color:#08A0C5">Esta denúncia será enviada ao(s) administrador(es) da sua escola para análise e providências necessárias</div>										 
			</div>
			
			<input type="hidden" id="strEmail" name="strEmail" value="<%=Model.usuario.strEmail%>">			
		</div>
        <div class=""><a href="#"></a></div>
	</form>								
</div>
