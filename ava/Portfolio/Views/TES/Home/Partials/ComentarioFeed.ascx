<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Portfolio.Business.Model.ComentarioAVA>>" %>
<!-- Modal comentario -->
<div style="display:none">
    <% if (Model != null){ %>
	<div class="modal modal_comentario" id="comentario">
		<header>
           <span class="thumb_porf"><img src='http://local.educacional/<%= ViewData["strThumb"] %>' /></span>
			<h2><%= ViewData["strProducao"] %></h2>
			<!--h3 class="din">Minha Árvore</h3-->
			<p><%= ViewData["DescricaoFerramenta"]%></p>
			<ul class="acoes">
				<li class="gostar"><a href="javascript:void(0);"></a></li>	
				<!--<li class="comentar"><a href="javascript:void(0);"></a></li>-->	
			</ul>
			<!--<ul class="resumo_light din">
				<li class="curtir">
					25
					<span></span>
					<span></span>
				</li>
				<li class="compartilhar">04</li>
			</ul>-->
		</header>
		<section>
			<h3 class="comentarios_light din">Comentários</h3>
			<div class="box_comentario">
				<a class="exibir" href="javascript:void(0);">
					Exibir todos os <strong><%= ViewData["quantidadeCurtidas"]%> comentários</strong>
					<span>&nbsp;</span>
				</a>
				<%
                    Html.RenderPartial("Partials/ListaComentarios", Model);
                %>				
			</div>
			<form class="comentar_texto">
				<span class="thumb_usuario"></span>
				<textarea cols="58" rows="1" placeholder="Escreva um comentário..."></textarea>
				<input type="button" class="btn_laranja" value="Enviar"/>
			</form>
								
		</section>
		<a class="btn_cinza" onClick="$.fancybox.close();" href="javascript:;">
			<span class="iconic">x</span>
			Fechar
		</a>
	</div>
    <% }%>
</div>	
<!-- Fim modal comentario-->