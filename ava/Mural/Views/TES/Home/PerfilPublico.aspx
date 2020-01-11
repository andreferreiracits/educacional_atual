<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Site.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Mural.Models.MainPerfilPrivado>" %>



<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">   
    
    <script type="text/javascript" defer="defer" >
        $(function () {

            $('#compartilhar').css('display','block');

            /********************************************************************
            * Carrega Veja Mais mensagens rápidas
            ********************************************************************/
            var intInicioMsgPublica = 2;

            $('.vejaMais_MR').live('click', function () {
                //busca o id do hidden no final da view
                var id = $('#id').val();

                //carrega o loader
                $('.vejaMais_MR').html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

                //posta a requisicao
                $.post("/AVA/Mural/Home/TimeLinePublico?id=" + id + "&intInicio=" + intInicioMsgPublica, function (data) {
                    //sem nao tem msgs
                    if (data.indexOf('semMsgsRapidas') > 0) {
                        $('#ava_footervejamais').hide();
                    }
                    //se tem menos de 10 na requisicao
                    else if (data.indexOf('poucasMsgsRapidas') > 0) {
                        var _intPos = data.indexOf('poucasMsgsRapidas');                        
                        var _append = data.substring(0, _intPos - 28);

                        $('#ava_fluxoarticles').append(_append);
                        $('#ava_footervejamais').hide();
                    }
                    //se retorno as 10
                    else {
                        $('#ava_fluxoarticles').append(data);
                        intInicioMsgPublica += 1;
                        $('.vejaMais_MR').html("Veja mais");
                    }
                });

                //remove o foco do veja mais
                $(this).blur();
            });

            /********************************************************************
            * Carrega tip de opções de mensagens rápidas
            ********************************************************************/
            $('.ava_opcoesTimeline').cluetip({ cluetipClass: 'rounded', dropShadow: false, ajaxCache: false, arrows: false });
            
            var strMensagemPadrao = "Olá! Compartilhe aqui ideias ou links!";
            $('#txtInput').live('keyup', function () {
                var strMensagem = $(this).val();


                if (strMensagem == '' || strMensagem == strMensagemPadrao) {
                    $('#compartilhar').addClass('disable');
                    $('#compartilhar').unbind('click', validaMensagemRapida);
                } else {
                    $('#compartilhar').removeClass('disable');
                    $('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
                }

            });


           //elementos comuns
            //curtir mensagem
            var _clique = false;
            $('.msg_gostei').live('click', function () {
                if (!(_clique)) {
                    _clique = true;
                    _this = $(this);
                    _id = _this.attr('ident');
                    _isComment = false;
                    if(_this.closest('p').attr('class').indexOf('curtir_comentario') > -1){
                        _isComment = true;
                    }
                    if (_isComment) {
                        _url = '/AVA/Mural/Home/CurtirComentario/';
                    }
                    else {
                        _url = '/AVA/Mural/Home/CurtirMensagem/';
                    }
                    $.ajax({
                        url: _url + _id,
                        type: 'POST',
                        success: function (data) {
                            _clique = false;
                            _this.text(data).attr('class', 'msg_desgostei').hide().fadeIn('fast');
                            if(_isComment){

                                _area_curticoes = _this.closest('.curtir_comentario').find('.container_cmt_curtidas'); 
                                _curticoes_len = _area_curticoes.text();
                                _area_curticoes.text(Number(_curticoes_len) + 1);
                                if((Number(_curticoes_len) + 1) == 1){
                                    _this.closest('.curtir_comentario').find('.b_tooltip').css('display','inline');
                                }
                                _this.closest('.curtir_comentario').find('.icon_gostei_P').effect("bounce", {times:3}, 300);

                                $.get('/AVA/Mural/Home/BuscaFeedCurtirComentario/'+_id, function(data){
                                    //_this.closest('.curtir_comentario').next('.tooltip').remove();
                                    _this.closest('.curtir_comentario').next('.tooltip').html(data);
                                    _this.closest('.curtir_comentario').find('.b_tooltip').tooltip({
                                        offset: [0, 0],
                                        opacity: 1,
                                        position: 'top center',
                                        effect: 'slide',
                                        relative: true,
                                        delay: 200
                                    });
                                 });
                            }else{
                                                                
                                $.get('/AVA/Mural/Home/BuscaFeedCurtirMensagem/'+_id, function(data){
                                    if(data != ''){

                                        _this.closest('p.discreto').next('.mensagem_gostei_container').remove();
                                        _this.closest('p.discreto').after(data);
                                        _this.closest('article').find('.mensagem_gostei_container').fadeIn();
                                        
                                    }
                                });
                                
                            }
                        },
                        error: function (data) {
                            _clique = false;
                            alert("Ocorreu um Erro no banco de dados.");
                        }
                    });
                }
            }).css('cursor', 'pointer');

            $('.msg_desgostei').live('click', function () {
                if (!(_clique)) {
                    _clique = true;
                    _this = $(this);
                    _id = _this.attr('ident');
                    _isComment = false;
                    if(_this.closest('p').attr('class').indexOf('curtir_comentario') > -1){
                        _isComment = true;
                    }
                    if (_isComment) {
                        _url = '/AVA/Mural/Home/DescurtirComentario/';
                    }
                    else {
                        _url = '/AVA/Mural/Home/DescurtirMensagem/';
                    }
                    $.ajax({
                        url: _url + _id,
                        type: 'POST',
                        success: function (data) {
                            _clique = false;
                            _this.text(data).attr('class', 'msg_gostei').hide().fadeIn('fast');
                            if(_isComment){

                                _area_curticoes = _this.closest('.curtir_comentario').find('.container_cmt_curtidas'); 
                                _curticoes_len = _area_curticoes.text();
                                _area_curticoes.text(Number(_curticoes_len) - 1);
                                if((Number(_curticoes_len) - 1) == 0){
                                    _this.closest('.curtir_comentario').find('.b_tooltip').css('display','none');
                                }else{
                                    _this.closest('.curtir_comentario').find('.icon_gostei_P').effect("bounce", { times:3 }, 300);
                                }

                                $.get('/AVA/Mural/Home/BuscaFeedCurtirComentario/'+_id, function(data){
                                    //_this.closest('.curtir_comentario').next('.tooltip').remove();
                                    _this.closest('.curtir_comentario').next('.tooltip').html(data);
                                    _this.closest('.curtir_comentario').find('.b_tooltip').tooltip({
                                        offset: [0, 0],
                                        opacity: 1,
                                        position: 'top center',
                                        effect: 'slide',
                                        relative: true,
                                        delay: 200
                                    });
                                    
                                 });
                            }else{
                                
                                $.get('/AVA/Mural/Home/BuscaFeedCurtirMensagem/'+_id, function(data){
                                        _this.closest('p.discreto').next('.mensagem_gostei_container').remove();
                                        if(typeof(data) != 'object'){
                                            _this.closest('p.discreto').after(data);
                                            _this.closest('article').find('.mensagem_gostei_container').fadeIn();
                                        }
                                });
                                
                            }
                        },
                        error: function (data) {
                            _clique = false;
                            alert("Ocorreu um Erro no banco de dados.");
                        }
                    });
                }
            }).css('cursor', 'pointer');

            //mostrar comentario
            $('.msg_comente').live('click', function (e) {
                e.preventDefault();
                _this = $(this);
                $('.container_comment').has('input[type=text]').not(_this.closest('article').find('.container_comment')).hide();
                _this.closest('article').find('.container_comment:last').fadeIn();
                _this.closest('article').find('input[type=text]').focus();
            });

            //comentar

            $('input[name=strComentario]').focus(function(){
                if($(this).val() == 'Escreva um comentário...'){
                    $(this).val('');
                }
            });
            $('input[name=strComentario]').blur(function(){
                if($(this).val() == ''){
                    $(this).val('Escreva um comentário...');
                }
            });

            var _enterT = false;
            $('input[name=strComentario]').live('keypress', function (e) {
                if (!(_enterT)) {
                    _this = $(this);
                    if (_this.val() != '') {
                        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                            _enterT = true;
                            _id_msg = _this.attr('ident');
                            $.ajax({
                                url: '/AVA/Mural/Home/GravarComentario/' + _id_msg,
                                type: 'POST',
                                data: 'strComentario=' + _this.val(),
                                success: function (data) {
                                    _this.closest('article').find('.container_comment').last().before('<div style="" class="comment_article clearfix container_comment"><span class="fecha_X" ident="'+data+'"></span><img alt="" width="35" height="35" src="<%:Model.strMiniFoto%>" class="avatar_tl avatar_comentario" /><div class="embrulho"><h2><%:Model.strNome%> disse:  </h2><span class="comment_postado">  ' + _this.val() + '</span><p class="discreto curtir_comentario"><a style="cursor: pointer;" ident="' + data + '" class="msg_gostei">curtir </a></p></div></div>');
                                    _this.val('');
                                    _this.closest('.comment_article').hide();
                                    _enterT = false;
                                },
                                error: function (data) {
                                    _clique = false;
                                    alert("Ocorreu um Erro no banco de dados.");
                                    _enterT = false;
                                }
                            });
                        }
                    }
                }
            });

            //excluir mensagem
            $('.excluir_mensagem').live('click', function (e) {
                e.preventDefault();
                _id_msg = $(this).attr('ident');
                _this = $(this);
                $.ajax({
                    url: '/AVA/Mural/Home/ExcluirMensagemRapida/' + _id_msg,
                    type: 'GET',
                    success: function (data) {
                        _this.closest('article').fadeOut();
                    },
                    error: function (data) {
                        _clique = false;
                        alert("Ocorreu um Erro no banco de dados.");
                        _enterT = false;
                    }
                });
            });

            //excluir comentario
            $('#ava_fluxoarticles').on('click', '.fecha_X', function (e) {
                e.preventDefault();
                _id_c = $(this).attr('ident');
                _this = $(this);
                $.ajax({
                    url: '/AVA/Mural/Home/ExcluirComentario/' + _id_c,
                    type: 'GET',
                    success: function (data) {
                        _this.closest('.comment_article').fadeOut();
                    },
                    error: function (data) {
                        _clique = false;
                        alert("Ocorreu um Erro no banco de dados.");
                        _enterT = false;
                    }
                });
            });

        });
        
        function validaMensagemRapida() {
            $('#compartilhar').addClass('disable');
            //$('#ava_fluxoarticles').prepend('<article class="waiting_for_feed <%if (Model.bolEducador){%> highlight <%} %>"><div style="text-align:center;"><img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif"></div></article>');
            
            $.ajax({
                url: '/AVA/Mural/Home/SaveMensagemPublico/'+<%:Model.idUsuario%>,
                type: 'POST',
                data: 'StrMensagem='+ $('#txtInput').val(),
                success: function (data) {
                    $('#txtInput').val('');
                    $('#txtInput').css("height","48px");
                    $('#txtInput').siblings(":last").html('');
                    //$('#ava_fluxoarticles').find('.waiting_for_feed').html('').css('height','16px').html(data).slideDown().removeClass('waiting_for_feed').addClass('clearfix')<%if (Model.bolEducador){%>.addClass('highlight')<%} %>;
                    $('#ava_fluxoarticles').prepend(data).find('article:first')<%if (Model.bolVisitanteEducador){%>.addClass('highlight')<%} %>.slideDown(1000);
                    $('#busca_especifico').val('').keyup();
                    
                },
                error: function (data) {

                    alert("Ocorreu um Erro no banco de dados.");
                    $('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);

                }
            }); 
           
        }        
        
    </script>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
		
    <%
    if(Model.bolAcessoEscrever)
    {
        Html.RenderPartial("Partials/MensagemRapida"); 
    }
    %> 
    
    <section class="hs1">		        
        <section class="timeline">
            <header>
                <h1 class="blokletters"><div class="icon_li mural"></div>MURAL</h1>
               
                <!--div class="filtrar_tl">Filtrar por: <a href="#" class="lajotinha"><span class="add">Minha Turma &#9660;</span></a></div>
                <div class="filtrar_pr"><a href="#" class="current">Principais<span>▲</span></a></div>
                <div class="filtrar_pr"><a href="#" class="">Recentes<span>▲</span></a></div-->
            </header>        

            <div id="ava_fluxoarticles">
                <%Html.RenderPartial("Partials/TimeLine", Model); %>     
            </div>             
            
            <%if(Model.TimeLinePrivado.mensagens.Count == 10) { %>
                <footer id="ava_footervejamais" class="blokletters">                
                    <a href="javascript: return false;" title="Veja mais" alt="Veja mais" class="vejaMais_MR">Veja mais</a>
                    <input type="hidden" id="id" value="<%=Model.idUsuario %>" />
                </footer>
            <%
            }
            %>

        </section>	
    </section><!-- .hs1 -->
</asp:Content>














































