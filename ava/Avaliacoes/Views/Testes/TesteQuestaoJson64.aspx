<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <base id="baseAvaliacao" href="<%= UtilView.UrlCompleta(Request) %>" />
    <title>Questao Json</title>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var caminhoBase = $("#baseAvaliacao").attr("href");

            $('form').submit(function (ev) {
                var parametros = {};
                var tipo = $(this).find("input[name='tipo']").val();
                if (tipo == 1) {
                    parametros.id_questao = $(this).find("input[name='IdQuestao']").val();
                } else if (tipo == 3) {
                    parametros.identificador = $(this).find("input[name='Identificador']").val();
                    parametros.banco_questao = $(this).find("input[name='Banco']").val();
                } else if (tipo == 2) {
                    parametros.banco_questao = $(this).find("input[name='Banco']").val().split(",");
                    parametros.tipo_classificacao = $(this).find("input[name='TipoClassificacao']").val();
                    parametros.id_classificacao = $(this).find("input[name='Classificacao']").val();
                    parametros.nivel = $(this).find("input[name='Nivel']").val().split(",");
                    parametros.excluir_questoes = $(this).find("input[name='Exluir']").val().split(",");
                    if ($.trim($(this).find("input[name='Tipo']").val()) != "") {
                        parametros.tipo = $(this).find("input[name='Tipo']").val().split(",");
                    }
                }
                var url = $(this).attr("action");
                var dados = { parametros: parametros, tipo: tipo }
                var bolTeste = false;
                if ($(this).find("input[name='tipoTeste'][value=1]:checked").length >= 1) {
                    bolTeste = true;
                    url = caminhoBase + "/QuestoesJson/QuestaoDecriptBase64";
                }

                $.ajax({
                    url: url,
                    data: "data=" + JSON.stringify(dados),
                    type: "POST",
                    success: function (dados, status, xhttp) {
                        $('#retorno').html(JSON.stringify(dados));
                        $("#retornoTeste").html("");
                        if (bolTeste) {
                            if (dados.erro) {
                                return;
                            }
                            var retornoJson = $.parseJSON(dados.questao);
                            var id = $("<div><b>id:</b> " + retornoJson.id + "</div>")
                            var tp = $("<div><b>tipo:</b> " + retornoJson.tipo + "</div>")
                            var enunciado = $("<div><b>enunciado:</b><br>" + retornoJson.enunciado + "</div>")
                            var nivel = $("<div><b>nivel:</b>" + retornoJson.nivel + "</div>")
                            var identificador = $("<div><b>identificador:</b>" + retornoJson.identificador + "</div>")
                            var comentario = $("<div><b>comentario:</b><br>" + retornoJson.comentario + "</div>")
                            var dica = $("<div><b>dica:</b><br>" + retornoJson.dica + "</div>")
                            $("#retornoTeste").append(id);
                            $("#retornoTeste").append(tp);
                            $("#retornoTeste").append(enunciado);
                            $("#retornoTeste").append(nivel);
                            $("#retornoTeste").append(identificador);
                            $("#retornoTeste").append(comentario);
                            $("#retornoTeste").append(dica);

                            var alternativas = $("<ul></ul>");
                            for (var i = 0; i < retornoJson.alternativas.length; i++) {
                                var alternativa = $("<li></li>");
                                alternativa.append("<b>(" + retornoJson.alternativas[i].id + ")</b> ");
                                alternativa.append("<b>(" + retornoJson.alternativas[i].letra + ")</b> ");
                                alternativa.append(retornoJson.alternativas[i].texto);
                                alternativa.append("<br><b>comentario:</b><br>" + retornoJson.alternativas[i].comentario);
                                alternativa.append("<br><b>dica:</b><br>" + retornoJson.alternativas[i].dica);
                                alternativas.append(alternativa);
                            }
                            $("#retornoTeste").append(alternativas);
                            var corretas = $("<div><b>corretas:</b> " + retornoJson.corretas.join(",") + "</div>");
                            $("#retornoTeste").append(corretas);
                        }
                    }
                });
                ev.preventDefault();
            });
        });
    </script>
    <style>
    body
    {
        font-family: Arial;
    }
    form
    {
        border:1px solid black;
        display:inline-block;
        padding: 5px;
    }
    #retorno
    {
        border:1px solid black;
        padding: 5px;
    }
    </style>
</head>
<body>
    <h1>
    Teste questão json
    </h1>
    <div>
    <%  
        using (Html.BeginForm("QuestaoCripto", "QuestoesJson", FormMethod.Post, new { @id = "frmQuestao1" }))
        {%>
        <input type="hidden" name="tipo" value="1" />
        <h2>Por id</h2>
        <div><label>Id:<input type="text" name="IdQuestao" value="" /></label></div>
        <div>Tipo de teste:<label><input type="radio" name="tipoTeste" value="0" checked="checked" />Real</label><label><input type="radio" name="tipoTeste" value="1" />Teste</label></div>
        <div><button type="submit">Enviar</button></div> 
<%
        }
%>

<%  
    using (Html.BeginForm("QuestaoCripto", "QuestoesJson", FormMethod.Post, new { @id = "frmQuestao2" }))
        {%>
        <input type="hidden" name="tipo" value="3" />
        <h2>Por Identificador e banco</h2>
        <div><label>Identificador:<input type="text" name="Identificador" value="" /></label></div>
        <div><label>Banco:<input type="text" name="Banco" value="" /></label></div>
        <div>Tipo de teste:<label><input type="radio" name="tipoTeste" value="0" checked="checked" />Real</label><label><input type="radio" name="tipoTeste" value="1" />Teste</label></div>
        <div><button type="submit">Enviar</button></div> 
<%
        }
%>
<%  
    using (Html.BeginForm("QuestaoCripto", "QuestoesJson", FormMethod.Post, new { @id = "frmQuestao3" }))
        {%>
        <input type="hidden" name="tipo" value="2" />
        <h2>Por Critérios de classificação</h2>
        <div><label>Banco:<input type="text" name="Banco" value="" /></label><small>(ids dos bancos separados por vigula)</small></div>
        <div><label>Tipo:<input type="text" name="Tipo" value="" /></label><small>(lista seprada por virgula dos tipos de questão)</small></div>
        <div><label>Tipo Classificacao:<input type="text" name="TipoClassificacao" value="" /></label><small>(id do tipo de classificação)</small></div>
        <div><label>Classificacao:<input type="text" name="Classificacao" value="" /></label><small>(id da classificação)</small></div>
        <div><label>Nivel:<input type="text" name="Nivel" value="" /></label><small>(valores de 1 a 10 referente ao grau de dificuldade separados por virgula)</small></div>
        <div><label>Exluir:<input type="text" name="Exluir" value="" /></label><small>(lista seprada por virgula de ids que deverão ser excluidos)</small></div>
        <div>Tipo de teste:<label><input type="radio" name="tipoTeste" value="0" checked="checked" />Real</label><label><input type="radio" name="tipoTeste" value="1" />Teste</label></div>
        <div><button type="submit">Enviar</button></div> 
  
<%
        }
%>
</div>
<h3>Retorno Json</h3>
<div id="retorno">
</div>
<div id="retornoTeste">
    
    
</div>
</body>
</html>
