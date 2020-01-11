<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<div class="linhaPar">
		<label class="SEC02511_texto alinhamento" for="rdoEmbaralhamentoSim">Embaralhamento:</label>

		<div class="dadosCriacao">
			<input id="rdoEmbaralhamentoNao" name="rdoEmbaralhamento" type="radio" value="0" <%=Model.NaoPodeEmbaralhar %> <%=Model.PermissaoAlterarEstruturaDisabled %>/>
			<label for="rdoEmbaralhamentoNao">Não</label>
								   
			<input id="rdoEmbaralhamentoSim" name="rdoEmbaralhamento" type="radio" value="1" <%=Model.PodeEmbaralhar %> <%=Model.PermissaoAlterarEstruturaDisabled %>/>
			<label for="rdoEmbaralhamentoSim">Sim</label>
		</div>
</div>

