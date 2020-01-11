<%@ Page Title="" Language="C#" MasterPageFile="~/Views/TES/Shared/Turma.Master"
Inherits="System.Web.Mvc.ViewPage<Turma.Models.GrupoTurmaConfiguracoes>" %>





<asp:Content ID="Title1" ContentPlaceHolderID="TitlePlaceHolder" runat="server">
<link rel="stylesheet" type="text/css" href="<%=Url.CDNLink("/Common/Scripts/pagination_2.0.0.css")%><%=Url.TimeStampLink() %>" />
<script defer src="<%=Url.CDNLink("/Common/Scripts/paginationturmaaluno_2.0.0.js") %><%=Url.TimeStampLink() %>"></script>
<script defer src="<%=Url.CDNLink("/Common/Scripts/paginationatividadesturma_2.0.0.js") %><%=Url.TimeStampLink() %>"></script>
<script type="text/javascript" src="http://stuk.github.io/jszip-utils/dist/jszip-utils.js"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/jszip_2.0.0.js") %><%=Url.TimeStampLink() %>"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/FileSaver.js") %><%=Url.TimeStampLink() %>"></script>
<!-- <script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/support.js") %><%=Url.TimeStampLink() %>"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/utils.js") %><%=Url.TimeStampLink() %>"></script>-->
<!-- <script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/base64.js") %><%=Url.TimeStampLink() %>"></script>  -->



<title> 
    <%= Master.Attributes["titleKey"] + " | " + Model.strNomeTurma + " | " + Model.intAnoTurma%>       
</title>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentArea" runat="server">
<% 
    bool bolPostUnico = ViewData["bolPostUnico"] == null ? false : (bool)ViewData["bolPostUnico"];
    int idPostUnico = ViewData["idPostUnico"] == null ? 0 : (int)ViewData["idPostUnico"];

    var bolAcessaConfiguracao = ViewData["bolAcessaConfiguracao"] == null ? false : (bool)ViewData["bolAcessaConfiguracao"];
    var bolAcessaTimeLine = ViewData["bolAcessaTimeLine"] == null ? false : (bool)ViewData["bolAcessaTimeLine"];
    var bolAcessaGaleria = ViewData["bolAcessaGaleria"] == null ? false : (bool)ViewData["bolAcessaGaleria"];

    var bolPai = ViewData["bolPai"] == null ? false : (bool)ViewData["bolPai"];

    var bolSemProfessor = Model.IdsProfessores.Count == 0;
    var bolSuspenso = ViewData["bolSuspenso"] == null ? false : (bool)ViewData["bolSuspenso"];
    var objSuspensao = bolSuspenso ? (AVASuspensaoDenuncia.Models.Suspensao)ViewData["objSuspensao"] : null;

    var bolCoordenador = ViewData["bolCoordenador"] == null ? false : (bool)ViewData["bolCoordenador"];    

    bool bolCPPuro = (bool)Session["bolCPPuro"];

%>

<input type="hidden" id="strNomeLogado" value="<%=Model.strNomeLogado%>" />
<input type="hidden" id="strLoginLogado" value="<%=Model.strLoginLogado%>" />
<input type="hidden" id="strEmailLogado" value="<%=Model.strEmailLogado%>" />
<input type="hidden" id="strURLCorrente" value="<%=HttpContext.Current.Request.Url.AbsoluteUri%>" />

