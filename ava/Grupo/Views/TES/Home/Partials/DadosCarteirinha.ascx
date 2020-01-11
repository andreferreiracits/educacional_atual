<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.ParticipanteGrupo>" %>

<% 
bool bolUsuarioLogadoMediador = Convert.ToBoolean(ViewData["bolUsuarioLogadoMediador"]);
int idAdesao = Convert.ToInt32(ViewData["idAdesao"]);
int idEstado = Convert.ToInt32(ViewData["idEstado"]);
int idEdicao = Convert.ToInt32(ViewData["idEdicao"]);
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
bool bolConvitePendente = false;
bool bolPedidoPendente = false;  
string strComplProf = "";
int idConvite = 0;
int idParticipante = Model.idParticipante;

List<Grupo.Models.ConviteUsuario> lConvitesAceito = Model.lConvite.FindAll(c => c.idStatus == 3);

if (lConvitesAceito.Count > 0)
{
    idConvite = lConvitesAceito[0].idConvite;
}

if (Model.papelUsuario.bolEducador)
{
    if (Model.bolMediador)
    {
        strComplProf = "| Professor";
    }
    else
    {
        strComplProf = "Professor";
    }
}
%>

<a href="javascript:void(0);" class="cart_nome tooltip_title" title="<%=Model.strNome%>">
	<img src="<%=Model.strMiniFoto%>" width="55" height="55" />
    <%
    List<Grupo.Models.ConviteUsuario> lConvitesPendente = Model.lConvite.FindAll(c => c.idStatus == 1);

    if (lConvitesPendente.Count > 0)
    {
        idConvite = lConvitesPendente[0].idConvite;
        if (lConvitesPendente[0].idTipoConvite == 1)
        {
            bolConvitePendente = true;
            %>
            <div class="aprovacao_pendente" id="aprovacao_pendente_<%=Model.id%>"><p>Convite pendente</p></div>
            <%        
        } 
        else
        {
            bolPedidoPendente = true;
            %>
            <div class="aprovacao_pendente" id="aprovacao_pendente_<%=Model.id%>"><p>Pedido pendente</p></div>
            <%     
        }    
    }    
    %>

	<div class="cart_so_nome"><%=Model.strNome%></div>
    <%    
    if (Model.bolMediador)
    {
        %>
        <p class="professor_moderador">Mediador <%=strComplProf%></p>
		<div class="sou_mediador FontAwesome"></div>    
        <%    
    }
    else if(strComplProf.Length > 0)
    {
        %>
        <p class="professor_moderador"><%=strComplProf%></p>
        <%
    }                  
    %>
</a>
<% 
//Alteração Renan: Grupos setados com idEstado = 3 (Congelado) não devem permitir excluir nem aceitar participantes no grupo.    
if(!idEstado.Equals(3)){
if (bolUsuarioLogadoMediador && idUsuarioLogado != Model.id && !Model.bolCriador)
    {    
        %>
        <div class="seta_combo_carteirinha FontAwesome" idUser="<%=Model.id%>">
		    <span></span>
	    </div>
	    <div class="caixa_combo_carteirinha" id="opcoes_<%=Model.id%>">
		    <span class="seta_cima"></span>
            <% 
            if (bolConvitePendente)
            {
                if (idEdicao <= 0)
                {
                    %>
                    <a href="javascript:void(0);" onclick="removerParticipante(<%=Model.idGrupo%>, <%=Model.id%>, <%=idConvite%>, <%=idParticipante%>);">Cancelar convite</a>
                    <%
                }
            }
            else if (bolPedidoPendente)
            {
                %>
                <a href="javascript:void(0);" onclick="aceitarParticipante(<%=Model.idGrupo%>, <%=Model.id%>, <%=idConvite%>);">Aceitar participante</a>
                <%
                if (idEdicao <= 0)
                {
                %>
                <a href="javascript:void(0);" onclick="removerParticipante(<%=Model.idGrupo%>, <%=Model.id%>, <%=idConvite%>, <%=idParticipante%>);">Recusar solicitação</a>      
                <%
                }
            }
            else
            {
                     if (idEdicao <= 0){
                %>
                <a href="javascript:void(0);" onclick="removerParticipante(<%=Model.idGrupo%>, <%=Model.id%>, <%=idConvite%>, <%=idParticipante%>);">Remover participante</a>
                <%
                     }
            }
        
            if (lConvitesPendente.Count <= 0)
            {
                if (!Model.bolMediador)
                {
                    %>
                    <a href="javascript:void(0);" onclick="promoverParticipante(<%=Model.idGrupo%>, <%=Model.id%>);">Promover a mediador</a>
                    <%            
                }                
            }

            if (Model.bolMediador)
            {                                        
                %>
                    <a href="javascript:void(0);" onclick="removerMediacao(<%=Model.idGrupo%>, <%=Model.id%>, <%=idParticipante%>);">Remover mediação</a>        
                <%  
            }
            
            %>
	    </div>
        <%
    }
}
%>			    


