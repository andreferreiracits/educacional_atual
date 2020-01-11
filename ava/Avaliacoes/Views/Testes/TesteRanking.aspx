<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>TesteRanking</title>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#frmRankingGeral, #frmRankingAgrupamento, #frmRankingClassificacao').submit(function (ev) {
                var container = $(this);
                $.ajax({
                    url: $(this).attr("action"),
                    data: $(this).serialize(),
                    type: "POST",
                    success: function (dados, status, xhttp) {

                        container.find(' .retorno').html(JSON.stringify(dados));
                    }
                });
                ev.preventDefault();
            });
        });
    </script>
</head>
<body>
    <%  
        using (Html.BeginForm("RankingGeralJson", "Simulado", FormMethod.Post, new { @id = "frmRankingGeral" }))
        {%>
        <h1>
        Visualizar ranking geral
        </h1>
        <div><label>Simulado Ranking:<input type="text" name="IdSimulado" value="" /></label></div>
        <div><label>Id Escola:<input type="text" name="IdEscola" value="" /></label></div>
        <div><label>Id Serie:<input type="text" name="IdSerie" value="" /></label></div>
        <div><label>Id Turma:<input type="text" name="IdTurma" value="" /></label></div>
        <div><label>Total por pagina:<input type="text" name="intTotalPorPagina" value="20" /></label></div>
        <div><label>Total por pagina:<input type="text" name="intPaginaAtual" value="1" /></label></div>
        <div><button type="submit">Enviar</button></div> 
        <div class="retorno">
        </div>       
<%
        }
%>


<%  
        using (Html.BeginForm("RankingAgrupamentoJson", "Simulado", FormMethod.Post, new { @id = "frmRankingAgrupamento" }))
        {%>
        <h1>
        Visualizar ranking agrupamento
        </h1>
        <div><label>Simulado Ranking:<input type="text" name="IdSimulado" value="" /></label></div>
        <div><label>Id Usuario:<input type="text" name="IdUsuario" value="" /></label></div>
        <div><label>Id Turma:<input type="text" name="IdTurma" value="" /></label></div>
        <div><button type="submit">Enviar</button></div> 
        <div class="retorno">
        </div>       
<%
        }
%>


<%  
    using (Html.BeginForm("RankingClassificacaoJson", "Simulado", FormMethod.Post, new { @id = "frmRankingClassificacao" }))
        {%>
        <h1>
        Visualizar ranking classificacao
        </h1>
        <div><label>Simulado Ranking:<input type="text" name="IdSimulado" value="" /></label></div>
        <div><label>Id Usuario:<input type="text" name="IdUsuario" value="" /></label></div>
        <div><label>Id Turma:<input type="text" name="IdTurma" value="" /></label></div>
        <div><button type="submit">Enviar</button></div> 
        <div class="retorno">
        </div>       
<%
        }
%>

</body>
</html>
