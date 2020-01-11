(function($) {
    $.fn.seletorAVA = function(opcoes) {
        var defaults = {
            turma: true,
            seguidor: false,
            professor: false,
            callBack: null,
            attachBox: null,
            mural: false
        };
        var s = $.extend(defaults, opcoes);
        return this.each(function() {
            var _compartilhamento = $(this).find(".compartilhamento");
            var _troca_persona = _compartilhamento.find(".troca_persona");
            var _selecao_personas = $(this).find(".selecao_personas");
            _selecao_personas.find("li:first").text("Selecione grupos e pessoas");
            var _campo_busca = $(this).find(".campo-busca");
            var _busca_especifico = $(this).find(".busca_especifico").attr("placeholder", "Digite Aqui");
            var _p_a_perso = $(this).find(".p-a-perso");
            if (s.turma == true && (s.professor == false && s.seguidor == false)) {
                _compartilhamento.find(".todos").find("a:first").text("Minhas turmas ")
            }
            if (s.attachBox != null) {
                if (s.attachBox.constructor.toString().indexOf("Array") > -1) {
                    var inc = 0;
                    for (inc = 0; inc < s.attachBox.length; inc++) {
                        AttachLightBoxAVA(s.attachBox[inc])
                    }
                } else {
                    AttachLightBoxAVA(s.attachBox)
                }
            }
            var _personalizando = null;
            var _editando = null;
            _compartilhamento.find(".todos").find(".small").click(function(e) {
                e.preventDefault()
            }).css("cursor", "default");
            _troca_persona.toggle(function(e) {
                e.preventDefault();
                _selecao_personas.fadeIn("fast");
                _campo_busca.fadeIn().find("input").focus();
                _troca_persona.text("Concluir ")
            }, function(e) {
                e.preventDefault();
                _selecao_personas.hide();
                _campo_busca.hide();
                _troca_persona.text("Selecionar ");
                if (jQuery("#txtInput").val() != "" && _compartilhamento.find(".small").length > 0) {
                    $("#compartilhar").removeClass("disable")
                }
            });
            var _meus_grupos = new Array();
            _selecao_personas.find(".p-a-default").live("click", function(e) {
                e.preventDefault();
                var _el_original = $(this).closest("li");
                var _el = $(this).closest("li").clone();
                _el.css("display", "none");
                _el.find("a.p-a-perso").remove();
                _el.find(".p-a-default-img").remove();
                _el.find("a:first").attr("class", "small awesome awesome-color");
                _el.append('<a class="small-x awesome-x awesome-x-color" href="#">x</a>');
                if (!(_el.hasClass("especifico")) && !(_el.hasClass("todos"))) {
                    _el.find("a:first").attr("class", "small awesome awesome-color seletorlightbox");
                    AttachLightBoxAVA(_el.find(".seletorlightbox"))
                } else {
                    _el.find(".small").css("cursor", "default").click(function(a) {
                        a.preventDefault()
                    });
                    _troca_persona.text("Concluir ")
                }
                _el.find("span.discreto").removeClass("discreto");
                var bolPodeCompartilhar = true;
                _compartilhamento.find("li").each(function(i) {
                    if ($(this).hasClass("turma")) {
                        $(this).find("input").each(function() {
                            if ($(this).attr("ident") == _el.attr("ident")) {
                                bolPodeCompartilhar = false
                            }
                        })
                    } else {
                        if ($(this).hasClass("especifico")) {
                            if ($(this).attr("ident") == _el.attr("ident")) {
                                bolPodeCompartilhar = false
                            }
                        }
                    }
                });
                if (bolPodeCompartilhar) {
                    if (_el.hasClass("unico")) {
                        if (_meus_grupos[_el.attr("ident")]) {
                            if (!(_personalizando)) {
                                for (r = 0; r < _meus_grupos[_el.attr("ident")].Result.length; r++) {
                                    _el.find("a:last").after('<input type="hidden" ident="' + _meus_grupos[_el.attr("ident")].Result[r].id + '">')
                                }
                            }
                            _troca_persona.closest("li").before(_el)
                        } else {
                            $.getJSON("/AVA/Perfil/Home/SelecaoJSON?tipo=" + _el.attr("ident"), null, function(data) {
                                _meus_grupos[_el.attr("ident")] = data;
                                if (!(_personalizando)) {
                                    for (r = 0; r < data.Result.length; r++) {
                                        _el.find("a:last").after('<input type="hidden" ident="' + data.Result[r].id + '">')
                                    }
                                }
                                _troca_persona.closest("li").before(_el);
                                _troca_persona.text("Concluir ")
                            })
                        }
                    } else {
                        _troca_persona.closest("li").before(_el)
                    }
                } else {
                    _troca_persona.click();
                    _troca_persona.text("Selecionar ");
                    _busca_especifico.val("");
                    bolPodeCompartilhar = true
                }
                if (_el.hasClass("especifico")) {
                    _busca_especifico.keyup()
                }
                _el.fadeIn();
                if (_el_original.hasClass("unico") || _el_original.hasClass("especifico")) {
                    _compartilhamento.find("li.todos").find(".small-x").click()
                }
                if (!bolPodeCompartilhar) {
                    if (_compartilhamento.find(".small").length <= 0) {
                        _troca_persona.text("+ Adicionar pessoas ")
                    } else {
                        _troca_persona.text("Concluir ")
                    }
                }
                if (_el_original.hasClass("todos")) {
                    _compartilhamento.find(".unico, .especifico").each(function() {
                        $(this).find(".small-x").click()
                    })
                }
                _el_original.remove()
            });
            _todos_clone = null;
            _compartilhamento.find(".small-x").live("click", function(e) {
                e.preventDefault();
                var _el_original = $(this).closest("li");
                var _el = $(this).closest("li").clone();
                if (!(_todos_clone) && _el_original.hasClass("todos")) {
                    _todos_clone = _el_original
                }
                if (!(_el.hasClass("especifico"))) {
                    _el.css("display", "none");
                    _el.find("a.small-x").remove();
                    _el.find("a:first").attr({
                        "class": "p-a-default"
                    }).css("cursor", "pointer");
                    _el.append('<a class="p-a-perso invert" href="#">Personalizar</a></li>');
                    AttachLightBoxAVA(_el.find(".p-a-perso"));
                    _el_aux = null;
                    if (_selecao_personas.find(".especifico").length > 0 || _selecao_personas.find("li.especifico-nenhum").length > 0) {
                        _ul_aux = _ul_rede_original
                    } else {
                        _ul_aux = _selecao_personas.find("ul")
                    }
                    if (_el.hasClass("todos")) {
                        _el.addClass("p_all p_bg");
                        _el.find(".p-a-perso").remove();
                        _ul_aux.find("li:first").after(_el)
                    } else {
                        _ul_aux.find("li:last").after(_el)
                    }
                    _el.find("input[type=hidden]").remove();
                    _el.find("span").text("(" + _el.find("span").attr("all_el") + ")").addClass("discreto");
                    _el.fadeIn();
                    _el_original.remove()
                } else {
                    _el_original.remove();
                    if (_busca_especifico.val() != "") {
                        _busca_especifico.keyup()
                    }
                }
                if (_compartilhamento.find(".small").length <= 0) {
                    _troca_persona.text("+ Adicionar pessoas ");
                    if (s.mural) {
                        $("#compartilhar").addClass("disable")
                    }
                } else {}
            });
            _troca_persona.one("click", function() {
                $.ajax({
                    type: "POST",
                    url: "/AVA/Perfil/Home/SelecaoElementosCompartilhar/",
                    data: "turma=" + s.turma + "&seguidor=" + s.seguidor + "&professor=" + s.professor,
                    success: function(html) {
                        _selecao_personas.hide();
                        _selecao_personas.html(html);
                        _selecao_personas.children("ul:first").find(".unico").each(function() {
                            var elementoAtual = $(this);
                            $("#dadosAuxAgenda .compartilhamento").children("ul:first").find(".unico").each(function() {
                                var existentes = $(this);
                                if (elementoAtual.attr("ident") == existentes.attr("ident")) {
                                    elementoAtual.remove()
                                }
                            })
                        });
                        _selecao_personas.show();
                        _busca_especifico.fadeIn("fast").focus();
                        _p_a_perso = $(".p-a-perso");
                        var _els = _p_a_perso;
                        _els.each(function() {
                            AttachLightBoxAVA($(this))
                        });
                        if (_todos_clone) {
                            _compartilhamento.find(".todos").remove();
                            _todos_clone.appendTo(_compartilhamento.find("ul")).find(".small-x").click()
                        }
                        if (s.callBack) {
                            eval(s.callBack + "();")
                        }
                    }
                })
            });
            var xmlRede = null;
            var xmlRede_trigger = null;
            var _ul_rede_original = null;
            _busca_especifico.one("keyup", function() {
                _ul_rede_original = _selecao_personas.find("ul").clone();
                _selecao_personas.html('<ul><li style="text-align:center;margin:10px 0;width:150px" class=""><img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif"></li></ul>');
                $.getJSON("/AVA/Perfil/Home/SelecaoRedeCompleta/", {
                    turma: s.turma,
                    professor: s.professor,
                    seguidor: s.seguidor
                }, function(data) {
                    xmlRede = data.Result;
                    _busca_especifico.live("keyup", function() {
                        if ($(this).val() != "") {
                            if (!(_ul_rede_original)) {
                                _ul_rede_original = _selecao_personas.find("ul").clone()
                            }
                            _selecao_personas.find("ul").html("");
                            var _cont = 0;
                            for (r = 0; r < xmlRede.length; r++) {
                                var nomeSemAcento = "";
                                var apelidoSemAcento = "";
                                nomeSemAcento = retira_acentos(xmlRede[r].strNome.toLowerCase());
                                apelidoSemAcento = retira_acentos(xmlRede[r].strApelido.toLowerCase());
                                if ((xmlRede[r].strNome.toLowerCase().indexOf($(this).val().toLowerCase()) > -1 || nomeSemAcento.indexOf($(this).val().toLowerCase()) > -1 || apelidoSemAcento.indexOf($(this).val().toLowerCase()) > -1 || xmlRede[r].strApelido.toLowerCase().indexOf($(this).val().toLowerCase()) > -1) && (_compartilhamento.find(".especifico[ident=" + xmlRede[r].id + "]").length <= 0)) {
                                    bolTemUser = true;
                                    var strHTML = "";
                                    _selecao_personas.find("ul").append('<li ident="' + xmlRede[r].id + '" class="especifico"><a class="p-a-default p-a-default-img" href="#"><img height="28" width="28" src="' + xmlRede[r].strMiniFoto + '"> </a><a class="p-a-default" href="#">' + xmlRede[r].strApelido + " </a></li>");
                                    _cont++
                                }
                                if (_cont > 4) {
                                    break
                                }
                            }
                            if (_cont == 0) {
                                _selecao_personas.find("ul").append('<li class="p_bg p_dica discreto especifico-nenhum">Nenhum usu·rio encontrado.</li>')
                            }
                        } else {
                            if (_ul_rede_original) {
                                _selecao_personas.html(_ul_rede_original)
                            }
                            _selecao_personas.find(".p-a-perso").each(function() {
                                AttachLightBoxAVA($(this))
                            });
                            _ul_rede_original = null
                        }
                    });
                    if (!(xmlRede_trigger)) {
                        xmlRede_trigger = 1;
                        _busca_especifico.keyup()
                    }
                })
            });

            function retornaJsonSelecao(caminho, _ident) {
            	console.log('Finalmente achou');
                function workOnJSON(data) {
                    var xml = null;
                    xml = data.Result;
                    totalCarteirinhas = data.Result.length;
                    $("#myContentTemplate").tmpl(data).appendTo("#ava_contentlista");
                    $("#ava_contentlista #ava_loader").css("display", "none");
                    $("#ava_contentlista").find(".carteirinha").each(function() {
                        var _carteirinha_selected = "";
                        if (_personalizando.closest("li").find("input[type=hidden][ident=" + $(this).attr("ident") + "]").length > 0) {
                            i_carteirinhas++;
                            $(this).addClass("carteirinha_selected")
                        }
                    });
                    $("#txtFiltroAva").live("keyup", function() {
                        if ($(this).attr("idusuario")) {
                            _id = $(this).attr("idusuario")
                        } else {
                            _id = 0
                        }
                        FiltrarUsuarioSelecao("#ava_contentlista", xml, $(this).val(), _id)
                    });
                    $("#txtFiltroAva").live("focus", function() {
                        if ($(this).val() == "Filtrar por nome") {
                            $(this).val("")
                        }
                    });
                    $("#txtFiltroAva").live("blur", function() {
                        if ($(this).val() == "") {
                            $(this).val("Filtrar por nome")
                        }
                    })
                }
                if (_meus_grupos[_ident]) {
                    workOnJSON(_meus_grupos[_ident])
                } else {
                    $.getJSON(caminho, null, function(data) {
                        workOnJSON(data);
                        _meus_grupos[_ident] = data
                    })
                }
            }

            function FiltrarUsuarioSelecao(e, j, s, u) {
                $(e).html("");
                if (s) {
                    var bolTemUser = false;
                    for (r = 0; r < j.length; r++) {
                        if ((j[r].strNome.toLowerCase().indexOf(s.toLowerCase()) > -1) || (j[r].strApelido.toLowerCase().indexOf(s.toLowerCase()) > -1) || (retira_acentos(j[r].strNome).toLowerCase().indexOf(s.toLowerCase()) > -1) || (retira_acentos(j[r].strApelido).toLowerCase().indexOf(s.toLowerCase()) > -1)) {
                            if (j[r].id != u) {
                                bolTemUser = true;
                                var strHTML = "";
                                strHTML = populaFiltroSelecao(j[r]);
                                $(e).append(strBuilder)
                            }
                        }
                    }
                    if (!bolTemUser) {
                        var palavra = "'" + s + "'";
                        $(e).html('<span class="letter-spacing">Nenhum resultado encontrado. Que tal <a href="javascript: procurarpessoas(' + palavra + ')">procurar pessoas?</a></span>')
                    }
                } else {
                    for (r = 0; r < j.length; r++) {
                        var strHTML = "";
                        if (j[r].id != u) {
                            strHTML = populaFiltroSelecao(j[r]);
                            $(e).append(strBuilder)
                        }
                    }
                }
            }

            function populaFiltroSelecao(vJson) {
                var strHTML = "";
                var strFoto = "";
                var _carteirinha_selected = "";
                if (_personalizando.closest("li").find("input[type=hidden][ident=" + vJson.id + "]").length > 0) {
                    _carteirinha_selected = "carteirinha_selected"
                }
                strBuilder = '<div class="carteirinha ' + _carteirinha_selected + '" id="cart_' + vJson.id + '" ident="' + vJson.id + '" style="cursor:pointer;"><div class="in_cT"><span class="ava_clips"></span>';
                if (vJson.bolEducador) {
                    strBuilder += '<div class="souProf"><span>Professor</span></div>'
                }
                if (vJson.strFoto.length <= 0) {
                    strFoto = "/AVA/StaticContent/Common/img/perfil/avatar.jpg"
                } else {
                    strFoto = vJson.strFoto
                }
                if (vJson.strApelido.length > 0) {
                    strBuilder += '<a><img src="' + strFoto + '" width="55" height="55" alt="avatar">' + vJson.strApelido.substring(0, 9) + "</a>"
                } else {
                    strBuilder += '<a><img src="' + strFoto + '" width="55" height="55" alt="avatar">' + vJson.strNome.substring(0, 9) + "</a>"
                }
                if (vJson.bolSigoAuto && vJson.idSeguidor != vJson.id) {} else {
                    if (vJson.bolPossoSeguir && !vJson.bolEstouSeguindo && vJson.idSeguidor != vJson.id) {} else {}
                }
                strBuilder += "</div></div>";
                return strBuilder
            }
            var totalCarteirinhas = 0;
            var totalCarteirinhasSelecionadas = 0;

            function AttachLightBoxAVA(_e) {
                var _ident = _e.closest("li").attr("ident");
                if (_ident !== undefined) {
                    _e.attr("href", "/AVA/Perfil/Home/SelecaoRede?tipo=" + _ident);
                    o = {
                        autoSize: false,
                        width: 700,
                        height: 470,
                        type: "ajax",
                        afterShow: function() {
                            var _id = $(this.element).parent().attr("ident");
                            $urlSeguidosCompleto = "/AVA/Perfil/Home/SelecaoJSON?tipo=" + _id;
                            retornaJsonSelecao($urlSeguidosCompleto, _id)
                        },
                        beforeClose: function() {
                            _personalizando = null
                        },
                        helpers: {
                            overlay: {
                                locked: false
                            }
                        }
                    };
                    lightBoxAVA(_e, o)
                }
            }
            var i_carteirinhas = 0;
            $(".carteirinha").live("click", function(e) {
                if (_personalizando) {
                    if ($(this).find(".bt_seguir").length <= 0) {
                        e.preventDefault()
                    }
                    var _ident = _personalizando.closest("li").attr("ident");
                    var _carteirinha = $(this);
                    var bolPodeCompartilhar = true;
                    _compartilhamento.find("li").each(function(i) {
                        if ($(this).hasClass("turma")) {
                            if ($(this).find("input").attr("ident") == _carteirinha.attr("ident")) {
                                bolPodeCompartilhar = false
                            }
                        } else {
                            if ($(this).hasClass("especifico")) {
                                if ($(this).attr("ident") == _carteirinha.attr("ident")) {
                                    bolPodeCompartilhar = false
                                }
                            }
                        }
                    });
                    if (bolPodeCompartilhar || $("#cart_" + _carteirinha.attr("ident")).hasClass("carteirinha_selected")) {
                        if (_carteirinha.hasClass("carteirinha_selected")) {
                            if (i_carteirinhas == 1) {
                                _compartilhamento.find("li[ident=" + _ident + "]").find(".small-x").click();
                                _personalizando = _selecao_personas.find("li[ident=" + _ident + "]").find(".p-a-perso")
                            }
                            i_carteirinhas--;
                            $(this).removeClass("carteirinha_selected");
                            _compartilhamento.find("li[ident=" + _ident + "]").find("input[type=hidden][ident=" + _carteirinha.attr("ident") + "]").remove();
                            if (_compartilhamento.find("li[ident=" + _ident + "]").find(".small").hasClass("awesome-color")) {
                                _compartilhamento.find("li[ident=" + _ident + "]").find(".small").removeClass("awesome-color").addClass("parcial");
                                _compartilhamento.find("li[ident=" + _ident + "]").find(".small-x").removeClass("awesome-x-color").addClass("parcial-x")
                            }
                        } else {
                            if ($("#ava_contentlista").find(".carteirinha_selected").length <= 0) {
                                _selecao_personas.find("li[ident=" + _ident + "]").find(".p-a-default").click();
                                _compartilhamento.find("li[ident=" + _ident + "]").find(".small").removeClass("awesome-color").addClass("parcial");
                                _compartilhamento.find("li[ident=" + _ident + "]").find(".small-x").removeClass("awesome-x-color").addClass("parcial-x");
                                _personalizando = _compartilhamento.find("li[ident=" + _ident + "]").find(".small")
                            }
                            i_carteirinhas++;
                            $(this).addClass("carteirinha_selected");
                            _compartilhamento.find("li[ident=" + _ident + "]").append('<input type="hidden" ident="' + _carteirinha.attr("ident") + '">');
                            if (totalCarteirinhas == i_carteirinhas) {
                                _compartilhamento.find("li[ident=" + _ident + "]").find(".small").removeClass("parcial").addClass("awesome-color");
                                _compartilhamento.find("li[ident=" + _ident + "]").find(".small-x").removeClass("parcial-x").addClass("awesome-x-color")
                            }
                        }
                        _compartilhamento.find("li[ident=" + _ident + "]").find(".small").find("span").text("(" + i_carteirinhas + ")")
                    } else {
                        jAlert("Usu&aacute;rio j&aacute; selecionado.", "")
                    }
                }
            });
            $(".cart_marcar_todos").live("click", function(e) {
                e.preventDefault();
                $(".carteirinha").each(function() {
                    var _carteirinha = $(this);
                    if (!(_carteirinha.hasClass("carteirinha_selected"))) {
                        _carteirinha.click()
                    }
                })
            });
            $(".cart_desmarcar_todos").live("click", function(e) {
                e.preventDefault();
                $(".carteirinha").each(function() {
                    var _carteirinha = $(this);
                    if (_carteirinha.hasClass("carteirinha_selected")) {
                        _carteirinha.click()
                    }
                })
            });
            $(".fancybox-inner").find(".fechar_X").live("click", function(e) {
                e.preventDefault();
                $.fancybox.close()
            });
            _p_a_perso.live("click", function() {
                i_carteirinhas = 0;
                _personalizando = $(this)
            });
            _compartilhamento.find(".small").live("click", function() {
                i_carteirinhas = 0;
                _personalizando = $(this)
            })
        })
    }
})(jQuery);
jQuery.fn.hasParent = function(b) {
    b = jQuery(b);
    var a = false;
    jQuery(this[0]).parents().andSelf().each(function() {
        if (jQuery.inArray(this, b) != -1) {
            a = true;
            return false
        }
    });
    return a
};

