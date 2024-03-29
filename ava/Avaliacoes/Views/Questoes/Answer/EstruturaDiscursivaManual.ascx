﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div class="divisaoQuestao">
    <div class="tituloDivisao">Resposta modelo</div>
    <div class="textoDivisao">Será exibida para o aluno como resposta esperada para a questão.</div>
</div>
<ul class="itensResposta">
    <% Html.RenderPartial(Model.TipoRespostaView.ViewAlternativa, Model); %>
</ul>
