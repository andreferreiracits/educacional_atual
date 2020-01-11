<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Pagina.Models.CursoSerie>>" %>
<%
    int idMensagemRapida = (int)ViewData["idMensagemRapida"];
    string selecao = ViewData["selecao"].ToString();
    int idPagina = (int)ViewData["idPagina"];

    //Transformando em um dicionario de curso por serie
    var dcCursos = new Dictionary<int, string>();
    var dcSeries = new Dictionary<int, string>();
    var dcCursosSeries = new Dictionary<int, List<int>>();

    var dcAuxiliar = new Dictionary<string, string>() { { "tp_prof", "Professores" }, { "tp_alun", "Alunos" }, { "tp_resp", "Pais e Responsáveis" } };

    foreach (var cs in Model)
    {
        if (!dcCursos.ContainsKey(cs.idCurso))
        {
            dcCursos.Add(cs.idCurso, cs.strCurso);
            dcCursosSeries.Add(cs.idCurso, new List<int>());
        }

        if (!dcSeries.ContainsKey(cs.idSerie))
        {
            dcSeries.Add(cs.idSerie, cs.strSerie);
            dcCursosSeries[cs.idCurso].Add(cs.idSerie);
        }
    }

    if (idPagina > 2 && !String.IsNullOrEmpty(selecao))
    {
        if (selecao != "Todos")
        {
            /*
             * Reconstruindo string de seleção, pagina de escola não grava id da segmentacao
             * Bug na edição do seletor dentro da edição do post
             */

            string selecaoReconstruida = "";
            var auxSelecao = RedeSocialAVA.FuncoesTexto.Split(selecao, ",").ToList();
            auxSelecao = auxSelecao.Select(x => String.Join("_", RedeSocialAVA.FuncoesTexto.Split(x, "_"))).ToList();
            var auxDCSelecao = new Dictionary<string, Dictionary<int, List<int>>>();
            int auxSelecaoIDCurso = 0, auxSelecaoIDSeries = 0;

            List<string> auxListaTipos = new List<string>() { "prof", "alun", "resp", "adm" };
            List<string> auxListaTiposSelecionados = new List<string>();

            //Montando dicionarios 
            foreach (var ax in auxSelecao)
            {
                if (ax == "prof" || ax == "alun" || ax == "resp" || ax == "adm")
                {
                    auxListaTiposSelecionados.Add(ax);
                }
                else
                {
                    var partes = RedeSocialAVA.FuncoesTexto.Split(ax, "_");
                    if (!auxDCSelecao.ContainsKey(partes[0]))
                        auxDCSelecao.Add(partes[0], new Dictionary<int, List<int>>());

                    if (int.TryParse(partes[1], out auxSelecaoIDCurso))
                    {
                        if (!auxDCSelecao[partes[0]].ContainsKey(auxSelecaoIDCurso))
                            auxDCSelecao[partes[0]].Add(auxSelecaoIDCurso, new List<int>());

                        if (partes.Count() == 3)
                        {
                            if (int.TryParse(partes[2], out auxSelecaoIDSeries))
                            {
                                auxDCSelecao[partes[0]][auxSelecaoIDCurso].Add(auxSelecaoIDSeries);
                            }
                        }
                        else if (partes.Count() == 2)
                        {
                            if (dcCursosSeries.ContainsKey(auxSelecaoIDCurso))
                                auxDCSelecao[partes[0]][auxSelecaoIDCurso] = dcCursosSeries[auxSelecaoIDCurso];
                        }
                    }
                }
            }

            //Montando string nova

            foreach (var a in auxListaTipos)
            {
                if (auxListaTiposSelecionados.Contains(a))
                {
                    selecaoReconstruida += "," + a;
                }
                else
                {
                    if (auxDCSelecao.ContainsKey(a))
                    {
                        foreach (var ax in auxDCSelecao[a])
                        {
                            if (ax.Value.Count == dcCursosSeries[ax.Key].Count)
                                selecaoReconstruida += "," + a + "_" + ax.Key;
                            else
                            {
                                foreach (var axv in ax.Value)
                                {
                                    selecaoReconstruida += "," + a + "_" + ax.Key + "_" + axv;
                                }
                            }
                        }
                    }
                }
            }

            if (!String.IsNullOrEmpty(selecaoReconstruida))
                selecaoReconstruida = selecaoReconstruida.Substring(1);

            selecao = selecaoReconstruida;
        }
    }

    List<string> lsSelecao = new List<string>();
    if (!String.IsNullOrEmpty(selecao))
    {
        lsSelecao = selecao.Split(',').ToList();
        if (lsSelecao.Count > 0)
        {
            //Removendo os _ no final
            lsSelecao = lsSelecao.Select(x => String.Join("_", RedeSocialAVA.FuncoesTexto.Split(x, "_"))).ToList();
        }
    }

    var nomeCheckbox = "";
    var checkPais = false;       
