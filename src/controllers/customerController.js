
const https = require('http');
import request from "request";
 
const url = 'http://52.36.87.202/services/cbhi/citizenNidValidation.php?citizenNidNumber=1194880028990147&cbhiCollectionYear=2021';



function customerApi(req,res, callback) {
    try {
        request({ url: url, json:true}, (error, response)=>{
            if(error){
                return response.error
            }
            // callback();
            var data=response.body
          
            res.status(200).json({
                data:data
            });
            console.log(data)
        })
        
    } catch (error) {
        res.status(500).json({
          status:500,
          error: "Sever error " 
        });
    }
   
    
    
  }
  module.exports=customerApi;