<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" Debug="true" %>


<%

    AdminAVA.Models.Configuracao configImagem = (AdminAVA.Models.Configuracao)ViewData["imagem"];
    AdminAVA.Models.Configuracao configVideo = (AdminAVA.Models.Configuracao)ViewData["video"];
    AdminAVA.Models.Configuracao configFile = (AdminAVA.Models.Configuracao)ViewData["arquivos"];

    bool bolAlunoPodeTrocarFoto = (ViewData["bolAlunoPodeTrocarFoto"] == null ? false : (bool)ViewData["bolAlunoPodeTrocarFoto"]);
    
    bool bolImgChecado = false;
    bool bolAdmImg = false;
    bool bolCoordImg = false;
    bool bolProfImg = false;
    bool bolVidChecado = false;
    bool bolAdmVid = false;
    bool bolCoordVid = false;
    bool bolProfVid = false;
    bool bolFileChecado = false;
    bool bolAdmFile = false;
    bool bolCoordFile = false;
    bool bolProfFile = false;
    if (configFile != null && configFile.idPapel != null && configFile.idPapel.Count > 0)
    {
        foreach (Dictionary<int, bool> papel in configFile.idPapel)
        {
            if (!bolFileChecado && papel.ContainsValue(true))
            {
                bolFileChecado = true;
                //   break;
            }
            if ((papel.ContainsKey(6800001) || papel.ContainsKey(6960011) || papel.ContainsKey(6981001)) && papel.ContainsValue(true))
            {
                bolAdmFile = true;
            }
            if ((papel.ContainsKey(3000001) || papel.ContainsKey(3010001)) && papel.ContainsValue(true))
            {
                bolProfFile = true;
            }
            if ((papel.ContainsKey(3030001) || papel.ContainsKey(4000001) || papel.ContainsKey(5040001)) && papel.ContainsValue(true))
            {
                bolCoordFile = true;
            }

        }
    }
    if (configImagem != null && configImagem.idPapel != null && configImagem.idPapel.Count > 0)
    {
        foreach(Dictionary<int, bool> papel in configImagem.idPapel){
            if (!bolImgChecado && papel.ContainsValue(true))
            {
                bolImgChecado = true;
             //   break;
            }
            if((papel.ContainsKey(6800001) || papel.ContainsKey(6960011) || papel.ContainsKey(6981001)) && papel.ContainsValue(true)){
                bolAdmImg = true;
            }
            if((papel.ContainsKey(3000001) || papel.ContainsKey(3010001)) && papel.ContainsValue(true)){
                bolProfImg = true;
            }
            if((papel.ContainsKey(3030001) || papel.ContainsKey(4000001) || papel.ContainsKey(5040001)) && papel.ContainsValue(true)){
                bolCoordImg = true;
            }
            
        }
    }
    if (configVideo != null && configVideo.idPapel != null && configVideo.idPapel.Count > 0)
    {
        foreach (Dictionary<int, bool> papel in configVideo.idPapel)
        {
            if (papel.ContainsValue(true))
            {
                bolVidChecado = true;
                //break;
            }
            if((papel.ContainsKey(6800001) || papel.ContainsKey(6960011) || papel.ContainsKey(6981001)) && papel.ContainsValue(true)){
                bolAdmVid = true;
            }
            if((papel.ContainsKey(3000001) || papel.ContainsKey(3010001)) && papel.ContainsValue(true)){
                bolProfVid = true;
            }
            if((papel.ContainsKey(3030001) || papel.ContainsKey(4000001) || papel.ContainsKey(5040001)) && papel.ContainsValue(true)){
                bolCoordVid = true;
            }
        }
    }
    
%>
 <h2>Configurações</h2>
  <p>Defina quais recursos deverão ser disponibilizados na Rede Social da sua escola e indique os perfis que poderão utilizá-los.</p>
