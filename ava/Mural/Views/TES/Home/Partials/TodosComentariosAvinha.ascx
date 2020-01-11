<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<Mural.Models.MensagemRapidaComentario>>" %>
<%
    var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 0;
    var souComunicadorPost = (ViewData["souComunicadorPost"] != null) ? (bool)ViewData["souComunicadorPost"] : false;
    var bolPossuiVerMais50 = (ViewData["bolPossuiVerMais50"] == null) ? false : (bool)ViewData["bolPossuiVerMais50"];
    var totalCarregado = (ViewData["totalCarregado"] == null) ? "" : ViewData["totalCarregado"].ToString();
    var idsCarregados = (ViewData["idsCarregados"] == null) ? "" : ViewData["idsCarregados"].ToString();
    
    
    foreach (Mural.Models.MensagemRapidaComentario m in ViewData.Model)
    {
        Html.RenderPartial("Partials/BuscaComentariosAvinha", m, new ViewDataDictionary { { "bolPai", ViewData["bolPai"] }, { "idUsuarioLogado", ViewData["idUsuario"] }, { "idVisitante", ViewData["idVisitante"] }, { "bolSuspensao", ViewData["bolSuspensao"] }, { "bolAcessoEscrever", ViewData["bolAcessoEscrever"] }, { "idOwner", ViewData["idOwner"] }, { "admRede", ViewData["admRede"] }, { "idFerramentaTipo", idFerramentaTipo }, { "souComunicadorPost", souComunicadorPost } });    
    }

    if (ViewData["totalCarregado"] != null)
    {
        var idMensagemRapida = (int)ViewData["idMensagemRapida"];
%>
    <input type="hidden" id="totComUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(totalCarregado.ToString()))%>" />
    <input type="hidden" id="idsUltUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(idsCarregados.ToString()))%>" />
    <input type="hidden" id="bolVerMais50_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=bolPossuiVerMais50 ? 1 : 0%>" />

<% } %>