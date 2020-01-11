<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.AssociativaRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<table>
    <tr>
    <td colspan="2" class="questaoEnunciado"><%=UtilView.ResolvePathImgPrint(Model.Questao.Questao.Enunciado.TextoView)%></td>
    </tr>
    <% Html.RenderPartial("Impressao/BoxAreaComentariosQuestao2Col", Model.ComentarioQuestao); %>
    <tr>
    <td colspan="2"></td>
    </tr>
    <tr>
        <td class="alternativaAssEsquerda">
            <table>
            <%

            if (Model.Alternativas.Count > 0)
            {
                Model.IniciaLetra();
                foreach (Alternativa alternativa in Model.Alternativas)
	            {
             %>
	            <tr>
                    <td class="alternativaMargin"> </td>
                    <td class="alternativaLetra"><%= Model.Letra %>)</td>
		            <td class="alternativaConteudo">
			            <%= UtilView.ResolvePathImgPrint(alternativa.Texto.TextoView)%>
		            </td>
	            </tr>
                
            <%
                    Model.ProximaLetra();
	            }
            }
            %>
            </table>
        </td>
        <td class="alternativaAssDireita">
            <table>
            <%

                if (Model.AlternativasDireita.Count > 0)
            {
                foreach (AlternativaDireita alternativaD in Model.AlternativasDireita)
	            {
             %>
	            <tr>
                    <td class="alternativaMargin">
                    <% if (Model.CssAlternativaCorrecaoAssociativa(alternativaD) == "listaQuestoesCorreta")
                   {
                   %>
                   <img src="data:image/gif;base64,R0lGODlhDwAPAPcAAP7+/hsWE/f39hgTEBINCiQgHRYRDhMMCvn5+CAZFyAbGJORjiwnJB4YFScjIC4pJy8pJtXU0b68uBEMCU9LSKikoSQhHQ8MCRkSED05N2VjYGdiX3FvbDMuKzEtKj46N0VBPq2rpygjIP7//o2NiZyZl4OCgSolIjk1NJiWlK2sqPX19BIMCcC+vbq5tSwoJVRTTsfGxQ4ICBcSD6KgnRwYFe7u7jo1Mh4aF7m3toaEhHNxbyMfHNLQz7++vMG/vurq6YeEgdbV1Ds3NEtHRYmFgoqHhKurphUPDKqppzYyMH15duTk5N/f3ra0s1xWVP7+/+Hh311aWI2MiWVhXmRiXnx5eAwHBUM/Paakow4IBh4YFhAMCR4ZFpaUkQIAABMOCxkTEL++uhALCBgSEM3NzCUhHlVRT2ViYGNfXComI2xqZ21pZ3FubGpoZVxYV5mWlCMgHF9cWXRwbYWDf3h2c3FwbhELCnp3dTk1M7e2shQPC5OSj6KhoBIPDUlFQmFdWhsXFHZzcEI9OqWjogUAAA0KCI+LiGpnZRkRD0ZCPxgSDxwVFKyqqDg3MiYiIEA9O66sqBYTEe/u7mFeXMC8uWZiX0xGREE7OWhlYhELCDw2NMzLyQ8KBykjIg4LCLu5tU5LSBkUEbu6uCIdGqCemx0XFRwXFHZ1dBIOCuvr6llVUikkIzg2Mz05OKOjoB8aF////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAAjyAGMJjBXjzaMZNUAQQhALQMNYAuxc+BMkxQJKLIb0GCjgTKoSfdBQWGVEDyZGnARaueNkh6Y9iwx0ciTm0gsbQvwswKMFls8EpvIoApXARJtWjcB08angQKhYaQAVeZCBQ50JSBooGOApio8AHULEYUWnCqwNAQaIarGCgQERRyygELRmU6xXkrzEYkMgkIdIPNxAynJFA4ImsaYcgEXA0iEGZQzRQPTlQwQ+XLYkOlGpAKpYmU79kFIoDAYyYyC4kIODSaxJrkipIEHkxqA5Ep7IyPEQCIxPVOBUKLWkgZlRA6EITIJFTQEHSnSoijUiVkAAOw==" alt="print-correta" />
                   <%
                   }
                       else if (Model.CssAlternativaCorrecaoAssociativa(alternativaD) == "listaQuestoesIncorreta")
                   {
                   %>
                   <img src="data:image/gif;base64,R0lGODlhDwAPAPcAAP7//01KR/7+/hUQDRINCv///g8KBwMAADs3NJqXlYF+fFtXVXZ0cRoVEhgTEBUPDBQPDPj49wkEARMMCru6tismI5qZlR4ZFggEAU5KR2FeWjEtK19dWVRRTz04NhkREVxYVRYSDxEOCnRycLGxrBUPDhIMCZSSjoaDgKakoGxqZoaDgeDg3nh2dIiHhFpYVFlYVklFQo2MiFNQTiciH/39/UtHQyEfGg4JBjo1MxUPDTk0MTk0M6yppjo2MyUiH7CwriolIrOysU9MSVFPS46KiaemoqilpEFAPIiFhTw4NYqJhbq3tOrp6O3t6727t/v7+lxaVouKiDQwLry6thsXFJWUkLq3tu/u7bCuq0pGRBQOCgYAAAsGAhQOC5COi2djZNXT0h0VEgcCABoUEd/g3RMNC2ViXx0VE0I9O11YVU9MSjAtKl9cWezs6hALCKakoXJvbVNPTKCem5SRjqimpZWTkKuqpxoSEHd1cjMvLXJsbKWkoWxnZnBsaSgkIUxHRCIfHV9eXJOQjfj39vDv8IyJh83MyhkTEHBua8jGxbu6uQQAACMfHd7d3BkRD0E9OiomIxcRDvf39iUgHYiGhUpJRX55eGplZJiWlB4aF6Gfm3l2dT86N5yamD05N7CwqxELCLazsGZiYPf29lNQTBcPDygkIrOxrjYzMpaVkx8aFwYBAKCgn2ZkYiEbGby6t09KRzMwLtPS0AoGAv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAAj3AGsJrCUExo8QN4jUKVBLQC0AtQiBoWUDRSZDM0ItcCMQwCQ5jbLMOTNEkCpRNJQ4EXjJTI9YjCbg2XKgE5NXbQqE8UJHhRYFqySRYaAmihEDsPb4uIMhSa0rgVrVSsHKQqkOn+JwelPiSy0WtY40IKBhyZRTK1wNENNlUa1ZphA5CGBlAw8GI0wQyFOjUK0iDwaAkKGnDyQ+ElrUUpQKSK1BY068WHPIwCYOCxJcgPBBSiJAJHCgqoVJE6gdB3SgecSlwhM2lqDUwoJAFhUXARDEUEAhx58yD2s1ySBiVAI4nvxUSeNooMAIdpBEohTEQyVSDWsFBAA7" alt="print-errada" />
                   <%
                   } %>
                    </td>
                    <td class="alternativaMarc">
                        <table><tr><td class="associativaBoxDireita"><%=Model.LetraAssociadaUser(alternativaD.Id)%></td></tr></table>
                    </td>
		            <td class="alternativaConteudo">
			            <%= UtilView.ResolvePathImgPrint(alternativaD.Texto.TextoView)%>
		            </td>
	            </tr>
            <%
	            }
            }
            %>
            </table>
        </td>
    </tr>
    
</table>
