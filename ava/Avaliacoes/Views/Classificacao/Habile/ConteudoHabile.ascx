<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div style='margin-left: 80px; margin-top: 40px;'>
    <div style='height: 30px;'>
        <div style='float: left; width: 20%;'>Matriz:</div>
        <div style='float: left; width: 80%;'>
            <input type='hidden' id='idClassificacao' value='0' />
            <select id="matrizes" class="habilematrizcombo" style='width: 580px; border: 1px solid black;' onchange="classHabile.selecionarMatriz();">
                <option value="0">-selecione-</option>
                <%--<%
                    if (Model != null)
                    {
                        foreach (var matriz in Model)
                        {
                            %>
                                <option value="<%: matriz.Id %>"><%: matriz.Nome%></option>
                            <%
                        }
                    }
                %>--%>
            </select>
        </div>
    </div>
    <div style='height: 30px;'>
        <div style='float: left; width: 20%;'>Competencia:</div>
        <div style='float: left; width: 80%;'>
            <select id="competencias" class="habilecompetenciacombo" style='width: 580px; border: 1px solid black;' disabled="disabled" onchange="classHabile.selecionarCompetencia();">
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 30px;'>
        <div style='float: left; width: 20%;'>Eixo:</div>
        <%--<div id="eixos" style='float: left; width: 80%;'></div>--%>
        <div style='float: left; width: 80%;'>
            <select id="eixos" class="habileeixocombo" style='width: 580px; border: 1px solid black;' disabled="disabled" onchange="classHabile.selecionarEixo();">
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 30px;'>
        <div style='float: left; width: 20%;'>Processo Cognitivo:</div>
        <div id="proce" class="habileproce" style='float: left; width: 80%;'></div>
    </div>
    <div style='height: 30px;'>
        <div style='float: left; width: 20%;'>Habilidade:</div>
        <div style='float: left; width: 80%;'>
            <select id="habilidades" class="habilehabilidadecombo" style='width: 580px; border: 1px solid black;' disabled="disabled" onchange="classHabile.selecionarHabilidade();">
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 30px;'>
        <div style='float: left; width: 20%;'>Situação de Uso:</div>
        <div id="situacoesuso" style='float: left; width: 80%;'></div>
    </div>

    <%-----%>
    <div style='height: 30px;'>
        <div style='float: left; width: 20%;'>Série:</div>
        <div style='float: left; width: 80%;'>
            <select id="series" class="habileseriescombo" style='width: 580px; border: 1px solid black;' disabled="disabled" onchange="classHabile.selecionarSerie();">
                <option value="0">-selecione-</option>
            </select>
        </div>
    </div>
    <div style='height: 83px;'>
        <div style='float: left; width: 20%;'>Especificação:</div>
        <div style='float: left; width: 80%;'>
            <textarea id="especificacoes" class="habileespecificacoestext" style='width: 580px; border: 1px solid black;' rows="3"></textarea>
        </div>
    </div>
    <div style='height: 83px;'>
        <%--<div style='float: left; width: 20%;'>Análise:</div>--%>
        <div style='float: left; width: 20%;'>Comentário:</div>
        <div style='float: left; width: 80%;'>
            <textarea id="comentarios" class="habilecomentariostext" style='width: 580px; border: 1px solid black;' rows="3"> </textarea> 
        </div>
    </div>
    <div style='height: 83px;'>
        <div style='float: left; width: 20%;'>Conteúdo:</div>
        <div style='float: left; width: 80%;'>
            <textarea id="conteudos" class="habileconteudostext" style='width: 580px; border: 1px solid black;' rows="3"> </textarea> 
        </div>
    </div>
    <%-----%>
</div>