<form method="post" action="<%=Url.Action("salvarConfiguracoes", "Home") %>" onsubmit="validarSalvarConfigMultimidia(this); return false;">
    <input type="hidden" name="tipo" value="multimidia" />
    <div class="config_admin">
        <h3>Mensagens multimídia</h3>
        <div class="onoff">
            <div class="onoffswitch inputCheckboxChecked">
                <input type="checkbox" name="imagens" class="onoffswitch-checkbox" id="ConfigImagens" <%= bolImgChecado ? "checked=\"checked\"" : "" %>>
                <label class="onoffswitch-label" for="ConfigImagens">
                    <div class="onoffswitch-inner"></div>
                    <div class="onoffswitch-switch"></div>
                </label>
            </div>
            <p>Imagens</p>
        </div> 
        <div class="opcoes_config">
            <label class="styleCheckbox <%= bolAdmImg ? "inputCheckboxChecked" : "" %>" for="ImagemAdministrador" >
                <input type="checkbox" name="ImagemAdministrador" id="ImagemAdministrador" value="1" <%= bolAdmImg ? "checked=\"checked\"" : "" %>> Administrador
            </label>
            <label class="styleCheckbox <%= bolCoordImg ? "inputCheckboxChecked" : "" %>" for="ImagemCoordenador" >
                <input type="checkbox" name="ImagemCoordenador" id="ImagemCoordenador" value="1" <%= bolCoordImg ? "checked=\"checked\"" : "" %>> Coordenador
            </label>
            <label class="styleCheckbox <%= bolProfImg ? "inputCheckboxChecked" : "" %>" for="ImagemProfessor" >
                <input type="checkbox" name="ImagemProfessor" id="ImagemProfessor" value="1" <%= bolProfImg ? "checked=\"checked\"" : "" %>> Professor
            </label>
        </div>

        <div class="onoff">
            <div class="onoffswitch inputCheckboxChecked">
                <input type="checkbox" name="videos" class="onoffswitch-checkbox" id="ConfigVideos" <%= bolVidChecado ? "checked=\"checked\"" : "" %>>
                <label class="onoffswitch-label" for="ConfigVideos">
                    <div class="onoffswitch-inner"></div>
                    <div class="onoffswitch-switch"></div>
                </label>
            </div>
            <p>Vídeos</p>
        </div> 
        <div class="opcoes_config">
            <label class="styleCheckbox <%= bolAdmVid ? "inputCheckboxChecked" : "" %>" for="VideoAdministrador" >
                <input type="checkbox" name="VideoAdministrador" id="VideoAdministrador" <%= bolAdmVid ? "checked=\"checked\"" : "" %>> Administrador
            </label>
            <label class="styleCheckbox <%= bolCoordVid ? "inputCheckboxChecked" : "" %>" for="VideoCoordenador" >
                <input type="checkbox" name="VideoCoordenador" id="VideoCoordenador" <%= bolCoordVid ? "checked=\"checked\"" : "" %>> Coordenador
            </label>
            <label class="styleCheckbox <%= bolProfVid ? "inputCheckboxChecked" : "" %>" for="VideoProfessor" >
                <input type="checkbox" name="VideoProfessor" id="VideoProfessor" <%= bolProfVid ? "checked=\"checked\"" : "" %>> Professor
            </label>
        </div>
        <div class="onoff">
            <div class="onoffswitch inputCheckboxChecked">
                <input type="checkbox" name="arquivos" class="onoffswitch-checkbox" id="ConfigFiles" <%= bolFileChecado ? "checked=\"checked\"" : "" %>>
                <label class="onoffswitch-label" for="ConfigFiles">
                    <div class="onoffswitch-inner"></div>
                    <div class="onoffswitch-switch"></div>
                </label>
            </div>
            <p>Arquivos</p>
        </div> 
        <div class="opcoes_config">
            <label class="styleCheckbox <%= bolAdmFile ? "inputCheckboxChecked" : "" %>" for="FileAdministrador" >
                <input type="checkbox" name="FileAdministrador" id="FileAdministrador" <%= bolAdmFile ? "checked=\"checked\"" : "" %>> Administrador
            </label>
            <label class="styleCheckbox <%= bolCoordFile ? "inputCheckboxChecked" : "" %>" for="FileCoordenador" >
                <input type="checkbox" name="FileCoordenador" id="FileCoordenador" <%= bolCoordFile ? "checked=\"checked\"" : "" %>> Coordenador
            </label>
            <label class="styleCheckbox <%= bolProfFile ? "inputCheckboxChecked" : "" %>" for="FileProfessor" >
                <input type="checkbox" name="FileProfessor" id="FileProfessor" <%= bolProfFile ? "checked=\"checked\"" : "" %>> Professor
            </label>
        </div>
        <input type="submit" value="Salvar" class="btn_cor left">
        <div class="clearfix"></div>
    </div>
    
