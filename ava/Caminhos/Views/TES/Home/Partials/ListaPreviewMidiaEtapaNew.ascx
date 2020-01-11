<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<%
string embed = "";
string larguraVideo = "210";
string alturaVideo = "158";
int tipo = Convert.ToInt32(ViewData["tipoVideo"]);
string idMidia = ViewData["idMidia"].ToString();
string tempo = "";

if (idMidia.Contains("#t=") || idMidia.Contains("&t=") || idMidia.Contains("?t="))
{
    #region tempoVideo
    //Jogar para utils
    {
        try
        {
            if (!String.IsNullOrEmpty(idMidia))
            {
                if (idMidia.ToLower().IndexOf("t=") > 1)
                {
                    tempo = idMidia.Split(new string[] { "t=" }, StringSplitOptions.RemoveEmptyEntries).Last().ToLower();
                    if (tempo.ToLower().IndexOf("m") > 0)
                    {
                        //Tem minutos
                        var partes = tempo.Split('m');
                        int inicioMin;
                        int inicioSec;

                        if (int.TryParse(partes[0], out inicioMin))
                        {
                            if (inicioMin > 0)
                                inicioMin = inicioMin * 60; //transformando em segundos
                        }
                        else
                            inicioMin = 0;

                        if (partes.Length > 1)
                        {
                            //Possui segundos
                            if (int.TryParse(partes[1].Replace("s", ""), out inicioSec))
                            {
                                inicioMin += inicioSec;
                            }
                            else
                                inicioSec = 0;
                        }

                        tempo = inicioMin.ToString();

                    }
                    else
                    {
                        //Só tem segundos
                        tempo = tempo.Replace("s", "");
                    }                    

                }
            }
        }
        catch
        {
            tempo = String.Empty;
        }
    }
    #endregion
    idMidia = idMidia.Substring(0, idMidia.LastIndexOf("t=") - 1);
}

switch (tipo)
{
    case 1:
        {//Youtube 
            if (!String.IsNullOrEmpty(tempo))
                tempo = "&start=" + tempo;
            embed = "<iframe id=\"iframeTarefaId\" width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" src=\"http://www.youtube.com/embed/" + idMidia + "?autoplay=0&wmode=transparent" + tempo + "\" frameborder=\"0\" allowfullscreen></iframe>";
        } break;
    case 2:
        { //Vimeo
            if (!String.IsNullOrEmpty(tempo))
                tempo = "?player_id=previewMidia&api=1#t=" + tempo;
            embed = "<iframe id=\"iframeTarefaId\" class=\"iframeVideoVimeo\" src=\"http://player.vimeo.com/video/" + idMidia + tempo + "\" width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>";
        } break;
    case 3:
        { //Globo
            embed = "<object width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" data=\"http://s.videos.globo.com/p2/player.swf\" type=\"application/x-shockwave-flash\"><param value=\"true\" name=\"allowFullScreen\"><param value=\"http://s.videos.globo.com/p2/player.swf\" name=\"movie\" /><param value=\"high\" name=\"quality\" /><param value=\"midiaId=" + idMidia + "&autoStart=false&width=" + larguraVideo + "&height=" + alturaVideo + "\" name=\"FlashVars\" /></object>";
            //embed = "<object width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\"><param value=\"http://s.videos.globo.com/p2/player.swf\" name=\"movie\" /><param value=\"high\" name=\"quality\" /><param value=\"midiaId=" + idMidia + "&autoStart=false&width=" + larguraVideo + "&height=" + alturaVideo + "\" name=\"FlashVars\" /><embed width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" type=\"application/x-shockwave-flash\" src=\"http://s.videos.globo.com/p2/player.swf\"></embed></object>";
        } break;
}

Response.Write(embed);
%>
           