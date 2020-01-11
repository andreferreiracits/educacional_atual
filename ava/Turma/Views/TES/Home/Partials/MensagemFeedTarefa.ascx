<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Turma.Models.MensagemRapida>" %>
<%
if(Model == null)
{
    Response.Write("0");
}
else
{ 
    //Informacoes do usuario logado
    var bolMobile = false;
    string uAgent = Request.UserAgent.ToLower();
    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }

    var bolSuspenso = (bool)ViewData["bolSuspenso"];
    var objSuspensao = bolSuspenso ? (AVASuspensaoDenuncia.Models.Suspensao)ViewData["objSuspensao"] : null;

    var bolSegmentoBloqueado = (bool)ViewData["bolSegmentoBloqueado"];
    var segBloqueio = bolSegmentoBloqueado ? (UsuarioAVA.Models.SegmentacaoBloqueio)ViewData["objSegmentoBloqueado"] : null;

    var bolPodeComentar = (bool)ViewData["bolPodeComentar"];
    var bolPodeCurtir = (bool)ViewData["bolPodeCurtir"];
    
    var objUsuario = (UsuarioAVA.Models.Usuario)ViewData["objUsuario"];
    
    var bolPossuiComentarios = false;
    if (Model.Comentarios != null)
        bolPossuiComentarios = Model.Comentarios.Count > 0;
    
    var bolModerador = (bool)ViewData["bolModerador"];
    var bolAdmRedeSocial = (bool)ViewData["bolAdmRedeSocial"];
    var bolProfessor = (bool)ViewData["bolProfessor"];
    var bolAluno = (bool)ViewData["bolAluno"];
    var bolPai = (bool)ViewData["bolPai"];
    //Fim informacoes usuario logado

    var strLink = "";
    if (Model.StrLinkFerramenta != null)
    {
        strLink = Model.StrLinkFerramenta;
    }

    string strLinkFinal = strLink.Replace("#id#", "" + Model.IdFerramenta.ToString() + "");

    if (bolProfessor)
    {
        strLinkFinal = "/ava/caminhos/home/agendamento/" + Model.IdFerramenta.ToString();
        //strLinkFinal = "/ava/caminhos/home/agendamento/" + Model.IdFerramenta.ToString();
        
    }
    else
    {
        strLinkFinal = strLink.Replace("#idAgendamento#", "" + Model.IdFerramenta + "").Replace("#idEtapa#", "" + Model.IdAuxiliar1 + "");
    }
    
    var bolMostraBotaoExcluir = (!Model.BolExcluido && (Model.IdUsuario == objUsuario.id || bolModerador || bolAdmRedeSocial));
    
%>
<article class="clearfix <%=(Model.BolProfessor) ? " highlight" : "" %>" ide="<%=Model.IdMensagemRapida%>">  
   
	<% if (bolMostraBotaoExcluir) { %>
    <ul class="combo_denunciar_excluir">
		<li>
		    <a class="icone" href="javascript:void(0);"></a>
		    <ul>               
		        <li><a class="mostra_caixa confirma_excluir" href="#confirma_excluir"><span class="excluir_comentario_combo FontAwesome"></span>Excluir</a></li>                               
		    </ul>
		    <span class="excluir_conf">
		        <span class="seta_top"></span>
		        <p>Deseja realmente excluir?</p>
		        <a class="cancelar left" href="javascript:void(0);">Cancelar</a>
		        <a class="btn_cor excluir right" href="javascript:void(0);">Excluir</a>
		    </span>
		</li>
	</ul>  
    <% } %>
    <a href="/AVA/Perfil/Home/Index/<%=Model.StrLogin%>" class=""><img class="avatar_tl" src="<%=Model.StrMiniFoto%>" width="35" height="35" alt="avatar" /></a>
    <div class="e-wrap">
		<h1>
            <%=(Model.BolModerador) ? "<i class=\"fontello icon_mediador\"></i>&nbsp;" : ""%>
		    <a href="/AVA/Perfil/Home/Index/<%=Model.StrLogin%>" title="<%=Model.StrNome%>" class=""><%=Model.StrNome%></a>
		</h1>
		<div class="mural_time">
		    <span><%=Model.StrCriacao%></span>
            <span class="postar_assunto fontello"></span>
            <span class="disciplina_mural"> <%= Model.StrAssunto %></span>
            <span class="disciplina_mural"> - <%= Model.strDisciplina %></span>
		    
		</div>
        <div class="embrulho">
        <%
          
            if (bolAluno || bolProfessor || bolPai)
            {
                %>
                <a href="<%=strLinkFinal%>">                                
                    <img alt="" src="<%=Model.StrImagemPathFerramenta%>">
                </a>
                <strong><a href="<%=strLinkFinal%>"><%=Model.StrTipo%></a></strong>
                <%
            }
            else
            {
                %>
                <a>                                
                    <img src="<%=Model.StrImagemPathFerramenta%>">
                </a>
                <strong><a><%=Model.StrTipo%></a></strong>    
                <%
            }
            
              
        %>
            
            
            <p class="ctn_msg"><%=Model.StrMensagem%></p>
        </div>
        <% if(!bolSuspenso) { %>
	    <div class="acoes_mural" ide="<%=Model.IdMensagemRapida%>">
            <% if(bolPodeCurtir) { %>
	        <a class="botaoCurtirGrupos <%=(Model.BolCurtiu) ? "ativo": "" %>" href="javascript:void(0);"></a>
            <% } %>
            <div id="boxCurticoesMensagem_<%=Model.IdMensagemRapida%>" idmensagem="<%=Model.IdMensagemRapida%>" class="feedCurtir" <%=(Model.Curticoes.Count == 0) ? "style=\"display:none\"" : "" %>>
            <%  
                Html.RenderPartial("Partials/ListaCurtidasMensagem", Model.Curticoes, new ViewDataDictionary { { "IntCurtidas", Model.IntCurtidas }, { "IdMensagemRapida", Model.IdMensagemRapida } });
            %>
            </div>        
            <!-- Validar comentarios -->
            <% if(bolPodeComentar) { %>
	            <a class="botaoComentar" href="javascript:void(0);"><span class="FontAwesome"></span></a>
            <% } %>

            <% if(bolPodeComentar || Model.Comentarios.Count > 0) { %>
            <div class="clearfix"></div>
            <% if(bolPodeComentar) { %>
	        <form class="campo_comentar" onsubmit="return false;" method="post" ident="<%=Model.IdMensagemRapida%>" name="frmMensagemRapidaComentario">
	            <a href="javascript:void(0);"><img width="25" height="25" src="<%=objUsuario.strMiniFoto %>" /></a>
	            <input type="text" name="strComentario" ident="<%=Model.IdMensagemRapida%>" placeholder="Escreva um comentário...">
	        </form>
            <% } %>
            <div class="clearfix"></div>
            <div class="comentariosMural" id="boxComentarios_<%=Model.IdMensagemRapida%>" <%=bolPossuiComentarios ? "" : "style=\"display:none;\"" %>>
                <%                
                   Html.RenderPartial("Partials/ListaComentarios", Model.Comentarios, new ViewDataDictionary { { "totalComentarios", Model.TotalComentarios }, { "idMensagemRapida", Model.IdMensagemRapida }, { "idUsuarioLogado", objUsuario.id }, { "bolAdmRedeSocial", bolAdmRedeSocial }, { "bolModerador", bolModerador }, { "bolPodeCurtir", bolPodeCurtir } });
                %>
            </div>
            <% } %>        
	    </div>
        <% } %>
	</div>    
</article>
<% } %>