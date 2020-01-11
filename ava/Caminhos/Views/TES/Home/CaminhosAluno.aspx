<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Caminhos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<System.Collections.Generic.IList<UsuarioAVA.Models.Perseguicao>>" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderPrincipal" ID="ContentPlaceHolder" runat="server">
    
    <script type="text/javascript">
        $(function () {
            abreListaAtividadeAluno("1,2", "", "1,2,3,4", 0, "", "", false);
        })

        var rodarGlobal = 0;
        var quantidadePorPagina = 10;
        var strTipoAtividadeGlobal = "";
        var strStatusAtividadeGlobal = "";
        var strAtividadeGlobal = "";
        var dtmInicioAgendamentoGlobal = "";
        var dtmFimAgendamentoGlobal = "";
        var bolFiltrandoGlobal = false;
        var idProfessorGlobal = 0;
        var strNomeProfessorGlobal = "";
        var ordernarGlobal = "";
        var bolOrdernarGlobal = false;
        var bolSanfo = false;

        function limparFiltroAluno() {
            $("#embreve").prop("checked", true);
            $("#emandamento").prop("checked", true);
            $("#encerrado").prop("checked", true);
            $("#resultados").prop("checked", true);
            $("#tipocaminho").prop("checked", true);
            $("#tipotarefa").prop("checked", true);
            $("#strAtividade").val("");
            $("#dataInicio").val("");
            $("#dataFim").val("");
            $("#selProfessor").val(0);
        }

        function fechaFiltro() {
            if (bolSanfo == false) {
                $('#conteudo_filtro').slideDown('slow');
                $('#setaaluno').html('&#9650;');
                bolSanfo = true;
            } else {
                $('#conteudo_filtro').slideUp('slow');
                $('#setaaluno').html('&#9660;');
                bolSanfo = false;
            }
        }

        function fnOrdernar(valor) {
            ordernarGlobal = valor;
            bolOrdernarGlobal = !bolOrdernarGlobal;
            filtrarAtividade();
        }

        function abreListaAtividadeAluno(strTipoAtividade, strAtividade, strStatus, idProfessor, dtmInicioAgendamento, dtmFimAgendamento, bolFiltrando) {

            strTipoAtividadeGlobal = strTipoAtividade;
            strAtividadeGlobal = strAtividade;
            strStatusAtividadeGlobal = strStatus;
            dtmInicioAgendamentoGlobal = dtmInicioAgendamento;
            dtmFimAgendamentoGlobal = dtmFimAgendamento;
            bolFiltrandoGlobal = bolFiltrando;
            idProfessorGlobal = idProfessor;

            rodarGlobal = 1;
            paginacaoAtividadeAluno();

        }

        function paginacaoAtividadeAluno() {

            $('#container_atividades').html("<tr><td colspan='5' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></td></tr>")
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/home/BancoAtividadesAlunoTotal",
                data: {
                    tipoAtividade: strTipoAtividadeGlobal,
                    strAtividade: strAtividadeGlobal,
                    strStatus: strStatusAtividadeGlobal,
                    idProfessor: idProfessorGlobal,
                    dtmInicio: dtmInicioAgendamentoGlobal,
                    dtmFim: dtmFimAgendamentoGlobal
                },
                success: function (total) {

                    var totalReg = parseInt(total);
                    $("#Pagination").pagination(
                        totalReg,
                        {
                            items_per_page: quantidadePorPagina,
                            num_display_entries: 5,
                            current_page: 0,
                            num_edge_entries: 1,
                            link_to: "javascript:void(0);",
                            callback: retornaPaginaAtividadeAluno
                        }
                    );

                    if (totalReg <= quantidadePorPagina) {
                        $("#mostraPaginas").hide();
                    } else {
                        $("#mostraPaginas").show();
                    }

                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("Nao foi possivel obter o numero de resultados");
                    }
                }
            });           
            
        }

        function retornaPaginaAtividadeAluno(pag, jq) {
            if (rodarGlobal > 0) {
                retornaAtividadesAlunoPaginando(pag)
            }
            rodarGlobal += 1;
        }

        function retornaAtividadesAlunoPaginando(numPag) {

            numPag += 1;

            var fim = quantidadePorPagina * numPag;
            var inicio = (fim - quantidadePorPagina) + 1;

            if (!bolFiltrandoGlobal) {
                $('#conteudo_filtro').hide();
            } else {
                if (strTipoAtividadeGlobal == "") {
                    strTipoAtividadeGlobal = "1,2";
                }
                montaLajotinhaFiltro(strTipoAtividadeGlobal, strStatusAtividadeGlobal, strAtividadeGlobal, $("#dataInicio").val(), $("#dataFim").val(), strNomeProfessorGlobal)

                $('#conteudo_filtro').slideUp('slow');
                $('#setaaluno').html('&#9660;');

            }

            montaCampoData('#dataInicio', '#dataFim');

            /*
            montaCampoData('#dataInicio');
            montaCampoData('#dataFim');
            */

            $('#container_atividades').html("<tr><td colspan='5' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></td></tr>")
            $.ajax({
                type: "POST",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',  
                url: "/AVA/Caminhos/Home/BancoAtividadesAlunoPaginando",
                data: {
                    tipoAtividade: strTipoAtividadeGlobal,
                    strAtividade: strAtividadeGlobal,
                    strStatus: strStatusAtividadeGlobal,
                    idProfessor:idProfessorGlobal,
                    dtmInicio: dtmInicioAgendamentoGlobal,
                    dtmFim: dtmFimAgendamentoGlobal,
                    inicio: inicio,
                    fim: fim,
                    ordernar: ordernarGlobal,
                    bolOrdenar: bolOrdernarGlobal,
                    atpendentes: $("#atividadespendentes").attr("checked")
                },
                success: function (data) {
                    $('#container_atividades').html(data);

                    $('.btnVerDetalhes').toggle(
			            function () {
			                id = $(this).attr("idAtiv");
			                $('#linha_atividade_' + id).addClass("table_selected")
			                $('#linhaprabaixo_' + id).show();
			                $('#vaiprabaixo_' + id).slideDown('slow');
			                $('#seta_' + id).html('&#9650;');
			                $('#btDetalhe_' + id).html('ocultar detalhes');
			            }, function () {
			                id = $(this).attr("idAtiv");
			                $('#linha_atividade_' + id).removeClass("table_selected")
			                $('#vaiprabaixo_' + id).slideUp('slow', function () {
			                    $('#linhaprabaixo_' + id).hide();
			                });
			                $('#seta_' + id).html('&#9660;');
			                $('#btDetalhe_' + id).html('ver detalhes');
			            }
		            );

                    /*
                    $('#slidefitroaluno').toggle(
			            function () {
			                $('#filtro_aval').slideDown('slow');
			                $('#setaaluno').html('&#9650;');
			            }, function () {
			                $('#filtro_aval').slideUp('slow');
			                $('#setaaluno').html('&#9660;');
			            }
		            )
                    */
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro ao buscar atividades do aluno!");
                    }
                }
            });

        }

        function filtrarAtividade() {
            
            $("#mostraPaginas").hide();

            var contTipo = $("input:checkbox[name=tipoAtividade]:checked").length;
            var strTipoAtividade = "";
            var contTipoAux = 1;
            $("input:checkbox[name=tipoAtividade]:checked").each(function () {
                if (contTipo > contTipoAux) {
                    strTipoAtividade += $(this).val() + ",";
                } else {
                    strTipoAtividade += $(this).val();
                }
                contTipoAux++;
            });

            var contStatusAux = 1;
            var contStatus = $("input:checkbox[name=statusAtividade]:checked").length;
            var strStatus = "";

            if (contStatus == 0) {
                strStatus = "1,2,3,4";
            } else {
                $("input:checkbox[name=statusAtividade]:checked").each(function (i) {
                    if (contStatus > contStatusAux) {
                        strStatus += $(this).val() + ",";
                    } else {
                        strStatus += $(this).val();
                    }
                    contStatusAux++;
                });
            }
            var strAtividade = $('#strAtividade').val();
            
            var dtmInicioAgendamento = $('#dataInicio').val();
            var dtmFimAgendamento = $('#dataFim').val();

            if (dtmInicioAgendamento.length > 0 && dtmFimAgendamento.length > 0) {
                var arrDataInicio = dtmInicioAgendamento.split("/");
                dtmInicioAgendamento = arrDataInicio[2] + "-" + arrDataInicio[1] + "-" + arrDataInicio[0];
                var arrDataFim = dtmFimAgendamento.split("/");
                dtmFimAgendamento = arrDataFim[2] + "-" + arrDataFim[1] + "-" + arrDataFim[0];
            } else if (dtmInicioAgendamento.length <= 0 && dtmFimAgendamento.length > 0) {
                alert("Favor preencher a data inicial!")
                return false;
            } else if (dtmInicioAgendamento.length > 0 && dtmFimAgendamento.length <= 0) {
                alert("Favor preencher a data final!")
                return false;
            }

            var idProfessor = $("#selProfessor").val();
            strNomeProfessorGlobal = $("#selProfessor :selected").text();

            abreListaAtividadeAluno(strTipoAtividade, strAtividade, strStatus, idProfessor, dtmInicioAgendamento, dtmFimAgendamento, true);
        }

        function montaLajotinhaFiltro(strTipo, strStatus, titulo, dataInicio, dataFim, strNomeProfessor) {

            $('.lajotinhas ul').html('');

            if (strStatus.length > 0) {
                var arrStatus = strStatus.split(',');
                /********STATUS AGENDAMENTO************/
                for (var i = 0; i < arrStatus.length; i++) {
                    if (arrStatus[i] == 2) { //em breve
                        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Em breve<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(1, 1, 2)"></a></span></span></li>')
                        $("#embreve").prop("checked", true);
                    } else if (arrStatus[i] == 1) {//andamento
                        $('.lajotinhas ul').append('<li id="2"><span class="lajotinha">Andamento<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(2, 1, 1)"></a></span></span></li>')
                        $("#emandamento").prop("checked", true);
                    } else if (arrStatus[i] == 3) {//encerrado
                        $('.lajotinhas ul').append('<li id="3"><span class="lajotinha">Encerrado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(3, 1, 3)"></a></span></span></li>')
                        $("#encerrado").prop("checked", true);
                    } else { //resultados
                        $('.lajotinhas ul').append('<li id="4"><span class="lajotinha">Resultados<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(4, 1, 4)"></a></span></span></li>')
                        $("#resultados").prop("checked", true);
                    }
                }
            } else {
                $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Em breve<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(1, 1, 2)"></a></span></span></li>')
                $('.lajotinhas ul').append('<li id="2"><span class="lajotinha">Andamento<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(2, 1, 1)"></a></span></span></li>')
                $('.lajotinhas ul').append('<li id="3"><span class="lajotinha">Encerrado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(3, 1, 3)"></a></span></span></li>')
                $('.lajotinhas ul').append('<li id="4"><span class="lajotinha">Resultados<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(4, 1, 4)"></a></span></span></li>')
                $("#embreve").attr('checked', true);
                $("#emandamento").attr('checked', true);
                $("#encerrado").attr('checked', true);            
            }

            if (strTipo.length > 0) {

                var arrTipo = strTipo.split(',');
                /********TIPO ATIVIDADE************/
                for (var i = 0; i < arrTipo.length; i++) {

                    if (arrTipo[i] == 1) { //Caminho
                        $('.lajotinhas ul').append('<li id="6"><span class="lajotinha">Caminhos de aprendizagem<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(6, 2, 1)"></a></span></span></li>')
                        $("#tipocaminho").attr('checked', true);
                    } else { //tarefa
                        $('.lajotinhas ul').append('<li id="5"><span class="lajotinha">Tarefas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(5, 2, 2)"></a></span></span></li>')
                        $("#tipotarefa").attr('checked', true); 
                    }

                }
            } else {
                $('.lajotinhas ul').append('<li id="6"><span class="lajotinha">Caminhos de aprendizagem<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(6, 2, 1)"></a></span></span></li>')
                $('.lajotinhas ul').append('<li id="5"><span class="lajotinha">Tarefas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(5, 2, 2)"></a></span></span></li>')
                $("#tipocaminho").attr('checked', true);
                $("#tipotarefa").attr('checked', true); 
            }

            if (dataInicio != "" && dataFim != "") {
                $('.lajotinhas ul').append('<li id="7"><span class="lajotinha">' + dataInicio + ' a ' + dataFim + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(7, 3, 1)"></a></span></span></li>')
            }

            if (titulo != "") {
                $('.lajotinhas ul').append('<li id="8"><span class="lajotinha">' + titulo + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(8, 4, 1)"></a></span></span></li>')
            }

            if (idProfessorGlobal > 0) {
                $('.lajotinhas ul').append('<li id="9"><span class="lajotinha">' + strNomeProfessor + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(9, 5, 1)"></a></span></span></li>')
            }       

            $('.lajotinhas a.bt_normal').remove();

        }

        function excluirFiltroAtividade(idLI, qual, tipo) {

            if (qual == 1) { //status atividade
                if (tipo == 2) {
                    $("#embreve").attr('checked', false);
                } else if (tipo == 1) {
                    $("#emandamento").attr('checked', false);
                } else if (tipo == 3) {
                    $("#encerrado").attr('checked', false);
                } else if (tipo == 4) {
                    $("#resultados").attr('checked', false);
                }
            }

            if (qual == 2) { //tipo atividade
                if (tipo == 1) {
                    $("#tipocaminho").attr('checked', false);
                } else if (tipo == 2) {
                    $("#tipotarefa").attr('checked', false);
                }
            }

            if(qual == 3){ //data de agendamento
                $("#dataInicio").val("");
                $("#dataFim").val("");
            }

            if (qual == 4) { //nome da atividade
                $("#strAtividade").val("");
            }

            if (qual == 5) {
                $("#selProfessor :first").attr('selected', true);
            }

            $('#' + idLI).remove();

            $('.lajotinhas a.bt_normal').remove();
            $('.lajotinhas').append('<a class="bt_normal right" href="javascript: void(0);" onclick="filtrarAtividade();"><span class="ava_refresh"></span>atualizar filtro</a>');
        }


    </script>

    <section id="ava_container" class="as1">
        <header id="Hcaminhos">
            
            <h1 class="blokletters">Minhas Tarefas e Caminhos de Aprendizagem</h1>
        </header>
       
        <section id="ava_box" class="as1 ava_ativtable">
            
			<table width="100%" cellspacing="0" cellpadding="0" border="0" class="trhover">
                <thead>
                    <tr class="tr_thead">
                        <td colspan="5">                            

                            <div id="filtro_aval" class="clearfix">
                                <div class="topo_filtro">
        				            <h3>Filtro</h3>
                                    <a href="javascript: fechaFiltro();" id="slidefitroaluno">Abrir<span class="fechado"></span></a>        				
        			            </div>
                                <div id="conteudo_filtro">
                                    <input id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy")%>" type="hidden" />

                                    <div class="f_aval">
                                        <strong>Nome da tarefa: </strong>
                                        <input type="text" size="30" id="strAtividade" value="">                               
                           
                                        <p>
                                            <strong>Período</strong>
                                            de <input type="text" placeholder="     /     /" value="" id="dataInicio" value="" size="8" readonly="true">
                                            até <input type="text" placeholder="     /     /" value="" id="dataFim" value="" size="8" readonly="true">                            
                                        </p>
                            
                                        <p>
                                            <strong>Professor</strong>
                                            <select id="selProfessor" name="selProfessor">
                                                <option value="0">Todos</option> 
                                                <% 
                                                foreach (var professor in Model)
                                                {
                                                    int idProfessor = professor.id;
                                                    string strProfessor = professor.strNome;
                                                    %>
                                                    <option value="<%=idProfessor %>"><%=strProfessor%></option>    
                                                    <%
                                                }  
                                                %>                                            
                                            </select>                            
                                        </p>
                            
                                    </div>

                                    <div class="f_aval lista">  
                                        <strong>Status:</strong>
								        <div> 
									        <input type="checkbox" checked="checked" value="2" id="embreve" name="statusAtividade"/>
									        <label for="embreve"> Em breve</label>
								        </div>
                                        <div>
									        <input type="checkbox" checked="checked" value="1" id="emandamento" name="statusAtividade"/>
									        <label for="emandamento"> Andamento</label>
								        </div>
								        <div> 
									        <input type="checkbox" checked="checked" value="3" id="encerrado" name="statusAtividade"/>
									        <label for="encerrado"> Encerrado</label>
								        </div>
                                        <div>
									        <input type="checkbox" checked="checked" value="4" id="resultados" name="statusAtividade"/>
									        <label for="resultados"> Resultados</label>
								        </div>
							        </div>  

                                    <div class="f_aval lista">  
                                        <strong>Tipo:</strong>
								        <div> 
									        <input type="checkbox" checked="checked" value="1" id="tipocaminho" name="tipoAtividade"/>
									        <label for="tipocaminho"> Caminhos de <br/>aprendizagem</label>
								        </div>
                                        <div>
									        <input type="checkbox" checked="checked" value="2" id="tipotarefa" name="tipoAtividade"/>
									        <label for="tipotarefa"> Tarefas</label>
								        </div>
							        </div>                              

                                    <div  class="f_aval_bts">                                  
                                        <a class="bt_normal color" href="javascript: void(0);" onclick="filtrarAtividade()">filtrar</a>  
                                        <a class="bt_normal" href="javascript: void(0);" onclick="limparFiltroAluno();">limpar</a>                       
                                    </div>
                                </div>
                            
                            </div>
                            <div class="le_filtros">
                                Filtrado por:
                                <div class="lajotinhas">
                                    <ul class="lajotinha_filtro">
                                        <li id="1"><span class="lajotinha">Em breve<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(1,1,2)"></a></span></span></li>
                                        <li id="2"><span class="lajotinha">Andamento<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(2,1,1)"></a></span></span></li>
                                        <li id="3"><span class="lajotinha">Encerrado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(3,1,3)"></a></span></span></li>
                                        <li id="4"><span class="lajotinha">Resultados<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(4,1,4)"></a></span></span></li>
                                        <li id="6"><span class="lajotinha">Caminhos de aprendizagem<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(6,2,1)"></a></span></span></li>
                                        <li id="5"><span class="lajotinha">Tarefas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAtividade(5,2,2)"></a></span></span></li>
                                    </ul>
                                </div>                                                             
                            </div>
                        </td>
                    </tr>
                      
                    <tr class="tableheader">
                        <td width="60%"><a href="javascript:void(0);" onclick="fnOrdernar('titulo');">Tarefas e Caminhos de Aprendizagem</a></td>
                        <td width="10%" class="center"><a href="javascript:void(0);" onclick="fnOrdernar('professor');">Professor</a></td>
                        <td width="10%" class="center"><a href="javascript:void(0);" onclick="fnOrdernar('status');">Status</a></td>
                        <td width="10%" class="center"><a href="javascript:void(0);" onclick="fnOrdernar('datai');">Início</a></td>
                        <td width="10%" class="center"><a href="javascript:void(0);" onclick="fnOrdernar('dataf');">Fim</a></td>
                    </tr>
                </thead>
                 
                <tbody class="tablebody" id="container_atividades">
                    
                </tbody>

                <tfoot>
                    <tr>
                        <td id="mostraPaginas" colspan="5">
                            <div id="Pagination" class="pagination">
                            </div>
                        </td>
                    </tr> 
                </tfoot> 
                  
            </table>
        </section> <!--ava_box-->
    </section>
</asp:Content>
