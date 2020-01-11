<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div class="cabe_p">
    <div class="cabe_p_stats"><%:ViewData["contador"]%> resultados para <b><%:ViewData["palavra"]%></b>
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

<ol id="apesquisa"> </ol>
                    
<div class="rodape_resultados"> </div>
          
        