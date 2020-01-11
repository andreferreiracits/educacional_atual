<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Pesquisa.Business.Models.Publicacao>" %>




<ol id="apesquisa">
                    	<li class="sem_resultado">
                        <%
                            
                            

                                if (Model != null)
                                {
 %>
                            <img width="118" height="118" src="Imagens/aviso_positivo.gif">    
                            <p>Foi encontrado um resultado para <strong>"<%:ViewData["palavra"]%>"</strong>.</p>
                            
                            <%if (Model.strLink.IndexOf("aprendebrasil") >= 0){%>
                                <p>O código digitado se refere a um link do Livro Integrado Aprende Brasil:
                            <%}else{%>
                                <p>O código digitado se refere a um link do Material Didático Positivo:
                            <%}%>
                           
                            <a href="<%:Model.strLink%>" target="_blank"><%:Model.strTitulo%></a></p>
                            <script> var strURL = '<%:Model.strLink%>';
                                    strURL = strURL.replace(/&amp;/g, '&');
                                    window.open(strURL)</script>
 <%}else{ %>
                            <%
                                 string betafester = Convert.ToString(ViewData["palavra"]); 
                                if (betafester.Length > 100)
                                {
                                    betafester = betafester.Substring(0, 100) + "...";
                                }else{
                                    betafester = betafester;
                                }        
                             %>
                             <img width="118" height="118" src="Imagens/aviso_negativo.gif">
                            <p>Não foi encontrado nenhum conteúdo para <strong>"<%:betafester%>"</strong>.</p>
                            <p>Se a palavra-chave consultada não for encontrada, verifique se sua grafia está correta ou utilize um sinônimo.</p>
 <%} %>
                        </li>

                    </ol>
                    
        