<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Pesquisa.Business.Models.Publicacao>>" %>
<div class="cabe_p">
                       
        <div class="cabe_p_stats"></div>
                        
        <input type="checkbox" name="bolMobilePesq" class="onoffswitch-checkbox" id="bolMobilePesq" <% if (Request["bolMobileCookie"] == "true"){%>checked="true"<%}%> >
        <nav id="midia_suport">
            <ul>
	            <li <% if (Request["bolMobileCookie"] != "true"){%>class="seleciona"<%}%>><a href="#" onclick="setBolMobile(false)" onmouseover="showToolTip(false)" onmouseout="hideToolTip()"></a></li> 
	            <li <% if (Request["bolMobileCookie"] == "true"){%>class="seleciona"<%}%>><a href="#" onclick="setBolMobile(true)" onmouseover="showToolTip(true)" onmouseout="hideToolTip()"></a></li>
             </ul>
        </nav>
        <div class="tooltip_branco baixo_pos" style="z-index:9999;position: absolute; right: 75px; top: -48px; display: none;">
            <label id="lblToolTipPesq"></label>
            <span class="seta_tooltip_pe fontello"></span>
        </div>
</div> 
                    
<%
    string classe;
    if(Convert.ToInt32(ViewData["totRankeado"]) == 1){
        classe = "um-destaque";
    }else if(Convert.ToInt32(ViewData["totRankeado"]) == 2){
        classe = "dois-destaque";
    }
    else if (Convert.ToInt32(ViewData["totRankeado"]) >= 3)
    {
        classe = "tres-destaque";
    }
    else
    {
        classe = "";
    }
 %>                    
                    <ol id="apesquisa" class="<%:classe%>">
<%
    if (Model != null && Model.Count > 0)
    {
        int i = 1;
        foreach (var item in Model)
        {
           
            %>
            <% if (Convert.ToInt32(ViewData["totRankeado"]) > 0 && i < 4 && i <= Convert.ToInt32(ViewData["totRankeado"]))
               {
                   string tex = item.strTexto;
                   if (tex.Length > 85)
                   {
                       tex = tex.Substring(0,85) + "...";
                   }
                   %>
                            <li style="background:url(<%=item.path_img%>)" class="pesq priori p_<%:i%>">
                            <div class="bl_p   ">
                            <%       
                              if (item.idCategoria == 347)
                              {%>
                                    <a class="lk_res_icon" href="#" onclick="abrirExplore(<%:item.idPublicacao%>, '<%:item.bolMobile%>');">
                             <%}else{
                                  if (item.idCategoria == 331 && item.strLink.ToLower().IndexOf("podcasts") >= 0)
                                  {%>
                                    <a href="#" onclick="abrirPodCasts('<%=item.strLink%>');">
                                <%}else{%>
                                    <a class="lk_res_icon" href="<%=item.strLink%>" target="_blank">          
                                <%}
                              } %>
                                <div style="background:url(<%=item.path_img%>)" class="res_icon">
                                </div>
                            </a>	
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
                                        <a href="#" onclick="abrirExplore(<%:item.idPublicacao%>, '<%:item.bolMobile%>');"><%=item.strTitulo%></a>
                                    <%}else{
                                          if (item.idCategoria == 331 && item.strLink.ToLower().IndexOf("podcasts") >= 0)
                                          {%>
                                                <a href="#" onclick="abrirPodCasts('<%=item.strLink%>');"><%=item.strTitulo%></a>
                                        <%}else{%>
                                                <a href="<%=item.strLink%>" target="_blank"><%=item.strTitulo%></a>
                                        <%}
                                      }%>
                                    </h3> 
                                    <span class="desc_titulo_p"><%=item.strCategoria%></span>
                                </div>
                                <span class="desq_p"><%=tex%></span>
                            </div> 
                            </li>
                            
            <%}else{ %>
                            
                            <li class="pesq">
                                <div class="bl_p">
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
                                                <a href="#" onclick="abrirExplore(<%:item.idPublicacao%>, '<%:item.bolMobile%>');"><%=item.strTitulo%></a>
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
            <%} %>    
            <%
                i++;
    }
    }
    else
    {
        %>
            <li class="pesq">
                <div class="bl_p">Nenhum resultado encontrado.</div>
            </li>
        <%    
    
    }
    
    
%>

<li class="pesq" id="li_imagens">
<div class="bl_p"><img src="Imagens/ajax-loader.gif"></div>
</li>
<li class="pesq" id="li_mapas">
<div class="bl_p"><img src="Imagens/ajax-loader.gif"></div>
</li>
<li class="pesq" id="li_videos">
<div class="bl_p"><img src="Imagens/ajax-loader.gif"></div>    
</li>
<div id="li_pags">
<div class="bl_p"><img src="Imagens/ajax-loader.gif"></div>    
</div>

</ol>
                    
                    <div class="rodape_resultados">
                    
                    
                    </div>
          