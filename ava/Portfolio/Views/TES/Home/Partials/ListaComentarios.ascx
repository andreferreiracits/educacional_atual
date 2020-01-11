<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Portfolio.Model.ComentarioAVA>>" %>
  <div class="modal modal_comentario" id="comentario">
  	<header>
           <span class="thumb_porf"><img src='<%= ViewData["strThumb"] %>' width="91" height="53" style="margin: 5px 3px;" /></span>
			<h2 class="din"><%= ViewData["strProducao"] %></h2>
			<p><%= ViewData["DescricaoFerramenta"]%></p>
			<ul class="acoes">
            	<li class="gostar <%= (bool) ViewData["jaCurtiu"] ? "ativo" : "" %>" idProducaoUsuario="<%= ViewData["idProducaoUsuario"] %>"><a href="javascript:void(0);" title="<%= (bool) ViewData["jaCurtiu"] ? "Você gostou disto (desfazer)" : "Gostar" %>"></a></li>	
			</ul>
		</header>
		<section>
			<h3 class="comentarios_light din">Comentários</h3>
			<div class="box_comentario" id="comentariosAjax">
                <%
                 //Verifico se a quantidade de comentários é maior que zero.
                  if (Model.Count > 0)
                  {
                      if (Model.Count > 5) // Verifica se tem mais de 5 comentários para agrupa-los
                      { 
                        %>
                            <a class="exibir" href="javascript:void(0);">
                                    Exibir todos os <strong class="totalComentarios"><%= Model.Count%> comentários</strong>
                                <span class="seta">&nbsp;</span>
				            </a>
				        <%
                        }
                        else 
                        {
                            if (Model.Count > 1)
                            {
                        %>
				            <a class="exibir" href="javascript:void(0);">
                                 <strong><%= Model.Count%> comentários</strong>
				            </a>
				        <% 
                            }
                            else
                            {
                                %>
                            <a class="exibir" href="javascript:void(0);">
                                <strong><%= Model.Count%> comentário</strong>
				            </a>
                                <%
                            }
                        }               
                        Html.RenderPartial("Partials/BuscaComentarioProducao", Model);
                  }
                  else { %>
                    <a class="exibir" style="display:none;" href="javascript:void(0);">
                        
                    </a>
                    <span class="semComentarios">Este material ainda não recebeu nenhum comentário.</span>
                  <%
                  }
                %>				
			</div>
			<form class="comentar_texto">
				<span class="thumb_usuario">
                   <img src="<%= ViewData["strMiniFotoLogado"].ToString() %>" height="33" width="33" />
                </span>
				<textarea cols="58" rows="1" placeholder="Escreva um comentário..." id="txtComentario<%= ViewData["idProducaoUsuario"] %>"></textarea>
				<input type="button" class="btn_laranja btnEnviarComentario" ident="<%= ViewData["idProducaoUsuario"] %>" value="Enviar"/>
			</form>
								
		</section>
		<a class="btn_cinza" onClick="$.fancybox.close();" href="javascript:;">
			<span class="iconic">x</span>
			Fechar
		</a>
</div>	
