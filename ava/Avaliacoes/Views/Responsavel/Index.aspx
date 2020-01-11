<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
    <%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/responsavel.1.{0.0}.js")%>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.timePicker.min.js")%>" type="text/javascript"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ajuda2.0.0.js") %>"></script>

    <% 
        DateTime inicio = new DateTime(DateTime.Now.Year, 1, 1, 0, 0, 0);
        DateTime fim    = new DateTime(DateTime.Now.Year, 12, 31, 23, 59, 59);
    %>
    <script type="text/javascript">
        var periodo = {
            inicio: {
                data: '<%:inicio.ToString("dd/MM/yyyy") %>',
                hora: '<%:inicio.ToShortTimeString() %>'
            },
            fim: {
                data: '<%:fim.ToString("dd/MM/yyyy") %>',
                hora: '<%:fim.ToShortTimeString() %>'
            }
        };
    </script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
	<link href="<%= UtilView.Url("/Content/css/responsavel.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.Url("/Content/css/timePicker.css") %>" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/ajudaView2.0.0.css") %>" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <img src="<%=Html.BundleFile("Content/imgcss/1.0.2/bt_x.png")%>" style="display:none" id="pathImgFechar" />
    <div id="conteudo">
	    <div class="caixa">
            <% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
            
			    <div class="clear"></div>
			    
			    
            <!-- #region Formulário da Tabela de Questao -->
                <% using (Html.BeginForm("CarregarRealizacoesFilho", "Responsavel", FormMethod.Post, new { @id = "frmTabela", @class = "tbl" }))
                { %>
                
			    <div id="responsavel">
                <div id="divFiltro">
                    <div id="divFiltroFilho">Veja as avaliações para <select name="idFilho" id="idFilho"><option value="0">Selecione</option></select></div>
                </div>
                <div id="divAlerta" class='divAlerta hide'>
                    
                    <div class='alertMsg'>Mensagem chamativa para o aluno, como uma prova que ele perdeu ou algo que foi remarcado!</div>
                </div>
                
                <div id="Corpo" class='Corpo'>
			        
			        <div id="alerta" class="mensagem comBotao"></div>
                    <div id="colunaEsquerdaAResponder" class='colunaEsquerdaAResponder'>
                        <div id="filtroAresponder" class='divFacaFiltros'>
                            <div class='subDivFacaFiltros'>
                                <div class='linhasDivFacaFiltros titDivFacaFiltros'><img src="<%= UtilView.Url("/Content/imgcss/1.0.2/txtFacaFiltros.png") %>" /></div>
                                <div class='linhasDivFacaFiltros borderBottomLinhas corTxtAberta'><label><input name="tipoStatusFiltro" id="tipoStatusFiltroAberta" type="checkbox" checked="checked" value="3"/> Aberta [<span>0</span>] <img src="<%= UtilView.Url("/Content/imgcss/1.0.2/icoFiltroAberta.png") %>" /></label></div>
                                <div class='linhasDivFacaFiltros borderBottomLinhas borderTopLinhas corTxtResultado'><label><input name="tipoStatusFiltro" id="tipoStatusFiltroResultado" type="checkbox" checked="checked" value="0"/> Resultado [<span>0</span>] <img src="<%= UtilView.Url("/Content/imgcss/1.0.2/icoFiltroResultado.png") %>" /></label></div>
                                <div class='linhasDivFacaFiltros borderBottomLinhas borderTopLinhas corTxtEmBreve'><label><input name="tipoStatusFiltro" id="tipoStatusFiltroEmBreve" type="checkbox" checked="checked" value="1"/> Em Breve [<span>0</span>] <img src="<%= UtilView.Url("/Content/imgcss/1.0.2/icoFiltroEmBreve.png") %>" /></label></div>
                                <div class='linhasDivFacaFiltros borderBottomLinhas borderTopLinhas corTxtEncerrada'><label><input name="tipoStatusFiltro" id="tipoStatusFiltroEncerrada" type="checkbox" checked="checked" value="4"/> Encerrada [<span>0</span>] <img src="<%= UtilView.Url("/Content/imgcss/1.0.2/icoFiltroEncerrada.png") %>" /></label></div>
                                <div class='linhasDivFacaFiltros borderTopLinhas corTxtNaoRealizada'><label><input name="tipoStatusFiltro" id="tipoStatusFiltroNaoRealizada" type="checkbox" checked="checked" value="2" /> Não Realizada [<span>0</span>] <img src="<%= UtilView.Url("/Content/imgcss/1.0.2/icoFiltroNaoRealizada.png") %>" /></label></div>
                            </div>
                        </div>
                    </div>
                        <div id="colunaDireitaAResponder" class='colunaDireitaAResponder'>
                            <div id="barraStatus">
	                            <div id="tipoPercFiltroAberta" class="statusAberta statusFiltro" data-for="tipoStatusFiltroAberta"></div>
	                            <div id="tipoPercFiltroResultado" class="statusResultado statusFiltro" data-for="tipoStatusFiltroResultado"></div>
	                            <div id="tipoPercFiltroEmBreve" class="statusEmbreve statusFiltro" data-for="tipoStatusFiltroEmBreve"></div>
	                            <div id="tipoPercFiltroEncerrada" class="statusEncerrada statusFiltro" data-for="tipoStatusFiltroEncerrada"></div>
	                            <div id="tipoPercFiltroNaoRealizada" class="statusNaorealizada statusFiltro" data-for="tipoStatusFiltroNaoRealizada"></div>
                            </div>
                            <div id="divFiltroAvancado">
                                        <div class="cxFiltroAvancados">
                                            <a title="Filtrar por período" class="btAresponder bordaD btDataInicio"></a>
                                            <a title="Filtrar por autor" class="btAresponder bordaD bordaE btAgendador"></a>
                                            <a title="Somente avaliações" class="btAresponder bordaD bordaE btTipoAvaliacao"></a>
                                            <a title="Somente pesquisas de opinião" class="btAresponder bordaE btTipoPesquisaOp"></a>
                                        </div>
                                        <div class="cxOrdemResultado">
                                            <a title="Ordenar por título de A para Z" class="btAresponder bordaD btOrdemAZ"></a>
                                            <a title="Ordenar por título de Z para A" class="btAresponder bordaD bordaE btOrdemZA"></a>
                                            <a title="Ordenar pelo começo" class="btAresponder bordaD bordaE btOrdemC"></a>
                                            <a title="Ordenar pelo término" class="btAresponder bordaE btOrdemT"></a>
                                        </div>
                                        <div id="divContainerFiltroAvancado" class="divContainerFiltroAvancado">
                                            <div id="divFiltroAvancadoAgendador" class="divFiltroAvancado hide">
                                                <div class="setUpDivAgendador"></div>
                                                <label for="txtNome">Procure uma avaliação por quem agendou:</label> 
                                                <!-- %= Html.DropDownList("slcTipoSelecao", (IEnumerable<SelectListItem>)ViewData["TipoSelecao"], new { @class = "slc" })%-->
                                                <!--%= Html.TextBox("idAgendador", "", new { maxlength = 60, @class = "txt" })%-->
                                                <select name="idAgendador" id="idAgendador"><option value="0">Selecione</option></select>
                                                <input type="button" id="btnFiltrarAgendador" class="btn" value="OK" />
                                            </div>
                                            <div id="divFiltroAvancadoDataInicio" class="divFiltroAvancado hide">
                                                <div class="setUpDivData"></div>
                                                <label for="txtRealizacao" class="labelData">Realização:</label>
									            <%= Html.TextBox("realizacaoInicial", "", new { @id = "realizacaoInicial", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
                                                <%= Html.TextBox("horaInicial", "", new { @id = "horaInicial", @size = 5, @readonly = "readonly", @maxlength = 10, @class = "txtHora txt" })%>
									            <span>a</span>
									            <%= Html.TextBox("realizacaoFinal", "", new { @id = "realizacaoFinal", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
                                                <%= Html.TextBox("horaFinal", "", new { @id = "horaFinal", @size = 5, @readonly = "readonly", @maxlength = 10, @class = "txtHora txt" })%>
                                                <input type="button" id="btnFiltrarPeriodo" class="btn" value="OK" />
                                             </div>
                                            <div id="divConteudoFiltroAvancado" class="conteudoFiltroAvancado hide">
                                                <span>FILTRADO/ORDENADO POR:</span>
                                                <!--input id="txtFiltros" type="hidden" value="[]" name="txtFiltros"-->
                                                <%= Html.TextBox("txtFiltroTipoAplic", "", new { @type = "hidden", @id = "txtFiltroTipoAplic" })%>
                                            </div>
                                        </div>
                                </div>
                            <div id="divListaAplic">
				            <table id="tblAplicacoesFilho" width="100%">
	                            <tbody></tbody>
                            </table>
                            </div>
                        </div>
                        <div class="clear"></div>
                </div>
                <div id="rodaPeARespoder">
          
                    <div class="paginacaoAresponder ferramentas">
                        <div class="paginaAtual paginacao"></div>
                        <div class="infoPaginas resultado"></div>
                    </div>
                    <div class="legenda">
                        <span>Legenda: </span><span><img src="<%= UtilView.Url("/Content/imgcss/1.0.2/icoTipoAvaliacaoLeg.png") %>" /> AVALIAÇÃO | <img src="<%= UtilView.Url("/Content/imgcss/1.0.2/icoTipoPesquisaOpiniaoLeg.png") %>" /> PESQUISA</span>
                    </div>
                </div>
             
				<!-- div class="ferramentas">
				    <div class="resultado"></div>
					<div class="paginacao"></div>
				</div-->
                
            <!-- #end region Formulário da Tabela de Questao -->
            </div>
                <% } %>
            <!-- #end region Formulário da Tabela de Questao -->
            
            </div>
		</div>
    </div>
</asp:Content>