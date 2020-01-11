<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Agenda.Models.Evento>>" %>
<%
    DateTime data = (DateTime)ViewData["dataSelecionada"];
    bool flagGrupo = (bool)ViewData["flagGrupo"];
    bool bolProjetos = Convert.ToBoolean(ViewData["bolProjetos"]);
    bool bolMostrarFiltro = ViewData["bolMostrarFiltro"] == null ? true : (bool)ViewData["bolMostrarFiltro"];
    var bolPaginaEscola = ViewData["bolPaginaEscola"] == null ? false : (bool)ViewData["bolPaginaEscola"];
    string uAgent = Request.UserAgent.ToLower();
    bool bolMobile = false;
    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }
    
    if(bolMostrarFiltro)
        bolMostrarFiltro = !bolProjetos && !bolPaginaEscola;
    %>

                    <script type="text/javascript">
                        var newURL =window.location.pathname;
                        if(newURL == "/AVA/Perfil/MeuPerfil"){
                            $(".visualizar_evento").addClass('perfil');
                        }else{
                            $(".visualizar_evento").removeClass('perfil');
                        }
                    </script>


                    <div class="box_agenda visualizar_evento">
					<a href="/" title="Dia anterior" class="anterior_dia_agenda"></a>
					<h2>Eventos do dia <%=data.ToString("dd/MM") %></h2>
					<a href="/" title="Proximo dia" class="proximo_dia_agenda"></a>

                    <% 
                    if (bolMostrarFiltro)
                    {
                        %>
                        <form>
						    <ul class="filtro_agenda_eventos filtro_agenda_home filtro_box_agenda">
							    <strong>Filtrar por &#9660</strong>
							    <li>	
						            <input type="checkbox" id="filtroPortalResult" class="meusChecksResult" value="3">
						            <label for="filtroPortalResult">Educacional</label>
					            </li>
					            <li>	
						            <input type="checkbox" id="filtroEscolaResult" class="meusChecksResult" value="2">
						            <label for="filtroEscolaResult">Escola</label>
					            </li>
					            <li>	
						            <input type="checkbox" id="filtroTurmaResult" class="meusChecksResult" value="4">
						            <label for="filtroTurmaResult">Turma</label>
					            </li>
					            <li>	
						            <input type="checkbox" id="filtroPessoalResult" class="meusChecksResult" value="1">
						            <label for="filtroPessoalResult">Pessoal</label>
					            </li>
                                <%
                                    if (flagGrupo)
                                    {
                                    %>
                                        <li>	
						                    <input type="checkbox" id="filtroGrupoResult" class="meusChecksResult" value="5">
						                    <label for="filtroGrupoResult">Grupos</label>
					                    </li>   
                                    <%
                                    }
                                %>
						    </ul>
					    </form>    
                        <%       
                    }    
                        
                    if (Model != null && Model.Count > 0)
                    {
                        string strCorRGB = null;
                        %>
                        <div class="agenda_lista_scroll" <%=(!bolMostrarFiltro) ? " style=\"margin-top:0px;\"" : "" %>>
                            <ul>
                            <%
                            foreach (Agenda.Models.Evento evento in Model)
                            {
                                switch (evento.idCategoria)
                                {
                                    case 1:
                                        strCorRGB = "#6d779c";
                                        break;
                                    case 2:
                                        if (evento.eventoTipo != null && evento.eventoTipo.cor != null)
                                        {
                                            strCorRGB = "#" + evento.eventoTipo.cor.strRGB;
                                        }
                                        else
                                        {
                                            strCorRGB = "#000";
                                        }
                                        break;
                                    case 3:
                                        strCorRGB = "#9c8c6d";
                                        break;
                                    case 4:
                                        strCorRGB = "#7c9c6d";
                                        break;
                                    case 5:
                                        strCorRGB = "#9b4a4a";
                                        break;
                                }
                                    %>
                                    <li <%=!evento.dtmInicio.Equals(evento.dtmFim) ? "class=\"agd_evtContinuo\"" : "" %> id-evento="<%=evento.idEvento %>">
                                        <%
                                        if (evento.donoEvento)
                                        {
                                            %>
                                                <a href="javascript:void(0);" title="excluir" class="excluir_evento_agenda <%=bolMobile ? "mobile" : "" %>">&nbsp;</a>
							                    <a href="javascript:void(0);" title="editar" class="editar_evento_agenda <%=bolMobile ? "mobile" : "" %>">&nbsp;</a>
                                            <%
                                        }
                                        %>
                                        <span class="bullet_cor" style="background-color: <%=strCorRGB%>"></span>
                                        <%
                                        if (evento.idCategoria.Equals(2) && evento.eventoTipo != null)
                                        {                                            
                                            %>
                                            <span style="color: <%=strCorRGB%>"><%=evento.eventoTipo.strTipo%></span>
                                            <%
                                        }
                                        else
                                        {
                                            %>
                                            
                                            <span style="color: <%=strCorRGB%>"><%= !evento.idCategoria.Equals(5) ? evento.strCategoria : evento.eventoGrupo.strGrupo + " (Grupo)"%></span>
                                            <%
                                        }
                                       

                                        if(!evento.strTurma.Equals(""))
                                        {
                                             %>
                                                <small>Turma: <%=evento.strTurma%></small>
                                            <%
                                        }
                                       

                                        if (evento.dtmInicio.Equals(evento.dtmFim))
                                        {
                                                %>
                                                <small>Duração: <%=Convert.ToDateTime(evento.dtmInicio).ToString("dd/MM")%> - <%=evento.horaInicio%> a <%=evento.horaFim%></small>
                                                <%
                                        }
                                        else
                                        {
                                                %>
                                                <small>Duração: <%=Convert.ToDateTime(evento.dtmInicio).ToString("dd/MM")%> - <%=evento.horaInicio%> a <%=Convert.ToDateTime(evento.dtmFim).ToString("dd/MM")%> - <%=evento.horaFim%></small>
                                                <%
                                        }

                                        if ((evento.idCategoria.Equals(2) || evento.idCategoria.Equals(3) || evento.idCategoria.Equals(5)) && evento.strUrlEvento != null)
                                        {
                                            %>
                                                <p><a target="_blank" href="<%=evento.strUrlEvento %>"><%=evento.strTitulo%></a></p>
                                            <%
                                        }
                                        else
                                        {
                                            %>
                                                <p><%=evento.strTitulo%></p>
                                            <%
                                        }
                                            
                                        %>
                                    </li>
                                    <%
                            }
                            %>
                            </ul>
                        </div>
                        <%
                    }
                    else
                    {
                        %>
                        <div class="agenda_lista_scroll">
                        <ul>
                            <li>
                                <span class="agenda_sem_eventos" id="naoTemEventos">Não há evento cadastrado para a data selecionada.</span>
                            </li>
                        </ul>
                        </div>
                            
                        <%
                    }
                    %>
					<!--<ul>
                    	<li>
							<span class="bullet_cor"></span>
							<span>Simulado</span>
							<small>- 8h30 às 11h</small>
							<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore</p>
							<a href="javascript:void(0);" title="editar" class="editar">&nbsp;</a>
							<a href="javascript:void(0);" title="excluir" class="excluir">&nbsp;</a>
						</li>
						
					</ul>-->
					<a href="javascript:void(0);" class="btn_cinza" id="fecharCaixaEventoAgenda">Fechar</a>
				</div>
