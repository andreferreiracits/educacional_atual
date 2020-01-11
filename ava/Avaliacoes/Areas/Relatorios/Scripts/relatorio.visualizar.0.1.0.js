//TODO: aqui deve ter um arquivo só para a visualização
var listRegistra = {};
var mensagem;
var caminhoBase = "";
var carregando;

$(document).ready(function () {
    carregando = new Carregando("carregandoGeral");

    initJsonData();
    unobstrusiveAplicar($('body'))
    mensagem = new Mensagem("alerta");
    caminhoBase = $('base#baseSite').attr('href') == undefined ? "./" : $('base#baseSite').attr('href');

});

function unobstrusiveAplicar(elementoPrincipal) {
    elementoPrincipal.find("[data-tipo]").each(function () {
        var tipo = $(this).attr('data-tipo');
        listRegistra[tipo].func($(this));
    });

    //se faz ou não o submit
    elementoPrincipal.find("[data-change-submit='true']").change(function () {
        var este = $(this).data("inputsdisable");
        elementoPrincipal.find(este).prop("disabled", true);
        $(this).closest("label").find(este).prop("disabled", false);


        $(this).parents('form').submit();
    });
    elementoPrincipal.find("[data-click-submit='true']").click(function () {
        $(this).find("input").removeAttr("disabled");
        $(this).parents('form').submit();
    });
}

function aplicarPainelRetratil(elementoTipo) {
    var botao = $(elementoTipo.attr("data-botao"));
//    var tamanho = elementoTipo.width(); //Começa com tamanho 236, carregamento mais lento?!

    botao.click(function () {
        if (elementoTipo.hasClass("aberto")) {
            elementoTipo.removeClass("aberto").addClass("fechado");
        } else {
            elementoTipo.removeClass("fechado").addClass("aberto");
        }

        //        var condicao = elementoTipo.width() < tamanho;
        //        elementoTipo.data("maximizado", condicao);
        //        if (condicao) {
        //            var tam = tamanho;
        //            if (elementoTipo.data("max-tam"))
        //                tam = elementoTipo.data("max-tam");
        //            
        //            elementoTipo.find('> div:last-child').show();
        //            elementoTipo.find('> div:first-child span').show();
        //            elementoTipo.width(tam);
        //            botao.removeClass(classeAdicionar);
        //        } else {
        //            if (!elementoTipo.data("max-tam"))
        //                elementoTipo.data("max-tam", elementoTipo.width()); //Salva tamanho real antes de diminuir

        //            elementoTipo.find('> div:last-child').hide();
        //            elementoTipo.find('> div:first-child span').hide();
        //            elementoTipo.width(10);
        //            botao.addClass(classeAdicionar);
        //        }
        ajustarTabela();
    }).attr('href', 'javascript:void(0)');
}

function aplicarMenu(elementoTipo) {
    var menu = elementoTipo;
    var destino = $(menu.attr('data-destino'));
    var linkselecionado = menu.find('li[class~="selecionado"] > a');
    var selecionado = linkselecionado.attr('href');

    menu.find('li').each(function () {
        var link = $(this).find('a');
        var url = link.attr('href');
        link.click(function () {
            if ($(this).parent().hasClass('selecionado')) {
                return;
            }
            menu.find('li').removeClass('selecionado');
            $(this).parent().addClass('selecionado')
            carregar(url)
        }).attr('href', 'javascript:void(0);');
    });

    //TODO: incluir o carregando
    function carregar(caminho) {
        loadGet(caminho, function (sucesso, dados) {
            if (sucesso) {
                destino.html(dados);
                unobstrusiveAplicar(destino)
            }
        });
    }

}

function loadGet(link, callBack) {
    $.ajax({
        url: link,
        type: "GET",
        cache: false,
        beforeSend: function () {
            carregando.mostrar();
        },
        success: function (dados, status, xhttp) {
            carregando.esconder();
            if (retornoErro(dados)) {
                callBack(false)
            } else {
                callBack(true, dados)
            }
        },
        error: function () {
            carregando.esconder();
            callBack(false)
        }
    });
}

