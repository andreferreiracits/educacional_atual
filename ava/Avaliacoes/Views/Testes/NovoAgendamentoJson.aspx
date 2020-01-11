<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>NovoAgendamentoJson</title>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript">
        $(document).ready(function () {

            $('#frmJsonExcluir').submit(function (ev) {
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


            $('#frmJson').submit(function (ev) {
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
    Teste criando um agendamento
    </h1>
    <%  
        using (Html.BeginForm("SalvarAgendamento", "Agendamento", FormMethod.Post, new { @id = "frmJson" }))
        {%>
        <h2> Valores agendamento </h2>

        <h3> Novo Agendamento</h3>
        <div><label>idProva:<input type="text" name="prova" value="" /></label></div>
        <div><label>Codigo origem:<input type="text" name="codigorigem" value="" /></label></div>
        <h3> Editar Agendamento</h3>
        <div><label>idAgendamento:<input type="text" name="agendamento" value="" /></label></div>

        <div><label>Ids usuarios separados por virgula:<input type="text" name="usuarios" value="" /></label></div>
        <div><label>Ids turmas separados por virgula:<input type="text" name="turmas" value="" /></label></div>
        <div><label>Ids Grupos separados por virgula:<input type="text" name="grupos" value="" /></label></div>
        <div><label>Correcao ( Sem=0, NaQuestao, AposEncerrar, AposAgendamento, AposData ) <input type="text" name="correcao" value="" /></label></div>
        <div>
            <label>Peridodo (deve ser 1 pra salvar as datas):<input type="text" name="periodo" value="1" /></label>
            <label>Data Inicio:<input type="text" name="datainicio" value="" /></label>
            <label>Data Inicio:<input type="text" name="horainicio" value="" /></label>
            <label>Fim:<input type="text" name="datafim" value="" /></label>
            <label>Fim:<input type="text" name="horafim" value="" /></label>
            
        </div>
        
        <div><button type="submit">Enviar</button></div>         
<%
        }
%>

        <%  
        using (Html.BeginForm("ExcluirAgendamento", "Agendamento", FormMethod.Post, new { @id = "frmJsonExcluir" }))
        {%>
        <h2> Exluir Agendamento</h2>
        <div><label>idAgendamento:<input type="text" name="agendamento" value="" /></label></div>
        <div><button type="submit">Enviar</button></div>   
        <%} %>



<div id="retorno">
</div>
</body>
</html>
