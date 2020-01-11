<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>


<div class="excluir_agendamento">
        	
    <div class="ava_lightheader"><h2 class="blokletters"> Relatório de Notas</h2></div>
    <div class="ava_lightcontainer clearfix">

        <%
        foreach (var turma in Model.lTurmasAgendadas)
        {
            string strHTMLTurma = "";
            
            if (turma.strTipoAgendamento == "individual")
	        {
		        strHTMLTurma = turma.strTurma + "(" + turma.totalAlunoTurma + ")";
            }
            else
            {
                strHTMLTurma = turma.strTurma;
            }
            %>
            <span class="t_agendadas"><input type="checkbox" value="<%=turma.idTurma%>" name="cbTurmaAgendada"> <label for="cbTurmaAgendada"> <%=strHTMLTurma%></label></span>
            <%  
        } 
        %>        
                                    
        <div class="light_bts">
            <a class="large awesome awesome-color " href="javascript: void(0);" id="btExibirNotasAgendamento"><span></span>Exibir notas </a>
            <a class="large awesome c-cancelar" href="javascript: void(0);" id="btCancelarNotaAgendamento"><span class="awe_icons"></span>Cancelar </a>  
        </div>
    </div>

</div>
