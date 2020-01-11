<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Pesquisa.Business.Models.Publicacao>>" %>

<%
    if (Model != null && Model.Count > 0)
    {
        foreach (var item in Model)
        {
            %>
                <li class="pesq">
                                <div class="bl_p">
                                    <!--a class="lk_res_icon" href="#">
                                        <div style="background:url()" class="res_icon">	
                                        </div>
                                    </a-->
                                  <div class="cont">
                                    <div class="titulo_p">
                                        <h3 class="res_p">
                                        <%
                                          if (item.bolMobile)
                                          {
                                              %>
                                              <span><img src="Imagens/tablet.png" width="16" height="16" alt="Compatível com dispositivos móveis" title="Compatível com dispositivos móveis"></span>
                                              <%
                                          }   
                                          if (item.idCategoria == 347)
                                          {%>
                                            <a href="#" onclick="abrirExplore(<%:item.idPublicacao%>, '<%:item.bolMobile%>')"><%=item.strTitulo%></a>
                                        <%}else{
                                              if (item.idCategoria == 331 && item.strLink.ToLower().IndexOf("podcasts") >= 0)
                                              {%>
                                                    <a href="#" onclick="abrirPodCasts('<%=item.strLink%>');"><%=item.strTitulo%></a>
                                            <%}else{%>
                                                    <a href="<%=item.strLink%>" target="_blank"><%=item.strTitulo%></a>
                                            <%}
                                          } %>
                                        </h3> <span class="desc_titulo_p">- <%=item.strCategoria%></span>
                                    </div>
                                    <span class="desq_p"><%=item.strTexto%></span>
                                  </div> 
                                </div> 
                            </li>
            <%
        }
        
    }
    else
    {
        %>
            <!--li class="pesq">
                <div class="bl_p">Nenhum resultado encontrado.</div>
            </li-->
        <%    
    
    }
    
    
%>

          