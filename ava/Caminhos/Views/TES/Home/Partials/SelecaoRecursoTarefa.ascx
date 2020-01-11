<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.Recurso>>" %>

<div class="ava_lightheader">
    <h2 class="blokletters">Seleção de recursos para tarefa</h2>
</div><!--ava_lightheader-->

<div class="ava_ativtable ava_lightcontainer">
    <div class="time_loading">
        <img height="11" width="43" src="/ava/staticContent/Common/img/perfil/carregando.gif">
    </div>

    <table cellspacing="0" cellpadding="0" border="0" width="100%" class="">
        <tbody>
            <tr>
                <td class="ajaxbox">
                    <table id="container_recurso" cellspacing="0" cellpadding="0" border="0" width="100%" class="tablefix_aval trhover">
                        <thead>
                            <tr class="table_selected">
                                <td width="37%"><h5>Selecione o Recurso</h5></td>                       
                            </tr>
                        </thead>

                        <tbody class="tablebody">
                            <tr class="table_aberta">
                                <td id="recursoitem_ava">
                                    <ul id="lista_recurso_ava">
                                        <%
                                        foreach (var recurso in Model)
                                        {
                                           if (recurso.id == 1 || recurso.id == 2 || recurso.id == 8 ) {
                                            if (recurso.idCategoriaPublicacao >= 0)
                                            {
                                            %>
                                                <li>
                                                    <div class="mosaic-block cover">
                                                        <div class="mosaic-overlay" style="display: block; left: 0px; bottom: 0px;">
                                                            <img height="55" width="55" src="<%=recurso.strPathThumb%>"><%=recurso.strRecurso.ToUpper()%>
                                                        </div>
                                                        <div class="details">
                                                            <% 
                                                                if (recurso.id == 1)
                                                                {
                                                                    %>
                                                                    <a style="cursor: pointer;" onclick="listaAvaliacoesNovaRapido('','','')"><%=recurso.strTextoBreve%></a>
                                                                    <%
                                                                }
                                                                else
                                                                {
                                                                    %>
                                                                    <a style="cursor: pointer;" onclick="paginacaoRecursoItemRapido(<%=recurso.idCategoriaPublicacao%>, <%=recurso.id%>)"><%=recurso.strTextoBreve%></a>
                                                                    <%          
                                                                }
                                                            %>
                                                        </div>
                                                    </div>
                                                </li>
                                            <%  
                                            }
                                           }
                                        }
                                        %>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>  
                    </table>
                </td>
            </tr>		    
        </tbody>

        <tfoot>
            <tr>
                <td id="mostraPaginas" style="display: none">
                    <div id="Pagination" class="pagination">
                    </div>
                </td>
            </tr>
        </tfoot>
            
    </table>
</div><!--ava_ativtable-->
