<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.Grupos>" %>

<div id="configprivado"  class="config" style="display: block;">
	<h1>Que tipo de grupo você está criando?</h1>
	<div class="envolto">
		<div class="publico">
			<h2>Público</h2>
			<p>O grupo é visível publicamente para permitir solicitações de participação. O conteúdo do grupo não é exibido para os não participantes.</p>
			<form action="javascript: void(null);">
				<span>Nome do grupo</span>
				<input id="txlNomeGrupoPublico" value="" type="text" maxlength="60" />

				<span>Descrição</span>
				<textarea id="txtDescricaoGrupoPublico"></textarea>

				<span>Adesão*</span>
                <p class="adesao_obs">Após criado o grupo, o tipo de adesão não poderá ser alterado.</p>
				<label class="styleRadio" for="rbAdesaoSemMediacao">
					<input type="radio" name="rbAdesaoPublico" id="rbAdesaoSemMediacao" value="1" checked/> Sem mediação
				</label>
				<label class="styleRadio" for="rbAdesaoAprovacao">
					<input type="radio" name="rbAdesaoPublico" id="rbAdesaoAprovacao" value="2"/> Aprovados por mediador
				</label>

				<span>Qual é o público potencial do grupo?</span>
			    <div class="bootstrap">
			        <div class="btn-group">
			            <a href="javascript: void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtPublicoPotencial"> 
                            <span class="FontAwesome"></span>Todos os usuários <span class="caret"></span>
                        </a>
			            <ul class="dropdown-menu" id="cbPublicoPotencial">
    		                <% 
                            foreach (var publicoPotencial in Model.lPublicoPotencial)
                            {
                                int idPublico = publicoPotencial.id;
                                string strPublico = publicoPotencial.strPublicoPotencial;
                                %>
                                <li>
                                    <% 
                                    if (publicoPotencial.id > 1)
                                    {
                                        %>
                                        <input type="checkbox" id="cbPublicoPotencial_<%=idPublico%>" name="cbPublico" value="<%=idPublico%>"/>
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
			</form>
		</div>
		<div class="privado">
			<h2>Privado</h2>
			<p>Os usuários serão inscritos pelos mediadores e o grupo será listado apenas para os participantes.</p>
			<form>
				<span>Nome do grupo</span>
				<input id="txlNomeGrupoPrivado" value="" type="text" maxlength="60" />

				<span>Descrição</span>
				<textarea id="txtDescricaoGrupoPrivado"></textarea>

				<span>Adesão*</span>
                <p class="adesao_obs">Após criado o grupo, o tipo de adesão não poderá ser alterado.</p>
				<label class="styleRadio" for="rbAdesaoConvite">
					<input type="radio" name="rbAdesaoPrivado" id="rbAdesaoConvite" value="3" checked /> Convite
				</label>
				<label class="styleRadio" for="rbAdesaoObrigatoria">
					<input type="radio" name="rbAdesaoPrivado" id="rbAdesaoObrigatoria" value="4"/> Obrigatória
				</label>
			</form>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="botoes right">
		<a href="javascript:;" class="btn_cinza" onclick="$.fancybox.close();">Cancelar</a>
        <a href="javascript:;" class="btn_cor" onclick="salvarGrupo(0);" id="btnSalvarGrupo" style="display: none;">Criar grupo</a>
	</div>		
</div>

