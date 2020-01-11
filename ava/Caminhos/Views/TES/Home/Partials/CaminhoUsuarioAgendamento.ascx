<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>

<% 
int idCaminho = Model.id;
string strCaminho = Model.titulo;
%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="trhover">
    <THEAD>
        <tr class="tr_thead">
            <td colspan="4">
            <h2>Correção do Caminho <a href="javascript: void(0);" class="invert"><%=strCaminho%></a></h2>
            <%
            if (Model.bolTarefaGrupo) {
                %>
                <a href="javascript: void(0)" class="bt_normal right" onclick="abrirAgendamento(0, 1, 1, 1, '', '', '', false, 0, 0, '', 2);">voltar para agendadas</a> 
                <%
            }else {
                %>
                <a href="javascript: void(0)" class="bt_normal right" onclick="abrirAgendamento(0, 1, 1, 1, '', '', '', false, 0, 0, '', 1);">voltar para agendadas</a> 
                <%
            }
            %>
            </td>
        </tr>                    
    </THEAD>
    
    <TBODY class="tablebody" id="container_alunoagendamento">  
        
    </TBODY>         
        
</table>
