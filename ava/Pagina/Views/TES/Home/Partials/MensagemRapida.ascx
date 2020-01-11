<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Pagina.Models.MensagemRapida>" %>
<% 
    //Caso seja passado idMensagemRapida é uma edição
    int idMR = Model == null ? 0 : Model.IdMensagemRapida;
    var objPagina = (Pagina.Models.PaginaEducacional)ViewData["objPagina"];
    var js = new System.Web.Script.Serialization.JavaScriptSerializer();
    var selecaoDestino = ViewData["selecaoDestino"] == null ? "Todos" : ViewData["selecaoDestino"].ToString();    

    var imagensSerializadasEdicao = "";
    var arquivosSerializadasEdicao = "";
    var imagemBannerSerializacao = "";
    var idComp = idMR > 0 ? "edit" : ""; //Mudando as ids dos itens no diga lá para evitar conflito
    var bolEdit = (idMR > 0);
    int tipoMultimidia = 0;
    
    if (bolEdit)
    {
        if (Model.Imagens != null)
            tipoMultimidia = 1;
        else if (!String.IsNullOrEmpty(Model.StrLinkVideo) && !Model.BolBanner)
            tipoMultimidia = 2;
        else if (Model.Arquivos != null)
            tipoMultimidia = 3;
        else if (Model.BolBanner)
            tipoMultimidia = 4;
    
        //Preparando objImagens e objArquivos js
        if (Model.Imagens != null && !Model.BolBanner)
        {
            List<dynamic> imgAux = new List<dynamic>();
            foreach (var img in Model.Imagens)
            {
                //montando no mesmo formato, porem só com as informações necessarias
                imgAux.Add(new {
                    altura = 0,
                    arquivo = img.arquivo.strArquivo,
                    bolPaisagem = img.arquivo.bolPaisagem,
                    bolRetrato = img.arquivo.bolRetrato,
                    descricao = "", 
                    diretorio = img.arquivo.strDiretorio,
                    extensao = img.arquivo.strExtensao,
                    idArquivo = img.idArquivo,
                    largura = 0,
                    nome = img.arquivo.strNome,
                    thumbnail = img.arquivo.thumbnail
                });
            }
                                    
            imagensSerializadasEdicao = js.Serialize(imgAux);
        }

        if (Model.Arquivos != null && !Model.BolBanner)
        {
            List<dynamic> arqAux = new List<dynamic>();
            foreach (var arq in Model.Arquivos)
            {
                //montando no mesmo formato, porem só com as informações necessarias
                arqAux.Add(new
                {
                    altura = 0,
                    arquivo = arq.arquivo.strArquivo,
                    descricao = "",
                    diretorio = arq.arquivo.strDiretorio,
                    extensao = arq.arquivo.strExtensao,
                    idArquivo = arq.idArquivo,
                    nome = arq.arquivo.strNome
                });
            }

            arquivosSerializadasEdicao = js.Serialize(arqAux);
        }

        if (Model.Banner != null && Model.BolBanner)
        {
            dynamic imagem = new
            {
                id = Model.Banner.idArquivo,
                idBiblioteca = Model.Banner.idBiblioteca,
                strArquivo = Model.Banner.strArquivo,
                strDescricao = Model.Banner.strDescricao,
                strDiretorio = Model.Banner.strDiretorio,
                strExtensao = Model.Banner.strExtensao,
                strNome = Model.Banner.strNome,
                strThumbnail = Model.Banner.thumbnail,
                strTipo = "Imagem"
            };

            imagemBannerSerializacao = js.Serialize(imagem);
        }
    }

    var placeHolderDigaLa = objPagina.idPagina > 2 ? "Compartilhe mensagens com toda sua comunidade escolar ou personalize a seleção abaixo" : "Olá! compartilhe aqui a sua ideia ou link...";

    if(bolEdit) 
    { 
        %>
            <div id="arquivosSerializadasEdicao" style="display:none;"><%=arquivosSerializadasEdicao%></div>
            <div id="imagensSerializadasEdicao" style="display:none;"><%=imagensSerializadasEdicao%></div>
            <div id="imagensBannerSerializadasEdicao" style="display:none;"><%=imagemBannerSerializacao%></div>
            <div id="textoEdicao" style="display:none;"><%=(bolEdit) ? RedeSocialAVA.FuncoesTexto.BRtoNewLine(Model.StrMensagem) : ""%></div>
            <input type="hidden" id="mensagemOrigemAgendado" value="<%=Model.BolAgendado ? 1 : 0%>" />
            <input type="hidden" id="mensagemTipoMultimidia" value="<%=tipoMultimidia%>" />
        <% 
    } 
    %>
    <section class="dialogo clearfix <%=bolEdit ? "dialogo_edicao" : "" %>" ide="<%=idMR%>" style="<%=bolEdit ? "width:540px;" : "" %>" >
	    <a class="current actions komika" pos="0" href="javascript: void(0);">
            <span class="fontello digala"></span>
            Diga lá
            <span class="seta"></span>
        </a>
	    <div class="dialogo_box">
		    <textarea title="<%=placeHolderDigaLa%>" name="dialogo" placeholder="<%=placeHolderDigaLa%>" rows="1" cols="40" autocomplete="off" class="dialogo_field" id="txtInput<%=idComp%>" <%=bolEdit && Model.BolBanner ? "style=\"display:none;\"" : "" %>></textarea>
	        <% 
            if(bolEdit) 
            { 
                %>
                <div class="preview_post video" id="container_preview_video<%=idComp%>" <%=(tipoMultimidia != 2) ? " style=\"display:none;\"" : "" %>>
                    <% if(tipoMultimidia == 2) { %>
                    <iframe <%=RedeSocialAVA.FuncoesVideo.IsVimeoUrl(Model.StrLinkVideo) ? " class=\"iframeVideoVimeo\" " : ""%> width="300" height="165" src="//<%=Model.StrLinkPreviewVideo%>" allowTransparency="true" frameborder="0" allowfullscreen></iframe>
                    <a href="javascript: void(0);" onClick="removerPreviewVideoMensagem(false);" class="remover_multimidia"><span class="FontAwesome"></span>Remover</a>
                    <% } %>
                </div>
                <% 
            } 
            else 
            { 
                %>
                <div class="preview_post video" id="container_preview_video" style="display:none;"></div>
                <% 
            } 
            %>
            <div class="preview_post imagens content" data-idalbum="0" style="<%=(bolEdit && tipoMultimidia == 1) ? "" : "display: none;"%>">
                <div class="engloba_classe ">
                    <% 
                    if(bolEdit && tipoMultimidia == 1) 
                    { 
                        foreach(var img in Model.Imagens) 
                        {
                            %>
                            <div class="prev_imagem" data-idarquivo="<%=img.idArquivo%>">
                                <img width="99" height="99" alt="<%=img.arquivo.strArquivo%>" src="<%=img.arquivo.strDiretorio + "/" + img.arquivo.thumbnail + img.arquivo.strExtensao%>" />
                                <a class="remover_multimidia" href="javascript:void(0);">
                                    <span class="FontAwesome"></span>
                                </a>
                            </div>
                            <% 
                        } 
                    } 
                    %>
                    <div class="prev_imagem adicionar">
                        <a href="javascript:void(0);" class="adicionar_multimidia"><span class="FontAwesome"></span>Adicionar</a>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="preview_post content arquivos" data-idarquivomultimidia="0" style="<%=(bolEdit && tipoMultimidia == 3) ? "" : "display: none;"%>">
                <%
                if(bolEdit && tipoMultimidia == 3) 
                { 
                    foreach(var arq in Model.Arquivos) 
                    {      
                        %>
                        <div data-idarquivo="<%=arq.idArquivo%>">
                            <div class="prev_documento">
                                <div class="tipo_arquivo">
                                    <img width="32" height="41" src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png">
                                    <span><%=arq.arquivo.strExtensao%></span>
                                </div>
                                <p><%=arq.arquivo.strNome%></p>
                            </div>
                            <a class="remover_multimidia" href="#">
                                <span class="FontAwesome"></span>
                                Remover
                            </a>
                        </div>
                        <% 
                    } 
                } 
                %>
                <div class="clearfix"></div>
                <a href="javascript:void(0);" class="adicionar_doc"><span class="FontAwesome"></span>Adicionar</a>
            </div> 
            <div class="clearfix"></div>
            <input type="text" class="texto_banner" placeholder="Insira o texto do banner" <%=bolEdit && Model.BolBanner ? "" : "style=\"display:none;\"" %>/>
            <div class="feed_tipo_banner" style="display:none;">
                <span class="seta_cima"></span>
                <p>Os links no texto do banner foram removidos. Neste tipo de mensagem somente é possível utilizar um link e ele deve constar no campo URL.</p>
                <a href="javascript:void(0);" class="btn_cinza_min right">Ok</a>
                <div class="clearfix"></div>
            </div>
        

            <div class="upload_banner" <%=bolEdit && Model.BolBanner ? "" : "style=\"display:none;\"" %>>
                <a href="javascript:void(0);">
                    <span class="texto_placeholder" <%=bolEdit && Model.BolBanner && Model.Banner != null ? "style=\"display:none;\"" : "" %>>inserir imagem</span>
                    <span class="texto_menor" <%=bolEdit && Model.BolBanner && Model.Banner != null ? "style=\"display:none;\"" : "" %>>Ideal: 515x250px</span>
                    <img src="<%=bolEdit && Model.BolBanner && Model.Banner != null ? Model.Banner.strDiretorio + "/" + Model.Banner.thumbnail + Model.Banner.strExtensao : "" %>" alt="" <%=bolEdit && Model.BolBanner && Model.Banner != null ? "" : "style=\"display:none;\"" %> width="100" height="100" />
                </a>
                <a href="javascript:void(0);" class="remover_multimidia_banner" <%=bolEdit && Model.BolBanner && Model.Banner != null ? "" : "style=\"display:none;\"" %>>
                    <span class="fontello"></span>
                </a>
            </div>
            <div class="url_banner" <%=bolEdit && Model.BolBanner ? "" : "style=\"display:none;\"" %>>
                <input type="text" placeholder="Insira URL (link)" value="<%=bolEdit && Model.BolBanner ? Model.StrLinkVideo : "" %>"/>
                <p class="url_invalida_texto" style="display:none;">A URL inserida acima é inválida ou não existe.</p>
            </div> 
        </div>
        <div style="display:none;" class="enviar_video">
            <span class="FontAwesome"></span>
            <input type="text" id="txtLinkVideoMensagem<%=idComp%>" placeholder="Cole aqui a url do ví­deo do YouTube ou Vimeo" />
        </div>
        <div class="errovideo" style="display: none">A URL inserida acima é inválida ou não existe.</div>
        <div class="verificavideo" style="display: none">Verificando URL...</div>
        <input type="hidden" value="<%=bolEdit && tipoMultimidia == 2 ? Model.StrLinkVideo : "" %>" id="urlVideoOriginal<%=idComp%>" />  
	    <div class="clearfix"></div>
	    <div class="mensagem_multimidia">
		    <ul class="right" <%=(bolEdit && tipoMultimidia > 0) ? " style=\"display:none;\" " : "" %>>
			    <li class="multimidia_imagens">
			        <a href="javascript:void(0);"><span class="FontAwesome"></span> Imagens</a>
			    </li>

               

                <div id="previewImagemDigaLaPagina" class="preview_img_post preview_anx_post"  style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="Upload" id="Upload_frame" style="width: 100%; height: 100%; border:0;">
					</iframe>
				</div>     

                <div id="previewFileDigaLaPagina" class="preview_img_post preview_anx_post"  style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="UploadFile" id="Upload_frame" style="width: 100%; height: 100%; border:0;">

					</iframe>
				</div>		

			    <li class="multimidia_video">
			        <a href="javascript:void(0);"><span class="FontAwesome"></span> Vídeo</a>
			    </li>
			    <li class="multimidia_documentos">
			        <a href="javascript:void(0);"><span class="FontAwesome"></span> Arquivos</a>
			    </li>                
                <li class="multimidia_banner">
                    <a href="javascript:void(0);"><span class="fontello"></span> Banner</a>
                </li>                    
		    </ul>
            <div class="left" id="filtros_categoria<%=idComp%>">
			    <span class="postar_assunto fontello"></span>
			    <span class="bootstrap">
				    <div class="btn-group">
                        <% 
                        if(bolEdit) 
                        { 
                            %>                            
			                <label data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtAssuntoPost<%=idComp%>"> 
                                <%=Model.StrAssunto%>&nbsp;<span class="caret"></span>
                            </label>
                            <input type="hidden" id="hAssuntoPost<%=idComp%>" initvalue="<%=Model.IdAssunto%>" value="<%=Model.IdAssunto%>" />
			                <ul class="dropdown-menu" id="cbAssuntoPost<%=idComp%>">
                                <% 
                                foreach (var assu in objPagina.assuntos) 
                                { 
                                    %>    	
                                    <li assu="<%=assu.idAssunto%>">
                                        <input type="checkbox" id="ckAssuntoPost<%=idComp%><%=assu.idAssunto%>" <%=assu.idAssunto == Model.IdAssunto ? "checked=\"checked\"" : ""%> />
			                            <label for="ckAssuntoPost<%=idComp%><%=assu.idAssunto%>"><%=assu.strAssunto%>&nbsp;</label>
			                        </li>                        
                                    <% 
                                } 
                                %>
			                </ul>
                        <% 
                        } 
                        else 
                        { 
                            %>
                            <label data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtAssuntoPost"> 
                                <%=objPagina.assuntos.First().strAssunto%>&nbsp;<span class="caret"></span>
                            </label>
                            <input type="hidden" id="hAssuntoPost" initvalue="<%=objPagina.assuntos.First().idAssunto%>" value="<%=objPagina.assuntos.First().idAssunto%>" />
			                <ul class="dropdown-menu" id="cbAssuntoPost">
                                <% 
                                foreach (var assu in objPagina.assuntos) 
                                { 
                                    %>    	
                                    <li assu="<%=assu.idAssunto%>">
                                        <input type="checkbox" id="ckAssuntoPost<%=assu.idAssunto%>" <%=assu.idAssunto == objPagina.assuntos.First().idAssunto ? "checked=\"checked\"" : ""%> />
			                            <label for="ckAssuntoPost<%=assu.idAssunto%>"><%=assu.strAssunto%>&nbsp;</label>
			                        </li>                        
                                    <% 
                                } 
                                	
                                if(objPagina.idPagina > 2 && objPagina.bolComunicador) 
                                { 
                                    %>
                                    <li class="li_criar_editar_assunto">
                                        <a class="criar_editar_assunto fancy" href="javascript:void(0);"><span class="fontello"></span> Criar e Editar</a>
                                    </li>     
                                    <% 
                                } 
                                %>                                                 
			                </ul>
                        <% } %>
			        </div>  
			    </span>
		    </div>                
	    </div>
        <div class="clearfix"></div>
        <input type="hidden" id="selecaoDestino<%=idComp%>" value="<%=bolEdit ? selecaoDestino : "Todos" %>" />
        <div class="seletor_pagina" style="<%=bolEdit ? "" : "display:none;"%>">
            <div class="caixa_lajotinha seletorGlobal">                
				<div class="lajotinha naopersonalizada" style="<%=bolEdit ? (selecaoDestino != "Todos" ? "display:none;" : "") : "" %>">
					<span>Todos</span>					
				</div>
				<div class="lajotinha personalizada" style="<%=bolEdit ? (selecaoDestino != "Todos" ? "" : "display:none;") : "display:none;" %>">
					<span>Personalizado</span>
					<a title="Excluir da lista" class="excluir_lajotinha FontAwesome" href="javascript:void(0);"></a>
				</div>               						
            </div>
            <a title="Selecionar usuários" class="seletor_completo" href="javascript:void(0);"></a>
        </div>
        <div class="clearfix"></div>    
        <div class="sep_digala" style="<%=bolEdit ? "" : "display:none;"%>">
            <div class="hab_comentario_post left">
                <% 
                    if (objPagina.idPagina > 2 || objPagina.idPagina == 1) 
                { 
                    %>
                    <div class="checkbox_personalizado_css rightalign left <%=(bolEdit && (!String.IsNullOrEmpty(Model.StrMensagem))) ? "" : "disabled"%>">
			            <input type="checkbox" id="ckBolDestaque<%=idComp %>" name="checkDestaque" <%=bolEdit ? (Model.BolDestaque && (!String.IsNullOrEmpty(Model.StrMensagem))) ? "checked=\"checked\"" : "" : "" %> <%=(bolEdit && (!String.IsNullOrEmpty(Model.StrMensagem))) ? "" : "disabled=\"disabled\""%> />
			            <label for="ckBolDestaque<%=idComp%>">Destacar post</label>									  						 
		            </div>
                <%} 
                %>
		            <div class="checkbox_personalizado_css rightalign left <%=(objPagina.idPagina > 2 || objPagina.idPagina == 1) ? " mgleft20" : "" %>">
			        <input type="checkbox" id="ckBolComentar<%=idComp%>" name="check" <%=bolEdit ? Model.BolComentar ? "checked=\"checked\"" : "" : "" %> />	
			        <label for="ckBolComentar<%=idComp%>">Permitir comentários</label>									  						 
		            </div>
                    <% 
                    if (objPagina.idPagina > 2)
                    { %>
                    <div class="checkbox_personalizado_css rightalign down ">
			            <input type="checkbox" id="ckBolNotificar<%=idComp %>" name="checkNotificar" <%=bolEdit ? (Model.BolNotificar && (!String.IsNullOrEmpty(Model.StrMensagem))) ? "checked=\"checked\"" : "" : "checked=\"checked\"" %> />
			            <label style="margin-top: 15px;" for="ckBolNotificar<%=idComp%>">Notificar destinatários</label>									  						 
		            </div>
                    <%}%>

	        </div>					
		    <% 
            //Ajustando hora de agendamento
            var horaAgendamento = DateTime.Now.AddMinutes((Math.Ceiling((DateTime.Now.Minute / 5.00)) * 5) - DateTime.Now.Minute);     
            if(bolEdit) 
            { 
                %>
                <div class="right data_compartilhamento <%=Model.BolAgendado ? "agendamento_post" : ""%>">
                    <div class="imediatamente_post">
				        Compartilhar <strong>imediatamente</strong>
				        <a class="esconde" href="javascript:void(0);">Editar</a>
			        </div>
			        <form class="agendar_post">
				        Agendar para:
                        <input type="hidden" id="postAgendado<%=idComp%>" value="<%=Model.BolAgendado ? 1 : 0%>" />
                        <input type="hidden" id="hDataAgendamento<%=idComp%>" value="<%=Model.DtmAgendamento.ToString("dd/MM/yyyy")%>" />
                        <input type="hidden" id="hHoraAgendamento<%=idComp%>" value="<%=Model.DtmAgendamento.ToString("HH:mm")%>" />
                        <input id="dataAgendamento<%=idComp%>" class="data_agendamento_post ph input_data" type="text" placeholder="<%=Model.DtmAgendamento.ToString("dd/MM/yyyy")%>" readonly="true" value="<%=Model.DtmAgendamento.ToString("dd/MM/yyyy")%>" size="8" />
                        <input id="horaAgendamento<%=idComp%>" class="hora_agendamento_post ph" type="text" placeholder="<%=Model.DtmAgendamento.ToString("HH:mm")%>" value="<%=Model.DtmAgendamento.ToString("HH:mm")%>" size="3" />
				        <a class="esconde" href="javascript:void(0);">Cancelar</a>
			        </form>
		        </div> 
                <% 
            } 
            else 
            { 
                %>
                <div class="right data_compartilhamento">
                    <div class="imediatamente_post">
				        Compartilhar <strong>imediatamente</strong>
				        <a class="esconde" href="javascript:void(0);">Editar</a>
			        </div>
			        <form class="agendar_post">
				        Agendar para:
                        <input type="hidden" id="postAgendado" value="0" />
                        <input type="hidden" id="hDataAgendamento" value="0" />
                        <input type="hidden" id="hHoraAgendamento" value="0" />
                        <input id="dataAgendamento" class="data_agendamento_post ph input_data" type="text" placeholder="<%=horaAgendamento.ToString("dd/MM/yyyy")%>" readonly="true" value="<%=horaAgendamento.ToString("dd/MM/yyyy")%>" size="8" />
                        <input id="horaAgendamento" class="hora_agendamento_post ph" type="text" placeholder="<%=horaAgendamento.ToString("HH:mm")%>" value="<%=horaAgendamento.ToString("HH:mm")%>" size="3" />
				        <a class="esconde" href="javascript:void(0);">Cancelar</a>
			        </form>
		        </div> 
                <% 
            } 
            %>   
            <div class="clearfix"></div>            
            <div class="botoes right">
			    <a style="" id="btnCancelarFerramentaMural<%=idComp%>" class="btn_cinza" href="javascript:void(0);">Cancelar</a>
			    <input type="button" style="" class="btn_cor" value="Visualizar" id="visualizarPost<%=idComp%>" name="visualizarPost" />
		    </div>
            <div class="clearfix"></div>                			
        </div>							
    </section>
