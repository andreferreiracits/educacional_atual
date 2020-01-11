<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<script>

var arrayUsuarioAux = new Array();
var arrayEntidadeAux = new Array();
var quantidadePorPagina;
var rodar;
var unidadeGlobal;
var dtmInicioGlobal;
var dtmFimGlobal;
var bolMsgComentExcluidoGlobal;
var idGrupoGlobal;
var tpGrupoGlobal;
var temporizadorBuscaGrupo = "";

var expanderOptions = {
    slicePoint: 500,
    window: 2,
    expandText: ' leia mais',
    expandPrefix: '...',
    userCollapseText: 'menos',
    preserveWords: true,
    expandEffect: 'fadeIn',
    collapseEffect: 'fadeOut'
};

$(function () {

    configuracoesIniciaisAbaMensagemAdminAVA();

    $(".timeline_filtros").click(function () {
        $('#aviso_style').remove();
    });

    $("#rbTpGerais").bind('click', function () {
        $("#boxUsuarioMensagem").show();
        $("#boxDadosGrupo, #filtroUnidadeMsg").hide();
        $("#txtNomeGrupo").val("");

        excluirFiltroMensagem(3);
        $("#seletorMensagemAdmin").AvaSelector('limparUsuarios');
    });

    $("#rbTpGrupos").bind('click', function () {
        $("#boxUsuarioMensagem").hide();
        $("#boxDadosGrupo").show();

        var qtdUnidade = parseInt($("#qtdUnidade").val());
        if (qtdUnidade > 0) {
            $("#filtroUnidadeMsg").show();
        }

        excluirFiltroMensagem(3);
        $("#seletorMensagemAdmin").AvaSelector('limparUsuarios');
        $("#seletorMensagemAdmin").find("input").val("");
    });

    $("#txtNomeGrupo").live('keyup', function (event) {

        if (temporizadorBuscaGrupo != null && temporizadorBuscaGrupo != "" && temporizadorBuscaGrupo !== undefined) {
            clearTimeout(temporizadorBuscaGrupo);
        }

        var _sPesquisa = $(this).val();

        temporizadorBuscaGrupo = setTimeout(function () {

            if (_sPesquisa.length > 0) {

                $("#txtNomeGrupo").addClass("ui-autocomplete-loading");

                $.ajax({
                    method: 'POST',
                    url: "/AVA/Grupo/Home/PesquisaGrupo/",
                    data: { strPesquisa: _sPesquisa },
                    success: function (data) {
                        $("#txtNomeGrupo").removeClass("ui-autocomplete-loading");
                        $("#grupolistapesquisa").empty().show().html(data);

                        $("#grupolistapesquisa").find("li").each(function () {

                            var _idGrupo = $(this).find("a").attr("id"); //idGrupo do retorno do ajax
                            var _strClassGrupo = "g_" + _idGrupo; //classe contida nas lajotinhas do filtro

                            if ($(".lajotinha").hasClass(_strClassGrupo)) {//se já existe este grupo inserido no filtro
                                $(this).addClass("selecionado"); //add classe na lista do retorno do ajax
                            }

                        })

                        $("#grupolistapesquisa ul li").on('click', function () {

                            var _this = $(this).find('a');

                            var _idGrupo = _this.attr("id");
                            var _strFoto = _this.attr("foto");
                            var _strNome = _this.text();

                            var _strClassGrupo = "g_" + _idGrupo;

                            if (!$('.lajotinha').hasClass(_strClassGrupo)) {
                                $(this).addClass("selecionado");

                                $('.listaLajotinhas').append('<div class="lajotinha g_' + _idGrupo + '" grupo-id="' + _idGrupo + '"><img width="24" height="24" src="' + _strFoto + '"><span>' + _strNome + '</span><a class="excluir_lajotinha FontAwesome" href="javascript:void(0);"></a></div>');
                            }

                        });


                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug(data.responseText);
                        }
                    }

                });
            } else {
                $("#grupolistapesquisa").empty().hide();
            }

        }, 500);

    });

    $('body').on("click", function (event) {

        if (!($(event.target).closest(".grupos_resultado_adm").hasClass("grupos_resultado_adm")) && !($(event.target).closest("#boxDadosGrupo").hasClass("itens"))) {
            $("#grupolistapesquisa").empty().hide();
            $("#txtNomeGrupo").val("");
        }
    });

});

function limpar_filtro() {

    excluirFiltroMensagem(2);
    excluirFiltroMensagem(3);
    excluirFiltroMensagem(4);
    $("#seletorMensagemAdmin").AvaSelector('limparUsuarios');

    arrayUsuarioAux.length = 0;
    arrayEntidadeAux.length = 0;
        
}

