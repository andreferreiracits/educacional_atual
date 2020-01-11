<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<%
    using (Html.BeginForm("SalvarQuestao", "Questoes", FormMethod.Post, new { @id = "frmSalvarResumo" }))
    {
        %>
            <% Html.RenderPartial(Model.InnerResumo, Model); %>
            <div class="navegacaoBotoes">
                <div class="btnEspacamento">
                    <%= Html.ActionLink("Cancelar", "Index", "Admin", new { @id = "btnCancelar", @class = "btnCancelar btnCanconfirma" })%>
                </div>
                <div id="botoesResumo" class="to direita">
                    <div class="estadoQuestao">
                        <% Html.RenderPartial(Model.ComentarioEstadoView); %>
                        <div>Escolha o estado da questão: (Somente questões em estado <b>PUBLICADA</b> podem ser usadas em avaliações)</div>
                        <%
                            foreach (SelectListItem estado in Model.listaSelectStatus)
                            {
                                %>
                                    <%=Html.RadioButton("rdoEstado",estado.Value, estado.Selected, new {@id="rdoEstado_" + estado.Value.ToString()}) %>
                                    <label for="rdoEstado_<%=estado.Value.ToString()%>"><%=estado.Text %></label>
                                <%
                            }
                        %>
                    </div>
                    <a id="btnVoltarResumo" class="btnNav">&laquo; Voltar</a>
                    <%
                        if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal || ((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
                        {
                            %>
                                <a id="btnImprimirResumo" class="btnNav">Imprimir</a>
                            <%
                        }
                    %>
                    <% Html.RenderPartial(ViewData["BtnCriarSalvar"].ToString()); %>
                    <a id="btnSalvarResumo" class="btnNav">Salvar questão</a>
                </div>
                <div id="duplicaResumoAviso" class="to direita hide">
        	        <div class="bordaEsq"></div>
                    <div class="bordaMeio SEC02511_texto">
                        <p>Deseja que essa nova questão possua a mesma característica e classificação da questão atual?</p>
                        <div class="botao">
                            <a id="btnSalvarDuplicarSimResumo" class="btnNav direita">Sim</a>
                            <a id="btnSalvarDuplicarNaoResumo" class="btnNav direita">Não</a>
                            <div class="btnEspacamento">
                                <a id="btnDuplicarCancelarResumo" class="btnCancelar">Cancelar</a>
                            </div>
                        </div> 
                    </div>
        	        <div class="bordaDir"></div>
                </div>
                <div class="clear"></div>
            </div>
        <%
    }
%>