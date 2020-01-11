(function ($) {
    var versionInt = 0; //A cada atualização incrementar +1;
    var versions = new Array();
    versions[0] = "1.0"; //A cada atualização incrementar um item no array e nomear a versão
    
    var methods = {
        destruir: function () {
            return this.each(function () {
                var principal = $(this);
                var data = principal.data("galeriaava");
                if (data) {
                    //data.target.remove();
                    data.bolInstanciado = null;
                    principal.removeClass("GaleriaAva");
                    principal.find("a").removeClass("galeriaava");
                    principal.removeData("galeriaava");
                    $(window).unbind(".GaleriaAva");
                }
            });
        },
        init: function (parametros) {
            console.log("Versão do plugin: " + versions[versionInt]);
            console.log(" INICIOUUUUUU ====================== galeriaava.JS 2");
            
            var opcoes = {
                bolTitulo: true,
                bolDescricao: true,
                bolEditar: true
            };
            var tagsToReplace = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;'
            };

            if (parametros) {
                $.extend(opcoes, parametros);
            }

            $(".btnGava").click(function(){
                var bolAplicouFancy = false;
                var bolJaVerificouAjax = true;
                console.log("DadosPerfilPublico #################### 2222");
                //$(this).closest('.elemento').find('texto').text()
                var component = $(this).parent().parent().find(".fake_galeria");//o proprio parágrafo
                var principal = $(this).parent().parent();//.find(".galeriaava");
                console.log(principal);
                
                principal.find(".galeriaava").fancybox({
                    prevEffect		: 'none',
                    nextEffect		: 'none',
                    closeBtn		: false,
                    helpers		: {
                        title	: { type : 'inside' },
                        buttons	: {}
                    }
                });
                

            });

            return this.each(function () { //acha a div que aplicou o plugin
                console.log(" INICIOUUUUUU ====================== galeriaava.JS 3");

                var principal = $(this);
                var data = principal.data("galeriaava");

                console.log("entrou no galeriaava");
                
                if (!data) {
                    var bolDonoImagens = false;
                    var bolJaVerificouAjax = false;
                    var idImagemReferenciaParaDono = 0;
                    var bolAplicouFancy = false;
                    var bolClicou = false;
                    var elementoClick = null;

                    if (principal.find("a").size() > 0) {
                        if (principal.find("a:first").data("idarquivo") !== undefined && principal.find("a:first").data("idarquivo") != null) {
                            idImagemReferenciaParaDono = principal.find("a:first").data("idarquivo");

                            $(this).find("a").each(function (e) {

                                if (!$(this).hasClass("galeriaava")) {
                                    $(this).addClass("galeriaava");
                                }
                            });
                        } else {
                            $.error("Estrutura HTML não está de acordo com as necessidades do plugin");
                            return;
                        }
                    } else {
                        $.error("Estrutura HTML não está de acordo com as necessidades do plugin");
                        return;
                    }

                    principal.addClass("GaleriaAva");

                    function VisualizarImagem() {
                        console.log("################################visualizarArquivo");
                    }
                    
                    
                    function replaceTag(tag) {
                        return tagsToReplace[tag] || tag;
                    }

                    function safe_tags_replace(str) {
                        return str.replace(/[&<>]/g, replaceTag);
                    }

                    function funcoesTituloDescricao(campoInner, idarquivo, elemento) {
                        
                        
                        $(".descricao .editar").click(function (e) {
                            console.log(".descricao .editar");
                            e.preventDefault();
                            var calcAltura = campoInner.height() - 118;
                            $(".descricao").css({ "height": campoInner.height() + "px" });
                            $(".descricao form input:first").val($(".descricao p:first strong").text());
                            $(".descricao form input").show();
                            var $ref = $(".descricao p:last .details").clone().children().remove().end();
                            var descricao = "";
                            if ($ref !== undefined && $ref != null && $ref.size() > 0) {
                                descricao = $ref.text();
                            } else {
                                descricao = $(".descricao p:last").text();
                            }

                            //mudar
                            /*if(descricao != ""){
                            $(".descricao form textarea").val($(".descricao p:last .details").clone().children().remove().end().text());
                            } else {
                            $(".descricao form textarea").val("Insira uma descrição");
                            }*/
                            $(".descricao form textarea").val(descricao == "" || descricao == "Insira uma descrição" ? "" : descricao);
                            $(".descricao form textarea").show();
                            $(".descricao form textarea").css({ "height": calcAltura + "px" });
                            $(".descricao form input").show();
                            $(".descricao p").hide();
                            $(".descricao .read-more a").trigger("click");
                        });
                        $(".descricao form").submit(function (e) {
                            e.preventDefault();
                            $(".descricao input[type=submit]").trigger("click");
                        });
                        $(".descricao input[type=submit]").click(function (e) {
                            
                            console.log(".descricao input[type=submit]");
                            e.preventDefault();
                            var titulo = safe_tags_replace($(".descricao form input:first").val()).replace(/'/g, " ").replace(/"/g, " ");
                            var desc = safe_tags_replace($(".descricao form textarea").val()).replace(/'/g, " ").replace(/"/g, " ");
                            var stringError = "";
                            var error = 0;
                            var j = {
                                id: idarquivo,
                                strNome: titulo,
                                strDescricao: desc
                            };
                            $.ajax({
                                url: "/ava/upload/home/AlteraArquivo",
                                type: "POST",
                                dataType: "json",
                                data: {
                                    json: JSON.stringify(j)
                                },
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                success: function (data) {
                                    var erro = parseInt(data.error);
                                    if (erro == 0) {
                                        esconderEdit();
                                        elemento.attr("title", titulo);
                                        elemento.data("descricao", desc);
                                        if (titulo == "") {
                                            $(".descricao p:first strong").text(elemento.data("nomearquivo"));
                                        } else {
                                            $(".descricao p:first strong").text($(".descricao p:first strong").html(titulo).text());
                                        }

                                        //$(".descricao p:last").text(desc == "" ? "Insira uma descrição" : desc);
                                        if (desc == "") {
                                            $(".descricao p:last").text("Insira uma descrição");
                                        } else {
                                            $(".descricao p:last").text($(".descricao p:last").html(desc).text());
                                        }
                                        $(campoInner).find(".descricao p:last").expander("destroy");
                                        $(".read-more").remove();
                                        aplicarExpander(campoInner, idarquivo, titulo, desc, elemento, false);

                                        if ($.jStorage) {
                                            $.jStorage.flush();
                                        }
                                    }
                                },
                                error: function (data) {
                                    console.log(data.responseText);
                                    alert("Erro no upload ao editar arquivo");
                                }
                            });

                        });
                        $(".descricao input[type=button]").click(function (e) {
                            e.preventDefault();

                            esconderEdit();
                        });

                        $(".descricao form input:first").keyup(function (e) {
                            var texto = $(this).val();
                            var tecla = e.keyCode || e.wich;
                            if (tecla != 8 && tecla != 13 && texto.length > 60) {
                                e.preventDefault();
                                $(this).val(texto.substring(0, 60));
                            }
                        });

                    }

                    function esconderEdit() {
                        $(".descricao").css({ "height": "" });
                        //$(".descricao form input:first").val($(".descricao p:first strong").text());
                        $(".descricao form textarea").hide();
                        $(".descricao form input").hide();
                        $(".descricao p").show();
                        $(".descricao .read-less a").trigger("click");
                    }

                    function aplicarExpander(campoInner, idarquivo, nomeArquivo, descricao, elemento, bolFuncTitulo) {
                        if (descricao != "") {
                            $(campoInner).find(".descricao p:last").expander({
                                expandText: "Abrir descrição",
                                userCollapseText: "Fechar descrição",
                                slicePoint: 0,
                                widow: 0,
                                expandPrefix: "",
                                beforeExpand: function (thisEl) {
                                    campoInner.find(".descricao").addClass("aberto");
                                    //console.log(thisEl);
                                },
                                onCollapse: function () {
                                    var altura = $(".descricao").height() + 20;
                                    $(".descricao").css("height", altura + "px");
                                    $(".descricao").animate({ height: "77px" }, 500, function () {
                                        $(this).css("height", "");
                                    });
                                    campoInner.find(".descricao").removeClass("aberto");
                                    $(".descricao .read-more").show();
                                }

                            });
                        }
                        $(".descricao .read-more a").append("<span class=\"FontAwesome\"></span>");
                        $(".descricao .read-less a").append("<span class=\"FontAwesome\"></span>");
                        $(".descricao p:first").after($(".descricao .read-more"));
                        if (bolFuncTitulo) {
                            funcoesTituloDescricao(campoInner, idarquivo, elemento);
                        }
                    }


                    $(this).data("galeriaava", {
                        bolInstanciado: true,
                        bolDonoImagens: bolDonoImagens,
                        opcoes: opcoes
                    });

                    if (idImagemReferenciaParaDono != 0) {
                        $.ajax({
                            url: "/ava/upload/Home/ValidaUsuarioArquivo",
                            type: "POST",
                            dataType: "json",
                            data: {
                                idArquivo: idImagemReferenciaParaDono
                            },
                            success: function (data) {
                                var erro = parseInt(data.error);
                                var msg = data.msg;
                                if (erro == 0) {
                                    bolDonoImagens = data.bolRetorno;
                                    principal.data("galeriaava").bolDonoImagens = bolDonoImagens;
                                }
                                bolJaVerificouAjax = true;

                                if (bolClicou && elementoClick !== undefined && elementoClick != null) {
                                    elementoClick.trigger("click");
                                }
                            },
                            error: function (data) {
                                console.log("Erro ao verificar dono imagens");
                                console.log(data.responseText);
                                $.fancybox.hideLoading();
                            }
                        });
                    }
                    //Antes de abrir o fancybox, preciso ver se o método que verifica se eu sou dono da imagem ja foi disparado.
                    principal.find(".galeriaava").click(function (e) {
                        console.log("clicou principal.find(.galeriaava).click(function (e)");
                        e.preventDefault();
                        //var este = principal;
                        if (!bolAplicouFancy) {
                            if (bolJaVerificouAjax) {
                                bolAplicouFancy = true;
                                principal.find(".galeriaava").fancybox({
                                    openEffect: "fade",
                                    closeEffect: "fade",
                                    nextEffect: "fade",
                                    prevEffect: "fade",
                                    autoSize: false,
                                    //maxHeight : 500,
                                    helpers: {
                                        title: {
                                            type: "outside"
                                        },

                                        thumbs: {
                                            width: 70,
                                            height: 70,
                                            scroll: true
                                        },
                                        overlay: {
                                            closeClick: false,
                                            locked: false
                                        }
                                    },
                                    padding: 0,
                                    afterShow: function () {
                                        $(".fancybox-wrap").addClass("minImagens");
                                        var $elemento = $(this.element);
                                        var bolDonoImagens = $elemento.closest(".GaleriaAva").data("galeriaava").bolDonoImagens;
                                        var opcoes = $elemento.closest(".GaleriaAva").data("galeriaava").opcoes;
                                        var posicao = $elemento.data("posicao");
                                        var nomeArquivo = $elemento.attr("title");
                                        var rel = $elemento.attr("rel");
                                        var descricao = $elemento.data("descricao");
                                        var idarquivo = parseInt($elemento.data("idarquivo"));
                                        var total = $(this.element).closest(".GaleriaAva").find(".galeriaava").size();
                                        //var total = este.find("a[rel='" + rel + "']").size();
                                        //(".imagens_mural .galeria_mural[rel='" + rel + "']").size();
                                        $(".fancybox-title").text(posicao + "/" + total);


                                        //verificar, se não for o dono e não tem descrição, não exibir (Insira uma descrição)

                                        if (opcoes.bolTitulo || opcoes.bolDescricao) {
                                            if (bolDonoImagens || (nomeArquivo != "" || descricao != "")) {
                                                var calcAltura = this.inner.height() - 118;
                                                var $html = "<div class=\"descricao\">";
                                                if (bolDonoImagens) {
                                                    $html = $html + "<form>";
                                                }
                                                $html = $html + "<p class=\"FontAwesome\"><strong>" + (nomeArquivo == "" ? "Insira um título" : nomeArquivo) + "</strong>";
                                                if (bolDonoImagens) {
                                                    $html = $html + "<span class=\"editar\">Editar</span></p>"
                                                    + "<input type=\"text\" placeholder=\"Insira um título\" value=\"\" style=\"display:none;\">";
                                                }
                                                if (bolDonoImagens) {
                                                    $html = $html + " <p class=\"p_descricao\">" + (descricao == "" ? "Insira uma descrição" : descricao) + "</p>";
                                                } else {
                                                    $html = $html + " <p class=\"p_descricao\">" + (descricao == "" ? "" : descricao) + "</p>";
                                                }

                                                if (bolDonoImagens) {
                                                    $html = $html + "<textarea placeholder=\"Insira uma descrição\" style=\"display:none; height: " + calcAltura + " px;\">" + (descricao == "" || descricao == "Insira uma descrição" ? "" : descricao) + "</textarea>"
                                                    + "<input type=\"submit\" value=\"Salvar\" style=\"display: none;\" class=\"btn_cor\"><input type=\"button\" value=\"Cancelar\" class=\"btn_cinza\" style=\"display: none;\">"
                                                    + "</form>";
                                                }
                                                $html = $html + "</div>";


                                                $(this.inner).prepend($html);
                                                $(this.inner).find("p:first strong").text($(this.inner).find("p:first strong").html(nomeArquivo).text());
                                                /*if (this.height <= this.inner.height()) {
                                                $(this.inner).find(".descricao").css({ "max-height": this.inner.height() + "px" });
                                                } else {*/
                                                $(this.inner).find(".descricao").css({ "max-height": this.inner.height() + "px" });
                                                //}

                                                var $inner = $(this.inner);
                                                aplicarExpander($inner, idarquivo, nomeArquivo, descricao, $elemento, true);
                                            }

                                        }
                                    },
                                    beforeShow: function () {
                                        
                                        $(".fancybox-overlay").css({ 'overflow-y': 'hidden' });
                                        var txProporcao = 1.3333; // Proporção 4:3
                                        //Se taxa de Proporção for menor que 1.333 é retrato, quanto maior altura, e menor largura menor é taxa
                                        //Se taxa de Proporção for maior que 1.333 é paisagem, quanto maior largura e menor a altura maior é taxa
                                        var larguraImg = $(this.inner).find("img").width() == 0 ? $(this.element).data("width") : $(this.inner).find("img").width();
                                        var alturaImg = $(this.inner).find("img").height() == 0 ? $(this.element).data("height") : $(this.inner).find("img").height();
                                        var larguraTela = document.body.offsetWidth;
                                        //alert(larguraTela);
                                        var flag = false;
                                        var flag2 = false;
                                        if (larguraImg < 400 && alturaImg < 600) {
                                            var proporcao = larguraImg / alturaImg;
                                            if(proporcao < txProporcao){ //retrato
                                                if(proporcao < 0.7){
                                                    this.height = 350;
                                                }
                                            }
                                            /*
                                            else if(proporcao > txProporcao){ //paisagem
                                                
                                            }
                                            else if(proporcao == txProporcao){ // 1:1 quadrada
                                            }*/
                                            flag = true;
                                            this.minWidth = 400;
                                            if (alturaImg < 300) {
                                                this.minHeight = 300;
                                                flag2 = true;
                                            }
                                        }

                                        if (alturaImg < 480 && !flag) {

                                            if (larguraImg > 900) {
                                                if (alturaImg > 200) {
                                                    if (larguraTela > 768) {
                                                        this.minHeight = 230;
                                                    } else {
                                                        //alert("LDC");
                                                        //this.maxWidth = 800;
                                                        this.maxHeight = 160;
                                                        larguraImg = (larguraImg * this.maxHeight) / alturaImg;
                                                        alturaImg = 160;
                                                    }
                                                } else {
                                                    if (larguraTela > 768) {
                                                        if (alturaImg < 120) {
                                                            this.minHeight = 115;
                                                        } else {
                                                            this.minHeight = 280;
                                                        }
                                                    } else {
                                                        if (alturaImg < 120) {
                                                            this.minHeight = 100;
                                                        } else {
                                                            this.minHeight = 280;
                                                        }
                                                    }

                                                }

                                            } else {
                                                this.minHeight = alturaImg + 90;
                                            }
                                            flag = true;
                                        } else {
                                            if (larguraTela <= 768 && !flag2) {
                                                alturaImg = 480;
                                                this.maxHeight = alturaImg;

                                            }
                                            else if (alturaImg > 600) {
                                                if (larguraImg < 400) {
                                                    this.width = 560;
                                                    this.height = 530;
                                                    var calc = parseInt((larguraImg * this.height) / alturaImg);
                                                    flag = false;
                                                    $(this.inner).find("img").css({
                                                        "position": "absolute",
                                                        "left": "50%",
                                                        
                                                        "margin-left": "-" + parseInt(calc / 2) + "px",
                                                        
                                                    });
                                                    
                                                }
                                                
                                            }
                                        }


                                        if (flag) {
                                            $(this.inner).find("img").css({
                                                "position": "absolute",
                                                "left": "50%",
                                                "top": "50%",
                                                "margin-left": "-" + parseInt(larguraImg / 2) + "px",
                                                "margin-top": "-" + parseInt(alturaImg / 2) + "px"
                                            });
                                        }

                                    },
                                    afterClose: function () {
                                        $(".fancybox-overlay").css({ 'overflow-y': 'visible' });
                                    }
                                });
                            } else {
                                var texto = "Aguarde... plugin em verificação com o servidor";
                                bolClicou = true;
                                elementoClick = $(this);
                                console.log(texto);
                                $.fancybox.showLoading();
                            }
                        }
                    });


                } // se já está instanciado, nada acontece

            });

        }
    };

    $.fn.GaleriaAva = function (parametros) {
        if (methods[parametros]) {
            return methods[parametros].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof parametros === "object" || !parametros) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Método " + method + " não existe no plugin GaleriaAva");
        }

    };
})(jQuery);