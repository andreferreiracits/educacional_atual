<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoVOView>" %>

<div id="dlgRelatorio" title="Relatório da turma" class="popup SEC02511">
        <div class="clear"></div>
        <div class="relatorio">
            <div class="relatorioSuperior">
                <div class="destaqueAzul"></div>
            </div>
            <div class="clear"></div>
            <div class="relatorioConteudo">
                <% using (Html.BeginForm("Exportar", "Agendamento", FormMethod.Post, new { @id = "frmExportar", @class = "tbl" })) { %>
                <input type="hidden" name="hdExportar" id="hdExportar" />
                <input type="hidden" value="-1" name="strGrupoSelect" />
                <%} %>
    		    <!-- #region Formulário da Tabela de Aplicacao -->
			    <% using (Html.BeginForm("RelatorioAplicacao", "Agendamento", FormMethod.Post, new { @id = "frmTabelaRelatorio", @class = "tbl" })) { %>
                <input type="hidden" value="" id="idAplicacaoRelatorio" name="idAplicacaoRelatorio" />
                <input type="hidden" value="-1" id="strGrupoSelect" name="strGrupoSelect" />
			    <div class="clear"></div>
			    <table id="tblRelatorio" class="tabela scroll">
				    <thead>
					    <tr>
						    <td>N°</td>
						    <td style="width: 170px;">Código</td>
						    <td style="width: 250px;">Aluno</td>
                            <td style="width:120px">Grupo</td>
                            <td style="width:120px">Turma</td>
						    <td style="width: 140px;">Nota</td>
					    </tr>
				    </thead>
				    <tbody></tbody>
			    </table>
			    <div class="ferramentas">
				    <div class="resultado"></div>
				    <div class="paginacao"></div>
			    </div>
			    <% } %>
		        <!-- #end region Formulário da Tabela de Aplicacao -->
            </div>
        </div>
        <div class="clear"></div>
        <div class="auditoria">auditoria...</div>
        <div class="clear"></div>
        <div class="popupBotoes">
            <span class="">
                <a href="" id="btnRelatorioVoltar" class="btnNav">Voltar</a>
            </span>
            <span class="direita">
                <a href="" id="btnRelatorioExportar" class="btnNav">Exportar</a>
                <a href="" id="btnRelatorioOk" class="btnNav">OK</a>
            </span>
        </div>
</div>
