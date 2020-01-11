<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<a id="addQuestao" href="<%=Url.Action("Criar", "Questoes") %>" class="btn"><span class="btnCriar"></span>Criar nova questão</a>

<a id="helpCadQuestao" class="btn" href="javascript:void(0)">?</a>