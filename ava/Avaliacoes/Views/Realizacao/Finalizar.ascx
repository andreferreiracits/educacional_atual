<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RealizacaoView>" %>
<div id="finalizar">
<div id="AR_conteudo">
            <div class="barraPrincipal">
                <div class="fundo">
                    <div class="areaTexto">
                        <div class="logoAvaliacoes"></div><div class="campoTexto semBorda">Recibo de Participação</div>
                    </div>
                </div>
            </div>
            
            <div id="areaConteudo" class="areaConteudo">
            
            <div class="resumoTitulo"><p>Resumo da atividade</p></div>
                <div class="boxConteudoResumo">
                                    <div class="areaConteudoResumo">
                                        <div class="msgOk">Atividade concluída.</div>
                                        <% Html.RenderPartial(Model.ListaQuestoesResumo, Model.ListaQuestoes); %>
                                        <div class="clear"></div>
                                            <table width="550px" border="0" cellspacing="0" cellpadding="0" class="tableProtoloco">
                                                <tr style="height:25px" class="bgA" valign="middle">
                                                    <td class="info">Nome do aluno:</td>
                                                    <td class="strong"><%= Model.NomeAluno %></td>
                                                </tr>
                                                <tr style="height:25px" class="bgB" valign="middle">
                                                    <td class="info">Avaliação:</td>
                                                    <td class="strong"><%= Html.Encode(Model.Nome) %></td>
                                                </tr>
                                                <tr style="height:25px" class="bgA" valign="middle">
                                                    <td class="info">Encerrada em:</td>
                                                    <td class="strong"><%= Model.DataTermino %> às <%= Model.HorarioTermino %></td>
                                                </tr>
                                                <% Html.RenderPartial(Model.BoxNota, Model); %>
                                            </table>
                                        <div class="clear"></div>
                                        <div class="boxProtocolo">
                                            <div class="btns">
                                                <% Html.RenderPartial(Model.BoxBtnsFinalizar, Model); %>
                                            </div>
                                        </div>
                                        </div>
                 </div>
                </div>

                <% Html.RenderPartial(Model.BoxTelaRefazer); %>

            </div>
     </div>
