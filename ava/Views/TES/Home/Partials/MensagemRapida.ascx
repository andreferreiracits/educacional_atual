

          


<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Turma.Models.GrupoTurmaConfiguracoes>" %>

       

    <% 
    var bolPostUnico = ViewData["bolPostUnico"] == null ? false : (bool)ViewData["bolPostUnico"];
    
    //Caso não possa comentar tambem não pode escrever no mural.
    var bolPodeComentar = ViewData["bolPodeComentar"] == null ? false : (bool)ViewData["bolPodeComentar"];
    var bolCoordenador = ViewData["bolCoordenador"] == null ? false : (bool)ViewData["bolCoordenador"];
    

    bool podeAdicionarImagem = true, podeAdicionarArquivo = true, podeAdicionarVideo = true;
    if (Model.BolAluno)
    {
        podeAdicionarImagem = Model.BolAlunoImagens;
        podeAdicionarArquivo = Model.BolAlunoArquivos;
        podeAdicionarVideo = Model.BolAlunoVideos;
    }
    else
    {
        podeAdicionarImagem = ViewData["bolConfigImagem"] == null ? true : (bool)ViewData["bolConfigImagem"];
        podeAdicionarArquivo = ViewData["bolConfigFile"] == null ? true : (bool)ViewData["bolConfigFile"];
        podeAdicionarVideo = ViewData["bolConfigVideo"] == null ? true : (bool)ViewData["bolConfigVideo"];
    }
    

    bool bolCPPuro = (bool)Session["bolCPPuro"];
    
%>


<script type="text/javascript"  src="<%=Url.CDNLink("/Common/fineUpload/all.fine-uploader.min.js") %><%=Url.TimeStampLink() %>" ></script>
<link rel="stylesheet" type="text/css" media="screen" href="<%=Url.CDNLink("/Common/fineUpload/fine-uploader-gallery.min.css")%><%=Url.TimeStampLink() %>" />
<link rel="stylesheet" type="text/css" media="screen" href="<%=Url.CDNLink("/Common/fineUpload/fine-uploader-new.min.css")%><%=Url.TimeStampLink() %>" />