function retornoErro(dados) {
    if (Mensagem.TemErro(dados)) {
        mensagem.exibir($(dados));
        return true;
    }
    return false;
}

var jsonData;
function initJsonData() {
    jsonData = {
        Consulta: {
            Tipo: 1
        }
    };
}
function updateValorJsonData(campo, valor) {
    jsonData.Consulta[campo] = valor;
}
var retornoSubmitConsulta = function (dados) { };
var antesSubmitConsulta = function ( objetoForm ) { return true; };

var formulario;
function aplicarSubmitConsulta(element) {
    formulario = element;

    formulario.submit(function (e) {
        e.preventDefault();

        var form = $(this);
        var parseFom = form.serializeObject();
        //console.log(parseFom);
        var data = JSON.stringify(parseFom);
        //console.log(data);

        //console.log(parseFom);

        if (!antesSubmitConsulta(parseFom))
            return;


        //var data = JSON.stringify(jsonData)
        //TODO: problema entre o que envia (json) e o que recebe (html)
        $.ajax({
            url: form.attr("action"),
            data: data,
            type: form.attr("method"),
            dataType: "text",
            processData: false,
            contentType: "application/json; charset=utf-8",
            /*success: function (dados, status, xhttp) {
            retornoSubmitConsulta(dados)
            }*/
            beforeSend: function () {
                carregando.mostrar();
            },
            success: function (dados, status, xhttp) {
                carregando.esconder();
                if (!retornoErro(dados)) {
                    //callBack(true, dados)
                    retornoSubmitConsulta(dados)
                } else {
                    console.log('erro')
                }
            },
            error: function () {
                carregando.esconder();
                //callBack(false)
                console.log('erro')
            }

        });

    });

    //formulario.submit()
}


function aplicarTipoGrafico(element) {
    var $btnCombo   = element;
    var destino  = $($btnCombo.data('destino'));
    var destinoN = $($btnCombo.data('tipografico-naopermetidodestino')); 

    var arryPermetidos = $btnCombo.data('tipografico-naopermetidos') ? $btnCombo.data('tipografico-naopermetidos') + "" : [];
    arryPermetidos = arryPermetidos.push ? arryPermetidos : arryPermetidos.split(",");

    //var tipoAtivo   = 1;
    var $linkButton = $btnCombo.find("a.nome");

    $btnCombo.combo({ });
    $linkButton.attr('href', 'javascript:void(0)')


    antesSubmitConsulta = function (objetoForm) {
        var valorBuscar = objetoForm.avaliacaoTipo + "";
        var ehPraContinuar = arryPermetidos.length == 0 || arryPermetidos.indexOf(valorBuscar) == -1;

        if (!ehPraContinuar) {
            destino.hide();
            destinoN.show();
            $btnCombo.hide();
        } else {
            destino.show();
            destinoN.hide();
            $btnCombo.show();
        }

        return ehPraContinuar;
    }


    $btnCombo.find("li input").change(function () {       
        destino.html('');

        var $this = $(this);
        var tipo = parseInt($this.val());
        var texto = $this.closest("label").text();
        $btnCombo.find("li").removeClass("ativo");
        $this.closest("li").addClass("ativo");

        updateValorJsonData("Tipo", tipo);
        $linkButton.text(texto);
        $linkButton.click();
        formulario.submit();
    });

    setTimeout(function () {
        //var input = $btnCombo.find('li input[value="' + tipoAtivo + '"]');
        var input = $btnCombo.find('ul > li:first input');
        input.trigger("click");
    }, 300);

    retornoSubmitConsulta = function (dados) {
        destino.html(dados);
        unobstrusiveAplicar(destino)
    }
}

