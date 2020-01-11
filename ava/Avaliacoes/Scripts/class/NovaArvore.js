function NovaArvore(sContainer, sCaminho, bEditavel, sKeyCache) {
    var arvore = this;
    
    this.caminho = sCaminho;
    this.container = sContainer;
    this.keyCache = sKeyCache;
    this.editavel = bEditavel;
    this.isLoad = false;
    
    this.isLoaded = false;
    this.isLoad = false;
    this.onLoad = undefined;
    
    this.countSelect = []; //contador dos selects por niveis
    this.onChange = undefined;

    this.selectPaisFilhos = true;

    this.formExtraEdicao = undefined;

    this.retornoAcao    = undefined;

    this.CRIAR   = 1;
    this.EDITAR  = 2;
    this.EXCLUIR = 3;



    this.init = function () {
    }

    this.fRetornoAcao = function (acao) {
        if (arvore.retornoAcao)
            arvore.retornoAcao(acao);
    }
    
    this.load = function (oDataPost) {
        if (this.isLoaded)
            return;

        var load = document.createElement("div");
        load.className = "carregando";
        $(this.container).html($(load));

        this.isLoaded = true;

        $.ajax({
            url: this.caminho,
            type: 'POST',
            data: oDataPost ? oDataPost : '',
            success: function (dados) {
                arvore.isLoaded = false;
                arvore.retornoArvore(oDataPost.acao, dados);
            }
        });
    }
    
    this.carregar = function (oDataPost) {
        if (this.isLoad) {
            if (this.onLoad)
                this.onLoad();
            return;
        }

        if (oDataPost) {
            oDataPost['acao'] = 'carregar';
        } else {
            oDataPost = { 'acao': 'carregar' }
        }

        this.load(oDataPost);
    }

    this.retornoArvore = function (acao, dados) {
        if(retornoErro(dados)){
            return;
        }

        switch (acao) {
            case "carregar": this.carregarArvore(dados); break;
        }

        $(arvore.local).find('.carregando').remove();
    }

    this.carregarArvore = function (dados) {

        $(this.container).html(dados);
        this.isLoad = true;

        this.abrirFechado(this.container + " > ul > li", 0);

        //botoes para edição
        $(this.container + ' li span.adicionar').hide();

        this.configEditavel($(this.container + ' li'));
        this.configAdicionar($(this.container + ' li'));

        $(this.container + " .representaraiz").hide();
        if (this.onLoad)
            this.onLoad();
    }

    this.abrirFechado = function (strConteiner, idNivel) {
        this.countSelect[idNivel] = 0;
        if ($(strConteiner).length > 0) {
            $(strConteiner + " > ul").hide();
            $(strConteiner + " > img.ico").click(function () {
                arvore.abrirFecharNo($(this));
            })

            //ação para o check
            $(strConteiner + " > input[type='checkbox']").change(function () {
                
                if (arvore.editavel)
                    return;
                //marcar/desmarcar todos os filhos e marcar/desmarcar o pai
                
                if ($(this).is(':checked')) {
                    //filhos
                    arvore.checkFilhos($(this).parent(), true);
                    //pai (verificar se todos do mesmo nivel estão marcados
                    arvore.checkPai($(this).parent().parent().parent(), true);
                } else {
                    //filhos
                    arvore.checkFilhos($(this).parent(), false);
                    //pai
                    arvore.checkPai($(this).parent().parent().parent(), false);

                }

                arvore.countagemSelect(arvore.container + " > ul > li", 0);

                if (arvore.onChange) {
                    arvore.onChange($(this).val(), $(this).is(':checked'), arvore.countSelect);
                }
            })

            this.abrirFechado(strConteiner + " > ul > li", idNivel + 1);
        }

    }

    this.checkFilhos = function (objConteiner, bolCheck) {
        if (!arvore.selectPaisFilhos) {
            //marca o filho pelomenos
            if (bolCheck)
                objConteiner.find(" > ul > li.representaraiz > input[type='checkbox']:not(:checked)").attr('checked', 'checked');
            else
                objConteiner.find(" > ul > li.representaraiz > input[type='checkbox']:checked").removeAttr('checked');
        } else {

            if (bolCheck)
                objConteiner.find(" > ul > li > input[type='checkbox']:not(:checked)").attr('checked', 'checked');
            else
                objConteiner.find(" > ul > li > input[type='checkbox']:checked").removeAttr('checked');
        }
        if (objConteiner.length > 0) {
            arvore.checkFilhos(objConteiner.find(" > ul > li"), bolCheck)
        }
    }
    this.checkPai = function (objConteiner, bolCheck) {
        if (!arvore.selectPaisFilhos) {
            if (objConteiner.find(' > ul > li.representaraiz > input[type="checkbox"]').is(':checked')) {
                objConteiner.find(" > input[type='checkbox']").attr('checked', 'checked');
            }
        } else {

            var todosMesmoNivel = objConteiner.find(" > ul > li > input[type='checkbox']").length;
            if (bolCheck) {
                var todosDesmarcados = objConteiner.find(" > ul > li:not(.representaraiz) > input[type='checkbox']:not(:checked)").length;
                if (todosDesmarcados == 0) {
                    objConteiner.find(" > input[type='checkbox']").attr('checked', 'checked');
                }
            } else {
                var todosMarcados = objConteiner.find(" > ul > li:not(.representaraiz) > input[type='checkbox']:checked").length;
                if (todosMarcados < todosMesmoNivel) {
                    objConteiner.find(" > input[type='checkbox']").removeAttr('checked');
                }
            }
        }
        if (objConteiner.parent().parent().find(" > input[type='checkbox']").length > 0)
            this.checkPai(objConteiner.parent().parent(), bolCheck);

        //voltar recursivo para "traz"
    }

    this.countagemSelect = function (strConteiner, idNivel) {

        arvore.countSelect[idNivel] = $(strConteiner + ':not(.representaraiz) > input[type="checkbox"]:checked').length;

        if ($(strConteiner).length > 0) {
            arvore.countagemSelect(strConteiner + " > ul > li", idNivel + 1);
        }
    }

    this.abrirFecharNo = function (objNo) {
        if (objNo.hasClass('mais')) {
            objNo.parent().find(' > ul').show('fast');
            objNo.removeClass('mais');
            objNo.addClass('menos');
            objNo.attr('src', caminhoBase + "/" + "Content/imgcss/icoMenos.png")
        } else {
            objNo.parent().find(' > ul').hide('fast');
            objNo.removeClass('menos');
            objNo.addClass('mais');
            objNo.attr('src', caminhoBase + "/" + "Content/imgcss/icoMais.png")
        }
    }

    this.configEditavel = function (content) {

        content.find('span.botoes').hide();
        content.find('span.edicao').hide();

        if (!this.editavel)
            return

        //over
        content.find('span.nome a.editavel.pertence').parent().mouseenter(function () {
            $(this).parent().addClass('over');
            $(this).find('> span.botoes').show();
        }).mouseleave(function () {
            if (!$(this).parent().hasClass('editar')) {
                $(this).parent().removeClass('over');
            }
            $(this).find('> span.botoes').hide();
        });
        //clicks
        content.find('span.botoes a.btnEditarNo').click(function () {
            arvore.abrirEdicao($(this).closest('li'))
        }).attr('href', 'javascript:void(0);');

        content.find('span.edicao a.btnCancelarNo').click(function () {
            arvore.fecharEdicao($(this).closest('li'));
        }).attr('href', 'javascript:void(0);');

        this.criarSalvar(content.find('span.edicao'));

        this.criarExcluir(content.find('span.botoes'))

    }

    
    this.abrirEdicao = function (container) {
        container.addClass('editar');
        container.find('> span.edicao').show();
        container.find('> span.nome').hide();
    }
    this.fecharEdicao = function (container) {
        container.removeClass('editar').removeClass('over');
        container.find('> span.edicao').hide();
        container.find('> span.nome').show();
        var nomeOriginal = container.find('> span.nome label').text();
        container.find('> span.edicao input[name="strNomeNo"]').val(nomeOriginal);
    }

    this.criarSalvar = function (container) {
        var linkSalvar = container.find('a.btnSalvarNo').attr('href');
        container.find('a.btnSalvarNo').click(function () {

            var cont = $(this);
            var ids = $(this).closest('li').find('> input[name="idClassificacao"]').val();
            var nome = $(this).closest('li').find('> span.edicao > input[name="strNomeNo"]').val();
            if (!nome || $.trim(nome) == "") {
                return;
            }
            var tmpForm = $('<form></form>');
            tmpForm.append($('<input type="hidden" name="ids" value="' + ids + '" />'))
            tmpForm.append($('<input type="hidden" name="texto" value="' + nome + '" />'))

            $.ajax({
                url: linkSalvar,
                type: 'POST',
                data: tmpForm.serialize() + (arvore.formExtraEdicao ? "&" + $(arvore.formExtraEdicao).serialize() : ""),
                success: function (dados) {
                    if (retornoErro(dados)) {
                        return;
                    }
                    var retorno = eval(dados);
                    var nome = retorno["texto"];
                    cont.closest('li').find('> span.nome label').html(nome);
                    arvore.fecharEdicao(cont.closest('li'));

                    arvore.fRetornoAcao(arvore.EDITAR);
                }
            });
        }).attr('href', 'javascript:void(0);');
    }

    this.criarExcluir = function (container) {

        var linkExcluir = container.find('a.btnExcluirNo').attr('href');

        container.find('a.btnExcluirNo').click(function () {
            var cont = $(this);
            var ids = $(this).closest('li').find('> input[name="idClassificacao"]').val();
            var tmpForm = $('<form></form>');
            tmpForm.append($('<input type="hidden" name="ids" value="' + ids + '" />'))

            $.ajax({
                url: linkExcluir,
                type: 'POST',
                data: tmpForm.serialize() + (arvore.formExtraEdicao ? "&" + $(arvore.formExtraEdicao).serialize() : ""),
                success: function (dados) {
                    if (retornoErro(dados)) {
                        return;
                    }

                    cont.closest('li').remove();
                    arvore.fRetornoAcao(arvore.EXCLUIR);
                }
            });
        }).attr('href', 'javascript:void(0);');
    }

    this.configAdicionar = function (content) {

        content.find('span.adicionar').hide();

        if (!this.editavel)
            return
//
        $(content).find(' a.addno').click(function () {
            $(this).hide();
            $(this).closest('li').find('> span.adicionar').show();
            $(this).closest('li').addClass('editar').addClass('over');
        })

        $(content).find(' span.adicionar a.btnCancelarNo').click(function () {
            $(this).closest('span.adicionar').hide();
            $(this).closest('li').find('> a.addno').show();
            $(this).closest('li').removeClass('editar').removeClass('over');
            $(this).closest('li').find('> span.adicionar > input[name="strNomeNo"]').val('')
        }).attr('href', 'javascript:void(0);');

        this.criarNovo($(content).find(' span.adicionar'));

    }
    this.criarNovo = function (container) {
        var linkSalvar = container.find('a.btnSalvarNo').attr('href');
        container.find('a.btnSalvarNo').click(function () {
            var cont = $(this);
            var ids = $(this).closest('li').find('> input[name="idClassificacao"]').val();
            var nome = $(this).closest('li').find('> span.adicionar > input[name="strNomeNo"]').val();

            if (!nome || $.trim(nome) == "") {
                return;
            }
            var tmpForm = $('<form></form>');
            tmpForm.append($('<input type="hidden" name="ids" value="' + ids + '" />'))
            tmpForm.append($('<input type="hidden" name="texto" value="' + nome + '" />'))

            $.ajax({
                url: linkSalvar,
                type: 'POST',
                data: tmpForm.serialize() + (arvore.formExtraEdicao ? "&" + $(arvore.formExtraEdicao).serialize() : ""),
                success: function (dados) {
                    if (retornoErro(dados)) {
                        return;
                    }
                    var conteudo = $($(dados).html());
                    cont.closest('li').after(conteudo);
                    //var conteudo = cont.closest('ul').find('>li:gt(2)');
                    //alert(conteudo.html());
                    cont.closest('li').remove();
                    //alert(conteudo.html());

                    arvore.configEditavel(conteudo);
                    arvore.configAdicionar(conteudo);


                    $(conteudo).find(" > ul").hide();
                    $(conteudo).find(" > img.ico").click(function () {
                        arvore.abrirFecharNo($(this));
                    })

                    arvore.fRetornoAcao(arvore.CRIAR);
                }
            });
        }).attr('href', 'javascript:void(0);');
    }
    this.init();
}