<% if(bolPodeComentar || bolCoordenador) { %>
<section class="dialogo clearfix" <%=bolPostUnico ? " style=\"display:none;\" " : "" %>>




	<a class="current actions komika" pos="0" href="javascript: void(0);">
        <span class="fontello digala"></span>
        Diga lá...
        <span class="seta"></span>
    </a>
    <% if (Model.BolProfessor && !bolCPPuro || bolCoordenador)
       { %>
        
      
    <a href="javascript:void(0);" pos="1" class="actions komika">
        <!-- <span class="entypo">&#59185;</span> -->
        <span class="dialogo_menu criar_tarefa"></span>
        Criar Tarefa
        <span class="seta"></span>
    </a>
    <% } %>





	<div class="dialogo_box">
		<textarea title="Olá! compartilhe aqui a sua ideia ou link...-" name="dialogo" placeholder="Olá! compartilhe aqui a sua ideia ou link...-" rows="1" cols="40" autocomplete="off" class="dialogo_field" id="txtInput"></textarea>
        
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
                         <div  id= "miniatura" class="qq-thumbnail-wrapper">
                            <img  class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale>
                            <div id = "thumbImagem" class="tipoArquivo_fineUpload" qq-max-size="120" qq-server-scale style="display:none">
                            </div>
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
                        <button type="button" class="qq-cancel-button-selector">Não</button>
                        <button type="button" class="qq-ok-button-selector">Sim</button>
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

var galleryUploader = null;
    var g_arrayMensagemRapida = [];
    var g_arrayMensagemRapidaFile = [];
            var idUser = localStorage.getItem('idUser');
            var idUsuarioRecebe = idUser;

            var idFerramenta = 12;

            var idFerramentaTipo = 0;
            
            var fileNameUp = "";
            var tamanho = 0;

            idFerramentaTipo = 35;

            var length = 0 ;
            var name = "";

            var idalbum = 0 ;

            // setTimeout(() => {
                
                var idGrupo = $("#idGrupo").val();


            $.ajax({
                url: "/AVA/Turma/Home/GetConfiguracoesGrupo/idGrupo="+idGrupo,
                type: "POST",
                dataType: "json",
                async: !1,//false,
                data:{
                    "idGrupo":idGrupo
                },
                success: function (config) {

                    var isAluno =  config.result.BolAluno ;

                    $.ajax({
                        url: "/ava/mural/home/VerificaAlbumTimeline",
                        type: "POST",
                        dataType: "json",
                        async: !1,//false,
                        success: function (data) {
                            
                            console.log(data);
                            
                            // var extensionsArray = [];
                            
                            // if(  isAluno == true  ){

                            //     if(  config.result.BolAlunoImagens == true  ){
                            //         var imgAux = ['jpeg', 'jpg', 'gif', 'png'] ;
                            //         extensionsArray.push(imgAux) ;

                            //     }
                            //     if(  config.result.BolAlunoArquivos == true   ){
                            //         var fileAux = ['ppt', 'pptx', 'odp', 'xls', 'xlsx', 'ods', 'doc', 'docx', 'txt', 'pdf', 'odt', 'rtf', 'pub'] ;                                    
                            //         extensionsArray.push(fileAux) ;

                            //     }

                            // }
                            
                            // else if( isAluno != true  ){
                                // var fileimg = ['jpeg', 'jpg', 'gif', 'png','ppt', 'pptx', 'odp', 'xls', 'xlsx', 'ods', 'doc', 'docx', 'txt', 'pdf', 'odt', 'rtf', 'pub'];
                                // extensionsArray.push(fileimg);
                            // }

                            


                            var erro = parseInt(data.error);
                            if (erro == 0) {
                                idalbum = parseInt(data.album.idAlbum);

                                galleryUploader = new qq.FineUploader({
                                    element: document.getElementById("fine-uploader-gallery"),
                                    template: 'qq-template-gallery',
                                    autoUpload: true,
                                    request: {
                                        endpoint: '/ava/Mural/Home/UploadFile',
                                        customHeaders: {
                                            "idUsuarioRecebe": idUsuarioRecebe, 
                                            "idFerramenta": idalbum, 
                                            "idFerramentaTipo": idFerramentaTipo,
                                            "idRetorno": 2
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

                                            if(responseJSON.tipo == 3||responseJSON.tipo == 0 ){


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





                                        }
                                        ,
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

                            } else {
                                console.log(data.msg);           
                            }
                        },
                        error: function (data) {
                            
                        }
                    });

                },
                error: function(error){

                }
                        
            });    


            </script>
        
        <div class="preview_post video" id="container_preview_video" style="display:none;"></div>
        <div class="preview_post imagens content" data-idalbum="0" style="display: none;">
            <!-- <div class="engloba_classe ">
                <div class="prev_imagem adicionar">
                    <a href="javascript:void(0);" class="adicionar_multimidia"><span class="FontAwesome"></span>Adicionar</a>
                </div>
            </div> -->
        </div>
        <div class="clearfix"></div>
        <div class="preview_post content arquivos" data-idarquivomultimidia="0" style="display: none;">
            <!-- <div class="clearfix"></div> -->
            <!-- <a href="javascript:void(0);" class="adicionar_doc"><span class="FontAwesome"></span>Adicionar</a> -->
        </div> 
        <div class="clearfix"></div> 
    </div>
    <div style="display:none;" class="container_tarefas actions_target"></div>  
    <div style="display:none;" class="enviar_video">
        <span class="FontAwesome"></span>
        <input type="text" id="txtLinkVideoMensagem" placeholder="Cole aqui a url do ví­deo do YouTube ou Vimeo" />
    </div>
    <div class="errovideo" style="display: none">A URL inserida acima é inválida ou não existe.</div>
    <div class="verificavideo" style="display: none">Verificando URL...</div>
    <input type="hidden" value="" id="urlVideoOriginal" /> 
    <div class="clearfix"></div> 
	<div class="mensagem_multimidia">

        <% if(podeAdicionarArquivo || podeAdicionarImagem || podeAdicionarVideo) { %>            

		<ul class="right">
            <% if(podeAdicionarImagem) { %>
			<li class="multimidia_imagens">
			    <a href="javascript:void(0);"><span class="FontAwesome"></span> Imagens</a>
			</li>
                <div id="previewImagemDigaLaNovoTurma" class="preview_img_post preview_anx_post" style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="Upload" id="Upload_frame" style="width: 100%; height: 100%; border:0;">
					</iframe>
				</div>

            <% } if (podeAdicionarVideo) { %>
			<li class="multimidia_video">
			    <a href="javascript:void(0);"><span class="FontAwesome"></span> Vídeo</a>
			</li>
            <% } if(podeAdicionarArquivo) { %>
			<li class="multimidia_documentos">
			    <a href="javascript:void(0);"><span class="FontAwesome"></span> Arquivos</a>
			</li>
                <div id="previewFileDigaLaNovo" class="preview_img_post preview_anx_post" style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="Upload_arquivos" id="Upload_frame" style="width: 100%; height: 100%; border:0;">					
					</iframe>
				</div>

            <% } %>
		</ul>  
        <% } %>

        

	</div>
    <div class="clearfix"></div>
	<div class="sep_digala" style="display:none;">

        <div class="left" id="filtros_categoria">
			<span class="postar_assunto fontello"></span>
			<span class="bootstrap">
				<div class="btn-group">
                    <label href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtAssuntoPost"> 
                        <%=Model.Assuntos.First().StrAssunto%>&nbsp;<span class="caret"></span>
                    </label>
                    <input type="hidden" id="hAssuntoPost" initvalue="<%=Model.Assuntos.First().IdAssunto%>" value="<%=Model.Assuntos.First().IdAssunto%>" />
			        <ul class="dropdown-menu" id="cbAssuntoPost">
                        <% foreach (var assu in Model.Assuntos) { %>    	
                            <li assu="<%=assu.IdAssunto%>">
                                <input type="checkbox" id="ckAssuntoPost<%=assu.IdAssunto%>" <%=assu.IdAssunto == Model.Assuntos.First().IdAssunto ? "checked=\"checked\"" : ""%> />
			                    <label for="ckAssuntoPost<%=assu.IdAssunto%>"><%=assu.StrAssunto%>&nbsp;</label>
			                </li>                        
                        <% } %>	
                        <% if(Model.BolModerador) { %>
                        <li class="li_criar_editar_assunto">
                            <a class="criar_editar_assunto fancy" href="javascript:void(0);"><span class="fontello"></span> Criar e Editar</a>
                        </li>     
                        <% } %>                                                
			        </ul>
			    </div>
			</span>
            <span class="bootstrap">                
                <div class="btn-group">                
                    <div class="bootstrap" id="id_materia_turma"></div>                       
                </div>
            </span>
		</div>

        <div class="botoes right">
			<a style="" id="btnCancelarFerramentaMural" class="btn_cinza" href="javascript:void(0);">Cancelar</a>
			<input type="button" class="btn_cor" value="Compartilhar" id="visualizarPost" name="visualizarPost" />
            <input type="button" name="agendar" id="agendar" value="Agendar" style="margin-top:0px; display:none;" class="btn_cor msn_tarefa_grupo">
            <button id="btn-agendando" style="display:none;" class="btn-default agendar" ><img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...</button>
		</div>
        <div class="clearfix"></div>                			
    </div>							
</section>
<% } %>

