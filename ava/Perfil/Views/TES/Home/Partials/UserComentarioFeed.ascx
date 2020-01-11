<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Perfil.Models.MensagemRapidaComentario>" %>
<%
    
    string uAgent = Request.UserAgent.ToLower();
    bool bolMobile = false;
    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }
    
    int idUsuarioCmt = Model.IdUsuario;
    bool bolAdmin = false;
    if (ViewData["admRede"] != null && ViewData["admRede"].ToString() != "")
    {
        bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
    }
    
 %>
<div style="" class="comment_article clearfix container_comment">
                                
    <%
       
        
    if ((int)ViewData["idUsuarioLogado"] == idUsuarioCmt || (int)ViewData["idOwner"] == (int)ViewData["idUsuarioLogado"] || bolAdmin)
    { 
        %>
        <span class="fecha_X <%=bolMobile ? "mobile" : "" %>" ident="<%:Model.IdComentario%>" data-idcomentario="<%:Model.IdComentario%>"></span>                                        
        <%
    } 
    %>
    <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>" title="" alt=""  class=""><img alt="<%:Model.strNome %>" width="35" height="35" src="<%:Model.strMiniFoto %>" class="avatar_tl avatar_comentario" /></a>
    <div class="embrulho break-word">
                                   
        <span class="comment_postado e-p-c ctn_msg">  <h2><a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>" title="" alt=""  class=""><%:Model.strNome%></a> &nbsp; </h2> <%=Model.txtComentario%></span>
                                    
        <p class="discreto curtir_comentario">
            <%:Model.strTempoPublicacao%>
            <% 
            if ((bool)ViewData["bolAcessoEscrever"] && !((bool)ViewData["bolSuspensao"]))
            {
                if (Model.bolCurtiu)
                {
                    if ((bool)ViewData["bolExcluido"] == false && (int)ViewData["idEstado"] != 6)
                    {
                        %>
                        <a style="cursor: pointer;" ident="<%:Model.IdComentario %>" class="msg_desgostei">gostar (desfazer) </a>
                        <%
                    }
                }
                else
                {
                    if ((bool)ViewData["bolExcluido"] == false && (int)ViewData["idEstado"] != 6)
                    {
                        %>
                        <a style="cursor: pointer;" ident="<%:Model.IdComentario %>" class="msg_gostei">gostar </a>
                        <%
                    }
                }
            }
            else if ((bool)ViewData["bolVisitantePai"])
            {
                if (Model.bolCurtiu)
                {
                    if ((bool)ViewData["bolExcluido"] == false && (int)ViewData["idEstado"] != 6)
                    {
                       %>
                       <a style="cursor: pointer;" ident="<%:Model.IdComentario %>" class="msg_desgostei">gostar (desfazer) </a>
                       <%
                    }
                }
                else
                {
                    if ((bool)ViewData["bolExcluido"] == false && (int)ViewData["idEstado"] != 6)
                    {    
                        %>
                        <a style="cursor: pointer;" ident="<%:Model.IdComentario %>" class="msg_gostei">gostar </a>
                        <%
                    }
                }
            } 
            %>
            <a class="a_gostei b_tooltip" alt="" title="" href="#"  style="<%if (Model.intCurtidas <= 0) {%>display:none;<%} %>" ><i class="icon_gostei_P"></i> <span class="container_cmt_curtidas"><%:Model.intCurtidas%></span></a>
                                    
        </p>
        <span class="black_tip_center tooltip">
            <%Html.RenderPartial("../Home/Partials/FeedCurtirComentario", Model, new ViewDataDictionary { { "idUsuario", (int)ViewData["idVisitante"] }, { "bolSuspensao", (bool)ViewData["bolSuspensao"] } });%>
        </span>
    </div>
    <!--<span class="black_tip_center tooltip exc_c" style="width:200px;">
        <p>Deseja realmente excluir?</p>
        <a onclick="excluirComentario(<%:Model.IdComentario%>, true, this)" class="bt_normal green" href="javascript: void(0);">sim</a>
        <a onclick="excluirComentario(<%:Model.IdComentario%>, false, this)" class="bt_normal red" href="javascript: void(0);">não</a>
        <span class="black_tip_seta">&#9660;</span>
    </span>-->
</div>   