<input type="hidden" id="idGrupo" value="<%=Model.IdGrupo %>" />
<input type="hidden" id="idTurma" value="<%=Model.IdTurma %>" />
<input type="hidden" id="strLinkGrupo" value="/AVA/Turma/<%=Model.strLinkPermanente %>" />
<input type="hidden" id="strLinkPermanente" value="<%=Model.strLinkPermanente %>" />
<input type="hidden" id="intAlteracoesPagina" value="0" />
<input type="hidden" id="indexPaginacao" value="1" />  
<input type="hidden" id="strNomeTurma" value="<%=Model.strNomeTurma%>" />  
<input type="hidden" id="idFerramentaTipo" value="35">
<div id="headerTurma" class="barra_topo_itens mgt_30">
    <section class="centralizaclass inf_turma">
        <div class="fotoDestaque">
            <img src="<%=Model.StrFotoGrupo %>" alt="foto da turma"/>
        </div>
        <div class="dados_daturma">
            <h1 class="titulo_turma"><% if(bolAcessaTimeLine) { %>
            <li class="left<%=bolPostUnico ? "" : " active"%>"><a class="apelido_turma" href="javascript:void(0);"><%=Model.StrApelidoGrupo%></a></li>
            <% } %>
        </h1>
        <h3 class="descricao_turma"><%=Model.StrDescricaoGrupo %></h3>

        </div>
    </section>

    <ul class="mosaico_grupo turma_mosaico">
        <% foreach (var foto in Model.ListaFotosTopo)
           { %>
        <li>
            <img height="230" src="<%=foto.strFoto%>" alt="" title="<%=foto.strApelido %>" /></li>
        <% } %>
        <div class="clearfix"></div>
    </ul>
    
    <div class="menu_topo centralizaclass">
        <ul>
            <li class="left"><a href="javascript:void(0);" class="mural_turma">MURAL DA TURMA</a></li>

            <li class="left"><a href="javascript:void(0);" class="atividade_turma">ATIVIDADES</a></li>
            
            <% if(bolAcessaGaleria) { %>
            <li class="left" style="display:none;"><a href="javascript:void(0);" class="galeria_turma">GALERIA</a></li>

            <li class="left"><a href="javascript:void(0);" class="sobre_turma">SOBRE A TURMA</a></li>

            <% } if(bolAcessaConfiguracao) { %>
            <li class="right"><a href="javascript:void(0);" class="configuracoes_turma"><span class="fontello icon_config"></span> Configurações</a>
            <% } %>
            </li>
        </ul>
    </div>
