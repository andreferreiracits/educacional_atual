<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.Grupos>" %>

<script type="text/javascript">

    $(function () {

        $('.actions').click(function (e) {
            e.preventDefault();
            _pos = $(this).attr('pos');
            $('.actions').removeClass('current');
            $(this).addClass('current');
            $('.actions_target').hide();
            $('.actions_target').eq(_pos).fadeIn();

            if (_pos == 0) {
                //mostra o assunto
                $('#filtros_categoria').show();

                //remove o botão agendar
                $('#agendar, .infoagendamentogrupo').hide();

                $(".mensagem_multimidia ul:not(#cbAssuntoPost)").show();

                $("#txtInput").val("");
                $('#txtInput').css("height", "48px");
                $('#txtInput').siblings(":last").html('');
                $("#btnCancelarFerramentaMural").addClass("disable").prop("disabled", true);
                limpaArrayImagensTimeLine();
                limpaPreviewImagemMensagemRapida();
                // $(".preview_post.imagens").hide();
                // $(".preview_post.video").hide();
                removerPreviewVideoMensagem(true);
            }

            if (_pos == 1) {

                //remove o assunto
                $('#filtros_categoria').hide();

                //remove o vídeo
                $("#container_preview_video").fadeOut('slow', function () {
                    $(this).html("");
                    $('.enviar_video').hide();
                });
                // $(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide();
                $('.errovideo').hide();

                arrayArquivosUpload = undefined;

                $("#btnCancelarFerramentaMural").hide();
                $("#btnCancelarFerramentaMural").closest('.sep_digala').hide();
                $("#seletorMuralDigaLa").hide();
                
                $('.actions_target').eq(_pos).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/AbreCriarTarefaRapidaGrupo/",
                    data: { 'strLinkGrupo': idUsuarioPublico },
                    success: function (data) {

                        $('.actions_target').eq(_pos).html(data);

                        if ($("#strTituloTarefa").val() !== undefined) {
                            $('.compartilhamento').find("li:first").text("Agendar para:");
                            $('#compartilhar').hide();
                            $('#agendar').show();
                        } else {
                            $('#compartilhar').hide();
                        }

                        $('.ph').addPlaceholder();

                        $("#strTituloTarefa").live('focus', function () {
                            $(this).removeClass('ava_field_alert');
                        })

                        $("#intValorTarefa").focus(function () {
                            $(this).removeClass("ava_field_alert");
                        })

                        $("#frmMensagemRapida").find(".tooltip_title").tooltip({
                            offset: [-10, 0]
                        });

                        $('#valeNota').click(function () {
                            if (this.checked) {
                                $("#intValorTarefa").removeAttr("disabled");
                            } else {
                                $("#intValorTarefa").attr("disabled", "disabled");
                                $("#intValorTarefa").removeClass("ava_field_alert");
                            }
                        });

                        //Mascaras
                        $('#dataInicio').setMask('date'); // data
                        $('#dataFim').setMask('date'); // data
                        $('#horaInicio').setMask('29:59'); // hora
                        $('#horaFim').setMask('29:59'); // hora

                        $('#intValorTarefa').digitosDouble();

                        //Carrega os calendarios para data de inicio e fim do agendamento
                        montaCampoData('#dataInicio', '#dataFim');

                        $("#dataInicio,#dataFim,#horaInicio,#horaFim").focus(function () {
                            $(this).removeClass("ava_field_alert");
                        })

                        $('#txtDescricaoTarefa').limit('1000', '');

                        $('.infoagendamentogrupo').show();
                        $('.infoagendamentogrupo').closest('.sep_digala').show();

                    },
                    error: function (data) {
                        if (data.status != 0) {
                            $('.actions_target').eq(_pos).html("Erro ao carregar tarefa rápida.");
                        }
                    }
                });

            }

        }); //.actions click

    })//end funciton

</script>

<script type="text/javascript"  src="<%=Url.CDNLink("/Common/fineUpload/all.fine-uploader.min.js") %><%=Url.TimeStampLink() %>" ></script>
<link rel="stylesheet" type="text/css" media="screen" href="<%=Url.CDNLink("/Common/fineUpload/fine-uploader-gallery.min.css")%><%=Url.TimeStampLink() %>" />
<link rel="stylesheet" type="text/css" media="screen" href="<%=Url.CDNLink("/Common/fineUpload/fine-uploader-new.min.css")%><%=Url.TimeStampLink() %>" />

