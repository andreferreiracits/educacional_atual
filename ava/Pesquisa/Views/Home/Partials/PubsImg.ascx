<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Pesquisa.Business.Models.Publicacao>>" %>

<%
            string tit = Convert.ToString(ViewData["sec"]);
            string artigo = "";
            if (tit == "imagens")
            {
                artigo = "as";
            }
            else
            {
                artigo = "os";
            }
            if (Convert.ToInt32(((Pesquisa.Business.Models.Contador)ViewData["Contador"]).geral) <= 1)
            {
                if (tit == "imagens")
                {
                    tit = "imagem";
                    artigo = "a";
                }else{
                    tit = "mapa";
                    artigo = "o";
                }
                
            }
            if (Model != null){
            %>

                            <div class="bl_pics">
                                <div class="titulo_p">
                                    <!--h3 class="res_p"><a href="#"><%:ViewData["sec"]%> de <b><%:ViewData["palavra"]%></b></a></h3> <span class="titulo_p_stats"><a href="#"><%=((Pesquisa.Business.Models.Contador)ViewData["Contador"]).geral%> <%:tit%></a></span-->
                                    <h3 class="res_p"><a href="#"><%=((Pesquisa.Business.Models.Contador)ViewData["Contador"]).geral%> <%:tit %> para <%:ViewData["palavra"]%></a></h3> 
                                </div>
                                <div class="am-container" id="am-container">
                                    
                                        
                                        <%
                                            foreach (var item in Model)
                                            {
                                                %>
                                                    
                                        	            
                                        	            <a href="#"  id="item-<%:item.idPublicacao%>">
                                        	            <img height="80" border="0" src="<%:item.path_img%>">
                                        	            </a>
                                                    
                                                <%
                                            }     
                                        %>

                                        
                                    
                                    
                                </div>
                            </div> 
              <%}else {%>0<%} %>      