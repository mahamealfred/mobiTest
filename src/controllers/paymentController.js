const soapRequest = require('easy-soap-request');
import mcashReference from '../helpers/mcashReferenceCode';
import {  decode } from "../helpers/jwtTokenizer";
const xml2js =require('xml2js');

// Example data
const url = 'http://tests.mcash.rw/rwandatest/services/payment?wsdl';
const sampleHeaders = {
  'Content-Type': 'text/xml'
};

class paymentControler{
    static async payement(req,res){
     // const { xml }=`<?xml version="1.0" encoding="UTF-8"?>${req.rawBody}`;
      //const xml =req.rawBody;
      try {
       const Token = req.headers["token"];
        const user = await decode(Token );
        const reqData={
          fromMemberPrincipalType:'USER',
          fromMember:user.user,
          toMemeberPrincipalType:'USER',
          toMember:'20000011_15',
          amount: req.body.amount,
          description:'Test Spring RSSB paymentSandBox',
          transferType: 134,
          mcashReference:mcashReference(),
          householdnid: req.body.householdnid,
          payername: req.body.payername,
          fiscal_year:req.body.fiscal_year
         }
         const xml=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
         xmlns:pay="http://payments.webservices.cyclos.strohalm.nl/">
          <soapenv:Header/>
          <soapenv:Body>
          <pay:doPayment>
          <!--Optional:-->
          <params>
          <fromMemberPrincipalType>${reqData.fromMemberPrincipalType}</fromMemberPrincipalType>
          <fromMember>${reqData.fromMember}</fromMember>
          <toMemberPrincipalType>${reqData.toMemeberPrincipalType}</toMemberPrincipalType>
          <toMember>${reqData.toMember}</toMember>
          <amount>${reqData.amount}</amount>
          <description>${reqData.description}</description>
          <transferTypeId>${reqData.transferType}</transferTypeId>
          <!--Optional:-->
          <credentials>?</credentials>
          <!--Zero or more repetitions:-->
          <customValues>
          <internalName>mcashreference</internalName>
          <value>${reqData.mcashReference}</value>
          </customValues>
         <customValues>
          <internalName>householdnid</internalName>
          <value>${reqData.householdnid}</value>
          </customValues>
          <customValues>
          <internalName>payername</internalName>
          <value>${reqData.payername}</value>
          </customValues>
          <customValues>
          <internalName>cf_fiscal_year</internalName>
          <value>${reqData.fiscal_year}</value>
          </customValues> 
          </params>
          </pay:doPayment>
          </soapenv:Body>
         </soapenv:Envelope>`

         const { response } = await soapRequest({
          url: url,
          headers: sampleHeaders,
          xml: xml,
        });
        const xmlresp = response.body;
        const { headers, body, statusCode } = response;
        // console.log(statusCode)
       // console.log(body)

        xml2js.parseString(body,async (err, result) => {
          if(err) {
              throw err;
          }
         const jsonString = JSON.stringify(result , null , 2);
          const jsonParser = JSON.parse(jsonString);
          //TO_NOT_FOUND
          //INVALID_PARAMETERS
          //console.log(jsonParser['soap:Envelope']['soap:Body'][0]['ns2:doPaymentResponse'][0].return[0]['status'][0])
          const checkResult=jsonParser['soap:Envelope']['soap:Body'][0]['ns2:doPaymentResponse'][0].return[0]['status'][0];
          if(checkResult=='PROCESSED'){
            // res.header("Content-Type", "application/xml");
          // return res.status(statusCode).send(xmlresp);
          return res.status(200).json({
            status: 200,
            message: "Successfully Payment",
            data: {
              user: user.user,
              Token,
            },
          });
          }
          else if(checkResult=='INVALID_PARAMETERS'){
            return res.status(403).json({
              status: 403,
              message: "Invalid Parameters ",
            });
          }
          else{
            return res.status(404).json({
              status: 404,
              message: "To Not Found",
            }); 
          }
        });

      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: "Server error::" + error.message,
        });
      }
     }
  
  }
export default paymentControler;