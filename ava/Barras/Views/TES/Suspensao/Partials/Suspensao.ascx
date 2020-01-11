<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Usuario>" %>

<div class="mp_edt_denuncia" id="mp_edt_denuncia" style="font-family:arial;">
	<form id="frmSuspensao" name="frmSuspensao">
    	<div class="" style="height:27px;padding: 13px 0px 0px 10px;border-bottom:solid 1px #D2D2D2;background-position:0 -5px; "><h2>Suspender</h2></div>
        <div class="">
			
            <div style="padding:20px 10px 10px 10px;font-family:arial;font-size:12px; text-align:center;">Selecione por quanto tempo <%=Model.strNome%> ficará suspenso*: <select name="intDias" id="intDias">
            															<option value="5">5</option>
                                                                        <option value="10">10</option>
                                                                        <option value="15">15</option>
                                                                        <option value="30">30</option>
            														</select> dias.
            </div>			
			<div style="padding:10px;font-family:arial;font-size:12px; text-align:center;">				
				<div style="overflow:hidden;padding-bottom:5px;">
					<div style="width:50px; padding-left:5px;"><b>Motivo:</b></div>
					<div>
						<textarea name="txtJustificativa" id="txtJustificativa" cols="55" rows="2" style="border:solid 1px #0099CC"></textarea>
					</div>
				</div>
				<div style="overflow:hidden;padding-bottom:5px;padding-right:20px; margin-top:10px;">                                       
                    <div id="salvar_suspensao" style="float:right;padding:3px 15px; margin-left:15px; background-color:#A1D6E8;border:solid 2px #0099CC;color:#FFF;font-family:arial;font-weight:bold;font-size:14px;cursor:pointer;">Salvar</div>
				</div>
				<div align="center" style="font-family:arial;font-size:10px; margin-top:20px;">* A suspensão impossibilita o aluno de enviar e receber mensagens.</div>										 
			</div>
			
			<input type="hidden" id="strEmail" name="strEmail" value="<%=Model.strEmail%>">			
            <input type="hidden" id="idUsuarioSuspensao" name="idUsuarioSuspensao" value="<%=Model.id%>">			
		</div>
        <div class=""><a href="#"></a></div>
	</form>								
</div>