%>
<input type="hidden" id="SeletorIdMensagemRapida" value="<%=idMensagemRapida%>" />
<div id="abre_seletor" class="seletor_pessoas_pagina">
    <div class="ava_lightheader">
        <h1 class="">
            Compartilhar com:</h1>
        <div class="right">
            <a acao="marcar" href="javascript:void(0);">Marcar todos</a> | <a acao="desmarcar"
                href="javascript:void(0);">Desmarcar todos</a>
        </div>
    </div>
    <div class="engloba_compartilhar">
        <form class="checkbox_personalizado_css leftalign">
        <% foreach (var tipo in dcAuxiliar)
           {
               checkPais = false;
               nomeCheckbox = "Checkbox" + tipo.Key + "_";
               checkPais = (lsSelecao.Contains(tipo.Key.Substring(3)));
        %>
        <div class="compartilhar_pagina <%=tipo.Key%>">
            <input type="checkbox" id="<%=nomeCheckbox%>" name="<%=nomeCheckbox%>" <%=checkPais ? "checked=\"checked\"" : ""%> nivelcheck="1" />
            <label for="<%=nomeCheckbox%>">
                <strong>
                    <%=tipo.Value%></strong></label>
            <% foreach (var curso in dcCursosSeries)
               {
                   nomeCheckbox = "Checkbox" + tipo.Key + "_" + curso.Key + "_";
                   var checkFilhos = checkPais;
                   if (!checkPais)
                       checkFilhos = lsSelecao.Contains(tipo.Key.Substring(3) + "_" + curso.Key);
            %>
            <div class="<%=tipo.Key%>">
                <input type="checkbox" id="<%=nomeCheckbox%>" name="<%=nomeCheckbox%>" <%=checkFilhos ? "checked=\"checked\"" : ""%> nivelcheck="2" />
                <label for="<%=nomeCheckbox%>">
                    <%=dcCursos[curso.Key]%></label>
                <div class="cur_<%=curso.Key%>">
                    <% foreach (var serie in curso.Value)
                       {
                           var checkZero = lsSelecao.Contains(tipo.Key.Substring(3) + "_" + curso.Key + "_" + serie);
                           nomeCheckbox = "Checkbox" + tipo.Key + "_" + curso.Key + "_" + serie + "_";  
                    %>
                    <input type="checkbox" id="<%=nomeCheckbox%>" name="<%=nomeCheckbox%>" <%=(checkFilhos || checkZero) ? "checked=\"checked\"" : ""%> nivelcheck="3" />
                    <label for="<%=nomeCheckbox%>">
                        <%=dcSeries[serie]%></label>
                    <br />
                    <% } %>
                </div>
            </div>
            <% } %>
        </div>
        <% } %>
        <div class="compartilhar_pagina">
            <input type="checkbox" id="Checkboxtp_adm" name="Checkboxtp_adm" <%=(lsSelecao.Contains("adm")) ? "checked=\"checked\"" : ""%> />
            <label for="Checkboxtp_adm">
                <strong>Administradores, Coordenadores e Diretores</strong></label>
        </div>
        </form>
    </div>
    <div class="clearfix">
    </div>
    <div class="footer_seletor">
        <ul>
            <span class="fontello info_seletor"></span>
            <li>Este post aparecerá exclusivamente para a seleção acima.</li>
            <% if(idPagina > 2) { %>
            <li>Esses são os tipos de usuários, séries e anos cadastrados para a rede social da sua escola. Caso queira alterá-los, entre em contato com o Educacional.</li>
            <% } %>
        </ul>       
        <div class="botoes right">
            <a class="btn_cinza" href="javascript:;">Cancelar</a> <a class="btn_cor" href="javascript:;">
                Adicionar</a>
        </div>
    </div>
</div>