<%  
// Alteração Renan: Grupos com idEstado 3 (congelado) não deve mostrar o diga lá.
int idAlbumGrupo = (int)ViewData["idAlbum"];
if (!Model.idEstado.Equals(3)){
%>
    <form id="frmMensagemRapida" name="frmMensagemRapida" method="post" runat="server">
    
        <section class="dialogo clearfix">
        
             <a href="javascript: void(0);" pos="0" class="current actions komika">
                <span class="fontello digala"></span>
                Diga lá
                <span class="seta"></span>
            </a>

            <% 
            bool bolMediador = Convert.ToBoolean(ViewData["bolMediador"]);
            bool bolProfessor = Convert.ToBoolean(ViewData["bolProfessor"]);
            bool bolTemAlunonoGrupo = Convert.ToBoolean(ViewData["bolTemAlunonoGrupo"]);
            bool bolCPPuro = (bool)Session["bolCPPuro"];

            if (bolMediador && bolProfessor && bolTemAlunonoGrupo && !bolCPPuro)
            {
                %>
                <a href="javascript:void(0);" pos="1" class="actions komika">
                    <span class="entypo">&#59185;</span>
                    Criar Tarefa
                    <span class="seta"></span>
                </a>    
                <%  
            }    
            %>
        
            <div class="dialogo_box actions_target">
			    <textarea id="txtInput" class="dialogo_field" autocomplete="off" cols="40" rows="1" placeholder="Olá! compartilhe aqui a sua ideia ou link!" name="dialogo" title="Olá! compartilhe aqui a sua ideia ou link!" style="overflow: hidden; height: 48px;"></textarea>
                
                <div id="fine-uploader-gallery"></div>

                <script type="text/template" id="qq-template-gallery">
                    <div class="qq-uploader-selector qq-uploader qq-gallery" qq-drop-area-text="Solte os arquivos aqui">
                        <div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
                            <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
                        </div>
                        <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
                            <span class="qq-upload-drop-area-text-selector"></span>
                        </div>
                        <div class="qq-upload-button-selector qq-upload-button">
                            <div>Selecione um Arquivo</div>
                        </div>

                        <div id="text_file_drag" class="text_file_drag">Arraste e solte seus arquivos aqui</div>
                            

                        <span class="qq-drop-processing-selector qq-drop-processing">
                            <span>Processing dropped files...</span>
                            <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
                        </span>
                        <ul class="qq-upload-list-selector qq-upload-list" role="region" aria-live="polite" aria-relevant="additions removals">
                            <li>
                                <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
                                <div class="qq-progress-bar-container-selector qq-progress-bar-container">
                                    <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar"></div>
                                </div>
                                <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
                                <div class="qq-thumbnail-wrapper">
                                    <img class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale>
                                    <div id = "thumbImagem" class="tipoArquivo_fineUpload" qq-max-size="120" qq-server-scale style="display:none">
                                </div>
                                <button type="button" class="qq-upload-cancel-selector qq-upload-cancel">X</button>
                                <button type="button" class="qq-upload-retry-selector qq-upload-retry">
                                    <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>
                                    Retry
                                </button>
                
                                <div class="qq-file-info">
                                    <div class="qq-file-name">
                                        <span class="qq-upload-file-selector qq-upload-file"></span>
                                        <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>
                                    </div>
                                    <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
                                    <span class="qq-upload-size-selector qq-upload-size"></span>
                                    <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">
                                        <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>
                                    </button>
                                    <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause">
                                        <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>
                                    </button>
                                    <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue">
                                        <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>
                                    </button>
                                </div>
                            </li>
                        </ul>
                
                        <dialog class="qq-alert-dialog-selector">
                            <div class="qq-dialog-message-selector"></div>
                            <div class="qq-dialog-buttons">
                                <button type="button" class="qq-cancel-button-selector">Close</button>
                            </div>
                        </dialog>
                
                        <dialog class="qq-confirm-dialog-selector">
                            <div class="qq-dialog-message-selector"></div>
                            <div class="qq-dialog-buttons">
                                <button type="button" class="qq-cancel-button-selector">No</button>
                                <button type="button" class="qq-ok-button-selector">Yes</button>
                            </div>
                        </dialog>
                
                        <dialog class="qq-prompt-dialog-selector">
                            <div class="qq-dialog-message-selector"></div>
                            <input type="text">
                            <div class="qq-dialog-buttons">
                                <button type="button" class="qq-cancel-button-selector">Cancel</button>
                                <button type="button" class="qq-ok-button-selector">Ok</button>
                            </div>
                        </dialog>
                    </div>
                </script>
                
                
                

<script>

        var g_arrayMensagemRapida = [];
        var g_arrayMensagemRapidaFile = [];
    

        var g_idArquivoMultimidia = '<%=ViewData["idArquivoMultimidia"]%>';

        var idUser = localStorage.getItem('idUser');
        var idUsuarioRecebe = idUser;

        var idFerramenta = g_idArquivoMultimidia;

        var idFerramentaTipo = 0;
        
        var fileNameUp = "";
        var tamanho = 0;

        idFerramentaTipo = 35;

        var length = 0 ;
        var name = "";
        
        //dev            

        var galleryUploader = new qq.FineUploader({
            element: document.getElementById("fine-uploader-gallery"),
            template: 'qq-template-gallery',
            autoUpload: true,
            request: {
                endpoint: '/ava/Mural/Home/UploadFile',
                customHeaders: {
                    "idUsuarioRecebe": idUsuarioRecebe, 
                    "idFerramenta": idFerramenta, 
                    "idFerramentaTipo": idFerramentaTipo,
                    "idRetorno": 3
                }
            },
            thumbnails: {
                placeholders: {
                    waitingPath: '/source/placeholders/waiting-generic.png',
                    notAvailablePath: '/source/placeholders/not_available-generic.png'
                }
            },
            validation: {
                allowedExtensions: ['jpeg', 'jpg', 'gif', 'png','ppt', 'pptx', 'odp', 'xls', 'xlsx', 'ods', 'doc', 'docx', 'txt', 'pdf', 'odt', 'rtf', 'pub']
            },
            deleteFile: {
                enabled: true,
                forceConfirm: true,
                endpoint: '/AVA/Mural/Home/ExcluirFile'
            },
            callbacks:{
                onValidate: function(data, element){
                    name =   data.name ;
                    length = data.size;
                    
                },
                onComplete: function (id, fileName, responseJSON) {


                    this.setUuid(id,responseJSON.idArquivo);

                    var g_mensagemRapida = {
                        "bolPaisagem":false,
                        "bolRetrato":false,
                        "idArquivo":0,
                        "thumbnail":"",
                        "arquivo":"",
                        "nome": "",
                        "descricao": "",
                        "diretorio": "",
                        "extensao": "",
                        "altura": 0,
                        "largura": 0,
                        "idPosition":0
                    };   

                    if(responseJSON.tipo == 1){

                            if(responseJSON.idArquivo > 0)
                            {

                                g_mensagemRapida.bolPaisagem = responseJSON.bolPaisagem;
                                g_mensagemRapida.bolRetrato = responseJSON.bolRetrato;
                                g_mensagemRapida.idArquivo = responseJSON.idArquivo;
                                g_mensagemRapida.thumbnail = responseJSON.thumbnail;
                                g_mensagemRapida.arquivo = responseJSON.arquivo;
                                g_mensagemRapida.nome  = responseJSON.nome;
                                g_mensagemRapida.descricao =  responseJSON.descricao;
                                g_mensagemRapida.diretorio =  responseJSON.diretorio;
                                g_mensagemRapida.extensao = responseJSON.extensao;
                                g_mensagemRapida.altura = responseJSON.altura;
                                g_mensagemRapida.largura = responseJSON.largura;
                                g_mensagemRapida.idPosition = id;
                            }

                            if( g_mensagemRapida.idArquivo > 0 ){
                                g_arrayMensagemRapida.push(g_mensagemRapida);
                                console.log(JSON.stringify( g_arrayMensagemRapida));
                            }
                    }

                    if(responseJSON.tipo == 3 || responseJSON.tipo == 0 ){


                        var g_mensagemRapidaFile ={
                                "idArquivo":0,
                                "arquivo":"",
                                "nome":"",
                                "descricao":"",
                                "diretorio":"",
                                "extensao":"",
                                "idPosition":0
                        }

                        if(responseJSON.idArquivo > 0)
                        {

                            g_mensagemRapidaFile.idArquivo = responseJSON.idArquivo;
                            g_mensagemRapidaFile.arquivo = responseJSON.arquivo;
                            g_mensagemRapidaFile.nome  = responseJSON.nome;
                            g_mensagemRapidaFile.descricao =  responseJSON.descricao;
                            g_mensagemRapidaFile.diretorio =  responseJSON.diretorio;
                            g_mensagemRapidaFile.extensao = responseJSON.extensao;
                            g_mensagemRapidaFile.idPosition = id;
                            
                        }

                        if( g_mensagemRapidaFile.idArquivo > 0 ){
                            g_arrayMensagemRapidaFile.push(g_mensagemRapidaFile);
                            console.log(JSON.stringify( g_arrayMensagemRapidaFile));
                        }
                    }


                         if (responseJSON.extensao == ".jpeg" || responseJSON.extensao == ".jpg" || responseJSON.extensao == ".gif" || responseJSON.extensao == ".png") {

                                var idClasse = document.getElementsByClassName("tipoArquivo_fineUpload");
                                var thumbImagem = document.getElementsByClassName("qq-thumbnail-selector");
                                var tamanhoValor = document.getElementsByClassName("tipoArquivo_fineUpload").length;
                                var posicaoIcone = tamanhoValor - 1;
                                idClasse[posicaoIcone].style.display = "none";
                                thumbImagem[posicaoIcone].style.visibility="visible";
                                console.log("oiii");

                            } else {
                                var idClasse = document.getElementsByClassName("tipoArquivo_fineUpload");
                                var thumbImagem = document.getElementsByClassName("qq-thumbnail-selector");
                                var tamanhoValor = document.getElementsByClassName("tipoArquivo_fineUpload").length;
                                var posicaoIcone = tamanhoValor - 1;
                                console.log(posicaoIcone);
                                var node = document.createElement("SPAN");
                                var textnode = document.createTextNode(responseJSON.extensao);
                                node.appendChild(textnode);
                                idClasse[posicaoIcone].appendChild(node);
                                idClasse[posicaoIcone].style.display = "block";
                                thumbImagem[posicaoIcone].style.display="none";

                            }



                    $("#dialogo_acoes").show();
                    $("#seletorMuralDigaLa").show();
                    // preparaAvaSelector();
                    
                    $('#compartilhar').show();
                    $("#btnCancelarFerramentaMural").show();
                    $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");

                    $('#compartilhar').removeClass('disable').prop("disabled", false);


                },
                onDeleteComplete: function(id, xhr, isError){
                    
                    if(g_arrayMensagemRapidaFile.length > 0){
                                        

                        $.each( g_arrayMensagemRapidaFile, function(  index, item  ){
                            
                            if(item.idPosition == id){

                                console.log('Dentro if file');
                                
                                g_arrayMensagemRapidaFile.splice(index,1);

                                console.log(JSON.stringify( g_arrayMensagemRapidaFile));
                                
                            }

                        });

                    

                    }

                    if(g_arrayMensagemRapida.length > 0){
                        

                        $.each( g_arrayMensagemRapida, function(  index, item  ){
                            
                            if(item.idPosition == id){

                                console.log('Dentro if img');
                                
                                g_arrayMensagemRapida.splice(index,1);

                                console.log(JSON.stringify( g_arrayMensagemRapida));
                                
                            }

                        });

                       

                    }
                }
            }
        });

        function deleteItem(){
            console.log(this.id);
        }          

    </script>


                <div class="preview_post video" id="container_preview_video" style="display: none;">
                
                </div>
                <%
                    bool bolConfigImagem = (bool)ViewData["bolConfigImagem"];
                    bool bolConfigVideo = (bool)ViewData["bolConfigVideo"];
                    bool bolConfigFile = (bool)ViewData["bolConfigFile"];
                    
                    if (bolConfigImagem)
                    { //if configuração imagem
                 %>

                    <div class="preview_post imagens content" data-idalbum="<%=ViewData["idAlbum"] != null && ViewData["idAlbum"] != "" ? (int)ViewData["idAlbum"] : 0 %>" style="display: none;">
                        <!-- <div class="engloba_classe ">
                            <div class="prev_imagem adicionar">
                                <a href="javascript:void(0);" class="adicionar_multimidia"><span class="FontAwesome"></span>Adicionar</a>
                            </div>
                        </div> -->
                    </div>
                <%
                    }
                     %>
                     <div class="clearfix"></div>
                        <%
                    if (bolConfigFile)
                    {
                        %>
                        <div class="preview_post content arquivos" data-idarquivomultimidia="<%=ViewData["idArquivoMultimidia"] != null && ViewData["idArquivoMultimidia"] != "" ? (int)ViewData["idArquivoMultimidia"] : 0 %>" style="display: none;">
                            <div class="clearfix"></div>
                            <!-- <a href="javascript:void();" class="adicionar_doc"><span class="FontAwesome"></span>Adicionar</a> -->
                        </div> 
                        <div class="clearfix"></div>

                            <%
                    }
                    %>
            </div>
            <div class="container_tarefas actions_target" style="display:none;"></div>
            <% if((bolMediador || bolProfessor) && bolConfigVideo) { %>
            <div class="enviar_video" style="display: none;">
                <span class="FontAwesome"></span>
                <input type="text" placeholder="Cole aqui a url do ví­deo do YouTube ou Vimeo" id="txtLinkVideoMensagem"/>
            </div>
            <div class="errovideo" style="display: none">A URL inserida acima é inválida ou não existe.</div>
            <div class="verificavideo" style="display: none">Verificando URL...</div>
            <input type="hidden" value="" id="urlVideoOriginal" />            
            <% } %>
            <div class="mensagem_multimidia"> 
            <% if (bolMediador || bolProfessor) { %>
                <ul class="right">
                <%
                    if (bolConfigImagem)
                    { //if configuração imagem
                    %>
                    <li class="multimidia_imagens">
                        <a href="javascript:void(0);"><span class="FontAwesome"></span> Imagens</a>
                    </li>
                        <div id="previewImagemDigaLaGrupo" class="preview_img_post preview_anx_post" style="display:none; width: 400px; height: 550px; overflow: hidden;">
                            <iframe name="Upload" id="Upload_frame" style="width: 100%; height: 100%; border:0;">
                            </iframe>
                        </div>
                    <%
                    }
                    if (bolConfigVideo)
                    { 
                    %>
                    <li class="multimidia_video">
                        <a href="javascript:void(0);"><span class="FontAwesome"></span> Vídeo</a>
                    </li>
                    <%
                    }
                    if (bolConfigFile)
                    {
                        %>
                        <li class="multimidia_documentos">
                            <a href="javascript:void(0);"><span class="FontAwesome"></span> Arquivos</a>
                        </li>
                        <div id="previewFileDigaLaGrupo" class="preview_img_post preview_anx_post" style="display:none; width: 400px; height: 550px; overflow: hidden;">
                            <iframe name="Upload_arquivos" id="Upload_frame" style="width: 100%; height: 100%; border:0;">					
                            </iframe>
                        </div>
                    <%
                    }
                     %>
                    </li>
                </ul>            
            <% } %>                
            <div class="left" id="filtros_categoria">
                <span class="postar_assunto fontello"></span>
                <span class="bootstrap">
                    <div class="btn-group">
                        <label href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtAssuntoPost"> 
                        <%=Model.lAssuntos.First().strAssunto%>&nbsp;<span class="caret"></span>
                        </label>
                        <input type="hidden" id="hAssuntoPost" initvalue="<%=Model.lAssuntos.First().id%>" value="<%=Model.lAssuntos.First().id%>" />
                        <ul class="dropdown-menu" id="cbAssuntoPost">
                        <% foreach (var assu in Model.lAssuntos) { %>    	
                            <li assu="<%=assu.id%>">
                            <input type="checkbox" id="ckAssuntoPost<%=assu.id%>" <%=assu.id == Model.lAssuntos.First().id ? "checked=\"checked\"" : ""%> />
                            <label for="ckAssuntoPost<%=assu.id%>"><%=assu.strAssunto%>&nbsp;</label>
                            </li>                        
                        <% } %>
                        <% if(bolMediador) { %>	
                            <li class="li_criar_editar_assunto">
                            <a class="criar_editar_assunto fancy" href="javascript:void(0);"><span class="fontello"></span> Criar e Editar</a>
                            </li>
                        <% } %>    
                        </ul>
                    </div>  
                </span>						
            </div>
            </div>
            <div class="clearfix"></div>
            <div class="sep_digala" style="display:none;">            
            <div class="infoagendamentogrupo" style="display:none;">*Esta tarefa será agendada para todos os <strong>alunos</strong> do grupo.</div>              
		    <div class="botoes right btnGrupo">              
                <a href="javascript:void(0);" class="btn_cinza disable" id="btnCancelarFerramentaMural" style="display:none;" >Cancelar</a>
                <input type="button" class="btn_cor" value="Compartilhar" id="compartilhar" name="compartilhar" style="display:none;"/>
                <input type="button" class="btn_cor msn_tarefa_grupo" value="Agendar." id="agendar" name="agendar" style="display:none;" />    
            </div>
            <div class="clearfix"></div>
            </div>
	    </section>

        <input type="hidden" value="<%=Model.id%>" name="idGrupo" id="idGrupo" />

    </form>
<%
}
else
{
    %>
    <section class="dialogo clearfix">
        As atividades deste grupo foram encerradas.
    </section>
    <%
}
%>

