<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.Grupos>" %>
<%
    int idUsuario = (int)ViewData["idUsuario"];
    string strMiniFoto = ViewData["strMiniFoto"].ToString();
    List<Grupo.Models.ParticipanteGrupo> lTodosUsuariosGrupo = Model.lTodosUsuariosGrupo.FindAll(p => p.id == idUsuario);
    
    bool boolCriador = false;
    bool boolMediador = false;
    bool boolParticipante = false;
    bool boolParticipo = false;
    bool boolAprovacaoMediadorPendente = false;
    bool boolAceiteParticipantePendente = false;
    int idConvite = 0;
    int idParticipante = 0;
    bool PodeSairDoGrupo = true;

    if (lTodosUsuariosGrupo.Count > 0)
    {
        idParticipante = lTodosUsuariosGrupo[0].idParticipante;   
        boolCriador = lTodosUsuariosGrupo[0].bolCriador;
        boolMediador = lTodosUsuariosGrupo[0].bolMediador;
        boolParticipante = lTodosUsuariosGrupo[0].bolParticipante;

        boolParticipo = boolParticipante;
                
        if (boolCriador || boolMediador)
        {
            boolParticipo = true;
        }

        List<Grupo.Models.ConviteUsuario> lConviteAceito = lTodosUsuariosGrupo[0].lConvite.FindAll(p => p.idStatus == 3 && !p.bolExcluido);

        List<Grupo.Models.ConviteUsuario> lConviteRecusado = lTodosUsuariosGrupo[0].lConvite.FindAll(p => p.idStatus == 2 && !p.bolExcluido);

        List<Grupo.Models.ConviteUsuario> lConvitesGrupo = lTodosUsuariosGrupo[0].lConvite.FindAll(p => !p.bolExcluido);

        List<Grupo.Models.ConviteUsuario> lConvitesExcluido = lTodosUsuariosGrupo[0].lConvite.FindAll(p => p.bolExcluido);

        if (lConviteAceito.Count > 0)
        {
            idConvite = lConviteAceito[0].idConvite;
            boolParticipo = true;
        }
        else
        {
            List<Grupo.Models.ConviteUsuario> lConvitePendente = lTodosUsuariosGrupo[0].lConvite.FindAll(p => p.idStatus == 1 && !p.bolExcluido);
                        
            if (lConvitePendente.Count > 0)
            {  
                if (lConvitePendente[0].idTipoConvite == 2)//convite solicitado
                {   
                    boolAprovacaoMediadorPendente = true;
                    PodeSairDoGrupo = false;
                    boolParticipo = false;
                }
                else
                {           
                    boolAceiteParticipantePendente = true;
                    PodeSairDoGrupo = false;
                    
                }

                idConvite = lConvitePendente[0].idConvite;
            }
            else if (lConviteRecusado.Count > 0 && !boolParticipante)
            {
                boolParticipo = false;
            }
            else if (Model.idAdesao == 1 && lConvitesGrupo.Count <= 0)
            {
                if (lConvitesExcluido.Count > 0)
                {
                    boolParticipo = false;
                }
                else
                {
                    boolParticipo = true;
                }
            }
            
        }               
               
    }

%>

<script language="javascript">
    $('.voltar_btn').prop('href', '/cp/clube');
</script>
<div class="barra_topo_itens">
	<div class="info_grupo_topo">
        <%
        if (!boolCriador)
        {
            if (boolAceiteParticipantePendente)
	        {
                if (!Model.idEstado.Equals(3))
                {
		        %>
                <div class="solicitar_participacao">
			        <p>Você foi convidado a participar deste grupo.</p>
			        <a href="javascript:void(0)" class="btn_cinza right" onclick="recusarConvite(<%=Model.id %>, <%=idConvite%>)">Não, obrigado(a)</a>
                    <a href="javascript:void(0)" class="btn_cor right" onclick="aceitarConvite(<%=Model.id %>, <%=idConvite%>)">Participar</a>
                    <span></span>
		        </div>
                <%
                }
                
	        }
            else if (Model.bolTenhoAcesso && !boolParticipo && Model.idAdesao == 1)
            {
                if (!Model.idEstado.Equals(3))
                {
                %>
                <div class="solicitar_participacao">
			        <p>Que tal participar deste grupo?</p>
			        <a href="javascript:void(0)" class="btn_cor right" onclick="participarGrupo(<%=Model.id %>, 1)">Participar</a>
                    <span></span>
		        </div>
                <%
                }
            }
            else if (Model.bolTenhoAcesso && !boolParticipo && boolAprovacaoMediadorPendente && (Model.idAdesao == 2))
            {
                %>
                <div class="solicitar_participacao">
			        <p>Sua solicitação foi enviada para o mediador do grupo.</p>
			        <a href="javascript:void(0)" class="btn_cinza right" onclick="cancelarParticipacao(<%=Model.id %>, <%=idConvite%>)">Cancelar solicitação</a>
                    <span></span>
		        </div>
                <%
            } 
            else if (Model.bolTenhoAcesso && !boolParticipo && (Model.idAdesao == 2))
            {
                if (!Model.idEstado.Equals(3))
                {  
                %>
                <div class="solicitar_participacao">
			        <p>Para postar no grupo, solicite participação.</p>
			        <a href="javascript:void(0)" class="btn_cor right" onclick="participarGrupo(<%=Model.id %>, 0)">Solicitar Participação</a>
                    <span></span>
		        </div>
                <%
                }
            }
              
        }
        
        %>
		<div class="foto_grupo">
				
		</div>	
	
       <div class="menu_grupo_topo">
			
		</div>
	</div>	
	<!--<div class="degrade"></div>-->
</div>

