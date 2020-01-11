<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MainPerfilPublico>" %>
           

    
    <%
        if (Model.TimeLinePublico.mensagens.Count > 0)
        {

            foreach (var item in Model.TimeLinePublico.mensagens)
            {
                string idPapel = item.IdPapel.ToString();
                string TipoPapel = idPapel.Substring(0, 1);
                string strClass = "";

                if (TipoPapel == "1")
                {
                    strClass = "";
                }
                else
                {
                    strClass = "";//"highlight";
                }

                int idMensagemRapida = item.IdMensagemrapida;
                int idUsuario = item.IdUsuario;               
           
    %>
   
        <article class="clearfix" id="avaMsg_<%=idMensagemRapida %>">            
           <img class="avatar_tl" src="http://www.educacional.com.br<%=item.strFoto %>" width="55" height="55" alt="avatar">
                     
            <div class="embrulho">
                <h1><a href="#" title="persona" alt="persona"  class=""><%=item.strNome%></a> </h1>
                <p class="ctn_msg"><%=item.StrMensagem%></p>
                    <p class="discreto"><%=item.strTempoPublicacao%> <a href="#" title="persona" alt="persona"  class="">gostei</a></p>
                <div class="comment_article clearfix">2 pessoas curtiram a parada</div>
                <div class="comment_article clearfix">
                    <img class="avatar_tl" src="StaticContent/Common/img/perfil/avatar_menor.jpg" width="33" height="33" alt="avatar"> 
                    <div class="embrulho">
                        <h2><a href="#" title="persona" alt="persona"  class="">Algu&eacute;m disse:</a></h2>
                        <span>dhakshdkajshkjsah k dhakshdkajshkjsah k dhakshdkajshkjsah k dhakshdkajshkjsah k dhakshdkajshkjsah k 
                            <a href="#" title="persona" alt="persona"  class="">Marcio Sartor</a> dhakshdkajshkjsah k dhakshdkajshkjsah k dhakshdkajshkjsah k dhakshdkajshkjsah k dhakshdkajshkjsah k	</span>
                            <p class="discreto">h&aacute; 12 minutos <a href="#" title="persona" alt="persona"  class="">gostei</a></p>
                    </div>
                </div>
            </div>
        </article>                       
    <%    
        }
            
        //Se tiver menos de 10 esconde o veja mais
        if (Model.TimeLinePublico.mensagens.Count < 10)
        {
    %>      <input type="hidden" value="poucasMsgsRapidas" />
    <%
        }
    }
    else
    {
    %>   
        <article class="clearfix highlight ">Nenhuma mensagem por enquanto.</article>               
        <input type="hidden" value="semMsgsRapidas" />
    <%
    }
    %>
 