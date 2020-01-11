<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.Grupos>" %>

<div class="config editar" style="display: block;">
    
    <h1>Edição do grupo</h1>
	<div class="envolto">
        
        <% 
        if (Model.bolPublico)
        {
           %>
            <h2>Público - </h2>
            <p>O grupo é visível publicamente para permitir solicitações de participação. O conteúdo do grupo não é exibido para os não participantes.</p>				
           <%     
        }
        else
        {
            %>
            <h2>Privado - </h2>
			<p>Os usuários serão inscritos pelos mediadores e o grupo será listado apenas para os participantes.</p>
            <%
        }
        %>

        <form action="javascript: void(null);">

            <span>Nome do grupo</span>
			<input id="txtNomeGrupoPublico" value="<%=Model.strNome%>" type="text" maxlength="60" />

			<span>Descrição</span>
			<textarea id="txtDescricaoGrupoPublico"><%=Model.strDescricao%></textarea>

            <%--<span>Adesão</span>--%>

            <%
            if (Model.bolPublico)
            { 
            %>
                <%--<div style="display:none;">
                    <label class="styleRadio" for="rbAdesaoSemMediacao">
                        <input type="radio" name="rbAdesaoPublico" id="rbAdesaoSemMediacao" value="1" <%=((Model.idAdesao == 1) ? "checked=\"checked\"" : " ")%>/> Sem mediação
                    </label>
			        <label class="styleRadio" for="rbAdesaoAprovacao">
                        <input type="radio" name="rbAdesaoPublico" id="rbAdesaoAprovacao" value="2" <%=((Model.idAdesao == 2) ? "checked=\"checked\"" : " ")%>/> Aprovados por mediador
                    </label>
                </div>--%>
                <span>Qual é o público potencial do grupo?</span>
			    <div class="bootstrap">
			        <div class="btn-group">
			            <a href="javascript: void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle" id="txtPublicoPotencial"> 
                            <span class="FontAwesome"></span>
                            <% 
                            int contPublico = 0;
                            foreach (var publicoPotencial in Model.lPublicoPotencial)
                            {
                                if (contPublico == (Model.lPublicoPotencial.Count - 1))
                                {
                                    Response.Write(publicoPotencial.strPublicoPotencial);
                                }
                                else
                                {
                                    Response.Write(publicoPotencial.strPublicoPotencial + ", ");
                                }
                                
                                contPublico++;
                            }
                            %>
                             <span class="caret"></span>
                        </a>
			            <ul class="dropdown-menu" id="cbPublicoPotencial">
    		                <% 
                            List<Grupo.Models.PublicoPotencial> lListaPublicoGeral = (List<Grupo.Models.PublicoPotencial>)ViewData["lPublicoPotencialGeral"];
                            foreach (var publicoPotencial in lListaPublicoGeral)
                            {
                                int idPublico = publicoPotencial.id;
                                string strPublico = publicoPotencial.strPublicoPotencial;
                                string strChecked = "";                                
                                
                                if (Model.lPublicoPotencial.FindAll(p => p.id == publicoPotencial.id).Count > 0)
                                {
                                    strChecked = "checked";
                                }
                                %>
                                <li>
                                    <% 
                                    if (publicoPotencial.id > 1)
                                    {
                                        %>
                                        <input type="checkbox" <%=strChecked%> id="cbPublicoPotencial_<%=idPublico%>" name="cbPublico" value="<%=idPublico%>"/>
                                        <%  
                                    }
                                    %>
			                        <label for="cbPublicoPotencial_<%=idPublico%>"><span class="FontAwesome"></span> <%=strPublico%></label>
			                    </li>
                                <%        
                            }			           
                            %>
			            </ul>
			        </div> 
			    </div>

            <% 
            }
            else
            {
                %> 
                <%--<div style="display:none;">
                    <label class="styleRadio" for="rbAdesaoConvite">
                        <input type="radio" name="rbAdesaoPrivado" id="rbAdesaoConvite" value="3" <%=((Model.idAdesao == 3) ? "checked=\"checked\"" : " ")%> /> Convite
                    </label>
                    <label class="styleRadio" for="rbAdesaoObrigatoria">
                        <input type="radio" name="rbAdesaoPrivado" id="rbAdesaoObrigatoria" value="4" <%=((Model.idAdesao == 4) ? "checked=\"checked\"" : " ")%>/> Obrigatória
                    </label>
                </div>--%>
                <%
            }    
            %>

			<span>Estado</span>
			<label class="styleRadio" for="rbEstadoGrupoAtivo">
                <%
                if (Model.idEstado == 1)
                {
                    %>
                    <input type="radio" name="rbEstadoGrupo" id="rbEstadoGrupoAtivo" value="1" checked/> Ativo
                    <%
                }
                else
                {
                    %>
                    <input type="radio" name="rbEstadoGrupo" id="rbEstadoGrupoAtivo" value="1"/> Ativo
                    <%
                }
                %>
			</label>
			<label class="styleRadio" for="rbEstadoGrupoInativo">
                <%
                if (Model.idEstado == 2)
                {
                    %>
                    <input type="radio" name="rbEstadoGrupo" id="rbEstadoGrupoInativo" value="2" checked/> Inativo
                    <%
                }else
                {
                    %>
                    <input type="radio" name="rbEstadoGrupo" id="rbEstadoGrupoInativo" value="2"/> Inativo
                    <%
                }
                %>
			</label>
            <%
                //Alteração Renan: só possibilita o usuário de setar o grupo como congelado, se for do idTipoGrupo = 1 (portal).
                if (Model.idTipo.Equals(1))
                {
                %>
                <label class="styleRadio" for="rbEstadoGrupoCongelado">
                    <%
                    if (Model.idEstado == 3)
                    {
                        %>
                        <input type="radio" name="rbEstadoGrupo" id="rbEstadoGrupoCongelado" value="3" checked/> Congelado
                        <%
                    }
                    else
                    {
                        %>
                        <input type="radio" name="rbEstadoGrupo" id="rbEstadoGrupoCongelado" value="3"/> Congelado
                        <%
                    }
                    %>
			    </label>
                <%
                } 
             %>
            <input type="hidden" id="bolPublico" value="<%=Model.bolPublico%>" />
            <input type="hidden" id="idTipo" value="<%=Model.idTipo%>" />
            <input type="hidden" id="strLink" value="<%=Model.strLinkPermanente%>" />
        </form>
        <span class="clearfix"></span>

    </div>

    <div class="botoes">
		<a href="/AVA/Grupo/Home/ListaExclusaoGrupo/<%=Model.id%>" class="btn_cinza left fancybox.ajax" id="excluir_grupo">Excluir Grupo</a>
		<a href="javascript:void(0);" class="btn_cor right" onclick="salvarEdicaoGrupo(<%=Model.id%>)">Salvar</a>
		<a href="javascript:void(0);" class="btn_cinza right" onclick="$.fancybox.close();">Cancelar</a>
	</div>
    
</div>

