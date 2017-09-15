const HomeController = {
    index: async function(ctx) {
        await ctx.render('home/index', {
            title: 'Home'
        });
    },

    
};

module.exports = HomeController;