const {src, dest, watch, series} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();


// CSS Files
const cssFiles = [
    "./assets/vendors/lenis/lenis-latest.css",
    "./assets/vendors/swiper-js-11-2-4/swiper-bundle.min.css",
    "./assets/scss/main.scss",
]; 

// SASS Task For Style CSS
function scssTask(){
    return src(cssFiles, { sourcemaps: true})
    .pipe(sass())
    .pipe(concat(".bundle.css"))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("dist", {sourcemaps:'.'}))
}

// SCSS Task To Minified StyleCSS
function scssTaskMinified(){
    return src(cssFiles, { sourcemaps: true})
    .pipe(sass())
    .pipe(concat(".bundle.css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename("bundle.min.css"))
    .pipe(dest("dist", {sourcemaps:'.'}))
}

// JavaScipts Files
const jsFiles = [
    "./assets/vendors/jquery/jquery-3.7.1.min.js",
    "./assets/vendors/lenis/lenis-latest.min.js",
    "./assets/vendors/swiper-js-11-2-4/swiper-bundle.min.js",
    "./assets/vendors/gsap/gsap-3-12-7.min.js",
    "./assets/vendors/gsap/ScrollTrigger-3-12-7.min.js",
    "./assets/js/main.js",
]

// JavaScript Files
function jsTask(){
    return src(jsFiles, {sourcemaps: true})
    .pipe(concat("bundle.js"))
    .pipe(terser())
    .pipe(rename("bundle.min.js"))
    .pipe(dest("dist", {sourcemaps:'.'}))
}


// BrowserSync Launch Server
function browserSyncServe(callback) {
    browserSync.init({
        server: {
            baseDir: "."
        }   
    });
    callback();
}

// BrowserSync Reload The Server When Make Any Changes In code
function browserSyncReload(callback){
    browserSync.reload();
    callback();
}

function watchTask(){
    watch("*.html", browserSyncReload);
    watch(["assets/scss/**/*.scss", "assets/js/main.js"], 
        series(scssTask, scssTaskMinified, jsTask, browserSyncReload)
    );
}

// Export Tasks
exports.default = series(
    scssTask, scssTaskMinified, 
    jsTask, browserSyncServe, watchTask 
);
