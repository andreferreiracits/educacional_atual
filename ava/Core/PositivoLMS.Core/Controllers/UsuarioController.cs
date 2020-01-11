using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PositivoFramework.Web.Mvc;
using PositivoFramework.Security;
using Microsoft.Web.Mvc;

namespace PositivoLMS.Core.Controllers
{
    [ControllerSessionState(ControllerSessionState.ReadOnly)]
    public class UsuarioController : CoreController
    {
        [HttpGet]
        [PositivoAuthorize]
        public ActionResult Foto(int IdUsuario)
        {
            if (IdUsuario >= 0)
            {
                string filename = Path.Combine(
                    ConfigurationManager.AppSettings["pathFotosUsuarios"],
                    String.Format(@"{0}\{1}\foto.jpg",
                        HttpContext.GetUserFlagsEscola().IdEscola,
                        IdUsuario));
                return new JpegThumbnailResult(filename);
            }
            return new JpegThumbnailResult(null);
        }

        


        [HttpGet]
        [PositivoAuthorize]
        public JsonResult GetLogin()
        {
            return Json(HttpContext.GetIdentity().strLogin, JsonRequestBehavior.AllowGet);
        }

    }
}
