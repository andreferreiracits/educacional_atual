<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<div class="linhaImpar">
		<label class="SEC02511_texto alinhamento" for="rdoCompartilhadaPrivada">Compartilhamento:</label>

		<div class="dadosCriacao">
			<input id="rdoCompartilhadaPrivada" name="rdoCompartilhada" type="radio" value="<%=(int)Compartilhada.Privada %>" <%=Model.CompartilhadaPrivada %>/>
			<label for="rdoCompartilhadaPrivada">Privada</label>
								   
			<input id="rdoCompartilhadaEscola" name="rdoCompartilhada" type="radio" value="<%=(int)Compartilhada.Escola %>" <%=Model.CompartilhadaEscola %>/>
			<label for="rdoCompartilhadaEscola">Compartilhada com professores da minha escola</label>
		</div>
</div>

