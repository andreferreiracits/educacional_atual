<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SiteMeio.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<AdminAVA.Models.EscolaAVAAdmin>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderDadosMeio" runat="server">

    <div id="ava_wrap" class="admin centralizaclass">
        <section class="as1" id="ava_container">
            <header id="Hcaminhos">
                <h1 class="blokletters">  Administrador </h1><p class="blokletters">Educacional Rede Social</p>
            </header>
      
            <div id="tabs">
                <ul class="nav_tabs">
                    <li><a class="linkAbaAdmin" href="#tabs-3">Avisos</a></li>
                    <li><a class="linkAbaAdmin" href="#tabs-1">Estatísticas</a></li>
                    <li><a class="linkAbaAdmin" href="#tabs-2">Mensagens</a></li>
                    <!--<li><a class="linkAbaAdmin" href="#tabs-9">Mensagens - Grupo</a></li>-->
                    <li><a class="linkAbaAdmin" href="#tabs-4">Denúncias</a></li>
                    <li><a class="linkAbaAdmin" href="#tabs-5">Suspensões</a></li>
                    <li><a class="linkAbaAdmin" href="#tabs-6">Agenda</a></li>
                    <li><a class="linkAbaAdmin" href="#tabs-7">Administradores</a></li>
                    <li><a class="linkAbaAdmin" href="#tabs-8">Links</a></li>
                    <li><a class="linkAbaAdmin" href="#tabs-10">Configurações</a></li>
                </ul>

                <% 
                IList<UsuarioAVA.Models.Unidade> lUnidade = null;

                if (ViewData["lUnidades"] != null)
                {
                    lUnidade = (List<UsuarioAVA.Models.Unidade>)ViewData["lUnidades"];
                }      
                %>

                <div id="tabs-3">
                    <div class="box_admin">
                        <a class="btn_cinza adm_ava_atualizar" href="javascript:void(0);" onclick="listaAvisos()"><span class="FontAwesome"></span>Atualizar dados</a>
                        <h2>Avisos</h2>
  		                <p>Crie avisos para exibir no topo do mural dos usuários de sua escola.</p>
                        
                        <br />
                        <a id="criar_aviso" class="large awesome awesome-green" href="/AVA/AdminAVA/Avisos/Criar">Criar novo aviso<span class="awe_icons"></span></a></p>

                        <div id="box_ListarAviso">
        
                        </div>
                     </div>
                </div>
                
                <div id="tabs-1">
                    <div class="box_admin"> 
                        <a class="btn_cinza adm_ava_atualizar" href="javascript:void(0);" onclick="listaRelatorios()"><span class="FontAwesome"></span>Atualizar dados</a> 
					    <h2>Estatísticas</h2>           
                        <p>Veja um resumo de todas as conversas, tarefas, caminhos e recomendações criados em sua escola em um período definido.</p>        
                        <div id="box_ListarEstatisticas" class="timeline_painel clearfix">                     
                                  
                        </div>
                    </div>   
                </div>
                
                <div id="tabs-2">
                    <div class="box_admin" style="min-height:350px;"> 
                        <a class="btn_cinza adm_ava_atualizar" href="javascript:void(0);" onclick="listaMensagem()"><span class="FontAwesome"></span>Atualizar dados</a>
                        <h2>Administração de Mensagens</h2>
                        <p>Veja todas as conversas geradas em sua escola em um período defindo sem precisar navegar por todos os perfis.</p>
                        <div id="box_ListarMensagens">
       
                        </div>
                    </div>   
                </div>    
                
                <div id="tabs-4">
                    <div class="box_admin"> 
                        <a class="btn_cinza adm_ava_atualizar" href="javascript:void(0);" onclick="listaDenuncias(0)"><span class="FontAwesome"></span>Atualizar dados</a>
                        <h2>Denúncias</h2>
                        <p>Acompanhe as denúnicas de mensagens e perfis feitas pelos denunciantes da sua escola. Verifique se a denúncia procede visitando o perfil do denunciado.</p>
                        <div id="box_ListarDenuncia">
       
                        </div>
                    </div>   
                </div>

                <div id="tabs-5">
                    <div class="box_admin"> 
                        <a class="btn_cinza adm_ava_atualizar" href="javascript:void(0);" onclick="listaSuspensos(0)"><span class="FontAwesome"></span>Atualizar dados</a>
                        <h2>Suspensões</h2>
                        <p>Acompanhe as suspensões de usuários da sua escola. A suspensão impede o usuário de postar mensagens no ambiente por um período definido.</p>
                        <%
                        if (lUnidade.Count > 0)
                        {
                            %>
                            <div class="le_filtros">
				                <div id="filtro_aval">
					                <div class="topo_filtro">
						                <h3>Filtro</h3>
						                <a href="javascript:void(0);" class="btAbreFechaFiltro">Fechar<span class="aberto"></span></a>
					                </div>
					                <div class="boxFiltro">
						                <div class="itens">
							                <h4>Unidades:</h4>
							                <select id="cbUnidadeSuspensao">
                                                <option value="0">Todas</option>                        
                                                <%
                                                foreach (var unidade in lUnidade)
                                                {
                                                    %>
                                                    <option value="<%=unidade.id%>"><%=unidade.strUnidade%></option>
                                                    <%
                                                }
                                                %>
                                            </select>
						                </div>
						                <div class="itens_botoes">
							                <a class="btn_laranja salvar" href="javascript: void(0);" onclick="listaSuspensos(0)">Filtrar</a>
						                </div>
					                </div>
				                </div>
			                </div>
                            <%
                        }
                        %>                        
                        <div id="box_ListarSuspensos">
       
                        </div>
                    </div>   
                </div>

                <div id="tabs-6">
                    <div class="box_admin">
                        <a class="btn_cinza adm_ava_atualizar" href="javascript:void(0);" onclick="listaAgenda('2,3,4')"><span class="FontAwesome"></span>Atualizar dados</a>
                        <div id="box_ListarAgenda">
       
                        </div>
                    </div>   
                </div>

                <div id="tabs-7">
                    
                    <div class="box_admin">
                        <a class="btn_cinza adm_ava_atualizar" href="javascript:void(0);" onclick="listaAdmins();limpaBuscaEducador();"><span class="FontAwesome"></span>Atualizar dados</a>
                        <h2>Administradores</h2>
                        <p>Aqui estão os administradores da rede social da sua escola.</p>
                        
                        <div class="admin_cadastrado">
							<h3>Administradores</h3>

                            <div id="box_listaAdms">
                                
                            </div>
						</div>

                        <div class="tipos_cadastrados">
							<h3>Adicionar Administradores</h3>
						    
                            <form>
                                <input type="text" placeholder="Digite o nome, login ou apelido do educador." id="strPesquisaEduc">
                                <a class="bt_geral_administradores" href="javascript: void(0)" onclick="buscaEducadoresEscola();">
                                    <span class="FontAwesome"></span>										
                                </a>
                            </form>

                            <div id="listabuscaeducadores">
                                
                            </div>

						</div>

                        <div style="clear:both;"></div>

                    </div>   
                </div>
                <div id="tabs-8">
                    <div class="box_admin link_over">                       
                        <div id="box_LinksRapido">
							<a onclick="linksRapidos();" href="javascript:void(0);" class="btn_cinza adm_ava_atualizar"><span class="FontAwesome"></span>Atualizar dados</a>
							<div class="header_painel">
								<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />
							</div>	
						</div>
					</div>
                </div>
                <div id="tabs-10">
                    <div class="box_admin">
                        
                    </div>
                </div>

        </div>   
        </section>
    </div>

