var timeoutPesquisa;
var g_pesq_objInput;
var g_pesq_objBox;
var g_pesq_posItem=-2;
var g_pesq_maxItem=0;


function PesquisaSecoes(objInput, objBox) {

	g_pesq_objInput = objInput;
	g_pesq_objBox = objBox;
	g_pesq_objInput.attr("autocomplete","off");
	g_pesq_objInput.parent().append("<div id='boxSecoes' class='campo_drop' style='display:none' ></div>");
	g_pesq_objBox = $("#boxSecoes")
	objInput.live('keydown', function(key){ 
		
		if (timeoutPesquisa) clearTimeout(timeoutPesquisa);
		//console.debug(key.keyCode);
		switch(key.keyCode) {
			case 13:
				if (g_pesq_posItem > -1){
						key.preventDefault();
						//g_pesq_objBox.find("li:eq("+ g_pesq_posItem +")").click();
						location.href = g_pesq_objBox.find('li:not(li[class^="info"]):not(li[class^="fim"]):eq('+ g_pesq_posItem +') a').attr('href');
					}
			 	break;
			case 40:
				if (g_pesq_posItem==-2){Pesq_BuscaSecoes();}
				if (g_pesq_posItem < g_pesq_maxItem-1) g_pesq_posItem++;
				break;
			case 38:
				if (g_pesq_posItem==-2){Pesq_BuscaSecoes();}
				if (g_pesq_posItem > -1) g_pesq_posItem--;
				break;
			case 27:
				g_pesq_posItem = -2;
				g_pesq_objBox.hide();
				break;
			case 39:
			case 37:
				break;

			default:
				g_pesq_posItem=-2;
				timeoutPesquisa = setTimeout("Pesq_BuscaSecoes();", 700);
		}
		
		if (g_pesq_posItem>-2){
			g_pesq_objBox.find('li').removeClass("selecover");
			g_pesq_objBox.find('li:not(li[class^="info"]):not(li[class^="fim"]):eq('+ g_pesq_posItem +')').addClass("selecover");
		} 
	
	});


}
function Pesq_BuscaSecoes() {
	if (g_pesq_objInput.val()==""){
		g_pesq_objBox.hide();
	} else {
		g_pesq_objBox.load('/AVA/Barras/AcessoRapido/PesquisaAcessoRapido/',{sPesquisa:g_pesq_objInput.val()}, function(dados){
			g_pesq_posItem = -1;
			g_pesq_objBox.find(".fim_resultados").hide();
			g_pesq_objBox.find("ul").prepend('<li class="infocampo"><i class="FontAwesome"></i>Resultados r&aacute;pidos de se&ccedil;&otilde;es do portal</li>');
			g_pesq_objBox.find("ul").append('<li class="linha_dicionario highlight"><a href="/dicionarioaurelio/home.asp?pesquisa=' + g_pesq_objInput.val() +'">Pesquisar <B>' + g_pesq_objInput.val() +'</B> no <strong>Dicion&aacute;rio Aur&eacute;lio</strong></a></li>');
			g_pesq_objBox.find("ul").append('<li class="linha_enciclopedia highlight"><a href="/enciclopedia/res_busca.asp?rdo_tipo=1&pesquisa=1&edt_texto=' + g_pesq_objInput.val() +'">Pesquisar <B>' + g_pesq_objInput.val() +'</B> na <strong>Enciclop&eacute;dia</strong></a></li>');
		   	$(document.body).click(function() {g_pesq_posItem = -2; g_pesq_objBox.hide();	 });
			g_pesq_maxItem = g_pesq_objBox.find('li:not(li[class^="info"]):not(li[class^="fim"])').length;
			if (g_pesq_maxItem == 3)	{
				if(g_pesq_objBox.find('li:not(li[class^="info"]):not(li[class^="fim"]):eq(0)').text() =="Nenhum resultado. Que tal ver tudo?"){	
					g_pesq_objBox.find('li:not(li[class^="info"]):not(li[class^="fim"]):eq(0)').addClass("infocampo").hide();
					g_pesq_objBox.find('li:eq(0)').hide();
					g_pesq_maxItem--;
				}
			}
			g_pesq_objBox.show(100);
		});
	}
}