function filtrar_mensagem() {

    var dtmInicio = $("#dtmIniPesq").val();
    var dtmFim = $("#dtmFimPesq").val();
    var bolMsgComentExcluido = 0;

    if (bolFezAlteracaoConfiguracoes) {
        destinoConfiguracoes = 'btnFiltrarMensagens';
        CustomConfirmConfiguracoes('btnFiltrarMensagens', objetoIdMensagemRapida, 0);
    } else {
        $('#aviso_style').remove();
        if (!valida_data(dtmInicio) || !valida_data(dtmFim)) {
            return false;
        } else {

            $(".timeline").html('<div style="padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 28%;" id="loader_timeline"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"></div>');

            data = new Date();

            dia = data.getDate();
            mes = data.getMonth();
            ano = data.getFullYear();

            if (dtmInicio == "" || dtmInicio == null) {
                dtmInicio = dia + "/" + (mes + 1) + "/" + ano;
            }

            if (dtmFim == "" || dtmFim == null) {
                dtmFim = dia + "/" + (mes + 1) + "/" + ano;
            }

            if ($("#check_excluidos").is(":checked")) {
                bolMsgComentExcluido = 1;
            }

            var unidade = -1;
            var strUnidade = "";
            if ($('#cbUnidade').val() != undefined && !$("#rbTpGerais").is(":checked")) {
                unidade = $('#cbUnidade').val();

                if (unidade == 0) {
                    strUnidade = "Todas as unidades";
                } else {
                    strUnidade = $('#cbUnidade :selected').text();
                }
            
            }

            var idGrupo = "";

            var tpGrupo = $("#cbTipoGrupo :selected").val();

            montaLajotinhaFiltroMensagem(dtmInicio, dtmFim, bolMsgComentExcluido, strUnidade);

            if ($("#rbTpGerais").is(":checked")) {
                paginacaoListaMensagemAdmin(unidade, dtmInicio, dtmFim, bolMsgComentExcluido, arrayUsuarioAux, arrayEntidadeAux);
            } else {

                $(".lajotinha").each(function () {

                    if ($(this).attr("grupo-id") != undefined) {
                        var _idGrupo = $(this).attr("grupo-id");

                        idGrupo += _idGrupo + ",";
                    }

                })

                paginacaoListaMensagemGrupoAdmin(unidade, dtmInicio, dtmFim, bolMsgComentExcluido, idGrupo, tpGrupo, arrayUsuarioAux, arrayEntidadeAux);
            }
        }
    }
}

function paginacaoListaMensagemAdmin(unidade, dtmInicio, dtmFim, bolMsgComentExcluido, arrayUsuarioAux, arrayEntidadeAux) {

    unidadeGlobal = unidade;
    dtmInicioGlobal = dtmInicio;
    dtmFimGlobal = dtmFim;
    bolMsgComentExcluidoGlobal = bolMsgComentExcluido;

    $.ajax({
        type: "POST",
        url: "/AVA/Mural/Home/TimeLineAdminTotal/",
        data: {
            dtmInicio: dtmInicio,
            dtmFim: dtmFim,
            bolMsgComentExcluido: bolMsgComentExcluido,
            usuario: JSON.stringify(arrayUsuarioAux),
            grupo: JSON.stringify(arrayEntidadeAux)
        },
        async: true,
        success: function (data) {
            var resultados = data;

            quantidadePorPagina = 10;

            resultados = parseInt(resultados);

            rodar = 1;

            $("#Pagination").pagination(
                resultados,
                {
                    items_per_page: quantidadePorPagina,
                    num_display_entries: 5,
                    current_page: 0,
                    num_edge_entries: 1,
                    link_to: "javascript:void(0);",
                    callback: retornaPaginaMensagemAdmin
                }
            );

            if (resultados <= quantidadePorPagina) {
                $("#Pagination").hide();
            } else {
                if ($("#Pagination").is(":hidden")) {
                    $("#Pagination").show();
                }
            }
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("Nao foi possivel obter o numero de resultatos");
            }
        }
    });

}

function retornaPaginaMensagemAdmin(pag, jq) {
    if (rodar > 0) {
        retornaMensagensAdminPaginando(pag, unidadeGlobal, dtmInicioGlobal, dtmFimGlobal, bolMsgComentExcluidoGlobal, arrayUsuarioAux, arrayEntidadeAux)
    }
    rodar += 1;
}