</form>

<!-- COMEÇAM ALTERAÇÕES BLOQUEIO -->
    <% 
        
    // lista das unidades
    IList<UsuarioAVA.Models.Unidade> lUnidade = null;
    if (ViewData["lUnidades"] != null)
    {
        lUnidade = (List<UsuarioAVA.Models.Unidade>)ViewData["lUnidades"];
    }
    // lista dos segmentos
    IList<AdminAVA.Models.Segmentacao> lSegmentacao = null;
    if (ViewData["lSegmentacao"] != null)
    {
        lSegmentacao = (List<AdminAVA.Models.Segmentacao>)ViewData["lSegmentacao"];//lSegmentacao
    }
    IList<AdminAVA.Models.Bloqueios> lBloqueio = null;
    if (ViewData["lBloqueio"] != null)
    {
        lBloqueio = (List<AdminAVA.Models.Bloqueios>)ViewData["lBloqueio"];//lBloqueio
    }      
    
    %>

    
<div id="area_bloqueio_ferias">
    <form method="post" action="<%=Url.Action("salvarBloqueioDeFerias", "Home") %>" onsubmit="validarsalvarBloqueioDeFerias(this); return false;"">    
        <input type="hidden" id="idAVASegmentacaoBloqueioEditar" value="" />

        <div class="config_admin">
            <h3>Bloqueio de férias</h3>
            <p>Utilize este recurso para silenciar a comunicação dos alunos na rede social da sua escola durante as férias.</p>
   
            <div class="opcoes_config_botaoCriar">
                <input class="btn_cor" type="button" value="Criar bloqueio" />
            </div>

            <div class="mensagem_erro_bloqueio" style="display: none;">
		        <span class="btn_fechar_mensagem"><a href=""><i class="fontello icoCancel"></i></a></span>    
    	        <p>Já existe um bloqueio para o nível de ensino selecionado.</p>
            </div><!--.mensagem_erro_bloqueio-->  
    
    	<%
        if (lUnidade != null)
        { 
            %>
            <div class="opcoes_config_bloqueio" style="display: none;">
    	        <p>Unidade:</p>
                <select id="unidadesBloqueio">
			        <% 
                    string strUnidades = "";
                    int cont = 0;
                    foreach (var unidade in lUnidade)
			        {
                        if (cont == lUnidade.Count - 1)
                        {                            
                            strUnidades += unidade.id;
                        }
                        else
                        {
                            strUnidades += unidade.id + ",";
                        }
                        cont++;
			        }
                    %>   

			        <option id="selBloqueio_0" value="<%=strUnidades%>">Todas</option>                        
			        <%
			        foreach (var unidade in lUnidade)
			        {
				        %>
				        <option id="selBloqueio_<%=unidade.id%>" value="<%=unidade.id%>"><%=unidade.strUnidade%></option>
				        <%
			        }
			        %>
                </select>         
            </div><!--.opcoes_config_bloqueio-->
	        <% 
        } 
        %>
    
        <div class="opcoes_config_bloqueio" style="display: none;">
    	    <p>Segmentos:
			    <span class="tooltipBloqueio"><i class="fontello icoInfo"></i><span>Referem-se aos grupos de séries e de 
			    anos cadastrados para a rede social da sua escola. Caso queira alterá-los, entre em contato 
			    com o Educacional.</span></span>            
            </p>
        
            <ul id="lista_segmento">

			    <%  
                //int incLabel = 0;
                int seriesCount;
                foreach (var segmentos in lSegmentacao)
                {
                    //incLabel++;
                    try
                    {
                        seriesCount = segmentos.series.Count();
                    }
                    catch
                    {
                        seriesCount = 0;
                    }

                    if (seriesCount > 0)
                    {
                %>
        	            <li>
                            <label class="styleCheckbox " for="chkSerie_<%=segmentos.idAVASegmentacao %>">
                                <input type="checkbox" id="chkSerie_<%=segmentos.idAVASegmentacao %>"  name="chkSerie_<%=segmentos.idAVASegmentacao %>" value="<%=segmentos.idAVASegmentacao%>" />
                                <%=segmentos.strSegmentacao%><!--strSegmentacao -->
                            </label>
                            <div class="info_segmento">
					            <div class="box_segmento_seta"></div>
                                <div class="box_segmento">
			                        <% 
                                    for (int i = 0; i < seriesCount; i++)
                                    {                                        
				                        %>
				                        <p><%=segmentos.series[i].strSerie%></p> <!--strSerie-->
				                        <% 
                                    }
			                        %>
                                </div><!--.box_segmento-->                
                            </div><!--.info_segmento-->
        	            </li>        
			    <%
                    }
                } 
                %>
            </ul>
        </div><!--.opcoes_config_bloqueio-->   
    
        <div class="opcoes_config_bloqueio" style="display: none;">
            <% 
            string dia = DateTime.Now.Day.ToString().PadLeft(2,'0');
            string mes = DateTime.Now.Month.ToString().PadLeft(2,'0');
            int ano = DateTime.Now.Year;

            DateTime diaFimAux = DateTime.Now.AddDays(7);

            string diaFim = diaFimAux.Day.ToString().PadLeft(2, '0');
            string mesFim = diaFimAux.Month.ToString().PadLeft(2, '0');
            string anoFim = diaFimAux.Year.ToString().PadLeft(2, '0');
    
            //string horaInicio = (DateTime.Now.Hour + 1).ToString().PadLeft(2, '0') + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0');
            //string horaFim = DateTime.Now.Hour.ToString().PadLeft(2, '0') + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0');
            %>
          
            <p>Período</p>
            <input type="text" size="8" id="dataInicio" name="dataInicio" value="<%=dia%>/<%=mes%>/<%=ano%>" class="" placeHolder="<%=dia%>/<%=mes%>/<%=ano%>"/>
            até
            <input type="text" size="8" id="dataFim" name="dataFim" value="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>" class="" placeHolder="<%=diaFim%>/<%=mesFim%>/<%=anoFim%>"/>
            <input type="hidden" id="dtmAtualServidor" value="<%=DateTime.Now.ToString("dd/MM/yyyy")%>" /> <!-- =DateTime.Now.ToString("dd/MM/yyyy hh:mm") -->

        </div><!--.opcoes_config_bloqueio--> 
        
        <div class="opcoes_config_botoes" style="display: none;">
            <input class="btn_cor" type="submit" value="Salvar bloqueio" id="opcoes_config_btnCriar"/>
            <input class="btn_cinza" type="reset" value="Cancelar"  id="opcoes_config_btnCancelar"/>
        </div>    
    
        <div class="mensagem_confirmacao_bloqueio" style="display: none;">
		    <!--<span class="btn_fechar_mensagem"><a href="javascript: void(0);" class="btn_OcultarMensagemConfirmacaoBloqueio"><i class="fontello icoCancel"></i></a></span>    
    	    <p>O bloqueio foi salvo com sucesso! Este aviso aparecerá para seus alunos durante o bloqueio:</p>
            <p class="texto_bloqueio">"Férias! Aproveite para descansar. Quando as aulas retomarem, após ####, 
            você poderá voltar a se comunicar pelo portal."</p>-->
        </div><!--.mensagem_confirmacao_bloqueio-->
        <div class="opcoes_config_bloqueados_novo"><!-- class usado no salvar bloqueio, para mostrar o novo registro junto com a Mensagem --></div>
        <div class="opcoes_config_bloqueados">  
    		<%
            if (lBloqueio != null)
            { 
                %>
                <table class="tb_avisos" cellspacing="0" cellpadding="0" width="100%" border="0" id="tab_bloqueio_ferias">
                    <thead>
                        <tr>
                            <% 
                            if (lUnidade != null)
                            {
                                %>
                                <td width="35%">Unidade</td>
                                <td width="35%">Segmento</td>
                                <td width="20%">Período</td>
                                <td width="10%"></td>
                                <%
                            }
                            else
                            {
                                %>
                                <td width="70%">Segmento</td>
                                <td width="20%">Período</td>
                                <td width="10%"></td>
                                <%
                            }    
                            %>                                
                        </tr>
                    </thead>
                             
                    <tbody>
                        <%
                        Html.RenderPartial("Bloqueio", lBloqueio);  
                        %>
                    </tbody>
                </table>
                <%  
            }
            %>
        </div><!--.opcoes_config_bloqueio-->     
 
       </div>  
    </form>           
