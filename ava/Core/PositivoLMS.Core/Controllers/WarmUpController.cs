using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Web.Mvc;

namespace PositivoLMS.Core.Controllers
{
    [ControllerSessionState(ControllerSessionState.Disabled)]
    public class WarmUpController : Controller
    {
        //
        // GET: /WarmUp/

        public ActionResult Index()
        {
            return Content("OK");
        }

    }
}
