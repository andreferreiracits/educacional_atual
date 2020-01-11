<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Agenda.Models.Evento>>" %>
<%
    string permissao = ViewData["permissao"].ToString();
    int tipo = (int) ViewData["tipo"];
     %>
<%if (Model.Count() > 0)
  {
      var bolFimContinuo = false;
      var bolExibeData = false;
      %>
      <ul class="clearfix ava_agenda">
      <%
      foreach (var item in Model)
      {
          if (item.dtmInicio == item.dtmFim && !bolFimContinuo)
          {
              bolFimContinuo = true;
          }

          /*if (bolFimContinuo && !bolExibeData)
          {
              bolExibeData = true;
         
            <div class="data_eventosDia">
                item.dataString
                <hr />
            </div>
            
           }*/

          if (item.dtmInicio == item.dtmFim)
          {
%>
            <li class="">
                <span><%
              if(!item.strUrlEvento.Equals("")){
                Response.Write("<a href=\"" + item.strUrlEvento + "\" target=\"_blank\">" + item.txtDescricao + "</a>");
              } else {
                Response.Write(item.txtDescricao);
              }
                  
                  %></span>
                <p class="discreto"><%=item.horaInicio%> - <%=item.horaFim%></p>
                <%
                    if ((tipo == 1 && permissao == "escola" && item.idCategoria == 2) || (tipo == 2 && permissao == "portal" && item.idCategoria == 3) || (tipo == 3 && permissao == "escolaPortal") || (item.idCategoria == 1))
                    {
               %>
                        <a alt="editar" title="editar" class="bt_normal editar agendaItemEditar" href="javascript: void(0);" id="<%=item.idEvento %>"></a>
                        <a alt="excluir" title="excluir" class="bt_normal deletar agendaItemExcluir" href="javascript: void(0);" id="<%=item.idEvento %>"></a>
                <%
                    }    
                 %>
            </li>
            <!--<div class="item_eventosDia">
                <div class="tituloEvento"><%=item.txtDescricao%></div>
                <div class="horaEvento"><%=item.horaInicio%> - <%=item.horaFim%></div>
                <div class="botao_itensEventosDia agendaItemExcluir" id="<%=item.idEvento %>">excluir</div>
                <div class="botao_itensEventosDia agendaItemEditar" id="<%=item.idEvento %>">editar</div>            
            </div>-->
<%      }
          else
          { %>
          <li class="agd_evtContinuo" idEvento="<%=item.idEvento %>">
                <span>
                <%
                  if (!item.strUrlEvento.Equals(""))
                  {
                      Response.Write("<a href=\"" + item.strUrlEvento + "\" target=\"_blank\">" + item.txtDescricao + "</a>");
                  }
                  else
                  {
                      Response.Write(item.txtDescricao);
                  }    
                %>
                </span>
                <p class="discreto"><%=item.dtmInicio.Substring(0, 5)%> - <%=item.horaInicio%> à <%=item.dtmFim.Substring(0, 5)%> - <%=item.horaFim%></p>
                <%
                    if ((tipo == 1 && permissao == "escola" && item.idCategoria == 2) || (tipo == 2 && permissao == "portal" && item.idCategoria == 3) || (tipo == 3 && permissao == "escolaPortal") || (item.idCategoria == 1))
                    {
                        
               %>
                <a alt="editar" title="editar" class="bt_normal editar agendaItemEditar" href="javascript: void(0);" id="<%=item.idEvento %>"></a>
                <a alt="excluir" title="excluir" class="bt_normal deletar agendaItemExcluir" href="javascript: void(0);" id="<%=item.idEvento %>"></a>
                <%
                    }    
                 %>
           </li>
             <!--<div class="item_eventosDia agd_evtContinuo" idEvento="<%=item.idEvento %>">
                <div class="tituloEvento"><%=item.txtDescricao%></div>            
                <div class="horaEvento"><%=item.dtmInicio.Substring(0, 5)%> - <%=item.horaInicio%> à <%=item.dtmFim.Substring(0, 5)%> - <%=item.horaFim%></div>
                <div class="botao_itensEventosDia agendaItemExcluir" id="<%=item.idEvento %>">excluir</div>
                <div class="botao_itensEventosDia agendaItemEditar" id="<%=item.idEvento %>">editar</div>
            </div>-->
<%      } %>
        <!--<hr />-->
        
<%
    }
      %>
      </ul>
      <%
  }
  else
  {
%>
    <div>Nenhum evento encontrado para essa data.</div>
<%  }%>