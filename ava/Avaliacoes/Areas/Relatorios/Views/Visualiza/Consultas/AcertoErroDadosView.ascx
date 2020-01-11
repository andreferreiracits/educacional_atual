﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.AcertoErroDadosView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta" %>
<div class="grafico" data-tipo="grafico" data-grafico-tipo="Pie3D" data-grafico-width="650" data-grafico-height="300" data-grafico-nodata="<%: ViewData["GraficoNoData"] %>">
<%
Model.AddDado(String.Format("Acertos - {0} Questões", Model.Acertos), "#16CF16", Model.Acertos);

Model.AddDado(String.Format("Erros - {0} Questões", Model.Erros), "#FF6669", Model.Erros);

Model.AddDado(String.Format("Parcial - {0} Questões", Model.Parcial), "#e6ca0d", Model.Parcial);

Model.AddDado(String.Format("Não Respondidas - {0} Questões", Model.NaoRespondida), "#929292", Model.NaoRespondida);

Model.AddDado(String.Format("Não Corrigidas - {0} Questões", Model.NaoCorrigidas), "#CF6100", Model.NaoCorrigidas);
%>
<textarea name="chart">{"showpercentageinlabel": "1",
                        "showvalues": "1",
                        "showlabels": "0",
                        "showlegend": "1",
                        "showpercentvalues": "1",
                        "palette":"2",
                        "animation":"1",
                        "pieSliceDepth":"30",
                        "smartLineColor":"979797", "smartLineThickness":"3","smartLineAlpha":"75","isSmartLineSlanted":"0",
                        "manageLabelOverflow":"1",
                        "pieRadius": "170"
                        }
</textarea>
<textarea name="data"><%=Model.JsonFusionChart %></textarea>
</div>

<%-- <div class="legenda">
<%--    <h4>Total de Questões: <%= Model.Questoes % ></h4>-- % >
    <ul>
        <li class="grafLegenda acerto"><span class="fnd"></span>Acertos - <%=Model.Acertos %> Questões</li>
        <li class="grafLegenda parcial"><span class="fnd"></span>Parciais - <%=Model.Parcial %> Questões</li>
        <li class="grafLegenda erro"><span class="fnd"></span>Erros - <%=Model.Erros %> Questões</li>
        <li class="grafLegenda nrespondido"><span class="fnd"></span>Não Respondidas - <%=Model.NaoRespondida %> Questões</li>
    </ul>
</div>
 --%>