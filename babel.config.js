const yargs = require('yargs').argv

module.exports  = function(api) {
    api.cache(true);

    const isTest = yargs['$0'].includes('jest')
    const isProduction = yargs.mode === 'production'

    const config = {
        plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-transform-runtime",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-optional-chaining"
        ],
        presets: [
            [
                "@babel/preset-env",
                {
                    modules: isTest && 'commonjs' || false
                }
            ],
            "@babel/preset-react"
        ]
    }

    isProduction && config.plugins.push([
        "react-remove-properties",
        {
            "properties": ['data-testid']
        }
    ])

    return config
}