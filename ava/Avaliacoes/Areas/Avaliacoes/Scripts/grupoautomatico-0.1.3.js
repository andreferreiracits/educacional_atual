//para o grupo automatico
(function (P, $) {
    "use strict";

    P.add("avl_grupo_automatico", function () {
        var me = this;

        this.init = function () {
            P.base.on("dialogGroupIsLoad", function (evt, element) {
                var inputs = '<input type="hidden" name="Grupo[Sorteio]" value="${Sorteio}" />' +
                             '<input type="hidden" name="Grupo[Valor]" value="${Valor}" />';

                element.find('form').append(inputs);

            });
        };
    });

    P.add("avl_tbl_grupo", function () {
        var me = this;


        this.render = function ($e) {

            me.base.apply($e);

            me.chain.add($e, "edit", function (next, dto) {
                dto = dto['Grupo'];
                dto.Cor = dto.Cor.replace('#', '');

                var salvou = me.base.save(dto, $e, undefined, function (json) {
                    var lstControle = [];
                    for (var i = 0, j = json['Itens'].length; i < j; i++) {
                        var cor = (json['Itens'][i]['Cor']).toLowerCase();
                        if ($.inArray(cor, lstControle) > -1) {
                            return false;
                        }
                        lstControle.push(cor);
                    }

                    return true;
                });

                if (salvou) {
                    next();
                } else {
                    var erro = { 'Tipo': 'Erro', 'Mensagem': me.param($e, 'msg_valida_cor') };
                    P.onError(erro);
                }
            });

            me.events.listener($e, 'remove', function (evt, dto) {
                evt.stopImmediatePropagation();

                me.base.remove(dto, $e);
            });

            me.events.listener($e, 'refresh', function () {

                var tmpData = $e.find(' [data-avl_tbl-body="data"]:first-child');
                me.base.update($e, $.parseJSON(tmpData.val()));

            });

            me.events.listener($e, 'tblquestoes', function (evt) {
            });

            me.events.listener($e, 'edit_group', function (evt, dto) {
                var campoData = $e.find(' [data-avl_tbl-body="data"]:first-child');
                var tmpData = $.parseJSON(campoData.val());
                var sendData = tmpData.Itens[dto];
                $(P.base).trigger('onGrupo', [sendData]);
                $(P.base).trigger('applyTmpl', [sendData]);
            });


            me.events.listener($e, 'update_valores', function (evt, dto) {
                var campoData = $e.find(' [data-avl_tbl-body="data"]:first-child');
                var tmpData = $.parseJSON(campoData.val())
                var keys = dto.name.match(/[a-zA-Z0-9_]+|(?=\[\])/g).reverse();

                var field = keys[0];
                var indice = parseFloat(keys[1]);

                tmpData.Itens[indice][field] = P.parse(dto.value);

                //atualiza o botão pois ele envia o dado para edição

                campoData.val(JSON.stringify(tmpData));

            });



        };




    }, "avl_tbl");



    P.add("avl_questao_grupo", function () {
        var me = this;

        this.click = function ($a) {
            //Avaliacao[Grupos][0]
            var questoes = [];
            $('input[name^="Avaliacao[Grupos]"][name$="[Questoes][]"]').each(function () {
                questoes.push(this.value);
            });

            var dto = {
                Prova: { IdBanco: $('input[name="Avaliacao[IdBanco]"]').val()
                , QuestoesSelecionadas: questoes
                }
            };
            me.events.dispatch($a, "click", dto);

            me.chain.add($a, 'add_questao', function (next, dto) {
                var tabela = $a.closest('table');

                var linha = $a.closest('tr');

                var indiceGrupo = linha.attr('data-avl_tbl-indice');

                var data = tabela.find(' [data-avl_tbl-body="data"]:first-child');
                var json = $.parseJSON(data.val());
                var questoes = json['Itens'][indiceGrupo]['Questoes'];
                if (!questoes) {
                    json['Itens'][indiceGrupo]['Questoes'] = [];
                    questoes = [];
                }
                json['Itens'][indiceGrupo]['Questoes'] = $.merge(questoes, dto['Questao']);
                data.val(JSON.stringify(json));
                next();

                me.events.dispatch($a, 'refresh_table');


            });
        };


    });

    P.add("avl_tbl_grupo_cor", function () {
        var me = this;

        this.render = function ($e) {

            me.events.listener($e, 'apply_cor', function (evt) {
                applyCorGrupo($e);
            });

        };

        var applyCorGrupo = function ($e) {
            var input = $e.find('input[name^="Avaliacao[Grupos]["][name$="][Cor]"]');
            input.each(function () {
                var tr = $(this).closest('tr');
                var indice = tr.attr('data-avl_tbl-indice');
                var cor = '#' + $(this).val();
                var background = 'linear-gradient(to bottom, ' + cor + ', ' + cor + ')';
                tr.find(' > td:first-child').css('background-image', background);
                tr.css('border-bottom', '1px solid ' + cor);

                var trAux = $e.find(' > tbody > tr[data-avl_tbl-auxiliar="' + indice + '"]');
                trAux.find(' > td:first-child').css('background-image', background);
                trAux.css('border-bottom', '1px solid ' + cor);

            });

        };
    });

    P.add("avl_remove_questao_grupo", function () {
        var me = this;

        this.click = function ($a) {
            var indiceGrupo = $a.closest('tr').attr('data-avl_tbl-auxiliar');
            var form = $('<form></form>');
            var tabela = $a.closest('table');


            form.append($a.closest('td').find(' > section input').clone());
            var dto = P.serializeObject(form);

            var data = $(tabela.find(' [data-avl_tbl-body="data"]:first-child').get(0));
            var json = $.parseJSON(data.val());
            var questoes = json['Itens'][indiceGrupo]['Questoes'];

            json['Itens'][indiceGrupo]['Questoes'] = [];

            for (var i = 0, j = questoes.length; i < j; i++) {
                if ($.inArray(questoes[i], dto["Questao"]) <= -1) {
                    json['Itens'][indiceGrupo]['Questoes'].push(questoes[i]);
                }
            }


            data.val(JSON.stringify(json));

            me.events.dispatch($a, 'refresh_table');

        };


    });

    P.add("avl_tbl_grupo_preview", function () {
        var me = this;
        this.click = function ($a) {
            var target = me.target($a);
            var lista = me.param($a, "lista");
            var questoes = [];
            var tr = $a.closest('tr');
            tr.next().find('input[name$="[Questoes][]"]').each(function () {
                questoes.push(this.value);
            });

            var jsonSend = { Filtros: {
                Tipo: 2,
                Questoes: questoes
            }
            };

            this.base.action($a, {
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(jsonSend),
                error: function () {
                    me.base.hide($a, target, lista);
                },
                cache: false
            });

            var input = tr.find('input[name^="Avaliacao[Grupos]["][name$="][Cor]"]');
            var cor = '#' + input.val();
            var trAux = tr.next();

            if (trAux.is(':visible')) {
                tr.css('border-bottom', 'none');
            } else {
                tr.css('border-bottom', '1px solid ' + cor);
            }


        };

    }, "avl_tbl_preview");

    P.add("avl_convert_old", function () {
        var me = this;

        this.click = function ($a) {

            me.base.click($a);

            me.chain.add($a, 'confirm', function (next) {
                var link = $a.attr('data-ajaxlink-href');
                $a.attr('data-ajaxlink-href', link + '/1');
                next();
                me.base.click($a);
            });
        };

    }, "avl_tbl_preview");

    P.add("avl_input_grupo_data", function () {
        var me = this;

        this.render = function ($input) {
            $input.change(function (evt) {
                var valor = evt.target.value;
                var name = $(this).attr('name');

                me.events.dispatch($(this), "update_input", { name: name, value: valor });


            });
        };

    });

})(PlungerJs, jQuery);