<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <base id="baseAvaliacao" href="<%= UtilView.UrlCompleta(Request) %>" />
    <title>Teste dos Serviços</title>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('form').submit(function (e) {
                e.preventDefault();
                var form = $(this);
                form.find('.retorno').html('');
                var id = "";
                if (form.find("input[name='id']").length > 0) {
                    id = "/" + form.find("input[name='id']").val()
                }
                var data = "";
                if (form.find("[name='json']").length > 0) {
                    data = form.find("[name='json']").val();
                }

                $.ajax({
                    url: form.attr("action") + id,
                    data: data,
                    type: form.attr("method"),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (dados, status, xhttp) {
                        form.find('.retorno').html(JSON.stringify(dados))
                    }
                });

            });

        });
    </script>
    
</head>
<body>
    <h1>Teste dos Serviços</h1>
    <section>
    <header><h2>Agendamento</h2></header>
    
    <% using (Html.BeginForm("Carregar", "Agendamento", new { area = "Servico" },  FormMethod.Get))
       { %>
        <h3>Carregar</h3>
        <label>Id Agendamento:<input name="id" value="2461" type="text" /></label>
        <button type="submit">Carregar</button>
        <div class="retorno"></div>
    <% } %>
    <% using (Html.BeginForm("Salvar", "Agendamento", new { area = "Servico" }, FormMethod.Post))
       { %>
        <h3>Salvar</h3>
        <label>Json:</label><br />
        <textarea name="json">{"Agendamento":{"Id":0,"IdBanco":2,"Tipo":1,"CodigoOrigem":"SEC02511"}}</textarea><br />
        <button type="submit">Salvar</button>
        <div class="retorno"></div>
    <% } %>
    </section>
    <section>
    <header><h2>Avaliação</h2></header>
    
    <% using (Html.BeginForm("Carregar", "Avaliacao", new { area = "Servico" },  FormMethod.Get))
       { %>
        <h3>Carregar</h3>
        <label>Id Avaliacao:<input name="id" value="31" type="text" /></label>
        <button type="submit">Carregar</button>
        <div class="retorno"></div>
    <% } %>
    <% using (Html.BeginForm("Salvar", "Avaliacao", new { area = "Servico" }, FormMethod.Post))
       { %>
        <h3>Salvar</h3>
        <label>Json:</label><br />
        <textarea name="json">{"Avaliacao":{"Id":0,"IdBanco":2,"Tipo":1,"CodigoOrigem":"SEC02511"}}</textarea><br />
        <button type="submit">Salvar</button>
        <div class="retorno"></div>
    <% } %>
    </section>

    <section>
    <header><h2>Questão</h2></header>
    
    <% using (Html.BeginForm("Carregar", "Questao", new { area = "Servico" },  FormMethod.Get))
       { %>
        <h3>Carregar</h3>
        <label>Id Questao:<input name="id" value="31" type="text" /></label>
        <button type="submit">Carregar</button>
        <div class="retorno"></div>
    <% } %>
    <% using (Html.BeginForm("Salvar", "Questao", new { area = "Servico" }, FormMethod.Post))
       { %>
        <h3>Salvar</h3>
        <label>Json:</label><br />
        <textarea name="json">{"Questao":{"Id":0,"IdBanco":2,"Tipo":1,"CodigoOrigem":"SEC02511"}}</textarea><br />
        <button type="submit">Salvar</button>
        <div class="retorno"></div>
    <% } %>
    </section>


    <section>
    <header><h2>AResponder</h2></header>
    <% using (Html.BeginForm("Associar", "AResponder", new { area = "Servico" }, FormMethod.Post))
       { %>
        <h3>Salvar</h3>
        <p>
             da02_em1a_012  
             JWVCTY ja esta no grupo  
             U88G6G não está no grupo 
        </p>
        <p> { "Associar" : { "Chave" : "U88G6G" }, "Confirm" :[ "confirmar" ] } </p>
        <label>Json:</label><br />
        <textarea name="json">{ "Associar" : { "Chave" : "U88G6G" } }</textarea><br />
        <button type="submit">Salvar</button>
        <div class="retorno"></div>
    <% } %>
    </section>





</body>
</html>
