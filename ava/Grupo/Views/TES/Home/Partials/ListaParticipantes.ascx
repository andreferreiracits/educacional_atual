<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Grupo.Models.ParticipanteGrupo>>" %>

<%
int idEstado = Convert.ToInt32(ViewData["idEstado"]);
int idEdicao = Convert.ToInt32(ViewData["idEdicao"]);
if (Model.Count > 0)
{
    
    foreach (var usuario in Model)
    {
        %>
        <div class="carteirinha" id="cart_<%=usuario.id%>">
            <%
            //Alteração Renan: Grupos setados com idEstado = 3 (Congelado) não devem permitir a exclução de usuários do grupo.
            if (!idEstado.Equals(3) || idEdicao > 0 )
            {    
            %>
            <div class="Feed_full" id="boxExcluirPart_<%=usuario.id%>" style="display: none;">
				<p>Deseja remover esse usuário do grupo?</p>
				<div class="acoesFeed">
					<a href="javascript: void(0);" class="bt_normal green exc_usuario_grupo">Sim</a>
					<a href="javascript: void(0);" class="bt_normal red naoexc_usuario_grupo">Não</a>
				</div>
			</div>
            <%
            }
            %>
	        <div class="in_cT" id="dados_participante_<%=usuario.id%>">
		        <% 
                    Html.RenderPartial("Partials/DadosCarteirinha", usuario, new ViewDataDictionary { { "bolUsuarioLogadoMediador", ViewData["bolUsuarioLogadoMediador"] }, { "idUsuarioLogado", ViewData["idUsuarioLogado"] }, { "idAdesao", ViewData["idAdesao"] }, { "idEstado", idEstado },{"idEdicao", ViewData["idEdicao"]} });
                %>		    
	        </div>
        </div>	
        <%
    }

}
else
{
    Response.Write("Nenhum participante encontrado.");    
}        
%>


    