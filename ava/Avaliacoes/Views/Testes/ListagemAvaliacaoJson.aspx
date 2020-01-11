<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>TesteProvaJson</title>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var form = $("<form>").attr("action", "/Agendamento/ListagemAgendamentoUsuario");
            $("<input>").attr("name", "dtmInicio").val("01/01/2011").appendTo(form);
            $("<input>").attr("name", "dtmFim").val("01/01/2014").appendTo(form);

            $.ajax({
                url: form.attr("action"),
                data: form.serialize(),
                type: "POST",
                success: function (dados, status, xhttp) {

                    $.each(dados.Linhas, function (i, v) {
                        //console.log(v.Id, v.Titulo, v.Inicio, v.Fim, v.StatusUsuario);
                        var li = $("<li>");
                        $("<a>").attr("href", "/Ava/avaliacoes/Realizacao/Index/" + v.Id).text(v.Titulo).appendTo(li);
                        $("<div>").text(v.Inicio + " - " + v.Fim).appendTo(li);
                        li.appendTo("#retorno ul");
                    });

                    //$('#retorno').html(JSON.stringify(dados));
                }
            });
            ev.preventDefault();
        });
    </script>
</head>
<body>
   
<div id="retorno">
<ul>
    <li>
        <a href="/Ava/avaliacoes/Realizacao/Index/">titulo</a>
        <div> data </div>
    </li>
</ul>
</div>
</body>
</html>
