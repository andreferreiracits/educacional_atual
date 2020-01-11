<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Perfil.Models.MensagemRapidaComentario>" %>

                            	        <p>
                                         
                                            <%
                                                 string curtidor; 
                                                 foreach (var item_curtidas_c in Model.curticoes.Select((x, i) => new { Value = x, Index = i }))
                                                 {
                                                     if ((int)ViewData["idUsuario"] == item_curtidas_c.Value.idUsuario)
                                                     {
                                                       curtidor = "<span>Você</span> ";  
                                                     }else{
                                                         curtidor = "<a class='invert' alt='' title='' href='/AVA/Perfil/Home/Index/" + item_curtidas_c.Value.strLogin + "'>" + item_curtidas_c.Value.strNome + "</a> ";
                                                     }
                                                     Response.Write(curtidor);
                                                     if ((item_curtidas_c.Index == 0 && Model.intCurtidas == 2) || (item_curtidas_c.Index == 1 && Model.intCurtidas == 3))
                                                     {
                                                     %>
                                    
                                                     e 
                                                     <%}
                                                     else if (item_curtidas_c.Index <= 1 && Model.intCurtidas >= 3)
                                                     {
                                                     %>
                                    
                                                     , 
                                                     <%} %>     
                                     
                                      
                                                <% }%>
                                                <%if (Model.intCurtidas > 3)
                                                  {%>
                                                    <%if (Model.intCurtidas == 4)
                                                      {%>
                                                        e mais <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=6&id=<%:Model.IdComentario%>" class="invert quem_gostou_cmt" ide="<%:Model.IdComentario%>">uma pessoa</a> 
                                                    <%} %>
                                                    <%if (Model.intCurtidas > 4)
                                                      {%>
                                                        e mais <a href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=6&id=<%:Model.IdComentario%>" class="invert quem_gostou_cmt" ide="<%:Model.IdComentario%>"><%:(Model.intCurtidas - 3)%> pessoas</a>  
                                                    <%} %>
                                                <%} %>
                                                <%if (Model.intCurtidas == 1)
                                                  { %>
                                                        gostou
                                                     <%}else{ %>
                                                        gostaram
                                               <%} %>
                                               disso.
                                        
                                        </p> 
                                        <span class="black_tip_seta">&#9660;</span>
                         	        