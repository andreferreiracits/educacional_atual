<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MainPerfilPrivado>" %>

<input type="hidden" id="strNomeLogado" value="<%:Model.strNome%>" />
<input type="hidden" id="strMiniFotoLogado" value="<%:Model.strMiniFoto%>" />
<input type="hidden" id="strLoginLogado" value="<%:Model.strLogin%>" />
<input type="hidden" id="strEmailLogado" value="<%:Model.strEmail%>" />
<input type="hidden" id="strURLCorrente" value="<%:HttpContext.Current.Request.Url.AbsoluteUri%>" />




<script type="text/javascript">
    $(function () {
        $(".e-wrap .ctn_msg").expander({
            slicePoint: 500,
            window: 2,
            expandText: ' leia mais',
            expandPrefix: '...',
            userCollapseText: 'menos',
            preserveWords: true,
            expandEffect: 'fadeIn',
            collapseEffect: 'fadeOut'
        });
        $('.mr_opcoes').on('click', function (e) { e.preventDefault(); });

        $(".b_tooltip").each(function () {
            $(this).tooltip({
                offset: [0, 0],
                opacity: 1,
                position: 'top center',
                effect: 'slide',
                relative: true

            });

            $(this).click(function (e) { e.preventDefault(); });
        });

        /*$(".b_tooltip_curtido").each(function () {
        $(this).tooltip({
        offset: [0, 0],
        opacity: 1,
        position: 'top center',
        effect: 'slide',
        relative: true

        });
        });*/

        $(".b_tooltip_center").each(function () {
            $(this).tooltip({
                offset: [10, 450],
                opacity: 1,
                position: 'top center',
                effect: 'slide',
                relative: true,
                events: {
                    def: 'click, mouseout'
                },
                delay: 350,
                tip: $(this).closest('article').find('.black_tip_center')
            });

            $(this).click(function (e) { e.preventDefault(); });
        });

        $(".fecha_X").each(function () {
            $(this).tooltip({
                offset: [0, 0],
                opacity: 1,
                position: 'top center',
                effect: 'slide',
                relative: true,
                events: {
                    def: 'click, mouseout'
                },
                delay: 350,
                tip: $(this).closest('.comment_article').find('.exc_c')
            });

            $(this).click(function (e) { e.preventDefault(); });
        });

        //lightboxAVA($('.denunciar'), {});  

    });
</script>

<% 
    
    bool bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
    
        if (Model.TimeLinePrivado.mensagens.Count > 0)
        {
            int contador = 0;
            foreach (var item in Model.TimeLinePrivado.mensagens)
            {
                contador++;
                int idUsuarioMsg = item.IdUsuario;
                int idMensagemRapida = item.IdMensagemrapida;
                int idUsuarioLogado = Model.idVisitante > 0 ? Model.idVisitante : Model.idUsuario;
                
    %>
                <article class="clearfix article_ei " ide="<%:idMensagemRapida%>">
                	<div class="ei_speech_bubble">
                	<span class="blokletters speech_ei ctn_msg"><%= item.StrMensagem.ToUpper() %></span>
                    <span class="seta_ei"></span>
                    <span class="sombra_ei"></span>
                    </div>
                    <img class="avatar_tl" src="<%: item.strMiniFoto %>" width="100" height="100" alt="avatar"> 
                    <div class="din nome_tia">Tia <%= item.strNome %></div>
                    <p class="discreto ei_p"><%= item.strTempoPublicacao %> 
                    <%
                    if (item.bolCurtiu)
                    {
                    %>
                        <!--<a ident="<%:idMensagemRapida%>" class="msg_desgostei" style="cursor:pointer;">gostar (desfazer)</a>-->
                        <a ident="<%:idMensagemRapida%>" style="cursor:pointer;" title="persona" alt="persona" class="megusta_ei msg_desgostei">gostar (desfazer)<i class="megusta"></i></a>
                    <%
                    }  else  {
                    %>
                        <!--<a ident="<%:idMensagemRapida%>" class="msg_gostei" style="cursor:pointer;">gostar</a>-->
                        <a ident="<%:idMensagemRapida%>" style="cursor:pointer;" title="persona" alt="persona" class="megusta_ei msg_gostei">gostar<i class="megusta"></i></a>
                    <%
                    }
                    %>
                    </p>
                    <%Html.RenderPartial("Partials/FeedCurtirMensagem", item, new ViewDataDictionary { { "idUsuario", Model.idVisitante } });%>
                    <%
                    if(item.totalComentarios > 3){
                    %>
                    <div class="comment_article clearfix"><i class="ui-img-nots ui-img-quote"></i> <a class="exibir_todos_comentarios" alt="Exibir mais comentários" title="Exibir mais comentários" href="#">Exibir todos os <%:item.totalComentarios%> comentários</a></div>
                    <%                    
                    }
                    %>
                    <% foreach (var item_c in item.comentarios){
                            Html.RenderPartial("Partials/UserComentarioFeed", item_c, new ViewDataDictionary { { "idUsuarioLogado", idUsuarioLogado }, { "idVisitante", Model.idVisitante }, { "bolSuspensao", Model.bolSuspenso }, { "bolAcessoEscrever", Model.bolAcessoEscrever }, { "idOwner", item.IdUsuario }, { "admRede", ViewData["admRede"] } });
                            
                    }%>
                                
                        
                        
                    <div class="comment_article clearfix container_comment" style="display:none;"> 
                        <img height="33" width="33" alt="<%=Model.strNome %>" src="<%=Model.strMiniFoto %>" class="avatar_tl" />
                        <div class="wrap_avaEComent Smallwrap_avaEComent ">
                        <input class="avaEComent ph" value="Escreva um comentário..."  title="Escreva um comentário..." placeholder="Escreva um comentário..." name="strComentario" onfocus="" autocomplete="off" ident="<%:idMensagemRapida%>" type="text" />
                        </div>
                    </div>
                     
                </article>
              
     

    <%    
                if(contador == 2){
                    break;
                }
            }
            
        //Se tiver menos de 10 esconde o veja mais
        if (Model.TimeLinePrivado.mensagens.Count < 10)
        {
    %>      <input type="hidden" value="poucasMsgsRapidas" />    
    <%
        }
    }
    else
    {
    %>
        <article class="clearfix highlight ">Nenhuma mensagem por enquanto.</article>
        <input type="hidden" value="semMsgsRapidas" />
    <%
    }
    %>
    <%if(Model.TimeLinePrivado.mensagens.Count == 10) { %>
        <footer id="ava_footervejamais" class="blokletters">
            <!-- incite a riot: http://24ways.org/2009/incite-a-riot -->
            <a href="#" title="Veja mais" alt="Veja mais" class="vejaMais_MR">Veja mais</a>
            <input type="hidden" id="id" value="<%=Model.idUsuario %>" />
        </footer>
    <%} %>
   
    