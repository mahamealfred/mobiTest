import axios from "axios";

class abcController {
  static async getAllabc(req, res) {
    try {
      await axios.get("http://time.jsontest.com").then((resp) => {
        console.log(resp.data);
        const data=resp.data
         
        const date=data.date;
        const milseco=data.milliseconds_since_epoch
        const time=date.time
        
        console.log("date:", date)
        console.log("milse:", milseco)
       return res.status(200).json({
            status:200,
            data: data,
        });
      });
  
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Server error:" + error.message,
      });
    }
  }
}
export default abcController;
