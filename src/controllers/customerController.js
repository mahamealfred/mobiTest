
import axios from "axios";
import { decode } from "../helpers/jwtTokenizer";

async function customerApi(req, res) {
  try {
    //const { citizenNidNumber, cbhiCollectionYear } = req.query;
    const { citizenNidNumber, cbhiCollectionYear } = req.body;
    const url = `http://52.36.87.202/services/cbhi/citizenNidValidation.php?citizenNidNumber=${citizenNidNumber}&cbhiCollectionYear=${cbhiCollectionYear}`;

    const response = await axios.post(url);
    const data = response.data;
    const Token = req.headers["token"];
       const payload = await decode(Token);
          const { username } = payload;
         
            if (response.data.responseCode == 200) {
              //res.status(200).send(data);
              res.status(200).send({
                data,
                Token
              })
            } else {
              res.status(response.data.responseCode).send(data);
            }
         
   

    // or
    // res.status(response.data.responseCode).send({
    //     data
    // });
  } catch (error) {
    return res.status(500).json({ status: 500, error: "Sever error "+error.message });
  }
}
module.exports = customerApi;
