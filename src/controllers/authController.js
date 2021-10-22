const soapRequest = require('easy-soap-request');

// Example data
const url = 'http://tests.mcash.rw/rwandatest/services/access?wsdl';
const sampleHeaders = {
  'Content-Type': 'text/xml;charset=UTF-8'
};

class authControler{
    static async auth(req,res){
        
            const xml = `<?xml version="1.0"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
xmlns:acc="http://access.webservices.cyclos.strohalm.nl/">
 <soapenv:Header/>
 <soapenv:Body>
 <acc:checkCredentials>
 <!--Optional:-->
 <params>
 <!--Optional:-->
 <principalType>USER</principalType>
 <!--Optional:-->
 <principal>yvesussd</principal>
 <!--Optional:-->
 <credentials>20255</credentials>
 </params>
 </acc:checkCredentials>
 </soapenv:Body>
</soapenv:Envelope>
`;
try{
 
// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml });
//   console.log(response.body);
   const xmlrep = `<?xml version="1.0"?>${response.body}`;
   res.header("Content-Type", "application/xml");
   res.status(200).send(xmlrep);

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