function aplicarGrafico(elemento) {

    var mensagemNoData = elemento.data('grafico-nodata');

    var jsonRenderGrafico = {};
    jsonRenderGrafico.type = elemento.attr('data-grafico-tipo');
    jsonRenderGrafico.dataFormat = "json";
    jsonRenderGrafico.width = elemento.attr('data-grafico-width');
    jsonRenderGrafico.height = elemento.attr('data-grafico-height');

    setPropriedade("chart");
    setPropriedade("data");
    setPropriedade("categories");
    setPropriedade("dataset");

    elemento.html('');

//    elemento.bind("fusionchartsnodatatodisplay", function (e, args) {
//    }).bind("fusionchartsdrawcomplete", function () {
//    }).bind("fusionchartsrendered", function () {
//    }).bind("fusionchartsbeforedataupdate", function () {
//    }).bind("fusionchartsdataloadrequested", function () {
//    }).bind("fusionchartspbarloadingtext", function () {
//    }).bind("fusionchartsinitialized", function (e, args) {
//    });

    elemento.unbind("fusionchartsnodatatodisplay").bind("fusionchartsnodatatodisplay", function (e, args) {
        $(this).addClass("semDados");
        $(this).text(mensagemNoData);
        /*$(".legenda").hide();*/
    })/*.unbind("fusionchartsbeforedataupdate").bind("fusionchartsbeforedataupdate", function () {
        //$(this).removeClass("semDados");
    })*/.unbind("fusionchartsdataloaded").bind("fusionchartsdataloaded", function () {
        $(this).closest(".sec025carregando").removeClass("sec025carregando");
    });

    elemento.insertFusionCharts(jsonRenderGrafico);
    

    function setPropriedade(propriedade) {
        if (jsonRenderGrafico.dataSource == undefined) {
            jsonRenderGrafico.dataSource = {};
        }
        var valor = elemento.find('[name="' + propriedade + '"]').val();
        if ($.trim(valor).length > 0) {
            jsonRenderGrafico.dataSource[propriedade] = $.parseJSON(valor);
        }
    }
}

function aplicarLoadForm(element) {
    antesSubmitConsulta = function (objetoForm ) {
        return true;
    }

    formulario.submit();

    retornoSubmitConsulta = function (dados) {
        element.html(dados);
        unobstrusiveAplicar(element)
    }
}

