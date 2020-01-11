function SpellCheck(pNomeCampoTexto,pFuncao,pParam)
{
	window.open("/SpellChecker/SpellChecker.asp?id=" + pNomeCampoTexto + "&funcao="+pFuncao+"&param="+pParam, "SpellCheck_educacional", "width=450,height=265,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no");
}

function SpellCheck(pNomeCampoTexto) 
{
	window.open("/SpellChecker/SpellChecker.asp?id=" + pNomeCampoTexto + "&funcao=&param=", "SpellCheck_educacional", "width=450,height=265,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no");
}