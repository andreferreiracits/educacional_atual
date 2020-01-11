<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.Bloqueios>>" %>

<% 
foreach (var bloqueio in Model)
{
     %>
     <tr data-idavasegmentacaobloqueio="<%= bloqueio.idAVASegmentacaoBloqueio %>" class="linhaBloqueio<%= bloqueio.idAVASegmentacaoBloqueio %>">
        <% 
        if (bloqueio.bloqueioUnidade != null)
        {
            %>
            <td>
                <%
                foreach (var unidade in bloqueio.bloqueioUnidade)
                {				                    
                    %>
                    <p class="destaque_tabela"><%=unidade.strUnidade%></p>
                    <%
                }  
                %>
            </td>    
            <%        
        }    
        %>
    
        <td class="col_segmentos">
            <%
            foreach (var segmento in bloqueio.lSegmentacao)
            {				                    
                %>
                <p class="destaque_tabela"><%=segmento.strSegmentacao%></p>
                <%
            }  
            %>
        </td>

        <td class="col_periodo">
            <%=bloqueio.dtmInicio%>
            até
            <%=bloqueio.dtmFim%>
        </td>

        <td>
            <a href="javascript: void(0);" class="btn_editarBloqueio" data-idavasegmentacaobloqueio="<%=bloqueio.idAVASegmentacaoBloqueio %>">
                <i class="fontello icoEdit"></i></a><a href="javascript: void(0);" class="btn_excluirBloqueio">
                <i class="fontello icoCancel"></i>
            </a>

            <div class="apagar_bloqueio" colspan="4" style="display: none;">
                <p>Tem certeza que deseja excluir este bloqueio?</p>

                <div class="area_btn_bloquear">
                    <a class="bt_normal green excluir btn_ExcluirBloqueio" href="javascript: void(0);"
                        data-idavasegmentacaobloqueio="<%= bloqueio.idAVASegmentacaoBloqueio %>">Sim</a>

                    <a class="bt_normal red cancelar btn_ocultarExcluirBloqueio" href="javascript: void(0);">
                        Não</a> 
                
                    <i class="seta_baixo_confirma"></i>
                </div>

            </div>
        </td>
    </tr>
     <%   
}
%>


