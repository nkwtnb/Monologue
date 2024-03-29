const mix = require('laravel-mix');
const path = require("path");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/index.tsx', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .alias({
        '@img': path.join(__dirname, 'resources/img'),
        '@interface': path.join(__dirname, 'resources/js/interface'),
        '@api': path.join(__dirname, 'resources/js/api'),
    })
    ;