</div>
<% if(bolAcessaTimeLine) { %>  

<!-- 
<section class="hs1" id="ava_mural_geral">
    

</section> -->

<div class="centralizaclass pagina_educacional">

        <section id="ava_mural_geral" class="timeline turmasMural"><!-- section timeline -->
       

<div id="wrapper">
        <%  
            if(Model.BolGrupoDesativado) {
                %>
                <section class="banner_aviso_mural mural_desativado" id="mural_desativado">
                    <h2>Grupo de turma desativado</h2>
                    <p>A comunicação está bloqueada no grupo desta turma. Apenas moderadores e administradores da rede social conseguem visualizar esta página.</p>
                </section>
                <%
            } else if(bolSemProfessor) {
                %>
                <section class="banner_aviso_mural mural_desativado" id="mural_desativado">
                    <h2 style="padding-left: 31%;">Grupo de turma sem professor</h2>
                    <p style="padding-left: 31%;">Esta turma está com a comunicação desativada até que algum professor seja vinculado a ela. Aguarde!</p>
                </section>
                <script>
                    var alunos = document.querySelector(".conteudo_esquerda_540 alunos_turma_lista");
                    var professores = document.querySelector(".professores");
                    var atividades_botao = document.querySelector(".atividade_turma");
                    var mural_botao = document.querySelector(".mural_turma");
                    var sobreTurma = document.querySelector("#ava_sobreaturma");
                    sobreTurma.removeAttribute("style");
                    alunos.parentNode.removeChild(alunos);
                    professores.parentNode.removeChild(professores);
                    atividades_botao.parentNode.removeChild(atividades_botao);
                    mural_botao.parentNode.removeChild(mural_botao);
                </script>

                <%
            } else if (bolSuspenso) {
                DateTime dataIni = Convert.ToDateTime(objSuspensao.dtmInicioSuspensao);
                DateTime dataFim = Convert.ToDateTime(objSuspensao.dtmFimSuspensao);
                string format = "dd/MM/yyyy"; 
                %>
                <section class="dialogo clearfix"><div style="text-align:center;padding-bottom:15px">
                    <p>Você está impedido de enviar mensagens de <b><%:dataIni.ToString(format) %></b> até <b><%:dataFim.ToString(format)%></b></p>
                    <p>Motivo: 
                <%if (objSuspensao.strJustificativa == "")
                  { %>
                     Não declarado.
                <%}
                  else
                  { %>
                     <%:objSuspensao.strJustificativa%>
                <%} %>
                    </p>
                    <p>Administrador(a): <%:objSuspensao.strNomeAdmin %></p>
            
                    </div></section><%
            } else {
                Html.RenderPartial("../Home/Partials/MensagemRapida", Model, ViewData);
            }                 
        %>


            <header>
                <h1 class="roboto">MURAL</h1>  
                <input type="hidden" id="hAssuntoTimeLine" initvalue="0" value="0" />
                <div class="bootstrap right" <%=bolPostUnico ? " style=\"display:none;\" " : ""%>>
                    <div class="btn-group">                     
                        <button href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtAssuntoTimeLine"> 
                            Todos os assuntos.&nbsp;<span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" id="cbAssuntoTimeLine">
                            <li assu="0">
                                <input type="checkbox" id="ckAssuntoTimeLine0" checked="checked" />
                                <label for="ckAssuntoTimeLine0">Todos os assuntos&nbsp;</label>
                            </li>
                            <% foreach (var assu in Model.Assuntos)
                               { %>    	
                                <li assu="<%=assu.IdAssunto%>">
                                    <input type="checkbox" id="ckAssuntoTimeLine<%=assu.IdAssunto%>" />
                                    <label for="ckAssuntoTimeLine<%=assu.IdAssunto%>"><%=assu.StrAssunto%>&nbsp;</label>
                                </li>                        
                            <% } %>	                                                     
                        </ul>
                    </div>  
                </div>                        
            </header>			
            <div id="ava_fluxoarticles">
                <div id="loader_timeline" style="padding: 20px 47%;"><img border="0" alt="carregando..." src="/AVA/StaticContent/Common/img/perfil/carregando.gif" /></div>           
            </div>
            <footer class="blokletters" style="display:none;">
                <a class="" title="veja mais" href="#">veja mais</a>
            </footer>
        </section><!-- section timeline -->
        <input type="hidden" id="idPostUnico" init="<%=idPostUnico %>" value="<%=idPostUnico %>"/>
   

<aside id="ava_barralateral-direita" class="duas_colunas col_turmas"><!-- aside barra lateral -->
    <%
        if (Model.BolAluno || Model.BolProfessor || bolAcessaConfiguracao || bolPai) /*Se o usuario acesse configuracao é moderador ou adminava*/ 
        {
    %>
    <!-- <section class="boxAgendaReduzida"> -->
    <section class="boxAgendaReduzida" id="boxAgendaReduzida">

        <div class="iconeFonte" id="agenda_reduzida">
                
        </div> 
    </section>
    <section class="bcs1" style="display:none;">
       <header>
            <h1>Agenda da turma</h1>
        </header>
            
        <div id="dadosAgenda" class="clearfix">

        </div>
        </section>
    <% 
        }

       if (!bolCPPuro)
       {

           if (Model.BolAluno || Model.BolProfessor)
           { 
    %>
    <!--
    <section class="ativ_lista bcs2" id="ativ_lista_normal">
        <header>
            <h1>Atividades da turma
                <i class="fontello info tooltip_title_top" title="Atividades agendadas para os próximos sete dias."></i>
            </h1>
        </header>
    </section>
    -->
    <% 
           }

           if (bolPai)
           { 
    %>
    <!--
        <section class="ativ_lista bcs2" id="ativ_lista_pais">
            <header>
                <h1>Atividades dos filhos
                    <i class="fontello info tooltip_title_top" title="Atividades agendadas para os próximos sete dias."></i>
                </h1>
            </header>
        </section>
    -->
    <% 
           }
       } //!bolCPPuro         
    %>
    <section class="bcs2 aniversariantes_mes" style="display:none;">
        <header>
            <h1>Aniversariantes de <%=RedeSocialAVA.FuncoesTexto.getMesBR(DateTime.Now)%></h1>
        </header>
        <div>
            
        </div>
    </section>
</aside><!-- aside barra lateral -->
<% } %>
<section id="ava_sobreaturma" style="display:none;"><!-- section sobre a turma -->
    <aside class="duas_colunas right">
      <!--   <div class="desc_turma">
            <img src="<%=Model.StrFotoGrupo %>" height="180" width="180"/>
            <h2><%=Model.strNomeTurma%></h2>
            <h3><%=Model.StrApelidoGrupo %></h3>
            <div class="clearfix"></div>
            <p><%=Model.StrDescricaoGrupo %></p>
        </div> -->
        <div class="professores" style="display:none;">
            <h1>Professores</h1>
            <!-- <div class="pesquisa_professor doidao">
                <span class="fontello"></span>
                <input type="text" placeholder="Encontre um professor" id="pesquisa_professor_input" value="" />
            </div>  -->  
            <div class="clearfix"></div>




        </div>



    </aside>
    <% 
        if(Model.BolGrupoDesativado) {
            %>
            <section class="banner_aviso_mural mural_desativado" id="mural_desativado">
                <h2 style="padding-left: 31%;">Grupo de turma desativado</h2>
                <p style="padding-left: 31%;">A comunicação está bloqueada no grupo desta turma. Apenas moderadores e administradores da rede social conseguem visualizar esta página.</p>
            </section>
            <%
        } else if(bolSemProfessor) {
            %>
            <section class="banner_aviso_mural mural_desativado" id="mural_desativado">
                <h2 style="padding-left: 31%;">Grupo de turma sem professor</h2>
                <p style="padding-left: 31%;">Esta turma está com a comunicação desativada até que algum professor seja vinculado a ela. Aguarde!</p>
            </section>
                <script>
                    var alunos = document.querySelector(".conteudo_esquerda_540 alunos_turma_lista");
                    var professores = document.querySelector(".professores");
                    var atividades_botao = document.querySelector(".atividade_turma");
                    var mural_botao = document.querySelector(".mural_turma");
                    var sobreTurma = document.querySelector("#ava_sobreaturma");
                    sobreTurma.removeAttribute("style");
                    alunos.parentNode.removeChild(alunos);
                    professores.parentNode.removeChild(professores);
                    atividades_botao.parentNode.removeChild(atividades_botao);
                    mural_botao.parentNode.removeChild(mural_botao);
                </script>

            <%
        } 
    %>
    <div class="conteudo_esquerda_540 alunos_turma_lista left">
        <h2>Alunos</h2>
        <div class="pesquisa_aluno doidao">
            <span class="fontello"></span>
            <input type="text" placeholder="Encontre um aluno" id="pesquisa_aluno_input" value="" />
        </div>    
        <!-- <div class="clearfix" ></div>  -->

    <section>
            <div class="data-container-aluno"></div>
            <div id="pagination-aluno"></div>
                                   
    </section>

    </div>        
