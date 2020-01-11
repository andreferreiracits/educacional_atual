<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<Perfil.Models.MensagemRapidaComentario>>" %>
<%
    foreach (Perfil.Models.MensagemRapidaComentario m in ViewData.Model)
    {

        Html.RenderPartial("../Home/Partials/UserComentarioFeed", m, new ViewDataDictionary { { "idUsuarioLogado", ViewData["idUsuario"] }, { "idVisitante", ViewData["idVisitante"] }, { "bolSuspensao", ViewData["bolSuspensao"] }, { "bolAcessoEscrever", ViewData["bolAcessoEscrever"] }, { "idOwner", m.IdUsuario } });    
        
    }
%>