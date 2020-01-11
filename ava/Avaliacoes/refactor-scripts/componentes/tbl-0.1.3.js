//tabelas de listagem
(function (P, $) {
    "use strict";

    P.add("avl_tbl", function () {
        var me = this;

        this.render = function ($e) {
            me.apply($e);

            me.events.listener($e, 'refresh', function () {
                var tmpData = $e.find(' [data-avl_tbl-body="data"]:first-child');
                aplicarContent($e, $.parseJSON(tmpData.val()), linhas);
                me.update($e, $.parseJSON(tmpData.val()));
            });
        };


        var aplicarContent = function ($e, data, linhas) {

            $e.find(' > [type="text/x-jquery-tmpl"]').each(function () {
                P.tmpl($(this), data);
            });

            var empty = $e.find(' > [data-avl_tbl-body="empty"]'); // me.extra('body', 'empty');
            var loader = $e.find(' > [data-avl_tbl-body="loader"]'); // me.extra('body', 'loader');
            var rodape = $e.find('> tfoot');
            var content = $e.find(' > [data-avl_tbl-body="content"]'); // me.extra('body', 'content');

            if (linhas) {
                addIndice(linhas(content));
            } else {
                addIndice(getLinhas(content));
            }

            if ($.trim(content.html()) == "") {
                empty.show();
                rodape.hide();
            } else {
                empty.hide();
                rodape.show();
            }

            navegarPagina($e);


            me.events.dispatch($e, 'update');
        };

        var navegarPagina = function ($e) {
            var menu = $e.find("[data-avl_tbl-pag_atual]");
            var paginaAtual = me.param(menu, "pag_atual");
            if (paginaAtual) {
                var fildPaginaAtual = $e.find(paginaAtual);

                menu.find('a').click(function (evt) {
                    evt.preventDefault();

                    fildPaginaAtual.val($(this).attr('href'));
                    me.apply($e);
                });

            }
        };

        this.apply = function ($e, linhas) {

            var content = $e.find(' > [data-avl_tbl-body="content"]');
            var template = $e.find(' > [data-avl_tbl-body="template"]');
            var empty = $e.find(' > [data-avl_tbl-body="empty"]');
            var loader = $e.find(' > [data-avl_tbl-body="loader"]');
            var rodape = $e.find('> tfoot');
            var url = me.param($e, "href");
            var dataPost = me.param($e, "data_post");
            var pseudoForm = $e.find(' > [data-avl_tbl-body="form"]');
            if (pseudoForm.length > 0) {
                pseudoForm = $('<form></form>').append(pseudoForm.find('input').clone());
                var dataPseudoForm = P.serializeObject(pseudoForm);
                dataPost = dataPost || {};
                dataPost = $.extend({}, dataPseudoForm, dataPost);

            }

            rodape.hide();
            empty.hide();
            content.html('');
            if (url) {
                loader.show();

                P.ajax({
                    url: url,
                    cache: false,
                    type: dataPost ? 'POST' : 'GET',
                    data: dataPost ? JSON.stringify(dataPost) : "",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (retornoJson) {
                        retornoJson = aplicarIndice(retornoJson);
                        
                        var tmpData = $e.find(' [data-avl_tbl-body="data"]:first-child'); // me.extra('body', 'data')
                        tmpData.val(JSON.stringify(retornoJson));
                        aplicarContent($e, retornoJson, linhas);
                        me.events.dispatch($e, 'render');
                    },
                    complete: function () {
                        loader.hide();
                    }
                });
                return;
            } else {

                var tmpData = $e.find(' [data-avl_tbl-body="data"]:first-child'); // me.extra('body', 'data')
                aplicarContent($e, $.parseJSON(tmpData.val()), linhas);
                me.events.dispatch($e, 'render');
            }
        };

        var aplicarIndice = function (listaJson) {
            if (listaJson.Itens.length > 0) {
                for (var i = 0, j = listaJson.Itens.length; i < j; i++) {
                    listaJson.Itens[i]._indice = i;
                }
            }
            return listaJson;
        };
        var getLinhas = function (content) {
            return content.find('tr[data-avl_tbl-indice]');
        };
        var addIndice = function (linhas) {
            linhas.each(function (index, value) {
                me.param($(value), 'indice', index);
            });
        };

        this.update = function ($e, data, linhas) {
            aplicarContent($e, data, linhas);
        };


        this.save = function (dto, $e, linhas, validate) {
            var data = $e.find(' [data-avl_tbl-body="data"]:first-child');
            var json = $.parseJSON(data.val());

            var field = me.param($e, "field");
            var indice = dto._indice;

            if (indice < 0) {
                dto._indice = field ? json[field].length : json.length;
                field ? json[field].push(dto) : json.push(dto);
            } else {
                if (field) {
                    json[field][indice] = $.extend(json[field][indice], dto);
                } else {
                    json[indice] = $.extend(json[indice], dto);
                }
            }

            if (!validate || validate(json)) {
                data.val(JSON.stringify(json));
                me.update($e, json, linhas);
                return true;
            } else {
                return false;
            }

        }

        this.remove = function (indice, $e, linhas) {
            var data = $e.find(' [data-avl_tbl-body="data"]:first-child'); // me.extra('body', 'data');
            var json = $.parseJSON(data.val());
            var field = me.param($e, "field");
            field ? json[field].splice(indice, 1) : json.splice(indice, 1);

            json = aplicarIndice(json);

            data.val(JSON.stringify(json));
            me.update($e, json, linhas);
            return json;
        }

    });

    P.add("avl_tbl_view", function () {
        var me = this;

        this.abertos = {};

        this.hide = function ($a, target, lista) {
            me.abertos[lista] = undefined;
            me.aria($a, 'expanded', false);
            me.aria(target.closest('tr'), 'expanded', false);

        };
        this.click = function ($a) {
            var target = me.target($a);
            var lista = me.param($a, "lista");
            this.action($a);

        };

        this.action = function ($a) {

            var show = me.aria($a, 'expanded');
            var target = me.target($a);
            var lista = me.param($a, "lista");

            var aberto = me.abertos[lista];

            if (!show) {
                if (aberto) {
                    me.aria(aberto, 'expanded', false);
                    me.target(aberto).hide();
                    me.aria(me.target(aberto).closest('tr'), 'expanded', false);
                }
                me.aria($a, 'expanded', true);
                me.aria(target.closest('tr'), 'expanded', true);
                target.show();
                me.abertos[lista] = $a;

            } else {
                me.hide($a, target, lista);
            }
        };
    });

    P.add("avl_tbl_preview", function () {
        var me = this;

        this.abertos = {};

        this.hide = function ($a, target, lista) {
            target.html('');
            me.abertos[lista] = undefined;
            me.aria($a, 'expanded', false);
            //target.hide();
            me.aria(target.closest('tr'), 'expanded', false);

        };
        this.click = function ($a) {
            var target = me.target($a);
            var lista = me.param($a, "lista");
            this.action($a, {
                error: function () {
                    me.hide($a, target, lista);
                },
                cache: false
            });

        };

        this.action = function ($a, options) {

            var show = me.aria($a, 'expanded');
            var target = me.target($a);
            var lista = me.param($a, "lista");

            var aberto = me.abertos[lista];

            if (!show) {
                if (aberto) {
                    me.aria(aberto, 'expanded', false);
                    me.target(aberto).hide();
                    me.aria(me.target(aberto).closest('tr'), 'expanded', false);
                }
                me.aria($a, 'expanded', true);
                me.aria(target.closest('tr'), 'expanded', true);
                target.show();
                me.abertos[lista] = $a;
                target.html('<p class="avl_tbl_loader">Carregando...</p>')
                me.base._load($a, options);

            } else {
                me.hide($a, target, lista);
            }
        };

    }, "ajaxlink");

})(PlungerJs, jQuery);