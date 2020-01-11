<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Agenda.Models.Evento>>" %>
<%
    DateTime data = (DateTime)ViewData["dataSelecionada"];
    int idEstado = Convert.ToInt32(ViewData["idEstado"]);

%>

<div class="box_agenda visualizar_evento eventos_grupo">
	<a href="/" title="Dia anterior" class="anterior_dia_agenda"></a>
	<h2>Eventos do dia <%=data.ToString("dd/MM") %></h2>
	<a href="/" title="Proximo dia" class="proximo_dia_agenda"></a>
	<%
    

        if (Model != null && Model.Count > 0)
        {
            string strCorRGB = "#6d779c";
            %>
            <div class="agenda_lista_scroll">
                <ul>
                <%
                foreach (Agenda.Models.Evento evento in Model)
                {
                    
                    %>
                    <li <%=!evento.dtmInicio.Equals(evento.dtmFim) ? "class=\"agd_evtContinuo\"" : "" %> id-evento="<%=evento.idEvento %>">
                        <%
                        if (evento.donoEvento && !idEstado.Equals(3))
                        {
                            %>
                                <a href="javascript:void(0);" title="excluir" class="excluir_evento_agenda">&nbsp;</a>
							    <a href="javascript:void(0);" title="editar" class="editar_evento_agenda">&nbsp;</a>
                            <%
                        }
                        %>
                        <span class="bullet_cor" style="background-color: #9b4a4a"></span>
                        <span style="color: #9b4a4a"><%=evento.strTitulo%></span>
                            <%
                                     
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

                        if (evento.idCategoria.Equals(5) && evento.strUrlEvento != null)
                        {
                            %>
                                <p><a target="_blank" href="<%=evento.strUrlEvento %>"><%=evento.strUrlEvento%></a></p>
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
            <ul>
                <li>
                    <span class="agenda_sem_eventos">Não há evento cadastrado para a data selecionada.</span>
                </li>
            </ul>
                            
            <%
        }
    %>
	
	<a href="javascript:void(0);" class="btn_cinza" id="fecharCaixaEventoAgenda">Fechar</a>
</div>