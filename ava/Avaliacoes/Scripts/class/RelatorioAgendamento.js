function RelatorioAgendamento(sDialogo, sVoltar, sOk, sExportar, fRetorno) {
    var aq = this;

    this.FUNCAO_VAZIA = "javascript:void(0)";

    this.dialogo = sDialogo;
    this.form = this.dialogo + ' form '
    this.btnVoltar   = sVoltar;
    this.btnOk       = sOk;
    this.btnExportar = sExportar;
    this.acaoRetorno = fRetorno;
    this.tblNova;
    this.reload = false;


    this.init = function () {

        $(this.dialogo).dialog({ dialogClass: 'SEC025_DIALOG',
            autoOpen: false, modal: true,
            width: 885, height: 560,
            position: ['center', 'center'],
            draggable: false, resizable: false
        });

        $(aq.btnVoltar).attr('href', FUNCAO_VAZIA).click(function () {
            aq._AbrirRelatorio();
        });

        $(aq.btnExportar).attr('href', FUNCAO_VAZIA).click(function () {
            $("#hdExportar").val($("#idAplicacaoRelatorio").val());
            $("#frmExportar input[name='strGrupoSelect']").val($('.relatorioSuperior #slcGrupoRelatorio').val());
            
            $("#frmExportar").submit();
        });
        $(aq.btnOk).attr('href', FUNCAO_VAZIA).click(function () {
            $(aq.dialogo).dialog("close");
        });

        //var nomeForm = $(this.form).attr('id')
        this.tblNova = new Tabela('frmTabelaRelatorio', 'tblRelatorio', false, new Ordenacao("modificado", true), undefined);
        this.tblNova.retornoCarregarTabela = this.retornoCarregarTabela
    };

    this._AbrirAuditoria = function () {
        $(aq.btnVoltar).show();
        $(aq.btnExportar).hide();
        $(aq.btnOk).hide();
        $(".relatorio").hide();
        $(".auditoria").show();
        $(aq.dialogo).dialog({ title: "Auditoria da avaliação" });
    }
    this._AbrirRelatorio = function () {
        $(aq.btnVoltar).hide();
        $(aq.btnExportar).show();
        $(aq.btnOk).show();
        $(".relatorio").show();
        $(".auditoria").hide();
        $(aq.dialogo).dialog({ title: "Relatório da turma" });
    }

    this.Abrir = function (id) {
        $("#idAplicacaoRelatorio").val(id);
        $(aq.dialogo).dialog("open");
        aq._AbrirRelatorio();
        $(".relatorioSuperior .destaqueAzul").html('');
        aq.tblNova.recarregarTabela();
    }
    
    this.retornoCarregarTabela = function (dados) {
        retornoErro(dados);
        
        if (!aq.reload) {
            $(".relatorioSuperior .destaqueAzul").html($(dados).find("tfoot tr td").html());
            $('.relatorioSuperior #slcGrupoRelatorio').selectcombo();
            $('.relatorioSuperior #slcGrupoRelatorio').change(function () {
                aq.reload = true;
                $('#dlgRelatorio #strGrupoSelect').val(this.value);
                aq.tblNova.recarregarTabela();
            });

        }
        $('#dlgRelatorio #strGrupoSelect').val(-1);
        aq.reload = false;
        
        //seleção de grupos
        
    }

    RelatorioVisualizarAvaliacao = function (id) {
        window.open(caminhoBase + '/Realizacao/VisualizarRealizada/' + id, 'VisualizaProva', 'width=800, height=600, scrollbars=1');
    }
    RelatorioAuditoriaAvaliacao = function (id, idSec) {
        var idTer = $("#idAplicacaoRelatorio").val();
        $.ajax({
            url: caminhoBase + '/Agendamento/Auditoria/' + id + '/' + idSec + '/' + idTer,
            success: function (dados, status, xhttp) { aq.retornarAuditoria(dados);  }
        });
    }

    this.retornarAuditoria = function (dados) {
        if (retornoErro(dados)) {
            return;
        }
        aq._AbrirAuditoria();
        $(".auditoria").html(dados);
    }
    this.retornoExportar = function () {
    }
    this.init();
}