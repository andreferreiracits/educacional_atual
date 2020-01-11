<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Mural.Models.MensagemRapidaComentario>>" %>

<%
int totalComentarios = Convert.ToInt32(ViewData["totalComentarios"]);
int idMensagemRapida = Convert.ToInt32(ViewData["idMensagemRapida"]);
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 0;
var souComunicadorPost = (ViewData["souComunicadorPost"] != null) ? (bool)ViewData["souComunicadorPost"] : false;
var bolPodeComentarPost = (ViewData["bolPodeComentarPost"] != null) ? (bool)ViewData["bolPodeComentarPost"] : false;
var bolUsuarioSemTurma = (ViewData["bolUsuarioSemTurma"] != null) ? (bool)ViewData["bolUsuarioSemTurma"] : false;
var bolAcessoEscreverBloqueado = (ViewData["bolAcessoEscreverBloqueado"] != null) ? (bool)ViewData["bolAcessoEscreverBloqueado"] : false;
var bolPai = (ViewData["bolPai"] != null) ? (bool)ViewData["bolPai"] : false;
var bolSuspenso = (ViewData["bolSuspenso"] != null) ? (bool)ViewData["bolSuspenso"] : false;
var bolEducador = (ViewData["bolEducador"] != null) ? (bool)ViewData["bolEducador"] : false;

bool bolAdmin = false;
if (ViewData["admRede"] != null && ViewData["admRede"].ToString() != "")
{
    bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
}

bool vemDoAdminAVA = false;

if (ViewData["adminAVA"] != null)
{
    vemDoAdminAVA = Convert.ToBoolean(ViewData["adminAVA"]);		 
}

bool postExcluido = false;

if (ViewData["postExcluido"] != null)
{
    postExcluido = Convert.ToBoolean(ViewData["postExcluido"]);		 
}

if (totalComentarios > 3 && idFerramentaTipo != 39)
{
    int totalComentariosAnteriores = totalComentarios - 3;
    if (totalComentariosAnteriores > 1)
    {
        %>
        <a href="javascript:void(0);" class="carregarComentarios" ide="<%=idMensagemRapida%>"><span class="icone_comentario_resumo"></span>Exibir todos os <strong><%=totalComentariosAnteriores%> comentários </strong>anteriores <span class="FontAwesome angle_down"></span></a>
        <% 
    }
    else
    {
        %>
        <a href="javascript:void(0);" class="carregarComentarios" ide="<%=idMensagemRapida%>"><span class="icone_comentario_resumo"></span>Exibir <strong><%=totalComentariosAnteriores%> comentário </strong>anterior <span class="FontAwesome angle_down"></span></a>
        <%     
    }
           
}    

foreach (var comentario in Model)
{
    string strClassAtivoCurtiu = "";
    if (comentario.bolCurtiu)
        strClassAtivoCurtiu = "ativo";    
    
    %>
    <div id="coment_<%=comentario.IdComentario%>" <%if(comentario.bolExcluido){%>class="comentario_excluido_adm"<%} %>>
        <% 
        if (comentario.bolExcluido)
        {
            %>
            <p><span></span>Comentário excluído.</p>
            <%
        }    
        %>

        <%if(comentario.idPagina > 0) { %>
            <a href="/AVA/Pagina/<%=comentario.strLogin%>"><img src="<%=comentario.strMiniFoto%>" height="33" width="33"></a>
        <%}else{ %>
            <a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>"><img src="<%=comentario.strMiniFoto%>" height="33" width="33"></a>
        <%} %>
	    <div class="textComentario">
            
            <%
            if (!comentario.bolExcluido && !postExcluido)
            {
                if (idUsuarioLogado == comentario.IdUsuario || (bolAdmin && idFerramentaTipo != 39) || (souComunicadorPost && idFerramentaTipo == 39))
                {
                    %>
                    <a href="javascript: void(0);" class="FontAwesome coment_excluir confirma_excluir fecha_X" ident="<%=comentario.IdComentario%>" data-idcomentario="<%=comentario.IdComentario%>"><span></span></a>
                    <%        
                }
            }
            
            if (vemDoAdminAVA)
            {
                %>
                <h4><a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>"><%=comentario.strNomeReal%> <%if(comentario.strApelido.Length > 0){%><span class="nome_apelido">(<%=comentario.strApelido%>)</span><%} %></a></h4>
                <%
            }
            else
            {
               if(comentario.idPagina > 0) { %>
                    <h4><a href="/AVA/Pagina/<%=comentario.strLogin%>"><%=comentario.strNome%></a></h4>
                <%}else{ %>
                    <h4><a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>"><%=comentario.strNome%></a></h4>
                <%}
            }
            %>
            <span class="grupoTime"><%=comentario.strTempoPublicacao%></span>

            <% 
            if (!comentario.bolExcluido && !postExcluido)
            {
                %>
                <a class="botaoCurtirComentario <%=strClassAtivoCurtiu%>" href="javascript:void(0);" idComentario="<%=comentario.IdComentario%>"></a>            
                <%
            }    
            %>
		    
            <div class="feedTotalGostaram" id="boxCurticoesComentario_<%=comentario.IdComentario%>">
                <%
                Html.RenderPartial("Partials/ListaCurticoesComentario", comentario, new ViewDataDictionary() { { "idFerramentaTipo", idFerramentaTipo}, {"idUsuarioLogado", idUsuarioLogado } });
                %>
            </div>                
		    <p class="ctn_msg"><%=comentario.txtComentario%></p>
	    </div>
	    <div class="clearfix"></div>
    </div>
    <% 
}

if (idFerramentaTipo == 39)
{
    var bolPossuiComentarios = false;
    if (Model != null)
        bolPossuiComentarios = Model.Count > 0;
    
    var totalComentarios50 = bolPossuiComentarios ? Convert.ToBase64String(Encoding.UTF8.GetBytes(totalComentarios.ToString())) : "";
    var idsComentarios50 = bolPossuiComentarios ? Convert.ToBase64String(Encoding.UTF8.GetBytes(String.Join(",", Model.Select(x => x.IdComentario)))) : "";
    
    %>
    <input type="hidden" id="porraloca<%=idMensagemRapida%>" value="<%=totalComentarios %>" />
    <input type="hidden" id="idsPriUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=idsComentarios50%>" />
    <input type="hidden" id="dtmPriUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")))%>" />
    <input type="hidden" id="totCom_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=totalComentarios50%>" />  
    <% if (totalComentarios > 3)
       {
           %>
           <a href="javascript:void(0);" class="carregarComentarios pagina" ide="<%=idMensagemRapida%>"><span class="icone_comentario_resumo"></span><span>Ver mais comentários </span><span class="FontAwesome angle_down"></span>&nbsp;<span class="totalCarregado"><%=Model.Count + " de " + totalComentarios%></span></a>
                
            <% 
           if (bolPodeComentarPost && !bolUsuarioSemTurma && !bolSuspenso)    
           {
               if ((!bolPai || bolEducador) && !bolAcessoEscreverBloqueado)
               {
                 %>
                <div style="display:none;" class="escreverMais_" ide="<%=idMensagemRapida%>"><a href="javascript:void(0);" class="color5">Escreva um comentário...</a></div>
            <%   }
            }
       }       
}
   
%>

