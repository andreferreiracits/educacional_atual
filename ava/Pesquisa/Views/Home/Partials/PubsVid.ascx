<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Pesquisa.Business.Models.Publicacao>>" %>
<%
    if (Model != null){
            string tit = Convert.ToString(ViewData["sec"]);
            string artigo = "os";
            if (Convert.ToInt32(((Pesquisa.Business.Models.Contador)ViewData["Contador"]).geral) <= 1)
            {
                tit = "vídeo";
                artigo = "o";
            }
        
        %>


                           
                             <div class="">
                               <div class="titulo_p bl_vids">
                                    <h3 class="res_p"><a href="#"><%=((Pesquisa.Business.Models.Contador)ViewData["Contador"]).geral%> <%:tit %> para <%:ViewData["palavra"]%></a></h3> 
                                    <!--h3 class="res_p"><a href="#"><%:ViewData["sec"]%> de <b><%:ViewData["palavra"]%></b></a></h3> <span class="titulo_p_stats"><a href="#"><%=((Pesquisa.Business.Models.Contador)ViewData["Contador"]).geral%> <%:ViewData["sec"]%></a></span-->
                                </div>
                                <div class="res_imgs">
                                    <ul class="r_vid_galeria">
                                    
                                    <%
                                            string img_link;
                                            foreach (var item in Model)
                                            {
                                                if (item.idCategoria == 345 || item.idCategoria == 365)
                                                {
                                                    img_link = "<img src=" + item.path_img + " width=169 height=127>";
                                                }
                                                else
                                                {
                                                    img_link = item.path_img.Replace("width=90 height=70", "");
                                                }    
                                                %>
                                                <li class="bl_p" <%if (item.RANK > 9000){%> id="videoDestaque"<%}%> > 
                                        		        
                                                        <a href="#"  class="item-<%:item.idPublicacao%>"><%=img_link%></a>
												        <span class="titulo_p">
                                    					        <h3 class="res_p">
                                                        	        <a href="#" class="item-<%:item.idPublicacao%>"><%=item.strTitulo%>  </a>	
                                                                </h3> 
                                                                <span class="desc_titulo_p">- <%=item.strCategoria%></span>
                                				        </span>
                                				
                            			        </li>	
                                                <%
                                            }     
                                        %>
 
 
                                    </ul>
                                    
                                </div>
                            </div>   
                                
                                
        <%} %>               