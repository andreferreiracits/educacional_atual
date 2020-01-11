//SELETOR AVA
(function ($) {
    $.fn.seletorAVA = function (opcoes) {


        var defaults = {
            turma: true,
            seguidor: false,
            professor: false,
            callBack: null
        }

        var s = $.extend(defaults, opcoes)

        return this.each(function () {



            //caixa de elementos compartilhamento
            var _compartilhamento = $(this).find('.compartilhamento');
            //troca de pessoas
            var _troca_persona = _compartilhamento.find('.troca_persona');
            //selecao de pessoas
            var _selecao_personas = $(this).find('.selecao_personas');
            //campo de busca
            var _campo_busca = $(this).find('.campo-busca');
            //busca especifica
            var _busca_especifico = $(this).find('.busca_especifico');
            //elemento p-a-perso
            var _p_a_perso = $(this).find('.p-a-perso');




            if (s.turma == true && (s.professor == false && s.seguidor == false)) {
                _compartilhamento.find('.todos').find('a:first').text('Minhas turmas ');
            }



            //personalizando no momento caixa de selecao personas
            var _personalizando = null;
            //personalizando no momento caixas do compartilhe
            var _editando = null;

            //o elemento todos não é configurável
            _compartilhamento.find('.todos').find('.small').click(function (e) {
                e.preventDefault()
            }).css('cursor', 'default');


            //mostra a selecao de elementos
            _troca_persona.toggle(function (e) {
                e.preventDefault();
                _selecao_personas.fadeIn('fast');
                _campo_busca.fadeIn().find('input').focus();
            }, function (e) {
                e.preventDefault();
                _selecao_personas.hide();
                _campo_busca.hide();
            });


            //armazenamento de usuários iniciais
            var _meus_grupos = new Array();

            //selecao de grupo e pessoas
            _selecao_personas.find('.p-a-default').live('click', function (e) {

                e.preventDefault();
                var _el_original = $(this).closest('li');
                var _el = $(this).closest('li').clone();
                _el.css('display', 'none');
                _el.find('a.p-a-perso').remove();
                _el.find('.p-a-default-img').remove();
                _el.find('a:first').attr('class', 'small awesome awesome-color');
                _el.append('<a class="small-x awesome-x awesome-x-color" href="#">x</a>');
                //personalizacao apenas se nao for usuario especifico
                if (!(_el.hasClass('especifico')) && !(_el.hasClass('todos'))) {
                    AttachLightBoxAVA(_el.find('.small'));
                } else {
                    _el.find('.small').css('cursor', 'default').click(function (e) { e.preventDefault() });
                }
                _el.find('span.discreto').removeClass('discreto');

                //carrega os usuários
                if (_el.hasClass('unico')) {

                    //_compartilhamento.find('.troca_persona').closest('li').before(_el);
                    if (_meus_grupos[_el.attr('ident')]) {
                        if (!(_personalizando)) {
                            for (r = 0; r < _meus_grupos[_el.attr('ident')].Result.length; r++) {
                                _el.find('a:last').after('<input type="hidden" ident="' + _meus_grupos[_el.attr('ident')].Result[r].id + '">');
                            }
                        }
                        _troca_persona.closest('li').before(_el);

                    } else {
                        $.getJSON('/AVA/Perfil/Home/SelecaoJSON?tipo=' + _el.attr('ident'), null, function (data) {
                            _meus_grupos[_el.attr('ident')] = data;
                            if (!(_personalizando)) {
                                for (r = 0; r < data.Result.length; r++) {
                                    _el.find('a:last').after('<input type="hidden" ident="' + data.Result[r].id + '">');
                                }
                            }
                            _troca_persona.closest('li').before(_el);

                            _troca_persona.text('Alterar ');
                        });
                    }

                } else {
                    _troca_persona.closest('li').before(_el);
                }

                if (_el.hasClass('especifico')) {
                    _busca_especifico.keyup();
                }
                _el.fadeIn();
                //verifica se é item individual e remove todos
                if (_el_original.hasClass('unico') || _el_original.hasClass('especifico')) {
                    _compartilhamento.find('li.todos').find('.small-x').click();
                }

                //verifica se existe algum elemento
                if (_compartilhamento.find('.small').length <= 0) {
                    //muda texto
                    _troca_persona.text('+ Adicionar pessoas ');

                } else {
                    _troca_persona.text('Alterar ');
                }
                //remove elementos caso seja selecionado todos
                if (_el_original.hasClass('todos')) {
                    _compartilhamento.find('.unico, .especifico').each(function () {
                        $(this).find('.small-x').click();
                    });
                }

                _el_original.remove();

            });

            //grupos e pessoas selecionadas
            //salva todos caso seja clicado antes de carregar a rede do usuario no selecao personas
            _todos_clone = null;
            _compartilhamento.find('.small-x').live('click', function (e) {

                e.preventDefault();
                var _el_original = $(this).closest('li');
                var _el = $(this).closest('li').clone();

                //salva todos para carregamento inicial (caso o usuario clique no todos antes do carregamento)
                if (!(_todos_clone) && _el_original.hasClass('todos')) {
                    _todos_clone = _el_original;
                }

                //joga no selecao de pessoas apenas se nao for usuario especifico
                if (!(_el.hasClass('especifico'))) {
                    _el.css('display', 'none');
                    _el.find('a.small-x').remove();
                    _el.find('a:first').attr({ 'class': 'p-a-default' }).css('cursor', 'pointer');
                    _el.append('<a class="p-a-perso invert" href="#">Personalizar</a></li>');
                    //remove os elementos selecionados
                    //_el.find('input[type=hidden]').remove();
                    AttachLightBoxAVA(_el.find('.p-a-perso'));

                    //no caso de exclusao enquanto o usuario busca usuarios especificos
                    _el_aux = null;

                    if (_selecao_personas.find('.especifico').length > 0 || _selecao_personas.find('li.especifico-nenhum').length > 0) {
                        _ul_aux = _ul_rede_original;
                    } else {
                        _ul_aux = _selecao_personas.find('ul');
                    }

                    if (_el.hasClass('todos')) {
                        _el.addClass('p_all p_bg');
                        _el.find('.p-a-perso').remove();
                        _ul_aux.find('li:first').after(_el);
                    } else {
                        _ul_aux.find('li:last').after(_el);
                    }

                    //remove elementos selecionados
                    _el.find('input[type=hidden]').remove();
                    //total de elementos original
                    _el.find('span').text('(' + _el.find('span').attr('all_el') + ')').addClass('discreto');

                    _el.fadeIn();
                    _el_original.remove();
                } else {
                    _el_original.remove();
                    if (_busca_especifico.val() != '') {
                        _busca_especifico.keyup();
                    }
                }
                //remove elemento original

                //verifica se existe algum elemento
                if (_compartilhamento.find('.small').length <= 0) {
                    //muda texto
                    _troca_persona.text('+ Adicionar pessoas ');
                } else {
                    _troca_persona.text('Alterar ');
                }

            });

            //MONTA SELECAO DE ELEMENTOS
            _troca_persona.one('click', function () {
                $.ajax({
                    type: 'POST',
                    url: '/AVA/Perfil/Home/SelecaoElementosCompartilhar/',
                    data: 'turma=' + s.turma + '&seguidor=' + s.seguidor + '&professor=' + s.professor,
                    success: function (html) {
                        _selecao_personas.html(html);

                        _busca_especifico.fadeIn('fast').focus();

                        //personalizar
                        _p_a_perso = $('.p-a-perso');
                        var _els = _p_a_perso;

                        _els.each(function () {

                            AttachLightBoxAVA($(this));
                        });

                        if (_todos_clone) {
                            _compartilhamento.find('.todos').remove();
                            _todos_clone.appendTo(_compartilhamento.find('ul')).find('.small-x').click();
                        }

                        if (s.callBack) {
                            eval(s.callBack + '();');
                        }
                    }
                });

            });


            //BUSCA REDE COMPLETA DO USUARIO
            var xmlRede = null;
            var xmlRede_trigger = null;
            var _ul_rede_original = null;

            _busca_especifico.one('keyup', function () {
                _ul_rede_original = _selecao_personas.find('ul').clone();
                _selecao_personas.html('<ul><li style="text-align:center;margin:10px 0;width:150px" class=""><img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif"></li></ul>');
                $.getJSON('/AVA/Perfil/Home/SelecaoRedeCompleta/', { 'turma': s.turma, 'professor': s.professor, 'seguidor': s.seguidor }, function (data) {

                    xmlRede = data.Result;

                    _busca_especifico.live('keyup', function () {
                        if ($(this).val() != '') {
                            if (!(_ul_rede_original)) {
                                _ul_rede_original = _selecao_personas.find('ul').clone();
                            }
                            _selecao_personas.find('ul').html('');

                            var _cont = 0
                            for (r = 0; r < xmlRede.length; r++) {

                                if ((xmlRede[r].strNome.toLowerCase().indexOf($(this).val().toLowerCase()) > -1 || xmlRede[r].strApelido.toLowerCase().indexOf($(this).val().toLowerCase()) > -1) && (_compartilhamento.find('.especifico[ident=' + xmlRede[r].id + ']').length <= 0)) {


                                    bolTemUser = true;

                                    var strHTML = "";
                                    _selecao_personas.find('ul').append('<li ident="' + xmlRede[r].id + '" class="especifico"><a class="p-a-default p-a-default-img" href="#"><img height="28" width="28" src="' + xmlRede[r].strMiniFoto + '"> </a><a class="p-a-default" href="#">' + xmlRede[r].strApelido + ' </a></li>');

                                    _cont++;
                                }
                                if (_cont > 4) {
                                    break;
                                }
                            }
                            if (_cont == 0) {
                                _selecao_personas.find('ul').append('<li class="p_bg p_dica discreto especifico-nenhum">Nenhum usuário encontrado.</li>');
                            }
                        } else {
                            if (_ul_rede_original) {
                                _selecao_personas.html(_ul_rede_original);
                            }
                            _selecao_personas.find('.p-a-perso').each(function () {
                                AttachLightBoxAVA($(this));
                            });
                            _ul_rede_original = null;
                        }



                    });

                    if (!(xmlRede_trigger)) {
                        xmlRede_trigger = 1;
                        _busca_especifico.keyup();

                    }

                }); //getJson

            });



            function retornaJsonSelecao(caminho, _ident) {



                function workOnJSON(data) {

                    var xml = null;
                    xml = data.Result;

                    $("#myContentTemplate").tmpl(data).appendTo("#ava_contentlista");
                    $("#ava_contentlista #ava_loader").css("display", "none");

                    //verifica se está selecionado
                    $('#ava_contentlista').find('.carteirinha').each(function () {
                        var _carteirinha_selected = "";
                        if (_personalizando.closest('li').find('input[type=hidden][ident=' + $(this).attr('ident') + ']').length > 0) {
                            i_carteirinhas++;
                            $(this).addClass('carteirinha_selected');
                        }

                    });


                    $("#txtFiltroAva").live('keyup', function () {
                        if ($(this).attr('idusuario')) {
                            _id = $(this).attr('idusuario')
                        } else {
                            _id = 0
                        }
                        FiltrarUsuarioSelecao('#ava_contentlista', xml, $(this).val(), _id);
                    });

                    $("#txtFiltroAva").live('focus', function () {
                        if ($(this).val() == "Filtrar por nome") {
                            $(this).val("");
                        }
                    })

                    $("#txtFiltroAva").live('blur', function () {
                        if ($(this).val() == "") {
                            $(this).val("Filtrar por nome");
                        }
                    })
                }

                if (_meus_grupos[_ident]) {
                    workOnJSON(_meus_grupos[_ident]);
                } else {
                    $.getJSON(caminho, null, function (data) {
                        workOnJSON(data);
                        _meus_grupos[_ident] = data;
                    });
                }

                //getJson
            }

            function FiltrarUsuarioSelecao(e, j, s, u) {
                $(e).html("");

                if (s) {
                    var bolTemUser = false;
                    for (r = 0; r < j.length; r++) {

                        if ((j[r].strNome.toLowerCase().indexOf(s.toLowerCase()) > -1)) {

                            if (j[r].id != u) {
                                bolTemUser = true;

                                var strHTML = "";
                                strHTML = populaFiltroSelecao(j[r]);

                                $(e).append(strBuilder);
                            }

                        }
                    }

                    if (!bolTemUser) {
                        var palavra = "'" + s + "'"
                        $(e).html('<span class="letter-spacing">Nenhum resultado encontrado. Que tal <a href="javascript: procurarpessoas(' + palavra + ')">procurar pessoas?</a></span>');
                    }

                } else {

                    for (r = 0; r < j.length; r++) {

                        var strHTML = "";
                        if (j[r].id != u) {
                            strHTML = populaFiltroSelecao(j[r]);
                            $(e).append(strBuilder);
                        }
                    }

                }

            }

            function populaFiltroSelecao(vJson) {

                var strHTML = "";
                var strFoto = "";


                //verifica se está selecionado
                var _carteirinha_selected = "";
                if (_personalizando.closest('li').find('input[type=hidden][ident=' + vJson.id + ']').length > 0) {
                    _carteirinha_selected = "carteirinha_selected"
                }

                strBuilder = '<div class="carteirinha ' + _carteirinha_selected + '" id="cart_' + vJson.id + '" ident="' + vJson.id + '" style="cursor:pointer;"><div class="in_cT"><span class="ava_clips"></span>';

                if (vJson.bolEducador) {
                    strBuilder += '<div class="souProf"><span>Professor</span></div>';
                }

                if (vJson.strFoto.length <= 0) {
                    strFoto = "/AVA/StaticContent/Common/img/perfil/avatar.jpg";
                } else {
                    strFoto = vJson.strFoto;
                }

                strBuilder += '<a><img src="' + strFoto + '" width="55" height="55" alt="avatar">' + vJson.strNome.substring(0, 9) + '</a>';

                if (vJson.bolSigoAuto) {
                    //strBuilder += '<a class=" bt_seguir s_IdoForever" href="#">seguindo<span class="bt_seguir"></span></a>'
                } else if (vJson.bolPossoSeguir && !vJson.bolEstouSeguindo) {
                    //strBuilder += '<a id="btseg_' + vJson.id + '" class="bt_seguir s_Indo" href="javascript: seguir(' + vJson.idSeguidor + ',' + vJson.id + ')">seguir<span class="bt_seguir"></span></a>';
                } else {
                    // strBuilder += '<a id="btseg_' + vJson.id + '" href="javascript: parardeseguir(' + vJson.idSeguidor + ',' + vJson.id + ')" class="bt_seguir"><span class="ava_seguindo">seguindo</span><span class="ava_parardeseguir">parar de seguir</span><span class="bt_seguir"></span></a>';
                }

                strBuilder += '</div></div>';

                return strBuilder;

            }


            function AttachLightBoxAVA(_e) {

                var _ident = _e.closest('li').attr('ident');

                _e.attr("href", "/AVA/Perfil/Home/SelecaoRede?tipo=" + _ident);
                o = { 'autoDimensions': false, 'width': 700, 'height': 470, 'onComplete': function () {
                    $urlSeguidosCompleto = "/AVA/Perfil/Home/SelecaoJSON?tipo=" + _ident;
                    retornaJsonSelecao($urlSeguidosCompleto, _ident);
                },
                    'onClosed': function () { _personalizando = null; },
                    'showCloseButton': false
                }
                lightBoxAVA(_e, o);
            }

            //selecao de pessoas
            //contador de selecionados
            var i_carteirinhas = 0;
            $('.carteirinha').live('click', function (e) {
                if($(this).find('.bt_seguir').length <= 0){    
                    e.preventDefault();
                }
                //elemento sendo editado
                if (_personalizando) {
                    var _ident = _personalizando.closest('li').attr('ident');
                    var _carteirinha = $(this);

                    if (_carteirinha.hasClass('carteirinha_selected')) {
                        if ($('#ava_contentlista').find('.carteirinha_selected').length == 1) {
                            //se remover todos força a volta pro selecao de personas

                            _compartilhamento.find('li[ident=' + _ident + ']').find('.small-x').click();
                            //volta a personalizar o selecao personas
                            _personalizando = _selecao_personas.find('li[ident=' + _ident + ']').find('.p-a-perso');

                        }
                        i_carteirinhas--;
                        $(this).removeClass('carteirinha_selected');
                        //remove o usuario do compartilhe
                        _compartilhamento.find('li[ident=' + _ident + ']').find('input[type=hidden][ident=' + _carteirinha.attr('ident') + ']').remove();

                        //repoe parcial
                        if (_compartilhamento.find('li[ident=' + _ident + ']').find('.small').hasClass('awesome-color')) {
                            //marca como selecionamento integral
                            _compartilhamento.find('li[ident=' + _ident + ']').find('.small').removeClass('awesome-color').addClass('parcial');
                            _compartilhamento.find('li[ident=' + _ident + ']').find('.small-x').removeClass('awesome-x-color').addClass('parcial-x');

                        }

                    } else {

                        if ($('#ava_contentlista').find('.carteirinha_selected').length <= 0) {
                            //se adicionar alguem força a caixa pro compartilhe
                            _selecao_personas.find('li[ident=' + _ident + ']').find('.p-a-default').click();
                            //marca como parcial
                            _compartilhamento.find('li[ident=' + _ident + ']').find('.small').removeClass('awesome-color').addClass('parcial');
                            _compartilhamento.find('li[ident=' + _ident + ']').find('.small-x').removeClass('awesome-x-color').addClass('parcial-x');
                            //neste caso esta personalizando no compartilhe
                            _personalizando = _compartilhamento.find('li[ident=' + _ident + ']').find('.small');

                        }

                        i_carteirinhas++;
                        $(this).addClass('carteirinha_selected');
                        //adiciona o usuario discretamente no compartilhe
                        _compartilhamento.find('li[ident=' + _ident + ']').append('<input type="hidden" ident="' + _carteirinha.attr('ident') + '">');

                        //remove parcial caso tenha selecionado tudo
                        if ($('.carteirinha').length == $('.carteirinha_selected').length) {
                            //marca como selecionamento integral
                            _compartilhamento.find('li[ident=' + _ident + ']').find('.small').removeClass('parcial').addClass('awesome-color');
                            _compartilhamento.find('li[ident=' + _ident + ']').find('.small-x').removeClass('parcial-x').addClass('awesome-x-color');

                        }
                    }

                    //renomeia com o total selecionado corretamente
                    _compartilhamento.find('li[ident=' + _ident + ']').find('.small').find('span').text('(' + i_carteirinhas + ')');
                }
            });

            //seleciona todas as carteirinhas
            $('.cart_marcar_todos').live('click', function (e) {
                e.preventDefault();
                $('.carteirinha').each(function () {
                    var _carteirinha = $(this);
                    if (!(_carteirinha.hasClass('carteirinha_selected'))) {
                        _carteirinha.click();
                    }
                });
            });
            //deseleciona todas as carteirinhas
            $('.cart_desmarcar_todos').live('click', function (e) {
                e.preventDefault();
                $('.carteirinha').each(function () {
                    var _carteirinha = $(this);
                    if (_carteirinha.hasClass('carteirinha_selected')) {
                        _carteirinha.click();
                    }
                });
            });

            //fecha o lightbox
            $('#fancybox-content').find('.fechar_X').live('click', function (e) {
                e.preventDefault();
                $.fancybox.close();
            });

            //identifica elemento sendo editado no personas
            _p_a_perso.live('click', function () {
                i_carteirinhas = 0;
                _personalizando = $(this);
            });

            //identifica elemento sendo editado no compartilhe
            _compartilhamento.find('.small').live('click', function () {
                i_carteirinhas = 0;
                _personalizando = $(this);
            });





        }); //cada elemento




    } //plugin
})(jQuery);

    /*
    * Test whether argument elements are parents
    * of the first matched element
    * @return boolean
    * @param objs
    * 	a jQuery selector, selection, element, or array of elements
    */
    jQuery.fn.hasParent = function (objs) {
        // ensure that objs is a jQuery array
        objs = jQuery(objs); var found = false;
        jQuery(this[0]).parents().andSelf().each(function () {
            if (jQuery.inArray(this, objs) != -1) {
                found = true;
                return false; // stops the each...
            }
        });
        return found;
    }
    //MONTA O JSON DA POSTAGEM
    function montaJSON(_compartilhamento) {

        json = {}
        json.turmas = [];
        json.usuarios = [];
        json.StrMensagem = jQuery('#txtInput').val().replace(/\r?\n|\r/g, "<br>");
       
        _compartilhamento.find('li').each(function () {
            //turma
            if (jQuery(this).hasClass('turma')) {
                if (jQuery(this).find('.small').hasClass('parcial')) {
                    jQuery(this).find('input[type=hidden]').each(function () {
                        var _utilizado = false;
                        var _this = jQuery(this);
                        jQuery(json.usuarios).each(function () {

                            if (jQuery(this).attr('id') == _this.attr('ident')) {
                                _utilizado = true
                                return false;

                            }

                        });
                        if (!_utilizado) {
                            json.usuarios.push({ 'id': jQuery(this).attr('ident') });
                        }
                    });
                } else {
                    var _utilizado = false;
                    var _this = jQuery(this);
                    jQuery(json.turmas).each(function () {

                        if (jQuery(this).attr('id') == _this.attr('ident')) {
                            _utilizado = true
                            return false;

                        }

                    });
                    if (!_utilizado) {
                        json.turmas.push({ 'id': jQuery(this).attr('ident') });
                    }
                }
            } else if (jQuery(this).hasClass('unico')) {
                jQuery(this).find('input[type=hidden]').each(function () {

                    var _utilizado = false;
                    var _this = jQuery(this);
                    jQuery(json.usuarios).each(function () {

                        if (jQuery(this).attr('id') == _this.attr('ident')) {
                            _utilizado = true
                            return false;

                        }

                    });
                    if (!_utilizado) {
                        json.usuarios.push({ 'id': jQuery(this).attr('ident') });
                    }
                });
            } else if (jQuery(this).hasClass('especifico')) {
                var _utilizado = false;
                var _this = jQuery(this);
                jQuery(json.usuarios).each(function () {

                    if (jQuery(this).attr('id') == _this.attr('ident')) {
                        _utilizado = true
                        return false;

                    }

                });
                if (!_utilizado) {
                    json.usuarios.push({ 'id': jQuery(this).attr('ident') });
                }

            }
        });

        return jQuery.toJSON(json);
    }

    //esconde o troca persona quando clicado fora
   /*jQuery(function ($) {
        $('section, body').click(function (event) {
            
            if (!($(event.target).closest('section').hasClass('dialogo')) && ($(event.target).attr('id') != 'fancybox-overlay') && !($(event.target).hasParent('#fancybox-outer'))) {
                //$('.compartilhamento').hide();
                //$('#compartilhar').hide();
                if ($('.selecao_personas').css('display') == 'block') {
                   if(event.target.text != 'x'){
                       $('.troca_persona').click();
                   }
                }
            }
        })
    });*/