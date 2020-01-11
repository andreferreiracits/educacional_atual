<%@ Control Language="C#" Debug="true" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.CaminhoUsuario>" %>
<%
    string rex = "<(script|style)\\b[^>]*?>.*?</\\1>";
    bool completo;
    completo = Model.bolConcluido;
    int numEtapasCompletas = 0;
    foreach (var etapa in Model.lCaminhoEtapaUsuario)
    {
        if(etapa.bolConcluido){
            numEtapasCompletas++;
        }
    }
 %>
<aside id="ava_barralateral-direita" class="barra_1024">
    
    <div class="placa_verde">
        <h2 class="din"><a href="/ava/caminhos/home/resumo/<%=Model.idCaminhoAgendamento%>"  class=""><%=Model.Caminho.titulo %></a></h2>
        <%
            if (completo)
            {
            %>
            <p class="e_finalizada">Etapas finalizadas!  <span class="feito"></span></p>
            <%
            }
            else
            {
            %>
            <p>Etapas completas: <span class="geral_etapas"><%=numEtapasCompletas%></span> de <span class="geral_etapas"><%=Model.lCaminhoEtapaUsuario.Count%></span> </p>
            <%
            }
        %>
        
    </div><!--placa_verde-->      
                
        <%        
            
        int idRotaAgendamento = Model.idCaminhoAgendamento;
        int idCaminho = 0;
        string s_aClass = "";
        string s_hRef = "";
        string s_rel = "";
        string s_classEtapaCorrente = "";
        string s_onClick = "";
        int intOrdemAgendamento = 0;
        int idAvaliacao = 0;
        string link;    
        int idEtapaCorrente = Model.Caminho.idEtapaCorrente;
        string dominio;
        string descrEtapa;        
        dominio = Request.Url.Host;
        int idUsuario = Model.idUsuario;
        bool foiEncerradoAutomatico = Model.bolEncAutomatico;
        string tipo;
        string tipo2;
        DateTime dtmFimEtapa = Model.dtmFimAgendamento;
        int countEtapa = 0;
        string trabalho = "false";
        string alturaIframe;
        Caminhos.Business.Models.PaginacaoCM pCM = null;
        int contadorTarefa = 0;
        string etapaConcluida = string.Empty;
        bool bolEtapaConcluida = false;
        string tituloAba = string.Empty;
        foreach (var item in Model.lCaminhoEtapaUsuario)
        {
            contadorTarefa++;
            pCM = null;
            alturaIframe = "100%;";
            countEtapa++;
            if (idEtapaCorrente == item.idEtapa)
            {             
                s_classEtapaCorrente = " atual";
                descrEtapa = "block";               
            }
            else
            {
                descrEtapa = "none";
            }
            
            switch (item.Etapa.recursoItem.idRecurso)
            {
                case 1:
                    //Avaliações                           
                    s_aClass = "ava_abreAvaliacao avaliacao";
                    s_hRef = "javascript: void(0);";
                    intOrdemAgendamento = item.Etapa.recursoItem.intOrdemAgendamento;
                    idAvaliacao = item.Etapa.recursoItem.idAvaliacao;                                     
                    s_rel = "http://"+ dominio +"/avaliacoesonline/fazer_avaliacao.asp?inicio=1&idAvaliacao=" + idAvaliacao + "&intAgend=" + intOrdemAgendamento;
                    tituloAba = "Visualizar Avaliação";
                    break;
                case 2:
                    //Conteúdo Multimídia
                    tituloAba = "Visualizar Conteudo Multimídia";
                    s_aClass = "abrePlayer";
                    s_hRef = "javascript: void(0);";
                    s_rel = item.Etapa.recursoItem.strLink;
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0;
                    alturaIframe = "530";
                    pCM = new Caminhos.Business.Models.PaginacaoCM();
                    if (item.Etapa.paginaCM != null)
                    {
                        pCM.intOrdem = item.Etapa.paginaCM.intOrdem;
                        pCM.intOrdem2 = item.Etapa.paginaCM.intOrdem2;
                        pCM.iVersaoCM = item.Etapa.paginaCM.iVersaoCM;
                        pCM.url = item.Etapa.paginaCM.url;
                        pCM.idPublicacao = item.Etapa.paginaCM.idPublicacao;
                        pCM.strTitulo = item.Etapa.paginaCM.strTitulo;
                        pCM.urlPai = item.Etapa.paginaCM.urlPai;
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
                case 3:
                    tituloAba = "Visualizar Interpretando";
                    //Interpretando
                    s_aClass = " abreSecao";
                    link = item.Etapa.recursoItem.strLink;
                    if (link.IndexOf("?") == -1)
                    {
                        link = link + "?";
                    }
                    s_hRef = "javascript: void(0)";
                    s_rel = link + "&rota=" + idRotaAgendamento + "&idEtapa=" + item.idEtapa;                       
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0;                       
                    break;
                case 4:
                    //Banco de imagens
                    tituloAba = "Ver Imagem";
                    s_aClass = "abrePlayer";
                    s_hRef = "javascript: void(0);";
                    s_rel = item.Etapa.recursoItem.strLink;   
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0;
                    break;
                case 5:
                    //Museu Virtual
                    tituloAba = "Visualizar Museu Virtual";
                    s_aClass = "abrePlayer";
                    s_hRef = "javascript: void(0);";
                    s_rel = "http://" + dominio + item.Etapa.recursoItem.strLink;
                    s_rel = s_rel.Replace("pesquisa.asp", "pesquisaAVA.asp");
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0;
                    break;
                case 6:
                    //Linha do Tempo
                    alturaIframe = "530";
                    tituloAba = "Visualizar Linha do Tempo";
                    s_aClass = "abrePlayer";
                    link = "/linhadotempo/linha.asp?id=" + item.Etapa.recursoItem.idPublicacao; //idPublicacao
                    s_hRef = "javascript: void(0);";
                    s_rel = link + "&rota=" + idRotaAgendamento + "&estilo=0";  
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0;
                    break;
                case 7:
                    //Mapoteca
                    tituloAba = "Visualizar Mapa";
                    s_aClass = "abrePlayer";
                    s_hRef = "javascript: void(0);";
                    s_rel = item.Etapa.recursoItem.strLink;  
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0; 
                    break;
                case 8:
                    //Fóruns
                    tituloAba = "Visualizar Fórum";
                    s_aClass = " abreSecao";                   
                    link = "/foruns/proposta.asp?id=" + item.Etapa.recursoItem.idPublicacao ;
                    s_hRef = "javascript: void(0);";
                    s_rel = link + "&rota=" + idRotaAgendamento + "&idEtapa=" + item.idEtapa;
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0;
                    break;
                case 9:
                    //Obras Literárias
                    tituloAba = "Visualizar Obra Literária";
                    s_aClass = "abrirObraLiteraria";
                    link = item.Etapa.recursoItem.strLink;
                    if (link.IndexOf("?") == -1)
                    {
                        link = link + "?";
                    }
                    s_hRef = "javascript: void(0);";
                    s_rel = link + "&rota=" + idRotaAgendamento;  
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0;                    
                    break;
                case 10:
                    //Simuladores
                    tituloAba = "Visualizar Simulador";
                    s_aClass = "abrePlayer";
                    s_hRef = "javascript: void(0);";
                    s_rel = item.Etapa.recursoItem.strLink;  
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0;
                    break;                
                case 11:
                    // etapa do meu jeito
                    tituloAba = "Visualizar Etapa do meu jeito";
                    s_aClass = "etapaDoMeuJeito";
                    s_hRef = "javascript: void(0);";
                    s_rel = item.Etapa.recursoItem.strLink;  
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0;
                    break;
                case 12: //Baú de atividades
                    tituloAba = "Visualizar Jogo";
                    s_aClass = "abrirJogo";
                    link = item.Etapa.recursoItem.strLink;
                    s_hRef = "javascript: void(0);";
                    s_rel = link.ToLower().Replace("javascript:","").Replace("void(0);","");
                    idAvaliacao = 0;
                    intOrdemAgendamento = 0;
                    break;
                default:
                    break;
            }//item.Etapa.recursoItem.idRecurso
            s_onClick = "";
           
            %>       
            <div class="placa_amarela <%:s_classEtapaCorrente %><%=item.bolConcluido ? "atual" : "" %>">   
                
                <a class="<%
                if (item.Etapa.recursoItem.idRecurso == 11)
                {
                Response.Write(s_aClass);
                }
                if (item.Etapa.recursoItem.idRecurso == 8) {
                     %>" rel="/ava/caminhos/home/player/<%=idRotaAgendamento%>/<%=item.idEtapa%>" href="javascript: void(0);" alturaIframe="<%=alturaIframe %>" idEtapa="<%=item.idEtapa %>" idRotaEtapaUsuario="<%=item.id %>" onclick="" idRotaUsuario="<%=item.idRotaUsuario %>" idrecurso="<%=item.Etapa.recursoItem.idRecurso %>" idAvaliacao="<%=idAvaliacao %>" intOrdemAgendamento="<%=intOrdemAgendamento %>" idRotaAgendamento="<%=idRotaAgendamento %>" tituloAba="<%=tituloAba %>"
                     <%
                }else {
                     %>" href="<%=s_hRef%>" rel="<%=s_rel %>" alturaIframe="<%=alturaIframe %>" idEtapa="<%=item.idEtapa %>" idRotaEtapaUsuario="<%=item.id %>" onclick="" idRotaUsuario="<%=item.idRotaUsuario %>" idrecurso="<%=item.Etapa.recursoItem.idRecurso %>" idAvaliacao="<%=idAvaliacao %>" intOrdemAgendamento="<%=intOrdemAgendamento %>" idRotaAgendamento="<%=idRotaAgendamento %>" 
                     tituloAba="<%=tituloAba %>"
                     <%
                 }
                 if(pCM != null){
                 %>
                 idPublicacao="<%=pCM.idPublicacao %>" urlPai="<%=pCM.urlPai %>" url="<%=pCM.url %>" pOrdem="<%=pCM.intOrdem %>" sOrdem="<%=pCM.intOrdem2 %>" iVersao="<%=pCM.iVersaoCM %>"
                 <%
                 }
                 %>
                 >
                    TAREFA <%=contadorTarefa %>
                    <%
                    string strTituloEtapa = "Etapa sem título";
                    if (item.Etapa.strEtapa.Length > 0)
                    {
                        strTituloEtapa = item.Etapa.strEtapa;
                    }
                    Response.Write("<span class=\"titulo_tarefa din\">" + strTituloEtapa + "</span>");

                    string strRecurso = item.Etapa.recursoItem.strRecurso;
                    if (item.Etapa.recursoItem.idRecurso == 11)
                    {
                        strRecurso = item.Etapa.recursoItem.strRecurso;
                    }
                    
                    %>
                    
                    <span><%=strRecurso%></span>
                    <!--<span class="detalhes" style="<%= idEtapaCorrente == item.idEtapa ? "display: none;" : "" %>">
                        <p>« Ver orientações</p>
                    </span>-->
                    <%
                    etapaConcluida = "";
                    if (item.Etapa.recursoItem.idRecurso == 1)
                    {
                        tipo = "avaliacao";
                        if (item.bolConcluido)
                        {
                            bolEtapaConcluida = true;
                            //tipo2 = "ativ_on";
                            //etapaConcluida = "<span class=\"concluido sprite_player\" tipo=\"" + tipo + "\"></span>";
                           // Response.Write("Recurso 1 concluido");
                        }
                        else
                        {
                            bolEtapaConcluida = false;
                            //tipo2 = "ativ_off";
                            //etapaConcluida = "";
                            //Response.Write("Recurso 1 n concluido");
                        }
                    }
                    else if (item.Etapa.recursoEntrega.id.ToString() != "0")
                    {
                        tipo = "trabalho";
                        if (item.bolConcluido)
                        {
                            bolEtapaConcluida = true;
                            //etapaConcluida = "<span class=\"concluido sprite_player\" tipo=\"" +  tipo +"\"></span>";
                            //Response.Write("Recurso entrega concluido");
                            //tipo2 = "arq_enviado_on";
                        }
                        else
                        {
                            //tipo2 = "arq_enviado_off";
                            //etapaConcluida = "";
                            bolEtapaConcluida = false;
                            //Response.Write("Recurso entrega n concluido");
                        }
                        
                        trabalho = "true";
                        
                    }
                    else
	                {
                        tipo = "leitura";
                        if (item.Etapa.recursoEntrega.id.ToString() == "0")
                        {
                            trabalho = "false";
                        }
                        if(item.bolConcluido){
                            //tipo2 = "ep_lida_on";
                            //etapaConcluida = "<span class=\"concluido sprite_player\" tipo=\"" + tipo + "\"></span>";
                            bolEtapaConcluida = true;
                            //Response.Write("Recurso leitura concluido");
                        } else
                        {
                            //tipo2 = "ep_lida_off";
                            //etapaConcluida = "";
                            bolEtapaConcluida = false;
                            //Response.Write("Recurso leitura n concluido");
                        }
                        
                       
                        
	                }
                    %>
                    
                    <!--<i title="" class="ep_status <=tipo2 %>" tipo="<=tipo %>"></i>-->
                    <span class="seta_etapa">
                        <img width="33" height="34" src="/AVA/StaticContent/Common/img/perfil/seta_amarela.png">
                    </span>
                    <span id="etapa_info_<%=item.idEtapa %>" class="<%=(dtmFimEtapa < DateTime.Now) ? "etapaForaDoPrazo " : " "%><%=bolEtapaConcluida ? "concluido" : "" %> sprite_player bolConcluidoPlaca" tipo="<%=tipo %>"></span>
                </a>                                
            </div>
            <div class="etapa_infos" style="display: <%=descrEtapa %>">
                <%
                if (item.Etapa.recursoItem.idRecurso != 1 && item.Etapa.recursoItem.idRecurso != 9 && item.Etapa.recursoItem.idRecurso != 11)
                {
                    %>
                    <!--fazer('<%=s_rel%>', <%=item.idEtapa %>, <%=item.id %>, <%=item.idRotaUsuario %>, <%=item.Etapa.recursoItem.idRecurso %>, <%=idAvaliacao %>, <%=intOrdemAgendamento %>, <%=idRotaAgendamento %>, '<%=trabalho %>');-->
                    <span style="display: none;" class="fecha_X <%=s_aClass%> listaEtapas" idEtapa="<%=item.idEtapa %>" idRotaEtapaUsuario="<%=item.id %>" onclick="" idRotaUsuario="<%=item.idRotaUsuario %>" idrecurso="<%=item.Etapa.recursoItem.idRecurso %>" idAvaliacao="<%=idAvaliacao %>" intOrdemAgendamento="<%=intOrdemAgendamento %>" idRotaAgendamento="<%=idRotaAgendamento %>"></span>
                    <%
                }
                if (item.Etapa.recursoItem.idRecurso == 11)
                {
                    %>
                    <span style="display: none;" class="listaEtapas" idEtapa="<%=item.idEtapa %>" idRotaEtapaUsuario="<%=item.id %>" idRotaUsuario="<%=item.idRotaUsuario %>" idrecurso="<%=item.Etapa.recursoItem.idRecurso %>" idAvaliacao="<%=idAvaliacao %>" intOrdemAgendamento="<%=intOrdemAgendamento %>" idRotaAgendamento="<%=idRotaAgendamento %>"></span>
                    <%
                }
                           
                %>
                <div class="requisitos_caminhos_tarefas">
					<h2 class="din sprite_player">Tarefa <%=contadorTarefa %></h2>
					<ul class="caixa_requisito">
						<li class="din">
							REQUISITO
							<span class="tipo_requisito"><strong class="<%= !bolEtapaConcluida ? "completo" : "" %>">
                            <%
                            switch(item.Etapa.recursoItem.idRecurso){
                                case 1:
                                    //Avaliações                           
                                    Response.Write("Fazer Avaliação");
                                    break;
                                case 2:
                                    //Conteúdo Multimídia
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Ver Conteúdo Multimídia");
                                    }
                                    
                                    break;
                                case 3:
                                    //Interpretando
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Ver Interpretando");
                                    }
                                    break;
                                case 4:
                                    //Banco de imagens
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Ver Imagem");
                                    }
                                    break;
                                case 5:
                                    //Museu Virtual
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Ver Museu Virtual");
                                    }
                                    break;
                                case 6:
                                    //Linha do Tempo
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Ver Linha do Tempo");
                                    }
                                    break;
                                case 7:
                                    //Mapoteca
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Ver Mapa");
                                    }
                                    break;
                                case 8:
                                    //Fóruns
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Ver Fórum");
                                    }
                                    break;
                                case 9:
                                    //Obras Literárias
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Ver Obra Literária");
                                    }
                                    break;
                                case 10:
                                    //Simuladores
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Ver Simulador");
                                    }
                                    break;
                                case 11:
                                    // etapa do meu jeito
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Etapa do meu jeito");
                                    }
                                    break;
                                case 12:
                                    // Baú de atividades
                                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                                    {
                                        Response.Write("Enviar Arquivo");
                                    }
                                    else
                                    {
                                        Response.Write("Ver jogo");
                                    }
                                    break;
                            }
                            %>
                            </strong></span><!--Classe "completo" somente quando a tarefa estiver concluída-->
						</li>
						<li class="din">
							ESTA TAREFA VALE
							<span><strong><%=item.Etapa.intValor.Equals(0) ? "-" : item.Etapa.intValor.ToString() %></strong></span>
						</li>
					</ul>
				</div>
                <h3 class="din"><%=item.Etapa.strEtapa %></h3>
                <p>
                <%
                    if (item.Etapa.strDescricao.Length > 0)
                    {
                        if (item.Etapa.strDescricao.Contains("../../../../userData/ava/"))
                        {
                            Response.Write(Regex.Replace(Server.HtmlDecode(item.Etapa.strDescricao.Replace("../../../../userData/ava/", "/../../../userData/ava/").Replace("../../../../upload/", "/upload/").Replace("../../../upload/", "/upload/")), rex, "", RegexOptions.IgnoreCase | RegexOptions.Singleline));
                        }
                        else
                        {
                            Response.Write(Regex.Replace(Server.HtmlDecode(item.Etapa.strDescricao.Replace("../../../userData/ava/", "/../../userData/ava/").Replace("../../../../upload/", "/upload/").Replace("../../../upload/", "/upload/")), rex, "", RegexOptions.IgnoreCase | RegexOptions.Singleline));
                        }

                    }
                    else
                    {
                        Response.Write("Esta etapa não possui descrição.");
                    }            
                %>
                </p>
                <!--<div class="infos_lebox infos_header">
                    <h3>Orientações da tarefa</h3>
                
                    <span> Esta tarefa vale: < %=item.Etapa.intValor%> </span>  
                </div>-->
                
                <!--div class="infos_lebox infos_titulo">
                    <h3>< %=item.Etapa.strEtapa %></h3>
                </div>-->
                <div class="infos_lebox">                
                    <h4>ESTA TAREFA CONTÉM:</h4>
                    <% 

                    if (item.Etapa.recursoItem.id.ToString().Length > 0 && item.Etapa.recursoItem.idRecurso != 11)
                    {
                        if (item.Etapa.recursoItem.intEstado == 94 || item.Etapa.recursoItem.intEstado == 91 || item.Etapa.recursoItem.idRecurso == 1 || item.Etapa.recursoItem.idRecurso == 12)
                        {
                            %>

                            <div class="r-selecionado">
                                <% 
                                if (item.Etapa.recursoItem.idRecurso == 1)
                                {
                                    %>
                                    <h5><span class="recursos_portal_player"></span><%=item.Etapa.recursoItem.strRecurso%></h5>
                                    <div class="recurso_detalhes_player">
								        <img width="74" height="74" alt="<%= item.Etapa.recursoItem.strRecurso%>" src="<%=item.Etapa.recursoItem.strThumbRecurso%>">
								        <p><%=item.Etapa.recursoItem.strTitulo%></p>
								        <br>
                                        
								        <!--<a class="btn_laranja ver_conteudo verConteudo" href="javascript:void(0);">Visualizar</a> -->
							        </div> 
                                    <% 
                                       
                                        if (item.Etapa.recursoItem.idRecurso != 9 && item.Etapa.recursoItem.idRecurso != 1)
                                       { %>
								    <a class="btn_laranja ver_conteudo verConteudo" href="javascript:void(0);">Visualizar</a> 
                                    <% } %>
                                    <!--<a>
                                        <img width="55" height="55" alt="< %= item.Etapa.recursoItem.strRecurso%>" src="< %=item.Etapa.recursoItem.strThumbRecurso%>">
                                        <div class="embrulho">
                                            <strong>< %=item.Etapa.recursoItem.strRecurso%></strong>
					                        <p>< %=item.Etapa.recursoItem.strTitulo%></p>                                            
                                        </div>
                                    </a>-->
                                    <%
                                }
                                else
                                {
                                    %>
                                    <h5><span class="recursos_portal_player"></span><%=item.Etapa.recursoItem.idRecurso == 2 ? "CONTEÚDO MULTIMÍDIA" : item.Etapa.recursoItem.strRecurso%></h5>
                                    <div class="recurso_detalhes_player">
								        <img width="74" height="74" alt="<%= item.Etapa.recursoItem.strRecurso%>" src="<%=item.Etapa.recursoItem.strThumbRecurso%>">
								        <p><%=item.Etapa.recursoItem.strTitulo%></p>
								        
                                        <%
                                            
                                            if (pCM != null)
                                            {                                           
                                                %>
                                                <p><strong>Capítulo:</strong> <%=pCM.strTitulo%></p>
                                                <%
                                            }
                                        %>
                                        
							        </div> 
                                    <% 
                                    if (item.Etapa.recursoItem.idRecurso == 8)
                                    {
                                        %>
                                        <a class="btn_laranja ver_conteudo verConteudo" href="<%=s_rel %>"  
                                        alturaIframe="<%=alturaIframe %>" idEtapa="<%=item.idEtapa %>" 
                                        idRotaEtapaUsuario="<%=item.id %>" onclick="" idRotaUsuario="<%=item.idRotaUsuario %>" 
                                        idrecurso="<%=item.Etapa.recursoItem.idRecurso %>" idAvaliacao="<%=idAvaliacao %>" 
                                        intOrdemAgendamento="<%=intOrdemAgendamento %>" idRotaAgendamento="<%=idRotaAgendamento %>" 
                                        tituloAba="<%=tituloAba %>">Visualizar</a> 
                                    <% 
                                    }  else                                     
                                       if (item.Etapa.recursoItem.idRecurso != 9 && item.Etapa.recursoItem.idRecurso != 1 && item.Etapa.recursoItem.idRecurso != 12)
                                       {
                                          
                                        %>
								        <a class="btn_laranja ver_conteudo verConteudo" href="javascript:void(0);">Visualizar</a> 
                                        <% 
                                           
                                   }
                                }        
                                %>
                            </div>                           
                            
                            <hr>                     
                            <%
                        }   
                        else
                        {
                            
                            %>
                            <div class="r-selecionado">
							    <h5><span class="recursos_portal_player"></span><%=item.Etapa.recursoItem.strTitulo%> (Este recurso não está mais disponível.)</h5>
							    <div>
								    <img width="74" height="74" alt="nome do recurso" src="/ava/StaticContent/Common/img/perfil/recurso_55.gif">
								    <p><%=item.Etapa.recursoItem.strRecurso%></p>
								    <br>
								    <a class="btn_laranja ver_conteudo" href="#">Visualizar</a> 
							    </div>  
						    </div>
                            <!--<div class="r-selecionado">
                                <h5>Recurso selecionado</h5>
                                <a>
                                    <img width="55" height="55"  src="/AVA/StaticContent/Common/img/perfil/recurso_55.gif">
                                    <span><strong>< %=item.Etapa.recursoItem.strRecurso%></strong>
                                    <p>< %=item.Etapa.recursoItem.strTitulo%> (Este recurso não está mais disponível.)</p>
					                </span>
                                </a>
                            </div> -->
                            <hr>    
                            <%
                        }
                    }
                    
                    if (item.Etapa.recursoMidia.idTipoMidia > 0) //Verifica se a etapa tem midia na descrição
                    {
                        %>
                        <h5> <i class="midia_icon"></i> Vídeo enviado pelo professor </h5>
                                       
                        <div class="midia_etapa">
                            <%                         
                            string embed = "";
                            string larguraVideo = "560";
                            string alturaVideo = "315";
                            string tempo = "";

                            if (item.Etapa.recursoMidia.idMidia.Contains("#t=") || item.Etapa.recursoMidia.idMidia.Contains("&t=") || item.Etapa.recursoMidia.idMidia.Contains("?t="))
                            {
                                //tempo = item.Etapa.recursoMidia.idMidia.Substring(item.Etapa.recursoMidia.idMidia.LastIndexOf("t=") + 2);
                                #region tempoVideo
                                //Jogar para utils
                                {
                                    try
                                    {
                                        if (!String.IsNullOrEmpty(item.Etapa.recursoMidia.idMidia))
                                        {
                                            if (item.Etapa.recursoMidia.idMidia.ToLower().IndexOf("t=") > 1)
                                            {
                                                tempo = item.Etapa.recursoMidia.idMidia.Split(new string[] { "t=" }, StringSplitOptions.RemoveEmptyEntries).Last().ToLower();
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
                                item.Etapa.recursoMidia.idMidia = item.Etapa.recursoMidia.idMidia.Substring(0, item.Etapa.recursoMidia.idMidia.LastIndexOf("t=") - 1);
                            }
                            
                            switch (item.Etapa.recursoMidia.idTipoMidia)
                            {
                                case 1:
                                    {//Youtube
                                        if (!String.IsNullOrEmpty(tempo))
                                            tempo = "&start=" + tempo;
                                        embed = "<iframe width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" src=\"http://www.youtube.com/embed/" + item.Etapa.recursoMidia.idMidia + "?autoplay=0&wmode=transparent" + tempo + "\" frameborder=\"0\" allowfullscreen></iframe>";
                                    } break;

                                case 2:
                                    {//Vimeo
                                        if (!String.IsNullOrEmpty(tempo))
                                            tempo = "?player_id=previewMidia&api=1#t=" + tempo;
                                        embed = "<iframe class=\"iframeVideoVimeo\" src=\"http://player.vimeo.com/video/" + item.Etapa.recursoMidia.idMidia + tempo + "\" width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>";
                                    } break;

                                case 3:
                                    { //Globo
                                        embed = "<object width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" data=\"http://s.videos.globo.com/p2/player.swf\" type=\"application/x-shockwave-flash\"><param value=\"true\" name=\"allowFullScreen\"><param value=\"http://s.videos.globo.com/p2/player.swf\" name=\"movie\" /><param value=\"high\" name=\"quality\" /><param value=\"midiaId=" + item.Etapa.recursoMidia.idMidia + "&autoStart=false&width=" + larguraVideo + "&height=" + alturaVideo + "\" name=\"FlashVars\" /></object>";
                                    } break;
                            }
                            Response.Write(embed);
                            %>
                        </div>
                        <hr>                        
                        <%
                    }
                    
                    if (item.Etapa.lArquivoEtapa.Count > 0)
                    {
                        %>
                        <h5> <i class="mapoio_icon"></i> Material de apoio </h5>                        
               		    <div class="container_inlinks">
                            <%
                            foreach (var material in item.Etapa.lArquivoEtapa)
                            {
                                string strDiretorio = material.strDiretorio + "/" + material.strArquivo + material.strExtensao;
                                %>
                                <div class="the_insertedLink">
                                    <a target="_blank" href="<%=strDiretorio%>" class="umlink"><span class="umarquivo"></span><%=material.strArquivo%></a>                        
                                </div>                                
                                <%
                            }
                            %>                           
                        </div>
                        <hr>                        
                        <%
                    }

                    if (item.Etapa.lRecursoLink.Count > 0)
                    {
                        %>
                        

                        <h5> <i class="links_icon"></i> Links enviados pelo professor </h5>
                        <div class="container_inlinks">
                            <%
                            foreach (var linksApoio in item.Etapa.lRecursoLink)
                            {
                                %>
                                <div class="the_insertedLink">
                                    <a target="_blank" href="<%=linksApoio.strLink%>" class="umlink"><span></span><%=linksApoio.strTitulo%></a>                        
                                </div>                                
                                <%
                            }
                            %>                           
                        </div>  
                        <hr>            
                       <%
                    }
                    //Response.Write('aqr '+ item.Etapa.recursoEntrega.id);
                    //Response.Write('aqr '+item.Etapa.recursoEntrega.strObservacao);


                    if (item.Etapa.recursoEntrega.id.ToString() != "0")
                    //if (true)

                    {

                        string mostraCaixaEnvio = "true";
                        
                        if (foiEncerradoAutomatico || dtmFimEtapa <= DateTime.Now) //dtmFimEtapa
	                    {
		                    mostraCaixaEnvio = "false";                          
	                    }                        
                       %>

                        

                       <div class="infos_lebox infos_entrega">
                       <h5><i class="ep_status arq_enviado_on"></i>Entrega de trabalho</h5>
                           <div class="container_entrega_aluno">                                
                                <p><%=item.Etapa.recursoEntrega.strObservacao %></p>
                                <div class="container_inEntrega" id="countt_<%=countEtapa %>">
                                    <input type="hidden" id="idRota" value="<%=Model.idCaminho %>" />
                                    
                                    <input type="hidden" id="idEtapa_<%=item.idEtapa %>" value="<%=item.idEtapa %>" />
                                    <input type="hidden" id="idRotaUsuario_<%=item.idEtapa %>" value="<%=item.idRotaUsuario %>" />
                                    <input type="hidden" id="idRecurso_<%=item.idEtapa %>" value="11" />
                                    <input type="hidden" id="idRotaAgendamento_<%=item.idEtapa %>" value="<%=idRotaAgendamento %>" />
                                    <input type="hidden" id="idRotaEtapaUsuario_<%=item.idEtapa %>" value="<%=item.id%>" />

                                    <script type="text/javascript">
                                        //var idRotaEtapaUsuarioAux = gerarIdRotaEtapaUsuario(<%=item.id%>, <%=item.idRotaUsuario %>, <%=item.idEtapa %>, 0, <%=idRotaAgendamento %>);
                                        //abrirUploadArquivo(<%=idUsuario%>, idRotaEtapaUsuarioAux, 15, "<%=mostraCaixaEnvio%>", <%=countEtapa %>, "<%=Request.Browser.Browser.ToString()%>", true);

                                        //var auxFunction = "abreUploadCaminhosAluno(<%=idUsuario%>, <%=item.idEtapa %>, 15, <%=mostraCaixaEnvio%>, <%=countEtapa %>, <%=Request.Browser.Browser.ToString()%>, true)";
                                        
                                        $(function () {
                                            var idRotaEtapaUsuarioAux = gerarIdRotaEtapaUsuario(<%=item.id%>, <%=item.idRotaUsuario %>, <%=item.idEtapa %>, 0, <%=idRotaAgendamento %>);
                                            //$('.divBtnUpload').html('<a href="javascript:void(0)" onclick="abreUploadCaminhosAluno(<%=idUsuario%>, <%=item.idEtapa %>, '+idRotaEtapaUsuarioAux+',  15, <%=mostraCaixaEnvio%>, <%=countEtapa %>, '<%=Request.Browser.Browser.ToString()%>', true)" class="btn_cor">Adicionar arquivo</a>');
                                            //$('#idRotaEtapaUsuario_<%=item.idEtapa %>').val(idRotaEtapaUsuarioAux);

                                            var idUsuario = <%=idUsuario%>;
                                            var idEtapa = <%=item.idEtapa %>;
                                            var mostraCaixaEnvio = <%=mostraCaixaEnvio%>;
                                            var countEtapa = <%=countEtapa %>;
                                            var strBrowser = "'<%=Request.Browser.Browser.ToString()%>'";
                                            var idRotaEtapaUsuario = "#idRotaEtapaUsuario_" + <%=item.idEtapa %>;

                                            $("#idEtapa_" + idEtapa).addClass("idEtapaClass_" + idRotaEtapaUsuarioAux);
                                            $(".idEtapaClass_" + idRotaEtapaUsuarioAux).val(idEtapa);

                                            var aLink = "<a href='javascript:void(0)' onclick=abreUploadCaminhosAluno("+idEtapa+","+idRotaEtapaUsuarioAux+",15,"+mostraCaixaEnvio+","+countEtapa+","+strBrowser+",true) class='btn_cor'>Adicionar arquivo</a>";

                                            //alert(teste123);


                                            //<a href="javascript:void(0)" onclick="abreUploadCaminhosAluno(<%=idUsuario%>, <%=item.idEtapa %>, <%=item.id%>,  15, <%=mostraCaixaEnvio%>, <%=countEtapa %>, '<%=Request.Browser.Browser.ToString()%>', true)" class="btn_cor">Adicionar arquivo</a>

                                            //alert(idRotaEtapaUsuarioAux + "-" + idUsuario + "-" + idEtapa + "-" + mostraCaixaEnvio + "-" + countEtapa);

                                            
                                            
                                            var classIdEtapa = ".cx_" + <%=item.idEtapa %>;
                                            var classBtnUp = ".btnUp_" + <%=item.idEtapa %>;
                                            var classArq = "cx_arq_" + idRotaEtapaUsuarioAux;


                                            $(classBtnUp).html(aLink);

                                            $(classIdEtapa).addClass(classArq);
                                            $(idRotaEtapaUsuario).val(idRotaEtapaUsuarioAux);
                                            $(classIdEtapa).attr("idAuxRotaEtapaUsuario", idRotaEtapaUsuarioAux);

                                            carregaArquivosCaminho(idRotaEtapaUsuarioAux);

                                        });
                                    </script> 
                                    <%
                                    if (Model.dtmInicio <= DateTime.Now && Model.dtmFimAgendamento > DateTime.Now)
                                    { 
                                    %>
                                        <div class="divBtnUpload btnUp_<%=item.idEtapa %>">
                                        </div>

                                    <div class="drop_caixa sobedesce_material cx_<%=item.idEtapa %>" id="countt_" style="display: none">
                                    
                                    </div>
                                   <%} %>

                                </div>
                            </div>
                        </div>
                        <%
                    }
                    if(item.Etapa.lCodigoDidatico.Count > 0){
                        %>
                        <h5> <i class="codlip_icon"></i> Códigos do livro didático</h5>
                        <div class="infos_cods">
                            <% 
                            foreach(var codigo in item.Etapa.lCodigoDidatico){
                                string strTitulo = codigo.strTituloCodigo;
                                string strCodigo = codigo.strCodigo;
                                string strURL = codigo.strURL;                                
                                
                                %>
                                <p>
                                    <%=strCodigo%> - <a href="<%=strURL%>" target="_blank" class="bt_normal"><%=strTitulo %> <span class="c-novapagina"></span> </a>
                                </p>    
                                <%            
                            }
                            %>
          		       </div> 
                       <hr>           
                       <%
                    }           
                    %>
                    
                </div>

                <%
            
                if (item.strComentario != "" && item.strComentario != null && item.strComentario.Length > 0)
                {
                    %>
                    <h5>Comentários do Professor</h5>
                    <p><%=item.strComentario %></p>
                    <hr>
                    <%
                }
                
                if (item.Etapa.recursoItem.idRecurso == 1)
                {
					if(item.bolConcluido) {
                    %>
                    <a class="btn_laranja left <%=s_aClass%> listaEtapas" href="javascript:void(0)" rel="<%=s_rel %>" idEtapa="<%=item.idEtapa %>" idRotaEtapaUsuario="<%=item.id %>" idRotaUsuario="<%=item.idRotaUsuario %>" idrecurso="<%=item.Etapa.recursoItem.idRecurso %>" idAvaliacao="<%=idAvaliacao %>" intOrdemAgendamento="<%=intOrdemAgendamento %>" idRotaAgendamento="<%=idRotaAgendamento %>" onclick="">Visualizar avaliação</a><br />
                    <%
					} else {
                    %>
                    <a class="btn_laranja left <%=s_aClass%> listaEtapas" href="javascript:void(0)" rel="<%=s_rel %>" idEtapa="<%=item.idEtapa %>" idRotaEtapaUsuario="<%=item.id %>" idRotaUsuario="<%=item.idRotaUsuario %>" idrecurso="<%=item.Etapa.recursoItem.idRecurso %>" idAvaliacao="<%=idAvaliacao %>" intOrdemAgendamento="<%=intOrdemAgendamento %>" idRotaAgendamento="<%=idRotaAgendamento %>" onclick="">Fazer avaliação</a><br />
                    <%
					}
                }
                if (item.Etapa.recursoItem.idRecurso == 9)
                {
                    %>
                        <a class="btn_laranja left <%=s_aClass%> listaEtapas" href="javascript:void(0)" rel="<%=s_rel %>" idEtapa="<%=item.idEtapa %>" idRotaEtapaUsuario="<%=item.id %>" onclick="<%=s_onClick%>" idRotaUsuario="<%=item.idRotaUsuario %>" idrecurso="<%=item.Etapa.recursoItem.idRecurso %>" idAvaliacao="<%=idAvaliacao %>" intOrdemAgendamento="<%=intOrdemAgendamento %>" idRotaAgendamento="<%=idRotaAgendamento %>"><span></span>Abrir PDF</a><br />
                    <%
                }                           
     
             if (item.Etapa.recursoItem.idRecurso == 12) // Baú de atividades
                {
                    %>
                        <a class="btn_laranja left <%=s_aClass%> listaEtapas" href="javascript:void(0)" rel='<%=s_rel %>' idEtapa="<%=item.idEtapa %>" idRotaEtapaUsuario="<%=item.id %>" onclick="<%=s_onClick%>" idRotaUsuario="<%=item.idRotaUsuario %>" idrecurso="<%=item.Etapa.recursoItem.idRecurso %>" idAvaliacao="<%=idAvaliacao %>" intOrdemAgendamento="<%=intOrdemAgendamento %>" idRotaAgendamento="<%=idRotaAgendamento %>"><span></span>Abrir Jogo</a><br />
                    <%
                }      
                %>
                
                <div class="botoes_orientacao_player">
                    <%
                        if (Model.Caminho.intTipo.Equals(1))
                        {
                            %>
                            <a href="/ava/caminhos/home/resumo/<%=Model.idCaminhoAgendamento %>" class="btn_cinza clickResumoCaminho"><span class="FontAwesome"></span>Resumo do caminho</a>
                            <%
                        }
                    
                        if (!contadorTarefa.Equals(1))
                        {
                            %>
                            <a href="javascript:void(0);" class="btn_cinza anterior"><span class="FontAwesome"></span>Tarefa anterior</a>
                            <%
                        }
                        if (!Model.lCaminhoEtapaUsuario.Count.Equals(contadorTarefa))
                        {
                            %>
                            <a href="javascript:void(0);" class="btn_cinza proximo">Proxima tarefa<span class="FontAwesome"></span></a>
                            <%
                        }
                    %>
					
				</div>

            </div>                    
            <%

                    
            idCaminho = Model.id;

            s_aClass = "";
            s_hRef = "";
            s_rel = "";
            s_classEtapaCorrente = "";   
            s_onClick = "";
            

        }
                

        %>               
        <div class="placa_paperline ">
                

            <%
                if (Model.dtmInicio <= DateTime.Now && Model.dtmFimAgendamento > DateTime.Now)
                {
                    %><p class="td_status td_status_emandamento din"><span>EM ANDAMENTO</span></p>
                    <%
                }
                else
                {
                    %>
                    <p class="td_status td_status_encerrado din"><span>ENCERRADO</span></p>
                    <%
                }
                                                                 
            %><!--</span></p>-->
            <p><span> de: </span> <span class="minor_date din"><%=Model.dtmInicio.ToString("dd/MM/yy HH:mm")%></span> <br>
               
            <span> até: </span> <span class="minor_date din"><%=Model.dtmFimAgendamento.ToString("dd/MM/yy HH:mm")%></span></p>
            <a class="btn_laranja ver_conteudo awesome awesome-green" id="verConteudoFancy" href="javascript:verConteudoFancy();" style="margin-left: 30px;">
                 Abrir tela cheia
            </a>
            <div id="conteudoFancy"></div>
        </div>
        <!--<div class="placa_botao">
            <a href="/ava/caminhos" class="large awesome awesome-green">Ir para lista de caminhos e tarefas</a>
        </div>-->
                
    
</aside>
