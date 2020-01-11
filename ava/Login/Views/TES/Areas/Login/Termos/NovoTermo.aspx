<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Login.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<UsuarioAVA.Models.Usuario>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="PageJsArea" runat="server">

    <script language="javascript">
    <!--       
        function AceitaTermos(intAceito) {
            if (intAceito == 0) {
                document.aceita.botao.value = 'naceito';
                document.aceita.submit();
            } else if(intAceito == 1) {
                document.aceita.botao.value = 'aceito';
                document.aceita.submit();
            }
			
        }

    //-->
    </script>     
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderLogo" runat="server">
<% 
    string strLogo = "";
    var idEscola = Model.idEscola;

    if (idEscola > 0 )
    {
        strLogo = "/esc_include/AVA/" + idEscola + "/logo.png";       
    }
    else
    {
        strLogo = "/AVA/StaticContent/Content/TES/cssimg/logo_colegioPositivo.png";   
    }
%>
    <h1><a href="/AVA/Mural"><img src="<%=strLogo %>" alt="Logo" border="0"></a></h1>        
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentPlaceHolderConteudo" runat="server">
    <div  class="container_central clearfix">
        <h1 class="blokletters">Atualização contratual</h1>

        <h3>TERMO ADITIVO AO CONTRATO DE DISPONIBILIZAÇÃO DE ACESSO AO CONTEÚDO RESTRITO DO EDUCACIONAL</h3>
        <p><img src="/AVA/StaticContent/Common/img/perfil/avatar_menor.jpg" width="33" height="33" alt=""> Seu login é [<%=Model.strLogin %>]</p>
        <div class="ava_termos">  
<p>
<%-- 		    
		   <b> TERMO DE USO DO EDUCACIONAL</b> --%>
				
				<p>
					Olá, <%=Model.strNome %>
				</p>

				<p>
					<b>POSITIVO TECNOLOGIA S/A</b>, aqui denominada <b>POSITIVO</b>, e do outro lado a <b>CONTRATANTE</b>;
				</p>

				<p>
					Considerando que as Partes firmaram <b>Contrato de Disponibilização de Acesso ao Conteúdo Restrito do Educacional ("Contrato")</b>;
				</p>
				<br>
				<ol>
				<li>
					1.	Definição do Educacional - significa o conjunto de soluções pedagógicas da POSITIVO, focadas no desenvolvimento do aprendizado, por meio da tecnologia descritas no endereço (www.educacional.com.br/solucoes).
				</li>
				<br>
				<li>
					2.	Pelo presente, a POSITIVO disponibilizará à CONTRATANTE e aos seus Usuários, conforme definição acima, através de meios digitais de transmissão de informações, as ferramentas e o conteúdo de acesso restritos do Educacional.
				</li>
				<br>
				<li>
					3.	Fica alterada a vigência do contrato, tendo início na data de sua assinatura, com vencimento em 31 de dezembro de 2021, sendo renovado automaticamente, por iguais períodos de 2 (dois) anos, desde que não haja manifestação contrária por qualquer uma das partes, por escrito e com comprovante de recebimento, com antecedência mínima de 180 (cento e oitenta dias) dias da data prevista para término do Contrato.
				</li>
				<br>
				<li>
					4.	Não haverá qualquer alteração nos valores praticados, permanecendo o reajuste anual de preços com base na variação do INPC-IBGE ou, na hipótese da extinção deste, em outro índice que vier a substituí-lo. O reajuste ocorrerá sempre no mês de janeiro de cada ano, considerando o índice acumulado no período de janeiro a dezembro do ano anterior.  Sendo certo que os valores pactuados não estarão sujeitos à desindexação, congelamento ou deflação a qualquer título.
				</li>
				<br>
				<li>
					5.	Permanecem inalteradas as demais cláusulas e condições do Contrato naquilo que não conflitar com o presente Aditivo.
				</li>
				<br>
				<li>
					6.	Ao navegar pelo Educacional com a utilização da "Senha Master", a CONTRATANTE declara estar de acordo com todas as cláusulas e condições do presente.
				</li>
				<br>
				
			</ol>

				<p>
					<em>
						Curitiba, 15 de agosto de 2019
					</em>
				</p>

        </div>
            
            
        <div class="bts_termos">
            <form name="aceita" action="/AVA/Login/Termos/NovoTermoAceito" method=POST>
                <input type="hidden" name="strLogin" value="<%=Model.strLogin %>">                
                <input type="hidden" name="prilog" value="1">
                <input name="botao" type="hidden" value="naceito">
                <%-- <input name="strTipo" type="hidden" value="<%=ViewData["strTipo"] %>">  --%>
                <%-- <a href="/AVA/termo.pdf" class="large awesome awesome-white " title="Download!" download="Termo">Download</a>                            --%>
                <%-- <a href="javascript:AceitaTermos(0)" class="large awesome awesome-red " title="Voltar para a página inicial!">Não aceito</a> --%>
                <a href="javascript:AceitaTermos(1)" class="large awesome awesome-green " title="Aceito os termos de uso!">Aceito</a>
            </form>
        </div>     
    </div>

</asp:Content>

