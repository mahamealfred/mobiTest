//import soap from "soap";

const js2xmlparser = require("js2xmlparser");
import soapRequest from "easy-soap-request";
import { encode } from "../helpers/jwtTokenizer";
// import soap  from "node-soap";
import dotenv from "dotenv";
const soap = require("soap");
const xml2js = require("xml2js");
const parseString = require("xml2js-parser").parseString;

const url = "http://tests.mcash.rw/rwandatest/services/access?wsdl";
const sampleHeaders = {
  "Content-Type": "text/xml",
};

class authenticationContrroler {
  static async auth(req, res) {
    try {
      //const {username, pin } =req.body
      const myData = {
        username: req.body.username,
        pin: req.body.pin,
        principalType: "USER",
      };
      const xmlData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
        xmlns:acc="http://access.webservices.cyclos.strohalm.nl/">
         <soapenv:Header/>
         <soapenv:Body>
         <acc:checkCredentials>
         <!--Optional:-->
         <params>
         <!--Optional:-->
         <principalType>${myData.principalType}</principalType>
         <!--Optional:-->
         <principal>${myData.username}</principal>
         <!--Optional:-->
         <credentials>${myData.pin}</credentials>
         </params>
         </acc:checkCredentials>
         </soapenv:Body>
        </soapenv:Envelope>`;

      // const xmlData=js2xmlparser.parse("Body",args)
      //const xml= xmlData.body
      // console.log(xmlData)

      const { response } = await soapRequest({
        url: url,
        headers: sampleHeaders,
        xml: xmlData,
      });
      //const xmlresp = response.body;
      const { headers, body, statusCode } = response;
      // return res.status(statusCode).send(xmlresp);
      //const xmlresp=`<?xml version="1.0" encoding="utf-8"?>${response.body}`
      //const { headers, body, statusCode } = response;
      xml2js.parseString(body, async (err, result) => {
        if (err) {
          throw err;
        }
        const jsonString = JSON.stringify(result, null, 2);
        const jsonParser = JSON.parse(jsonString);
        // console.log(jsonParser['soap:Envelope']['soap:Body'][0]['ns2:checkCredentialsResponse'][0].return[0])
        const checkResponse =
          jsonParser["soap:Envelope"]["soap:Body"][0][
            "ns2:checkCredentialsResponse"
          ][0].return[0];
        if (checkResponse == "VALID") {
          // res.header("Content-Type", "application/xml");
          // return res.status(statusCode).send(xmlresp);
          const user = myData.username;
          const token = await encode({ user });
          return res.status(200).json({
            status: 200,
            message: "User authenticated with Token",
            data: {
              user: user,
              token,
            },
          });
        } else {
          return res.status(403).json({
            status: 403,
            message: "Please check your credentiols ",
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
export default authenticationContrroler;
