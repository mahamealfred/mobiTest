const soapRequest = require('easy-soap-request');

const url = 'http://tests.mcash.rw/rwandatest/services/access?wsdl';
const sampleHeaders = {
  'Content-Type': 'text/xml'
};

class authControler{
  static async auth(req,res){
     //const xml=`<?xml version="1.0" encoding="UTF-8"?>${req.rawBody}`;
   // const xml=req.body;
    const xml=req.rawBody

try{

(async () => {
  try {
    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml });
      //const xmlresp=`<?xml version="1.0" encoding="utf-8"?>${response.body}`
      const xmlresp=response.body
         const {
            headers,
            body,
            statusCode
        } = response;
       res.header("Content-Type", "application/xml");
       res.status(statusCode).send(xmlresp);

  } catch (error) {
    console.log(error)
  }

})();
          
      } catch (error) {
          return res.status(404).json({
              status:404,
              message:error.message
          });
          
      }
  }

}
export default authControler;