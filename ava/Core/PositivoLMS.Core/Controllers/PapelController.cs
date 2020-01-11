using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PositivoLMS.DAL.DALInterface.MeuEspaco.DTO;
using AutoMapper;
using PositivoFramework.Infrastructure.Utils;
using PositivoFramework.Infrastructure.DAL.Factory;
using PositivoLMS.DAL.DALInterface.MeuEspaco;
using System.Collections;
using PositivoFramework.Web.Mvc;
using PositivoFramework.Web;
using PositivoFramework.Security;
using System.Configuration;
using PositivoLMS.Core.Properties;
using System.IO;
using PositivoFramework.Web.Session;
using PositivoFramework.Infrastructure;
using Microsoft.Web.Mvc;

namespace PositivoLMS.Core.Controllers
{
    [ControllerSessionState(ControllerSessionState.ReadOnly)]
    public class PapelController : CoreController
    {
        //private int IdPapel;
        //private int IdDominio;
        //private int IdUsuario;
        private IDictionary ctx;
        private IMeuEspacoDALService dal;

        private static List<int> intPapeisOK = new List<int>();
        // Inicializa a lista de papeis somente uma vez
        static PapelController()
        {
            intPapeisOK.Add(6210001);
            intPapeisOK.Add(3010001);
            intPapeisOK.Add(3030001);
            intPapeisOK.Add(1030001);//Aluno
        }


        [HttpGet]
        [PositivoAuthorize]
        public ActionResult IconeMeuEspaco()
        {
            return new JpegThumbnailMeuEspacoResult(FotoPath());
        }

        
        [HttpGet]
        [PositivoAuthorize]
        public ActionResult Foto()
        {
            return new JpegThumbnailResult(FotoPath());
        }

        private string FotoPath()
        {
            return  Path.Combine(
                   ConfigurationManager.AppSettings["pathFotosUsuarios"],
                   String.Format(@"{0}\{1}\foto.jpg",
                   HttpContext.GetUserFlagsEscola().IdEscola,
                   HttpContext.GetIdentity().IdUsuario));
        }

        private void InitVars()
        {
            
            ctx = SessionMapper.MapSession(System.Web.HttpContext.Current.Session);
            dal = ServiceFactory.GetService<IMeuEspacoDALService>(Resources.PapelDalService, ctx);
        }


        #region DTOS
        [Serializable]
        class PapelBoxDTO
        {
            public int IdPapel { get; set; }
            public string strNome { get; set; }
        }
        [Serializable]
        class UnidadeBoxDTO
        {
            public int IdUnidade { get; set; }
            public string strNome { get; set; }
        }
        [Serializable]
        class JSonDTO
        {
            public int intPapelCorrente { get; set; }
            public string strPapelCorrente { get; set; }

            public int intUnidadeCorrente { get; set; }
            public string strUnidadeCorrente { get; set; }

            public String strUltimoAcesso { get; set; }
            public String strNomePhoto { get; set; }
            public PapelBoxDTO[] papeis { get; set; }
            public UnidadeBoxDTO[] unidades { get; set; }
        }
        #endregion DTOS


        private string cacheKey_DataSource_PapelList = typeof(PapelController) + "_DataSource_PapelList-{0}-{1}";
        private string cacheKey_DataSource_UnidadeList = typeof(PapelController) + "_DataSource_UnidadeList-{0}";


        [PositivoAuthorize]
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult DataSource()
        {
            InitVars();
            


            Mapper.CreateMap<PapelDTO, PapelBoxDTO>().ForMember("strNome", opt => opt.MapFrom(f => f.IdPapel.ToString().StartsWith("10") ? "Aluno" : f.strNome));
            Mapper.CreateMap<UnidadeDTO, UnidadeBoxDTO>();
            DateTime dtmUltimoAcesso = dal.GetUltimoAcesso(GetIdUsuario());

            // **********************************************************************************************
            // Cache -->PapelBoxDTO[] papelList 
            // **********************************************************************************************
            string papelListCacheKey = string.Format(cacheKey_DataSource_PapelList, GetIdUsuario(), GetIdEscola());
            PapelBoxDTO[] papelList = null;
            if (GetPapelCorrente().Equals(5000001))// Outros
            {
                papelList = new PapelBoxDTO[]{ 
                                              new PapelBoxDTO{
                                                  IdPapel = 5000001,
                                                  strNome = "Funcionário(a)"
                                              }
                                          };
            }
            else
            {
                if (!PositivoCache.GetCache<PapelBoxDTO[]>(papelListCacheKey, out papelList, papelList))
                {
                    PapelDTO[] papelListDTO = dal.GetUsuarioPapel(GetIdUsuario(), GetIdEscola());
                    papelList = (from o in papelListDTO where intPapeisOK.Contains(o.IdPapel) select Mapper.Map<PapelDTO, PapelBoxDTO>(o)).ToArray<PapelBoxDTO>();
                    PositivoCache.SetCache(papelListCacheKey, papelList, int.Parse(Resources.CacheExpireTime));
                }
            }
            // **********************************************************************************************
            // Cache -->PapelBoxDTO[] papelList 
            // **********************************************************************************************


            // **********************************************************************************************
            // Cache --> UnidadeBoxDTO[] unidadeList
            // **********************************************************************************************
            /*
            string unidadeListCacheKey = string.Format(cacheKey_DataSource_UnidadeList, IdUsuario);
            UnidadeBoxDTO[] unidadeList = null;
            if (!PositivoCache.GetCache<UnidadeBoxDTO[]>(unidadeListCacheKey, out unidadeList, unidadeList))
            {
                UnidadeDTO[] unidadeListDTO = dal.GetUsuarioUnidade(IdUsuario);
                unidadeList = (from o in unidadeListDTO select Mapper.Map<UnidadeDTO, UnidadeBoxDTO>(o)).ToArray<UnidadeBoxDTO>();
                PositivoCache.SetCache(unidadeListCacheKey, unidadeList, int.Parse(Resources.CacheExpireTime));
            }
             */ 
            // **********************************************************************************************
            // Cache --> UnidadeBoxDTO[] unidadeList
            // **********************************************************************************************


            JSonDTO res = new JSonDTO()
            {
                intPapelCorrente = GetPapelCorrente(),
                strPapelCorrente = (from o in papelList where o.IdPapel == GetPapelCorrente() select o.strNome).FirstOrDefault(),
                intUnidadeCorrente = GetIdEscola(),
                strUnidadeCorrente = "",//(from o in unidadeList where o.IdUnidade == IdDominio select o.strNome).FirstOrDefault(),
                strUltimoAcesso = string.Format("Último acesso em {0:dd/MM/yyyy}", dtmUltimoAcesso.Date.ToShortDateString()),
                strNomePhoto = ConfigurationManager.AppSettings.Get("urlFotos"),
                unidades = null,//unidadeList,
                papeis = papelList
            };
            
            return Json(res);
        }





        
    }
}