function montaJSON(b, a) {
    json = {};
    json.turmas = [];
    json.usuarios = [];
    if (a === undefined || a == "") {
        json.StrMensagem = jQuery("#txtInput").val().replace(/\r?\n|\r/g, "<br>")
    }
    b.find("li").each(function() {
        if (jQuery(this).hasClass("turma")) {
            if (jQuery(this).find(".small").hasClass("parcial")) {
                jQuery(this).find("input[type=hidden]").each(function() {
                    var e = false;
                    var f = jQuery(this);
                    jQuery(json.usuarios).each(function() {
                        if (jQuery(this).attr("id") == f.attr("ident")) {
                            e = true;
                            return false
                        }
                    });
                    if (!e) {
                        json.usuarios.push({
                            id: jQuery(this).attr("ident")
                        })
                    }
                })
            } else {
                var c = false;
                var d = jQuery(this);
                jQuery(json.turmas).each(function() {
                    if (jQuery(this).attr("id") == d.attr("ident")) {
                        c = true;
                        return false
                    }
                });
                if (!c) {
                    json.turmas.push({
                        id: jQuery(this).attr("ident")
                    })
                }
            }
        } else {
            if (jQuery(this).hasClass("unico")) {
                jQuery(this).find("input[type=hidden]").each(function() {
                    var e = false;
                    var f = jQuery(this);
                    jQuery(json.usuarios).each(function() {
                        if (jQuery(this).attr("id") == f.attr("ident")) {
                            e = true;
                            return false
                        }
                    });
                    if (!e) {
                        json.usuarios.push({
                            id: jQuery(this).attr("ident")
                        })
                    }
                })
            } else {
                if (jQuery(this).hasClass("especifico")) {
                    var c = false;
                    var d = jQuery(this);
                    jQuery(json.usuarios).each(function() {
                        if (jQuery(this).attr("id") == d.attr("ident")) {
                            c = true;
                            return false
                        }
                    });
                    if (!c) {
                        json.usuarios.push({
                            id: jQuery(this).attr("ident")
                        })
                    }
                }
            }
        }
    });
    return jQuery.toJSON(json)
}

function retira_acentos(c) {
    var b = "‡ËÏÚ˘‚ÍÓÙ˚‰ÎÔˆ¸·ÈÌÛ˙„ıÁ¿»Ã“Ÿ¬ Œ‘€ƒÀœ÷‹¡…Õ”⁄√’«_ ";
    var d = "aeiouaeiouaeiouaeiouaocAEIOUAEIOUAEIOUAEIOUAOC--";
    var a = "¥`^®~!@#$%&*()+=£¢ß™∫∞{}[]|\\/?:;.,<>\"'";
    novaPalavra = "";
    contador = 0;
    for (i = 0;
        (i < c.length && i <= 140); i++) {
        letra = c.charAt(i);
        if (a.indexOf(letra) == -1) {
            if (b.indexOf(letra) == -1) {
                novaPalavra += letra;
                contador++
            } else {
                if (!(novaPalavra.charAt(contador - 1) == "-" && d.charAt(b.indexOf(letra)) == "-")) {
                    novaPalavra += d.charAt(b.indexOf(letra));
                    contador++
                }
            }
        }
    }
    return novaPalavra
};