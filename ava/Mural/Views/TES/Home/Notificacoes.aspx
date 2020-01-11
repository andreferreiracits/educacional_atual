<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SiteMeio.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<IList<Mural.Models.Notificacao>>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">  

    <script>
        $(function () {
            $('.go_to_post').click(function () {
                _id_msg = $(this).attr('ident_msg_rapida');
                _id_msg_cript = $(this).attr('ident_msg_rapida_cript');
                _idTipoNotificacao = $(this).attr('idTipoNotificacao');

                if (_idTipoNotificacao == 19 || _idTipoNotificacao == 20 || _idTipoNotificacao == 21 || _idTipoNotificacao == 25) {
                    window.location.href = '/AVA/Grupo/Home/Post/' + _id_msg_cript;
                } else if (_idTipoNotificacao == 26 || _idTipoNotificacao == 27 || _idTipoNotificacao == 28 || _idTipoNotificacao == 29 ) {
                    window.location.href = '/AVA/Turma/Post/' + _id_msg_cript;
                }else if (parseInt(_idTipoNotificacao) == 23) {
                    return;
                }else {
                    window.location.href = '/AVA/Mural/Home/Post/' + _id_msg_cript;
                }
            });
        });
    </script>
</asp:Content>


<asp:Content ContentPlaceHolderID="ContentPlaceHolderDadosMeio" ID="ContentArea" runat="server">
<% string strlinkPaginaEscola = ViewData["strlinkPaginaEscola"] != null ? ViewData["strlinkPaginaEscola"].ToString() : "" ;  %>
    <section class="as1" id="ava_container">
        
        <header id="HSimples">
            <p class="blokletters">Suas Notificações </p>
        </header>

        <section class="as1 notifica_box" id="ava_box">
            <div class="not_periodo">
                <ul>
                    <%
                    foreach (Mural.Models.Notificacao no in ViewData.Model)
                    {
                        RedeSocialAVA.Models.Notificacao n = no.notificacao;
                        var _tipo_img = "";
                        if (n.idNotificacaoTipo == 2 || n.idNotificacaoTipo == 3 || n.idNotificacaoTipo.Equals(19) || n.idNotificacaoTipo == 26 || n.idNotificacaoTipo == 27)
                        {
                            _tipo_img = "ui-img-curti";
                        }
                        else if (n.idNotificacaoTipo == 1)
                        {
                            _tipo_img = "ui-img-mural";
                        }
                        else if (n.idNotificacaoTipo == 4 || n.idNotificacaoTipo == 6 || n.idNotificacaoTipo.Equals(20) || n.idNotificacaoTipo.Equals(21) || n.idNotificacaoTipo == 28 || n.idNotificacaoTipo == 29)
                        {
                            _tipo_img = "ui-img-quote";
                        }
                        else if (n.idNotificacaoTipo == 5 || n.idNotificacaoTipo == 32)
                        {
                            _tipo_img = "ui-img-caminho";
                        }
                        else if (n.idNotificacaoTipo == 7)
                        {
                            _tipo_img = "ui-img-recomendei";
                        }
                        else if (n.idNotificacaoTipo == 8 || n.idNotificacaoTipo == 25 || n.idNotificacaoTipo == 31 || n.idNotificacaoTipo == 33)
                        {
                            _tipo_img = "ui-img-tarefa";
                        }
                        else if (n.idNotificacaoTipo == 9)
                        {
                            _tipo_img = "ui-img-avaliacao";
                        }
                        else if (n.idNotificacaoTipo.Equals(22) || n.idNotificacaoTipo.Equals(24))
                        {
                            _tipo_img = "ui-img-grupo";
                        }
                        else if (n.idNotificacaoTipo.Equals(23))
                        {
                            _tipo_img = "ui-img-grupoex";
                        }
                        else if (n.idNotificacaoTipo == 30)
                        {
                            _tipo_img = "ui-img-mural";
                        }

                        %>
                	    <li>
                            <p>
                                <i class="ui-img-nots <%:_tipo_img%>"></i>
                                    <%
                                    if (n.totalGrupo > 1)
                                    { 
                                        foreach (var ng in n.grupoNotificacoes.Select((x, i) => new { Value = x, Index = i }))
                                        {
                                        %>
                                            <% if(ng.Value.idPagina > 0) { %>
                                            <a class="invert" href="/AVA/Pagina/<%:ng.Value.strLoginOrigem%>"><%:ng.Value.strNomeOrigem%></a>
                                            <% } else { %>
                                            <a class="invert" href="/AVA/Perfil/Home/Index/<%:ng.Value.strLoginOrigem%>"><%:ng.Value.strNomeOrigem%></a>
                                            <% } %>                                            
                                            
                                            <%
                                            if ((ng.Index == 0 && n.totalGrupo == 2) || (ng.Index == 1 && n.totalGrupo == 3))
                                            {
                                                %>
                                                e 
                                                <%
                                            }
                                            else if (ng.Index <= 1 && n.totalGrupo >= 3)
                                            {
                                                %>
                                                , 
                                                <%
                                            } 
                                        } 
                                        if (n.totalGrupo > 3)
                                        {
                                            if (n.totalGrupo == 4)
                                            {
                                                %>
                                                e mais <a class="invert" href="#">uma pessoa</a> 
                                                <%
                                            }
                                            if (n.totalGrupo > 4)
                                            {
                                                %>
                                                e mais <a class="invert" href="#"><%:(n.totalGrupo - 3)%> pessoas</a>  
                                                <%
                                            }
                                        } 
                                        %>
                                        <a href="#" class="invert go_to_post" ident_msg_rapida_cript="<%:n.idMensagemRapidaCript%>" idTipoNotificacao="<%:n.idNotificacaoTipo%>" ident_msg_rapida="<%:n.idMensagemRapida%>"><%:n.strTextoPadraoPlural%></a>
                                         <%if (n.idNotificacaoTipo == 4 || n.idNotificacaoTipo == 20 || n.idNotificacaoTipo == 21 || n.idNotificacaoTipo == 28 || n.idNotificacaoTipo == 29)
                                            {%> <a class="invert" href="/AVA/Perfil/Home/Index/<%:n.strLoginDonoMensagem%>"><%:n.strNomeDonoMensagem %></a> <% } %>
                                    <%
                                    }//totalGrupo > 1
                                    else
                                    { 
                                        %>

                                        <% if (!n.idNotificacaoTipo.Equals(30))
                                           {
                                               if (n.idPagina > 0)
                                               { %>
                                                    <a class="invert" href="/AVA/Pagina/<%:n.strLoginOrigem%>"><%:n.strNomeOrigem%></a>
                                            <% }
                                               else
                                               { %>
                                                    <a class="invert" href="/AVA/Perfil/Home/Index/<%:n.strLoginOrigem%>"><%:n.strNomeOrigem%></a>
                                            <% }
                                           }%>
                                        
                                        <% 
                                            if (n.idNotificacaoTipo.Equals(22) || n.idNotificacaoTipo.Equals(23) || n.idNotificacaoTipo.Equals(24) || n.idNotificacaoTipo.Equals(25))
                                            {                                            
                                                %>
                                                <a href="<%= n.idNotificacaoTipo.Equals(23) ? "#" : "/AVA/Grupo/Home/PerfilGrupo/" + no.strLinkGrupo %>" class="invert" ident_msg_rapida_cript="<%:n.idMensagemRapidaCript%>" idTipoNotificacao="<%:n.idNotificacaoTipo%>" ident_msg_rapida="<%:n.idMensagemRapida%>"><%:n.strTextoPadrao%> <b><%:no.strNomeGrupo %></b></a>
                                                <%
                                            } else {
                                                if (n.idNotificacaoTipo == 30)
                                                {//Há uma nova publicação na página da escola
                                                %>
                                                    Há uma 
                                                    <a href="#" class="invert go_to_post" ident_msg_rapida_cript="<%:n.idMensagemRapidaCript%>" idTipoNotificacao="<%:n.idNotificacaoTipo%>" ident_msg_rapida="<%:n.idMensagemRapida%>"> nova publicação </a> 
                                                    na 
                                                    <a class="invert" href="/AVA/Pagina/<%= strlinkPaginaEscola%>?id=<%:n.idMensagemRapidaCript%>"> página da escola </a>
                                                <%                                                    
                                                } else 
                                                if (n.idNotificacaoTipo == 31) //grupo de turma
                                                {
			                                        %>
                                                    agendou uma tarefa para você no
			                                        <a href="#" class="invert go_to_post" ident_msg_rapida_cript="<%:n.idMensagemRapidaCript%>" idTipoNotificacao="<%:n.idNotificacaoTipo%>" ident_msg_rapida="<%:n.idMensagemRapida%>"><%:n.strTextoPadrao.Replace("agendou uma tarefa para você no"," ")%> <b><%:no.strNomeGrupo %></b></a>
			                                        <%                                                    
                                           		} else 
                                                if (n.idNotificacaoTipo == 32) //cancelamento caminho
                                                {
			                                        %>
			                                        <a href="#" class="invert go_to_post" ident_msg_rapida_cript="<%:n.idMensagemRapidaCript%>" idTipoNotificacao="<%:n.idNotificacaoTipo%>" ident_msg_rapida="<%:n.idMensagemRapida%>"><%:n.strTextoPadrao%> <b><%:no.strNomeGrupo %></b></a>
			                                        <%                                                    
                                           		} else 
                                                if (n.idNotificacaoTipo == 33) //cancelamento tarefa
                                                {
			                                        %>
			                                        <a href="#" class="invert go_to_post" ident_msg_rapida_cript="<%:n.idMensagemRapidaCript%>" idTipoNotificacao="<%:n.idNotificacaoTipo%>" ident_msg_rapida="<%:n.idMensagemRapida%>"><%:n.strTextoPadrao%> <b><%:no.strNomeGrupo %></b></a>
			                                        <%                                                    
                                           		} else 
                                                {
                                                %>
                                                    <a href="#" class="invert go_to_post" ident_msg_rapida_cript="<%:n.idMensagemRapidaCript%>" idTipoNotificacao="<%:n.idNotificacaoTipo%>" ident_msg_rapida="<%:n.idMensagemRapida%>"><%:n.strTextoPadrao%></a> 
                                                    <%if (n.idNotificacaoTipo == 4 || n.idNotificacaoTipo == 20 || n.idNotificacaoTipo == 21 || n.idNotificacaoTipo == 28 || n.idNotificacaoTipo == 29)
                                                       {%> <a class="invert" href="/AVA/Perfil/Home/Index/<%:n.strLoginDonoMensagem%>"><%:n.strNomeDonoMensagem %> </a><% } %>
                                                    <%
                                                }
                                            }
                                    } 
                                    %>
                                    <span class="discreto"><%:no.strTempoPublicacao%></span>
                                </p>
                            </li>
                        <%
                        } 
                        %>
             	    </ul>
                </div>
            </section><!--ava_box-->   
        </section><!--ava_container-->		
</asp:Content>














































