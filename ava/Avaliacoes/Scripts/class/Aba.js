function Aba(sId, oFuncao) {
    var aba = this;

    this.id = '#' + sId;
    this.nome = sId;
    this.onclick = oFuncao;

    this.init = function() {
        var funcaoVazia = 'javascript:void(0);';

        $('ul' + this.id + ' > li').each(function() {
            $('a:first', this).click(function() {
                var li = $(this).parent();
                
                aba.onclick(li.attr('id'));

            }).attr('href', funcaoVazia);
        });
    }

    this.selecionar = function(item) {
        var li = $('ul' + this.id + ' > li#' + item);
        var a = $('a:first', li);


        $('ul' + this.id + ' > li > a').each(function() {
            $(this).removeClass('ativo').removeClass('ativoAlerta').removeClass('inativoAlerta');
        });
        
        a.addClass('ativo');
    }

    this.init();
}