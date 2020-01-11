<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.CaminhoUsuario>" %>
<%
    bool bolConcluido = true;
    int qtdEtapas = Model.lCaminhoEtapaUsuario.Count;
    int etapasConcluidas = 0;
    for (int i = 0; i < qtdEtapas; i++)
    {
        if (!Model.lCaminhoEtapaUsuario[i].bolConcluido)
        {
            bolConcluido = false;
        }
        else
        {
            etapasConcluidas++;
        }
    }
%>
				<div class="placa_verde">
					<h2 class="din"><a href="#" class=""><%=Model.Caminho.titulo%></a></h2>
                    <%
                    if (!bolConcluido)
                    {
                    %>
					    <p>Tarefas completas: 
						    <span class="geral_etapas"><%=etapasConcluidas%></span> 
						    de 
						    <span class="geral_etapas"><%=qtdEtapas%></span> 
					    </p>
                    <%
                    }
                    if (bolConcluido)
                    {
                        %>
                        <p class="e_finalizada">Tarefas finalizadas!
						    <span class="feito"></span>
					    </p>
                        <%
                    }
                    %>
					
					<span class="seta_resumo sprite_player"></span>
                    
                    <span class="concluido sprite_player" tipo="leitura"></span>
				</div>
                <%
                    if (qtdEtapas > 0)
                    {
                        int contador = 0;
                        foreach (Caminhos.Models.CaminhoEtapaUsuario camEtapaUsuario in Model.lCaminhoEtapaUsuario)
                        {
                            
                            contador++;
                            %>
                            <div class="placa_amarela ">
					            <a href="/ava/caminhos/home/player/<%=Model.idCaminhoAgendamento %>/<%=camEtapaUsuario.Etapa.id %>" class="">
						            TAREFA <%=contador %>
						            <span class="titulo_tarefa din"><%=camEtapaUsuario.Etapa.strEtapa %></span>
						            <span>
                                    <%
                                        switch (camEtapaUsuario.Etapa.recursoItem.idRecurso)
                                        {

                                            case 1:
                                                //Avaliações                           
                                                Response.Write("Avaliação");
                                                break;
                                            case 2:
                                                //Conteúdo Multimídia
                                                
                                                Response.Write("Conteúdo Multimídia");
                                                

                                                break;
                                            case 3:
                                                //Interpretando
                                                Response.Write("Interpretando");
                                                
                                                break;
                                            case 4:
                                                //Banco de imagens
                                                Response.Write("Banco de Imagem");
                                                
                                                break;
                                            case 5:
                                                //Museu Virtual
                                                Response.Write("Museu Virtual");
                                                
                                                break;
                                            case 6:
                                                //Linha do Tempo
                                                Response.Write("Linha do Tempo");
                                                
                                                break;
                                            case 7:
                                                //Mapoteca
                                                Response.Write("Mapoteca");
                                                
                                                break;
                                            case 8:
                                                //Fóruns
                                                Response.Write("Fórum");
                                                
                                                break;
                                            case 9:
                                                //Obras Literárias
                                                Response.Write("Obra Literária");
                                                
                                                break;
                                            case 10:
                                                //Simuladores
                                                Response.Write("Simulador");
                                                
                                                break;
                                            case 11:
                                                // etapa do meu jeito
                                                Response.Write("Etapa do meu jeito");
                                                
                                                break;
                                        }
                                    %></span>
						            <span class="seta_etapa"><img src="/ava/staticContent/Common/img/perfil/seta_amarela.png" width="33" height="34"></span>
                                    <%
                                        if (camEtapaUsuario.bolConcluido)
                                        {
                                            %>
                                            <span class="concluido sprite_player"></span>
                                            <%
                                        }
                                 %>
					            </a>
				            </div>
                            <%
                        }
                    }    
                %>
				
				<div class="placa_paperline">
					<%
                        if (Model.dtmInicio <= DateTime.Now && Model.dtmFim > DateTime.Now)
                        {
                            %><p class="td_status td_status_emandamento din"><span>EM ANDAMENTO</span></p>
                            <%
                        }
                        else if (Model.dtmInicio > DateTime.Now)
                        {
                            %>
                            <p class="td_status  td_status_embreve din"><span>EM BREVE</span></p>
                            <%
                        }
                        else
                        {
                            %>
                            <p class="td_status td_status_encerrado din"><span>ENCERRADO</span></p>
                            <%
                        }
                                                                 
                    %>
					<p>
						<span> de: </span> 
						<span class="minor_date din"><%=Model.dtmInicio.ToString("dd/MM/yy HH:mm")%></span> 
						<br>
						<span> até: </span> 
						<span class="minor_date din"><%=Model.dtmFim.ToString("dd/MM/yy HH:mm")%></span>
					</p>
				</div>
				
				