</div>
<div id="area_bloqueio_ferias">    
<div class="config_admin">
    <h3>Grupos de turmas</h3>
    <p>Configure o status e os moderadores dos grupos de turmas da sua escola.</p>
    <form class="grupos_de_turma">
        <% if(lUnidade != null) { %>
        <select id="unidadesGruposDeTurma">
            <option value="0">Unidades (Todas)</option>
		    <% foreach (var unidade in lUnidade) { %>
		        <option value="<%=unidade.id%>"><%=unidade.strUnidade%></option>
		    <% } %>
        </select>
        <% } %>  
        <select disabled="disabled" id="nivelGruposDeTurma">
            <option value="0">Nível de ensino</option>
        </select>
        <select disabled="disabled" id="serieGruposDeTurma">
            <option value="0">Série/ano</option>
        </select>
        <input type="text" placeholder="Nome da turma" id="strBuscaGruposDeTurma" />
        <input type="button" value="Pesquisar" class="btn_cor" id="btnPesquisarGruposDeTurma"/>
    </form>
    <div class="acoes_massa" style="display:none;">
        <select>
            <option value="0">Ações em massa</option>
            <option value="1">Desativar</option>
            <option value="2">Ativar</option>
        </select>
        <input type="button" value="Aplicar" class="btn_branco disable"/>
    </div>
    <input type="hidden" id="intPaginacaoGruposDeTurma" value="1" />
    <input type="hidden" id="intQtdItensPaginaGruposDeTurma" value="10" />
    <table class="moderadores_turma" style="display:none;">
        <thead>
            <tr>
                <th width="60" class="align_center">
                    <label class="styleCheckbox" for="grupoTurmaCheckTopo">
                        <input type="checkbox" name="grupoTurmaCheckTopo" id="grupoTurmaCheckTopo" class="ckacao_massa" />
                    </label>
                </th>
                <th width="450" id="grupoTurmaCheckTopoAux">Nome da turma</th>
                <th width="230">Moderadores</th>
                <th width="100">Status</th>
            </tr>
        </thead>        
    </table>
