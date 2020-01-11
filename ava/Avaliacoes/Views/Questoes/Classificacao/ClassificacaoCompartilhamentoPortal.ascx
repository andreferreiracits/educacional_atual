<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>
<div class="linhaPar">
		<label class="questao" for="rdoCompartilhadaPrivada">Compartilhamento:</label>

		<span class="SEC02511_texto strong">
            <label class="item">
            <input name="rdoCompartilhada" type="hidden" value="<%=(int)Compartilhada.Portal %>"/>
            Portal
            </label>
		</span>
</div>