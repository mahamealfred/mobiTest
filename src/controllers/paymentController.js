const soapRequest = require('easy-soap-request');

// Example data
const url = 'http://tests.mcash.rw/rwandatest/services/payment?wsdl';
const sampleHeaders = {
  'Content-Type': 'text/xml;charset=UTF-8'
};

class paymentControler{
    static async payement(req,res){
        
            const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
            xmlns:pay="http://payments.webservices.cyclos.strohalm.nl/">
             <soapenv:Header/>
             <soapenv:Body>
             <pay:doPayment>
             <!--Optional:-->
             <params>
             <fromMemberPrincipalType>USER</fromMemberPrincipalType>
             <fromMember>agenttest</fromMember>
             <toMemberPrincipalType>USER</toMemberPrincipalType>
             <toMember>20000011_15</toMember>
             <amount>19800</amount>
             <description>Test Spring RSSB paymentSandBox</description>
             <transferTypeId>143</transferTypeId>
             <!--Optional:-->
             <credentials>?</credentials>
             <!--Zero or more repetitions:-->
             <customValues>
             <internalName>mcashreference</internalName>
             <value>3746982346</value>
             </customValues>
            <customValues>
             <internalName>householdnid</internalName>
             <value>1199880044512077</value>
             </customValues>
             <customValues>
             <internalName>payername</internalName>
             <value>Yves NGABONZIZA</value>
             </customValues>
             <customValues>
             <internalName>cf_fiscal_year</internalName>
             <value>2021</value>
             </customValues> 
             </params>
             </pay:doPayment>
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
export default paymentControler;