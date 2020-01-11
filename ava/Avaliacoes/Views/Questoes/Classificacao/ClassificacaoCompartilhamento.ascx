<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>
<div class="linhaImpar">
		<label class="questao" for="rdoCompartilhadaPrivada">Compartilhamento:</label>

		<span class="SEC02511_texto strong">
			<label class="item">
                <input id="rdoCompartilhadaPrivada" name="rdoCompartilhada" type="radio" value="<%=(int)Compartilhada.Privada %>" <%=Model.CompartilhadaPrivada %>/>
                Privada
            </label>
			<label class="item">
                <input id="rdoCompartilhadaEscola" name="rdoCompartilhada" type="radio" value="<%=(int)Compartilhada.Escola %>" <%=Model.CompartilhadaEscola %>/>
                Compartilhada com professores da minha escola
            </label>
		</span>
</div>