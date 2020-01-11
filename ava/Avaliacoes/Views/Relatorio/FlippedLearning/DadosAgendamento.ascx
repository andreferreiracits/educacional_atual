<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.Models.Exam.Aplicacao>" %>

<%@ Import namespace="ProvaColegiada.Models.Exam" %>
<%@ Import namespace="ProvaColegiada.Models.Exam.Realizador" %>


<div class="rlCabEsquerda">
    Período do agendamento: <span><%=String.Format("{0:dd/MM/yyyy}", Model.Realizacao.Inicio)%> <%=String.Format("{0:HH:mm}h", Model.Realizacao.Inicio)%> até <%=String.Format("{0:dd/MM/yyyy}", Model.Realizacao.Fim)%> <%=String.Format("{0:HH:mm}h", Model.Realizacao.Fim)%></span>
</div>
<div class="rlCabDireita">
<%
    IList<SelectListItem> listaGrupos = new List<SelectListItem>();
    listaGrupos.Add(new SelectListItem { Selected = true, Text = "Selecionar grupos(s)", Value = "-1" });
    foreach (AbstractTipoRealizadores grupo in Model.Realizadores)
    {
        listaGrupos.Add(new SelectListItem { Selected = false, Text = grupo.Nome, Value = grupo.Id.ToString() });
    }
    /*listaGrupos.Add(new SelectListItem { Selected = false, Text = "Usuário sem grupo", Value = "" });*/
    %>

    <%= Html.DropDownList("slcGrupoFlipped", listaGrupos, new { @class = "slc" })%>
</div>
