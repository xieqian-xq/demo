module.exports = function(api) {
    api.cache(true);

    const presets = [
        [
            "@babel/env",
            {
                targets: {
                    chrome: 58,
                    ie: 11
                },
                useBuiltIns: "usage",
                modules: false,
                corejs: 2
            }
        ]
    ];
    const plugins = [];

    return {
        presets,
        plugins
    };
};
