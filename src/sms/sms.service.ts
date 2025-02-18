import { Injectable } from '@nestjs/common';
const FormData=require("form-data")
import axios from "axios"
@Injectable()
export class SmsService {
  async sendSms(phone_number: string, otp: string) {
    const data = new FormData();
    data.append("mobile_phone", phone_number);
    data.append("message", "Bu Eskiz dan test");
    data.append("from", "4546");
    console.log(process.env.SMS_SERVICE_URL);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.SMS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
      data: data,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }



  async refreshToken(token:string) {
    

  }


  async getToken(email:string,password:string) {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://notify.eskiz.uz/api/auth/login",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
  try {
    const response = await axios(config)
    return response.data.data.token;
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
  }

}
