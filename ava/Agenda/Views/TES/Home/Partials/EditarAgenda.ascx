<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Agenda.Models.Evento>" %>
<%
    var tipo = (int) ViewData["tipo"];
    int idCategoria = Model.idCategoria;
    string strUrlMostra = "";
    //Response.Write(idCategoria);
 %>
<form id="frmAgenda" method="post" name="frmAgenda" onsubmit="validarEdicaoAgenda(); return false;">
    <div class="botoes_criarEventoAgenda">
        <div class="titulo">Editar evento</div>
        
    </div>
    <div class="form_input"><input type="text" id="txtDescricao" maxlength="100" name="txtDescricao" size="30" value="<%=Model.txtDescricao %>"/></div>
    <%
        if (idCategoria == 3)
        {
            strUrlMostra = "block";
        }
        else
        {
            strUrlMostra = "none";
        }
    %>
    <div class="form_input" style="display:<%=strUrlMostra %>;" id="idStrUrlEvento"><input type="text" id="strUrlEvento" name="strUrlEvento" size="30" placeHolder="Url do Evento" value="<%=Model.strUrlEvento %>" /></div>
    <div class="form_input">
        <label for="dtmInicio" generated="true" class="error" style="display: none; font-size:9px;">Preencha a data inicial</label>
        <label for="horaInicio" generated="true" class="error" style="display: none; font-size:9px;">Preencha a hora inicial</label>
        De: <input type="text" class="input_data" size="8" name="dtmInicio" id="dtmInicio" value="<%=Model.dtmInicio %>" />
        <input type="text" class="input_hora" size="6" name="horaInicio" id="horaInicio" value="<%=Model.horaInicio %>" /> 
        <br /><br />
        <label for="dtmFim" generated="true" class="error" style="display: none; font-size:9px;">Preencha a data final</label>
        <label for="horaFim" generated="true" class="error" style="display: none; font-size:9px;">Preencha a data final</label>
        até: <input type="text" class="input_data" size="8" name="dtmFim" id="dtmFim" value="<%=Model.dtmFim %>"/>  
        <input type="text" class="input_hora" size="6" name="horaFim" id="horaFim" value="<%=Model.horaFim %>" /> 
        <input type="hidden" id="idEvento" value="<%=Model.idEvento %>" />
        <input type="hidden" id="currentDay" value="<%=System.DateTime.Now.ToString("dd/MM/yyyy")%>" /><br />
        <%
            if (tipo == 1)
            {
                %>
                <input type="radio" name="radioAgenda" value="2" id="agendaEscola" class="checkAgenda" <%
                if (idCategoria == 2)
            {
                Response.Write("checked=\"checked\"");
            }
                 %>/><label for="agendaEscola">Escola</label><br />
                <input type="radio" name="radioAgenda" value="1" id="agendaUsuario" class="checkAgenda"  <%
                if (idCategoria == 1)
            {
                Response.Write("checked=\"checked\"");
            }
                 %>/><label for="agendaUsuario">Você</label>
                <%
            }
            else if (tipo == 2)
            {
                %>
                <input type="radio" name="radioAgenda" value="3" id="agendaPortal" class="checkAgenda"  <%
                if (idCategoria == 3)
            {
                Response.Write("checked=\"checked\"");
            }
                 %>/><label for="agendaPortal">Educacional</label><br />
                <input type="radio" name="radioAgenda" value="1" id="agendaUsuario" class="checkAgenda"  <%
                if (idCategoria == 1)
            {
                Response.Write("checked=\"checked\"");
            }
                 %>/><label for="agendaUsuario">Você</label>
                <%
            }
            else if (tipo == 3)
            {
                %>
                <input type="radio" name="radioAgenda" value="3" id="agendaPortal" class="checkAgenda"  <%
                if (idCategoria == 3)
            {
                Response.Write("checked=\"checked\"");
            }
                 %>/><label for="agendaPortal">Educacional</label><br />
                <input type="radio" name="radioAgenda" value="2" id="agendaEscola" class="checkAgenda"  <%
                if (idCategoria == 2)
            {
                Response.Write("checked=\"checked\"");
            }
                 %>/><label for="agendaEscola">Escola</label><br />
                <input type="radio" name="radioAgenda" value="1" id="agendaUsuario" class="checkAgenda"  <%
                if (idCategoria == 1)
            {
                Response.Write("checked=\"checked\"");
            }
                 %>/><label for="agendaUsuario">Você</label>
                <%
            }
             %>
             <%if (Model.listUsuarioTurma.Count > 0)
               { %>

             <p>Para:
                <br>
                <%
                   foreach (var item1 in Model.listUsuarioTurma)
                   {
                       Response.Write(item1.strEnvio);
                       Response.Write("<br>");
                   }    
                %>
             </p>

             <%} %>

             
             <div class="bts_agenda agd_salvar bt_geral">
                <input type="button" value="cancelar" class="red_input" onclick="cancelarEditAgenda();"> 
                 <!--<a onclick="cancelarEditAgenda();" class="bt_geral red">Cancelar</a>--> 
                 <input type="submit" value="salvar" />
             </div>
        <!--<div class="agd_salvar bt_geral" id="salvar_eventoAgenda">
        <input type="button" value="Cancelar" onclick="cancelarEditAgenda();" />
        <input type="submit" value="salvar" /></div>-->
    </div>   
</form>
