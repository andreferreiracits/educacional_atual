<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVASegmentacao>>"%>

<%
    string opcao = ViewData["opcao"].ToString();
%>

<ul class="aviso_para_quem">
    <li>
        <div style="margin:-15px 0px 20px 0px; width: 335px;">
            <div>
                <a id="marcar_todos" class="bt_normal" href="javascript:void(0)">Marcar todos</a>
                <a id="desmarcar_todos" class="bt_normal" href="javascript:void(0)">Desmarcar todos</a>
            </div>
        </div>
        <ul>
            <li> 
                    <%
                    string educCheck = "checked";
                    foreach (var item_p in Model)
                    {
                        foreach (var item_p1 in item_p.listaAvisoPapel)
                        {
                            if (item_p1.idPapel == 3000001)
                            {
                                break;
                            }
                            educCheck = "";
                        }
                        break;
                    } 
                    %>
                    <input type="checkbox" name="papel[]" value="3000001, 4000001, 5000001, 6000001" <%=educCheck %>/><label for="aviso-educadores">Educadores</label></li>
            <li> 
                    <%
                    string paisCheck = "checked";
                    foreach (var item_p in Model)
                    {
                        foreach (var item_p1 in item_p.listaAvisoPapel)
                        {
                            if (item_p1.idPapel == 2000001)
                            {
                                paisCheck = "checked";
                                break;
                            }
                            paisCheck = "";
                        }
                        break;
                    } 
                    %>
             <input type="checkbox" name="papel[]" value="2000001" <%=paisCheck %>/><label for="aviso-pais">Pais</label></li>
            <li>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="input_aluno">Alunos</label>
                <%
                    
                    /*
                    foreach (var item_p in Model)
                    {
                        foreach (var item_p1 in item_p.listaAvisoSegSerie)
                        {
                            Response.Write(item_p1.idSegmentacao + "-" + item_p1.idSerie);
                        }
                        break;
                    }
                    */

                    if (Model.Count > 0)
                    {
                        %>
                            <ul>
                        <%
                        foreach (var item in Model)
                        {
                            %>
                                <li><strong><%=item.strSegmentacao%></strong>
                                    <ul>
                            <%
                              

                            if (item.listaSegmentacaoSerie.Count > 0)
                            {
                               
                                foreach (var item2 in item.listaSegmentacaoSerie)
                                {
                                    int aux1 = 0;
                                    if (item.listaAvisoSegSerie.Count > 0)
                                    {
                                        
                                        foreach (var item3 in item.listaAvisoSegSerie)
                                        {
                                            if (item.id == item3.idSegmentacao && item2.idSerie == item3.idSerie)
                                            {
                                                aux1 = 1;
                                                %>
                                                    <li><input type="checkbox" name="segmentoSerie[]" value="<%=item.id %>-<%=item2.idSerie%>" checked /><label><%=item2.strSerie%></label></li>
                                                <%
                                            }

                                           
                                        }

                                        if (aux1 != 1)
                                        {
                                        %>
                                            <li><input type="checkbox" name="segmentoSerie[]" value="<%=item.id %>-<%=item2.idSerie%>" /><label><%=item2.strSerie%></label></li>
                                        <%
                                        }
                                        
                                    }
                                    else
                                    {
                                        if (opcao == "criar")
                                        {
                                            %>
                                                <li><input type="checkbox" name="segmentoSerie[]" value="<%=item.id %>-<%=item2.idSerie%>" checked /><label><%=item2.strSerie%></label></li>
                                            <%
                                        }
                                        else
                                        {
                                            %>
                                                <li><input type="checkbox" name="segmentoSerie[]" value="<%=item.id %>-<%=item2.idSerie%>" /><label><%=item2.strSerie%></label></li>
                                            <%
                                        }
                                        
                                        

                                    }

                                }
                                
                                
                            }
                            else
                            {
                                %>
                                    <li>Nenhuma série encontrada!</li>
                                <%
                            }
                            %>
                                    </ul>
                                </li>
                            <%
                        }

                    }
                    %>
                        </ul>

            </li>
        </ul>
    </li>
</ul>




