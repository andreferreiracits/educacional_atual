<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>ImprimirProva</title>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#frmPrint').submit(function (ev) {
                $.ajax({
                    url: $(this).attr("action"),
                    data: $(this).serialize(),
                    type: "POST",
                    success: function (dados, status, xhttp) {

                        $('#retorno').html(JSON.stringify(dados)); 
                    }
                });
                ev.preventDefault();
            });
        });
    </script>
</head>
<body>
    <h1>
    Teste imprimir prova json
    </h1>
    <%  
        using (Html.BeginForm("ImprimirJson", "Criacao", FormMethod.Post, new { @id = "frmPrint" }))
        {%>
        <div><label>Prova:<input type="text" name="prova" value="" /></label></div>
        <div><button type="submit">Enviar</button></div>         
<%
        }
%>

<div id="retorno">
</div>
</body>
</html>
