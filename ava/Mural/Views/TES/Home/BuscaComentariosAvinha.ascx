<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MensagemRapidaComentario>" %>
<%
    int idUsuarioCmt    = Model.IdUsuario;
    bool bolAdmin       = false;
    var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 0;
    var idUsuarioLogado = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idUsuarioLogado"] : 0;
    
    if (ViewData["admRede"] != null && ViewData["admRede"].ToString() != "")
    {
        bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
    }
    %>
    <div class="item_coment">
        <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>" title="<%=Model.strNome %>" class="">
            <img title="<%:Model.strNome %>" width="60" height="60" src="<%:Model.strMiniFoto %>" class="avatar" />
        </a>
        <div class="">
		    <span class="seta"></span>
            <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>" title="<%=Model.strNome %>" class=""><%:Model.strNome %></a>
            <br /><span><%:Model.strTempoPublicacao%></span>
                <% 
                 if ((bool)ViewData["bolAcessoEscrever"] || (bool)ViewData["bolPai"]) {
                        if (Model.bolCurtiu){
                            %>
                                <a class="botao_curtir_comentario active" idComentario="<%=Model.IdComentario %>" href="javascript:;"></a>
                            <%
                        }else{
                            %>
                                <a class="botao_curtir_comentario" idComentario="<%=Model.IdComentario %>" href="javascript:;"></a>
                            <%
                        }   
                    
                    }
                 %>
                <div class="curtidas_comentario_<%=Model.IdComentario %> feedTotalGostaram">
                    <%Html.RenderPartial("Partials/ListaCurticoesComentario", Model, new ViewDataDictionary { { "idFerramentaTipo", idFerramentaTipo }, { "idUsuarioLogado", idUsuarioLogado } });%>
                </div>
            <p class="ctn_msg"><%=Model.txtComentario%></p>
		</div>
    </div>