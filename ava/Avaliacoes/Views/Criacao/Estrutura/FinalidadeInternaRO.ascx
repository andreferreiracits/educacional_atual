<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>
<div class="linhaImpar">
    <div class="SEC02511_texto alinhamento">Finalidade da avaliação:</div>
    <div class="dadosCriacao">
       <label><%= Model.NomeTipoBanco%></label>
    </div>
</div>