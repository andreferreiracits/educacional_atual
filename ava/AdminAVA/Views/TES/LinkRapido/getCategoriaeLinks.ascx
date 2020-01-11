<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.LinkRapidoCategoria>>"%>

<%
    /*if(Model != null){
        Response.Write("<ul>");
        foreach(AdminAVA.Models.LinkRapidoCategoria lrC in Model){
            Response.Write("<li>" + lrC.strCategoria + "</li>");
            
            if (lrC.listaLinkRapido != null && lrC.listaLinkRapido.Count > 0)
            {
                Response.Write("<ul>");
                foreach (AdminAVA.Models.LinkRapido lr in lrC.listaLinkRapido)
                {
                    Response.Write("<li>" + lr.strTitulo + "</li>");
                }
                Response.Write("</ul>");
            }
            
            
        }
        Response.Write("</ul>");
    }*/
 %>
 
	<h2>Links</h2>
	<p>Aqui você administra a área de links exclusiva de sua escola que será visualizada por sua comunidade escolar.</p>
    <h3 class="links_titulo_cadastrados">Links Cadastrados <span>(Arraste os itens para alterar a ordem)</span></h3>
    <!--<button class="btn_cinza ativarOrdemCategoria"><span class="icone_reordenar"></span>Reordenar Categorias</button><br/>-->
    <div class="acoes right">	
		<a href="javascript:void(0);" class="cancelar_ordenacao" style="display: none;">Cancelar</a>
		<button class="btn_cinza ativarOrdemCategoria"><span class="icone_reordenar"></span>Iniciar ordenação de Categorias</button><br><br>
	</div>
    <div id="todosLinksRapidos">
        <%
            if (Model != null)
            {
                foreach (AdminAVA.Models.LinkRapidoCategoria lrC in Model)
                {

                    if (!(lrC.bolPadrao)) // Categoria não padrão
                    {
                        %>
                        <div class="linksCadastrados categoriaSortable" id-categoria="<%=lrC.idLinkRapidoCategoria %>" padrao="0">
							<div class="categoriaCont" id-categoria="<%=lrC.idLinkRapidoCategoria %>">
								<div class="categoriaLink">
									<span class="numeroOrdem din"><%=lrC.intOrdem.ToString()%></span>
									<div class="categoriaNome">
										<h4><%=lrC.strCategoria%></h4>
                                        <span class="fechar_categoria"></span>
										<!--a href="javascript:void(0);" onclick="abrirFecharLinks(this);" class="abrirFecharLinks">Abrir<span class="FontAwesome abrir"></span></a -->
                                        <a href="javascript:void(0);" class="abrirFecharLinks">Abrir<span class="FontAwesome abrir"></span></a>
                                        <div class="acoes">
											<a href="javascript:void(0);" class="editar" >Editar</a>
											<span>|</span>
											<a href="javascript:void(0);" class="mostraExclusao">Excluir</a>
                                            <!--<span class="black_tip_left tooltip black_tip_M" style="display:none;">
						                        <p>Deseja realmente excluir esta categoria? </p> 
						                        <a class="bt_normal green excluir" href="javascript: void(0);">sim</a>
						                        <a class="bt_normal red cancelar" href="javascript: void(0);">não</a>
						                        <span class="black_tip_seta"></span>
					                        </span>-->
										</div>
									</div>
                                    <div class="Feed_full" style="display: none;">
									    <p>Deseja excluir esta categoria e todos os links associados a ela?</p>
                                        <div class="acoesFeed">
											<a href="javascript: void(0);" class="bt_normal green excluir">Sim</a>
									        <a href="javascript: void(0);" class="bt_normal red cancelar">Não</a>
										</div>
									    
								    </div>
								</div>
							</div>
                            <div class="linkCont" style="display: none;">
                            <%
                                if (lrC.listaLinkRapido != null && lrC.listaLinkRapido.Count > 0)
                                {

                                    foreach (AdminAVA.Models.LinkRapido lr in lrC.listaLinkRapido)
                                    {                                        
                                        %>
                                        <div class="categoriaLink" id-link="<%=lr.idLinkRapido %>">
									        <span class="numeroOrdem din"><%=lr.intOrdem.ToString()%></span>
									        <div class="categoriaNome">
										        <a href="<%=lr.strLink %>" class="strTitulo"><%=lr.strTitulo%></a>
										        <span class="strLink"><a href="<%=lr.strLink %>" target="_blank"><%=lr.strLink%></a></span>
										        <div class="acoes">
											        <a href="javascript:void(0);" class="editar">Editar</a>
											        <span>|</span>
											        <a href="javascript:void(0);" class="remover_adm_cadastrados mostraExclusao"><span class="FontAwesome"></span>Excluir</a>
                    
                                                    <!--<span class="black_tip_left tooltip black_tip_M" style="display:none;">
						                                <p>Deseja realmente excluir este link? </p> 
						                                <a class="bt_normal green excluir" href="javascript: void(0);">sim</a>
						                                <a class="bt_normal red cancelar" href="javascript: void(0);">não</a>
						                                <span class="black_tip_seta"></span>
					                                </span>-->
										        </div>		
									        </div>
                                            <div class="Feed_full" style="display: none;">
									            <p>Deseja realmente excluir este link?</p>
                                                <div class="acoesFeed">
									                <a href="javascript: void(0);" class="bt_normal green excluir">Sim</a>
									                <a href="javascript: void(0);" class="bt_normal red cancelar">Não</a>
                                                </div>
								            </div>
								        </div>
                                        <%
                                    }
                                }
                            %>
                                <!--<form class="categoriaLink_editar">
								    <input type="text" class="din numeroOrdem" value="3">
								    <div class="categoriaNome_editar">
									    <input type="text" placeholder="Titulo do link"><br>
									    <input type="text" placeholder="Url">
									    <div class="acoes">
										    <input type="submit" class="btn_laranja" value="Salvar">
										    <input type="reset" class="btn_cinza" value="Cancelar">
									    </div>		
								    </div>
							    </form>-->
							    <button class="btn_verde criarNovoLink">+ Criar link</button>
                            </div>
							
						</div>
                        <%
                    }
                    else
                    {
                        
                        
                        %>
                        <div class="linksCadastrados" id-categoria="<%=lrC.idLinkRapidoCategoria %>" padrao="1">
							<div class="categoriaCont">
								<div class="categoriaLink ">
									<div class="categoriaNome semCategoria">
										<h4>Sem categoria</h4>
										<a href="javascript:void(0);" class="abrirFecharLinks">Fechar<span class="FontAwesome abrir"></span></a>
									</div>
								</div>
							</div>
                            <div class="linkCont">
                            <%
                                if (lrC.listaLinkRapido != null && lrC.listaLinkRapido.Count > 0)
                                {
                                    
                                    foreach (AdminAVA.Models.LinkRapido lr in lrC.listaLinkRapido)
                                    {
                                        
                                        %>
                                        <div class="categoriaLink" id-link="<%=lr.idLinkRapido %>">
									        <span class="numeroOrdem din"><%=lr.intOrdem.ToString() %></span>
									        <div class="categoriaNome">
										        <a href="<%=lr.strLink %>" class="strTitulo"><%=lr.strTitulo %></a>
										        <span class="strLink"><a href="<%=lr.strLink %>" target="_blank"><%=lr.strLink %></a></span>
										        <div class="acoes">
											        <a href="javascript:void(0);" class="editar">Editar</a>
											        <span>|</span>
                                                    <a href="javascript:void(0);" class="remover_adm_cadastrados mostraExclusao"><span class="FontAwesome"></span>Excluir</a>
                    
                                                    <!--<span class="black_tip_left tooltip black_tip_M" style="display:none;">
						                                <p>Deseja realmente excluir este link? </p> 
						                                <a class="bt_normal green excluir" href="javascript: void(0);">sim</a>
						                                <a class="bt_normal red cancelar" href="javascript: void(0);">não</a>
						                                <span class="black_tip_seta"></span>
					                                </span>-->
											        <!--<a href="#">Excluir</a>-->
										        </div>		
									        </div>
                                            <div class="Feed_full" style="display: none;">
									            <p>Deseja realmente excluir este link?</p>
                                                <div class="acoesFeed">
									                <a href="javascript: void(0);" class="bt_normal green excluir">Sim</a>
									                <a href="javascript: void(0);" class="bt_normal red cancelar">Não</a>
                                                </div>
								            </div>
								        </div>
                                        <%
                                    }
                                    
                                }
                            %>
                                <!--<form class="categoriaLink_editar">
								    <input type="text" class="din numeroOrdem" value="3">
								    <div class="categoriaNome_editar">
									    <input type="text" placeholder="Titulo do link"><br>
									    <input type="text" placeholder="Url">
									    <div class="acoes">
										    <input type="submit" class="btn_laranja" value="Salvar">
										    <input type="reset" class="btn_cinza" value="Cancelar">
									    </div>		
								    </div>
							    </form>-->
							    <button class="btn_verde criarNovoLink">+ Criar link</button>
                            </div>
                            
						</div>
                        <%
                    }
                    
                }
                %>

                <%
            }
            else
            {
                %>
                <div class="linksCadastrados" id-categoria="0" padrao="1">
					<div class="categoriaCont">
						<div class="categoriaLink ">
							<div class="categoriaNome semCategoria">
								<h4>Sem categoria</h4>
								<a href="javascript:void(0);" class="abrirFecharLinks">Fechar<span class="FontAwesome abrir"></span></a>
							</div>
						</div>
					</div>
                    <div class="linkCont">
                    
						<button class="btn_verde criarNovoLink">+ Criar link</button>
                    </div>
                            
				</div>
            <%
            }
        %>
    </div>
	<button class="btn_verde criarNovaCategoria">+ Criar Categoria</button>

