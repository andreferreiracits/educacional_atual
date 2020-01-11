<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<Mural.Models.MensagemRapidaComentario>>" %>
<%
    var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 0;
    var souComunicadorPost = (ViewData["souComunicadorPost"] != null) ? (bool)ViewData["souComunicadorPost"] : false;

    var bolPossuiVerMais50 = (ViewData["bolPossuiVerMais50"] == null) ? false : (bool)ViewData["bolPossuiVerMais50"];
    var totalCarregado = (ViewData["totalCarregado"] == null) ? "" : ViewData["totalCarregado"].ToString();
    var idsCarregados = (ViewData["idsCarregados"] == null) ? "" : ViewData["idsCarregados"].ToString();
    
    foreach (Mural.Models.MensagemRapidaComentario m in ViewData.Model)
    {
        Html.RenderPartial("Partials/UserComentarioFeedNovaHome", m, new ViewDataDictionary { { "postExcluido", ViewData["postExcluido"] }, { "idUsuarioLogado", ViewData["idUsuario"] }, { "idVisitante", ViewData["idVisitante"] }, { "bolSuspensao", ViewData["bolSuspensao"] }, { "bolAcessoEscrever", ViewData["bolAcessoEscrever"] }, { "idOwner", ViewData["idOwner"] }, { "admRede", ViewData["admRede"] }, { "bolPai", ViewData["bolPai"] }, { "bolExcluido", ViewData["bolExcluido"] }, { "idEstado", ViewData["idEstado"] }, { "idFerramentaTipo", idFerramentaTipo }, { "souComunicadorPost", souComunicadorPost } });    
    }
    
    if (ViewData["totalCarregado"] != null)
    {
        var idMensagemRapida = (int)ViewData["idMensagemRapida"];
%>
    <input type="hidden" id="totComUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(totalCarregado.ToString()))%>" />
    <input type="hidden" id="idsUltUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(idsCarregados.ToString()))%>" />
    <input type="hidden" id="bolVerMais50_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=bolPossuiVerMais50 ? 1 : 0%>" />
    <input type="hidden" id="bolPodeComentar" value="<%=(ViewData["bolPodeComentar"] == null) ? false : (bool)ViewData["bolPodeComentar"]%>" />

<% } %>