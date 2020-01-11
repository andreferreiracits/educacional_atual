<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Pesquisa.Business.Models.Publicacao>>" %>
<input type="hidden" value="<%:((Pesquisa.Business.Models.Contador)ViewData["Contador"]).categorias%>" name="new_categorias_filt" id="new_categorias_filt">
<div class="cabe_p">
    <div class="cabe_p_stats"><%:((Pesquisa.Business.Models.Contador)ViewData["Contador"]).geral%> resultados para <b><%:ViewData["palavra"]%></b>
    </div>    
    
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
<ol id="apesquisa">
<%
    if (Model != null && Model.Count > 0)
    {
        foreach (var item in Model)
        {
            %>
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
                                                    <a href="#" onclick="abrirExplore(<%:item.idPublicacao%>, '<%:item.bolMobile%>')"><%=item.strTitulo%></a>
                                            <%}else{
                                                  if (item.idCategoria == 331 && item.strLink.ToLower().IndexOf("podcasts") >= 0)
                                                  {%>
                                                        <a href="#" onclick="abrirPodCasts('<%=item.strLink%>');"><%=item.strTitulo%></a>
                                                <%}else{%>    
                                                        <a href="<%=item.strLink%>" target="_blank"><%=item.strTitulo%></a>
                                                <%}
                                              }%>
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
            <li class="pesq">
                <div class="bl_p">Nenhum resultado encontrado.</div>
            </li>
        <%    
    
    }
    
    
%>
</ol>
  <%=ViewData["pags"].ToString()%>
  
   <div class="rodape_resultados">
                    
            </div>        