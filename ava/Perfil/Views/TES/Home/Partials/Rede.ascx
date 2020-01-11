<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Perfil.Models.MainPerfilPrivado>" %>
<ul>
   <li class="p_bg p_dica discreto">Selecione grupos e pessoas</li>
            <% if (Convert.ToBoolean(ViewData["turma"])){%>
                   <%if (Model.bolEducador) { %>
                    
                         
                         <%
                            if (Model.turmas != null)
                            {
                                foreach (var item in Model.turmas)
                                {
                                %>
                                    
                                    
                                        <%
                                            var total_alunos = 0;
                                            if (item.alunos != null)
                                            {
                                                total_alunos = item.alunos.Count;
                                            }
                                        %>
                                      
                                    <li class="unico turma" ident="<%:item.id%>"><a href="#" class="p-a-default"><%:item.strNome%> <span class="discreto" all_el="<%:total_alunos%>">(<%:total_alunos%>)</span></a><a href="#" class="p-a-perso invert">Personalizar</a></li>
                                <%
                                }
                            }
                        %>
                    
                    <%}else{%>
                        
                       
                            <%
                                    var total_alunos = 0;
                                    if (Model.colegas != null)
                                    {
                                        total_alunos = Model.colegas.Count;
                                    }
                                %>
                        
                        <li class="unico" ident="<%:Model.idTurma%>"><a href="#" class="p-a-default"><%:Model.strTurma%> <span class="discreto" all_el="<%:total_alunos%>">(<%:total_alunos%>)</span></a><a href="#" class="p-a-perso invert">Personalizar</a></li>
                    <%} %>
               
               <%} %>
               <% if (Convert.ToBoolean(ViewData["seguidor"])){%>         
                        <% 
                            var total = 0;
                            if (Model.seguidores != null)
                            {
                                total = Model.seguidores.Count;
                            %>
                            <li class="unico" ident="seguidores"><a href="#" class="p-a-default">Seguidores <span class="discreto" all_el="<%:total%>">(<%:total%>)</span></a><a href="#" class="p-a-perso invert">Personalizar</a></li>
                            <%
                            }
               }
               if (Convert.ToBoolean(ViewData["professor"])){
                            var total = 0;
                            if (Model.educadores != null)
                            {
                                total = Model.educadores.Count;
                            %>
                            <li class="unico" ident="professores"><a href="#" class="p-a-default">Professores <span class="discreto" all_el="<%:total%>">(<%:total%>)</span></a><a href="#" class="p-a-perso invert">Personalizar</a></li>
                            <%
                            }
                }
                        %>
                        
</ul>
                