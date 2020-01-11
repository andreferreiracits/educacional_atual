<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.TurmaAgendamento>" %>

<%
int qtd = Model.lUsuarioAgendamento.Count;

if (qtd > 0)
{
    int idAgendamento = Model.idRotaAgendamento;
    bool agendamentoEncerrou = Model.bolEncerrou;

    int idTurma = Model.idTurma;
    
    foreach (var usuarios in Model.lUsuarioAgendamento)
    {
       string strClassAdd = "";
       if (Convert.ToInt32(ViewData["idAlunoCorrente"]) == usuarios.id)
       {
           strClassAdd = "ta_selected";
       }
       %>
       <span class="ta_alunos_ft <%=strClassAdd%>">
            <% 
            if (agendamentoEncerrou)
            {
                %>
                <img id="<%=usuarios.id%>" src="<%=usuarios.strMiniFoto%>" class="b_tooltip_center" width="33" height="33" onClick="corrigeAluno(<%=usuarios.id%>, <%=idAgendamento%>, 0);">
                <%
            }
            else
            {
                %>
                <img id="<%=usuarios.id%>" src="<%=usuarios.strMiniFoto%>" class="b_tooltip_center" width="33" height="33" style="cursor: default;" onClick="visualizaAluno(<%=usuarios.id%>, <%=idAgendamento%>, 0,<%=idTurma%> );">
                
                <% 
            }
            %>
            <span class="black_tip_center black_tip_P tooltip">
                <%=usuarios.strNome%>
                <span class="black_tip_seta">&#9660;</span>
            </span>
            <%
            if (usuarios.concluiu)
            {
                Response.Write("<span class='leg_green'></span>");
            }
            else if(usuarios.naoIniciou)
            {
                Response.Write("<span class='leg_red'></span>");
            }
            else
            {
                Response.Write("<span class='leg_orange'></span>");
            }
            %>        
        </span>
           
       <%         
    }    
    
    int totalUsuariosAgendados = qtd;
    double concluiu = Math.Round(Convert.ToDouble(Model.totalConcluiu * 100) / Convert.ToDouble(totalUsuariosAgendados), 0);
    double iniciou = Math.Round(Convert.ToDouble(Model.totalIniciou * 100) / Convert.ToDouble(totalUsuariosAgendados), 0);
    double naoIniciou = Math.Round(Convert.ToDouble(Model.totalNaoIniciou * 100) / Convert.ToDouble(totalUsuariosAgendados), 0);  
    %>

    <div class="ta_alunos_legenda">
        <p><span class="leg_green"></span><%=concluiu%>% Completou</p>
        <p><span class="leg_orange"></span><%=iniciou%>% Iniciou</p>
        <p><span class="leg_red"></span><%=naoIniciou%>% Não iniciou</p>
    </div>
<% 
}
else
{
    Response.Write("Está turma não possui alunos ativos.");
}    
%>

