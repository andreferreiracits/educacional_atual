<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.Agendamento>>" %>

<%
bool bolAdmRede = Convert.ToBoolean(ViewData["bolAdmRedeSocial"]);
int idUsuario = (int) ViewData["idUsuario"];
var intColSpan = (bolAdmRede) ? 7 : 6;

if (Model.Count > 0)
{
    foreach (var agendamento in Model)
    {
        
        %>


         

        <tr class="bancocaminho_<%=agendamento.id%> bcam">
            
            <%if (bolAdmRede)
              { %>
                <td width="20% class="td_titulo nome_titulo mgle20 center">
                    <span><%=agendamento.dono.strNome%></span>  
                </td>
            <%} %>

            <%       
                string tituloAtividade = agendamento.strRota;
                tituloAtividade = RedeSocialAVA.FuncoesTexto.ReverterAspas(tituloAtividade);
                tituloAtividade = RedeSocialAVA.FuncoesTexto.ArrumaAspas(tituloAtividade);

                var percentTitulo = "";
                if (bolAdmRede)
                {
                    percentTitulo = "20%";
                }
                else
                {
                    percentTitulo = "35%";
                }
                        
            %>
            <td width="<%=percentTitulo %>" class="td_titulo mgle20">
                <a href="javascript: void(0)" class="btnEscorregarAgendadas" id="<%=agendamento.id%>"><span id="seta_<%=agendamento.id%>">&#9660;</span> <%=tituloAtividade%></a>                                                                           
                <span class="e-actions">
                    <%if (agendamento.dono.id == idUsuario || bolAdmRede) //!bolAdmRede || 
                      { %>
                        <a class="bt_normal red_light" href="javascript: void(0);" onclick="excluirAgendamento(<%=agendamento.id%>);">excluir agendamento</a>
                    <%} %>
                    <% 
                    if (agendamento.intStatus == 3)
                    {
                        %>
                        <a class="bt_normal red_light" href="/ava/caminhos/home/notas/<%=agendamento.id%>">ver notas</a>    
                        <%    
                    }
                    %>
                </span>
            </td>
            <td width="15%" class="center td_prog" id="progresso">
                <%
                    int total = 0;

                    if (agendamento.intRealizado > 0)
                    {
                        double calcA = agendamento.totalAgendado/2;
						
						if(calcA == 0){
						
							calcA = 1;
						
						}
						
                        double calcB = agendamento.intRealizado * 100;

                        total = (int)Math.Round(calcB / calcA);    
                    }
                            
                    Response.Write(total + "%");
                %>
                <div id="progressbar_<%=agendamento.id%>" class="prog_holder">
                    <script type="text/javascript">
                        montaProgessBar(<%=total%>, <%=agendamento.id%>)
                    </script>
                </div>
            </td>
            <td width="15%" class="td_para">
                <div>
                <%
                if (ViewData["tipoAgendamento"].ToString().ToLower().Equals("grupo"))
                {
                    Response.Write(agendamento.grupo.strNome);
                }
                else
                {
                    int cont = 0;
                    int totalTurmas = agendamento.lTurmasAgendadas.Count;
                    foreach (var turma in agendamento.lTurmasAgendadas)
                    {
                        cont++;
                        string strHTMLTurma = "";

                        if (turma.strTipoAgendamento == "individual")
                        {
                            strHTMLTurma = "(" + turma.totalAlunoTurma + ")";
                        }

                        if (cont == totalTurmas)
                        {
                            Response.Write(turma.strTurma + strHTMLTurma);
                        }
                        else
                        {
                            Response.Write(turma.strTurma + strHTMLTurma + ", ");
                        }
                    }
                }                
                %>
                </div>
            </td>
            
            <%                         
            if (agendamento.intStatus == 2)
            {
                %>
                <td width="10%" class="td_status td_status_embreve center">
                    <span>Em breve</span>
                </td>
                <%
            }
            else if (agendamento.intStatus == 3)
            {
                %>
                <td width="10%" class="td_status td_status_encerrado center">
                    <span>Encerrado</span>
                </td>
                <%
            }
            else
            {
                %>
                <td width="10%" class="td_status td_status_emandamento center">
                    <span>Andamento</span>
                </td>
            <%
            }
            %>
            
            <td width="15%" class="center td_data">
                de <%=agendamento.dtmInicio.ToString("dd/MM/yy - HH:mm").Replace(":", "h")%>
                <br />
                até <%=agendamento.dtmFim.ToString("dd/MM/yy - HH:mm").Replace(":", "h")%>
            </td>                        
        </tr>

        <tr class="table_aberta" id="agendamento_<%=agendamento.id%>" style="display: none">
            <td colspan="<%=intColSpan%>">
                <div id="containerescorrega_<%=agendamento.id%>" style="display: none">
                            
                </div>
            </td>

        <div class="clearfix"></div>

        
            

        </tr>

        
        <%
        
    }        
}
else
{
    %>
     <tr class="mouseover">
         <td colspan="<%=intColSpan%>" class="resultado_vazio_atividade">Nenhum agendamento encontrado para os filtros aplicados</td>
    </tr>
    <%
}   
%>
    
