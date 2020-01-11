<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Agenda.Models.Evento>" %>
<%
    bool podeCriar = (bool)ViewData["podeCriar"];
    
    
    Agenda.Models.Evento evento = null;
    if (Model != null)
    {
        evento = (Agenda.Models.Evento)Model;
    }
   // Response.Write(tipo + " papel: " + ViewData["papel"]);
    
 %>
 
<div class="box_agenda criar_evento">
    <%
        if (evento != null)
        {
            %>
            <h2>Editar Evento do Grupo</h2>
            <%
        }
        else
        {
            %>
            <h2>Criar Evento do Grupo</h2>
            <%
        }
    %>
	
    
    <div class="ui-widget" id="msgErroCriarAgenda" style="display: none;">
		<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"> 
			<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span> 
			<span>Mensagem de erro.</span>
            </p>
		</div>
	</div>
    <%
        if (podeCriar)
        {
            %>
            <form name="formCriarEditarAgendaGrupo" id="formCriarEditarAgendaGrupo" class="form_criar" action="" onsubmit="validarEdicaoAgendaGrupo(); return false;">
            <input type="hidden" id="idEventoAgenda" value="<%=evento == null ? "0" : evento.idEvento.ToString() %>" />
		
		        <fieldset>
			        <span>O quê?</span><input type="text" id="strTituloAgenda" value="<%=evento != null ? evento.strTitulo : "" %>"><br>
                    <div id="spanStrUrlAgenda">
                        <span>URL:</span><input type="text" id="strUrlAgenda" value="<%=evento == null ? "" : evento.strUrlEvento != null ? evento.strUrlEvento : "" %>"><br>
                    </div>

			        <span>De:</span><input id="dtmInicio" class="data_criar_agenda" type="text" placeholder="<%=DateTime.Now.Date %>" value="<%=evento == null ? "" : evento.dtmInicio != null ? evento.dtmInicio : "" %>">
			        <input type="text" id="horaInicio" class="hora_criar_agenda" value="<%=evento == null ? "" : evento.horaInicio != null ? evento.horaInicio : "" %>">
			        <span class="ate">Até:</span>
			        <input type="text"  id="dtmFim" class="data_criar_agenda" placeholder="<%=DateTime.Now.Date %>" value="<%=evento == null ? "" : evento.dtmFim != null ? evento.dtmFim : "" %>">
			        <input type="text" id="horaFim" class="hora_criar_agenda" value="<%=evento == null ? "" : evento.horaFim != null ? evento.horaFim : "" %>"><br>
		        </fieldset>
       	
		        <br>
			
		        <input class="btn_laranja salvar" type="submit" value="Salvar">
		        <!--<a class="btn_laranja salvar" href="javascript:void(0);" onclick="formCriarEditarAgenda.submit();">Salvar</a>-->
                <input class="btn_cinza cancelar" id="cancelarCriarAgendaGrupo" type="button" value="Cancelar">
	        </form>
            <%
        }
        else
        {
            %>
            Você não tem permissão para criar evento.
            <input class="btn_cinza cancelar" id="cancelarCriarAgendaGrupo" type="button" value="Cancelar">
            <%
        }
    %>
	
</div>


