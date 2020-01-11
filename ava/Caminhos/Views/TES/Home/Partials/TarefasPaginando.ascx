<%@ Control Language="C#" Debug="true" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.Caminho>>" %>
<%
    string uAgent = Request.UserAgent.ToLower();
    bool bolMobile = false;
    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }
bool bolAdmRede = Convert.ToBoolean(ViewData["bolAdmRedeSocial"]);
int intAlgumaEtapa = 0; //verifica se tinha alguma recurso na etapa
    
if (Model.Count > 0)
{
    int qtd = 1;
    foreach (var caminho in Model)
    {
        intAlgumaEtapa = 0; 
        string autor = "";
        bool tarefaPortal = false;
        if (caminho.strTipo == "meus")
        {
            autor = "Você";
        }
        else if (caminho.strTipo == "portal")
        {
            autor = "Portal";
            tarefaPortal = true;
        }
        else
        {
            autor = caminho.nomeUsuario;
        }

        int idDono = caminho.idUsuario;
        int idUsuarioAtual = Convert.ToInt32(ViewData["idUsuarioAtual"]);

        if (caminho.intStatus == 2 && idDono != idUsuarioAtual && !bolAdmRede) //XUNXO PRA NÃO MEXER NA SP = é privado e não é sua
        {

        }
        else
        {
            
        %>
        <%       
            string tituloAtividade = caminho.titulo;
            tituloAtividade = RedeSocialAVA.FuncoesTexto.ReverterAspas(tituloAtividade);
            tituloAtividade = RedeSocialAVA.FuncoesTexto.ArrumaAspas(tituloAtividade);
                        
        %>


        <tr class="bancocaminho_<%=caminho.id%> bcam" id="<%=caminho.id%>">
            <%if (bolAdmRede)
              { %>
            <td width="13%" class="mgle20"><%=autor%></td>
            <%} %>
            <td class="mgle20">
                <div style="cursor: pointer" id="escorrega_<%=caminho.id%>" idAtiv="<%=caminho.id%>" class="btnEscorregarCaminho">
                    <a href="javascript: void(0)"><span id="seta_<%=caminho.id%>">&#9660;</span> <%=tituloAtividade%></a>
                </div>
                <span class="e-actions <%=bolMobile ? "mobile" : "" %>">
                            
                    <%
                    if (caminho.strTipo == "meus")
                    {
                        if(caminho.totalAgendamento > 1)
                        {
                        %>
                        <a href="javascript: void(0)" class="bt_normal" onclick="abrirAgendamento(<%=caminho.id%>, 1, 1, 1, '','','', false, <%=bolAdmRede.ToString().ToLower()%>, 0, '', 2)">Agendamentos <span class="span_nbr"><%=caminho.totalAgendamento%></span></a>
                        <%
                        }
                        else
                        {
                        %>
                        <a href="javascript: void(0)" class="bt_normal" onclick="abrirAgendamento(<%=caminho.id%>, 1, 1, 1, '','','', false, <%=bolAdmRede.ToString().ToLower()%>, 0, '', 1)">Agendamentos <span class="span_nbr"><%=caminho.totalAgendamento%></span></a>
                        <%
                        }
                        %>
                        <a title="Duplicar" onclick="duplicarTarefa(<%=caminho.id%>)" class="bt_normal red_light">duplicar</a>
                        <a href="javascript:void(0);" id="btEscondidoAgendamento_<%=caminho.id%>"></a>
                        <%
                        bool podeEditarCaminho = true;
                        bool podeExcluirCaminho = true;
                        
                        if (caminho.totalAgendamento >= 0)
                        {   
                            foreach (var ag in caminho.lAgendamento)
                            {
                                if (ag.dtmFim <= DateTime.Now)
                                {
                                    podeEditarCaminho = false;
                                }

                                if (ag.dtmInicio <= DateTime.Now)
                                {
                                    podeExcluirCaminho = false;
                                }
                            }                                   
                        }
                        if (podeEditarCaminho)
                        {
                            %>
                            <a title="Editar" onclick="editarTarefa(<%=caminho.id%>)" class="bt_normal red_light" >editar</a>
                            <%
                        }

                        if (podeExcluirCaminho)
                        {
                            %>
                            <a href="/ava/Caminhos/Home/TelaExcluirTarefaCaminho/<%:caminho.id%>" class="bt_normal red_light excluirTarefaCaminho">excluir</a>
                            <%
                        }
                                
                    }
                    else
                    {
                        if (caminho.intStatus == 4 && Convert.ToInt32(ViewData["idEscola"]) == 3760001)
                        {
                            %>
                            <a title="Editar" onclick="editarTarefa(<%=caminho.id%>)" class="bt_normal red_light">editar</a>
                            <%   
                        }
                        %>
                        <a title="Duplicar" onclick="duplicarTarefa(<%=caminho.id%>)" class="bt_normal red_light">duplicar</a>
                        <%
                    }
                    %>
                    
                    <!--<span class="black_tip_center tooltip" id="tooltipExc_<%=caminho.id%>">
                        <p>Deseja realmente excluir esta tarefa? </p> 
                        <a href="javascript: void(0);" class="bt_normal green" onclick="excluirRotaTarefa(<%=caminho.id%>, true)">sim</a>
                        <a href="javascript: void(0);" class="bt_normal red" onclick="excluirRotaTarefa(<%=caminho.id%>, false)">não</a>
                        <span class="black_tip_seta">&#9660;</span>
                    </span>      -->                 
                    
                    <a href="javascript: void(0)" id="btDetalhe_<%=caminho.id%>" class="bt_normal" onclick="escorregaCaminho(<%=caminho.id%>)">ver detalhes</a>
                            
                </span>                                                           
            </td>
            <%if (!bolAdmRede)
              { %>
            <td width="13%" class="center"><%=autor%></td>
            <%} %>

            <% 
            string status = "<span class='privada'></span>Privado";
            if (caminho.intStatus == 1)
            {
                status = "<span class='publica'></span>Compartilhado";
            }
            else if (caminho.intStatus == 3)
            {
                status = "<span class='publica'></span>Compartilhado para POL";
            }
            else if (caminho.intStatus == 4)
            {
                status = "<span class='privada'></span>Em revisão";
            }
            %>
            <td width="11%" class="center" id="status_<%=caminho.id%>"><%=status%></td>
            <td width="13%" class="center"><%=caminho.dtmCriacao.ToString("dd/MM/yyyy") %></td>
        </tr>
                            
            <tr class="table_aberta" id="caminho_<%=caminho.id%>" style="display: none">
                <td colspan="3" valign="top" width="70%">
                    <div id="containerescorrega_<%=caminho.id%>" style="display:none">
                        <div class="ta_etapas cam_table">
                            <div class="infos_lebox">
                                <h3>Descrição da tarefa</h3>
                                <% 
                                if (caminho.descricao.Length == 0)
                                {
                                    %>
                                    <p id="caminhoDescr_<%=caminho.id%>">Nenhuma descrição cadastrada para esta tarefa.</p>
                                    <%
                                    
                                }
                                else if (caminho.descricao.Length > 200)
                                {
                                    %>
                                    <p id="caminhoDescr_<%=caminho.id%>"><%=caminho.descricao.Substring(0, 200) + "..."%></p>
                                    <p id="caminhoDescrCompleto_<%=caminho.id%>" style="display: none;"><%=caminho.descricao%></p>
                                    <p><a id="bt_verMaisDescRota_<%=caminho.id%>" rel="<%=caminho.id%>" class="bt_normal" href="javascript:void(0);">veja mais</a></p>           
                                    <%                
                                }
                                else
                                {                
                                    %>
                                    <p id="caminhoDescr"><%=caminho.descricao%></p>
                                    <%
                                }        
                                %>
                                
                                <!--infos_lebox mapoio-->          
                            </div><!--infos_lebox-->
                            <div class="infos_lebox mapoio">
                                    <h3>ESTA TAREFA CONTÉM:</h3>

                                    <%


                                      if (caminho.lArquivos.Count > 0)
                                            {
                                    %>
                                    <div class="r-selecionado">
                                        <p><h5>Materiais de apoio</h5></p>
                                        <div class="container_inlinks">
                                            <%
                                                foreach (var material in caminho.lArquivos)
                                                {
                                                    string strDiretorio = material.strDiretorio + "/" + material.strArquivo + material.strExtensao;
                                                %>
                                                <div class="the_insertedLink">
                                                    <a target="_blank" href="<%=strDiretorio%>" class="umlink"><span></span><%=material.strArquivo%></a>                        
                                                </div>                                
                                                <%
                                                    intAlgumaEtapa = 1;
                                                }
                                            %>                           
                                        </div>
                                    </div>
                                    <%
                                            }
                                                                              
                                     if (caminho.recursoEntrega != null && caminho.recursoEntrega.id.ToString() != "0")
                                            {
                                                intAlgumaEtapa = 1;
                                    %>
                                    <div class="r-selecionado">               
                                        <p><h5><i class="ep_status arq_enviado_on"></i>Esta tarefa requer uma entrega de trabalho</h5></p>
                                    </div>    
                                    <%
                                            }
                                    
                                    

                                        foreach (var etapa in caminho.lEtapa)
                                        {
                                            string s_rel = "";
                                            int intOrdemAgendamento = 0;
                                            int idAvaliacao = 0;
                                            string dominio = "";
                                            dominio = Request.Url.Host;
                                            string link = "";
                                            int idRotaAgendamento = 0;
                                            Caminhos.Business.Models.PaginacaoCM pCM = null;

                                            switch (etapa.recursoItem.idRecurso)
                                            {
                                                /*case 1:
                                                    //Avaliações
                                                    intOrdemAgendamento = etapa.recursoItem.intOrdemAgendamento;
                                                    idAvaliacao = etapa.recursoItem.idAvaliacao;
                                                    s_rel = "http://" + dominio + "/avaliacoesonline/fazer_avaliacao.asp?inicio=1&idAvaliacao=" + idAvaliacao + "&intAgend=" + intOrdemAgendamento;
                                                    break; */
                                                case 3:
                                                    //Interpretando            
                                                    link = etapa.recursoItem.strLink;
                                                    if (link.IndexOf("?") == -1)
                                                    {
                                                        link = link + "?";
                                                    }
                                                    s_rel = link;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                                case 5:
                                                    //Museu Virtual           
                                                    s_rel = "http://" + dominio + etapa.recursoItem.strLink;
                                                    s_rel = s_rel.Replace("pesquisa.asp", "pesquisaAVA.asp");
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                                case 6:
                                                    //Linha do Tempo            
                                                    link = "/linhadotempo/linha.asp?id=" + etapa.recursoItem.idPublicacao; //idPublicacao
                                                    s_rel = link + "&rota=" + idRotaAgendamento;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                                case 8:
                                                    //Fóruns            
                                                    link = "/foruns/proposta.asp?id=" + etapa.recursoItem.idPublicacao;
                                                    s_rel = link;//+ "&rota=" + idRotaAgendamento + "&idEtapa=" + etapa.id;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                                case 9:
                                                    //Obras Literárias
                                                    link = etapa.recursoItem.strLink;
                                                    if (link.IndexOf("?") == -1)
                                                    {
                                                        link = link + "?";
                                                    }
                                                    s_rel = link + "&rota=" + idRotaAgendamento;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                                case 2:
                                                    //Conteúdo Multimídia
                                                    link = etapa.recursoItem.strLink;
                                                    s_rel = etapa.recursoItem.strLink;
                                                    pCM = new Caminhos.Business.Models.PaginacaoCM();
                                                    if (etapa.paginaCM != null)
                                                    {
                                                        pCM.intOrdem = etapa.paginaCM.intOrdem;
                                                        pCM.intOrdem2 = etapa.paginaCM.intOrdem2;
                                                        pCM.iVersaoCM = etapa.paginaCM.iVersaoCM;
                                                        pCM.url = etapa.paginaCM.url;
                                                        pCM.idPublicacao = etapa.paginaCM.idPublicacao;
                                                        pCM.strTitulo = etapa.paginaCM.strTitulo;
                                                        pCM.urlPai = etapa.paginaCM.urlPai;
                                                    }
                                                    else
                                                    {
                                                        pCM.intOrdem = 1;
                                                        pCM.intOrdem2 = 1;
                                                        pCM.iVersaoCM = 3;
                                                        pCM.url = "a";
                                                        pCM.idPublicacao = 12;
                                                        pCM.strTitulo = "b";
                                                        pCM.urlPai = "c";
                                                    }

                                                    break;
                                                case 4: //Banco de Imagem
                                                case 7: //Atlas
                                                    link = "http://" + dominio + "/" + etapa.recursoItem.strLink;
                                                    s_rel = link;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;

                                                default:
                                                    s_rel = etapa.recursoItem.strLink;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                            } //switch

                                            if (etapa.recursoItem.idRecurso != 11) //se não for etapa do meu jeito
                                            {
                                                if (etapa.recursoItem.idRecurso != null)
                                                {
                                                    intAlgumaEtapa = 1;
                                                    %>
                                                    
                                                        <div class="r-selecionado">
                                                            <h5>Recurso selecionado</h5>
                                                            <span>
                                                            <% 
                                                    if (etapa.recursoItem.idRecurso > 1)
                                                    {

                                                     
                                                      

                                                    }
                                                    else
                                                    {
                                                                %>
                                                                <a href="javascript: void(0);" onclick="simularAvaliacao(<%=etapa.recursoItem.idAvaliacao%>)">    
                                                                <%
                                                    }
                                                            %>

                                                
                                                                <img width="55" height="55" src="<%=etapa.recursoItem.strThumbRecurso %>">
                                                    
                                                                
                                                                <strong><%=etapa.recursoItem.strTitulo%></strong>
                                                                    <%                                                            
                                                    string strDescricaoRecurso = "";

                                                    if (etapa.recursoItem.strDescricao != null)
                                                    {
                                                        if (etapa.recursoItem.strDescricao.Length > 200)
                                                        {
                                                            strDescricaoRecurso = etapa.recursoItem.strDescricao.Substring(0, 200) + "...";
                                                        }
                                                        else
                                                        {
                                                            strDescricaoRecurso = etapa.recursoItem.strDescricao;
                                                        }
                                                    }
                                                            
                                                                    %>
                                                                    <p><%=strDescricaoRecurso%></p>
                                                               </span>
                                                           </a>   
                                                    
                                                    </div>

                                                    <%
                                            
                                                }
                                            }
                                           

                                            if (etapa.recursoMidia.idTipoMidia.ToString().Length > 0 && etapa.recursoMidia.idTipoMidia.ToString() != "0") //Verifica se a etapa tem midia na descrição
                                            {
                                                intAlgumaEtapa = 1;
                                            %>
                                            <div class="r-selecionado">
                                                <h5>Vídeo enviado pelo professor</h5>
                                                <div class="midiaEtapa">
                                                    <%                         
                                                string embed = "";
                                                string larguraVideo = "560";
                                                string alturaVideo = "315";
                                                string tempo = "";
                                                if (etapa.recursoMidia.idMidia.Contains("#t=") || etapa.recursoMidia.idMidia.Contains("&t=") || etapa.recursoMidia.idMidia.Contains("?t="))
                                                {
                                                    #region tempoVideo
                                                    //Jogar para utils
                                                    {
                                                        try
                                                        {
                                                            if (!String.IsNullOrEmpty(etapa.recursoMidia.idMidia))
                                                            {
                                                                if (etapa.recursoMidia.idMidia.ToLower().IndexOf("t=") > 1)
                                                                {
                                                                    tempo = etapa.recursoMidia.idMidia.Split(new string[] { "t=" }, StringSplitOptions.RemoveEmptyEntries).Last().ToLower();
                                                                    if (tempo.ToLower().IndexOf("m") > 0)
                                                                    {
                                                                        //Tem minutos
                                                                        var partes = tempo.Split('m');
                                                                        int inicioMin;
                                                                        int inicioSec;

                                                                        if (int.TryParse(partes[0], out inicioMin))
                                                                        {
                                                                            if (inicioMin > 0)
                                                                                inicioMin = inicioMin * 60; //transformando em segundos
                                                                        }
                                                                        else
                                                                            inicioMin = 0;

                                                                        if (partes.Length > 1)
                                                                        {
                                                                            //Possui segundos
                                                                            if (int.TryParse(partes[1].Replace("s", ""), out inicioSec))
                                                                            {
                                                                                inicioMin += inicioSec;
                                                                            }
                                                                            else
                                                                                inicioSec = 0;
                                                                        }

                                                                        tempo = inicioMin.ToString();

                                                                    }
                                                                    else
                                                                    {
                                                                        //Só tem segundos
                                                                        tempo = tempo.Replace("s", "");
                                                                    }

                                                                }
                                                            }
                                                        }
                                                        catch
                                                        {
                                                            tempo = String.Empty;
                                                        }
                                                    }
                                                    #endregion
                                                    etapa.recursoMidia.idMidia = etapa.recursoMidia.idMidia.Substring(0, etapa.recursoMidia.idMidia.LastIndexOf("t=") - 1);
                                                }

                                                switch (etapa.recursoMidia.idTipoMidia)
                                                {
                                                    case 1:
                                                        {//Youtube
                                                            if (!String.IsNullOrEmpty(tempo))
                                                                tempo = "&start=" + tempo;
                                                            embed = "<iframe width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" src=\"http://www.youtube.com/embed/" + etapa.recursoMidia.idMidia + "?autoplay=0&wmode=transparent" + tempo + "\" frameborder=\"0\" allowfullscreen></iframe>";
                                                        } break;

                                                    case 2:
                                                        {//Vimeo
                                                            if (!String.IsNullOrEmpty(tempo))
                                                                tempo = "?player_id=preview" + etapa.idCaminho + "&api=1#t=" + tempo;
                                                            embed = "<iframe class=\"iframeVideoVimeo\" src=\"http://player.vimeo.com/video/" + etapa.recursoMidia.idMidia + tempo + "\" width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>";
                                                        } break;

                                                    case 3:
                                                        { //Globo
                                                            embed = "<object width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" data=\"http://s.videos.globo.com/p2/player.swf\" type=\"application/x-shockwave-flash\"><param value=\"true\" name=\"allowFullScreen\"><param value=\"http://s.videos.globo.com/p2/player.swf\" name=\"movie\" /><param value=\"high\" name=\"quality\" /><param value=\"midiaId=" + etapa.recursoMidia.idMidia + "&autoStart=false&width=" + larguraVideo + "&height=" + alturaVideo + "\" name=\"FlashVars\" /></object>";
                                                        } break;
                                                }
                                                Response.Write(embed);
                                                intAlgumaEtapa = 1;
                                                    %>
                                        </div>
                                    </div>
                                    <%
                                            }

                                            if (etapa.recursoEntrega != null && etapa.recursoEntrega.id.ToString() != "0")
                                            {
                                                intAlgumaEtapa = 1;
                                    %>
                                    <!--<div class="r-selecionado">               
                                        <p><h5><i class="ep_status arq_enviado_on"></i>Esta tarefa requer uma entrega de trabalho</h5></p>
                                    </div> -->   
                                    <%
                                            }

                                            if (etapa.lRecursoLink.Count > 0)
                                            {
                                                intAlgumaEtapa = 1;
                                    %>
                                    <div class="r-selecionado">
                                        <p><h5>Links enviados pelo professor</h5></p>
               
                                        <div class="container_inlinks">
                                            <%
                                                foreach (var linksApoio in etapa.lRecursoLink)
                                                {
                                                %>
                                                <div class="the_insertedLink">
                                                    <a target="_blank" href="<%=linksApoio.strLink%>" class="umlink"><span></span><%=linksApoio.strTitulo%></a>                        
                                                </div>                                
                                                <%
                                                    intAlgumaEtapa = 1;
                                                }
                                            %>            
                                        </div>   
                                    </div>
                                <%
                                            }

                                            //Coódigo de arquivos do IF ficava aqui


                                          

                                            if (etapa.lCodigoDidatico.Count > 0)
                                            {
                                    %>   
                                    <div class="r-selecionado">
                                        <p><h5>Códigos do livro didático</h5></p>
               
                                        <div class="infos_cods">
                                            <%                
                                                foreach (var codigo in etapa.lCodigoDidatico)
                                                {
                                                %>
                                                <p><%=codigo.strCodigo%> - <a href="<%=codigo.strURL%>" target="_blank" class="bt_normal"><%=codigo.strTituloCodigo%> <span class="c-novapagina"> </span></a></p>
                                                <%
                                                    intAlgumaEtapa = 1;
                                                }
                                            %>          
                                        </div>   
                                    </div>
                                    <%   
                                            }




                                        }

                                    
                            %>
                            
                            <%if(intAlgumaEtapa == 0){
                                  Response.Write("<p>Nenhuma etapa cadastrada para esta tarefa.</p>");
                              } %>
                            </div><!--mapoio-->
       
                                </div>
                        </div><!--ta_etapas-->
                    </div>     
                          
                </td>
                <td colspan="2" valign="top" width="30%">                                          
                        
                        <div class="lbbloco lbopcoes ta_desc">
                            <%
                                Html.RenderPartial("Partials/OpcoesCompartilhamento", new ViewDataDictionary { { "idEscola", ViewData["idEscola"] }, { "intStatus", caminho.intStatus }, { "cont", qtd }, { "idCaminho", caminho.id }, { "idDono", idDono }, { "idUsuarioAtual", idUsuarioAtual }, { "intTipo", 2 } });  
                            %>
                        </div>

                        <!-- <div class="ava_tags_box_clean clearfix">
                            <h4 class="left">Tags:</h4>                             
                            <%
                            if (caminho.lTag.Count > 0)
                            {
                                %>
                                <ul class="ava_tags">
                                    <%
                                    foreach (var tag in caminho.lTag)
                                    {
                                        if (caminho.totalAgendamento > 0 && idDono != idUsuarioAtual)
                                        {
                                            %>
                                            <li id="<%=tag.id%>"><%=tag.strTag%> <span class="lajo_x FontAwesome"><a href="javascript: void(0);"></a></span></li>    
                                            <% 
                                        }
                                        else
                                        {
                                            %>
                                            <li id="<%=tag.id%>"><%=tag.strTag%> <span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="fecharTag(<%=tag.id%>, <%=tag.id%>, <%=caminho.id%>)"></a></span></li>    
                                            <%    
                                        }
                                                               
                                    }
                                    %> 
							    </ul>
                                <%
                            }
                            else
                            {
                                %>
                                <p class="left">Você não adicionou tags para esta tarefa.</p>  
                                <%
                            }
                            %>           					                
          				</div>  -->

                        <%
                        if (caminho.totalAgendamento > 0)
                        {
                            %>
                            <p class="highlight">Esta tarefa não pode ser editada por já possuir agendamentos associados.</p>
                            <%     
                        }
                        %>
                </td>
            </tr> 
                             
        <%
        qtd++;
        }//é privado e não é sua
    }
}
else
{
    %>
     <tr class="mouseover">
        <td colspan="4" class="resultado_vazio_atividade">Nenhuma tarefa encontrada para os filtros aplicados.</td>
     </tr>
    <%
}   
%>
<!-- <script>
    (function disable_color(){
        var x = document.getElementById("example");
        x.style.color = "#E8E8E8";
    })();
</script> -->

 
