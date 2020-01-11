using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PositivoFramework.Web.Mvc;
using Microsoft.Web.Mvc;

namespace PositivoLMS.Core.Controllers
{
    [ControllerSessionState(ControllerSessionState.Disabled)]
    public class ErroController : PositivoController
    {
        //
        // GET: /Erro/

        public ActionResult Show()
        {
            PositivoErrorDetail detail = new PositivoErrorDetail();
            string cookie = detail.GetElmahLastLogName(System.Web.HttpContext.Current);
            
            string erroUrlFormat = @"http://universitario.educacional.com.br/_restrito/LogErrosUnv/{0}";
            string erroUrl = "";
            string erroHtml = "A página não pode ser exibida.";

            string htmlFormat = @"<html><body>
                        A página não pode ser exibida.<br />
                        {0}<br />
                        <a href='{1}'>Ver Detalhes (Acesso Restrito)</a>
                        <br /><br /><br /><a href='{2}'>Voltar</a></body></html>";
            
            if (!string.IsNullOrEmpty(cookie))
            {
                erroUrl = string.Format(erroUrlFormat, cookie);
                erroHtml = string.Format(htmlFormat, cookie, erroUrl, Request.QueryString["aspxerrorpath"]);
            }

            return Content(erroHtml);
        }
    }
}
