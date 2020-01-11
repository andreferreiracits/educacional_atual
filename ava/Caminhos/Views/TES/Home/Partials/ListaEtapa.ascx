<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Etapa>" Debug="true" %>

<form name="fEtapa" id="fEtapa" method="post">
    <input type="hidden" id="idEtapa" value="<%=Model.id%>" />
    <input type="hidden" id="idCaminho" value="<%=Model.idCaminho%>" />
    <input type="hidden" id="intEtapa" value="<%=Model.intEtapa%>" />
    <input type="hidden" id="dirUsuario" value="<%=ViewData["dirUsuarioTiny"]%>" />
    <input type="hidden" id="idRecursoEtapa" value="<%=Model.recursoItem.id%>" />
    <input type="hidden" name="strImagemEditor" id="strImagemEditor" value="">
    <% 
    string strHTMLAval = "";
    string strComplemento = "";
    bool bolAvaliacao = false;
    int intEtapa = Model.intEtapa;
    
    if (Model.recursoItem.idAvaliacao > 0)
    {
        bolAvaliacao = true;
        strComplemento = "disabled='disabled'";
    }
          
    %>
    <input type="hidden" id="bolAvaliacao" value="<%=bolAvaliacao%>" />        
    
    <div class="lbbloco"> 
        <label>
        <div class="hlabel" id="anc_titEtapa">Título</div>
            <span class="lb_info discreto">&nbsp;caracteres restantes</span><span class="lb_info discreto" id="tituloLimite"></span>
            <input id="tituloetapa" class="sombra_form ph" <%=strComplemento%> type="text" placeholder="Escreva aqui um título para a sua tarefa." value="<%=Model.strEtapa%>">
        </label>
    </div>

    <div class="lbbloco">
        <label>
            <div class="hlabel">Descrição</div>
            <%
            if (Model.recursoItem.idAvaliacao > 0)
            {
                %>
                <textarea name="descricaoetapa" id="descricaoetapa" <%=strComplemento%> class="sombra_form txtDescricaoEtapa descricaoetapa"><%=Model.strDescricao%></textarea>
                <%
                strHTMLAval = "<span>*Título, Descrição e Valor são herdados da ferramenta de avaliações.</span>";
            }
            else
            {
                %>
                <textarea name="descricaoetapa" id="descricaoetapa" class="sombra_form descricaoetapa txtDescricaoEtapa descricaoetapa"><%=Model.strDescricao%></textarea>
                <%
            }
            %>
        </label>
    </div>

    <hr></hr>
    <div class="lbbloco">     
        <%
        if (Model.intValor > 0)
        {
            %>
            <input class="solto" type="checkbox" name="valeNota" id="valeNota" <%=strComplemento%> checked>
            <div class="hlabel">Esta tarefa será avaliada? </div>
	        <input class="sombra_form solto ph" type="text" maxlength="6" id="intValorEtapa" value="<%=Model.intValor%>" <%=strComplemento%> placeholder="Valor" />
            <%
            Response.Write(strHTMLAval);
        }
        else
        {
            %>
            <input class="solto" type="checkbox" name="valeNota" id="valeNota"> 
            <div class="hlabel">Esta tarefa será avaliada? </div>
            <input class="sombra_form solto ph" type="text" maxlength="6" id="intValorEtapa" value="" disabled placeholder="Valor" />
	        <%
        }
        %>
    </div>

    <% 
    if (!bolAvaliacao)
    {
        %>

        <div class="add_more">
            <div class="am_titulos" id="toggle_material" >
          <% if (Model.lArquivoEtapa.Count > 0)
             { %>
                <span class="up_down">&#9650;</span>
          <% } else { %>
                <span class="up_down">&#9660;</span>
          <% } %>
                Material de apoio 
                <span class="discreto">Anexe arquivos para os alunos baixarem quando acessarem a tarefa</span>
            </div>
            <%
            if (Model.lArquivoEtapa.Count > 0)
            {
            %>
            <div class="drop_caixa sobedesce_material cx_arq_<%=Model.id%>" id="countt_<%=intEtapa %>" style="display: block">
              <a class="ne-salvar awesome awesome-green" href="javascript:void(0)" onclick="abreUploadCaminhos(<%=Model.id%>)">Inserir</a>
                <div class="cx_arq_aux_<%=Model.id%>">
                    <div class="container_inlinks">
                            <!--<h5>Material de apoio</h5> -->
                    <% 
                    foreach (var arquivo in Model.lArquivoEtapa)
                    {
                        string strArquivo = arquivo.strArquivo;
                        string strLink = arquivo.strDiretorio + "/" + arquivo.strArquivo + arquivo.strExtensao;
                        %>
                        <div class="the_insertedMedia">
		                    <a class="umlink" target="_blank"  href="<%=strLink%>"><span class="umarquivo"></span><%=strArquivo%></a>
		                    <a class="bt_normal exclui_arquivo" onclick="excluirArquivoAoEditar(<%=Model.id%>,<%=arquivo.idArquivo%>)" href="javascript:void(0);" idArquivo="<%=arquivo.idArquivo%>"><strong>x</strong></a>
			            </div>
                        <%            
                    }    
                    %>
                    </div>   
               <%     
            }
            else
            {
                %>
                <div class="drop_caixa sobedesce_material cx_arq_<%=Model.id%>" id="countt_<%=intEtapa %>" style="display: none">
                    <a class="ne-salvar awesome awesome-green" href="javascript:void(0)" onclick="abreUploadCaminhos(<%=Model.id%>)">Inserir</a>
                    <div class="cx_arq_aux_<%=Model.id%>"></div>
                </div>
                <%
           }%>
                </div>
            </div>
        </div>

        <div class="add_more ava_midia" id="anc_strURL">
            <div class="am_titulos" id="toggle_midia"><span class="up_down">&#9660;</span> Inserir Vídeo <span class="discreto">YOUTUBE, VIMEO OU Vídeos Globo</span></div>
        
            <div class="drop_caixa" id="sobedesce_midia" style="display: none">            
                <% 
                if (Model.recursoMidia.idTipoMidia > 0)
                {
                    %>
                    <input class="sombra_form sizeble formP ph" disabled="disabled" name="strUrl" id="strUrl" type="text" placeholder="Insira a URL" value="<%=Model.recursoMidia.strLinkMidia%>" />
                    <a class="ne-salvar awesome" href="javascript:void(0)" onclick="alteraPreviewMidia()">Alterar</a>
                    <%
                }
                else
                {
                %>
                    <input class="sombra_form sizeble formP ph" name="strUrl" id="strUrl" type="text" placeholder="Insira a URL" value="<%=Model.recursoMidia.strLinkMidia%>" />
                    <a class="ne-salvar awesome awesome-green" href="javascript:void(0)" onclick="montaPreviewMidia()">Inserir</a>
                <%
                }  
                %>            
                <div class="midiaEtapa_educador">
                    <%
                        string embed = "";
                        string larguraVideo = "210";
                        string alturaVideo = "158";
                        switch (Model.recursoMidia.idTipoMidia)
                        {
                            case 1: //Youtube
                                embed = "<iframe width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" src=\"http://www.youtube.com/embed/" + Model.recursoMidia.idMidia + "?autoplay=0&wmode=transparent\" frameborder=\"0\" allowfullscreen></iframe>";
                            break;                                 
                            case 2: //Vimeo
                                embed = "<iframe src=\"http://player.vimeo.com/video/" + Model.recursoMidia.idMidia + "\" width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>";
                            break;                                 
                            case 3: //Globo
                                embed = "<object width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" data=\"http://s.videos.globo.com/p2/player.swf\" type=\"application/x-shockwave-flash\"><param value=\"true\" name=\"allowFullScreen\"><param value=\"http://s.videos.globo.com/p2/player.swf\" name=\"movie\" /><param value=\"high\" name=\"quality\" /><param value=\"midiaId=" + Model.recursoMidia.idMidia + "&autoStart=false&width=" + larguraVideo + "&height=" + alturaVideo + "\" name=\"FlashVars\" /></object>";
                            break;
                        }
                        Response.Write(embed);
                    %>
                </div>
            </div>
        </div>

        <%
        string strCheckedEntrega = "";
        string strDisabledEntrega = "disabled='disabled'";      
        if (Model.recursoEntrega.id > 0)
	    {
            strCheckedEntrega = "checked";
            strDisabledEntrega = "";
        }    
        %>

        <div class="add_more">
            <div class="am_titulos" id="toggle_entrega"><span class="up_down">&#9660;</span>Entrega de trabalho <span class="discreto">Solicite aos alunos o envio de um arquivo.</span></div>
        
            <div class="drop_caixa" id="sobedesce_entrega" style="display: none">
                <p>
                    <strong>
                        <input name="im_entrega" type="checkbox" value="" class="solto" id="im_entrega" <%=strCheckedEntrega%>>  <label for="im_entrega">Habilitar entrega de trabalho</label>
                    </strong>
                </p>
                Observações:
                <textarea name="obsEntrega" id="obsEntrega" <%=strDisabledEntrega%> class="ph" placeholder="Escreva aqui uma orientação para os alunos"><%=Model.recursoEntrega.strObservacao%></textarea>
            </div>
        </div>

        <div class="add_more">
            <div class="am_titulos" id="toggle_link"><span class="up_down">&#9660;</span> Adicionar Links <span class="discreto">Indique links para os alunos</span></div>
        
            <div class="drop_caixa clearfix" id="sobedesce_link" style="display: none">
            
                <div class="insert_link" id="anc_linkApoio">
                    <p><label for="in_link">Nome</label></p>
                    <input class="sombra_form formP ph" type="text" id="strTituloLink" placeholder="Por exemplo: Visite este Conteúdo Multimídia">                    
                    <p> <label for="in_url">Endereço (URL)</label></p>
                    <input class="sombra_form sizeble formP ph" type="text" id="strLinkApoio" placeholder="Insira a URL">
                    <a href="javascript:void(0);" onclick="inserirLinkApoio();" class="ne-salvar medium awesome awesome-green">Inserir</a>
                </div>
            
                <div class="container_inlinks">                
                
                </div>
            </div>
        </div>

        <%
            
            if ((Convert.ToInt32(ViewData["intTipoPortal"]) == 4 || Convert.ToInt32(ViewData["intTipoPortal"]) == 8 || Convert.ToInt32(ViewData["intTipoPortal"]) == 16) && !((bool) ViewData["bolAVAPuro"]))
            {
                %>
                <div class="add_more">
                    <div class="am_titulos" id="toggle_codigoLivro"><span class="up_down">&#9660;</span>Código do Livro <span class="discreto">Insira conteudos SPE com código @</span></div>
                    <div class="drop_caixa clearfix sobedesce_codigoLivro" style="display: none">
            
                        <div class="insert_link" id="anc_codigoLivro">
                            <p><a href="javascript:void(0);" onclick="abreCodigo();" class="bt_normal">Inserir Codigo Livro</a></p>
                        </div>
                        <div id="container_empilhaextras">
                            <div id="codigos_didatico">
                                <%
                                    if (Model.lCodigoDidatico != null)
                                    {
                                        if (Model.lCodigoDidatico.Count > 0)
                                        {
                                            %>
                                            <h5>Códigos do material didático</h5>
                                            <%
                                            for (int i = 0; i < Model.lCodigoDidatico.Count; i++)
                                            {                                                    
                                                %>
                                                <div class="atividades_insert bgcolor1" id="<%=Model.lCodigoDidatico[i].idCodigo %>">
                                                    <span class="fecha_X" onclick="excluirCodigo(<%=Model.lCodigoDidatico[i].idCodigo %>, <%=Model.lCodigoDidatico[i].idRecursoEtapa %>, <%=Model.lCodigoDidatico[i].idApostilaEdicao %>)"></span>
                                                    <%=Model.lCodigoDidatico[i].strCodigo %><a href="<%=Model.lCodigoDidatico[i].strURL%>" class="bt_normal" target="_blank"><%=Model.lCodigoDidatico[i].strTituloCodigo %> <span class="c-novapagina"></span> </a>
                                                </div>
                                                <%
                                            }
                                        }
                                    }
                                %>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <%
            }
        %>
        
        <%
    }   
    %>
 </form>         
<div class="nav_etapas" id="nav_etapas">
    
</div>
