<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Portfolio.Model.CurtirAVA>" %>
<%if (Model.intCurtidas > 0) {%>
<div class="comment_article clearfix mensagem_gostei_container" <%:ViewData["hide"]%>>
<input type="hidden" value="<%:Model.intCurtidas%>" name="total_msg_curtido"/> 
                               <i class="icon_gostei_G"></i>
                                
                               <%
                                 string curtidor; 
                                 foreach (var item_curtidas in Model.curticoes.Select((x, i) => new { Value = x, Index = i }))
                                 {
                                     if ((int)ViewData["idUsuario"] == item_curtidas.Value.idUsuario){
                                       curtidor = "<span>Você</span>";  
                                     }else{
                                         curtidor = "<a class='' alt='' title='' href='/AVA/Perfil/Home/Index/"+item_curtidas.Value.strLogin+"'>" + item_curtidas.Value.strNome + "</a>";
                                     }
                                     Response.Write(curtidor);
                                     if ((item_curtidas.Index == 0 && Model.intCurtidas == 2) || (item_curtidas.Index == 1 && Model.intCurtidas == 3))
                                     {
                                     %>
                                    
                                     e 
                                     <%}
                                     else if (item_curtidas.Index <= 1 && Model.intCurtidas >= 3)
                                     {
                                     %>
                                    
                                     , 
                                     <%} %>     
                                     
                                      
                                <% }%>
                                <%if (Model.intCurtidas > 3)
                                  {%>
                                    <%if (Model.intCurtidas == 4)
                                      {%>
                                        e mais <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5" class="invert quem_gostou_msg">uma pessoa</a> 
                                    <%} %>
                                    <%if (Model.intCurtidas > 4)
                                      {%>
                                        e mais <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5" class="invert quem_gostou_msg"><%:(Model.intCurtidas - 3)%> pessoas</a>  
                                    <%} %>
                                <%} %>
                                <%if (Model.intCurtidas == 1)
                                  { %>
                                        gostou
                                     <%}else{ %>
                                        gostaram
                               <%} %>
                               disso.
    </div>
 <%} %> 