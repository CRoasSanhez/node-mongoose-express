
let BaseResponse = {
    success : undefined,
    code    : undefined,
    message : undefined,
    data    : undefined,
    error   : undefined,
}

/**
 * Returns the error for the incoming object
 * @param {Object} obj 
 */
const GetErrorForResponse = (obj)=>{
    if( obj instanceof Error ){
        return obj;
    }else{
        return obj.error;
    }
}

/**
 * 
 * @param {Object} resp 
 * @param {Number} code 
 * @param {Serializer} SerializerType
 */
const ResponseService =(resp, code,serializer)=>{
    BaseResponse.code       = code;
    BaseResponse.message    = 'NOT IMPLEMENTED i18n ERROR'

    // If incoming response is Error or not nuccess
    if( resp instanceof Error || !resp.success ){
        BaseResponse.success    = false;
        BaseResponse.error      = GetErrorForResponse(resp)
    }else{
        BaseResponse.success    = true;
        BaseResponse.data       = serializer? resp:resp;
    }
}

module.exports = {
    ResponseService
}