function retornaMensagensAdminPaginando(numPag, unidade, dtmInicio, dtmFim, bolMsgComentExcluido, arrayUsuarioAux, arrayEntidadeAux) {

    numPag += 1;

    var inicio;
    var fim;

    fim = quantidadePorPagina * numPag;
    inicio = (fim - quantidadePorPagina) + 1;

    $(".timeline").html('<div style="padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 28%;" id="loader_timeline"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"></div>');

    $.ajax({
        type: "POST",
        url: "/AVA/Mural/Home/TimeLineAdmin/",
        cache: false,
        data: {
            dtmInicio: dtmInicio,
            dtmFim: dtmFim,
            intInicio: inicio,
            intFim: fim,
            bolMsgComentExcluido: bolMsgComentExcluido,
            usuario: JSON.stringify(arrayUsuarioAux),
            grupo: JSON.stringify(arrayEntidadeAux)
        },
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $(".timeline").html(data);

            $('.btAbreFechaFiltro').toggle(
			            function () {
			                $('.boxFiltro').slideUp();
			                $(this).html('Abrir<span class="fechado"></span>');
			            }, function () {
			                $('.boxFiltro').slideDown();
			                $(this).html('Fechar<span class="aberto"></span>');
			            }
		            );

            $('.thumbs_mural').each(function () {
                var $este = $(this);
                var totalImg = 0;
                var todosCarregados = 0;
                $(this).find('a').each(function (e) {
                    if ($(this).css("display") != "none") {
                        totalImg++;
                        $(this).find("img").one("load", function () {
                            todosCarregados++;
                            //var menorAltura = $(this).find('img:first').height();
                            var maiorAltura = $(this).height();

                            if (todosCarregados == totalImg) {

                                $este.find('img:visible').each(function (i) {

                                    var img = $(this);

                                    var alturaCorrente = img.height();

                                    if (alturaCorrente > maiorAltura) {
                                        maiorAltura = alturaCorrente;
                                    }

                                    if (i == (totalImg - 1)) {
                                        $este.closest('div').css('height', maiorAltura);
                                        $este.find("img").css({ "height": maiorAltura, "width": 217 });
                                    }

                                });
                            }

                        }).each(function () {
                            if (this.complete)
                                $(this).load();
                        });
                    }
                });

            });
            $(".imagens_mural").GaleriaAva();
            $(".ctn_msg").expander(expanderOptions);
            $('.icon_compartilhado_com').booleTip(booleTipOptions);
        },
        error: function (data) {
            console.debug(data.status);
        }
    });

}

function paginacaoListaMensagemGrupoAdmin(unidade, dtmInicio, dtmFim, bolMsgComentExcluido, idGrupo, tpGrupo, arrayUsuarioAux, arrayEntidadeAux) {

    unidadeGlobal = unidade;
    dtmInicioGlobal = dtmInicio;
    dtmFimGlobal = dtmFim;
    bolMsgComentExcluidoGlobal = bolMsgComentExcluido;
    idGrupoGlobal = idGrupo;
    tpGrupoGlobal = tpGrupo;
    bolGrupoTurmaGlobal = $('#rbTpTurmas').is(':checked');
    
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/TimeLineAdminTotal/",
        data: {
            idUnidade: unidade,
            strGrupos: idGrupo,
            idTipoGrupo: tpGrupo,
            dtmInicio: dtmInicio,
            dtmFim: dtmFim,
            bolMsgComentExcluido: bolMsgComentExcluido,
            bolGrupoDeTurma : bolGrupoTurmaGlobal,
            usuarios: JSON.stringify(arrayUsuarioAux),
            grupos: JSON.stringify(arrayEntidadeAux)
        },
        async: true,
        success: function (data) {
            var resultados = data;

            quantidadePorPagina = 10;

            resultados = parseInt(resultados);

            rodar = 1;

            $("#Pagination").pagination(
                resultados,
                {
                    items_per_page: quantidadePorPagina,
                    num_display_entries: 5,
                    current_page: 0,
                    num_edge_entries: 1,
                    link_to: "javascript:void(0);",
                    callback: retornaPaginaMensagemGrupoAdmin
                }
            );

            if (resultados <= quantidadePorPagina) {
                $("#Pagination").hide();
            } else {
                if ($("#Pagination").is(":hidden")) {
                    $("#Pagination").show();
                }
            }

        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("Nao foi possivel obter o numero de resultatos");
            }
        }
    });

}

function retornaPaginaMensagemGrupoAdmin(pag, jq) {
    if (rodar > 0) {
        retornaMensagensAdminGrupoPaginando(pag, unidadeGlobal, dtmInicioGlobal, dtmFimGlobal, bolMsgComentExcluidoGlobal, idGrupoGlobal, tpGrupoGlobal, arrayUsuarioAux, arrayEntidadeAux)
    }
    rodar += 1;
}

