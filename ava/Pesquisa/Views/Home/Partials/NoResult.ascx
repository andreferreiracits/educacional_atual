<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
 
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
    <br />
   
<ol id="apesquisa">
                    	<li class="sem_resultado">
                            <img width="118" height="118" src="Imagens/aviso_negativo.gif">
                            <%
                                if (Convert.ToInt32(ViewData["bolFitradoesp"]) == 1)
                              { %>
                                <p>Não foi encontrado nenhum conteúdo para <strong>"<%:ViewData["palavra"]%>"</strong>, com os filtros solicitados.</p>
                                <p>Altere-os ou clique em <strong>Mostrar tudo</strong>.</p>
                           
                            <%
                                }  else if (Convert.ToInt32(ViewData["bolFitradoesp"]) == 2){
                                     %>
                                         <p>Digite o termo desejado, contendo ao menos 2 caracteres.</p>
                                     <%       
                               }      
                                
                              else
                              {
                                    %>

                                    <%
                                 string betafester = Convert.ToString(ViewData["palavra"]); 
                                if (betafester.Length > 50)
                                {
                                    betafester = betafester.Substring(0, 50) + "...";
                                }else{
                                    betafester = betafester;
                                }        
                             %>
                            <p>Não foi encontrado nenhum conteúdo para <strong>"<%:betafester%>"</strong>.</p>
                            <p>Se a palavra-chave consultada não for encontrada, verifique se sua grafia está correta ou utilize um sinônimo.</p>
                            <%
                                } 
                                %>
                        </li>

                    </ol>
        