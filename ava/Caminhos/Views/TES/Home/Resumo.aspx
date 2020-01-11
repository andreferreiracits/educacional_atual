<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Caminhos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Caminhos.Models.CaminhoUsuario>" %>


<asp:content id="Content2" ContentPlaceHolderID="PageJsArea" runat="server">   
    <script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/playerRota_2.0.6.js") %><%=Url.TimeStampLink() %>"></script>
</asp:content>

<asp:content id="Content1" ContentPlaceHolderID="ContentPlaceHolderPrincipal" runat="server">
    <%
    string rex = "<(script|style)\\b[^>]*?>.*?</\\1>";
    %>
    <script type="text/javascript">
    jQuery(function ($) {
        $("#ava_wrap").removeClass("painel_controle").addClass("criando");        
        var idRota = <%=Model.Caminho.id%>;
    });    
    </script>

    <section id="ava_container" class="as1">
    
        <div class="player_atividades">
		    <h1 class="blokletters"><%=Model.Caminho.intTipo == 1 ? "Caminho de aprendizagem" : "Tarefa" %></h1> 
		    <a href="/ava/caminhos" class="voltar_caminhos_tarefas_player btn_cinza">Lista de Caminhos e Tarefas</a>
	    </div>
        <div class="abas_player_atividades ui-tabs ui-widget ui-widget-content ui-corner-all" id="abas_player">
			<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
				<li class="ui-state-default ui-corner-top ui-tabs-selected ui-state-active">
					<a class="orientacoes_player" href="#ui-tabs-1">Resumo do Caminho</a>
				</li>
			</ul><div id="ui-tabs-1" class="ui-tabs-panel ui-widget-content ui-corner-bottom"></div>
			<div class="aba_player_borda_conteudo"></div>
		</div>

        <div class="resumo_caminho">
			<h1 class="din"><%=Model.Caminho.titulo %></h1>
			<ul class="caixa_requisito">
				<li class="din">
					ESTE CAMINHO VALE
					<span><strong><%=Model.Caminho.totalValor.Equals(0) ? "-" : Model.Caminho.totalValor.ToString()%></strong></span>
				</li>
			</ul><br><br>
			<p><%=Model.Caminho.descricao %></p>

			<div class="requisitos_caminhos_tarefas">
				<h2 class="din sprite_player">Resumo das Tarefas</h2>
			</div>
            <%  
                int contadorEtapas = 0;
                if (Model.lCaminhoEtapaUsuario.Count > 0)
                {
                    
                    
                    foreach (Caminhos.Models.CaminhoEtapaUsuario camEtapaUsuario in Model.lCaminhoEtapaUsuario)
                    {
                        contadorEtapas++;
                        
                    %>
                    <div class="resumo_tarefa_caminho">
				        <a href="/ava/caminhos/home/player/<%=Model.idCaminhoAgendamento %>/<%=camEtapaUsuario.Etapa.id %>" class="numero_tarefa_caminho">
					        <span class="din"><%=contadorEtapas %></span>
				        </a>
				        <h3><%=camEtapaUsuario.Etapa.strEtapa%></h3>
                        <%
                            if (camEtapaUsuario.bolConcluido)
                            {
                                %>
                                <span class="concluido sprite_player"></span>
                                <%
                            }
                        %>
				        
				        <p><%=Regex.Replace(Server.HtmlDecode(camEtapaUsuario.Etapa.strDescricao), rex, "", RegexOptions.IgnoreCase | RegexOptions.Singleline)%>
				        </p>
                        <!--<img width="74" height="74" src="<%=camEtapaUsuario.Etapa.recursoItem.strThumbRecurso %>" alt="<%=camEtapaUsuario.Etapa.recursoItem.strRecurso %>">-->
				        <div class="especificacoes_resumo_tarefa">
					        <a href="/ava/caminhos/home/player/<%=Model.idCaminhoAgendamento %>/<%=camEtapaUsuario.Etapa.id %>" class="btn_cinza">Ver</a>
					        <ul class="caixa_requisito">
						        <li class="din">
							        REQUISITO
							        <span class="tipo_requisito"><strong class="<%=!camEtapaUsuario.bolConcluido ? "completo" : "" %>">
                                    <% 
                                        switch (camEtapaUsuario.Etapa.recursoItem.idRecurso)
                                        {
                                                
                                            case 1:
                                                //Avaliações                           
                                                Response.Write("Fazer Avaliação");
                                                break;
                                            case 2:
                                                //Conteúdo Multimídia
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
                                                if (camEtapaUsuario.Etapa.recursoEntrega.id > 0)
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
							        <span><strong><%=camEtapaUsuario.Etapa.intValor.Equals(0) ? "-" : camEtapaUsuario.Etapa.intValor.ToString()%></strong></span>
						        </li>
					        </ul>
				        </div>	
			        </div> 
                        <%
                    }
                }
            %>	
			</div>
       <aside id="ava_barralateral-direita" class="barra_1024">
       <%Html.RenderPartial("Partials/PreviewAluno"); %>
       </aside>


    </section>

</asp:content>