</div>
     
</div><!--.area_bloqueio_ferias -->
<form method="post" action="<%=Url.Action("SalvarSeAlunoPodeTrocarFoto", "Home") %>" onsubmit="SalvarSeAlunoPodeTrocarFoto(this); return false;">
    <div class="config_admin brtadm">
        <h3>ALTERAÇÃO DE IMAGEM DE PERFIL</h3>
        <p>Defina se os alunos da sua instituição de ensino podem ou não trocar suas imagens no Perfil.</p>
        <div class="onoff mgtop0">
            <div class="onoffswitch inputCheckboxChecked">
                <input type="checkbox" name="bolAlunoPodeTrocarFoto" class="onoffswitch-checkbox" id="bolAlunoPodeTrocarFoto" <%= (bolAlunoPodeTrocarFoto) ? "checked=\"checked\"" : "" %> />
                <label class="onoffswitch-label" for="bolAlunoPodeTrocarFoto">
                    <div class="onoffswitch-inner"></div>
                    <div class="onoffswitch-switch"></div>
                </label>
            </div>
            <p>Alterar imagem de perfil</p>
        </div>
        <div class="clearfix"></div> 
        <input type="submit" value="Salvar" class="btn_cor left" />
        <div class="clearfix"></div>        
    </div>     
</form>
