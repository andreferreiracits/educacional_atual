<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<AdminAVA.Models.EscolaAVABarraAvisos>" %>

<script>
    /*jQuery(function ($) {

        $.ajax({
            type: "POST",
            url: "/AVA/adminava/avisos/ListaSegmentacaoSerie",
            cache: false,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {

                $("#segSerie").html(data);

            },
            error: function (data) {
                //alert(data.status);
                console.debug(data.status);
            }
        });

    });*/
</script>

<%
    /*
    foreach (var item in Model.listaAvisoPapel)
    {
        Response.Write(item.idPapel + "<br>");
    }

    foreach (var item2 in Model.listaAvisoSegSerie)
    {
        Response.Write(item2.idSegmentacao + "-" + item2.idSerie + "<br>");
    }
     */
        
%>

    <section id="ava_container">

        <h2>Editar aviso</h2>

        <p>
            <span>Título:</span>
            <input type="text" name="strMensagem" id="strMensagem" maxlength="50" size="55" value="<%=Model.strMensagem %>" class="sombra_form" />
        </p>
        <span>Período:</span>
        <input type="text" size="8" id="dtmInicio" name="dtmInicio" value="<%=Model.dtmInicio %>" class="sombra_form" />
        <input type="text" size="6" id="horaInicio" name="horaInicio" value="<%=Model.horaInicio %>" class="sombra_form" />
        até
        <input type="text" size="8" id="dtmFim" name="dtmFim" value="<%=Model.dtmFim %>" class="sombra_form" />
        <input type="text" size="6" id="horaFim" name="horaFim"value="<%=Model.horaFim %>" class="sombra_form" />
        <p><span>Para:</span></p>

        <div id="segSerie">
        <%
            Html.RenderAction("ListaSegmentacaoSerie", new { idBarraAviso = (int)Model.id });
        %>
        </div>

        <input type="submit" value="Publicar" class="medium awesome awesome-green" onclick="editaAviso()" />
        <input type="button" class="medium awesome awesome-green" onclick="parent.$.fancybox.close();" value="cancelar" />

        <input type="hidden" id="idBAviso" name="idBAviso" value="<%=Model.id %>" />
        <input type="hidden" id="bolExcluido" name="bolExcluido" value="0" />

        <div id="alerta_mostra_aviso">
        
        </div>

    </section>