function retornaMensagensAdminGrupoPaginando(numPag, unidade, dtmInicio, dtmFim, bolMsgComentExcluido, idGrupo, tpGrupo, arrayUsuarioAux, arrayEntidadeAux) {
    numPag += 1;

    var inicio;
    var fim;

    fim = quantidadePorPagina * numPag;
    inicio = (fim - quantidadePorPagina) + 1;

    $(".timeline").html('<div style="padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 28%;" id="loader_timeline"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"></div>');

    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/TimeLineAdmin/",
        cache: false,
        data: {
            idUnidade: unidade,
            dtmInicio: dtmInicio,
            dtmFim: dtmFim,
            intInicio: inicio,
            intFim: fim,
            bolMsgComentExcluido: bolMsgComentExcluido,
            strGrupos: idGrupo,
            idTipoGrupo: tpGrupo,
            bolGrupoDeTurma: bolGrupoTurmaGlobal,
            usuarios: JSON.stringify(arrayUsuarioAux),
            grupos: JSON.stringify(arrayEntidadeAux)
        },
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $(".timeline").html(data);

            $('.btAbreFechaFiltro').toggle(
			            function () {
			                $('.boxFiltro').slideUp();
			                $(this).html('Abrir<span class="fechado"></span>');
			            }, function () {
			                $('.boxFiltro').slideDown();
			                $(this).html('Fechar<span class="aberto"></span>');
			            }
		            );

            $('.thumbs_mural').each(function () {
                var $este = $(this);
                var totalImg = 0;
                var todosCarregados = 0;
                $(this).find('a').each(function (e) {
                    if ($(this).css("display") != "none") {
                        totalImg++;
                        $(this).find("img").one("load", function () {
                            todosCarregados++;
                            //var menorAltura = $(this).find('img:first').height();
                            var maiorAltura = $(this).height();

                            if (todosCarregados == totalImg) {

                                $este.find('img:visible').each(function (i) {

                                    var img = $(this);

                                    var alturaCorrente = img.height();

                                    if (alturaCorrente > maiorAltura) {
                                        maiorAltura = alturaCorrente;
                                    }

                                    if (i == (totalImg - 1)) {
                                        $este.closest('div').css('height', maiorAltura);
                                        $este.find("img").css({ "height": maiorAltura, "width": 217 });
                                    }

                                });
                            }

                        }).each(function () {
                            if (this.complete)
                                $(this).load();
                        });
                    }
                });

            });
            $(".imagens_mural").GaleriaAva();
            $(".ctn_msg").expander(expanderOptions);
            $('.icon_compartilhado_com').booleTip(booleTipOptions);

            if ($("#rbTpGrupos").is(":checked")) {
                exclusaoComentarioGrupo();
            }
            
        },
        error: function (data) {
            console.debug(data.status);
        }
    });

}

function montaLajotinhaFiltroMensagem(dataInicio, dataFim, msgExcluido, strUnidade) {
    
    $(".lajotinha_filtro").find("li").remove();

    var strTipoMensagem = "";
    if ($("#rbTpGerais").is(":checked")) {
        strTipoMensagem = "Murais";
    } else if ($("#rbTpGrupos").is(":checked")) {
        strTipoMensagem = "Grupos";
    } else {
        strTipoMensagem = "Grupos de turmas";
    }

    $('.lajotinha_filtro').append('<li id="f_1"><span class="lajotinha">' + strTipoMensagem + '</span></li>');
    $('.lajotinha_filtro').append('<li id="f_2"><span class="lajotinha">' + dataInicio + ' à ' + dataFim + '<span class="lajo_x FontAwesome"><a onclick="excluirFiltroMensagem(2)" href="javascript: void(0);"></a></span></span></li>');

    if ($("#check_excluidos").is(":checked")) {
        $('.lajotinha_filtro').append('<li id="f_3"><span class="lajotinha">Mensagens e comentários excluídos<span class="lajo_x FontAwesome"><a onclick="excluirFiltroMensagem(3)" href="javascript: void(0);"></a></span></span></li>');
    }

    if (strUnidade != "" && !$("#rbTpGerais").is(":checked")) {
        $('.lajotinha_filtro').append('<li id="f_4"><span class="lajotinha">' + strUnidade + '<span class="lajo_x FontAwesome"><a onclick="excluirFiltroMensagem(4)" href="javascript: void(0);"></a></span></span></li>');
    }

}

