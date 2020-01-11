<%@ Page Language="C#"  MasterPageFile="~/Views/TES/Shared/Grupos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Grupo.Models.Grupos>" %>
  

<asp:Content ContentPlaceHolderID="ContentPlaceHolderAgenda" ID="ContentPlaceHolderAgenda" runat="server">   
    <%
        if (Convert.ToInt32(ViewData["idEdicao"]) <= 0)
        {
     %>
        <header>
            <h1>Agenda</h1>
        </header>
                
        <div id="dadosAgenda" class="clearfix">

        </div>
       <%}else{ %>
        <!-- Box atividade e Atividade da vez -->
       <%} %>
</asp:Content>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">   
    <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/grupos_3.2.0.css<%=Url.TimeStampLink() %>" />
    
    <%
    int idEdicao = Convert.ToInt32(ViewData["idEdicao"]); 
    if (idEdicao > 0)
    {    
        %>
        <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/clubes/grupos_clube_<%=idEdicao %>.css<%=Url.TimeStampLink() %>" />
        <%
    } 
    %>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/grupos_4.2.11.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/timelinegrupo(1)_3.1.13.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/jquery.AvaSelector_3.4.7.js<%=Url.TimeStampLink() %>"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">

    <%
    int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
    bool bolProfessor = Convert.ToBoolean(ViewData["bolProfessor"]);
    int idAlbum = (int) ViewData["idAlbum"];
    int idArquivoMultimidia = (int)ViewData["idArquivoMultimidia"];
    bool bolConfigVideo = (bool) ViewData["bolConfigVideo"];
    bool bolConfigImagem = (bool) ViewData["bolConfigImagem"];
    bool bolConfigFile = (bool)ViewData["bolConfigFile"];
    bool bolSuspenso = false;
    string strJustificativaSuspenso = "";
    string strNomeAdminSuspenso = "";
    string dataIniSuspensao = "";
    string dataFimSuspensao = "";
    bool bolTemAlunonoGrupo = ViewData["bolTemAlunonoGrupo"] != null ? ((bool)ViewData["bolTemAlunonoGrupo"]) : false;		
            
    List<Grupo.Models.ParticipanteGrupo> lUsuariosGrupo = Model.lTodosUsuariosGrupo.FindAll(p => p.id == idUsuarioLogado);

    bool bolMediadorLogado = false;
    
    if (lUsuariosGrupo.Count > 0)
    {
        if (lUsuariosGrupo[0].bolMediador || lUsuariosGrupo[0].bolCriador)
        {
            bolMediadorLogado = true;
        }

        bolSuspenso = (bool)ViewData["bolSuspenso"];
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
                            
                            
                        if (Model.idAdesao != 4 && bolMediadorLogado)
                        {

                            if (Model.idAdesao == 2)
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

    <%
    bool bolAcessoEscreverBloqueado = false;
                
    if (Model.segmentacaoBloqueio != null)
    {
        bolAcessoEscreverBloqueado = Model.segmentacaoBloqueio.bolBloqueado;
    }

    if (bolSuspenso)
    {
        %>
        <section class="dialogo clearfix"><div style="text-align:center;padding-bottom:15px">
                
            <p>Você está impedido de enviar mensagens de <b><%:dataIniSuspensao%></b> até <b><%:dataFimSuspensao%></b></p>
            <p>Motivo: 
                <%
                    if (strJustificativaSuspenso == "")
                    {
                        %>
                                Não declarado.
                        <%
                    }
                    else
                    {
                        %>
                            <%:strJustificativaSuspenso%>
                        <%
                    }
                %>
                </p>
            <p>Administrador(a): <%:strNomeAdminSuspenso %></p>
                
        </div></section><%
    }
    else if (bolAcessoEscreverBloqueado)
    {
        %>
        <section class="banner_ferias_aluno">
			<h2>Férias! Aproveite para descansar.</h2>
			<p><%=Model.segmentacaoBloqueio.strTexto%></p>
		</section>
        <%
    }
    else if (Model.bolAcessoEscrever)
    {
        Html.RenderPartial("Partials/MensagemRapida", Model, new ViewDataDictionary { { "bolMediador", bolMediadorLogado }, { "bolProfessor", bolProfessor }, { "idAlbum", idAlbum }, { "idArquivoMultimidia", idArquivoMultimidia }, { "bolConfigImagem", bolConfigImagem }, { "bolConfigVideo", bolConfigVideo }, { "bolConfigFile", bolConfigFile }, { "bolTemAlunonoGrupo", bolTemAlunonoGrupo } });
    }
    else if (Model.idEstado.Equals(2)) 
    { 
        %>
        <section class="dialogo clearfix">
            As atividades deste grupo estão desativadas.
        </section>
        <%
    }
    else if (Model.idEstado.Equals(3)) 
    { 
        %>
        <section class="dialogo clearfix">
            As atividades deste grupo foram encerradas.
        </section>
        <%
    }
    %>

    <input type="hidden" id="strIdLinkPermanente" value="<%=Model.strLinkPermanente %>" />
    
    <section class="muralGrupos timeline">
        <header>
			<h1 class="blokletters"><span class="icon_li mural"></span>MURAL</h1>
			<div id="" role="application">
                Filtrar por: 
				<span class="bootstrap">
				    <div class="btn-group">
				        <a href="javascript: void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="btnFiltroGrupo" idAssunto="0"> 
                            <span class="FontAwesome"></span> 
                            <span id="textoBtnFiltroAssunto">Todos os assuntos</span> 
				            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" id="cbFiltroAssunto">
                            <%
                            Html.RenderPartial("Partials/ListaAssuntoFiltrarMensagem", Model.lAssuntos);
                            %>
				        </ul>
				    </div> 
				</span>
			</div>
        </header>

        <div id="boxTimeLineGrupos">
        
        </div>    
           
    </section><!-- .muralGrupos -->

</asp:Content>
