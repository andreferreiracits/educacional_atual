<%@ Control Language="C#" Debug="true" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.CaminhoUsuario>>" %>

<%
int intColSpan = 3;
bool bolAdm = Convert.ToBoolean(ViewData["admRedeSocial"]);
bool bolResponsavel = Convert.ToBoolean(ViewData["bolResponsavel"]);
bool bolAluno = Convert.ToBoolean(ViewData["bolAluno"]);
int intAlgumaEtapa = 0;
var strClassImagem = "";

if (bolAdm)
{
    intColSpan = 4;
}
    
if (Model.Count > 0)
{
    foreach (var atividade in Model)
    {
        intAlgumaEtapa = 0; 
        int tipoAtividade = atividade.Caminho.intTipo; //1=caminho, 2=tarefa, 3=avaliacao
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
        var notaAluno = "";

        //Response.Write( " Atividade Situação:" +atividade.intSituacao + " / intStatus  :"+atividade.intStatus + "   /  bolEncAutomatico:"+atividade.bolEncAutomatico+ "  / bolConcluido:"+atividade.bolConcluido );
        
        if (tipoAtividade == 3)
        {
            if(atividade.AvalDetalhes.divulgacaoTipo == 0){ // não mostra nota
                notaAluno = "--";
            }else if(atividade.AvalDetalhes.divulgacaoTipo == 1 || atividade.AvalDetalhes.divulgacaoTipo == 2){ //após encerar
                if (atividade.intSituacao == 3 || atividade.intSituacao == 4 || (atividade.AvalDetalhes.resultado && atividade.intSituacao == 1))
                {
                    notaAluno = atividade.AvalDetalhes.nota;
                }
                else
                {
                    notaAluno = "--";
                }          
            }else if(atividade.AvalDetalhes.divulgacaoTipo == 3){ //após a data final do agendamento

                if (DateTime.Now >= Convert.ToDateTime(atividade.AvalDetalhes.periodoFim))
                {
                    notaAluno = atividade.AvalDetalhes.nota;
                }
                else
                {
                    notaAluno = "--";
                }
            }else if(atividade.AvalDetalhes.divulgacaoTipo == 4){ //após data específica
                if (DateTime.Now >= Convert.ToDateTime(atividade.AvalDetalhes.divulgacaoData))
                {
                    notaAluno = atividade.AvalDetalhes.nota;
                }
                else
                {
                    notaAluno = "--";
                }
            }            
        }
        

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

        switch (tipoAtividade)
        {
            case 1: 
                strClassImagem = "caminho";
                break;
            case 2: 
                strClassImagem = "tarefa";
                break;
            case 3:
                strClassImagem = "avaliacao-2";
                break;
        }
        
        
        %>

        <tr>
            <td class="border-lateral line" colspan="4">
                <table style="width: 100%;">
                    <tr>
                        <td width="55%" class="">
                            <div class="box-itens verDetalhes">
                                <div class="<%=strClassImagem%>"></div>
                                <div class="title-avaliacao">
                                    <%                                         
                                    nomeAtividade = RedeSocialAVA.FuncoesTexto.ReverterAspas(nomeAtividade);
                                    nomeAtividade = RedeSocialAVA.FuncoesTexto.ArrumaAspas(nomeAtividade);                        
                                    %>
                                    <%=nomeAtividade%>                                
                                </div>                                
                            </div>
                            <div class="box-itens">
                                <%

                                //Response.Write("BancoAtividadesCentralizadoTodos");


                                if (atividade.dtmFimAgendamento > DateTime.Now && !bolAdm && !bolResponsavel)
                                {
                                    if (tipoAtividade == 3)
                                    {
                                        if (atividade.intSituacao == 1)
                                        {
                                        %>                 
                                            <button class="btn btn-fazer" onclick="abreAvaliacao(<%=atividade.intOrdemAgendamento%>);return false;">fazer</button>                                                
                                        <%
                                        }
                                        else if (atividade.intSituacao != 2)
                                        {
                                        %>                 
                                            <button class="btn btn-fazer" onclick="abreAvaliacao(<%=atividade.intOrdemAgendamento%>);return false;">visualizar</button>                                                                                            
                                        <% 
                                        }
                                    }
                                    else
                                    {
                                        if (atividade.intSituacao == 1){
                                        %>                                            
                                            <button class="btn btn-fazer" onclick="fazerCaminhoTarefa(<%=atividade.idCaminhoAgendamento%>)">fazer</button>     
                                        <%
                                        }
                                    }
                                } 
                                else
                                {
                                    if (!bolAdm && !bolResponsavel)
                                    {
                                        if (tipoAtividade == 3)
                                        {
                                        %>
                                            <button class="btn btn-fazer" onclick="abreAvaliacao(<%=atividade.intOrdemAgendamento%>);return false;">visualizar</button>                                                 
                                        <% 
                                        }
                                        else
                                        {                                        
                                        %>
                                            <button class="btn btn-fazer" onclick="fazerCaminhoTarefa(<%=atividade.idCaminhoAgendamento%>)">visualizar</button>                                                                          
                                        <%
                                        }
                                    }
                                   	if (bolResponsavel && atividade.intSituacao == 4 && tipoAtividade == 3)
	                                {
                                        string vetorAux = ViewData["idAgendamento_idAvaliacao"].ToString();
		                                %>  <!--<p><%=vetorAux%></p>        -->
		                                <%								
                                        string vetAux = "";
                                        vetAux = (vetorAux.EndsWith(";")) ? vetorAux.Substring(0, vetorAux.Length - 1).Trim() : vetorAux.Trim();
                                        if (vetAux.IndexOf(';') > -1)
                                        {
                                            string[] vaux = vetAux.Split(';');
                                            foreach (string vet in vaux)
                                            {
                                                string[] vvaux = vet.Split('_');
                                                if (vvaux[0] == Convert.ToString(atividade.intOrdemAgendamento))
                                                {
		                                %>     
			                                <a href="javascript:void(0);" class="btn_verde_min disp_iblock" alt="visualizar" onclick="abreAvaliacao(<%=vvaux[1]%>);return false;" tipoPapel="<%=bolResponsavel%>">visualizar</a>
		                                <%								
                                                }
                                                //else
                                                //{
		                                %>
			                                <!--<a href="javascript:void(0);" class="btn_verde_min disp_iblock" alt="visualizar" onclick="abreAvaliacao(<%=atividade.intOrdemAgendamento%>);return false;" tipoPapel="<%=bolResponsavel%>">visualizar 2</a>-->
		                                <%								
                                                //}

                                            }
                                        }
                                        else
                                        {
                                            string[] vvaux = vetAux.Split('_');
                                            if (vvaux[0] == Convert.ToString(atividade.intOrdemAgendamento))
                                            {
		                                %>     
			                                <a href="javascript:void(0);" class="btn_verde_min disp_iblock" alt="visualizar" onclick="abreAvaliacao(<%=vvaux[1]%>);return false;" tipoPapel="<%=bolResponsavel%>">visualizar</a>
		                                <%								
                                            }
                                        }							
	                                }
                                }                                
                                %>                                
                                <button class="btn detalhes">ver detalhes</button>
                            </div>    
                        </td>
                        <td width="15%" class="margin-left-td"><%=nomeDono%></td>
                        <td width="15%" class="margin-left-td">
                             <%
                                var dtInicioAg = dtmInicioAgdm.Replace(":", "h");
                                var dtInicio = dtInicioAg.Substring(0, 5);
                                var hrInicio = dtInicioAg.Substring(8, dtInicioAg.Length - 8);

                                var dtFimAg = dtmFimAgdm.Replace(":", "h");
                                var dtFim = dtFimAg.Substring(0, 5);
                                var hrFim = dtFimAg.Substring(8, dtFimAg.Length - 8);
                                    
                            %>
                            <p class="p-align">de <strong><%=dtInicio%></strong> - <%=hrInicio%></p>                             
                            <p class="p-align">até <strong><%=dtFim%></strong> - <%=hrFim%></p> 
                        </td>
                        <td width="20%" class="margin-left-td">
                            <%
                            var strClassSituacao = "";
                            var strSituacao = "";
                            switch (atividade.intSituacao)
                            {
                                case 1:
                                    strClassSituacao = "t-aberta";
                                    strSituacao = "Aberta";
                                    break;
                                case 2:
                                    strClassSituacao = "em-breve";
                                    strSituacao = "Em breve";
                                    break;
                                case 3:
                                    strClassSituacao = "encerrada";
                                    strSituacao = "Encerrada";
                                    break;
                                case 4:
                                    strClassSituacao = "resultado";
                                    strSituacao = "Resultados";
                                    break;
                                case 5:
                                    strClassSituacao = "nao-realizada";
                                    strSituacao = "Não realizada";
                                    break;
                                   
                            }
                            %>
                            <i class="<%=strClassSituacao %>"></i><%=strSituacao %>
                        </td>
                    </tr>
                </table>
                <div class="toggle">
                    <%
                    if (tipoAtividade == 1) // caminho
                    {    
                    %>
                    <section class="row show-grid">
						<% if (descricaoAtividade != null || descricaoAtividade.Length > 0)
                           {
                        %>                    
                        <div class="col-7">
                            <section class="box">
                                <header class="header-descricao">Descrição do caminho de aprendizagem</header>
                                <div class="conteudo"><%=descricaoAtividade%></div>           
                            </section>
                        </div>
                        <%
                           }
                        %>
						<div class="col-4 right">
							<section class="row show-grid">
								<div class="col-12">
									<section class="box">
										<header class="header-descricao-caminho">Tarefas concluídas: <%=numEtapasFeitas%> de <%=numEtapasExistentes%></header>
									</section>
								</div>
                                                              
								<div class="col-12">
                                <% if (atividade.Caminho.lTag.Count > 0 )
	                            	{  %>
									<div class="container-relative">
										<h3 class="h-tags">Tags:</h3>
                                         <%
                                        if (atividade.Caminho.lTag.Count > 0)
                                        {
                                            foreach (var tag in atividade.Caminho.lTag)
                                            {                                            
                                        %>
                                            <div class="tags">
											    <div class="tags-frente"></div><div class="tags-conteudos"><%=tag.strTag%></div>
										    </div>                                                                                                                          
                                        <%        
                                            }
                                        }
                                        else
                                        {                                            
                                            Response.Write("<span class='t-text'> Não foi adicionado tag para este caminho.</span>");
                                        }     
                                        %>  								
									</div>
                                <%  } %>
								</div>                                
							</section>
						</div>
					</section>
					<section class="row show-grid">
						<div class="col-7">
							<section>
								<header class="header-caminho">Tarefas deste caminho:</header>
								<div class="descricao">
									<div class="d-2 border-left">notas</div>
									<div class="d-2">nota máx.</div>
								</div>
                                <%
                        if (atividade.Caminho.lEtapa.Count > 0)
                        {

                            int qualEtapa = 0;
                            foreach (var etapa in atividade.Caminho.lEtapa)
                            {                                    
                                %>
								    <section class="row-caminho">
									    <div class="post-it"><div class="post-it-conteudo"><%=etapa.intEtapa%></div></div>
									    <div class="table-caminho">
										    <div class="t-10">
											    <h2 class="title-caminho"><%=etapa.strEtapa%></h2>
                                                <%
                                                if (!bolAdm && !bolResponsavel)
                                                {

                                                    if (atividade.intSituacao == 1)
                                                    {
                                                     
                                                %>
                                                    <button class="btn btn-fazer" onclick="javascript: window.open('/ava/caminhos/home/player/<%=atividade.idCaminhoAgendamento%>/<%=etapa.id%>')">fazer</button>                                                
                                                <%  }
                                                }
                                                %>					

                                                <a href="/ava/caminhos/home/VerOrientacoesEtapa/?idEtapa_intSituacao=<%=etapa.id%>_3" id="btVer_<%=etapa.id%>"></a>						
											    <button class="btn detalhes-caminho btnVerDetalhes" onclick="verOrientacoes(<%=etapa.id%>);">ver detalhes</button>
										    </div>

                                            <% 
                                if (atividadeValeNota)
                                {
                                            %>
										    <div class="t-2">
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
                                            </div>                                        
                                            <%
                                }
                                else
                                {
                                            %>
                                                <div class="t-2">--</div>
                                            <%
                                }


                                if (atividadeValeNota)
                                {
                                            %>
										    <div class="t-2">
                                                <%
                                    if (etapa.intValor > 0)
                                    {
                                        if (atividade.bolConcluido && atividade.dtmFimAgendamento > DateTime.Now && atividadeValeNota)
                                        {
                                            Response.Write("-");
                                        }
                                        else if (atividade.bolConcluido && atividade.intSituacao.Equals(3) && atividadeValeNota)
                                        {
                                            try
                                            {
                                                Response.Write(atividade.lCaminhoEtapaUsuario[qualEtapa].nota);
                                            }
                                            catch
                                            {
                                                Response.Write("-");
                                            }
                                        }
                                        else if (atividadeValeNota)
                                        {
                                            try
                                            {
                                                Response.Write(atividade.lCaminhoEtapaUsuario[qualEtapa].nota);
                                            }
                                            catch
                                            {
                                                Response.Write("-");
                                            }
                                        }
                                    }
                                    else
                                    {
                                        Response.Write("-");
                                    }
                                                %>                                   
                                            </div>
                                            <%
                                }
                                else
                                {
                                            %>
                                            <div class="t-2">--</div>
                                            <%
                                }
                                            %>
									    </div>
									    <div class="area-caminho"></div>
								    </section>
                            <%
                                qualEtapa++;
                            } // end foreach
                        }
                        else
                        {
                            Response.Write("<span>Nenhuma etapa criada para este caminho.</span>");
                        }
                        %>   

							</section>
						</div>
					</section>

                    <%
                    }     
                    %>

                    <%
                    if (tipoAtividade == 2) // tarefa
                    {    
                    %>
                    <section class="row show-grid">
                        <% if (descricaoAtividade != null || descricaoAtividade.Length > 0)
                           {
                        %>                    
                        <div class="col-7">
                            <section class="box">
                                <header class="header-descricao">Descrição da tarefa</header>
                                <div class="conteudo"><%=descricaoAtividade%></div>           
                            </section>
                        </div>
                        <%
                           }
                        %>
                        <div class="col-4 right">
                            <div class="box">
                                <div class="conteudo">
                                    <strong class="nota">
                                     <%                              
                            if (notaMaximaAtividade > 0)
                              {
                                     %>
                                        Nota:
                                        <% if (atividade.nota.ToString() == "" || (atividade.intSituacao == 1 || atividade.intSituacao == 2))
                                            {
                                                Response.Write("--");
                                            }
                                            else
                                            {
                                                Response.Write("<span class=\"color-blue\">" + atividade.nota + "</span>");
                                                %> de <%=notaMaximaAtividade%>
                                            <%}
                                            %>
                                            
                             <%  
                              }
                              else
                              {
                                    %>
                                        <div class="feed" idmensagem="" id="">
                                        Nota: Não se aplica
										</div>
                                    <%  
                              }                        
                                    %>
                                    </strong>    
                                </div>
                            </div>                                        
                        </div>
                    </section>
                    <section class="row show-grid">
                        <div class="col-7">
                            <section class="box">
                                <header class="header-descricao">ESTA TAREFA CONTÉM:</header>
                                <%                                    
                        if (atividade.Caminho.lEtapa[0].recursoItem.idRecurso != 11)
                        {

                            if (atividade.intSituacao == 3 || atividade.intSituacao == 4 && atividade.Caminho.lEtapa[0].recursoItem.idRecurso > 1) //se o resultado estiver disponivel ou estiver encerrado mostra link no recurso
                            {
                                intAlgumaEtapa = 1;

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
                                        <div class="conteudo">
                                            <p><%=atividade.Caminho.lEtapa[0].recursoItem.strRecurso%></p>
                                            <img src="<%=atividade.Caminho.lEtapa[0].recursoItem.strThumbRecurso %>" class="align-text"> <%=atividade.Caminho.lEtapa[0].recursoItem.strTitulo%>
                                        </div>
                                    <%
                            }
                            else
                            {
                                intAlgumaEtapa = 1;                                    
                                        %>                                      
                                        <div class="conteudo">
                                            <p><%=atividade.Caminho.lEtapa[0].recursoItem.strRecurso%></p>
                                            <img src="<%=atividade.Caminho.lEtapa[0].recursoItem.strThumbRecurso %>" class="align-text"> <%=atividade.Caminho.lEtapa[0].recursoItem.strTitulo%>
                                        </div>                     
                                        <%                                            
                            }
                            
                            if (atividade.Caminho.lEtapa[0].recursoMidia.id > 0)
                            {
                                intAlgumaEtapa = 1; 
                                %>
                                <hr>
                                <h5><i class="midia_icon"></i> Vídeo enviado pelo professor </h5>                                
                                <%
                            }

                            if (atividade.Caminho.lEtapa[0].lArquivoEtapa.Count > 0)
                            {
                                intAlgumaEtapa = 1; 
                                %>
                                <hr>
                                <h5><i class="mapoio_icon"></i> Material de apoio </h5>                                
                                <%
                            }

                            if (atividade.Caminho.lEtapa[0].lRecursoLink.Count > 0)
                            {
                                intAlgumaEtapa = 1; 
                                %>
                                <hr>
                                <h5> <i class="links_icon"></i> Links enviados pelo professor</h5>                                
                                <%         
                            }

                            if (atividade.Caminho.lEtapa[0].lCodigoDidatico.Count > 0)
                            {
                                intAlgumaEtapa = 1; 
                                %>
                                <hr>
                                <h5> <i class="codlip_icon"></i> Códigos do livro didático</h5>
                                <%         
                            }
                        }%>
                            </section>
                        </div>
                        <div class="col-4 right">
                            <section class="row show-grid">
                                <div class="col-12">
                                    <section class="box">
                                        <header class="header-descricao">Esta tarefa requer</header>
                                        <%
                                        if (atividade.Caminho.lEtapa[0].recursoEntrega.id > 0)
                                        {
                                            %>
                                            <div class="conteudo">Enviar um arquivo</div>
                                            <%        
                                        }

                                        if (atividade.Caminho.lEtapa[0].recursoItem.idRecurso == 1)
                                        {
                                            %>
                                            <div class="conteudo">Fazer uma avaliação</div>
                                            <%        
                                        }
                                        %>              
                                        <div class="conteudo">Visualizar conteúdo</div>
                                    </section>
                                </div>
                                <div class="col-12">
                                	<% if (atividade.Caminho.lTag.Count > 0 )
                            		{  %>
                                    <div class="container-relative">
                                        <h3 class="h-tags">Tags:</h3>
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
                                            Response.Write("<span class='t-text'>Não foi adicionado tag para esta tarefa.</span>");
                                        }
                                        %>                                                                    
                                    </div>
                                 <%  } %>
                                </div>
                            </section>
                        </div>
                    </section>
                    <%
                    }     
                    %>
                    <%
                    if (tipoAtividade == 3) // avaliação
                    {    
                    %>
                    
                    <section class="row show-grid">
                        <div class="col-7">
                            <section class="box">
                                <header class="header-descricao">Descrição</header>
                                <div class="conteudo"><%=atividade.Caminho.descricao %></div>
                            </section>
                        </div>
                        <%if (atividade.AvalDetalhes.tipo == 1) //é avaliacao e não pesquisa
                          {
                        %>
                        <div class="col-4 right">
                            <div class="box margin-bottom">
                                <div class="conteudo">
                                <%
                              var mostraNota = false;
                              var naoseaplica = false;

                              if (atividade.AvalDetalhes.valor != "" && atividade.AvalDetalhes.valor != "0,00")
                              {

                                  if (atividade.AvalDetalhes.divulgacaoTipo == 4 && DateTime.Now >= Convert.ToDateTime(atividade.AvalDetalhes.divulgacaoData))
                                  {
                                      mostraNota = true;
                                  }
                                  else if ((atividade.AvalDetalhes.divulgacaoTipo == 1 || atividade.AvalDetalhes.divulgacaoTipo == 2) && (atividade.intSituacao == 3 || atividade.intSituacao == 4))
                                  {
                                      mostraNota = true;
                                  }
                                  else if (atividade.AvalDetalhes.divulgacaoTipo == 3 && DateTime.Now >= Convert.ToDateTime(atividade.AvalDetalhes.periodoFim))
                                  {
                                      mostraNota = true;
                                  }
                              }
                              else
                              {
                                  naoseaplica = true;
                              }
                              
                              
                            
                                %>
                            
                                    <strong class="nota">
                                     <%                              
                              if (naoseaplica == false)
                              {
                                     %>
                                        Nota:  
                                    <% if (atividade.AvalDetalhes.resultado && atividade.intSituacao == 1)
                                       {
                                           Response.Write("<span class=\"color-blue\">" + notaAluno + "</span>");
                                           if (notaAluno.IndexOf("--") < 0)
                                           {
                                           %> de <%=atividade.AvalDetalhes.valor%>
                                        <%}
                                       }
                                       else if (atividade.nota.ToString() == "" || (atividade.intSituacao == 1 || atividade.intSituacao == 2))
                                       {
                                           Response.Write("--");
                                       }
                                       else
                                       {
                                           Response.Write("<span class=\"color-blue\">" + notaAluno + "</span>");
                                           if (notaAluno.IndexOf("--") < 0)
                                           {
                                            %> de <%=atividade.AvalDetalhes.valor%>
                                        <%}
                                       }
                                        %>
                                        
                              <%  
                              }
                              else
                              {
                                    %>
                                        Nota: Não se aplica
                                    <%  
                              }                        
                                    %>
                                    </strong>    
                                </div>
                            </div>           
                            <div class="box margin-bottom">
                                <div class="conteudo">
                                    <div class="header-avaliacoes">
                                        <h4 class="h4-avaliacoes">
                                            <%
                              int estado = atividade.AvalDetalhes.estado;
                              switch (estado)
                              {
                                  case 0: Response.Write("<h2 class='statusAval'>Não realizada <i class='_naofiz FontAwesome'></i></h2>"); break;
                                  case 1: Response.Write("<h2 class='statusAval'>Iniciada <i class='_fiz FontAwesome'></i></h2> "); break;
                                  case 2: Response.Write("<h2 class='statusAval'>Finalizada <i class='_fiz FontAwesome'></i></h2> "); break;
                              }                                 
                                        
                                            %>         
                                        </h4><!--<div class="checked"></div>-->
                                    </div>
                                    <p class="conteudo-avaliacoes">
                                        <%
                              bool resultado = atividade.AvalDetalhes.resultado;
                              if (resultado)
                              {
                                  if (atividade.AvalDetalhes.divulgacaoTipo == 3 && Convert.ToDateTime(atividade.AvalDetalhes.periodoFim) >= DateTime.Now)
                                  {
                                      Response.Write("Aguarde a data do resultado");
                                  }
                                  else if (atividade.AvalDetalhes.divulgacaoTipo == 1 || atividade.AvalDetalhes.divulgacaoTipo == 2)
                                  {
                                      Response.Write("Resultado disponível");
                                  }
                              }
                              else if (!resultado && atividade.AvalDetalhes.divulgacaoCorrecao != 0 && atividade.intSituacao != 1 && atividade.intSituacao != 2 && atividade.intSituacao != 5)
                              {
                                  Response.Write("Aguardando correção");
                              }
                                        %>
                                    </p>
                                </div>
                            </div>
                            <section class="box margin-bottom">
                                <div class="conteudo">
                                    <p><strong>Número de questões:</strong><%=atividade.AvalDetalhes.totalQuestoes%><p>
                                    <p class="reset-margin"><strong>Data de divulgação dos resultados:</strong></p>
                                    <p class="reset-margin-top">
                                        <%
                              int divulgacaoTipo = atividade.AvalDetalhes.divulgacaoTipo;
                              switch (divulgacaoTipo)
                              {
                                  case 0: Response.Write("Não será divulgada"); break;
                                  case 1: Response.Write("Após encerramento"); break;
                                  case 2: Response.Write("Após encerramento"); break;
                                  case 3: Response.Write("Após data final do agendamento"); break;
                                  case 4: Response.Write("Após " + atividade.AvalDetalhes.divulgacaoData.ToString()); break;
                              }
                                   
                                        
                                        %>            
                                    </p>
                                    <p class="reset-margin"><strong>Correção de questões objetivas:</strong></p>
                                    <p class="reset-margin-top">
                                        <%
                              int tipoCorrecao = atividade.AvalDetalhes.tipoCorrecao;
                              switch (tipoCorrecao)
                              {
                                  case 0: Response.Write("Resposta exata"); break;
                                  case 1: Response.Write("Parcial com redutor"); break;
                                  case 2: Response.Write("Parcial sem redutor"); break;
                              }
                                   
                                        
                                        %>         
                                    </p>
                                </div>
                            </section>
                        </div>
                    </section>
                    <%
                          }
                    }     
                    %>
                </div>                            
            </td>
        </tr>
    
       
        
        <%        
    }
}
else
{
    %>
    <tr>
        <td colspan="3">
            <table style="width: 100%;">
                <tr>
                    <td width="65%">
                        <h1 class="padding-conteudo">Não há atividades. =)</h1>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <% 
}   
%> 
