const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const rollup = require("gulp-better-rollup");
const del = require("del");
const plugins = require("gulp-load-plugins")();

const rollupConfig = require("./config/rollup.config");
const postcssConfig = [require("autoprefixer")];
const option = { base: "src" };
const dist = __dirname + "/dist";
const renameFunc = function(path) {
    if (path.basename === "index") {
        path.basename = "xqtree";
    }
};
const renameMinFunc = function(path) {
    path.basename += ".min";
};
const reExtFunc = function(path) {
    path.extname += ".js";
};
const reloadFunc = function() {
    return browserSync.reload({
        stream: true
    });
};

gulp.task("build:ts", function() {
    gulp.src("src/scripts/*.ts", option)
        .pipe(rollup(rollupConfig.arg1Ts, rollupConfig.arg2))
        .pipe(plugins.rename(renameFunc))
        .pipe(plugins.rename(reExtFunc))
        .pipe(gulp.dest(dist))
        .pipe(plugins.uglify())
        .pipe(plugins.rename(renameMinFunc))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc());
});

gulp.task("build:js", function() {
    gulp.src("src/scripts/*.js", option)
        .pipe(rollup(rollupConfig.arg1, rollupConfig.arg2))
        .pipe(plugins.rename(renameFunc))
        .pipe(gulp.dest(dist))
        .pipe(plugins.uglify())
        .pipe(plugins.rename(renameMinFunc))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc());
});

gulp.task("build:scss", function() {
    gulp.src("src/styles/*.scss", option)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssConfig))
        .pipe(plugins.rename(renameFunc))
        .pipe(gulp.dest(dist))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(renameMinFunc))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc());
});

gulp.task("build:less", function() {
    gulp.src("src/styles/*.less", option)
        .pipe(plugins.less())
        .pipe(postcss(postcssConfig))
        .pipe(plugins.rename(renameFunc))
        .pipe(gulp.dest(dist))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(renameMinFunc))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc());
});

gulp.task("build:html", function() {
    gulp.src("src/htmls/*.html", option)
        .pipe(plugins.rename(renameFunc))
        .pipe(
            plugins.tap(function(file) {
                var contents = file.contents.toString();
                contents = contents.replace(/<link\s+rel="stylesheet"\s+href="(styles\/index.css)"\s+\/>/gi, function() {
                    return '<link rel="stylesheet" href="styles/xqtree.css"/>';
                });
                contents = contents.replace(/<script\s+src="(scripts\/index.js)"><\/script>/gi, function() {
                    return '<script src="scripts/xqtree.js"></script>';
                });
                file.contents = new Buffer(contents);
            })
        )
        .pipe(gulp.dest(dist))
        .pipe(plugins.minifyHtml())
        .pipe(plugins.rename(renameMinFunc))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc());
});

gulp.task("build:asset", function() {
    gulp.src("src/images/**/*.?(png|jpg|gif|ico)", option)
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
    gulp.watch("src/**/*.js", ["build:js"]);
    gulp.watch("src/**/*.ts", ["build:ts"]);
    gulp.watch("src/**/*.scss", ["build:scss"]);
    gulp.watch("src/**/*.less", ["build:less"]);
    gulp.watch("src/**/*.html", ["build:html"]);
    gulp.watch("src/images/**/*.?(png|jpg|gif|ico)", ["build:asset"]);
});

gulp.task("server", function() {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 12,
        open: "external",
        host: "localhost",
        index: "htmls/xqtree.html"
    });
});

gulp.task("clear", function(cb) {
    del(["dist/**/*"], cb);
});

gulp.task("release", ["build:ts", "build:js", "build:scss", "build:less", "build:html", "build:asset"]);

gulp.task("default", ["release", "server", "watch"]);
