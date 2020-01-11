<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Portfolio.Model.CurtirAVA>>" %>

<!-- Modal Compartilhar e Curtir -->
<div class="modal modal_gostaram" id="share_curtir">
	<header>
		<span class="thumb_porf"><img src='<%= ViewData["strThumb"] %>' width="91" height="53" style="margin: 5px 3px;" /></span>
		<h2><%= ViewData["strProducao"] %></h2>
		<p><%= ViewData["DescricaoFerramenta"]%></p>
		<ul class="acoes">
            <li class="gostar <%= (bool) ViewData["jaCurtiu"] ? "ativo" : "" %>" idProducaoUsuario="<%= ViewData["idProducaoUsuario"] %>"><a href="javascript:void(0);" title="<%= (bool) ViewData["jaCurtiu"] ? "Você gostou disto (desfazer)" : "Gostar" %>"></a></li>	
		</ul>
	</header>
	<section class="listagem_curtidos">
        <%
            if (Model != null)
            {
                int Quantidade = Model.Count;
                if (Quantidade > 0)
                {     
            %>
            <h3 class="gostaram_light din">Gostaram<strong><%= Quantidade%></strong></h3>
		        <a href="javascript:void(0);" class="mudar_listagem"></a>	
		        <div class="lista_gostaram">	
			        <ul class=""> 
                        <%  
                        foreach (Portfolio.Model.CurtirAVA Curtidas in Model)
                        {
                                        %>
                                        <li class="<%= Quantidade > 14 ? "escondame" : "" %>">
						                    <a href="/AVA/Perfil/Home/Index/<%= Curtidas.strLogin %>" class="thumb_usuario tooltip_title" title="<%= Curtidas.strNome %>">
                                                <img src="<%= Curtidas.strMiniFoto %>" height="33" width="33" />
                                            </a>
                                            <a class="nome"><%= Curtidas.strNome%></a>
					                    </li>
                                        <% 
                        }
                        %>
			        </ul>
                    <% if (Quantidade > 14){%>
			            <a class="mais_curtidos" href="#">
				            <strong>+15</strong> gostaram
				            <span></span>	
			            </a>
                    <%} %>
		        </div>	
                <%
                }else{ 
                    %>
                    <div class="lista_gostaram">	
			            <ul class=""> 
                            <li>Este material ainda não foi gostado por ninguém.</li>
                        </ul>
                    </div>
                    <%
                }
            }    
            %>
	    </section>
	<a class="btn_cinza" onClick="$.fancybox.close();" href="javascript:;">
		<span class="iconic">x</span>
		Fechar
	</a>
</div>
<!-- Fim modal Compartilhar e Curtir-->		