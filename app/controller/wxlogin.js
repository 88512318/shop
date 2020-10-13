'use strict';

const Controller = require('egg').Controller;
const appID="wx54012ba830323da8";
const appsecret="cf68d8ddddea78a4ca9c0e8c422be9b8";
const https = require('https');


class WxloginController extends Controller {
  async wxbase() {
    const { ctx } = this;
		let url="https://api.weixin.qq.com/sns/oauth2/access_token"
		+"?appid="+appID
		+"&secret="+appsecret
		+"&code="+ctx.query.code
		+"&grant_type=authorization_code"
		let res="";
		try
		{
			res= await this.get(url);
			let info=JSON.parse(res);
			if(!!info.openid)
			{
				ctx.session.openid=info.openid;
			}
		}
		catch(ex)
		{	}
		
		if(!!ctx.session.openid)
		{
			ctx.redirect("/public/wx/index.html");
		}
		else		
		{
			this.ctx.body ='<html><head><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /></head><body>'+res+'</body></html>';
		}
		
    
  }
	
	async get(url) {
			return new Promise((resolve,reject)=>{
			https.get(url,
			(req,res)=>{
				console.log(url);
					var data='';
					req.on('data',(chunk)=>{
						data+=chunk;
						console.log("on----data:"+data);
					});
					req.on('end',()=>{
						console.log("on----end");
						resolve(data);
					});
			});
		});
	}
	
	
	
}

module.exports = WxloginController;
