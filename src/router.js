const passport = require('./auth');
const Router = require('koa-router');
const HomeController = require('./controllers/HomeController');
const AccountController = require('./controllers/AccountController');
const TestController = require('./controllers/TestController');

const auth = passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login',
    failureFlash: true
});

const publicRouter = new Router();

publicRouter
    .get('/', HomeController.index)
    .get('/register', AccountController.register_get)
    .post('/register', AccountController.register_post)
    .get('/login', AccountController.login_get)
    .post('/login', auth, AccountController.login_post)
    .get('/logout', AccountController.logout_get)
    .get('/forgotpassword', AccountController.forgotpassword_get)
    .get('/resetpassword', AccountController.resetpassword_get)
    .get('/account', AccountController.index_get)
    .get('/auth/facebook', passport.authenticate('facebook'))
    .get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/app',
        failureRedirect: '/'
    }))
    .get('/auth/twitter', passport.authenticate('twitter'))
    .get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/app',
        failureRedirect: '/'
    }))
    .get('/auth/google', passport.authenticate('google'))
    .get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/app',
        failureRedirect: '/'
    }))

    .get('/test', TestController.index);

// Secured routes
const securedRouter = new Router();
// Middlewire: authed
async function authed(ctx, next) {
    if (ctx.req.isAuthenticated())
        await next();
    else {
        ctx.session.returnTo = ctx.session.returnTo || ctx.req.url;
        ctx.redirect('/login');
    }
}

securedRouter.get('/app', authed, async function() {
    ctx.body = 'SECURED ZONE.';
});

module.exports = {
    publicRouter: publicRouter,
    securedRouter: securedRouter
};
