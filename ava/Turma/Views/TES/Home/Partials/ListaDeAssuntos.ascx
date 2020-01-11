<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Turma.Models.Assunto>>" %>
<% 
    var assuntosParaEdicao = new List<Turma.Models.Assunto>();
    var assuntoGeral = Model.Find(x => x.BolGeral);
    if (Model != null)
    {
        foreach (var m in Model)
        {
            if (!m.BolGeral)
                assuntosParaEdicao.Add(m);
        }
    }

    var assuntosComPost = (List<int>)ViewData["assuntosComPost"];

%>
<div id="criareditar" class="cont_criar fancyAssuntos" style="display:block;">
    <input type="hidden" id="idAssuntoRemover" value="" />
    <div class="_feed_lista_assunto">
        <h1>Criação e edição de assuntos</h1>
        <ul>
            <li class="liassufixo"><%=assuntoGeral.StrAssunto%></li>
            <li class="liassufixo">
                <a class="link_direto" href="javascript:void(0);">Adicionar assunto</a>
                <div class="tooltip_obrigatorio" style="display:none;"><p>O nome do assunto é obrigatório</p><span class="seta_baixo"></span></div>
                <input class="_inputNovoAssunto" type="text" value="" maxlength="40" style="display:none;" placeholder="Novo assunto"/>
                <a href="javascript:void(0);" class="inputAssuntoLimpar" style="display:none;"><span class="fontello icon_limpar"></span></a>
                <a href="javascript:void(0);" class="salvar_link" style="display: none;"> Salvar</a>
            </li> 
            <% foreach(var a in assuntosParaEdicao) { 
               bool bolAssuntoComPost = assuntosComPost.Contains(a.IdAssunto);
            %>                       
            <li assu="<%=a.IdAssunto%>" class="liassunto">
                <a href="javascript:void(0);" class="mostra_input"><span class="fontello icon_editar"></span></a>
                <span class="liassuntonome"><%=a.StrAssunto%></span>
                <a href="javascript:void(0);" class="feed_confirma_exclui <%=(!bolAssuntoComPost) ? " assusmpst": "" %>"><span class="fontello icon_excluir"></span></a>
                <div class="tooltip_obrigatorio" style="display:none;"><p>O nome do assunto é obrigatório</p><span class="seta_baixo"></span></div>
                <input class="_inputEditarAssunto" type="text" value="<%=a.StrAssunto%>" maxlength="40" placeholder="Nome assunto"/>
                <a href="javascript:void(0);" class="inputAssuntoLimpar" style="display:none;"><span class="fontello icon_limpar"></span></a>
                <a href="javascript:void(0);" class="salvarEditar_link" style="display: none;"> Salvar</a>
            </li>
            <% } %>
        </ul>
        <div class="acoes">
            <p style="display:none;" class="acoesResultado">Assunto editado</p>
            <div class="right">
                <a href="javascript:void(0);" class="btn_cinza">Fechar</a>
            </div>    
        </div>
    </div>
    <div class="feed_confirma">        
        <h2>Remover o asssunto "Nome do assunto"?</h2>
        <strong>
            O que deseja fazer com os posts deste assunto?<br/>
            Esta ação não pode ser desfeita.
        </strong><br/>

        <label class="styleRadio" for="feed_confirma_RadioRemover" id="feed_confirma_RadioRemoverLabel">
            <input type="radio" name="assunto" id="feed_confirma_RadioRemover" value="remover" />
            Excluir esse assunto e remover todas as postagens
        </label><br/>
        <label class="styleRadio inputRadioChecked" for="feed_confirma_RadioMover" id="feed_confirma_RadioMoverLabel">
            <input type="radio" name="assunto" id="feed_confirma_RadioMover" value="mover" checked="checked" />
            Mover para o assunto
        </label>
        <input type="hidden" id="hAssuntoEditar" initvalue="<%=assuntoGeral.IdAssunto %>" value="<%=assuntoGeral.IdAssunto %>" />
        <div class="bootstrap">
			<div class="btn-group">                     
			    <button data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtAssuntoEditar"> 
                    <%=assuntoGeral.StrAssunto %>&nbsp;<span class="caret"></span>
                </button>
                <ul class="dropdown-menu" id="cbAssuntoEditar">
                    <% foreach (var assu in Model)
                        { %>    	
                        <li assu="<%=assu.IdAssunto%>">
                            <input type="checkbox" id="ckAssuntoEditar<%=assu.IdAssunto%>" <%=(assu.IdAssunto == assuntoGeral.IdAssunto) ? "checked=\"checked\"" : "" %> />
			                <label for="ckAssuntoEditar<%=assu.IdAssunto%>"><%=assu.StrAssunto%>&nbsp;</label>
			            </li>                        
                    <% } %>	                                                     
			    </ul>
			</div>  
		</div>        
        <div class="right mgt_10">
            <a href="javascript:void(0);" class="btn_cinza">Cancelar</a>
            <a href="javascript:void(0);" class="btn_cor">Excluir assunto</a>
        </div>    
    </div>        
</div>