</section><!-- section sobre a turma -->

<section class="atividade_da_turma bcs2 bloco" id="ativ_lista_normal_turma" style="display: none;" >
        <div class="bootstrap left">
            <div class="btn-group">                     
                <button href="javascript:void(0);" data-toggle="dropdown" 
                    class="btn btn-small dropdown-toggle whiteButton btnDisciplina_turmas" id="txtDisciplinaTurma">Disciplinas&nbsp;<span class="caret"></span></button>
                <ul class="dropdown-menu ulDisciplina_turmas" id="cbDisciplinaTurma"></ul>
            </div>
         </div>
    
     <!-- <aside class="duas_colunas right"> -->
        <!-- <h1>Atividades da Turma</h1> -->
         <div class="clearfix"></div>
           <section id="ativTurma">
                <div class="data-container-turma"></div>
                <div id="pagination-atividadeturma"></div>
                                   
            </section>
     <!-- </aside> -->
</section>


 <!--  <section class="ativ_lista bcs2" id="ativ_lista_normal">
        <header>
            <h1>Atividades da turma
                <i class="fontello info tooltip_title_top" title="Atividades agendadas para os próximos sete dias."></i>
            </h1>
        </header>
    </section> -->


<% if(bolAcessaGaleria) { %>
<section class="galeria_da_turma" style="display:none;"><!-- section galeria turma -->
    <!--Filtro galeria-->
    <input type="hidden" id="hPaginacaoGaleriaTurma" value="1" />
    <input type="hidden" id="hMesGaleriaTurmaFiltrado" value="0" />
    <input type="hidden" id="hAnoFiltrado" value="0" />
    <input type="hidden" id="hAssuntoGaleriaTurmaFiltrado" value="0" />
    <input type="hidden" value="0" id="hGaleriaMidiaTipo" />
    <ul class="menu_tipo_filtro roboto">
        <li midiaTipo="0" class="ativo tipo_filtro_p"><a href="javascript:void(0);">Todos</a></li>
        <li midiaTipo="1"><a href="javascript:void(0);">Imagens</a></li>
        <li midiaTipo="2"><a href="javascript:void(0);">Vídeos</a></li>
        <li midiaTipo="3" class="tipo_filtro_u"><a href="javascript:void(0);">Arquivos</a></li>
    </ul>


    <div class="right filtro_galeria">
        <div class="bootstrap seletor_mes_filtro">
            <div class="btn-group dropdown-toggle whiteButton">
                <div class="bootstrap left" id="id_materia_galeria"></div>
            </div>
        </div>

        <input type="hidden" id="hMesGaleriaTurma" initvalue="0" value="0" />
        <div class="bootstrap seletor_mes_filtro">
            <div class="btn-group">                     
                <button href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtMesGaleriaTurma"> 
                    Todos os meses&nbsp;<span class="caret"></span>
                </button>
                <ul class="dropdown-menu" id="cbMesGaleriaTurma">
                    <li mes="0">
                        <input type="checkbox" id="ckMesGaleriaTurma0" checked="checked" />
                        <label for="ckMesGaleriaTurma0">Todos os meses&nbsp;</label>
                    </li>
                    <% for (var m = 1; m <= DateTime.Now.Month; m++) { %>    	
                        <li mes="<%=m %>">
                            <input type="checkbox" id="ckMesGaleriaTurma<%=m %>" />
                            <label for="ckAssuntoTimeLine<%=m %>"><%=RedeSocialAVA.FuncoesTexto.getMesBR(new DateTime(1900,m,1))%>&nbsp;</label>
                        </li>                        
                    <% } %>	                                                     
                </ul>
            </div>  
        </div>       

        <input type="hidden" id="hAssuntoGaleriaTurma" initvalue="0" value="0" />
        <div class="bootstrap seletor_assunto_filtro">
            <div class="btn-group">                     
                <button href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtAssuntoGaleriaTurma"> 
                    Todos os assuntos&nbsp;<span class="caret"></span>
                </button>
                <ul class="dropdown-menu" id="cbAssuntoGaleriaTurma">
                    <li assu="0">
                        <input type="checkbox" id="ckAssuntoGaleriaTurma0" checked="checked" />
                        <label for="ckAssuntoGaleriaTurma0">Todos os assuntos&nbsp;</label>
                    </li>
                    <% foreach (var assu in Model.Assuntos)
                       { %>    	
                        <li assu="<%=assu.IdAssunto%>">
                            <input type="checkbox" id="ckAssuntoGaleriaTurma<%=assu.IdAssunto%>" />
                            <label for="ckAssuntoGaleriaTurma<%=assu.IdAssunto%>"><%=assu.StrAssunto%>&nbsp;</label>
                        </li>                        
                    <% } %>	                                                     
                </ul>
            </div>  
        </div>

        <a href="javascript:void(0);" class="btn_branco">Filtrar</a>
        <a href="javascript:void(0);" class="link_botao" style="display:none;">Limpar<!-- Desfazer filtro --></a>
    </div>
    <div class="selectAll">
        <button id="SelecionarTodos" type="button" name="check" onclick="SelectAll()" class="inactive" style="display:none;"> <label>Selecionar Todos</label></button>
    </div>
    <div class="clearfix"></div>
    <div id="lista_item_galeria">
        <div id="loader_galeria" style="padding: 20px 47%;"><img border="0" alt="carregando..." src="/AVA/StaticContent/Common/img/perfil/carregando.gif" /></div>
    </div>
    <div class="clearfix"></div>
</section><!-- section galeria turma -->

<% } if(bolAcessaConfiguracao) { %>
<section class="configuracoes_grupo" style="display:none;"><!-- section config turma -->
    <input type="hidden" id="srcFotoGrupo" value="<%=Model.StrFotoGrupo %>" initvalue="<%=Model.StrFotoGrupo %>" />
    <h2>Configuração do grupo</h2>
    <p>Edite a seguir as informações e configurações do grupo da sua turma.</p>
    <form id="form_configuracoesturma" name="form_configuracoesturma">
        <div class="conteudo_450 left">
            <h3>Informações sobre a turma</h3>
            <div class="trocar_foto">
                <img src="<%=Model.StrFotoGrupo %>" alt="foto da turma" width="120" height="120"/>
                <% if(!Model.BolGrupoDesativado) { %>
                    <a href="javascript:abreUploadGrupos(<%=Model.IdGrupo %>);">Trocar foto</a>

                    <div id="previewTrocaFotoTurma" class="preview_img_post preview_anx_post" style="display:none; width: 400px; height: 550px; overflow: hidden;">
                        <iframe name="Upload" id="Upload_frame" style="width: 100%; height: 100%; border:0;"></iframe>
                    </div>
                    
                <% } %>
            </div>
            <div class="dados_turma">
                <h4>Nome da turma:</h4>
                <p><%=Model.strNomeTurma%></p>

                <h4>Apelido da turma:</h4>
                <input type="text" placeholder="Texto com o apelido da turma" maxlength="60" initvalue="<%=Model.StrApelidoGrupo %>" value="<%=Model.StrApelidoGrupo %>" <%=Model.BolGrupoDesativado ? " readonly=\"readonly\"" : "" %>/>
                    
                <h4>Apresentação da turma:</h4>
                <textarea maxlength="180" <%=Model.BolGrupoDesativado ? " readonly=\"readonly\"" : "" %> initvalue="<%=Model.StrDescricaoGrupo %>"><%=Model.StrDescricaoGrupo %></textarea>
            </div>
        </div>
        <div class="conteudo_450 right">
            <div class="onoff mgb_30">
                <div class="onoffswitch inputCheckboxChecked">
                    <input type="checkbox" name="videos" class="onoffswitch-checkbox" initvalue="<%=Model.BolGrupoDesativado ? "" : "checked" %>" id="ativar_grupo" <%=Model.BolGrupoDesativado ? "" : " checked=\"checked\"" %>>
                    <label class="onoffswitch-label" for="ativar_grupo">
                        <div class="onoffswitch-inner"></div>
                        <div class="onoffswitch-switch"></div>
                    </label>
                </div>
                <p>Ativar/ Desativar grupo da turma</p>
            </div>

            <h3>Mensagens multimídia por alunos</h3>
            <div class="onoff bdrb pdnb_7">
                <div class="onoffswitch inputCheckboxChecked">
                    <input type="checkbox" name="imagens_grupo" class="onoffswitch-checkbox" id="imagens_grupo" initvalue="<%=(Model.BolAlunoImagens && !Model.BolGrupoDesativado) ? "checked" : "" %>" <%=Model.BolGrupoDesativado ? " disabled=\"disabled\"" : "" %> <%=(Model.BolAlunoImagens && !Model.BolGrupoDesativado) ? " checked=\"checked\"" : "" %>>
                    <label class="onoffswitch-label" for="imagens_grupo">
                        <div class="onoffswitch-inner"></div>
                        <div class="onoffswitch-switch"></div>
                    </label>
                </div>
                <p>Imagens</p>
            </div>

            <div class="onoff bdrb pdnb_7">
                <div class="onoffswitch inputCheckboxChecked">
                    <input type="checkbox" name="videos_grupo" class="onoffswitch-checkbox" id="videos_grupo" initvalue="<%=(Model.BolAlunoVideos && !Model.BolGrupoDesativado) ? "checked" : "" %>" <%=Model.BolGrupoDesativado ? " disabled=\"disabled\"" : "" %> <%=(Model.BolAlunoVideos && !Model.BolGrupoDesativado) ? " checked=\"checked\"" : "" %>>
                    <label class="onoffswitch-label" for="videos_grupo">
                        <div class="onoffswitch-inner"></div>
                        <div class="onoffswitch-switch"></div>
                    </label>
                </div>
                <p>Vídeos</p>
            </div>

            <div class="onoff bdrb pdnb_7">
                <div class="onoffswitch inputCheckboxChecked">
                    <input type="checkbox" name="arquivos_grupo" class="onoffswitch-checkbox" id="arquivos_grupo" initvalue="<%=(Model.BolAlunoArquivos && !Model.BolGrupoDesativado) ? "checked" : "" %>" <%=Model.BolGrupoDesativado ? " disabled=\"disabled\"" : "" %> <%=(Model.BolAlunoArquivos && !Model.BolGrupoDesativado) ? " checked=\"checked\"" : "" %>>
                    <label class="onoffswitch-label" for="arquivos_grupo">
                        <div class="onoffswitch-inner"></div>
                        <div class="onoffswitch-switch"></div>
                    </label>
                </div>
                <p>Arquivos</p>
            </div>

            <div class="onoff bdrb pdnb_7">
                <div class="onoffswitch inputCheckboxChecked">
                    <input type="checkbox" name="filedrag_grupo" class="onoffswitch-checkbox" id="filedrag_grupo" initvalue="<%=(Model.BolAlunoDragDrop && !Model.BolGrupoDesativado) ? "checked" : "" %>" <%=Model.BolGrupoDesativado ? " disabled=\"disabled\"" : "" %> <%=(Model.BolAlunoDragDrop && !Model.BolGrupoDesativado) ? " checked=\"checked\"" : "" %>>
                    <label class="onoffswitch-label" for="filedrag_grupo">
                        <div class="onoffswitch-inner"></div>
                        <div class="onoffswitch-switch"></div>
                    </label>
                </div>
                <p>Arrastar arquivos</p>
            </div>

        </div>            
        <div class="ultima_alteracao right">
            <% if(Model.IdModeradorAlteracao > 0) { %>
            <p>
                Ultima alteração realizada por<br/>
                <strong><%=Model.NomeModeradorAlteracao %></strong> em 
                <strong><%=RedeSocialAVA.FuncoesTexto.FormataDataMensagemRapida(Model.DtmModeradorAlteracao, true, true, false)%></strong>
            </p>
            <% } %>
            <input type="button" class="btn_cor right" value="Salvar"/>                
        </div>            
    </form> 
    
    <div class="clearfix"></div>
    <% if(Model.IdsModeradores.Count == 1 && Model.BolModerador && !Model.BolGrupoDesativado){ %>
    <br/><br/>
    <h2>Denúncias</h2>
    <p>Acompanhe as denúncias de mensagens no grupo desta turma. Clique sobre o status para modificar a situação entre resolvido e pendente.</p>

    <!--Denuncias-->
    <div id="box_ListarDenuncia">
        <div class="le_filtros">
            <div id="filtro_aval">
                <div class="topo_filtro">
                    <h3>Filtro</h3>
                    <a href="javascript:void(0);" class="btAbreFechaFiltro">Fechar<span class="aberto"></span></a>
                </div>
                <div class="boxFiltro">
                    <div class="itens">
                        <h4>Exibir Itens:</h4>
                        <input type="radio" name="estado_denuncia" id="estado_denuncia_pendente" value="0" checked="checked">
                        <label for="hoje">      
                            <strong>Pendentes</strong>
                        </label>
                        <br/>
                        <input type="radio" name="estado_denuncia" id="estado_denuncia_resolvido" value="1">    
                        <label for="mes">   
                            <strong>Resolvidos</strong>
                        </label>
                    </div>
                    <div class="itens">
                        <h4>Nome do usuário:</h4>
                        <input type="text" maxlength="100" id="usuario_filtro_denuncia" value="" />
                    </div>                            
                    <div class="itens_botoes">
                        <a class="btn_laranja salvar" href="javascript:void(0);" onclick="javascript:carregarDenuncias();">Filtrar</a>
                    </div>
                </div>  
            </div>
        </div>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="tb_avisos" style="table-layout: fixed; word-wrap: break-word;">
            <thead>
                <tr>
                    <td width="30%">
                        Motivo
                    </td>
                    <td width="25%">
                        Denunciado
                    </td>
                    <td width="25%">
                        Denunciante
                    </td>
                    <td width="10%">
                        Data
                    </td>
                    <td width="10%">
                        Status
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="5">
                        <div style="padding: 20px 47%;"><img border="0" alt="carregando..." src="/AVA/StaticContent/Common/img/perfil/carregando.gif" /></div>
                    </td>
                </tr>
            </tbody>
        </table>            
    </div>
    <% } %>
    <div class="aviso mgt_10">
        <p><strong>Atenção:</strong> Outras funções administrativas, como a suspensão de alunos, podem ser realizadas pelo administrador da rede social da sua escola.</p>
    </div>

    

    <!--Fim denuncias-->
</section><!-- section config turma -->
<% } %>
<div class="clearfix"></div>



</div>


<script type="text/javascript">


var isAluno  = '<%=Model.BolAluno%>';
var isProfessor  = '<%=Model.BolProfessor%>';
var teste = '<%=Model.StrApelidoGrupo%>';
console.log(teste);

mostraAgenda();


function mostraAgenda(){

  setTimeout(function(){
                    

    $("#boxAgendaReduzida").addClass("agendaReduzidaCalendario");


    }, 100);

    $('.bcs1').show();


}

</script>
</asp:Content>






