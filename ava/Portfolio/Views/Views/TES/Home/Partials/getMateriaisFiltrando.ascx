<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Portfolio.Model.Materiais>>" %>
    <%
    int anoVigente          = (int)ViewData["intAnoVigente"];
    int anoQuePassou        = anoVigente;

    Response.Write("{");
    Response.Write("\"Retorno\":[");
    if (Model != null)
    {
        Response.Write("{\"erro\": \"0\"},");
        int Quantidade = Model.Count;
        int contador = 0;
        foreach (Portfolio.Model.Materiais MaterialDoUsuario in Model)
        {
            contador++;
            
            Response.Write("{\"Portfolio\":");
            Response.Write("{\"idProducaoUsuario\": \""     + MaterialDoUsuario.idProducaoUsuario +"\"");
            Response.Write(",\"intAno\": \""                + MaterialDoUsuario.intAno + "\"");
            Response.Write(",\"strLink\": \""               + MaterialDoUsuario.strLink + "\"");
            Response.Write(",\"strThumb\": \""              + MaterialDoUsuario.strThumb + "\"");
            Response.Write(",\"strHome\": \""               + MaterialDoUsuario.strHome + "\"");
            Response.Write(",\"strProducao\": \""           + MaterialDoUsuario.strProducao + "\"");
            Response.Write(",\"DescricaoFerramenta\": \""   + MaterialDoUsuario.DescricaoFerramenta + "\"");
            Response.Write(",\"bolPublico\": \""            + MaterialDoUsuario.bolPublico + "\"");
            Response.Write(",\"quantidadeCurtidas\": \""    + MaterialDoUsuario.quantidadeCurtidas + "\"");
            Response.Write(",\"quantidadeComentarios\": \"" + MaterialDoUsuario.quantidadeComentarios + "\"");
            Response.Write(",\"jaCurtiu\": \""              + MaterialDoUsuario.jaCurtiu + "\"");
            
            if (contador.Equals(Quantidade))
            {
                Response.Write("}}");
            }
            else {
                Response.Write("}},");
            }
           
        }   
    }else{
        Response.Write("{\"erro\": \"1\"}");
    }
    
    Response.Write("]}");
%>
    