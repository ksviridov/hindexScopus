
const yargs = require('yargs').argv
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // shell template autogeneration
const WebpackRequireFrom = require('webpack-require-from') // use to build dynamic modules CDN path
const CircularDependencyPlugin = require('circular-dependency-plugin')
const bodyParser = require('body-parser')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
const webpack = require('webpack')

const react_path = path.resolve('./resources/react')
const apps_path = path.resolve(`${react_path}/components`)
const outpug_path = path.resolve('./public/view')
const app_name = yargs.app

if (app_name && !fs.existsSync(`${apps_path}/${app_name}`))
    throw new Error(`No such app as ${app_name}`)

const mode = process.env.NODE_ENV = yargs.mode || 'development'

const hot = yargs['$0'].includes('webpack-dev-server')

if (hot && !app_name)
    throw new Error("App name should be provided with hot reload feature using --app argument like: --app=testApp")
    
const entry = app_name ?
    `${apps_path}/${app_name}/src/index.js` :
    Object.assign(
        {},
        ...glob.sync('@(*|!chunks)', { cwd: apps_path })
        .map(app => (fs.existsSync(`${apps_path}/${app}/src/index.js`) && { [app]: `${apps_path}/${app}/src/index.js`}))
)

const bundle_file = 'bundle.js'
const output = {
    path: `${outpug_path}`,
    filename: `${app_name || '[name]'}/${bundle_file}`,
    publicPath: '/',
    chunkFilename: 'chunks/[id].[chunkhash].js'
}

const HtmlWebpackPluginOptionsFactory = app => Object.assign(
    {
        inject: false,
        template: `pug-loader!${react_path}/template.pug`,
        normalizeCss: fs.readFileSync(path.resolve(__dirname, 'node_modules/normalize.css/normalize.css')),
        hot,
        app: `./${bundle_file}`,
        meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        }
    }, hot ?
    {
        inject: true
    } :
    {
        filename: `${outpug_path}/${app}/index.html`
    }
)

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["chunks/*"] }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: process.cwd(),
    }),
      ...(typeof entry == 'string' ? [app_name] : Object.keys(entry))
          .map(app => new HtmlWebpackPlugin(HtmlWebpackPluginOptionsFactory(app)))
]

!hot && plugins.push(
    new WebpackRequireFrom({
      variableName: 'window.staticsURL' // Used to dynamically pull static files
    })
)

module.exports = {
    mode,
    entry,
    output,
    plugins,
    module: {
        rules: [            
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader', 
                    {
                        loader: 'eslint-loader',
                        options: {
                            quiet: true
                        }
                    }
                ],        
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader', 
                    'ts-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            quiet: true
                        }
                    }
                ], 
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            utils: path.resolve(react_path, './utils.ts'),
            ui: path.resolve(react_path, 'ui'),
            root: path.resolve(react_path),
            components: path.resolve(react_path, 'components'),
            theme: path.resolve(react_path, 'ui/theme/index.ts')
        }
    },
    externals: hot && {} || {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    devServer: {
        contentBase: './',
        hot: true,
        overlay: true,
        disableHostCheck: true,
        historyApiFallback: true,
        before(app) {
            const mock = fs.existsSync(`${apps_path}/${app_name}/mock.js`) && require(`${apps_path}/${app_name}/mock.js`)
  
            mock && Object.entries(mock).map(
                ([method, paths]) => Object.entries(paths).map(([path, mock]) =>
                    app[method](path, bodyParser.json(), (req, res) => setTimeout(() => res.json(mock(req)), 10 /* artificial delay */))
                )
            )
        }
    }
};