<%@ Page Language="C#"  MasterPageFile="~/Views/TES/Shared/Grupos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Grupo.Models.MensagemRapidaGrupo>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">   
    <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/grupos_3.2.0.css" />
    
    <%
        int idEdicao = Convert.ToInt32(ViewData["idEdicao"]); 
        if (idEdicao > 0)
        {    
            %>
            <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/clubes/grupos_clube_<%=idEdicao %>.css" />
            <%
        } 
    %>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/grupos_4.2.11.js"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/timelinegrupo(1)_3.1.13.js"></script>    
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/jquery.AvaSelector_3.4.7.js<%=Url.TimeStampLink() %>"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
    
    <input type="hidden" id="strNomeLogado" value="<%=Model.strNome%>" />
    <input type="hidden" id="strMiniFotoLogado" value="<%=Model.strMiniFoto%>" />
    <input type="hidden" id="strLoginLogado" value="<%=Model.strLogin%>" />
    <input type="hidden" id="strURLCorrente" value="<%=HttpContext.Current.Request.Url.AbsoluteUri%>" />
    
    <% 
    bool bolAcessoEscrever = (bool)ViewData["bolAcessoEscrever"];
    bool bolAcessoEscreverBloqueado = false;
    bool bolIpad = HttpContext.Current.Request.UserAgent.ToLower().Contains("ipad");
    UsuarioAVA.Models.SegmentacaoBloqueio segmentacaoBloqueio = (UsuarioAVA.Models.SegmentacaoBloqueio)ViewData["segmentacaoBloqueio"];
    bool bolMobile = false;
    string uAgent = Request.UserAgent.ToLower();

    bool bolSuspenso = false;
    string strJustificativaSuspenso = "";
    string strNomeAdminSuspenso = "";
    string dataIniSuspensao = "";
    string dataFimSuspensao = "";
    List<Grupo.Models.ParticipanteGrupo> lUsuariosGrupo = ViewData["lTodosUsuariosGrupo"] as List<Grupo.Models.ParticipanteGrupo>;
    int idAdesao = (int)ViewData["idAdesao"];
   


    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }
    
    bool bolAdmin = Convert.ToBoolean(ViewData["bolAdm"]);
    

    if (segmentacaoBloqueio != null)
    {
        bolAcessoEscreverBloqueado = segmentacaoBloqueio.bolBloqueado;
    }

    if (!bolAcessoEscrever)
        bolAcessoEscreverBloqueado = true;
    
        
        bool bolMediadorLogado = false;
    
    if (lUsuariosGrupo.Count > 0)
    {
        if (lUsuariosGrupo[0].bolMediador || lUsuariosGrupo[0].bolCriador)
        {
            bolMediadorLogado = true;
        }

        bolSuspenso = (bool)ViewData["bolSuspensao"];
        if (bolSuspenso)
        {
            strJustificativaSuspenso = (string)ViewData["strJustificativaSuspenso"];
            strNomeAdminSuspenso = (string)ViewData["strNomeAdminSuspenso"];
            dataIniSuspensao = (string)ViewData["dataIniSuspensao"];
            dataFimSuspensao = (string)ViewData["dataFimSuspensao"];
        }  
    }   
    
    %>

        <div class="carteirinhaParticipante" id="boxListaParticipantesGeral" style="display: none">
    
        <span class="seta_carteirinha_participante"></span>
        <div class="topoParticipantes">
	        <a class="fechar_participantes FontAwesome" href="javascript:void(0);"></a>
	        <h1>Participantes do grupo</h1>
	        <div class="bootstrap participantes_combo" id="cbFiltroParticipantes">
		        <div class="btn-group">
		            <button data-toggle="dropdown" class="btn btn-small dropdown-toggle"> <span class="FontAwesome"></span> <span id="txtBtnFiltroParticipante">Todos os participantes</span> <span class="caret"></span></button>
		            <ul class="dropdown-menu">
		                <li>
                            <% 
                            string strValues = "1,2,3,4";

                            if (!bolMediadorLogado)
                            {
                                strValues = "1,4";        
                            }    
                            %>

                            <input type="radio" id="cbParticipante_0" name="cbParticipante" value="<%=strValues %>">
		                    <label for="cbParticipante_0"><span class="FontAwesome"></span> Todos os participantes</label>
		                </li>
		                <li>
		                    <input type="radio" id="cbParticipante_1" name="cbParticipante" value="1">
		                    <label for="cbParticipante_1"><span class="FontAwesome"></span> Mediadores</label>
		                </li>
                                                
                        <% 
                            
                            
                        if (idAdesao != 4 && bolMediadorLogado)
                        {

                            if (idAdesao == 2)
                            {
                                %>
                                <li>
		                            <input type="radio" id="cbParticipante_2" name="cbParticipante" value="2">
		                            <label for="cbParticipante_2"><span class="FontAwesome"></span> Pedidos pendentes</label>
		                        </li>    
                                <%   
                            }
                            %>
                            
                            <li>
		                        <input type="radio" id="cbParticipante_3" name="cbParticipante" value="3">
		                        <label for="cbParticipante_3"><span class="FontAwesome"></span> Convites pendentes</label>
		                    </li>   
                            <%       
                        }    
                        %>	                    
                            
                        <li>
		                    <input type="radio" id="cbParticipante_4" name="cbParticipante" value="4">
		                    <label for="cbParticipante_4"><span class="FontAwesome"></span> Participantes</label>
		                </li>
		            </ul>
		        </div> 
	        </div>
	        <form>
		        <input type="text" placeholder="Pesquisar participante do grupo" id="strParticipante" />
		        <span class="icone_busca FontAwesome"></span>
	        </form>
        </div>	
        <div class="clearfix"></div>

        <div class="lista_participantes" id="boxListaParticipantes">
            
        </div>	
		
	</div>



    <input type="hidden" id="strIdLinkPermanente" value="<%=ViewData["idGrupo"]%>" />

    <a href="/AVA/Grupo/Home/PerfilGrupo/<%=ViewData["idGrupo"]%>" class="btn_cinza right voltar_grupo">
		<span class="FontAwesome"></span>
		Ver todas as mensagens do grupo
	</a>
    
    <section class="muralGrupos timeline" id="boxTimeLineGrupos">  
                
        <header>
			<h1 class="blokletters"><span class="icon_li mural"></span>MURAL</h1>
		</header>              
        <%
        
        int qtdRegistroPorPagina = Convert.ToInt32(ViewData["qtdRegistroPorPagina"]);
        int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
        bool ehMediador = Convert.ToBoolean(ViewData["ehMediador"]);
        string strLoginLogado = ViewData["strLoginLogado"].ToString();
        string strFotoLogado = ViewData["strFotoLogado"].ToString();

        if (Model != null)
        {
            string strClassAtivoCurtiu = "";
            if (Model.bolCurtiu)
            {
                strClassAtivoCurtiu = "ativo";    
            }

            if (Model.bolExcluido)
            {
                %>
                <div class="clearfix"></div>
                <h3 class="">
				    Ops!! Esta mensagem foi excluída. :(
			    </h3>
                <%
            }
            else
            {
            %>
            <div class="itemComentario <%=Model.bolEducador ? "highlight" : "" %>" id="msg_<%=Model.idMensagemRapida%>">
	            
                <ul class="combo_denunciar_excluir">
                    <li>
                        <a href="javascript:void(0);" class="icone"></a>
                        <ul>
                            <%
                            // Alteração Renan: Grupos com idEstado 3 (congelado) não devem permitir excluir mensagens.
                                    
                                if (bolAdmin || ehMediador || (idUsuarioLogado == Model.idUsuario))
                                { 
                                    %>
                                    <li><a class="excluir_mensagem_grupo mostra_caixa confirma_excluir" href="javascript:void()" ident="<%:Model.idMensagemRapida%>"><span class="excluir_comentario_combo FontAwesome"></span>Excluir</a></li>
                                    <%
                                }
                                    
                            %>
                            <li><a class="denunciar_mensagem denunciar_comentario" href="javascript: void(0);" ide="<%:Model.idMensagemRapida%>"><span class="denunciar_comentario_combo FontAwesome"></span>Denunciar</a></li>
                        </ul>                            
                    </li>
                </ul>
                
                <a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><img src="<%=Model.strMiniFoto%>" height="55" width="55"></a>
	            <div>
		            <div class="comentConteudo">     
                                   
                        <h3><a href="/AVA/Perfil/Home/Index/<%=Model.strLogin%>"><%=Model.strNome%></a></h3>
		                <span class="grupoTime"><%=Model.strTempoPublicacao%></span>
                        
                        <%
                        if (Model.idFerramentaTipo > 1)
                        {
                            var strLink = "";
                            if (Model.strLinkFerramenta != null)
                            {
                                strLink = Model.strLinkFerramenta;
                            }

                            string strLinkFinal = strLink.Replace("#id#", "" + Model.idFerramenta.ToString() + "");
                                                                 
                            strLinkFinal = strLink.Replace("#idAgendamento#", "" + Model.idFerramenta + "").Replace("#idEtapa#", "" + Model.IdAuxiliar1 + "");                                  
                            %>
                            <div class="embrulho">                           
                                <a href="<%=strLinkFinal%>">                                
                                    <img alt="" src="<%=Model.strImagemPathFerramenta%>">
                                </a>
                                <strong><a href="<%=strLinkFinal%>"><%=Model.strTipo%></a></strong>
                                <p class="ctn_msg"><%=Model.strMensagem%></p>
                            </div>
                        <%
                        }
                        else
                        {
                            %>
                            <span class="postar_assunto fontello"></span>
                            <span class="categoria_mural">
                                     <%=Model.assunto.strAssunto.ToUpper()%> 
                            </span> 
		                    <p class="ctn_msg"><%=Model.strMensagem%></p>

                            <%
                                if (Model.imagens != null && Model.imagens.Count > 0)
                                {
                                    int qtd = Model.imagens.Count;
                                    int qtdMax = 3;
                                    
                                %>

                                <div class="imagens_mural">
                                    <a data-width="<%=Model.imagens[0].arquivo.largura %>" data-height="<%=Model.imagens[0].arquivo.altura %>" data-idarquivo="<%=Model.imagens[0].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.idMensagemRapida %>" href="<%=Model.imagens[0].arquivo.strDiretorio + "/" + Model.imagens[0].arquivo.strArquivo + Model.imagens[0].arquivo.strExtensao %>" data-nomearquivo="<%=Model.imagens[0].arquivo.strNome %>" title="<%=Model.imagens[0].arquivo.strNome == null || Model.imagens[0].arquivo.strNome == "" ? "Insira um título" : Model.imagens[0].arquivo.strNome %>" data-posicao="<%=Model.imagens[0].intOrdem %>" data-descricao="<%=Model.imagens[0].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=Model.imagens[0].arquivo.strDiretorio + "/" + Model.imagens[0].arquivo.strArquivo + Model.imagens[0].arquivo.strExtensao %>"></a>
                                    <%
                                    if (qtd > 2)
                                    {
                                            %>
                                            <div class="thumbs_mural" style="height: 122px;">
                                            <%
                                        if (qtd > qtdMax)
                                        {

                                            for (int i = 1; i < qtdMax; i++)
                                            {
                                                    //Response.Write("> " + Model.imagens[i].arquivo.strDescricao + " - " + Model.imagens[i].arquivo.idArquivo);
                                                    %>
                                                    <a data-nomearquivo="<%=Model.imagens[i].arquivo.strNome %>" data-width="<%=Model.imagens[i].arquivo.largura %>" data-height="<%=Model.imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.idMensagemRapida %>" href="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.strArquivo + Model.imagens[i].arquivo.strExtensao %>" title="<%=Model.imagens[i].arquivo.strNome == null || Model.imagens[i].arquivo.strNome == "" ? "Insira um título" : Model.imagens[i].arquivo.strNome %>" data-posicao="<%=Model.imagens[i].intOrdem %>" data-descricao="<%=Model.imagens[i].arquivo.strDescricao %>"><img src="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.thumbnail + Model.imagens[i].arquivo.strExtensao %>"></a>
                                                    <%
                                            }

                                            for (int i = qtdMax; i < qtd; i++)
                                            {
                                                    %>
                                                    <a data-nomearquivo="<%=Model.imagens[i].arquivo.strNome %>" data-width="<%=Model.imagens[i].arquivo.largura %>" data-height="<%=Model.imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" style="display: none;" rel="galeria_mural_<%=Model.idMensagemRapida %>" href="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.strArquivo + Model.imagens[i].arquivo.strExtensao %>" title="<%=Model.imagens[i].arquivo.strNome == null || Model.imagens[i].arquivo.strNome == "" ? "Insira um título" : Model.imagens[i].arquivo.strNome %>" data-posicao="<%=Model.imagens[i].intOrdem %>" data-descricao="<%=Model.imagens[i].arquivo.strDescricao %>"><img src="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.thumbnail + Model.imagens[i].arquivo.strExtensao %>"></a>
                                                    <%
                                            }
                                        }
                                        else
                                        {
                                            for (int i = 1; i < qtd; i++)
                                            {
                                                    //Response.Write("> " + Model.imagens[i].arquivo.strDescricao + " - " + Model.imagens[i].arquivo.idArquivo);
                                                    %>
                                                    <a data-nomearquivo="<%=Model.imagens[i].arquivo.strNome %>" data-width="<%=Model.imagens[i].arquivo.largura %>" data-height="<%=Model.imagens[i].arquivo.altura %>" data-idarquivo="<%=Model.imagens[i].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.idMensagemRapida %>" href="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.strArquivo + Model.imagens[i].arquivo.strExtensao %>" title="<%=Model.imagens[i].arquivo.strNome == null || Model.imagens[i].arquivo.strNome == "" ? "Insira um título" : Model.imagens[i].arquivo.strNome %>" data-posicao="<%=Model.imagens[i].intOrdem %>" data-descricao="<%=Model.imagens[i].arquivo.strDescricao %>"><img src="<%=Model.imagens[i].arquivo.strDiretorio + "/" + Model.imagens[i].arquivo.thumbnail + Model.imagens[i].arquivo.strExtensao %>"></a>
                                                    <%
                                            }
                                        }
                                            %>
                                            </div>
                                            <%
                                    }
                                    else if (qtd == 2)
                                    {
                                            %>
                                            <a data-width="<%=Model.imagens[1].arquivo.largura %>" data-height="<%=Model.imagens[1].arquivo.altura %>" data-idarquivo="<%=Model.imagens[1].idArquivo %>" class="galeria_mural fancybox-thumb" rel="galeria_mural_<%=Model.idMensagemRapida %>" href="<%=Model.imagens[1].arquivo.strDiretorio + "/" + Model.imagens[1].arquivo.strArquivo + Model.imagens[1].arquivo.strExtensao %>" data-nomearquivo="<%=Model.imagens[1].arquivo.strNome %>" title="<%=Model.imagens[1].arquivo.strNome == null || Model.imagens[1].arquivo.strNome == "" ? "Insira um título" : Model.imagens[1].arquivo.strNome %>" data-posicao="<%=Model.imagens[1].intOrdem %>" data-descricao="<%=Model.imagens[1].arquivo.strDescricao %>"><img style="width: 100%;" src="<%=Model.imagens[1].arquivo.strDiretorio + "/" + Model.imagens[1].arquivo.strArquivo + Model.imagens[1].arquivo.strExtensao %>"></a>
                                            <%
                                    }
                                    %>
                                
                                    </div>
                            <%
                                }//fecha if imagens

                                if(!String.IsNullOrEmpty(Model.strLinkVideo))
                                    if (Model.strLinkVideo.Length > 0)
                                    {
                                        string strLinkPrev = Model.strLinkPreviewVideo;
                                        if (String.IsNullOrEmpty(strLinkPrev)) strLinkPrev = "";
                                        %>
                                        <a class="linkvideo" href="<%=Model.strLinkVideo%>" target="_blank"><%=Model.strLinkVideo%></a>

                                        <iframe <%=strLinkPrev.ToLower().Contains("vimeo") ? "class=\"iframeVideoVimeo\"" : "" %> width="450" height="315" src="//<%=strLinkPrev%>" frameborder="0" allowfullscreen></iframe>
                                        <%
                                    }           
                            
                            
                            if (Model.arquivos != null && Model.arquivos.Count > 0)
                            {
                                int qtd = Model.arquivos.Count;
                                for (int i = 0; i < (qtd > 3 ? 3 : qtd); i++)
                                {
                                    %>
                                    <div class="prev_documento">
                                        <div class="tipo_arquivo">
                                            <img src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png" height="41" width="32">
                                            <span><%=Model.arquivos[i].arquivo.strExtensao %></span>
                                        </div>    
                                        <p><%=Model.arquivos[i].arquivo.strNome %></p>
                                        <%
                                        if (bolMobile)
                                        {
                                            %>
                                            <a target="_blank" href="<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                        else
                                        {
                                            %>
                                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                        %>
                                        
                                    </div>
                                    <%
                                }
                                
                                if (Model.arquivos.Count > 3)
                                {
                                %>
                                    <div class="engloba_doc">
                                <%                                
                                for (int i = 3; i < qtd; i++)
                                {
                                    %>
                                    <div class="prev_documento">
                                        <div class="tipo_arquivo">
                                            <img src="/ava/StaticContent/Common/img/perfil/documento_multimidia.png" height="41" width="32">
                                            <span><%=Model.arquivos[i].arquivo.strExtensao %></span>
                                        </div>    
                                        <p><%=Model.arquivos[i].arquivo.strNome %></p>
                                        <%
                                        if (bolMobile)
                                        {
                                            %>
                                            <a target="_blank" href="<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                        else
                                        {
                                            %>
                                            <a href="/ava/upload/home/forcedownload/?strSrcArquivo=<%=Model.arquivos[i].arquivo.strDiretorio + "/" + Model.arquivos[i].arquivo.strArquivo + Model.arquivos[i].arquivo.strExtensao %>">Download</a>
                                            <%
                                        }
                                        %>
                                    </div>
                                    <%
                                }    
                                %>                                    
                                </div>
                                
                                <a href="javascript:void(0);" class="ver_mais_doc">Ver mais</a>
                                <%
                                }
                                %>
                                <div class="clearfix"></div>
                                <%
                            }                             
                        }
                        %>
                    </div>
                    
		            <div class="acoes_mural_grupo">
			            <a href="javascript:void(0);" class="botaoCurtirGrupos <%=strClassAtivoCurtiu%>" idMensagemRapida="<%=Model.idMensagemRapida%>"></a>
			            <div class="feedCurtir" idMensagem="<%=Model.idMensagemRapida%>" id="boxCurticoesMensagem_<%=Model.idMensagemRapida%>">
                            <%
                            Html.RenderPartial("Partials/ListaCurticoesMensagem", Model, new ViewDataDictionary { { "idUsuarioLogado", idUsuarioLogado } });
                            %>
			            </div>
                       
                        <% 
                        if (!bolAcessoEscreverBloqueado)
                        {
                            %>
                            <a href="javascript:void(0);" class="botaoComentar" idMensagemRapida="<%=Model.idMensagemRapida%>"><span class="FontAwesome"></span></a>
                            <%
                        }    
                            %>
                            <div class="clearfix"></div>
                            <div class="comentariosMuralGrupo" id="boxComentariosGrupo_<%=Model.idMensagemRapida%>">
						        <%
                                Html.RenderPartial("Partials/ListaComentarios", Model.comentarios, new ViewDataDictionary { { "totalComentarios", Model.totalComentarios }, { "idMensagemRapida", Model.idMensagemRapida }, { "ehMediador", ehMediador }, { "idUsuarioLogado", idUsuarioLogado } });
                                %>
					        </div>
                        
                       <%
                        if (!bolAcessoEscreverBloqueado)
                        {  
                        %>
                            <form class="campo_comentar" id="campoComentar_<%=Model.idMensagemRapida%>" id="frmMensagemRapidaComentario" name="frmMensagemRapidaComentario" method="post" onsubmit="return false;">
				                <a href="/AVA/Perfil/Home/Index/<%=strLoginLogado%>"><img src="<%=strFotoLogado%>" height="25" width="25"></a>
				                <input placeholder="Escreva um comentário..." id="strComentarioGrupo" name="strComentarioGrupo" autocomplete="off" idMensagemRapida="<%=Model.idMensagemRapida%>" type="text" />
			                </form>     
                            <%
                        }    
                        %>  		                                     
		            </div>
	            </div>	
            </div>
            <%
        }
    
    }
    else
    {
        %>
        <article class="clearfix highlight ">Nenhuma mensagem enviada.</article>
        <input type="hidden" value="semMensagens" />
        <%
    }   
    %>					

    </section><!-- .muralGrupos -->

</asp:Content>
