<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Pesquisa.Business.Models.Publicacao>>" %>

<%
            string tit = Convert.ToString(ViewData["sec"]);
            if (Convert.ToInt32(ViewData["total"]) <= 1)
            {
                tit = "vídeo";
            }
        
        %>

<div class="cabe_p">
      <div class="cabe_p_stats"><%=ViewData["total"]%> <%:tit%>  para <b><%:ViewData["palavra"]%></b></div>
</div>

<ol class="" id="apesquisa">
    <li class="pesq">       
                             <div class="">
                              
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
                                                    img_link = item.path_img.Replace("width=90 height=70","");
                                                }
                                                %>
                                        
                                                    
                                        	            <li class="bl_p vid_fancy" end="<%:item.strLink%>" texto="<%:item.strTexto%>" cat="<%:item.idCategoria%>" pub="<%:item.idPublicacao%>"> 
                                                            <a class="videofancy" href="#videofancy" id="item-<%:item.idPublicacao%>"><%=img_link%></a>
                                                
												                <span class="titulo_p">
                                    					                <h3 class="res_p">
                                                        	                <a class="videofancy" href="#videofancy"><%=item.strTitulo%></a>	
                                                                        </h3> 
                                                                        <span class="desc_titulo_p"><%=item.strCategoria%></span>
                                				                </span>
                                                
                                                
                                                        </li>
                                                   
                                                
                                             <%
                                            }     
                                        %>
                                     </ul>
                                   </div>
                               </div>
                             </li>                
                                        
  </ol>
   
   
       
            
  <input type="hidden" value="<%=ViewData["total"]%>" id="totImg" name="totImg">
  <input type="hidden" value="<%:ViewData["sec"]%>" id="secao" name="secao">
  <%=ViewData["pags"].ToString()%>
             <div class="rodape_resultados">
                    
            </div>