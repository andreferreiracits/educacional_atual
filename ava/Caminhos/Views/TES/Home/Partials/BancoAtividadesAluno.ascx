<%@ Control Language="C#" Debug="true" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.CaminhoUsuario>>" %>

<%
int intColSpan = 5;
bool bolAdm = Convert.ToBoolean(ViewData["admRedeSocial"]);
if (bolAdm)
{
    intColSpan = 6;
}
    
if (Model.Count > 0)
{
    foreach (var atividade in Model)
    {
        int tipoAtividade = atividade.Caminho.intTipo; //1=caminho, 2=tarefa
        string nomeAtividade = atividade.Caminho.titulo;
        string nomeDono = atividade.Caminho.nomeUsuario;
        //string descricaoAtividade = atividade.Caminho.descricao;
        string descricaoAtividade = RedeSocialAVA.FuncoesTexto.BREntitiesToBR(atividade.Caminho.descricao);
        
        string diaInicioAgendamento = atividade.dtmInicio.Day.ToString().PadLeft(2, '0');
        string mesInicioAgendamento = atividade.dtmInicio.Month.ToString().PadLeft(2, '0');
        string anoInicioAgendamento = atividade.dtmInicio.Year.ToString().PadLeft(2, '0');

        string dtmInicioAgdm = atividade.dtmInicio.ToString("dd/MM - HH:mm");
        string dtmFimAgdm = atividade.dtmFim.ToString("dd/MM - HH:mm");
                            
        string diaFimAgendamento = atividade.dtmFimAgendamento.Day.ToString().PadLeft(2, '0');
        string mesFimAgendamento = atividade.dtmFimAgendamento.Month.ToString().PadLeft(2, '0');
        string anoFimAgendamento = atividade.dtmFimAgendamento.Year.ToString().PadLeft(2, '0');

        double notaMaximaAtividade = 0.0;
        int numEtapasExistentes = 0;
        int numEtapasFeitas = 0;
        bool atividadeValeNota = false;

        foreach (var etapa in atividade.Caminho.lEtapa)
        {
            notaMaximaAtividade += etapa.intValor;
            numEtapasExistentes ++;
            if (notaMaximaAtividade > 0)
            {
                atividadeValeNota = true;
            }
        }

        foreach (var etapaFeita in atividade.lCaminhoEtapaUsuario)
        {
            if (etapaFeita.bolConcluido)
	        {
                numEtapasFeitas++;
	        }      
        }

        string strClassVisible = "table_andamento";
            
        if (atividade.intSituacao != 1)
	    {
		    strClassVisible = "";
	    }
        
        
        %>
        <tr id="linha_atividade_<%=atividade.idCaminhoAgendamento%>" class="<%=strClassVisible%>">
            <%if (bolAdm)
              {
                  var nomeAluno = atividade.usuario.strNome;
                  var strFoto = atividade.usuario.strFoto;
            %>
            <td width="15% class="td_titulo nome_titulo mgle20 center">
                <%=nomeAluno %>
            </td>
            <%} %>
            <td width="40%" class="td_titulo mgle20">
                <%
                if (tipoAtividade == 1)
                {   
                    %>
                    <div style="cursor: pointer" class="btnVerDetalhes" idAtiv="<%=atividade.id%>">
                        <span class="ehcaminho_aluno tooltip_title" title="caminho"></span><a href="javascript:void(0)"><span id="Span1">&#9660;</span> <%=nomeAtividade%></a>
                    </div>
                    
                    <span class="e-actions">
                        <% 
                        if (atividade.dtmFimAgendamento > DateTime.Now && !bolAdm)
                        {   
                            %>
                                <a href="javascript:void(0)" class="bt_normal green" onclick="fazerCaminhoTarefa(<%=atividade.idCaminhoAgendamento%>)">iniciar caminho</a>
                            <%
                        }
                        else
                        {
                            if (!bolAdm)
                            {
                            %>
                                <a href="javascript:void(0)" class="bt_normal green" onclick="fazerCaminhoTarefa(<%=atividade.idCaminhoAgendamento%>)">visualizar</a>
                            <% 
                            }
                        }
                        %>
                        <a href="javascript:void(0)" class="bt_normal btnVerDetalhes" id="btDetalhe_<%=atividade.id%>" idAtiv="<%=atividade.id%>">ver detalhes</a>
                    </span>
                    <%
                }
                else
                {
                    %>
                    <div style="cursor: pointer" class="btnVerDetalhes" idAtiv="<%=atividade.id%>">
                        <span class="ehtarefa_aluno tooltip_title" title="tarefa"></span><a href="javascript:void(0)" class="btnVerDetalhes" idativ="<%=atividade.id%>"><span id="seta_<%=atividade.id%>">&#9660;</span> <%=nomeAtividade%></a>
                    </div>
                    
                    <span class="e-actions">
                        <% 
                            if (atividade.dtmFimAgendamento > DateTime.Now && !bolAdm)
                        {   
                            %>
                                <a href="javascript:void(0)" class="bt_normal green" onclick="fazerCaminhoTarefa(<%=atividade.idCaminhoAgendamento%>)">fazer tarefa</a>
                            <%
                        }
                        else
                        {
                            if (!bolAdm)
                            {
                            %>
                                <a href="javascript:void(0)" class="bt_normal green" onclick="fazerCaminhoTarefa(<%=atividade.idCaminhoAgendamento%>)">visualizar</a>
                            <%
                            }
                        }
                        %> 
                        <a href="javascript:void(0)" class="bt_normal btnVerDetalhes" id="btDetalhe_<%=atividade.id%>" idAtiv="<%=atividade.id%>">ver detalhes</a>
                    </span>
                    <% 
                }
                %>
                                                           
            </td>
            <td width="15%"><%=nomeDono%></td>
            <% 
            if (atividade.intSituacao == 2)
            {
                %>
                <td class="td_status td_status_embreve center" width="15%"><span>Em breve</span></td>    
                <%
            }
            else if (atividade.intSituacao == 3)
            {
                %>
                <td class="td_status td_status_encerrado center" width="15%"><span>Encerrado</span></td>    
                <%
            }
            else if (atividade.intSituacao == 4)
            {
                %>
                <td class="td_status td_status_correcao center" width="15%"><span>Resultados</span></td>    
                <%
            }
            else
            {
                %>
                <td class="td_status td_status_emandamento center" width="15%"><span>Andamento</span></td>    
                <%
            }
            %>
                                      
            <td width="15%" class="center td_data">
                de <%=dtmInicioAgdm%>
                <br />
                até <%=dtmFimAgdm%>
            </td>      
        </tr>

        <% 
        if (tipoAtividade == 1)
        {
            %>
            <!--VAIPRABAIXO CAMINHO-->
            <tr class="table_aberta" id="linhaprabaixo_<%=atividade.id%>" style="display:none;">
                <td colspan="<%=intColSpan %>" valign="top" width="70%">
                    <div id="vaiprabaixo_<%=atividade.id%>" style="display:none;">                    
                        

                        <%
                        if (atividade.Caminho.lEtapa.Count > 0)
                        {
                            %>
                            <div class="ta_etapas cam_table">
                                                
                                <div class="infos_lebox">                        
                                    <strong>Descrição do caminho</strong>
                                    <p>
                                        <% 
                                        if (descricaoAtividade == null || descricaoAtividade.Length <= 0)
                                        {
                                            Response.Write("Nenhuma descrição cadastrada para este caminho.");
                                        }
                                        else
                                        {
                                            Response.Write(descricaoAtividade);    
                                        }                                                        
                                        %>
                                    </p>
                                    <!---<a href="#" class="bt_normal">Veja mais</a> -->                       
                                </div>

                                <p><h4>Tarefas deste caminho:</h4></p>
                        
                                <div class="leg_notas leg_top">
                     	            <span class="first">nota máx.</span>
                     	            <span class="last">notas</span>
                                </div>

                                <div id="container_etapas" class="container_etapas_G">                            
                                                                                                
                                    <ul class="etapa_numeros">
                                    <% 
                                    for (int i = 0; i < atividade.Caminho.lEtapa.Count; i++)
                                    {
                                        %>
                                        <li><h3><%=i + 1%></h3></li>    
                                        <%     
                                    }
                                    %>                                                                    
                                    </ul>
                                    
                                    <ul class="arrastaveis clearfix">
                                        <% 
                                        int qualEtapa = 0;
                                        foreach (var etapa in atividade.Caminho.lEtapa)
                                        {
                                            %>
                                            <li class="e-a-box" intOrdem="<%=etapa.intEtapa%>">
                                                                
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_etapas">
                                                    <tr>
                                                        <td width="80%" class="e-titulo"><h6><%=etapa.strEtapa%></h6>
                                                            <span class="">
                                                                <%if (!bolAdm)
                                                                  { %>
                                                                <a class="bt_normal" href="/ava/caminhos/home/player/<%=atividade.idCaminhoAgendamento%>/<%=etapa.id%>">fazer tarefa</a>
                                                                <%} %>
                                                                <a href="javascript:void(0);" class="bt_normal" onclick="verOrientacoes(<%=etapa.id%>);">ver detalhes</a>
                                                                <a href="/ava/caminhos/home/VerOrientacoesEtapa/?idEtapa_intSituacao=<%=etapa.id%>_<%=atividade.intSituacao%>" id="btVer_<%=etapa.id%>"></a>
                                                            </span>
                                                        </td>
                                                        <td width="10%" class="e-notas">
                                                            <% 
                                                            if (atividadeValeNota)
                                                            {
                                                                %>
                                                                <span class="grade">
                                                                    <%
                                                                    if (etapa.intValor > 0)
                                                                    {
                                                                        Response.Write(etapa.intValor);
                                                                    }
                                                                    else
                                                                    {
                                                                        Response.Write("---");   
                                                                    }
                                                                    %>
                                                                </span>
                                                                <%     
                                                            }
                                                            else
                                                            {
                                                                %>
                                                                <span class="grade" title="Não vale nota">---</span>
                                                                <%    
                                                            }
                                                            %>                                                        
                                                        </td>
                                                        <td width="10%" class="e-notas">
                                                            <% 
                                                            if (atividadeValeNota)
                                                            {
                                                               %>
                                                               <span class="grade">
                                                                    <%
                                                                        if (etapa.intValor > 0)
                                                                        {
                                                                            if (atividade.bolConcluido && atividade.dtmFimAgendamento > DateTime.Now && atividadeValeNota) { 
	                                                                            Response.Write("-");
                                                                            }
                                                                            else if (atividade.bolConcluido && atividade.intSituacao.Equals(3) && atividadeValeNota)
                                                                            {
	                                                                            Response.Write("-");
                                                                            }else if (atividadeValeNota)
                                                                            {
	                                                                            Response.Write(atividade.lCaminhoEtapaUsuario[qualEtapa].nota);
                                                                            }
                                                                            //Response.Write(atividade.lCaminhoEtapaUsuario[qualEtapa].nota);
                                                                        }
                                                                        else
                                                                        {
                                                                            Response.Write("-");   
                                                                        }
                                                                    %>                                                            
                                                               </span> 
                                                               <%     
                                                            }
                                                            else
                                                            {
                                                                %>
                                                                <span class="grade" title="Não vale nota">-</span>
                                                                <%    
                                                            }
                                                            %>                                                                                       
                                                        </td>
                                                    </tr>
                                                </table>                   
                                            </li> 
                                            <%
                                            qualEtapa++;
                                        }
                                        %>
                                    </ul>                                                
                                </div><!--container_etapas_G-->
                                                
                            </div>
                        </div><!--vaiprabaixo-->
                    <% 
                    }
                    else
                    {
                        Response.Write("<span>Nenhuma etapa criada para este caminho.</span>");    
                    }    
                    %>                        
                </td>
            </tr>                            
            <%
        }
        else //tarefa = 2
        {
            %>
            <tr class="table_aberta" id="linhaprabaixo_<%=atividade.id%>" style="display:none;">
                <td colspan="<%=intColSpan %>">
                    <div id="vaiprabaixo_<%=atividade.id%>" style="display:none;">
                    
                        <% 
                        if (atividade.Caminho.lEtapa.Count > 0)
                        {
                        %>    
                            <div class="ta_desc">
                                <%
                                if (atividade.dtmInicio <= DateTime.Now) //só mostra se já começou a atividade
                                {
                                    if (atividadeValeNota)
                                    {
                                        if (atividade.bolConcluido)
                                        {
                                            %>
                                            <p><strong><h2>Nota da tarefa: <%=atividade.nota%> de <%=notaMaximaAtividade%></h2></strong></p>
                                            <% 
                                        }
                                        else
                                        {
                                            %>
                                            
                                            <p><strong><h2>Resultado: Aguarde</h2></strong></p>
                                            <%
                                              
                                        }
                                        
                                    }

                                    if (atividade.bolConcluido)
                                    {
                                        %>
                                        <p><strong><h2><i class="_fiz"></i> Tarefa concluída</h2></strong></p>
                                        <% 
                                    }
                                    else
                                    {
                                        %>
                                        <hr>
                                        <p><strong><h2><i class="_naofiz"></i> Tarefa não concluída</h2></strong></p>
                                        <hr> 
                                        <%     
                                    }
                                }
                                %>                        
                                <div class="infos_entrega bgcolor1 bordercolor3 ava_requer">
                                    <strong>ESTA TAREFA REQUER:</strong>
                                    <%
                                    if (atividade.Caminho.lEtapa[0].recursoEntrega.id > 0)
                                    {
                                            %>
                                            <p><i class="ep_status arq_enviado_on"></i>Enviar um arquivo</p>    
                                            <%        
                                    }

                                    if (atividade.Caminho.lEtapa[0].recursoItem.idRecurso == 1)
                                    {
                                            %>
                                            <p><i class="ep_status ativ_off"></i>Fazer uma avaliação</p>   
                                            <%        
                                    }
                                    %>
                                    <p><i class="ep_status ep_lida_on"></i>Visualizar conteúdo</p>    
                            
                                </div>

                                <hr>
                        
                                    <% 
                                    if (atividade.Caminho.lTag.Count > 0 )
                                    {  %>
                                        <div class="ava_tags_box_clean clearfix">
                                            <strong>Tags:</strong>
                                            <% 
                                            if (atividade.Caminho.lTag.Count > 0)
                                            {
                                             %>
                                                <ul class="ava_tags">
                                                <% 
                                                foreach (var tag in atividade.Caminho.lTag)
                                                {
                                                %>
                                                    <li><%=tag.strTag%></li>    
                                                <%        
                                                }
                                                %>
                                                </ul>
                                            <%
                                            }
                                            else
                                            {
                                                Response.Write("<span class='left'>Não foi adicionado tag para esta tarefa.</span>");
                                            }
                                            %>  
                                        </div>
                                <%  } %>
                            </div><!--ta_desc-->
                                        
                            <div class="ta_etapas tar_table">
                                            
                                <div class="infos_lebox ">
                                    <h5>Descrição da tarefa</h5>
                                    <p>
                                    <% 
                                    if (descricaoAtividade == null || descricaoAtividade.ToString().Length <= 0)
                                    {
                                        Response.Write("Nenhuma descrição cadastrada para esta tarefa.");
                                    }
                                    else
                                    {
                                        Response.Write(descricaoAtividade);
                                    }                                                 
                                    %>
                                    </p>
                                    <!--<a href="#" class="bt_normal">Veja mais</a>-->
                                </div> 
 
                                <p><h5>ESTA TAREFA CONTÉM:</h5></p>
                                            
                                <div class="infos_lebox mapoio">
                            
                                    <%                                    
                                    if (atividade.Caminho.lEtapa[0].recursoItem.idRecurso != 11)
                                    {

                                        if (atividade.intSituacao == 3 || atividade.intSituacao == 4 && atividade.Caminho.lEtapa[0].recursoItem.idRecurso > 1) //se o resultado estiver disponivel ou estiver encerrado mostra link no recurso
                                        {

                                            string s_rel = "";
                                            int intOrdemAgendamento = 0;
                                            int idAvaliacao = 0;
                                            string dominio = "";
                                            dominio = Request.Url.Host;
                                            string link = "";
                                            int idRotaAgendamento = 0;

                                            switch (atividade.Caminho.lEtapa[0].recursoItem.idRecurso)
                                            {
                                                case 1:
                                                    //Avaliações
                                                    intOrdemAgendamento = atividade.Caminho.lEtapa[0].recursoItem.intOrdemAgendamento;
                                                    idAvaliacao = atividade.Caminho.lEtapa[0].recursoItem.idAvaliacao;
                                                    //s_rel = "http://" + dominio + "/avaliacoesonline/fazer_avaliacao.asp?inicio=1&idAvaliacao=" + idAvaliacao + "&intAgend=" + intOrdemAgendamento;
                                                    s_rel = "javascript:void(0);";
                                                    break;
                                                case 3:
                                                    //Interpretando            
                                                    link = atividade.Caminho.lEtapa[0].recursoItem.strLink;
                                                    if (link.IndexOf("?") == -1)
                                                    {
                                                        link = link + "?";
                                                    }
                                                    s_rel = link + "&rota=" + idRotaAgendamento + "&idEtapa=" + atividade.Caminho.lEtapa[0].id;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                                case 5:
                                                    //Museu Virtual           
                                                    s_rel = "http://" + dominio + atividade.Caminho.lEtapa[0].recursoItem.strLink;
                                                    s_rel = s_rel.Replace("pesquisa.asp", "pesquisaAVA.asp");
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                                case 6:
                                                    //Linha do Tempo            
                                                    link = "/linhadotempo/linha.asp?id=" + atividade.Caminho.lEtapa[0].recursoItem.idPublicacao; //idPublicacao
                                                    s_rel = link + "&rota=" + idRotaAgendamento;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                                case 8:
                                                    //Fóruns            
                                                    link = "/foruns/proposta.asp?id=" + atividade.Caminho.lEtapa[0].recursoItem.idPublicacao;
                                                    s_rel = link + "&rota=" + idRotaAgendamento + "&idEtapa=" + atividade.Caminho.lEtapa[0].id;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                                case 9:
                                                    //Obras Literárias
                                                    link = atividade.Caminho.lEtapa[0].recursoItem.strLink;
                                                    if (link.IndexOf("?") == -1)
                                                    {
                                                        link = link + "?";
                                                    }
                                                    s_rel = link + "&rota=" + idRotaAgendamento;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                                default:
                                                    s_rel = atividade.Caminho.lEtapa[0].recursoItem.strLink;
                                                    idAvaliacao = 0;
                                                    intOrdemAgendamento = 0;
                                                    break;
                                            }

                                            if (atividade.Caminho.lEtapa[0].recursoItem.idRecurso == 7 || atividade.Caminho.lEtapa[0].recursoItem.idRecurso == 4)
                                            {
                                                s_rel = "/" + s_rel;
                                            }
                                            
                                            %>
                                            <a href="<%=s_rel%>" target="_blank">   
                                                
                                                <img width="55" height="55" src="<%=atividade.Caminho.lEtapa[0].recursoItem.strThumbRecurso %>">
                                                <span>
                                                    <strong><%=atividade.Caminho.lEtapa[0].recursoItem.strTitulo%></strong>
                                                    <% 
                                                        string strDescricaoRecurso = "";
                                                        if (atividade.Caminho.lEtapa[0].recursoItem.strDescricao == null)
                                                        {
                                                            strDescricaoRecurso = "";
                                                        }
                                                        else if (atividade.Caminho.lEtapa[0].recursoItem.strDescricao.Length > 200)
                                                        {
                                                            strDescricaoRecurso = atividade.Caminho.lEtapa[0].recursoItem.strDescricao.Substring(0, 200) + "...";
                                                        }
                                                        else
                                                        {
                                                            strDescricaoRecurso = atividade.Caminho.lEtapa[0].recursoItem.strDescricao;
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
                                            <div class="r-selecionado">
                                                <h5><%=atividade.Caminho.lEtapa[0].recursoItem.strRecurso%></h5>
                                                <img width="55" height="55" src="<%=atividade.Caminho.lEtapa[0].recursoItem.strThumbRecurso%>">
                                                <span>
                                                    <strong><%=atividade.Caminho.lEtapa[0].recursoItem.strTitulo%></strong>
					                                <p><%=atividade.Caminho.lEtapa[0].recursoItem.strDescricao%></p>
                                                </span>
                                            </div>                                    
                                            <%                                            
                                        }
                                            
                                    }

                                    if (atividade.Caminho.lEtapa[0].recursoMidia.id > 0)
                                    {
                                        %>
                                        <hr>
                                        <h5><i class="midia_icon"></i> Vídeo enviado pelo professor </h5>                                
                                        <%
                                    }

                                    if (atividade.Caminho.lEtapa[0].lArquivoEtapa.Count > 0)
                                    {
                                        %>
                                        <hr>
                                        <h5><i class="mapoio_icon"></i> Material de apoio </h5>                                
                                        <%
                                    }

                                    if (atividade.Caminho.lEtapa[0].lRecursoLink.Count > 0)
                                    {
                                        %>
                                        <hr>
                                        <h5> <i class="links_icon"></i> Links enviados pelo professor</h5>                                
                                        <%         
                                    }

                                    if (atividade.Caminho.lEtapa[0].lCodigoDidatico.Count > 0)
                                    {
                                        %>
                                        <hr>
                                        <h5> <i class="codlip_icon"></i> Códigos do livro didático</h5>
                                        <%         
                                    }
                                    %>
                                </div><!--infos_lebox-->

                                <% 
                                if (atividade.lCaminhoEtapaUsuario != null && atividade.intSituacao == 4)
	                            {                                    
                                    Html.RenderAction("ListaArquivosEnviadosEtapa", new {idEtapa = atividade.Caminho.lEtapa[0].id });                                       
                                }

                                if (atividade.lCaminhoEtapaUsuario != null && atividade.intSituacao == 4)
                                {
                                    if (atividade.lCaminhoEtapaUsuario.Count > 0)
                                    {
                                        if (atividade.lCaminhoEtapaUsuario[0].strComentario.Length > 0)
                                        {
                                            %>
                                            <div class="infos_lebox ">
                                                <h5>Comentários do professor</h5>
                                                <p>
                                                    <%
                                                    Response.Write(atividade.lCaminhoEtapaUsuario[0].strComentario);	                                                                               
                                                    %>
                                                </p>
                                            </div>
                                            <%
                                        }   
                                    }                                    
                                }
                                %>
                                <hr>
                            </div><!--ta_etapas-->
                        <% 
                        } //se lEtapa.count > 0
                        %> 
                    </div><!--vaiprabaixo-->                       
                </td>
            </tr>
            <%
        }
    }
}
else
{
    %>
    <tr class="table_selected">
        <td colspan="<%=intColSpan %>">
            Nenhuma atividade encontrada.                       
        </td>
    </tr>
    <% 
}   
%> 
