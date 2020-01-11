<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Mural.Models.MensagemRapidaComentario>>" %>

<%
int totalComentarios = Convert.ToInt32(ViewData["totalComentarios"]);
int idMensagemRapida = Convert.ToInt32(ViewData["idMensagemRapida"]);
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
var idFerramentaTipo = (ViewData["idFerramentaTipo"] != null) ? (int)ViewData["idFerramentaTipo"] : 0;
var souComunicadorPost = (ViewData["souComunicadorPost"] != null) ? (bool)ViewData["souComunicadorPost"] : false;
var bolPodeComentarPost = (ViewData["bolPodeComentarPost"] != null) ? (bool)ViewData["bolPodeComentarPost"] : false;
var bolUsuarioSemTurma = (ViewData["bolUsuarioSemTurma"] != null) ? (bool)ViewData["bolUsuarioSemTurma"] : false;
var bolAcessoEscreverBloqueado = (ViewData["bolAcessoEscreverBloqueado"] != null) ? (bool)ViewData["bolAcessoEscreverBloqueado"] : false;
var bolPai = (ViewData["bolPai"] != null) ? (bool)ViewData["bolPai"] : false;
var bolSuspenso = (ViewData["bolSuspenso"] != null) ? (bool)ViewData["bolSuspenso"] : false;
var bolEducador = (ViewData["bolEducador"] != null) ? (bool)ViewData["bolEducador"] : false;
var bolPostEducacional = (ViewData["bolPostEducacional"] != null) ? (bool)ViewData["bolPostEducacional"] : false;

bool bolAdmin = false;
if (ViewData["admRede"] != null && ViewData["admRede"].ToString() != "")
{
    bolAdmin = Convert.ToBoolean(ViewData["admRede"]);
}

bool vemDoAdminAVA = false;

if (ViewData["adminAVA"] != null)
{
    vemDoAdminAVA = Convert.ToBoolean(ViewData["adminAVA"]);		 
}

bool postExcluido = false;

if (ViewData["postExcluido"] != null)
{
    postExcluido = Convert.ToBoolean(ViewData["postExcluido"]);		 
}

if (totalComentarios > 3 && idFerramentaTipo != 39)
{
    int totalComentariosAnteriores = totalComentarios - 3;
    string texto = (totalComentariosAnteriores > 1) ? "Exibir todos os <strong>" + totalComentariosAnteriores + " comentários</strong> anteriores": "Exibir <strong>comentário</strong> anterior";

    %>
    <a href="javascript:void(0);" onClick="verTodosOsComentarios(this); return false;" class="exibir_anteriores" idMensagemRapida="<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>"><%=texto%></a>
    <%
}    

