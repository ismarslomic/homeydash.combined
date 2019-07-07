module.exports = {
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'homeydash.combined';
                args[0].meta = {
                    viewport: 'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
                    description: 'Homey Dashboard for iPad/iPhone/e-ink devices'
                };
                return args;
            })
    },
    pwa: {
        name: 'homeydash.combined',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/homeydash.combined/' : '/'
};
