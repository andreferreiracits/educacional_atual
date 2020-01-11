<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Seletor.Model.SeletorModelo>" %>



<%
Seletor.Model.SeletorModelo seletor = Model;

bool bolAlunoLogado = Convert.ToBoolean(ViewData["bolAlunoLogado"]); 
bool isBolCaminhos = Convert.ToBoolean(ViewData["isBolCaminhos"]); 



%>

<div class="seletor">
		<h1><%=seletor.strTitulo %></h1>
		<div class="conteudo_seletor">
			<ul class="menu_seletor">
				<!-- <li class="seletorselecionado" style="display: none;"><a href="javascript:void(0);"><strong>1</strong> <span>selecionado</span></a></li> -->
                <%
                    
                    if(seletor.bolProfessores   ){
                        //seletor.bolProfessores && (!)
                        %>
                        <li class="active"><a class="selecionarTipoUsuarioSeletor" href="javascript:void(0);" tipo="educador">Professores</a></li>
                        <li class="<%= !seletor.bolProfessores ? "active" : "" %>" ><a class="selecionarTipoUsuarioSeletor" href="javascript:void(0);" tipo="turma">Turma</a></li>
                        <%
                    }
                   
                    if (seletor.bolResponsavel)
                    {
                        %>
                        <li class="<%= !seletor.bolProfessores ? "active" : "" %>" ><a class="selecionarTipoUsuarioSeletor" href="javascript:void(0);" tipo="responsavel">Pais e Responsáveis</a></li>
                        
                        <%
                    }
                    if (seletor.bolAlunos)
                    {
                        %>
                        <li class="<%= !seletor.bolProfessores && !seletor.bolResponsavel ? "active" : "" %>" ><a class="selecionarTipoUsuarioSeletor" href="javascript:void(0);" tipo="aluno">Alunos</a></li>
                        
                        <%
                    }
                    if (!seletor.bolProfessores )
                    {
                        %>                        
                        <li ><a class="selecionarTipoUsuarioSeletor" id="turmaSelector" href="javascript:void(0);" tipo="turma">Turma</a></li>
                        <%
                    }
                    if (seletor.bolSeguidores)
                    {
                        %>
                        <li class="<%= !seletor.bolProfessores && !seletor.bolAlunos && !seletor.bolResponsavel ? "active" : "" %>" ><a class="selecionarTipoUsuarioSeletor" href="javascript:void(0);" tipo="seguidor">Seguidores</a></li>
                        <%
                    }
                    if (seletor.bolAdmCoordDiret)
                    {
                        %>
                        <li class="<%= !seletor.bolProfessores && !seletor.bolAlunos && !seletor.bolResponsavel && !seletor.bolSeguidores ? "active" : "" %>" ><a class="selecionarTipoUsuarioSeletor" href="javascript:void(0);" tipo="admcoorddiret">Adm., Coord. e Diretores</a></li>
                        <%
                    }


                %>
			</ul>

            <div class="itens_seletor_conteudo selecionadosUsersSeletor" style="display: none;">
				
				<form action="">
					<input type="text" class="pesquisa_seletor selecionados" name="" placeholder="Pesquisar em todos os selecionados">
				</form>
				<div id="listaCarteirinhaSeletorSelecionado">
				</div>	
			</div>
			<div class="itens_seletor_conteudo selecionarUsersSeletor">

                <strong class="filtroAluno">Filtrado por: </strong><span class="filtroAluno"></span>
				<form action="" <%=!seletor.bolSelecionarTodos ? "class=\"elementox\"" : "" %>>                    
                    
                    <div id="boxComboSeletor">
                        <% 
                            Html.RenderPartial("FiltroCombo", seletor, new ViewDataDictionary { { "bolAlunoLogado", bolAlunoLogado } });
                        %>
                    </div> <!--boxComboSeletor-->
                    <%
                        if (seletor.bolSelecionarTodos)
                        {
                            %>
                            <input type="button" class="btn_cinza selecionar left selecionarTodos" value="Selecionar todos" data-selecionado="0" data-qtdusuarios="0">
                            <%
                        }
                    %>
                    <div class="caixa_busca">
					    <input type="text" class="pesquisa_seletor" name="" placeholder="Procurar pessoas entre as selecionadas.">
                    </div>
                    <div class="tool_selecao" style="display: none;">
						<p>Os usuários que ainda estão selecionados, pertencem a outras seleções.</p>
						<div class="setaEsquerda"></div>
					</div>
				</form>
               
				<div id="listaCarteirinhaSeletor">
                </div>
			</div>
            
		</div>

		<div class="right">
            <label class="seletorselecionado" style="display: none;"><a href="javascript:void(0);"><strong>1</strong> <span>selecionado</span></a></label>
            <div class="container">
			<a href="javascript: $.fancybox.close();" id="btn_cancelarGeral" class="btn_cinza left">Cancelar</a>
			<a href="javascript:void(0);" class="btn_laranja inativo right teste"><%=seletor.btnTextoBotaoConclusaoSeletor %></a>
            </div>
		</div>
	</div>

    <div id="isCaminhos" value="<%=isBolCaminhos%>" hidden>

    </div>



    <script>

        console.log('OK');

    </script>