foreach (var comentario in Model)
{
    string strClassAtivoCurtiu = "";
    if (comentario.bolCurtiu)
        strClassAtivoCurtiu = "ativo";    
    
    %>
    <div id="coment_<%=comentario.IdComentario%>" <%if(comentario.bolExcluido){%>class="comentario_excluido_adm"<%} %>>
        <% 
        if (comentario.bolExcluido)
        {
            %>
            <p><span></span>Comentário excluído.</p>
            <%
        }    
        %>

	    <ul class="post_comentarios">
            <li>
                <%if(comentario.idPagina > 0) { %>
                    <a href="/AVA/Pagina/<%=comentario.strLogin%>" class="comentario_perfil"><img src="<%=comentario.strMiniFoto%>"></a>
                <%}else{ %>
                    <a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>" class="comentario_perfil"><img src="<%=comentario.strMiniFoto%>"></a>
                <%} %>
                
                <div class="comentario_conteudo">
                    <%
                    if (!comentario.bolExcluido && !postExcluido)
                    {
                        if (idUsuarioLogado == comentario.IdUsuario || (bolAdmin && idFerramentaTipo != 39) || (souComunicadorPost && idFerramentaTipo == 39))
                        {
                            %>
                            <a href="javascript: void(0);" class="opcao_excluir" onClick="excluirMensagemComentario(this); return false;" idcomentario="<%=comentario.IdComentario%>"></a>
                            <%        
                        }
                    }
                    %>
                    <header class="comentario_header">
                        <h4 class="comentario_nome_usuario">
                            <%
                            if (vemDoAdminAVA)
                            {
                                %>
                                <a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>"><%=comentario.strNomeReal%> <%if(comentario.strApelido.Length > 0){%><span class="nome_apelido">(<%=comentario.strApelido%>)</span><%} %></a>
                                <%
                            }
                            else
                            {
                               if(comentario.idPagina > 0) { %>
                                    <a href="/AVA/Pagina/<%=comentario.strLogin%>"><%=comentario.strNome%></a>
                                <%}else{ %>
                                    <a href="/AVA/Perfil/Home/Index/<%=comentario.strLogin%>"><%=comentario.strNome%></a>
                                <%}
                            }
                            %>
                        </h4>
                        <span class="comentario_horario">
                        <%
                            var dataComment = comentario.strTempoPublicacao;
                            /*if (dataComment.IndexOf("/") > 0)
                            {
                                dataComment = dataComment.Remove(10);
                            }
                            else if (dataComment.IndexOf("Ontem") >= 0) {
                                dataComment = dataComment.Remove(5);
                            }
                            else
                            {
                                dataComment = dataComment.Replace("Hoje às", "");
                            }*/
                            Response.Write(dataComment);
                            %>
                        </span>

                        <% 
                        if (!comentario.bolExcluido && !postExcluido)
                        {
                            %>
                            <a class="comentario_acao_curtir <%=strClassAtivoCurtiu%>" href="javascript:void(0);" onClick="curtirMensagem(this); return false;" idComentario="<%=comentario.IdComentario%>"></a>            
                            <%
                        }    
                        %>
            		    
                        <div class="comentario_acao_feed feedTotalGostaram" id="boxCurticoesComentario_<%=comentario.IdComentario%>">
                            <%
                            Html.RenderPartial("Partials/ListaCurticoesComentarioNovaHome", comentario, new ViewDataDictionary() { { "idFerramentaTipo", idFerramentaTipo}, {"idUsuarioLogado", idUsuarioLogado } });
                            %>
                        </div>
                    </header>
        		    <p class="comentario_texto"><%=comentario.txtComentario%></p>
                </div>
            </li>
	    </ul>
	    <div class="clearfix"></div>
    </div>
    <% 
}

if (idFerramentaTipo == 39)
{
    var bolPossuiComentarios = false;
    if (Model != null)
        bolPossuiComentarios = Model.Count > 0;
    
    var totalComentarios50 = bolPossuiComentarios ? Convert.ToBase64String(Encoding.UTF8.GetBytes(totalComentarios.ToString())) : "";
    var idsComentarios50 = bolPossuiComentarios ? Convert.ToBase64String(Encoding.UTF8.GetBytes(String.Join(",", Model.Select(x => x.IdComentario)))) : "";
    
    %>
    <input type="hidden" id="idsPriUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=idsComentarios50%>" />
    <input type="hidden" id="dtmPriUpd_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=Convert.ToBase64String(Encoding.UTF8.GetBytes(DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")))%>" />
    <input type="hidden" id="totCom_<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" value="<%=totalComentarios50%>" />  
    <% if (totalComentarios > 3)
       {
           %>
           <a href="javascript:void(0);" onClick="verTodosOsComentarios(this); return false;" class="exibir_anteriores" ide="<%=idMensagemRapida%>" style="width: 100%;">Ver mais comentários<span class="total" style="float: right"><%=Model.Count + " de " + totalComentarios%></span></a>
            <% 
           if (bolPodeComentarPost && !bolUsuarioSemTurma && !bolSuspenso && bolPostEducacional)    
           {
               if ((!bolPai || bolEducador) && !bolAcessoEscreverBloqueado)
               {
                 %>
                <div><a style="display:none;" href="javascript:void(0);" onclick="exibeComentarios(this); return false;" idMensagemRapida="<%=idMensagemRapida%>" ide="<%=idMensagemRapida%>" class="ancora_comentario">Escreva um comentário...</a></div>
            <%   }
            }
       }       
}
   
%>

