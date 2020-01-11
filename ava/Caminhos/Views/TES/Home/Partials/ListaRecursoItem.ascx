<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.RecursoItem>>" %>
<%
    int idCategoria = (int) ViewData["idCategoria"];
    string strPesquisa;
    if (ViewData["strPesquisa"] == "" || ViewData["strPesquisa"] == null)
    {
        strPesquisa = "";
    }
    else
    {
        strPesquisa = ViewData["strPesquisa"].ToString();
    }
    int idRecurso = (int) ViewData["idRecurso"]; //2
 %>
  
<script type="text/javascript">
    var idCategoria = <%=idCategoria %>;
    var strPesquisa = "<%=strPesquisa %>";
    var idRecurso = <%=idRecurso %>;    
</script>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <TBODY class="tablebody">
        <tr>
            <td>
                <div class="ava_container_masonry">
                    <%
                        if (Model.Count > 0)
                        {  
                            if (Model[0].idCategoria == 16 || Model[0].idCategoria == 26)
                            {
                            %>
                            <!--<ul style="list-style: none;" class="ava_imgspilha ava_container_masonry">-->
                                <%
                                foreach (var recursoItem in Model){
                                    %>
                                    <!--<li class="este ava_box_masonry"  style="float: left; width: 160px; margin-left: 5px;">
                                        <a href="javascript: inserirRecurso(<%=recursoItem.idRecurso%>, <%=recursoItem.idPublicacao%>)">
                                            <img src="/<%=recursoItem.strThumbItem%>" alt="nome do recurso">
                                        </a>-->
                                        <div class="ava_box_masonry r-l-desc"  id="rItem_<%=recursoItem.id %>">
                                        <a href="javascript: inserirRecurso(<%=recursoItem.idRecurso%>, <%=recursoItem.idPublicacao%>)">
                                            <img width="100" height="100" src="/<%=recursoItem.strThumbItem%>" alt="nome do recurso" border="0">
                                    
                                    
                                            <span>
                                                <h5><%=recursoItem.strTitulo%></h5>
                                                <%=recursoItem.strDescricao%>
                                            </span>
                                            </a>
                                        </div>
                                    <!--</li>-->
                                    <%
                                }
                                %>
                            <!--</ul>-->
                            <%
                            }
                            else
                            {
                                foreach (var recursoItem in Model)
                                {
                                    %>
                                    <div class="ava_box_masonry r-l-desc" id="rItem_<%=recursoItem.id %>">
                                        <a href="javascript: inserirRecurso(<%=recursoItem.idRecurso%>, <%=recursoItem.idPublicacao%>)">
                                            <img src="<%=recursoItem.strThumbItem%>" width="55" height="55" alt="nome do recurso">
                                    
                                            <span>
                                                <h5><%=recursoItem.strTitulo%></h5>
                                                <%=recursoItem.strDescricao%>
                                            </span>
                                            
                                        </a>
                                            
                                        <%
                                            if (recursoItem.idCategoria.Equals(159))
                                            {
                                        %>
                                        <a href="<%=recursoItem.strLink %>" target="_blank" class="bt_normal ava_visualizar">Visualizar</a>
                                        <%
                                            }
                                        %>
        
                                    </div>  
                                    <%
                                }
                            }
                        }else{
                            Response.Write("Nenhum recurso encontrado.");
                        }
                        %>       
                </div>
            </td>
        </tr>
    </TBODY>    
</table>