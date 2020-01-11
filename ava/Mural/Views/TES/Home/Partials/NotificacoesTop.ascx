<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<Mural.Models.Notificacao>>" %>
<script>
    $(function () {
        $('body').on('click', '.drop_notif li', function () {
            if ($(this).attr('ident_msg_rapida') && $(this).attr('ident_msg_rapida') != "undefined" && $(this).attr('ident_msg_rapida') != "") {

                _id_msg = $(this).attr('ident_msg_rapida');
                _idTipoNotificacao = $(this).attr('idTipoNotificacao');
                _id_msg_cript = $(this).attr('ident_msg_rapida_cript');

                _str_url_redirect = $(this).attr('data-urlRedirect');
                var este = $(this);

                $.get('/AVA/Mural/Home/VisitarNotificacao/' + _id_msg, function () {
                    /* SAC Notificações
                    if (parseInt(_idTipoNotificacao) == 22) {
                    var destino = este.attr("destino");
                    window.location.href = '/AVA/Grupo/Home/PerfilGrupo/' + destino;
                    }
                    else */
                    if (parseInt(_idTipoNotificacao) == 23) {
                        return;
                    }
                    else if (_idTipoNotificacao == 19 || _idTipoNotificacao == 20 || _idTipoNotificacao == 21 || _idTipoNotificacao == 25) {
                        window.location.href = '/AVA/Grupo/Home/Post/' + _id_msg_cript;
                    } else if (_idTipoNotificacao == 26 || _idTipoNotificacao == 27 || _idTipoNotificacao == 28 || _idTipoNotificacao == 29 ) {
                        window.location.href = '/AVA/Turma/Post/' + _id_msg_cript;
                    } 
                    else if(_idTipoNotificacao == 30){

                        window.location.href = _str_url_redirect+"?id="+_id_msg_cript;
                    }
                    else {
                        window.location.href = '/AVA/Mural/Home/Post/' + _id_msg_cript;
                        //$('body').append('<form style="display:none;" id="form_post" name="form_post" action="/AVA/Mural/Home/Post/" method="POST"><input type="hidden" name="id_msg" id="id_msg" value="' + _id_msg + '"></form>');
                        //$('#form_post').submit();
                    }
                });
            }
        });
    });
</script>
<% string strlinkPaginaEscola = ViewData["strlinkPaginaEscola"] != null ? ViewData["strlinkPaginaEscola"].ToString() : "" ;  %>
<ul class="drop_notif">
                     	<a class="seta_up" href="#"></a>
                        <% if (Model == null)
                           {  %>
                            <li>
                                <a href="#" class="">
                        
                                <div class="embrulho">
                                    <span>Ainda não existe nenhuma notificação para você.</span>
                                </div>
                                </a>
                                </li>
                        <%}else if(Model.Count > 0) { %>
                        <%foreach (Mural.Models.Notificacao no in ViewData.Model)
                          {
                              RedeSocialAVA.Models.Notificacao n = no.notificacao;

                              var strUrlRedirect = "";

                              if(n.idNotificacaoTipo == 30){
                                strUrlRedirect = "/AVA/Pagina/"+strlinkPaginaEscola;
                              }
                              
                              %>
                    	    <li ident_msg_rapida ="<%:n.idMensagemRapida%>" ident_msg_rapida_cript="<%:n.idMensagemRapidaCript%>" data-urlRedirect="<%:strUrlRedirect%>" idTipoNotificacao="<%:n.idNotificacaoTipo%>" <%=n.idNotificacaoTipo.Equals(22) ? "destino=\"" + no.strLinkGrupo + "\"" : "" %>>
                            <a class="notif_default <%if (n.bolVisitado){ %> notif_lida <%} %>" href="#">
                            <% if (n.idNotificacaoTipo.Equals(30))
                               { %>
                                 <img height="33" width="33" alt="" src="<%:no.strMiniFotoOrigem %>">
                               <%} else { %>
                                  <img height="33" width="33" alt="" src="<%:n.strMiniFotoOrigem %>">
                                <%} %>

                            <div class="embrulho">
                            <%if (n.totalGrupo > 1)
                              { %>
                                <%foreach (var ng in n.grupoNotificacoes.Select((x, i) => new { Value = x, Index = i }))
                                      {
                                 %>
                                    <span><%:ng.Value.strNomeOrigem%></span>
                                     <%
                                         if ((ng.Index == 0 && n.totalGrupo == 2) || (ng.Index == 1 && n.totalGrupo == 3))
                                     {
                                     %>
                                    
                                     e 
                                     <%}
                                         else if (ng.Index <= 1 && n.totalGrupo >= 3)
                                     {
                                     %>
                                    
                                     , 
                                     <%} %>  
                                     
                                <%} %>
                                <%if (n.totalGrupo > 3)
                                  {%>
                                    <%if (n.totalGrupo == 4)
                                      {%>
                                        e mais <span>uma pessoa</span> 
                                    <%} %>
                                    <%if (n.totalGrupo > 4)
                                      {%>
                                        e mais <span><%:(n.totalGrupo - 3)%> pessoas</span>  
                                    <%} %>
                                <%} %>
                                <%:n.strTextoPadraoPlural%> <%if (n.idNotificacaoTipo == 4 || n.idNotificacaoTipo == 20 || n.idNotificacaoTipo == 21 || n.idNotificacaoTipo == 28 || n.idNotificacaoTipo == 29)
                                                              {%> <%:n.strNomeDonoMensagem %> <% } %>
                            <%}
                              else
                              {
                                  if (!n.idNotificacaoTipo.Equals(30))
                                  {
                                  %>
                                 <span><%:n.strNomeOrigem%></span>
                                  <%} %>
                                <%:n.strTextoPadrao%> 
                                <%
                                  if (n.idNotificacaoTipo == 4 || n.idNotificacaoTipo == 20 || n.idNotificacaoTipo == 21 || n.idNotificacaoTipo == 28 || n.idNotificacaoTipo == 29)
                                  {
                                      %> <%:n.strNomeDonoMensagem %> 
                               <% }
                                  else if (n.idNotificacaoTipo.Equals(22) || n.idNotificacaoTipo.Equals(23) || n.idNotificacaoTipo.Equals(25))
                                  {
                                      Response.Write("<b>" + no.strNomeGrupo + "</b>");
                                  }
                                  %>
                            <%} %>
                            
                            <span class="discreto"><p><%:no.strTempoPublicacao%></p></span>
                            </div>
                            </a>
                            </li>
                        <%} %>
                            <%//if (Convert.ToInt32(ViewData["tNotificacoes"]) > 5)
                              //{%>
                                    <li class="notif_todas">
                                        <a class="" href="/ava/mural/Home/Notificacoes">
                                            Exibir todas as notificações
                                        </a>
                                    </li>
                            <%//} %>
                        <% }
                           else
                           {%>
                                <li>
                                <a href="#" class="">
                        
                                <div class="embrulho">
                                    <span>Ainda não existe nenhuma notificação para você.</span>
                                </div>
                                </a>
                                </li>
                        <%} %>
                    
                    </ul>
                