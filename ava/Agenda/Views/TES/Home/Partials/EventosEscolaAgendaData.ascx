<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Agenda.Models.Evento>>" %>
<%
    DateTime data = (DateTime)ViewData["dataSelecionada"];
    
%>

<div class="box_agenda visualizar_evento">
	<div class="topo_visualizar_evento">
        <a href="javascript:void(0);" title="Dia anterior" class="anterior_dia_agenda"><span class="entypo"></span></a>
	    <h2>Eventos <%=data.ToString("dd/MM") %></h2>
	    <a href="javascript:void(0);" title="Proximo dia" class="proximo_dia_agenda"><span class="entypo"></span></a>
    </div>
	<%
        if (Model != null && Model.Count > 0)
        {
            string strCorRGB = null;
        %>
        <div class="agenda_lista_scroll_externo">
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
            }
            %>
            <li <%=!evento.dtmInicio.Equals(evento.dtmFim) ? "class=\"agd_evtContinuo\"" : "" %> id-evento="<%=evento.idEvento %>">
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
                    <span style="color: <%=strCorRGB%>"><%=evento.strCategoria%></span>
                    <%
                }

                if (evento.dtmInicio.Equals(evento.dtmFim))
                {
                        %>
                        <small><%=Convert.ToDateTime(evento.dtmInicio).ToString("dd/MM")%> - <%=evento.horaInicio.Replace(":", "h")%> a <%=evento.horaFim.Replace(":", "h")%></small>
                        <%
                }
                else
                {
                        %>
                        <small><%=Convert.ToDateTime(evento.dtmInicio).ToString("dd/MM")%> <%=evento.horaInicio.Replace(":", "h")%> a <%=Convert.ToDateTime(evento.dtmFim).ToString("dd/MM")%> <%=evento.horaFim.Replace(":", "h")%></small>
                        <%
                }

                if ((evento.idCategoria.Equals(2) || evento.idCategoria.Equals(3)) && evento.strUrlEvento != null)
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
            <div class="agenda_lista_scroll_externo">
            <ul>
                <li>
                    <span class="agenda_sem_eventos">Não há evento cadastrado para a data selecionada.</span>
                </li>
            </ul>  
            </div>         
            <%
        }
        %>
	<a href="javascript:void(0);" class="fechar_agenda_externa"><span class="FontAwesome"></span>Fechar</a>
</div>