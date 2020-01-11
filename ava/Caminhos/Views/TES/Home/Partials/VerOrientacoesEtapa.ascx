<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Etapa>" %>

<div class="infos-content">
    <% 
        string rex = "<(script|style)\\b[^>]*?>.*?</\\1>";
    int idEtapa = Model.id;
    string strEtapa = Model.strEtapa;

    int intSituacao = Convert.ToInt32(ViewData["intSituacao"]);

    if (strEtapa.Length <= 0)
    {
        strEtapa = "Tarefa sem título";
    }

    string strDescricaoEtapa = Model.strDescricao;
    strDescricaoEtapa = RedeSocialAVA.FuncoesTexto.ReverterAspas(strDescricaoEtapa);
    strDescricaoEtapa = Regex.Replace(Server.HtmlDecode(strDescricaoEtapa), rex, "", RegexOptions.IgnoreCase | RegexOptions.Singleline);
    strDescricaoEtapa = RedeSocialAVA.FuncoesTexto.ArrumaAspas(strDescricaoEtapa);
           
    %>
    
    <div class="infos_header infos_lebox">
        <h3>Orientações da tarefa</h3>
                
        <% 
        if (Model.intValor > 0)
        {
            %>
            <span>Esta tarefa vale: <%=Model.intValor%> </span>    
            <%

        }
        else
        {
            %>
            <span>Esta tarefa não vale nota</span>  
            <%
        }  
        %>    
    </div>

    <div class="modal_detalhes_tarefa">

        <div class="infos_lebox infos_titulo">
            <p><h5><%=strEtapa%></h5></p>
        </div>

        <div class="infos_lebox infos_descricao"><%=strDescricaoEtapa%></div>

        <%
        string s_aClass = "";
        string s_hRef = "";
        string s_rel = "";
        string s_classEtapaCorrente = "";
        string s_onClick = "";
        int intOrdemAgendamento = 0;
        int idAvaliacao = 0;
        string dominio = "";
        dominio = Request.Url.Host;
        string link = "";
        int idRotaAgendamento = 0;
        string strLinkRecurso = "";
        Caminhos.Business.Models.PaginacaoCM pCM = null;
        switch (Model.recursoItem.idRecurso)
        {
            /*case 1:
                //Avaliações
                intOrdemAgendamento = Model.recursoItem.intOrdemAgendamento;
                idAvaliacao = Model.recursoItem.idAvaliacao;
                s_rel = "http://" + dominio + "/avaliacoesonline/fazer_avaliacao.asp?inicio=1&idAvaliacao=" + idAvaliacao + "&intAgend=" + intOrdemAgendamento;
                break; */       
            case 3:
                //Interpretando            
                link = Model.recursoItem.strLink;
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
                s_rel = "http://" + dominio + Model.recursoItem.strLink;
                s_rel = s_rel.Replace("pesquisa.asp", "pesquisaAVA.asp");
                idAvaliacao = 0;
                intOrdemAgendamento = 0;
                break;
            case 6:
                //Linha do Tempo            
                link = "/linhadotempo/linha.asp?id=" + Model.recursoItem.idPublicacao; //idPublicacao
                s_rel = link + "&rota=" + idRotaAgendamento;
                idAvaliacao = 0;
                intOrdemAgendamento = 0;
                break;        
            case 8:
                //Fóruns            
                link = "/foruns/proposta.asp?id=" + Model.recursoItem.idPublicacao;            
                s_rel = link ;//+ "&rota=" + idRotaAgendamento + "&idEtapa=" + idEtapa;
                idAvaliacao = 0;
                intOrdemAgendamento = 0;
                break;
            case 9:
                //Obras Literárias
                link = Model.recursoItem.strLink;
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
                s_aClass = "abrePlayer";
                s_hRef = "javascript: void(0);";
                link = Model.recursoItem.strLink;
                s_rel = Model.recursoItem.strLink;
                pCM = new Caminhos.Business.Models.PaginacaoCM();
                if (Model.paginaCM != null)
                {
                    pCM.intOrdem = Model.paginaCM.intOrdem;
                    pCM.intOrdem2 = Model.paginaCM.intOrdem2;
                    pCM.iVersaoCM = Model.paginaCM.iVersaoCM;
                    pCM.url = Model.paginaCM.url;
                    pCM.idPublicacao = Model.paginaCM.idPublicacao;
                    pCM.strTitulo = Model.paginaCM.strTitulo;
                    pCM.urlPai = Model.paginaCM.urlPai;
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
/**            case 4: //Banco de Imagem
            case 7: //Atlas
                link = "http://" + dominio + "/" + Model.recursoItem.strLink;
                s_rel = link;
                idAvaliacao = 0;
                intOrdemAgendamento = 0;
                break;
**/                               
            default:
                s_rel = Model.recursoItem.strLink;
                idAvaliacao = 0;
                intOrdemAgendamento = 0;
                break;
        }

        if (Model.recursoItem.idRecurso != 11) //se não for etapa do meu jeito
        {       
            if (Model.recursoItem.idRecurso != null)
            {
                %>
                <div class="infos_lebox infos_recurso">
                    <div class="r-selecionado">
                        <h5>Recurso selecionado</h5>
                        <% 
                        if (Model.recursoItem.intEstado == 94 || Model.recursoItem.intEstado == 91 || Model.recursoItem.idRecurso == 1)
                        {
                            if (Model.recursoItem.idRecurso == 7 || Model.recursoItem.idRecurso == 4)
                            {
                                s_rel = "/" + s_rel;
                            }
                        
                            if( Model.recursoItem.idRecurso.Equals(2)){
                                %>
                                <a class="abrirDetalhesRecursoProfessor" href="javascript: void(0);" rel="<%=s_rel %>" 
                            
                                idrecurso="<%=Model.recursoItem.idRecurso %>" 
                            
                                idpublicacao="<%=pCM.idPublicacao %>" 
                                urlpai="<%=pCM.urlPai %>" 
                                url="<%=pCM.url %>" pordem="<%=pCM.intOrdem %>" 
                                sordem="<%=pCM.intOrdem2 %>" iversao="<%=pCM.iVersaoCM %>">
                                <%
                            }
                            else if ((intSituacao == 3 || intSituacao == 4) && Model.recursoItem.idRecurso > 1)
                            {
                                %>
                                <a href='<%=s_rel%>' target="_blank">
                                <%
                            }
                            else if (Model.recursoItem.idRecurso.Equals(12)) { 
                                if(s_rel.Contains("javascript")){
                                     %>
                                        <a href='<%=s_rel%>'>
                                    <%
                                }else{
                                    %>
                                        <a href='<%=s_rel%>' target="_blank">
                                    <%
                                }
                            }
                            else
                            {
                                %>
                                <a href="javascript: void(0);" onclick="simularAvaliacao(<%=Model.recursoItem.idAvaliacao%>)">
                                <%
    }
                            %>
                        
                                <img width="55" height="55" src="<%=Model.recursoItem.strThumbRecurso %>">
                                <span>
                                    <strong><%=Model.recursoItem.strTitulo%></strong>
                                    <% 
                                        string strDescricaoRecurso = "";
                                        if (Model.recursoItem.strDescricao.Length > 200)
                                        {
                                            strDescricaoRecurso = Model.recursoItem.strDescricao.Substring(0, 200) + "...";
                                        }
                                        else
                                        {
                                            strDescricaoRecurso = Model.recursoItem.strDescricao;
                                        }
                                    %>
                                    <p><%=strDescricaoRecurso%></p>
                                </span>
                            </a>  
                            <%
                        }
                        else
                        {
                            %>
                            <a>
                                <img width="55" height="55" src="<%=Model.recursoItem.strThumbRecurso %>">
                                <span>
                                    <strong><%=Model.recursoItem.strTitulo%></strong>                                
                                    <p>Este recurso não está mais disponível.</p>
                                </span>
                            </a>
                            <%
                        }
                        %> 
                    </div>                
                </div>
                <%
            }
        }
                
        if (Model.recursoMidia.idTipoMidia.ToString().Length > 0 && Model.recursoMidia.idTipoMidia.ToString() != "0") //Verifica se a etapa tem midia na descrição
        {
            %>
            <div class="infos_lebox infos_midia">
                <h5>Vídeo enviado pelo professor</h5>
                <div class="midiaEtapa">
                    <%                         
                    string embed = "";
                    string larguraVideo = "560";
                    string alturaVideo = "315";
                    string tempo = "";
                    if (Model.recursoMidia.idMidia.Contains("#t=") || Model.recursoMidia.idMidia.Contains("&t=") || Model.recursoMidia.idMidia.Contains("?t="))
                    {
                        #region tempoVideo
                        //Jogar para utils
                        {
                            try
                            {
                                if (!String.IsNullOrEmpty(Model.recursoMidia.idMidia))
                                {
                                    if (Model.recursoMidia.idMidia.ToLower().IndexOf("t=") > 1)
                                    {
                                        tempo = Model.recursoMidia.idMidia.Split(new string[] { "t=" }, StringSplitOptions.RemoveEmptyEntries).Last().ToLower();
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
                        //tempo = Model.recursoMidia.idMidia.Substring(Model.recursoMidia.idMidia.LastIndexOf("t=") + 2);
                        Model.recursoMidia.idMidia = Model.recursoMidia.idMidia.Substring(0, Model.recursoMidia.idMidia.LastIndexOf("t=") - 1);
                    }
                    
                    switch (Model.recursoMidia.idTipoMidia)
                    {
                        case 1: //Youtube
                            if (!String.IsNullOrEmpty(tempo))
                                tempo = "&start=" + tempo;
                            embed = "<iframe width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" src=\"http://www.youtube.com/embed/" + Model.recursoMidia.idMidia + "?autoplay=0&wmode=transparent" + tempo + "\" frameborder=\"0\" allowfullscreen></iframe>";
                        break;
                                 
                        case 2: //Vimeo
                        if (!String.IsNullOrEmpty(tempo))
                            tempo = "?player_id=preview" + Model.idCaminho + "&api=1#t=" + tempo;
                        embed = "<iframe  class=\"iframeVideoVimeo\" src=\"http://player.vimeo.com/video/" + Model.recursoMidia.idMidia + tempo + "\" width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>";
                        break;
                                 
                        case 3: //Globo
                        embed = "<object width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" data=\"http://s.videos.globo.com/p2/player.swf\" type=\"application/x-shockwave-flash\"><param value=\"true\" name=\"allowFullScreen\"><param value=\"http://s.videos.globo.com/p2/player.swf\" name=\"movie\" /><param value=\"high\" name=\"quality\" /><param value=\"midiaId=" + Model.recursoMidia.idMidia + "&autoStart=false&width=" + larguraVideo + "&height=" + alturaVideo + "\" name=\"FlashVars\" /></object>";
                        break;
                    }
                    Response.Write(embed);
                    %>
                </div>
            </div>
            <%
        }
    
        if (Model.recursoEntrega != null && Model.recursoEntrega.id.ToString() != "0")
        {
            %>
            <div class="infos_lebox infos_entrega">               
                <p><h5><i class="ep_status arq_enviado_on"></i>Esta tarefa requer uma entrega de trabalho</h5></p>
            </div>    
            <%
        }

        if (Model.lRecursoLink.Count > 0)
        {
            %>
            <div class="infos_lebox infos_links">
                <p><h5>Links enviados pelo professor</h5></p>
               
                <div class="container_inlinks">
                    <%
                    foreach (var linksApoio in Model.lRecursoLink)
                    {
                        %>
                        <div class="the_insertedLink">
                            <a target="_blank" href="<%=linksApoio.strLink%>" class="umlink"><span></span><%=linksApoio.strTitulo%></a>                        
                        </div>                                
                        <%
                    }
                    %>            
                </div>   
            </div>
        <%
        }
        
        if (Model.lArquivoEtapa.Count > 0)
        {
            %>
            <div class="infos_lebox infos_links">
                <p><h5>Materiais de apoio</h5></p>
                <div class="container_inlinks">
                    <%
                    foreach (var material in Model.lArquivoEtapa)
                    {
                        string strDiretorio = material.strDiretorio + "/" + material.strArquivo + material.strExtensao;
                        %>
                        <div class="the_insertedLink">
                            <a target="_blank" href="<%=strDiretorio%>" class="umlink"><span></span><%=material.strArquivo%></a>                        
                        </div>                                
                        <%
                    }
                    %>                           
                </div>
            </div>
            <%
        }

        if (Model.lCodigoDidatico.Count > 0)
        {
            %>   
            <div class="infos_lebox infos_links">
                <p><h5>Códigos do livro didático</h5></p>
               
                <div class="infos_cods">
                    <%                
                    foreach (var codigo in Model.lCodigoDidatico)
                    {
                        %>
                        <p><%=codigo.strCodigo%> - <a href="<%=codigo.strURL%>" target="_blank" class="bt_normal"><%=codigo.strTituloCodigo%> <span class="c-novapagina"> </span></a></p>
                        <%
                    }
                    %>          
                </div>   
            </div>
            <%   
        }

        if (intSituacao == 4)
        {
            Html.RenderAction("ListaArquivosEnviadosEtapa", new { idEtapa = Model.id });
        }
       
        %>

    </div>
</div>


