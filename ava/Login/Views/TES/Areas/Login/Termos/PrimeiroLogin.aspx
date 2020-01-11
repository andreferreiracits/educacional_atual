<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Login.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<UsuarioAVA.Models.Usuario>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="PageJsArea" runat="server">

    <script language="javascript">
    <!--       
        function AceitaTermos(intAceito) {
            if (intAceito == 0) {
                document.aceita.botao.value = 'naceito';
                document.aceita.submit();
            } else {
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
        <h1 class="blokletters">Termos de uso</h1>
        <h3>Para usar os recursos do Portal, é necessário que você aceite os termos de uso.</h3>
        <p><img src="/AVA/StaticContent/Common/img/perfil/avatar_menor.jpg" width="33" height="33" alt=""> Seu login é [<%=Model.strLogin %>]</p>
        <div class="ava_termos">  
<p>
		    
		   <b> TERMO DE USO DO EDUCACIONAL</b>
				</p>
				<p>
				O respectivo Termo de Uso (doravante, "Termo de Uso") tem como objetivo regrar a utilização pelos usuários (doravante, "Usuário") do Educacional (doravante, " Educacional"), de titularidade da Positivo Informática S.A. (doravante, "Positivo Informática"), que busca proporcionar a todos usuários o acesso a diversos conteúdos e serviços (doravante, "Serviços e Conteúdos").
				</p>
				<p>
				<b>1. Aceite do termo de uso pelo usuário</b>
				</p>
				<p>
				O Usuário para poder utilizar livremente dos Serviços e Conteúdos oferecidos pelo Educacional, deverá previamente ler atentamente e expressar, de maneira inequívoca e incondicionada, a concordância com o presente Termo de Uso e com a Política de Privacidade.
				</p>
				<p>
				Demais avisos e instruções publicados pelo Educacional, devem ser entendidos como complementos a este Termo de Uso, devendo o Usuário, da mesma maneira, observá-los e respeitá-los integralmente.
				</p>
				<p>
				O Educacional se reserva o direito de modificar, suprimir e/ou ampliar, livremente e a qualquer tempo, sem comunicação prévia, o presente Termo de Uso, sendo que a concordância do usuário com sua alteração, se dará quando de seu próximo acesso ao  Educacional.
				</p>
				<p>
				Fica estabelecido que não é permitido o acesso e/ou a utilização dos Serviços e Conteúdos do Educacional por parte do Usuário, caso o mesmo não aceite plenamente, sem qualquer reserva, todas as disposições deste Termo de Uso.
				</p>
				<p>
				<b>2. Utilização dos serviços e conteúdos</b>
				</p>
				<p>
				Inicialmente, para a utilização dos Serviços e Conteúdos fornecidos através do Educacional não se requer a inscrição e/ou registro do Usuário (considerados "Serviços e Conteúdos Abertos"). Porém, o Educacional também oferece alguns Serviços e Conteúdos onde se requer ao Usuário, a condição de inscrição e/ou registro para o seu uso (considerados "Serviços e Conteúdos Fechados").
				</p>
				<p>
				Para acessar os Serviços e Conteúdos Fechados o Usuário, no momento do preenchimento dos formulários de inscrição e/ou registro, deverá fornecer informações como parte do processo. O Usuário concorda e declara que estas informações prestadas são verdadeiras e corretas, sendo de sua responsabilidade manter toda informação atualizada no Educacional. O Usuário responderá pelas falsas ou incorretas declarações fornecidas que vierem a causar dano ou prejuízo ao  Educacional ou a terceiros.
				</p>
				<p>
				O Usuário por este termo concorda e se compromete a utilizar os Serviços e Conteúdos corretamente, somente para os fins permitidos, em conformidade com o disposto neste Termo de Uso, na legislação em vigor e com a moral e bons costumes, assim como concorda e se compromete a qualquer título: 
				</p>
				<p>a) não acessar, nem sequer tentar acessar, a qualquer Serviço ou ambiente por qualquer meio que não seja através da interface disponibilizada pelo  Educacional, inclusive por meio de meios automatizados; 
				<BR>b) não participar de nenhum processo ou atividade que interfira ou interrompa o funcionamento dos Serviços e Conteúdos, Servidores e ainda de redes conectadas aos Serviços e Conteúdos do  Educacional; 
				<BR>c) não reproduzir, duplicar, copiar, vender, comercializar ou revender os Serviços e Conteúdos do Educacional a qualquer título.
				</p>
				<p>
				<b>3. Direitos de propriedade intelectual</b>
				</p>
				<p>
				As marcas, nomes comerciais ou sinais distintivos de qualquer espécie que estão veiculadas no  Educacional, são de única e exclusiva titularidade da Positivo Informática. A simples utilização do Educacional, bem como de seus Serviços e Conteúdos, não concede ao Usuário nenhuma cessão, licenciamento, autorização ou ainda qualquer outro direito de uso de qualquer marca, nome comercial ou sinal distintivo de terceiro.
				</p>
				<p>
				Todos os direitos de reprodução e representação são reservados ao Educacional. Todas as informações reproduzidas neste site são protegidas por direitos de autor e propriedade intelectual detidos pelo Educacional. Portanto, nenhuma destas informações pode ser reproduzida, modificada, armazenada, re-difundida, traduzida, explorada comercialmente ou reutilizada total o parcialmente sem o consentimento prévio por escrito do Educacional.
				</p>
				<p>
				As informações contidas no Educacional constituem material protegido por direitos autorais, pertencentes à Positivo Informática; portanto, a utilização indevida sujeita o infrator às penalidades previstas em lei, assim como ao imediato cancelamento do serviço.
				</p>
				<p>
				O Usuário que publicar conteúdo original próprio (textos, imagens, vídeos) cede, de forma definitiva e atemporal, os direitos decorrentes desse conteúdo à Positivo Informática e ao Educacional, que poderá mantê-lo disponível ou não no Educacional.
				</p>
				<p>
				O conteúdo publicado pelo Usuário no  Educacional poderá ser compartilhado com outros Usuários do Educacional.
				</p>
				<p>
				<b>4. Exclusão de garantias e responsabilidades</b>
				</p>
				<p>
				O Usuário concorda expressamente que a utilização e/ou acesso aos Serviços e Conteúdos do Educacional é por sua integral e total conta e risco, compreendendo que os Serviços e Conteúdos são disponibilizados na forma que se encontram e de acordo com a disponibilidade, sendo que o Educacional não garante que o uso dos Serviços e Conteúdos atenderá às exigências do Usuário.
				</p>
				<p>
				O Usuário entende e aceita que o Educacional não se responsabiliza por eventuais transações comerciais realizadas on-line, as quais serão de inteira responsabilidade das empresas que colocarem produtos e/ou serviços à venda via Educacional.
				</p>
				<p>
				Continuidade dos Serviços e Conteúdos: Por questões técnicas e operacionais, o Educacional não pode garantir a disponibilidade e continuidade do funcionamento do Educacional e de seus Serviços e Conteúdos. Na oportunidade, o Educacional poderá advertir antecipadamente quanto as interrupções do funcionamento de seus Serviços e Conteúdos, mais nunca poderá garantir que o uso do Educacional e de seus Serviços e Conteúdos serão ininterruptos, pontuais, seguros e isento de erros, bem como que qualquer defeito existente no Serviço ou no Educacional serão imediatamente e/ou definitivamente corrigidos.
				</p>
				<p>
				O conteúdo publicado pelo Usuário nos produtos interativos do Educacional não deve conter os seguintes itens: 
				</p>
				<p>a. Material pornográfico ou atividades ilegais incluindo menores de 18 anos (segundo o artigo 241 do Estatuto da Criança e do Adolescente); 
				<br />c. Prática, indução ou incitação de preconceito quanto à origem, raça, etnia, sexo, orientação sexual, cor, idade, crença religiosa ou qualquer outra forma de discriminação; 
				<br />d. Material calunioso, abusivo ou que invada a privacidade de alguém; 
				<br />e. Imagens e/ou linguagem obscena ou pornográfica; 
				<br />f. Afirmações injuriosas ou difamatórias; 
				<br />g. Informação sobre atividades ilegais e incitação ao crime; 
				<br />h. Material protegido por direitos autorais, nem publicar fotos ou textos sem autorização do autor ou de seu representante legal, publicar fotos sem autorização dos fotografados e distribuir arquivos de som sem autorização de pessoas ou empresas responsáveis; 
				<br />i. Informação relativa à pirataria de material protegido pelas leis de direitos autorais e propriedade; 
				<br />j. Divulgar como próprio ou sem a devida autorização nomes, contatos e demais informações de terceiros; 
				<br />k. Propaganda eleitoral; 
				<br />l. Banners publicitários; 
				<br />m. Vendas online, mesmo de produtos de criação do autor da página; 
				<br />n. Páginas e arquivos criptografados ou protegidos por senhas; 
				<br />o. Programas e arquivos que contenham vírus ou qualquer outro código malicioso; 
				<br />p. Defesa ou estímulo às práticas de bulimia e/ou anorexia; 
				<br />q. Material que viole qualquer lei municipal, estadual ou federal do Brasil; 
				<br />r. Material que configure crime virtual.
				</p>
				<p>
				O Educacional, não se responsabiliza pelos comentários, opiniões, informações, depoimentos, mensagens, vídeos, textos, imagens, áudios ou qualquer outro tipo de conteúdo que sejam, postados, publicados e disponibilizados por meio do Educacional (em suas páginas web e/ou em blogs), pelo Usuário, sendo a responsabilidade civil e criminal atribuída única e exclusivamente ao autor dos comentários, opiniões, informações, ou mensagens. Todo o conteúdo publicado pelo Usuário são de responsabilidade exclusiva deles e de caráter completamente independente, sendo que toda e qualquer tipo de opinião, ideal e/ou posição expressados não refletem necessariamente o ponto de vista e a posição do Educacional. Estes conteúdos não são conferidos, revisados, ou de qualquer forma endossados pelo Educacional. O Educacional se reserva o direito de armazenar as informações deste Usuário, a fim de viabilizar sua identificação.
				</p>
				<p>
				<b>5. Suspensão e cessação dos serviços e conteúdos</b>
				</p>
				<p>
				O Educacional se reserva o direito de recusar e/ou retirar o acesso ao Educacional e/ou aos Serviços e Conteúdos, a qualquer momento, sem a necessidade de comunicação prévia, por sua própria iniciativa ou ainda por exigência de um terceiro, daquele Usuário que descumprir o presente Termo de Uso.
				</p>
				<p>
				No caso de publicação de conteúdo proibido pelo Usuário, o Educacional excluirá o conteúdo proibido e o Usuário ficará sujeito a punições que vão desde suspensão de uso do Educacional por período determinado, até a proibição de uso.
				</p>
				<p>
				<b>6. Lei aplicável</b>
				</p>
				<p>
				O presente Termo de Uso é regido única e exclusivamente pelas leis da República Federativa do Brasil e qualquer discussão judicial que surja tendo por base sua interpretação ou aplicação deverá ser julgado por tribunais brasileiros, estando desde logo eleito o foro da cidade de Curitiba, Estado do Paraná, por mais privilegiado que outro seja ou possa vir a ser.
				<BR><BR>
				</p>
				<p>
					<b>POLÍTICA DE PRIVACIDADE </b>
				</p>			
				<p>
				<BR>
				A Política de Privacidade garante a transparência na relação entre o Usuário e o Educacional.
				</p>
				<p>O Educacional considera essencial o compromisso com a proteção da privacidade de seus usuários.
				</p>
				<p>
				Por esse motivo, não comercializamos, trocamos ou disponibilizamos a terceiros informações sobre nossos Usuários.
				</p>
				<p>
				Coletamos automaticamente determinadas informações relativas a uso, quantidade e frequência das visitas ao Educacional, acompanhando os hábitos de navegação dos Usuários.
				</p>
				<p>
				Para assegurar a transparência e a precisão nas regras, o Educacional poderá alterar esta Política, a qualquer tempo, porém recomendamos sua leitura periódica.
				</p>
				<p>
				<b>1. Cadastro</b>
				</p>
				<p>
				Para participar de promoções e receber as novidades do Educacional em seu e-mail, você precisa se cadastrar no Educacional, onde serão solicitadas algumas informações pessoais.Os dados enviados pelos Usuários serão usados somente pela equipe do Educacional com a única finalidade de identificar o público que acessa o portal e personalizar serviços e conteúdos.
				</p>
				<p>
				Para a utilização de alguns Serviços e/ou para acesso a determinados conteúdos e páginas web, o Educacional poderá exigir ao Usuário o cadastro de um nome de usuário e senha. Mantenha sua senha em segurança para garantir que o acesso seja feito exclusivamente por você (Usuário). Você reconhece que é o único responsável pela administração de suas senhas de acesso. O Educacional não poderá ser responsabilizado por atos decorrentes de acessos não autorizados. Nunca forneça sua senha para ninguém. Caso sua senha foi fornecida alguma vez, mude-a imediatamente.
				</p>
				<p>
				<b>2. Notícias no seu e-mail</b>
				</p>
				<p>
				Na hora de se cadastrar no  Educacional, você pode optar por receber as novidades do Educacional em seu e-mail. No cadastro, você também habilita o envio de informações e promoções de nossos parceiros. Caso você não queira receber essas mensagens, basta clicar no "link" que aparece no fim de cada e-mail enviado pelo portal.
				</p>
				<p>
				<b>3. Troca de mensagens</b>
				</p>
				<p>
				Os Usuários poderão trocar mensagens reservadas entre si. Os administradores do Educacional poderão monitorar tais mensagens. Nesse sentido não é assegurada a privacidade das mensagens. As mensagens enviadas no  Educacional são de responsabilidade exclusiva dos Usuários. O Educacional não pede seus dados em suas ferramentas, por isso não recomendamos o envio de informações e dados pessoais para outros usuários durante a a sua utilização.
					<BR><BR><BR>
				</p>

        </div>
            
            
        <div class="bts_termos">
            <form name="aceita" action="/AVA/Login/Termos/TermoAceito" method=POST>
                <input type="hidden" name="strLogin" value="<%=Model.strLogin %>">                
                <input type="hidden" name="prilog" value="1">
                <input name="botao" type="hidden" value="naceito">
                <input name="strTipo" type="hidden" value="<%=ViewData["strTipo"] %>"> 
                           
                <a href="javascript:AceitaTermos(0)" class="large awesome awesome-red " title="Voltar para a página inicial!">Não aceito</a>
                <a href="javascript:AceitaTermos(1)" class="large awesome awesome-green " title="Aceito os termos de uso!">Aceito</a>
            </form>
        </div>     
    </div>

</asp:Content>