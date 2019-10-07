
/**
 * Returns the request normalized
 * @param {Request} req 
 */
normalizeRequest = (req)=> {
    return {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {})
    };
  }

/**
 * Returns the request language
 * @param {Request} req 
 */
getRequestLanguage =(req)=>{
    const acceptedLanguages = {
        en: true,
        es: true,
        pt: false,
    };
    const reqLang = acceptedLanguages[req.header('Accept-Language')];
    return reqLang ? reqLang : 'en';
}

module.exports ={
    normalizeRequest,
    getRequestLanguage,
}