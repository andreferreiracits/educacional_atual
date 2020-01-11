<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div class="linhaPar">
		<label class="SEC02511_texto alinhamento" for="rdoTipoSelecao_manual">Forma de seleção das questões:</label>

		<div class="dadosCriacao">
			<input id="rdoTipoSelecao_manual" name="rdoTipoSelecao" type="radio" value="<%=(int)Prova.EnumTipoSelecaoQuestao.Manual %>" <%=Model.CheckSelecaoManual %>/>
			<label for="rdoTipoSelecao_manual">Seleção Manual</label>
								   
			<input id="rdoTipoSelecao_automatica" name="rdoTipoSelecao" type="radio" value="<%=(int)Prova.EnumTipoSelecaoQuestao.Automatica %>" <%=Model.CheckSelecaoAutomatica %>/>
			<label for="rdoTipoSelecao_automatica">Seleção Automática</label>

            <input class="trocarNovoFluxo" id="rdoTipoSelecao_semiautomatica" name="rdoTipoSelecao" type="radio" value="<%=(int)Prova.EnumTipoSelecaoQuestao.GrupoAutomatica %>" />
			<label for="rdoTipoSelecao_semiautomatica">Seleção Semi-Automática</label>
		</div>

        <a id="helpSelecaoAvaliacao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
</div>

