<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.CorrecaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ajuda.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Correcao.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/respostas.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.textareaCounter.plugin.js") %>"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/ajudaView.css") %>" />
	<link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/correcao.css") %>" />
</asp:Content>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
	<div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
				<div class="clear"></div>
                <div id="alerta" class="mensagem"></div>
				<div id="infoCorrecao">
					<% Html.RenderPartial("BoxTituloAplicacao", Model); %>
					<div class="boxQuestao">
						<div class="infoQuestao">
                            <div class="direita">
                                <a class="btn" id="btnOcultarEnunciado"><span class="btn_setaUP">Ocultar</span>|<span class="btn_setaDown">Expandir</span></a>
                            </div>
                            <div class="conteudo">
							    <label>Questão:</label>
							    <span class="btn"><%= Html.ActionLink("alterar questão", "Aplicacao", "Correcao", new { @id = Model.IdAplicacao, @idSeg = Model.IdTipoCorrecao }, new { @class = "btn" }) %></span>
                            </div>
                            <div class="botoes">
                                <a class="btn" href="<%= Url.Action("RespostasQuestao", "Correcao", new { @id = Model.IdAplicacao, @idSeg = Model.Anterior }) %>" id="btnPrev" datavalor="<%= Model.Anterior %>">
                                    <span class="btnEsquerda"></span>Anterior
                                </a>                                
                                <a class="btn" href="<%= Url.Action("RespostasQuestao", "Correcao", new { @id = Model.IdAplicacao, @idSeg = Model.Proximo }) %>" id="btnNext" datavalor="<%= Model.Proximo %>">
                                    Próximo<span class="btnDireita"></span>
                                </a>
                            </div>
						</div>
						<div class="textoQuestao mceView" id="boxEnunciado"><%= Model.EnunciadoView %></div>
                        <div class="textoQuestao mceView" id="boxEnunciadoReduzido"><%= Html.Encode(Model.EnunciadoReduzido) %></div>
					</div>
					<%
			            if (!String.IsNullOrWhiteSpace(Model.SugestaoProfessor))
                        {
                            %>
					        <div class="areaBoxComentProf">
						        <div class="boxSugestaoProfessor">
							        <label class="ComentProf">Resposta modelo</label>
							        <%= Model.SugestaoProfessor %>
						        </div>
					        </div>
                            <%
                        }
                    %>
					<% Html.RenderPartial("BoxMenuCorrecao", Model); %>
					<%
					    using (Html.BeginForm("CarregarRespostasQuestoes", "Correcao", FormMethod.Post, new { @id = "frmResposta", @class = "tbl" }))
			            {
                            %>
						    <input type="hidden" id="txtIdAplicacao" name="txtIdAplicacao" value="<%= Model.IdAplicacao %>" />
						    <input type="hidden" id="txtIdQuestao" name="txtIdQuestao" value="<%= Model.IdQuestao %>" />
						    <div class="ferramentas hide">
							    <div class="funcao">
								    <div id="filtro" class="slc">
									    <a class="nome">Filtros</a>
									    <div class="opcoes filtro">
										    <a class="fechar right" href="#fechar">X</a>
										    <div class="frm">
											    <label for="txtNomeAluno">Nome do aluno:</label>
											    <%= Html.TextBox("txtNomeAluno", "", new { maxlength = 60, @class = "txt" }) %>
										    </div>
										    <div class="clear"></div>
										    <div class="botoes">
											    <input type="button" id="btnCancelar" class="btn fechar left" value="Cancelar" />
											    <input type="button" id="btnFiltrar" class="btn executar right" value="Filtrar" />
										    </div>
									    </div>
								    </div>
							    </div>
							    <div class="filtros">
								    <span class="textoFiltros">Sem filtros</span>
							    </div>
							    <div class="paginacao"></div>
						    </div>
						    <div id="lstRespostas"></div>
						    <div class="ferramentas">
							    <div class="resultado"></div>
							    <div class="paginacao"></div>
						    </div>
                            <%
                        }
                    %>
				</div>
			</div>
		</div>
	</div>
</asp:Content>