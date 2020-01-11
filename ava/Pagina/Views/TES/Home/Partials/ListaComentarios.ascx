<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Pagina.Models.MensagemRapidaComentario>>" %>
<%
    int idMensagemRapida = ViewData["idMensagemRapida"] == null ? 0 : Convert.ToInt32(ViewData["idMensagemRapida"]);
    int idUsuarioLogado = ViewData["idUsuarioLogado"] == null ? 0 : Convert.ToInt32(ViewData["idUsuarioLogado"]);
    var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 39;
    bool bolPodeComentar = ViewData["bolPodeComentar"] == null ? true : Convert.ToBoolean(ViewData["bolPodeComentar"]);
    int idPagina = ViewData["idPagina"] == null ? 0 : Convert.ToInt32(ViewData["idPagina"]);
    
    bool montouHidden = false;
    
    if (Model != null)
    {
        bool bolPossuiVerMais50 = ViewData["bolPossuiVerMais50"] == null ? false : (bool)ViewData["bolPossuiVerMais50"];
        int totalCarregado = ViewData["totalCarregado"] == null ? Model.Count : Convert.ToInt32(ViewData["totalCarregado"]);
        string idsCarregados = ViewData["idsCarregados"] == null ? "0" : ViewData["idsCarregados"].ToString();
        int totalComentarios = ViewData["totalComentarios"] == null ? 0 : Convert.ToInt32(ViewData["totalComentarios"]);
        var souComunicadorPost = (ViewData["souComunicadorPost"] != null) ? (bool)ViewData["souComunicadorPost"] : false;
        var postExcluido = (ViewData["postExcluido"] != null) ? (bool)ViewData["postExcluido"] : false;

        foreach (var comentario in Model) { Html.RenderPartial("Partials/MensagemComentario", comentario, ViewData); }

        if (totalComentarios > 3 && (totalComentarios != Model.Count))
        {
            montouHidden = true;
            if (ViewData["totalCarregado"] == null) { //É o primeiro load.
        %>
            <input type="hidden" id="idsPriUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(String.Join(",", Model.Select(x => x.IdComentario))))%>" />
            <input type="hidden" id="dtmPriUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")))%>" />
            <input type="hidden" id="totCom_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(totalComentarios.ToString()))%>" />
            
            <a href="javascript:void(0);" class="carregarComentarios pagina" ide="<%=idMensagemRapida%>"><span class="icone_comentario_resumo"></span><span>Ver mais comentários </span><span class="FontAwesome angle_down"></span>&nbsp;<span class="totalCarregado"><%=totalCarregado + " de " + totalComentarios%></span></a>    
                
            <% 
            if (bolPodeComentar)
            {
                %>
                <div style="display:none;" class="escreverMais_" ide="<%=idMensagemRapida%>"><a href="javascript:void(0);" class="color5">Escreva um comentário...</a></div>
                <%        
            }    
            %>
        <% } else { //Entra quando carrega o ver mais %>            
            <input type="hidden" id="totComUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(totalCarregado.ToString()))%>" />
            <input type="hidden" id="idsUltUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(idsCarregados.ToString()))%>" />
            <input type="hidden" id="bolVerMais50_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=bolPossuiVerMais50 ? 1 : 0%>" />            
        <% }
        }
    }
    
    if(!montouHidden)
    { //É o primeiro load de mensagem sem comentario ou com menos de 4 comentarios
        var bolPossuiComentarios = false;
        if(Model != null)
            bolPossuiComentarios = Model.Count > 0;
        
        var totalComentarios = bolPossuiComentarios ? Convert.ToBase64String(Encoding.UTF8.GetBytes(Model.Count.ToString())) : "";
        var idsComentarios = bolPossuiComentarios ? Convert.ToBase64String(Encoding.UTF8.GetBytes(String.Join(",", Model.Select(x => x.IdComentario)))) : "";
            
        
%>
    <input type="hidden" id="idsPriUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=idsComentarios%>" />
    <input type="hidden" id="dtmPriUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")))%>" />
    <input type="hidden" id="totCom_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=totalComentarios%>" />    
<% } %>

