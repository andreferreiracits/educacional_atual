<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%
    int idEstado = Convert.ToInt32(ViewData["idEstado"]);
    bool flag = (bool)ViewData["criarAgenda"];
    bool bolGrupoDeTurma = ViewData["bolGrupoDeTurma"] == null ? false : (bool)ViewData["bolGrupoDeTurma"];
%>
	<div class="container" style="width: <%=bolGrupoDeTurma ? "413" : "230" %>px;">	
		<div class="main demo">
			
			<div id="calendar1">
			</div>
            
            <%
                //Alteração Renan: Grupos com idEstado 3 (Congelado) não devem permitir criação de eventos.
                if (flag && !idEstado.Equals(3))
                {
                    %>
                    <a id="<%=!bolGrupoDeTurma ? "criar_EventoAgendaGrupo" : "criar_EventoAgenda"%>" style="cursor:pointer;" class="btn_cinza criar_fora">Criar</a>
                    <%
                }   
            %>
            <div id="dadosAuxAgenda"></div>
            
		</div>		
	</div>