const TestController = {
    index: async function(ctx) {

        await ctx.render('test/index', {
            title: 'Test'
        });
    },

};

module.exports = TestController;
