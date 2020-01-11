using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Web.Mvc;
using PositivoFramework.Web.Mvc;
using PositivoFramework.Security;
using PositivoFramework.Web.Session;
using System.Configuration;

namespace PositivoLMS.Core.Controllers
{
    [ControllerSessionState(ControllerSessionState.Required)]
    public class SPapelController : Controller
    {
        [HttpPost]
        [PositivoAuthorize]
        public ActionResult SetPapel()
        {
            String IdPapel = Request.Form["IdPapel"];
            String IdUnidade = Request.Form["IdUnidade"];
            String retorno = "";
            PositivoPrincipal user = HttpContext.GetPrincipal();
            if (user.IsInRole(IdPapel))
            {
                LegacySession legacy = new LegacySession(System.Web.HttpContext.Current, ConfigurationManager.AppSettings.Get("urlLegacySessionScript"));
                legacy["IdPapel"] = IdPapel;
                Session["IdPapel"] = IdPapel;

                //Log.LogDebug("PositivoLMS.Core", "SetPapel [" + ConfigurationManager.AppSettings.Get("urlLegacySessionScript") + "] [" + legacy["IdPapel"] + "]");

                retorno = IdPapel;
            }
            else
            {
                retorno = Session["IdPapel"].ToString();
            }

            return Content(retorno);
        }

    }
}
