<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Caminhos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Caminhos.Models.Caminho>" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderPrincipal" ID="ContentPlaceHolder" runat="server">
<%
int idUsuario = 0;
var isEditar = false;
var isDuplicar = false;
if (ViewData["idUsuarioLogado"] != "" && ViewData["idUsuarioLogado"] != null)
{
    idUsuario = Convert.ToInt32(ViewData["idUsuarioLogado"]);
}

if (ViewData["bolEditar"] != "" && ViewData["bolEditar"] != null)
{
    isEditar = Convert.ToBoolean(ViewData["bolEditar"]);
}

if (ViewData["bolDuplicar"] != "" && ViewData["bolDuplicar"] != null)
{
    isDuplicar = Convert.ToBoolean(ViewData["bolDuplicar"]);
}

%>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/ajaxfileupload(1).js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript">
        
        $(function () {

            // $("#horaInicio").timepicker({
            //     myPosition: "right top",
            //     atPosition: "right bottom"
            // });
            // $("#horaFim").timepicker({
            //     myPosition: "right top",
            //     atPosition: "right bottom"
            // });
            
            // $("#dataInicio").setMask("date").datepicker({
            //     numberOfMonths: 1,
            //     dateFormat: "dd/mm/yy",
            //     dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
            //     monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
            // });

            // $("#dataFim").setMask("date").datepicker({
            //     numberOfMonths: 1,
            //     dateFormat: "dd/mm/yy",
            //     dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
            //     monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
            // });

            $("body").attr("class", "tarefas");
            $("#ava_wrap").removeClass("painel_controle").addClass("criando");
            $("#iTags").limit('30', '');

            $(".tooltip_title").tooltip({
                offset: [-10, 0]
            });

            $("#iTags").keyup(function (e) {
                montaTag(e, $(this).val(), "keyup");
            }).blur(function (e) {
                montaTag(e, $(this).val(), "blur");
            });

            $("#strTituloTarefa, #txtDescricaoTarefa, #intValorTarefa").focus(function () {
                $(this).removeClass('ava_field_alert');
            });

            $("#strTituloTarefa").limit('130', '');
            $("#txtDescricaoTarefa").limit('1000', '');

            $('#intValorTarefa').digitosDouble();
            $('#valeNota').click(function () {
                if (this.checked) {
                    $("#intValorTarefa").removeAttr("disabled");
                } else {
                    $("#intValorTarefa").attr("disabled", "disabled");
                    $("#intValorTarefa").removeClass("ava_field_alert");
                }
            });

            var idTarefa = <%=Model.id%>;
            var idAvaliacao = $("#idAvaliacao").val();

            var action = $("#agendarTarefa").attr('data-action');
            if (action == "criar") {
                $("#seletorTarefa").AvaSelector({
                    bolAluno: true,
                    bolProfessor: false,
                    bolLajota: true,
                    bolSeguidores: false,
                    bolEscondeTituloExterno: true,
                    bolSeletorFinalizar: false,
                    bolCoordenador: false,
                    botaoConclusao: $("#agendarTarefa"),
                    btnTextoBotaoConclusaoSeletor: "Adicionar",
                    strTitulo: "Agendar para:",
                    insertLajota: function (b, c) {
                        arrayUsuarioAux = b;
                        arrayEntidadeAux = c
                    },
                    usuarioGrupoAdicionado: function (b, e, d) {
                        arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                        arrayGrupoAux.splice(0, arrayGrupoAux.length);
                        for (var c = 0; c < b.length; c++) {
                            arrayUsuariosAux.push(b[c])
                        }
                        for (var c = 0; c < e.length; c++) {
                            arrayGrupoAux.push(e[c])
                        }
                        if (arrayUsuariosAux.length > 0 || arrayGrupoAux.length > 0) { }
                    }
                });
            }

            if(idTarefa > 0){
                var idRecursoEtapa = $("#idRecursoEtapa").val();
                var idEtapa = $("#idEtapa").val();

                getDatos({idRota : idTarefa, acao : action});
                
                if(idRecursoEtapa > 0){
                    
                    /*******************************************/    
                    /**********retorna recurso inserido*********/
                    /*******************************************/
                    // $.ajax({ //comentado
                    //     type: "POST",
                    //     url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapido/",
                    //     data: {
                    //         idRecursoEtapa: idRecursoEtapa,
                    //         idAvaliacao: idAvaliacao
                    //     },
                    //     success: function (data) {
                    //         if(typeof(data) != "object"){
                    //            $("#container_empilhaextras").prepend(data); 
                    //         }
                    //     },
                    //     error: function (data) {
                    //         if (data.status != 0) {
                    //             console.debug("erro ao retornar recurso escolhido");
                    //         }
                    //     }
                    // });

                    /*******************************************/    
                    /*******retorna c?digo material did?tico****/
                    /*******************************************/                    
                    // $.ajax({ // comentado
                    //     type: "POST",
                    //     url: "/AVA/Caminhos/Home/ListaCodigosDidatico",
                    //     data: {
                    //         idRecursoEtapa: idRecursoEtapa
                    //     },
                    //     success: function (data) {
                    //         if (typeof(data) != "object") {
                    //             $('#codigos_didatico').html("");
                    //             $('#container_empilhaextras').prepend(data);
                    //         }                        
                    //     },
                    //     error: function (data) {
                    //         if (data.status != 0) {
                    //             console.debug("erro ao buscar c?digos da tarefa!");
                    //         }
                    //     }
                    // });

                    /*******************************************/    
                    /*************retorna links de apoio********/
                    /*******************************************/                   
                    //retornaLinksApoioTarefa(idRecursoEtapa); // comentado
                    
                }//idRecursoEtapa > 0
                
                if(idEtapa > 0){
                    /*******************************************/    
                    /**********retorna material de apoio********/
                    /*******************************************/   
                    //carregaArquivosTarefa(idEtapa); // comentado
                    //carregaArquivosTarefaEditar(idEtapa);


                    /*******************************************/    
                    /**********retorna vφdeo inserido***********/
                    /*******************************************/   
                    // $.ajax({
                    //     type: "POST",
                    //     url: "/AVA/Caminhos/Home/RetornaTipoMidia",
                    //     data: { idEtapa: idEtapa },
                    //     success: function (idTipo_idMidia) {
                    //         var arrMidia = idTipo_idMidia.split('__');
                        
                    //         if (arrMidia[0].length > 0 && arrMidia[0] != 0) {
                            
                    //             $.ajax({
                    //                 type: "POST",
                    //                 url: "/AVA/Caminhos/Home/RetornaPreviewMidia/",
                    //                 data: { tipoVideo: arrMidia[0], idMidia: arrMidia[1] },
                    //                 success: function (data) {
                                        
                    //                     $("#container_empilhaextras").prepend(
                    //                                                         '<div class="atividades_insert inserir_midia clearfix" id="boxPreviewMidiaTarefa" style="display:none">' +
				    //                                                             '<h5>Vídeo</h5>' +
                    //                                                             '<a href="javascript:void(0);" onclick="excluirMidiaTarefa()"><span class="fecha_X"></span></a>' + data +
                    //                                                         '</div>'
                    //                                                      );
                    //                     //$("#boxPreviewMidiaTarefa").slideDown("slow", function () {
                    //                         $("#boxPreviewMidiaTarefa").css("display", "block");
                    //                         $("#inserirMidiaTarefa").addClass("disable");
                    //                         $("#inserirMidiaTarefa").removeAttr("onclick");
                    //                     //});

                    //                     $(".iframeVideoVimeo", '#container_empilhaextras').on('load', function () {
                    //                         var playerVimeo = $f(this);
                    //                         var playerVimeoStarted = false;
                    //                         playerVimeo.api('pause');
                    //                         playerVimeo.addEvent('ready', function () {
                    //                             playerVimeo.addEvent('play', function () {
                    //                                 if (!playerVimeoStarted) {
                    //                                     playerVimeoStarted = true;
                    //                                     playerVimeo.api('pause');
                    //                                 }
                    //                             });
                    //                         });
                    //                     });
                                    
                    //                 },
                    //                 error: function (data) {
                    //                     if (data.status != 0) {
                    //                         $("#container_empilhaextras").prepend("erro ao salvar vídeo na tarefa!")
                    //                     }
                    //                 }
                    //             });


                    //         }

                    //     },
                    //     error: function (data) {
                    //         if (data.status != 0) {
                    //             $("#container_empilhaextras").prepend("erro ao salvar vídeo na tarefa!")
                    //         }
                    //     }
                    // });  


                }
                
                var qtdAgendamentos = <%=Model.lAgendamento.Count%>;
                
                if (qtdAgendamentos > 0 && action == "editar") {
                
                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/VerificaPoderEdicaoTarefa/",
                        data: {
                            idTarefa: idTarefa
                        },
                        success: function (podeEditar) {
                        
                            if (podeEditar.toString().toLowerCase() == "false") { //nπo pode editar, desabilita bot⌡es
                                
                                //$("div.ab_bts a").removeAttr("onclick").removeAttr("href");
                                //$("#recursoRapido a").removeAttr("onclick").removeAttr("href");
                                //$("#solicita_entrega").removeAttr("onclick").removeAttr("href");
                                //$("#iTags,.lbopcoes input,#strTituloTarefa, #txtDescricaoTarefa, #valeNota, #intValorTarefa").attr("disabled", "disabled");
                                
                            }
                        },
                        error: function (data) {
                            if (data.status != 0) {
                                console.debug("erro ao retornar recurso escolhido");
                            }
                        }
                    });

                }
                

            }//idTarefa > 0
        
        });

        function getDatos(dados){
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/GetDadosTarefaEditar",
                data: JSON.stringify(dados),
                contentType: "application/json",
                success: function (data) {
                    // console.log(data);
                    dadosTarefaEditar = {
                        recurso : {
                            idPublicacao : data.modelEdit.recurso.idPublicacao,
                            idAvaliacao : data.modelEdit.recurso.idAvaliacao,
                            idRecurso : data.modelEdit.recurso.idRecurso,
                            nome : data.modelEdit.recurso.nome,
                            descricao: data.modelEdit.recurso.descricao,
                            pOrdem : data.modelEdit.recurso.pOrdem,
                            sOrdem : data.modelEdit.recurso.sOrdem,
                            intValor : data.modelEdit.recurso.intValor
                        },
                        midia : {
                            idMidia : data.modelEdit.midia.idMidia,
                            strLinkVideo: data.modelEdit.midia.strLinkVideo,
                            idTipoMidia : data.modelEdit.midia.idTipoMidia
                        },
                        links : data.modelEdit.links,
                        tags : data.modelEdit.tags,
                        titulo : data.modelEdit.titulo,
                        descricao : data.modelEdit.descricao,
                        complemento : data.modelEdit.complemento,
                        intNota : data.modelEdit.intNota,
                        idGrupo : data.modelEdit.idGrupo,
                        solicitarEntrega: data.modelEdit.solicitarEntrega,
                        privadoCompartilhado : data.modelEdit.privadoCompartilhado,
                        turmasGrupos : data.modelEdit.turmasGrupos,
                        alunos : data.modelEdit.alunos,
                        dataInicial : data.modelEdit.dataInicial,
                        dataFinal : data.modelEdit.dataFinal,
                        horaInicio : data.modelEdit.horaInicio,
                        horaFim : data.modelEdit.horaFim,
                        idUsuario : data.modelEdit.idUsuario,
                        material : {
                            idFerramentaTipo: data.modelEdit.material.idFerramentaTipo,
                            idFerramenta: data.modelEdit.material.idFerramenta,
                            arquivos: data.modelEdit.material.arquivos
                        },
                        possuiAluno : data.modelEdit.possuiAluno,
                        possuiTurmas : data.modelEdit.possuiTurmas,
                        disciplinaSelecionada : data.modelEdit.disciplinaSelecionada,
                        idCaminho : data.modelEdit.idCaminho,
                        idEtapa : data.modelEdit.idEtapa
                    };
                    
                    dadosTarefa = data.model;

                    if(data.arrayArquivos.arrayArquivo.length > 0){
                        CallbackUpload(data.arrayArquivos);
                    }

                    if(dadosTarefa.links.length >0){
                        ExibiLinksApoio();
                    }

                    if(data.listaUsuarios.length >0){
                        arrayUsuariosAux = [];
                        $.each(data.listaUsuarios, function(e, f){
                            var usuario = {
                                idGrupo : f.idGrupo,
                                idTurma : f.idTurma,
                                idUsuario : f.idUsuario,
                                strApelido : f.strApelido,
                                strFoto : f.strFoto,
                                strNome : f.strNome
                            };

                            arrayUsuariosAux.push(usuario);

                            //$("#listaCarteirinhaSeletor").append(montaCarteirinha(usuario, false));
                        });


                        // console.log(arrayUsuariosAux);

                        if($("#agendarTarefa").attr('data-action') != "duplicar")
                        {
                            $("#dataInicio").val(data.model.dataInicial);
                            $("#horaInicio").val(data.model.horaInicio);

                            $("#dataFim").val(data.model.dataFinal);
                            $("#horaFim").val(data.model.horaFim);
                        }
                        
                        
                        if (!data.bolEditDataInicio && $("#agendarTarefa").attr('data-action') != "duplicar") {
                            $("#dataInicio").attr('disabled','true');
                            $("#horaInicio").attr('disabled','true');

                            $("#bolEditDataInicio").val(0);
                        }

                        if (!data.bolEditDataFim && $("#agendarTarefa").attr('data-action') != "duplicar") {
                            $("#dataFim").attr('disabled','true');
                            $("#horaFim").attr('disabled','true');

                            $("#bolEditDataFim").val(0);
                        }

                        $("#seletorTarefa").AvaSelector({
                            bolAluno: true,
                            bolProfessor: false,
                            bolLajota: true,
                            bolSeguidores: false,
                            bolEscondeTituloExterno: true,
                            bolSeletorFinalizar: false,
                            bolCoordenador: false,
                            botaoConclusao: $("#agendarTarefa"),
                            btnTextoBotaoConclusaoSeletor: "Adicionar",
                            strTitulo: "Agendar para:",
                            carregarUsuarios : arrayUsuariosAux,
                            insertLajota: function (b, c) {
                                arrayUsuarioAux = b;
                                arrayEntidadeAux = c
                            },
                            usuarioGrupoAdicionado: function (b, e, d) {
                                arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                                arrayGrupoAux.splice(0, arrayGrupoAux.length);
                                for (var c = 0; c < b.length; c++) {
                                    arrayUsuariosAux.push(b[c])
                                }
                                for (var c = 0; c < e.length; c++) {
                                    arrayGrupoAux.push(e[c])
                                }
                                if (arrayUsuariosAux.length > 0 || arrayGrupoAux.length > 0) { }
                            }
                        });
                    }
                    else{
                        $("#seletorTarefa").AvaSelector({
                            bolAluno: true,
                            bolProfessor: false,
                            bolLajota: true,
                            bolSeguidores: false,
                            bolEscondeTituloExterno: true,
                            bolSeletorFinalizar: false,
                            bolCoordenador: false,
                            botaoConclusao: $("#agendarTarefa"),
                            btnTextoBotaoConclusaoSeletor: "Adicionar",
                            strTitulo: "Agendar para:",
                            insertLajota: function (b, c) {
                                arrayUsuarioAux = b;
                                arrayEntidadeAux = c
                            },
                            usuarioGrupoAdicionado: function (b, e, d) {
                                arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                                arrayGrupoAux.splice(0, arrayGrupoAux.length);
                                for (var c = 0; c < b.length; c++) {
                                    arrayUsuariosAux.push(b[c])
                                }
                                for (var c = 0; c < e.length; c++) {
                                    arrayGrupoAux.push(e[c])
                                }
                                if (arrayUsuariosAux.length > 0 || arrayGrupoAux.length > 0) { }
                            }
                        });
                    }
                    
                    if(dadosTarefa.midia.idMidia != null){
                        exibirMidiaTarefa();
                    }
                    
                    if (data.model.recurso != null) {
                        if (data.model.recurso.idAvaliacao != 0 || data.model.recurso.idPublicacao != 0) {
                            if (data.model.recurso.idAvaliacao != 0) {

                                var recursoJson = {
                                    idPublicacao : data.model.recurso.idPublicacao,
                                    idRecurso : data.model.recurso.idRecurso,
                                    Nome : data.model.recurso.nome,
                                    TextoIntrodutorio: data.model.recurso.descricao,
                                    Id : data.model.recurso.idAvaliacao,
                                    pOrdem : data.model.recurso.pOrdem,
                                    sOrdem : data.model.recurso.sOrdem,
                                    ValorTotal : data.model.recurso.intValor
                                }

                                salvarRecursoAvaliacaoHtml(recursoJson);
                            }
                            else if(data.model.recurso.idPublicacao != 0){

                                var recursoJson = {
                                    ri : {
                                        idPublicacao : data.model.recurso.idPublicacao,
                                        idRecurso : data.model.recurso.idRecurso,
                                        strTitulo : data.model.recurso.nome,
                                        strDescricao: data.model.recurso.descricao,
                                        idCategoria : data.model.recurso.idCategoria,
                                        strThumbRecurso : data.model.recurso.strThumbRecurso,
                                        paginasCM : data.model.recurso.paginasCM
                                    },
                                    idAvaliacao : 0,
                                    pOrdem : 0,
                                    sOrdem : 0,
                                    intValor : 0
                                }

                                salvarRecursoPublicacaoHtml(recursoJson)
                            }
                        }
                    }
                    
                },
                error: function (i) {
                    if (i.status != 0) {
                        console.debug("erro ao retornar feed user!")
                    }
                }
            });
        }

    </script>

    <section id="ava_container" class="as1">
        
        <%
        int bolEntrega = 0;
        int idEtapa = 0;
        int idRecursoEtapa = 0;
        double valorEtapa = 0;
        string classEntrega = "entrega_icon_vazio";
        int idAvaliacao = 0;
            
        int idDono = Model.idUsuario;
        int idUsuarioAtual = Convert.ToInt32(ViewData["idUsuarioLogado"]);
        string strComplemento = "";
        if (Model.lEtapa != null)
        {   
            if (Model.lEtapa.Count > 0)
            {
                idEtapa = Model.lEtapa[0].id;

                idRecursoEtapa = Model.lEtapa[0].recursoItem.id;
                idAvaliacao = Model.lEtapa[0].recursoItem.idAvaliacao;
                if (idAvaliacao > 0)
                {
                    strComplemento = "disabled='disabled'";
                }

                if (Model.lEtapa[0].recursoEntrega.id > 0)
                {
                    bolEntrega = 1;
                    classEntrega = "";
                }
                valorEtapa = Model.lEtapa[0].intValor;
            }
        }


        string dia = DateTime.Now.Day.ToString().PadLeft(2,'0');
        string mes = DateTime.Now.Month.ToString().PadLeft(2,'0');
        int ano = DateTime.Now.Year;
        
        DateTime diaFimAux = DateTime.Now.AddDays(7);
        
        string diaFim = diaFimAux.Day.ToString().PadLeft(2, '0');
        string mesFim = diaFimAux.Month.ToString().PadLeft(2, '0');
        string anoFim = diaFimAux.Year.ToString().PadLeft(2, '0');
            
        string horaInicio = (DateTime.Now.Hour + 1).ToString().PadLeft(2, '0') + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0');
        string horaFim = DateTime.Now.Hour.ToString().PadLeft(2, '0') + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0');
        

        %>
        <header id="Hcaminhos">
            <a href="/ava/caminhos/home/index/1" class="btn_cinza right">
                <span class="FontAwesome voltar"></span>
                Voltar para lista de tarefas
            </a>
            <%
            if(!isEditar)
            {
            %>
            <h1 class="blokletters"> Criação da tarefa </h1>
            <%
            }
            else if(isDuplicar)
            {
            %>
            <h1 class="blokletters"> Duplicar tarefa </h1>
            <%
            }
            else
            {
            %>
            <h1 class="blokletters"> Editar tarefa </h1>
            <%
            }
            %>
        </header>
        
        <input type="hidden" id="dtmAtualServidor" value="<%=DateTime.Now.ToString("dd/MM/yyyy HH:mm")%>" />

        <section id="ava_box" class="as1 ava_caminhos_edit ">
            <!--<h1>Criação do tarefa</h1><span class="lb_info"><a href="#" class="">? ajuda</a></span>-->      
            
            <div id="tarefas_form">            
                <div class="container_tarefas">
                    <div class="atividades_box ">
                        <input <%=strComplemento%> type="text" class="atividades_field  ph sombra_form" placeholder="Título da Tarefa" name="dialogo" id="strTituloTarefa" title="Título da Tarefa" value="<%=Model.titulo%>" maxlength="100" />
                        <textarea <%=strComplemento%> id="txtDescricaoTarefa" class="atividades_field  ph sombra_form" autocomplete="off" cols="40" rows="2" placeholder="Oriente seus alunos em como resolver esta tarefa" name="dialogo" title="Oriente seus alunos em como resolver esta tarefa"><%=Model.descricao%></textarea>
                        
                        <div class="ab_bts">
                            <% 
                                bool mostraRecurso = true;
                                //Se for AvaPuro e N?o puder ver avalia??es....
                                if (Convert.ToBoolean(ViewData["bolAVAPuro"]) ) {
                                        mostraRecurso = false;
                                }
                                if (mostraRecurso)
                                {
                                    %>
                                    <a onclick="abreListaRecurso()"  title="Inserir recurso" class="bt_normal tooltip_title" href="javascript:void(0);"><i class="recurso_icon"></i>Inserir recurso</a>
                                    <%
                                }
                            if (Model.lEtapa != null)
                            {
                                if (Model.lEtapa[0].recursoMidia.id > 0)
                                {
                                    %>
                                    <a alt="Inserir vφdeo" title="Inserir vídeo" class="bt_normal tooltip_title disable" id="inserirMidiaTarefa" href="javascript:void(0);"><i class="midia_icon"></i> </a>    
                                    <%
                                }
                                else
                                {
                                    %>
                                    <a onclick="abrirMidiaTarefa()" alt="Inserir vídeo" title="Inserir vídeo" class="bt_normal tooltip_title" id="inserirMidiaTarefa" href="javascript:void(0);"><i class="midia_icon"></i> </a>    
                                    <%
                                }
                                
                            }
                            else
                            {
                                %>
                                <a onclick="abrirMidiaTarefa()" alt="Inserir vídeo" title="Inserir vídeo" class="bt_normal tooltip_title" id="inserirMidiaTarefa" href="javascript:void(0);"><i class="midia_icon"></i> </a>    
                                <%
                            }
                            %>
                            
                            <a onclick="abreUploadTarefa()" alt="Inserir material de apoio..." title="Inserir material de apoio" class="bt_normal tooltip_title" href="javascript:void(0);"><i class="mapoio_icon"></i> </a>
                            <a onclick="abrirLinkTarefa()" alt="Inserir links" title="Inserir links" class="bt_normal tooltip_title" href="javascript:void(0);"><i class="links_icon"></i> </a>

                            <div id="previewArquivosCriarTarefa" class="preview_img_post preview_anx_post" style="display:none; width: 400px; height: 550px; overflow: hidden;">
                                <iframe name="Upload" id="Upload_frame" style="width: 100%; height: 100%; border:0;"></iframe>
                            </div>
                            
                            <%--
                                if ((Convert.ToInt32(ViewData["intTipoPortal"]) == 4 || Convert.ToInt32(ViewData["intTipoPortal"]) == 8 || Convert.ToInt32(ViewData["intTipoPortal"]) == 16) && !((bool)ViewData["bolAVAPuro"]))
                            {
                                %>
                                <a onclick="abreCodigo()" alt="Inserir c?digo do livro" title="Inserir c?digo do livro" class="bt_normal tooltip_title" href="javascript:void(0);"><i class="codlip_icon"></i> </a>
                                <%
                            }
                            --%>
                            
                            <a onclick="trocaStatusSolicitacaoEntrega()" id="solicita_entrega" alt="Solicitar entrega de trabalho" title="Solicitar entrega de trabalho" class="bt_normal tooltip_title entrega_check" href="javascript:void(0);"><i class="entrega_icon <%=classEntrega%>"></i> </a>
                            
                            <span class="seraavaliada">
                                <%
                                if (valorEtapa > 0)
                                {
                                    %>
                                    <input id="valeNota" type="checkbox" value="" checked <%=strComplemento%> > <label for="valeNota">Será Avaliada?</label> <input type="text" class="ipt_valor ph" placeholder="Valor" id="intValorTarefa" title="Valor" value="<%=valorEtapa%>" <%=strComplemento%> >    
                                    <%
                                }
                                else
                                {
                                    %>
                                    <input id="valeNota" type="checkbox" value=""> <label for="valeNota">Será Avaliada?</label> <input type="text" class="ipt_valor ph" placeholder="Valor" id="intValorTarefa" title="Valor" disabled>    
                                    <%
                                }
                                %>                                
                            </span>
                        </div>
                        
                        <hr>
                    </div><!--atividades_box-->

                    <div id="container_empilhaextras">
                        
                    </div>

                </div><!--container_tarefas-->
            </div><!--tarefas_form-->
            
            <div class="ta_desc">                      
                
                <div class="ava_tags_box_clean clearfix">
                    <!-- <h3>TAGS:<a href="javascript:void(0);" class="tooltip_title fr" title="Palavras-chave para categorizar e facilitar que esta tarefa seja encontrada em buscas"><span class="ava_help "></span></a></h3>
                    <input id="iTags" class="atividades_field ph sombra_form" placeholder="separe as tags por vírgula." title="separe as tags por vírgula." />
                    <ul class="ava_tags">
                        <%
                        if (Model.lTag != null)
                        {   
                            if (Model.lTag.Count > 0)
                            {
                                int cont = 1;
                                foreach (var tag in Model.lTag)
                                {
                                    %>
                                    <li id="<%=cont%>"><%=tag.strTag%><span class="lajo_x FontAwesome"><a class="" href="javascript: void(0);" onclick="fecharTag(<%=cont%>, <%=tag.id%>, <%=Model.id%>)"></a></span></li>
                                    <%
                                    cont++;
                                }
                            }
                        }
                        %>    
                    </ul> -->
                    <!-- <h3>Disciplina:<a href="javascript:void(0);" class="tooltip_title fr" title="Opcional, selecione caso queira delimitar por disciplina esta tarefa."><span class="ava_help "></span></a></h3>
                    <div class="bootstrap" id="id_materia_turma"></div> -->
                </div>
                
                <hr>

                <div class="lbbloco lbopcoes">
                    <%
                        Html.RenderPartial("Partials/OpcoesCompartilhamento", new ViewDataDictionary { { "idEscola", ViewData["idEscola"] }, { "intStatus", Model.intStatus }, { "cont", 1 }, { "idCaminho", Model.id }, { "idDono", idDono }, { "idUsuarioAtual", idUsuarioAtual }, { "intTipo", 2 } });  
                    %>  
                </div>
                
                <hr>
                
                <div class="box_lateral_aviso bcs1 clearfix">    
                    <h2><span class="awe_icons awe_agendar"></span>Agendamentos</h2>
                    
                    <%
                    if (ViewData["temTurma"].ToString() == "ok")
                    { 
                        %>
                        <p>
                            <strong id="msg_qtdAgendadas">
                            <%
                                int qtdAgendamentos = Model.lAgendamento.Count;
                                if (qtdAgendamentos > 0 && (isEditar == true && isDuplicar == false))
                                {
                                    %>
                                    Esta tarefa possui <a href="/ava/caminhos"><%=qtdAgendamentos%> agendamento(s)</a>    
                                    <%        
                                }
                                else
                                {
                                    %>
                                    Esta tarefa não possui agendamentos  
                                    <%    
                                }       
                            %>
                            </strong>
                        </p>
                    
                        <div id="msg_aviso" class="ui-widget" style="display: none">
                            <div class="ui-state-highlight ui-corner-all ava_msg_aviso">
                                <p>
                                    <span class="ui-icon ui-icon-alert"></span> Agendamento criado!
                                </p>
                            </div>
                        </div>  
                        
                        <div id="seletorTarefa"></div>

                        <div class="tarefa_extras">
                                <span class="periodo_t">Per&iacute;odo:</span>            
                            
                                <input type="text" placeholder="<%=dia%>/<%=mes%>/<%=ano%>" value="<%=dia%>/<%=mes%>/<%=ano%>" size="10" id="dataInicio" class="trf_agenda_data" readonly="readonly">
                                
                                <input type="text" placeholder="<%=horaInicio%>" value="<%=horaInicio%>" size="9" id="horaInicio" class="trf_agenda_hora">
                                
                                at&eacute;
                                
                                <input type="text" placeholder="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>" value="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>" size="10" id="dataFim" class=" trf_agenda_data" readonly="readonly">
                                <input type="text" placeholder="<%=horaFim%>" value="<%=horaFim%>" size="9" id="horaFim" class=" trf_agenda_hora">
                            
                                <input id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy")%>" type="hidden" />
                                <input type="hidden" id="idAvaliacao" value="0" />
                            </div>

                            <a href="javascript: void(0);" id="btAbreLightBoxTarefa"></a>
                            <a href="javascript: void(0);" id="btEscondidoTarefa"></a>
                            

                        <!--a href="javascript:void(0);" id="agendarTarefaOld" class="large awesome awe_icons_r frm5" data-idusuario="<%=ViewData["idUsuarioLogado"]%>"><span class=" awe_agendar"></span>Criar agendamento </a-->
                        <%
                    }
                    else
                    { 
                        %>
                        <div class="ui-widget" style="display: block">
                            <div class="ui-state-highlight ui-corner-all ava_msg_aviso">
                                <p>
                                    <span class="ui-icon ui-icon-alert"></span> Você não possui turmas cadastradas.
                                </p>
                            </div>
                        </div>
                        <%
                    } 
                    %>
                </div>

            </div> <!--ta_desc-->

            <input type="hidden" value="<%=Model.id%>" id="idCaminho" />
            <input type="hidden" id="idEtapa" value="<%=idEtapa%>" />
            <input type="hidden" id="idRecursoEtapa" value="<%=idRecursoEtapa%>" />
            <input type="hidden" id="bolSolicitaEntrega" value="<%=bolEntrega%>" />
            <input type="hidden" id="idAvaliacao" value="<%=idAvaliacao%>" />
            <input type="hidden" id="isDuplicar" value="<%=isDuplicar%>" />
            <input type="hidden" id="isEditar" value="<%=isEditar%>" />
            <input type="hidden" id="bolEditDataInicio" value="1" />
            <input type="hidden" id="bolEditDataFim" value="1" />
            <input type="hidden" id="qtdAgendamentos" value="<%=Model.lAgendamento.Count %>" />
            <a href="javascript: void(0);" id="btEscondidoTarefa"></a>
            <input id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy")%>" type="hidden" />

        </section>
        
        <section id="ava_steps_footer">
            <a href="/ava/caminhos/home/index/1" class="large awesome c-cancelar "></span>Cancelar </a>
        
            <div id="aw_center"></div>
            
            <span id="boxBtnSalvarTarefaRapida">
                <%
                if(!isEditar)
                {
                %>
                <a href="javascript:void(0);" id="agendarTarefa" class="large awesome awesome-green frmr30" data-action="criar" data-idusuario="<%=ViewData["idUsuarioLogado"]%>"><span class=" awe_icons"></span>Agendar </a>
                <%
                }
                else if(isDuplicar)
                {
                %>
                <a href="javascript:void(0);" id="agendarTarefa" class="large awesome awesome-green frmr30" data-action="duplicar" data-idusuario="<%=ViewData["idUsuarioLogado"]%>"><span class=" awe_icons"></span>Agendar </a>
                <%
                }
                else
                {
                %>
                <a href="javascript:void(0);" id="agendarTarefa" class="large awesome awesome-green frmr30" data-action="editar" data-idusuario="<%=ViewData["idUsuarioLogado"]%>"><span class=" awe_icons"></span>Agendar </a>
                <%
                }
                %>
                <!--<a href="javascript:void(0);" class="large awesome awesome-color frmr30" onclick="salvarTarefaAvancada(<%=idUsuario%>)">Salvar <span class="awe_icons"></span></a>-->
            </span>
            
        </section>
        
    </section><!--ava_container-->
    
</asp:Content>
