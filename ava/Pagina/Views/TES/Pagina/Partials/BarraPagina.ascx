<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Pagina.Models.PaginaEducacional>" %>

<div class="barra_topo_itens">
	<div class="info_grupo_topo">
		<img src="/AVA/StaticContent/Common/img/paginas/educacional/topo_educacional.jpg" alt="<%=Model.strTitulo%>" class="img_topo_paginas" />
		<div class="foto_grupo">
			<a href="javascript: void(0)">
				<img alt="<%=Model.strTitulo%>" src="/AVA/StaticContent/Common/img/paginas/educacional/logo_educacional.png" />
			</a>
		</div>
        <div class="nome_grupo">
			<h2 class="komika"><%=Model.strTitulo%></h2>
			<p>Fique por dentro das nossas novidades</p>
		</div>
	</div>	
</div>

