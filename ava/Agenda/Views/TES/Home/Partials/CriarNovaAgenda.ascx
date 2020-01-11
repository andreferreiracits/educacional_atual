<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Agenda.Models.Evento>" %>
<%
    int tipo = (int) ViewData["tipo"];
    /*
        * tipo = 1 = Admin Agenda Escola
        * tipo = 2 = Admin Agenda Portal
        * tipo = 3 = Possui os 2 papéis
        * */
    bool bolEducador = ViewData["bolEducador"] == null ? false : (bool)ViewData["bolEducador"];
    
    Agenda.Models.Evento evento = null;
    if (Model != null)
    {
        evento = (Agenda.Models.Evento)Model;
    }

    var idTurmaGrupoDeTurma = ViewData["idTurmaGrupoDeTurma"] == null ? 0 : (int)ViewData["idTurmaGrupoDeTurma"];
    var idGrupoGrupoDeTurma = ViewData["idGrupoGrupoDeTurma"] == null ? 0 : (int)ViewData["idGrupoGrupoDeTurma"];
    var bolPaginaEscola = ViewData["bolPaginaEscola"] == null ? false : (bool)ViewData["bolPaginaEscola"];
    var bolPaginaProjetos = ViewData["bolPaginaProjetos"] == null ? false : (bool)ViewData["bolPaginaProjetos"];
        
 %>

 <div class="box_agenda criar_evento">
    <%
        if (evento != null)
        {
            %>
            <h2>Editar Evento</h2>
            <%
        }
        else
        {
            %>
            <h2>Criar Evento</h2>
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
	<form name="formCriarEditarAgenda" id="formCriarEditarAgenda" class="form_criar" action="" onsubmit="validarEdicaoNovaAgenda(); return false;">
    <input type="hidden" id="idEventoAgenda" value="<%=evento == null ? "0" : evento.idEvento.ToString() %>" />
        <% if(tipo != 4 && !bolPaginaEscola && !bolPaginaProjetos) {
            //Editando um evento de turma sem turma.
            //De duas uma, esse evento tem turma mas elas são ocultas O_O ou é um bug tenso
            //Bloquear tudo pra garantir que continue como estava durante a edição  
            var strBloquearAlteracaoEventoParaTurma = "";
            if (evento != null)
            {
                if (evento.idCategoria == 4)
                {
                    if (bolEducador && (int)ViewData["qtd_turmas"] == 0)
                    {
                        strBloquearAlteracaoEventoParaTurma = "disabled=\"disabled\"";
                    }
                }
            }       
        
        %>        
		<span>
            <input type="radio" name="paraCriarAgenda" <%=strBloquearAlteracaoEventoParaTurma%> id="pessoal" class="mg_0" <%= evento == null ? "checked" : evento.idCategoria.Equals(1) ? "checked" : "" %> value="1" />
			<label for="pessoal">Pessoal</label>
            <%   
                if (tipo.Equals(1) || tipo.Equals(3))
                {
                    
                    %>
                    <input type="radio" name="paraCriarAgenda" <%=strBloquearAlteracaoEventoParaTurma%> id="agendarEscola" value="2" <%= evento != null ? evento.idCategoria.Equals(2) ? "checked" : "" : ""%> />
			        <label for="agendarEscola">Escola</label>
                    <%
                }

                if (tipo.Equals(2) || tipo.Equals(3))
                {
                    %>
                    <input type="radio" name="paraCriarAgenda" <%=strBloquearAlteracaoEventoParaTurma%> id="agendarPortal" value="3" <%= evento != null ? evento.idCategoria.Equals(3) ? "checked" : "" : ""%> />
			        <label for="agendarPortal">Educacional</label>
                    <%
                }

                if ((bolEducador && (int)ViewData["qtd_turmas"] > 0) || !String.IsNullOrEmpty(strBloquearAlteracaoEventoParaTurma))
                {
                    %>
                    <input type="radio" name="paraCriarAgenda" <%=strBloquearAlteracaoEventoParaTurma%> id="agendarTurma" value="4" <%= evento != null ? evento.idCategoria.Equals(4) ? "checked" : "" : ""%> />
			        <label for="agendarTurma">Turma</label>
                    <%
                }
			%>
		</span>
        <% } else if(bolPaginaEscola) { %>
            <input type="radio" name="paraCriarAgenda" id="Radio2" value="2" checked="checked" style="display:none;" />
        <% } else if(bolPaginaProjetos) { %>
			<input type="radio" name="paraCriarAgenda" id="Radio2" value="3" checked="checked" style="display:none;" />
        <% } else { //Grupo turma %>
            <input type="radio" name="paraCriarAgenda" id="Radio1" value="4" checked="checked" style="display:none;" />
        <% }

            if (bolEducador && tipo != 4 && !bolPaginaEscola && !bolPaginaProjetos)
            {
                string escondeTurmas = "none";
                if (evento != null && evento.idCategoria.Equals(4))
                {
                    escondeTurmas = "visible";
                }
                %>
                <section class="dialogo clearfix agendaPersonalizada" style="display: <%=escondeTurmas%>;">
                    <div class="compartilhamento_link" ></div>
                    <div class="compartilhamento" style=""></div>
                 </section>
                <%
            }    
        %>
        
		<fieldset>
			<span>O quê?</span><textarea type="text" id="strTituloAgenda" value="<%=evento != null ? evento.strTitulo : "" %>" maxlength="500" /><br />
            <%
                if (tipo.Equals(2) || tipo.Equals(3) || tipo.Equals(1))
                {
                    
                    %><div id="spanStrUrlAgenda" style="display: <%=bolPaginaEscola ? "visible" : (evento != null ? evento.idCategoria.Equals(3) || evento.idCategoria.Equals(2) ? "visible" : "none" : "none") %>;">
                        <span>URL:</span><input type="text" id="strUrlAgenda" value="<%=evento == null ? "" : evento.strUrlEvento != null ? evento.strUrlEvento : "" %>" /><br />
                    </div>
                    <%
                    
                }
            %>
			
			<span>De:</span><input id="dtmInicio" class="data_criar_agenda" type="text" placeholder="<%=DateTime.Now.Date %>" value="<%=evento == null ? "" : evento.dtmInicio != null ? evento.dtmInicio : "" %>" />
			<input type="text" id="horaInicio" class="hora_criar_agenda" value="<%=evento == null ? "" : evento.horaInicio != null ? evento.horaInicio : "" %>" />
			<span class="ate">Até:</span>
			<input type="text"  id="dtmFim" class="data_criar_agenda" placeholder="<%=DateTime.Now.Date %>" value="<%=evento == null ? "" : evento.dtmFim != null ? evento.dtmFim : "" %>" />
			<input type="text" id="horaFim" class="hora_criar_agenda" value="<%=evento == null ? "" : evento.horaFim != null ? evento.horaFim : "" %>" /><br />
		</fieldset>
        <%
            if (tipo.Equals(1) || tipo.Equals(3))
            {
                string bolEscondeSelect = "none";
                if ((evento != null && evento.idCategoria.Equals(2)) || bolPaginaEscola)
                {
                    bolEscondeSelect = "visible";
                }
                %>
                <div id="divTipoEventoAgenda" style="display: <%=bolEscondeSelect%>;">
                <span class="titulo">Tipo:</span>
                <%
                if (ViewData["ListaEventoTipo"] != null)
                {
                    %>
                    <select id="eventoTipoAgenda">
                    <%
                    IList<string[]> listaArrayEventoTipo = (IList<string[]>)ViewData["ListaEventoTipo"];
                    for(int i = 0; i < listaArrayEventoTipo.Count; i++)
                    //foreach (string[] evento in (IList<string[]>)ViewData["ListaEventoTipo"])
                    {
                        %>
                        <option value="<%=listaArrayEventoTipo[i][0] %>" <%=evento == null ? "" : evento.eventoTipo == null ? "" : evento.eventoTipo.idTipo.Equals(Convert.ToInt32(listaArrayEventoTipo[i][0])) ? "selected" : "" %>><%=listaArrayEventoTipo[i][1]%></option>
                        <%
                    }
                    %>
                    </select>
                    <%
                }
                %>
                </div>
                <%
            }
        %>	
		<br>
        	<%
            if (tipo > 0)



            {
                string bolEsconde = "none";
                if ((evento != null && (evento.idCategoria.Equals(2) || evento.idCategoria.Equals(3))) || bolPaginaEscola || bolPaginaProjetos)
                {
                    bolEsconde = "visible";
                }
                %>
                <div id="estadoCriacaoAgenda" style="display: <%=bolEsconde%>;">
                    <span class="titulo">Estado:</span>
		            <input type="radio" name="estadoPublicadoPrivadoAgenda" id="privadoAgenda" class="mg_0" value="1" <%= evento == null ? "checked" : evento.bolPrivado ? "checked" : "" %> />
		            <label for="privadoAgenda">Privado</label>
		            <input type="radio" name="estadoPublicadoPrivadoAgenda" id="publicoAgenda" value="0" <%= evento == null ? "" : evento.bolPrivado ? "" : "checked" %> />
		            <label for="publicoAgenda">Público</label><br>
                </div>
                <%
            }
		%>

		<input class="btn_laranja salvar" id="salvarNovoAgenda" type="submit" value="Salvar" />
        <input class="btn_cinza cancelar" id="cancelarCriarAgenda" type="button" value="Cancelar" />
	</form>
</div>