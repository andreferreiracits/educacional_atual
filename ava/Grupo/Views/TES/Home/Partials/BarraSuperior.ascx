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
<div class="barra_topo_itens">
	<ul class="mosaico_grupo">
        <%
        if (Model.lModeloUsuario.Count > 0)
        {
            foreach (var item in Model.lModeloUsuario)
            {
            %>
                <li><img src="<%=item.strFoto %>" width="142" height="142"></li>
            <%
            }
        }
        %>
	</ul>
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
		        </div>
                <%
                }
            }
              
        }
        
        %>
		<div class="foto_grupo">
            <%
            //Alteração Renan: Grupos setados com idEstado = 3 (Congelado) não devem poder editar foto.
            if (!Model.idEstado.Equals(3))
            {
                if (Model.bolTenhoAcesso && (boolCriador || boolMediador))
                {
                %>
			    <div class="trocafoto">
				    <a href="javascript:void(0);" onclick="abreUploadGrupos(<%=Model.id %>)" >trocar foto</a>
			    </div>
                <div id="previewTrocaFotoGrupos" class="preview_img_post preview_anx_post" style="display:none; width: 400px; height: 550px; overflow: hidden;">
                    <iframe name="Upload" id="Upload_frameGrupos" style="width: 100%; height: 100%; border:0;"></iframe>
                </div>
                <%
                }
            }
            %>

			<a href="javascript:void(0)" class="">
				<img src="<%=Model.strFoto %>" width="105" height="105" alt="Foto do grupo"/>
			</a>
		</div>	
		<div class="nome_grupo">
			<h2 class=""><%=Model.strNome %></h2>
		</div>	
		<%
        if (Model.bolTenhoAcesso)
        {
            %>			
		    <div class="menu_grupo_topo">
                <div id="sobre">
				    <a href="javascript:void(0)">Sobre o Grupo</a>
				    <div class="combo_topo sobre_combo">
					    <div class="seta_top"></div>
					    <div>
                            <%
                            if (Model.strDescricao == "" || Model.strDescricao == null)
                            {
                                %>
                                <p>Nenhuma descrição disponível.</p>
                                <%
                            }
                            else
                            {
                                %>
						        <p><%=Model.strDescricao%></p>
                                <%
                            }
                            %>
					    </div>
				    </div>
			    </div>
                <div id="convidar">
                    <%
                        //Alteração Renan: Grupos setados com idEstado = 3 (Congelado) não devem inscrever pessoas.
                        if (!Model.idEstado.Equals(3))
                        {
                            if (Model.bolTenhoAcesso && (boolCriador || boolMediador))
                            {
                                if(!Model.idTipo.Equals(1)){
                                    if (Model.idAdesao == 4)
                                    {
                                        %>
			                            <a href="javascript:void(0)" class="_convidar" idAdesao="<%=Model.idAdesao %>">Inscrever Pessoas</a>
                                        <%
                                    }
                                    else
                                    {
                                        %> 
                                        <a href="javascript:void(0)" class="_convidar" idAdesao="<%=Model.idAdesao %>">Convidar Pessoas</a>
                                        <%
                                    }
                                }
                            }
                        } 
                    %>
                    <div class="combo_topo convite_combo">
	                    <div class="seta_top"></div>
	                    <div class="convite_conteudo">
		                    <img src="<%=strMiniFoto %>" height="36" width="36"/>
		                    <textarea id="strComentConvite" placeholder="Digite uma mensagem (opcional)."></textarea>
                            <% 
                            if (Model.idAdesao == 4)
                            {
                                %>
                                <h4>Pré-visualização da inscrição</h4>
                                <%
                            }
                            else
                            {
                                %>
                                <h4>Pré-visualização do convite</h4>
                                <% 
                            }
                            %>
                            
		                    <div class="previ_convite">
			                    <img class="fundo_convite" src="<%=Model.strFoto %>" height="800" width="800">
			                    <img class="img_convite" src="<%=Model.strFoto %>" width="67" height="67" alt="Foto do grupo"/>
			                    <div>
                                    <%
                                    if (Model.idAdesao == 4)
                                    {
                                        %>
				                        <p class="inscricao_grupo">Inscrição no grupo</p>
				                        <p><%=Model.strNome %></p>
				                        <div class="btn_cinza">Visualizar</div>
                                        <%
                                    }
                                    else
                                    {
                                        %>
                                        <p class="inscricao_grupo">Convite para um grupo</p>
				                        <p><%=Model.strNome %></p>
				                        <div class="btn_cinza">Participar</div>
				                        <div class="btn_cinza">Não, obrigado(a)</div>                
                                        <%
                                    }    
                                    %>
			                    </div>	
		                    </div>	
                            <div class="titulo_seletor_grupo">
                                <strong>Para: </strong>
                            </div>
		                    <div class="selector_convidar">
        
                            </div>
                            <div class="clearfix"></div>
		                    <a href="javascript:void(0)" id="btn_cancelar_convite" class="btn_cinza">Cancelar</a>
                            <a href="javascript:void(0)" id="btn_inserir_convite" class="btn_cor">Inserir</a>
	                    </div>
                        <div class="convite_enviado"></div>
                    </div>
                </div>
                <%
                if (Model.bolTenhoAcesso && (boolCriador || boolMediador) && Model.idAdesao != 4)
                {
                    string strClassPedidoPendente = "";
                    string strClassConvitePendente = "";
                    if (Model.totalPedidoPendente == 0)
                    {
                        strClassPedidoPendente = "style='display:none;'";
                    }
                    %>
                    <div <%=strClassPedidoPendente%>>
				        <a href="javascript:void(0)" id="pedido_pendente">Pedidos (<%=Model.totalPedidoPendente%>)</a>
			        </div>
                    <%                        
                    
                    if (Model.totalConvitePendente == 0)
                    {
                        strClassConvitePendente = "style='display:none;'";
                    }
                    %>
                    <div <%=strClassConvitePendente%>>
				        <a href="javascript:void(0)" id="convite_pendente">Convites (<%=Model.totalConvitePendente%>)</a>
			        </div>
                    <%       
                    
                }
                
                if (boolParticipo)
                {
                    if (Model.idAdesao == 4 && !boolCriador && !boolMediador)//grupo privado e não sou mediador nem criador
                    {

                    }
                    else
                    {
                        if (Model.bolTenhoAcesso && (boolCriador || boolMediador) || PodeSairDoGrupo)
                        {
                        //Alteração Renan: Grupos setados com idEstado = 3 (Congelado) não devem poder sair do grupo nem editar.
                        if (!Model.idEstado.Equals(3) && !Model.idTipo.Equals(1))
                        {    
                        %>
			            <div id="configurar">
			                <a href="javascript:void(0)">Configurar</a>
			                <div class="combo_topo config_combo">
				                <div class="seta_top"></div>
				                <div>
                                     <%
                                    if (Model.bolTenhoAcesso && (boolCriador || boolMediador))
                                    {
                                                                            %>
                                                                            <a href="/AVA/Grupo/Home/EditarGrupo/<%=Model.id %>" id="ava_editar_grupo" class="fancybox.ajax">Editar grupo</a>
                                                                            <%
                                    }
                                    if (boolParticipo && !boolCriador)
                                    {
                                        if (PodeSairDoGrupo)
                                        { 
                                                %>
                                                <a href="javascript:void(0)" onclick="excluirParticipante(<%=Model.id %>, <%=idConvite%>, <%=idParticipante %>)">Sair do grupo</a>
                                                <%
                                    }
                                    }
                                                %>
	                                        </div>
			                            </div>
		                            </div>
                                    <%
                                    }
                        }  
                    }                
                }    
                %>
		    </div>
        <%
        } 
        %>
	</div>	
	<div class="degrade"></div>
</div>


