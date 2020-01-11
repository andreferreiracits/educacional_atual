<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <base id="baseAvaliacao" href="<%= UtilView.UrlCompleta(Request) %>" />
    <title>Requisição JsonP</title>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('form').submit(function (evt) {
                evt.preventDefault();
                var data = $(this).serialize();
                var url = $(this).attr('action');
                jQuery.ajax({
                    // Verificar para colocar só de uma data especifica pra frente (1 semana)
                    url: url,
                    data: data,
                    dataType: 'jsonp',
                    crossDomain: true,
                    jsonp: true,
                    jsonpCallback: 'Jsonp_Listar',
                    method: 'GET',
                    success: function (d) {
                        alert(JSON.stringify(d));
                    }
                });

            });
        });
        Jsonp_Listar = function (dados) {
            console.log(dados);
            $('#retorno').html(JSON.stringify(dados));

        }
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
    Teste requisição jsonp
    </h1>
    <div>
    <%  
        using (Html.BeginForm("JsonP", "AResponder", new { area = "Servico" }, FormMethod.Get))
        {%>
        
        <h2>Data</h2>
        <input type="hidden" name="action" value="Listar" />
        <textarea id="data" name="data">
        {Filtros:{Tipo:1,Inicio:'01/01/2013',Fim:'31/12/2013'},Paginacao:{Atual:1,Limite:1,Itens:10}}
        </textarea>
        <div><button type="submit">Enviar</button></div> 
<%
        }
%>

</div>
<h3>Retorno Json</h3>
<div id="retorno">
</div>

</body>
</html>
