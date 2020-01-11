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
            $.ajax({
                url: '/Servico/Agendamento/Salvar',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",

                
                //data: { 'IdTipo': 1, 'Parametros': {'Id':0, 'IdTipo':1, 'IdBancoQuestao':2, 'Nome':'Nome da prova' } }
                //data: '{ "Id" : 0, "Tipo":1, "Nome": "Nome do agendamento", "Periodo":{ Inicio : "03/04/2013 11:00", Fim : "03/04/2014 12:00"}}'
                data: '{ Agendamento : { "Id" : 10, "Tipo":1, "IdBanco": 2, "Periodo" : {"Tipo": 1, "Inicio":1, "Fim":3}}}'
                //data: '{ "IdTipo" : 1, "Parametros" : "Conteudo qualquer"}'
            });
        });
    </script>
    
</head>
<body>
    Teste Requisição json
</body>
</html>
