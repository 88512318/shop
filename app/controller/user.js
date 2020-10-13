'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
	
	//登录
  async login() {
		const username=this.ctx.request.body.username;
		const password=this.ctx.request.body.password;	
		
		//参数化，防止SQL注入
		const sql="select id,username,xm,dh,dw,js from user where username=? and password=?";
		const userData=await this.app.mysql.query(sql, [username,password]);
		
		if(userData.length>0)
		{
			this.ctx.session.user = userData[0]; 
			this.ctx.body = {code:0,msg:"登录成功"};
		}
		else
		{
			this.ctx.session.user = ""; 
			this.ctx.body = {code:-1,msg:"登录失败"};
		}
  }
	
	//注销
	async logout() {
		this.ctx.session.user = "";
		this.ctx.body = {code:0,msg:"已注销"};
	}
	
	//获取当前用户信息
	async whoami() {				
		if(!this.ctx.session.user)
		{
			this.ctx.body = {code:-2,msg:"未登录"};
		}
		else
		{
			this.ctx.body = {code:0,user:this.ctx.session.user};
		}
	}
}
module.exports = UserController;
