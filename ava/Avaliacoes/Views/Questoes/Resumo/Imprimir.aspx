<%@ Page Language="C#"  Inherits="System.Web.Mvc.ViewPage<IEnumerable<ProvaColegiada.TabelaViews.QuestaoView>>" %>
<%--<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>--%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Avaliações</title>
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/questaoResumoPrint.css") %>" />
    
    <!--script type="text/javascript">
        window.onload = function () {
            window.print();
        }
    </script-->
</head>
<body class="SEC02511">
    <div id="conteudo">
        <div class="caixa">
        <%foreach ( var item in Model ) { %>
            <div class="caixaConteudo">
                <div id="infoQuestao">
                    <div id="cxaResumoQuestao">
                        <div>
                            <h1 style=" display: inline-block; margin-right: 15px; ">Questão</h1>
                            <h3 style=" display: inline-block; ">Finalidade: <%= item.NomeTipoBanco %> - <%= item.TipoResposta %></h3>
                        </div>
                            <div class="areaConfiguracoesQuestao">
                                <div id="boxClassificacaoQuestao">
		                            <div class="linhaImpar">
			                            <label class="questao">Grau de dificuldade:</label>
			                            <span class="SEC02511_texto"><%= item.Dificuldade %></span>
		                            </div>  
		                            <% Html.RenderPartial(item.CompartilhamentoViewRO, item); %>
                                    <div class="linhaImpar">
			                            <label class="questao">Estado:</label>
			                            <span class="SEC02511_texto"><%= item.Estado %></span>
		                            </div>
		                            <div class="linhaPar">
			                            <label class="questao">Ano:</label>
			                            <span class="SEC02511_texto"><%= item.Ano %></span>
		                            </div>
		                            <div class="linhaImpar">
			                            <label class="questao">Identificador:</label>
			                            <span class="SEC02511_texto"><%= Html.Encode(item.Identificador)%></span>
		                            </div>
		                            <div class="linhaPar">
			                            <label class="questao">Tags:</label>
			                            <span class="SEC02511_texto"><%= Html.Encode(item.Tags) %></span>
		                            </div>
	                            </div>
                            </div>
                            <div class="areaClassificacaoTabela">
                            <% foreach (string v in item.tabelasROClassificacao) {
			                    Html.RenderPartial(v, item.Classificacao);
		                    } %>
		                    </div>
                            <% if ( item.EnunciadoBase != null && item.EnunciadoBase.Count > 0 ) { %>
                                <div class="areaEnunciado ConfirmaQuestao">
                                    <h2 style=" display: inline-block; margin-right: 15px; ">Enunciado Base</h2>
                                    <% foreach ( var e in item.EnunciadoBase ){ %>
                                        <div class="separadorQuestaoBase"></div>
                                        <div class="areaEnunciado mceView">          
                                            <%= e.Texto.TextoView %>
                                        </div>
                                    <%} %>
                                </div>
                            <% } %>
                            <div class="areaEnunciado ConfirmaQuestao">
                                <h2 style=" display: inline-block; margin-right: 15px; ">Enunciado</h2>
                                <div class="areaTextoEnunciado mceView">
		                            <%= item.Enunciado.Texto.TextoView %>
	                            </div>
                                <div class="clear"></div>
    	
	                            <% Html.RenderPartial("ComentarioReadOnly", item.Enunciado.Comentario); %>
                            </div>
                            <% if ( !String.IsNullOrEmpty(item.TipoRespostaView.ViewAlternativaRO) ) { %>
                            <div class="areaRespostas">
                                <% Html.RenderPartial(item.TipoRespostaView.ViewAlternativaRO, item); %>
                            </div>          
                            <% } %>
                    </div>
                </div>
            </div>
            <%} %>
        </div>
    </div>

    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.7.min.js") %>"></script>    <script type="text/javascript">
        $(document).ready(function () {
            window.print();
            console.log("ok");
        });
    </script>

</body>
</html>