function aplicarTabelaPaginada(element) {

    var contextoPaginacao = $(element.data("forpaginacao"));

    var nomeInput = contextoPaginacao.find('[data-tabela-elemento="paginador"]').attr('data-tabela-atual');
    var inputAtual = contextoPaginacao.find('[data-tabela-elemento="paginador"]').find('input[name="' + nomeInput + '"]')

    var form        = $(element.attr('data-form'))
    var atual = inputAtual.val();

    contextoPaginacao.find('[data-tabela-elemento="paginador"] a[data-pagina="' + atual + '"]').addClass('atual')
    contextoPaginacao.find('[data-tabela-elemento="paginador"] a').each(function () {

        $(this).click(function () {
            if (inputAtual.val() == $(this).attr('data-pagina'))
                return;

            inputAtual.val($(this).attr('data-pagina'))
            form.submit();

        }).attr('href', 'javascript:void(0)')

    })
}
(function ($) {
//http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
    $.fn.serializeObject = function () {

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push": /^$/,
                "fixed": /^\d+$/,
                "named": /^[a-zA-Z0-9_]+$/
            };


        this.build = function (base, key, value) {
            base[key] = value;
            return base;
        };

        this.push_counter = function (key) {
            if (push_counters[key] === undefined) {
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function () {

            // skip invalid keys
            if (!patterns.validate.test(this.name)) {
                return;
            }
            //TODO: converter o númerico quando for decimal
            var k,
                keys = this.name.match(patterns.key),
                merge = isNaN(this.value) ? this.value : parseFloat(this.value),
                reverse_key = this.name;

            while ((k = keys.pop()) !== undefined) {
                
                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if (k.match(patterns.push)) {
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if (k.match(patterns.fixed)) {
                    merge = self.build([], k, merge);
                }

                // named
                else if (k.match(patterns.named)) {
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);

listRegistra["menu"] = { func: aplicarMenu };
listRegistra["painelretratil"] = { func: aplicarPainelRetratil };
listRegistra["menutipografico"] = { func: aplicarTipoGrafico };
listRegistra["form"] = { func: aplicarSubmitConsulta };
listRegistra["grafico"] = { func: aplicarGrafico };
listRegistra["loadform"] = { func: aplicarLoadForm };
listRegistra["tabelapaginada"] = { func: aplicarTabelaPaginada };
listRegistra["seletorUsuario"] = { func: aplicarSeletor };
listRegistra["seletorLimpar"] = { func: aplicarSeletorLimpar };
listRegistra["clickfor"] = { func: aplicarClickFor };
listRegistra["especificoTabelaRelatorioNotas"] = { func: especificoTabelaRelatorioNotas };
listRegistra["toggleValues"] = { func: aplicarToggleValues };
listRegistra["expandirbox"] = { func: aplicarExpandirBox };
listRegistra["linkpopup"] = { func: aplicarPopUP };
listRegistra["modalpopup"] = { func: aplicarModalPopUP };
listRegistra["loadDiscursiva"] = { func: loadDiscursiva };


function especificoTabelaRelatorioNotas() {
    ajustarTabela();

    var funcao = function () {
        ajustarTabela();    
    }
    $(window).unbind("resize", funcao);
    $(window).bind("resize", funcao);
}

function aplicarToggleValues(elemento) {
    elemento.click(function () {
        $($(this).data("seletorhide")).hide();
        $($(this).data("seletorshow")).show();

        $($(this).data("disabled")).attr("disabled", "disabled");
        $($(this).data("enable")).removeAttr("disabled");
    });

    if (elemento.data("start"))
        elemento.click();
}


function ajustarTabela() {
    var tabela = $("#oiTabela");

    if (tabela.length == 0)
        return;

    var colunaQtdX = tabela.find("thead th.columnX").length;
    var inner = tabela.find(".inner");

    var ultColuna = tabela.find(".columnC");
    var outer = tabela.find(".outer");

    var tamanhoDisponivel = tabela.closest("table").find("tr:first > td:last .conteudoInternoTabela").width();

    var leftUltimaColuna  = ultColuna.css("left").substr(0, ultColuna.css("left").length - 2);
    var tdPainel          = tabela.closest("table").find("td[data-tipo='painelretratil']");
    
    if (tdPainel.hasClass("aberto")) {
        tamanhoDisponivel = tamanhoDisponivel - tdPainel.width();
    }
    outer.width( tamanhoDisponivel - ultColuna.width() );
    ultColuna.css("left", outer.width());

    tamanhoDisponivel = tabela.closest("table").find("tr:first > td:last .conteudoInternoTabela").width();
    outer.width(tamanhoDisponivel - ultColuna.width());
    ultColuna.css("left", outer.width());

    var resultado = inner.width() / colunaQtdX;
    var tamanhoColuna = resultado > 150 ? resultado : 150;
    tabela.find(".columnX").attr("width", tamanhoColuna);
    tabela.find("th.columnX:last").attr("width", Math.round(tamanhoColuna));

    var lista = [];

    tabela.find("th.columnX").each(function () {
        var columnId = $(this).find("input[name=avaliacaoFundoTabela]").val();
        var columnNumber = $("input[name=avaliacaoFundoFiltro][value=" + columnId + "]").data("par");
        $(this).find(".fundoNumeros").text(columnNumber);
    });
}



function aplicarClickFor(elemento) {
    var $btn = $( elemento.data("botao") );
    elemento.click(function () {
        $btn.click();
    });
}
function aplicarSeletorLimpar(elemento) {
    var submit = elemento.data("submit") == true;
    var $box = $("#" + elemento.data("boxid"));
    var form = elemento.closest("form");

    elemento.click(function () {

        if ($box.find("div").length == 0)
            return;

        $box.find("div").remove();

        if (submit) {
            form.submit();
        }
    });
}
function aplicarSeletor(elemento) {
    var submit    = elemento.data("submit") == true;
    var $box = $("#" + elemento.data("boxid"));
    var form = elemento.closest("form");

    var formSubmit = function () {
        if (submit) {
            form.submit();
        }
    }

    //TODO: MELHORAR ESTA PARTE
    seletor(
        elemento,
        function (retorno) {
            var inputName = elemento.data("inputname" + retorno.Tipo);

            var div = $("<div>").addClass("tijolo " + retorno.Realizou);
            div.append("<div class='imagem'><img width='27px' height='27px' src='" + retorno.Foto + "' /></div>");
            div.append("<span title='" + retorno.NomeExibicao + "'>" + retorno.NomeExibicao + "</span>");
            div.append("<div class='close'></div>");
            div.append($("<input>").attr({ "name": inputName, "type": "hidden" }).val(retorno.Id).addClass("inptSelecao" + retorno.Tipo));

            div.click(function () {
                $(this).remove();
                formSubmit();
            });

            $box.append(div);

            formSubmit();
        },
        function () {
            var result = [];
            $box.find(".inptSelecao3").each(function () {
                result.push($(this).val());
            });
            return result;
        },
        function () {
            var result = [];
            $box.find(".inptSelecao1").each(function () {
                result.push($(this).val());
            });
            return result;
        },
        function () {
            var arry = form.serializeObject().Consulta.AgendamentosConfig;

            if (arry === undefined)
                arry = [];

            return arry;
        }
    );
}
function seletor( objeto, callBackSelecao, ignorarUsuarios, ignorarGrupos, extrasIds ){
    objeto.autocomplete({
        source: function (request, response) {
            $.ajax({
                url: caminhoBase + "/Relatorios/Visualiza/ListarRealizadores",
                dataType: "json",
                type: "POST",
                data: JSON.stringify({ Seletor: { Palavra: request.term, Quantidade: 50, IgnorarUsuarios: ignorarUsuarios(), IgnorarGrupos: ignorarGrupos(), ArrayIds: extrasIds()} }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var respostas = [];
                    if (data && data.length > 0) {
                        $.map(data, function (item) {
                            respostas.push({
                                data: item,
                                label: item.NomeExibicao,
                                value: "" //Apos clica seta value
                            });
                        });
                    } else {
                        respostas.push({
                            data: 0,
                            label: "Nada encontrado",
                            value: "" //Apos clica seta value
                        });
                    }
                    response(respostas);
                }
            });
        },
        minLength: 1,
        select: function (event, ui) {
            if (ui.item.data != 0 && callBackSelecao) {
                callBackSelecao(ui.item.data);
            }
            //if (ui.item.data == 0 && callBackSelecao)
            //callBackSelecao(0);
        }
    }).data("autocomplete")._renderItem = function (ul, item) {

        var li = $("<li>").data("item.autocomplete", item);
        var a = $("<a>");

        if (item.data == 0) {
            a.append("<span class='nenhumEncontrado'>" + item.label + "</span>");
        } else {
            if (!item.data.Foto)
                item.data.Foto = "";

            a.append("<img width='35px' height='35px' src='" + item.data.Foto + "' />");
            a.append("<div class='conteudo'>"+"<span class='nome'>" + item.data.NomeExibicao + "</span>"+"<span>" + item.data.TipoNome + "</span>"+"</div>"+"<div class='nRealizouIcone " + item.data.Realizou + "'></div>" );
        }

        li.append(a);

        return li.appendTo(ul);
    }
}



function exportarRelatorio($a) {
    var link = $a.attr('href');
    var formOrigem = $a.closest('form');
    $a.click(function () {

        var parseFom = formOrigem.serializeObject();
        var data = JSON.stringify(parseFom);

        var formPost = $('<form></form>');
        formPost.attr('method', 'post');
        formPost.attr('action', link);
        var input = $('<input name="datajson"/>')
        input.val(data);
        formPost.append(input);
        formPost.submit();

    }).attr('href', 'javascript:void(0);');
}
listRegistra["btnexportar"] = { func: exportarRelatorio };


function _aplicarExpandir($this) {
    var atualEstado = $this.data("estado");
    var destino     = $this.data("destino");

    if (atualEstado == "fechado") {
        if ($this.attr("href") != "" && $this.attr("href") != "#" && $this.attr("href") != $this.data("lastLink") ) {
            loadGet($this.attr("href"), function (sucesso, data) {
                if (sucesso) {
                    $this.data("lastLink", $this.attr("href"));
                    $this.data("estado", "aberto");
                    $this.text($this.data("textaberto"));
                    $(destino).html(data);
                    $(destino).show("fast");
                }
            });
        } else {
            $this.data("estado", "aberto");
            $this.text($this.data("textaberto"));
            $(destino).show("fast");
        }
    } else {
        $this.data("estado", "fechado");
        $this.text($this.data("textfechado"));
        $(destino).hide("fast");
    }
}

function aplicarExpandirBox(elemento) {
    elemento.click(function (e) {
        e.preventDefault();
        _aplicarExpandir($(this));
    });

    if ( elemento.data("estado") == "fechado" )
        $( elemento.data("destino") ).hide();

}


function aplicarPopUP(elemento) {
    var link = elemento.data("link");
    var titulo = elemento.attr("title");
    var width = elemento.data("width");
    var height = elemento.data("height");
    var scroll = elemento.data("scroll");
    var resiza = elemento.data("resizable");
    var propriedades = [];
    
    if (resiza) {
        propriedades.push("resizable=1");
    }
    if (scrollbars) {
        propriedades.push("scrollbars=1");
    }
    propriedades.push("height=" + height);
    propriedades.push("width=" + width);

    elemento.click(function () {
        window.open(link, titulo, propriedades.join());
    });
}

function aplicarModalPopUP(elemento) {

    $(elemento).click(function () {
        carregando.mostrar();
        var $seletor = $($(this).data("popseletor"));
        var link = $(this).data("link");

        if (!$seletor.hasClass('ui-dialog-content')) {
            $seletor.dialog({ dialogClass: 'SEC025_DIALOG',
                autoOpen: false, modal: true,
                width: 885, height: 560,
                position: ['center', 'center'],
                draggable: false, resizable: false
            });
        }

        $.ajax({
            url: link,
            success: function (data) {
                if (!retornoErro(data)) {
                    $seletor.html(data);
                }
                carregando.esconder();
            }
        });


        $seletor.dialog("open");
    });
}

function loadDiscursiva(elemento) {
    var parseFom = formulario.serializeObject();
    parseFom.Consulta.Tipo = 7;
    parseFom.Consulta.QuestaoSelecionada = parseInt(elemento.attr('data-idquestao'), 10);
    parseFom.Paginacao = { Atual: 1, Limite: 3, Itens: 5 };

    function carregarDados() {
        var data = JSON.stringify(parseFom);

        $.ajax({
            url: formulario.attr("action"),
            data: data,
            type: formulario.attr("method"),
            dataType: "text",
            processData: false,
            contentType: "application/json; charset=utf-8",
            /*success: function (dados, status, xhttp) {
            retornoSubmitConsulta(dados)
            }*/
            beforeSend: function () {
                carregando.mostrar();
            },
            success: function (dados, status, xhttp) {
                carregando.esconder();
                if (!retornoErro(dados)) {
                    elemento.html(dados);
                    unobstrusiveAplicar(elemento)
                    //aplicar os botoes de paginação
                    aplicarPaginacao(elemento);
                } else {
                    console.log('erro')
                }
            },
            error: function () {
                carregando.esconder();
                //callBack(false)
                console.log('erro')
            }

        });
    }
    function aplicarPaginacao(element) {
        element.find('[data-tabela-elemento="paginador"] a').click(function () {
            parseFom.Paginacao.Atual = parseInt($(this).attr('data-pagina'), 10);
            carregarDados();
        }).attr('href', 'javascript:void(0)')
    }

    carregarDados();
   
}