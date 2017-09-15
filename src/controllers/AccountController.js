const User = require('../models/User');

const AccountController = {

	register_get: async function(ctx){	
		await ctx.render('account/register', { title: 'Register',csrf: ctx.csrf, errors: ctx.errors});
	},

	register_post: async function(ctx){
	
		const pwd = ctx.request.body.password;
		ctx.checkBody('email').isEmail('Invalide email.');
		ctx.checkBody('password').notEmpty().len(6,20).md5();
		ctx.checkBody('confirmPassword').eq(pwd, 'Password not identical.');
		if(ctx.errors)
			await ctx.render('account/register', { title: 'Register', csrf: ctx.csrf, errors: JSON.stringify(ctx.errors)});
		else{
			const user = new User();
			user.username = ctx.request.body.email;
			user.password = ctx.request.body.password;
			user.save(function (err) {
			  if (err) {
			    console.log(err);
			    throw error;
			  } else {
			     ctx.redirect('/account', {title: 'account'});
			  }
			});
		}
	},

	login_get: async function(ctx){
		await ctx.render('account/login', { title: 'Login', csrf: ctx.csrf, flash: JSON.stringify(ctx.session)});
	},

	login_post: async function(ctx){
		console.log("body parsing", ctx.session.message);
		
	},

	logout_get: async function(ctx){
		ctx.logout();
		ctx.redirect('/');
	},

	forgotpassword_get: async function(ctx){
		await ctx.render('account/forgotpassword', { title: 'Forgot Password'});
	},

	resetpassword_get: async function(ctx){
		await ctx.render('account/resetpassword', { title: 'Reset Password'});
	},

	index_get: async function (ctx) {
		if (ctx.isAuthenticated()) {
	    	await ctx.render('account/index', { title: 'Account'});
	  	} else {
	    	ctx.redirect('/login');
	    }	
	}

};

module.exports = AccountController;