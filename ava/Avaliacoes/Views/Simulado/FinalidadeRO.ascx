<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>
<div class="linhaImpar">
    <div class="SEC02511_texto alinhamento">Finalidade do simulado:</div>
    <div class="dadosCriacao">
        <label><%=Model.Finalidade%></label>
    </div>
</div>