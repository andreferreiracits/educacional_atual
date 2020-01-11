var urlAtual;
urlAtual = location.href;
$(function () {


    //ver todas as mensagens
    $('section.timeline').on('click', '.exibir_todos_comentarios', function (event) {
        $(this).removeClass('exibir_todos_comentarios').click(function (event) { event.preventDefault(); });
        event.preventDefault();
        $(this).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        var _this = $(this).closest('.comment_article');
        var _id = _this.closest('article').attr('ide');
        $.post('/ava/Mural/Home/TodosComentarios/' + _id, {}, function (data) {
            _this.siblings('div:not(.mensagem_gostei_container,:last)').remove();
            _this.after(data);
            _this.slideUp('fast');

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

            gostaram_dos_comentarios();

        });
    });

    //curtir mensagem
    var _clique = false;
    $('.msg_gostei').live('click', function () {
        if (!(_clique)) {
            _clique = true;
            _this = $(this);
            _id = _this.attr('ident');
            _isComment = false;
            if (_this.closest('p').attr('class').indexOf('curtir_comentario') > -1) {
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
                    var addClassdmc = "";
                    if (urlAtual.toLowerCase().indexOf("avinha") > 0 && !_isComment) {
                        addClassdmc = " megusta_ei"
                    }
                    _this.text(data).attr('class', 'msg_desgostei' + addClassdmc).hide().fadeIn('fast');
                    if (urlAtual.toLowerCase().indexOf("avinha") > 0 && !_isComment) {
                        _this.append("<i class=\"megusta\"></i>");
                    }
                    if (_isComment) {

                        _area_curticoes = _this.closest('.curtir_comentario').find('.container_cmt_curtidas');
                        _curticoes_len = _area_curticoes.text();
                        _area_curticoes.text(Number(_curticoes_len) + 1);
                        if ((Number(_curticoes_len) + 1) == 1) {
                            _this.closest('.curtir_comentario').find('.b_tooltip').css('display', 'inline');
                        }
                        //_this.closest('.curtir_comentario').find('.icon_gostei_P').effect("bounce", { times: 3 }, 300);

                        $.get('/AVA/Mural/Home/BuscaFeedCurtirComentario/' + _id, function (data) {
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
                            gostaram_dos_comentarios();
                        });
                    } else {

                        $.get('/AVA/Mural/Home/BuscaFeedCurtirMensagem/' + _id, function (data) {
                            if (data != '') {

                                _this.closest('p.discreto').next('.mensagem_gostei_container').remove();
                                _this.closest('p.discreto').after(data);
                                _this.closest('article').find('.mensagem_gostei_container').fadeIn();
                                gostaram_das_mensagens();

                            }
                        });

                    }
                },
                error: function (data) {
                    _clique = false;
                    //alert("Ocorreu um Erro no banco de dados.");
                    console.debug("Ocorreu um erro no banco de dados.");
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
            if (_this.closest('p').attr('class').indexOf('curtir_comentario') > -1) {
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
                    var addClassdmc = "";
                    if (urlAtual.toLowerCase().indexOf("avinha") > 0 && !_isComment) {
                        addClassdmc = " megusta_ei"
                    }
                    _this.text(data).attr('class', 'msg_gostei' + addClassdmc).hide().fadeIn('fast');
                    if (urlAtual.toLowerCase().indexOf("avinha") > 0 && !_isComment) {
                        _this.append("<i class=\"megusta\"></i>");
                    }
                    if (_isComment) {

                        _area_curticoes = _this.closest('.curtir_comentario').find('.container_cmt_curtidas');
                        _curticoes_len = _area_curticoes.text();
                        _area_curticoes.text(Number(_curticoes_len) - 1);
                        if ((Number(_curticoes_len) - 1) == 0) {
                            _this.closest('.curtir_comentario').find('.b_tooltip').css('display', 'none');
                        } else {
                            //_this.closest('.curtir_comentario').find('.icon_gostei_P').effect("bounce", { times:3 }, 300);
                        }

                        $.get('/AVA/Mural/Home/BuscaFeedCurtirComentario/' + _id, function (data) {
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
                            gostaram_dos_comentarios();
                        });
                    } else {

                        $.get('/AVA/Mural/Home/BuscaFeedCurtirMensagem/' + _id, function (data) {
                            _this.closest('p.discreto').next('.mensagem_gostei_container').remove();
                            if (typeof (data) != 'object') {
                                _this.closest('p.discreto').after(data);
                                _this.closest('article').find('.mensagem_gostei_container').fadeIn();
                                gostaram_das_mensagens();
                            }
                        });

                    }
                },
                error: function (data) {
                    _clique = false;
                    //alert("Ocorreu um Erro no banco de dados.");
                    console.debug("Ocorreu um Erro no banco de dados.");
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

    $('input[name=strComentario]').live('focus', function () {
        if ($(this).val() == 'Escreva um comentário...') {
            $(this).val('');
        }
    });
    $('input[name=strComentario]').live('blur', function () {
        if ($(this).val() == '') {
            $(this).val('Escreva um comentário...');
        }
    });

    var _enterT = false;
    $('section.timeline').on('keypress', 'input[name=strComentario]', function (e) {
        if (!(_enterT)) {
            _this = $(this);
            if (_this.val() != '') {
                if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    _enterT = true;
                    _id_msg = _this.attr('ident');

                    $.jStorage.deleteKey("timeline" + idUsuarioCript);

                    $.ajax({
                        url: '/AVA/Mural/Home/GravarComentario/' + _id_msg,
                        type: 'POST',
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: 'strComentario=' + _this.val(),
                        success: function (data) {
                            _this.closest('article').find('.container_comment').last().before(data);
                            _this.val('');
                            _this.closest('.comment_article').hide();
                            _enterT = false;
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
                        },
                        error: function (data) {
                            _clique = false;
                            console.debug("Ocorreu um erro no banco de dados.");
                            //alert("Ocorreu um Erro no banco de dados.");
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
    });


    //excluir comentario
    $('#ava_fluxoarticles').on('click', '.fecha_X', function (e) {
        e.preventDefault();
    });


    //denuncie
    //lightBoxAVA($('.denunciar'), { 'onComplete': callBackDenuncia });
    lightBoxAVA($('.denunciar_mensagem'), { 'onComplete': callBackDenunciaMensagem });


});



//function callBackDenuncia() {
//    $('form[name=frmDenuncia]').find('h2').css({'position':'absolute','top':'-10px'});
//    $('#enviar_email').click(function(){	
//		if ($('#txtMotivo').val() != ""){
//			$.post("/AVA/Barras/", {'strNome': $('#strNomeLogado').val(),'strLogin' : $('#strLoginLogado').val() , 'strEmail' : $('#strEmailLogado').val(), 'strURL' : $('#strURLCorrente').val(), 'strMotivo' : $('#txtMotivo').val()}, function(data){			
//				alert("E-mail enviado ao administrador de rede social!")			
//				
//			});
//		}else{
//			alert("Favor preencher o motivo!");
//			return false;
//		}
//});



var _id_c_d = null;
var _txt_c_d = null;

$('.denunciar_mensagem').live('click', function () {

    _id_c_d = $(this).closest('article').attr('ide');
    _txt_c_d = $(this).closest('article').find('.ctn_msg').text();
})

function callBackDenunciaMensagem() {
    $('form[name=frmDenuncia]').find('h2').css({ 'position': 'absolute', 'top': '-10px' });
    $('#enviar_email').click(function () {
        if ($('#txtMotivo').val() != "") {
            /*
			$.post("enviar_email_adms.asp", { 'strNome': $('#strNomeLogado').val(), 'strLogin': $('#strLoginLogado').val(), 'strEmail': $('#strEmailLogado').val(), 'strURL': $('#strURLCorrente').val(), 'strMotivo': 'Denúncia de mensagem de ID:' + _id_c_d + ' e texto: "' + _txt_c_d + '" ' + $('#txtMotivo').val() }, function (data) {
                alert("E-mail enviado ao administrador de rede social!")
               
            });
			*/
			$.ajax({
				data: { 'idMensagem': _id_c_d, 'strNome': $('#strNomeLogado').val(), 'strLogin': $('#strLoginLogado').val(), 'strEmail': $('#strEmailLogado').val(), 'strURL': $('#strURLCorrente').val(), 'strMotivo': 'Denúncia de mensagem de ID:' + _id_c_d + ' e texto: "' + _txt_c_d + '" ' + $('#txtMotivo').val() },
				type: "POST",
				url: "/AVA/Barras/Denuncia/DenunciaMensagemGravar",				
				contentType: "application/x-www-form-urlencoded;charset=ISO-8859-1",				
				success: function(data) {
				    alert("E-mail enviado ao administrador de rede social!");
				    parent.$.fancybox.close();
				}
			});

        } else {
            alert("Favor preencher o motivo!");
            return false;
        }
    });

}  

function excluirComentario(id, opt, e) {
    _id_c = id;
    _this = $(e);
    if (opt) {
        $.ajax({
            url: '/AVA/Mural/Home/ExcluirComentario/' + _id_c,
            type: 'GET',
            success: function (data) {
                _this.closest('.comment_article').fadeOut();
            },
            error: function (data) {
                _clique = false;
                console.debug("Ocorreu um erro no banco de dados.");
                //alert("Ocorreu um Erro no banco de dados.");
                _enterT = false;
            }
        });
    } else {
        _this.closest('.exc_c').hide();
    }
}

function excluirMensagem(id, opt,e) {
    _id_msg = id;
    _this = $(e);
    if (opt) {


        $.ajax({
            url: '/AVA/Mural/Home/ExcluirMensagemRapida/' + _id_msg,
            type: 'GET',
            success: function (data) {
                _this.closest('article').fadeOut();
            },
            error: function (data) {
                _clique = false;
                //alert("Ocorreu um Erro no banco de dados.");
                console.debug("Ocorreu um Erro no banco de dados.");
                _enterT = false;
            }
        });
        
    } else {
        _this.closest('.black_tip_center').hide();
    }

}

function gostaram_das_mensagens() {
    $('.quem_gostou_msg').each(function () {
        var _this = $(this);
        var o = { 'autoDimensions': false, 'width': 700, 'height': 470, 'onComplete': function () {
            var $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + _this.closest('article').attr('ide');

            //$urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idMensagemRapida="+_this.closest('article').attr('ide');
            retornaJson($urlSeguidosCompleto);

        } 
        }
        lightBoxAVA(_this, o);
    });
}

function gostaram_dos_comentarios() {
    $('.quem_gostou_cmt').each(function () {
        var _this = $(this);
        var o = { 'autoDimensions': false, 'width': 700, 'height': 470, 'onComplete': function () {
            var $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idMensagemRapida=&idComentario=" + _this.attr('ide');

            //$urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idMensagemRapida="+_this.closest('article').attr('ide');
            retornaJson($urlSeguidosCompleto);

        }
        }
        lightBoxAVA(_this, o);
    });
}