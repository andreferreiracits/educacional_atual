<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title></title>

    <base id="baseCorrecao" href="<%= UtilView.UrlCompleta(Request) %>" />

    <script src="<%= UtilView.Url("/Scripts/jquery-1.7.min.js") %>"                type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/jquery-ui-1.8.5.custom.min.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.textareaCounter.plugin.js") %>"  type="text/javascript"></script>

    <script src="<%= UtilView.Url("/Scripts/view/avaliacoes.correcao-1.0.1.js") %>"  type="text/javascript"></script>

    <link href="<%= UtilView.Url("/Content/css/jquery-ui-1.8.4.custom.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.Url("/Content/css/correcao1.0.0.css") %>" rel="stylesheet" type="text/css" />
    
    <script type="text/javascript">

        callBackErro = function (mensagem) {
            alert("externo - mensagem: " + mensagem);
        }

        abriuBoxCorrecao = function () {
            //alert(" Carregado ");
            //$("#CorrecaoPlugin").hide("slow");
            //$("#CorrecaoPlugin").show("slow");
        }
        abriuBoxQuestao = function () {
            //alert(" Carregado ");
            //$("#CorrecaoPlugin").hide("slow");
            //$("#CorrecaoPlugin").show("slow");
        }
        funcaoCarregando = function () {
            //alert(" carregando ");
        }

        funcaoRetornoStatus = function (dados) {
            $("#status").text( JSON.stringify(dados) );
        }

        $(document).ready(function () {
            $("#btnCorrigir").click(function () {

                var idAplicacao = $("#pidApli").val();
                var IdUsuario = $("#pidUser").val();

                $("#CorrecaoPlugin").avaliacoescorrecao({
                    'varAluno': IdUsuario,
                    'varAplicacao': idAplicacao,
                    'funcaoErro': callBackErro,
                    'funcaoSucesso': callBackErro,
                    'funcaoCarregando': funcaoCarregando,
                    'varQtdPorPagina': 1,
                    'abriuBoxCorrecao': abriuBoxCorrecao,
                    'abriuBoxQuestao': abriuBoxQuestao
                });
            });


            $("#btnStatus").click(function () {

                var idAplicacao = $("#pidApli").val();
                var IdUsuario = $("#pidUser").val();

                $("#CorrecaoPlugin").avaliacoescorrecao({
                    'varAluno': IdUsuario,
                    'varAplicacao': idAplicacao,
                    'inicializacao': 'statusRealizacao',
                    'retornoStatus': funcaoRetornoStatus
                });

            });


        });

    </script>
    <style>
        #CorrecaoPlugin {
            width:900px;
        }
    </style>
</head>
<body>
<label>IdAplicacao</label><input id="pidApli"/>
<label>IdUsuario</label><input id="pidUser"/>
<button id="btnCorrigir">Corrigir</button>
<button id="btnStatus">Status</button>


<div id="status"></div>
<div id="CorrecaoPlugin">


</div>

</body>
</html>
