const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const rollup = require("gulp-better-rollup");
const del = require("del");
const plugins = require("gulp-load-plugins")();

const config = require("./config");
const postcssConfig = [require("autoprefixer")];
const option = { base: "src" };
const dist = __dirname + "/dist";
const renameFunc = function(path) {
    if (path.basename === "index") {
        path.basename = "index";
    }
};
const renameMinFunc = function(path) {
    path.basename += ".min";
};
const reloadFunc = function() {
    return browserSync.reload({
        stream: true
    });
};

gulp.task("build:js", function() {
    gulp.src("src/scripts/*.js", option)
        .pipe(rollup(config.rollupConfig.arg1, config.rollupConfig.arg2))
        .pipe(plugins.rename(renameFunc))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc())
        .pipe(plugins.uglify())
        .pipe(plugins.rename(renameMinFunc))
        .pipe(gulp.dest(dist));
});

gulp.task("build:scss", function() {
    gulp.src("src/styles/*.scss", option)
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(postcssConfig))
        .pipe(plugins.rename(renameFunc))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc())
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(renameMinFunc))
        .pipe(gulp.dest(dist));
});

gulp.task("build:html", function() {
    gulp.src(["src/htmls/*.html", "src/index.html"], option)
        .pipe(plugins.rename(renameFunc))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc());
});

gulp.task("build:asset", function() {
    gulp.src("src/assets/**/*", option)
        .pipe(
            plugins.rename(function(path) {
                if (path.basename === "favicon" && path.extname === ".ico") {
                    path.dirname = "";
                }
            })
        )
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc());
});

gulp.task("watch", function() {
    gulp.watch("src/scripts/**/*.js", ["build:js"]);
    gulp.watch("src/styles/**/*.scss", ["build:scss"]);
    gulp.watch(["src/htmls/**/*.html", "src/index.html"], ["build:html"]);
    gulp.watch("src/assets/**/*", ["build:asset"]);
});

gulp.task("server", function() {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 12,
        open: "external",
        host: "localhost",
        index: "index.html"
    });
});

gulp.task("clear", function(cb) {
    del(["dist/**/*"], cb);
});

gulp.task("release", ["build:js", "build:scss", "build:html", "build:asset"]);

gulp.task("default", ["release", "server", "watch"]);
