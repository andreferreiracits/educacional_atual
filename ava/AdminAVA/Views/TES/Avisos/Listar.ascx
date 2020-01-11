<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVABarraAvisos>>"%>


<table width="100%" border="0" cellpadding="0" cellspacing="0" class="tb_avisos">
              <thead>
               <tr>
                <td width="69%">avisos</td>
                <td width="9%">De:</td>
                <td width="9%">Até:</td>
                <td width="13%"></td>
                </tr>
              </thead>
              

              <%            
                if (Model.Count > 0)
                {                    

                    foreach (var item in Model)
                    {
                        %>
                    
                        <tr>
                            <td><%=item.strMensagem%></td>
                            <td><%=item.dtmInicio%></td>
                            <td><%=item.dtmFim%></td>
                            <td>
                            <a class="bt_normal green_light" href="/AVA/AdminAVA/Avisos/Editar/<%=item.id %>"><%=item.id%></a>
                            <a class="bt_normal red_light" href="/AVA/AdminAVA/Avisos/Excluir/<%=item.id %>">Excluir</a>
                            </td>
                        </tr>                                         
                        <%
                }
                }
                else
                {                    
            %>
                    <tr>
                        <td colspan="6">Nenhum aviso encontrado.</td>
                    </tr>
            <%
                }
            %>

              <TFOOT>
                      <tr>
                        <td colspan="4">
                        
                        		<ul class="ava_paginas">
                                	<li class="ava_previous "><a href="#">« Anterior</a></li>
                                    <li class="pag_ativa "><a href="#">6</a></li>
                                    <li class=" "><a href="#">7</a></li>
                                    <li class=" "><a href="#">8</a></li>
                                    <li class=" "><a href="#">9</a></li>
                                    <li class=" "><a href="#">10</a></li>
                                    <li class="ava_next "><a href="#">Próxima »</a></li>
                                </ul>
                        
                        </td>
                      </tr>
                  </TFOOT>
        </table>

