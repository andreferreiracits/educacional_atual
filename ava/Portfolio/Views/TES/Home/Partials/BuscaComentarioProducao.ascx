<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Portfolio.Model.ComentarioAVA>>" %>

    <% if (Model != null)
       {
           int quantidade = Model.Count;

           int contador = 0;
           int calc     = 0;
           string strGostou = "";

           
           foreach (var Comentario in Model)
           {
               
               string classeCss = "";
               if (Comentario.jaCurtiu)
               {
                   classeCss = "ativo";
               }
               else {
                   classeCss = "";
               }
           calc = (quantidade - contador);

           if (Comentario.jaCurtiu)
           {
               strGostou = "Você gostou disto (desfazer)";
           }
           else
           {
               strGostou = "Gostar";
           }
               
           %>
         <div class="comentario_usuario comentario_usuario<%= Comentario.idFerramentaMensagem %> <%= calc > 5 ? "escondame" : "" %>" style="display: <%= calc > 5 ? "none;" : "block;" %>">
            <a class="thumb_usuario tooltip_title" title="<%= Comentario.strNome %>" href="/AVA/Perfil/Home/Index/<%= Comentario.strLogin %>">
                <img src="<%= Comentario.strMiniFoto %>" height="33" width="33" />
            </a>
            <a class="nome_usuario" href="/AVA/Perfil/Home/Index/<%= Comentario.strLogin%>"><%= Comentario.strNome%></a>
            <%
                string data = null;
                if (Comentario.dtmComentario.Day.Equals(DateTime.Now.Day) && Comentario.dtmComentario.Month.Equals(DateTime.Now.Month) && Comentario.dtmComentario.Year.Equals(DateTime.Now.Year)) {
                    data = "hoje as "+Comentario.dtmComentario.ToString("HH:mm").Replace(":", "h");
                }
                else if (Comentario.dtmComentario.Subtract(DateTime.Now).Equals(1))
                {
                    data = "ontem as " + Comentario.dtmComentario.ToString("HH:mm").Replace(":", "h");
                }
                else {
                    data = Comentario.dtmComentario.ToString("dd/MM/yyyy");
                }
            %>
            <small><%=data %></small>
            <a href="javascript:void(0);" title="<%=strGostou %>" class="curtido <%= classeCss %>" ident="<%= Comentario.idFerramentaMensagem %>"></a>
              
              <% if (Comentario.podeExcuir) {  %>
                 <a class="excluir_comentario FontAwesome" href="javascript:void(0);" data-id="<%= Comentario.idFerramentaMensagem %>" data-idProducaoUsuario="<%= ViewData["idProducaoUsuario"] %>" title="Excluir" alt="Excluir"></a>
              <%}%>

            <p><%= Comentario.txtComentario%></p>
            </div>
            <%
            contador++;    
        }
       }
     %>           
