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
                                                    <td class="info">Data:</td>
                                                    <td class="strong"><%= Model.DataTermino %></td>
                                                </tr>
                                                <tr style="height:25px" class="bgB" valign="middle">
                                                    <td class="info">Horário de término:</td>
                                                    <td class="strong"><%= Model.HorarioTermino %></td>
                                                </tr>
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

                <% Html.RenderPartial("BoxRefazer"); %>

            </div>
     </div>