function excluirFiltroMensagem(qualID) {

    $("#f_" + qualID).remove();

    if (qualID == 1) {
        $("#rbTpGerais").attr("checked", true);
    } else if(qualID == 2){
        var data = new Date();

        var dia = data.getDate() + "" ;
        var mes = (data.getMonth() + 1) + "";
        var ano = data.getFullYear();
        
        if (dia.length == 1) {
            dia = "0" + dia;
        }

        if (mes.length == 1) {            
            mes = "0" + mes;
        }

        var dtmAtual = dia + "/" + mes + "/" + ano;

        $("#dtmIniPesq, #dtmFimPesq").val(dtmAtual);

    } else if (qualID == 3) {
        $("#check_excluidos").attr("checked", false);
    } else if (qualID == 4) {
        $('#cbUnidade option[value=0]').attr('selected', 'selected');
    }

}

</script>

<%
DateTime dataAtual = DateTime.Now;
IList<UsuarioAVA.Models.Unidade> lUnidade = null;

if (ViewData["lUnidades"] != null)
{
    lUnidade = (List<UsuarioAVA.Models.Unidade>)ViewData["lUnidades"];
}        

%>
<div class="le_filtros">
	<div id="filtro_aval">
		<div class="topo_filtro">
			<h3>Filtro</h3>
			<a href="javascript:void(0);" class="btAbreFechaFiltro">Fechar<span class="aberto"></span></a>
		</div>
		<div class="boxFiltro">
            <div class="itens ver_mensagens">
				<h4>Ver mensagens:</h4>
				<input type="radio" checked="" id="rbTpGerais" name="tpAgendamento" value="1">
                <label for="rbTpGerais">Murais (do início e do perfil)</label>
                <br />
                <input type="radio" id="rbTpGrupos" name="tpAgendamento" value="2">
                <label for="rbTpGrupos">Grupos</label>
                <br />
                <input type="radio" id="rbTpTurmas" name="tpAgendamento" value="3">
                <label for="rbTpTurmas">Grupos de turmas</label>
			</div>

            <div class="itens">
				<h4>Período:</h4>
				de
				<input type="text" size="8" id="dtmIniPesq" value="<%=dataAtual.ToString("dd/MM/yyyy") %>" class="periodo" />até
				<input type="text" size="8" id="dtmFimPesq" value="<%=dataAtual.ToString("dd/MM/yyyy") %>" class="periodo" />	
                <br />
                <input id="check_excluidos" type="checkbox" class="input_mensagem" /><label for="check_excluidos" class="mensagem_excluida"> <span>Mensagens e comentários excluídos</span></label>
			</div>

			<div class="itens" id="boxUsuarioMensagem">
				<h4>Nome do usuário:</h4>
				<div id="seletorMensagemAdmin"></div>
			</div>

            <div class="itens" id="boxDadosGrupo" style="display: none;">
				<h4>Nome do grupo:</h4>
                <input type="text" id="txtNomeGrupo" value="" placeholder="Digite um nome de grupo" />
                
                <div class="grupos_resultado_adm" id="grupolistapesquisa" style="display: none;"></div>
                
                <h4>Tipo do grupo:</h4>
				<select id="cbTipoGrupo">
                    <option value="2">Todos</option>
                    <option value="0">Privado</option>
                    <option value="1">Público</option>
                </select>

			</div>			
			<%
            if (lUnidade.Count > 0)
            {
                %>
                <div class="itens" id="filtroUnidadeMsg" style="display: none;">
				    <h4>Unidades:</h4>
                    <select id="cbUnidade">
                        <option value="0">Todas</option>                        
                        <%
                        foreach (var unidade in lUnidade)
                        {                            
                            %>
                            <option value="<%=unidade.id%>"><%=unidade.strUnidade%></option>
                            <%                        
                        }
                        %>
                    </select>
			    </div>  
                <%  
            }    
            %>
			<div class="itens_botoes">
			    <a href="javascript: void(0);" class="btn_cinza" onclick="limpar_filtro()">Limpar</a>
            	<a href="javascript: void(0);" class="btn_cor" onclick="filtrar_mensagem()" id="filtrar_mensagem">Filtrar</a>
            </div>
		</div>	
	</div>
</div>

<div class="le_filtros">
    <p>Filtrando por: </p>
    <div class="lajotinhas">
        <ul class="lajotinha_filtro">
            
        </ul>
        <div id="lajotas_seletor"></div>
    </div>
</div>

<div class="clearfix"></div>

<section class="timeline timeline_adm">
    
</section>

<div id="Pagination" class="pagination"></div>

<input type="hidden" id="qtdUnidade" value="<%=lUnidade.Count%>" />

       
