<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<a id="addAplicacao" href="<%=Url.Action("Criar", "Agendamento") %>" class="btn"><span class="btnCriar"></span>Criar novo agendamento</a>

<a id="helpCadAgendamento" class="btn sec_ajuda" href="javascript:void(0)">?</a>