<script>    
    
    montaTabs();

    var tipo_url = self.document.location.hash;
    
    if (tipo_url == "#avisos") {
        $('#tabs').tabs('select', '#tabs-3');
        location.href = '#avisos';
        listaAvisos();
    } else if (tipo_url == "#estatisticas") {
        $('#tabs').tabs('select', '#tabs-1');
        location.href = '#estatisticas';
        listaRelatorios();
    } else if (tipo_url == "#mensagens") {
        $('#tabs').tabs('select', '#tabs-2');
        location.href = '#mensagens';
        listaMensagem();
    } else if (tipo_url == "#denuncias") {
        $('#tabs').tabs('select', '#tabs-4');
        location.href = '#denuncias';
        listaDenuncias(0);
    } else if (tipo_url == "#suspensoes") {
        $('#tabs').tabs('select', '#tabs-5');
        location.href = '#suspensoes';
        listaSuspensos();
    } else if (tipo_url == "#agenda") {
        $('#tabs').tabs('select', '#tabs-6');
        location.href = '#agenda';
        listaAgenda("2,3,4");
    } else if (tipo_url == "#adms") {
        $('#tabs').tabs('select', '#tabs-7');
        location.href = '#adms';
        listaAdmins();
        limpaBuscaEducador();
    } else if (tipo_url == "#linksrapido") {
        $('#tabs').tabs('select', '#tabs-8');
        location.href = '#linksrapido';
        linksRapidos();
    } else if(tipo_url == "#configuracoes"){
        $('#tabs').tabs('select', '#tabs-10');
        location.href = '#configuracoes';
        configuracoes();
    } else {
        $('#tabs').tabs('select', '#tabs-3');
        location.href = '#avisos';
        listaAvisos();
    }
    

</script>

</asp:Content>
