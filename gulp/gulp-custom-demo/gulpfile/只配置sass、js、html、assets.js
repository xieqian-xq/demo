const path = require("path");
const gulp = require("gulp");
const browserSync = require("browser-sync");
const del = require("del");
const plugins = require("gulp-load-plugins")();
const rollup = require("gulp-better-rollup");
const copy = require("copy");

const config = require("./config");
const postcssConfig = [require("autoprefixer")];
const option = { base: "src" };
const dist = __dirname + "/dist";
const renameFunc = function (path) {
    if (path.basename === "index") {
        path.basename = "index";
    }
};
const renameMinFunc = function (path) {
    path.basename += ".min";
};
const reloadFunc = function () {
    return browserSync.reload({
        stream: true
    });
};
const jsErrorFunc = err => {
    plugins.util.log(plugins.util.colors.red("[Error]"), err.toString());
};
const addTimestamp = file => {
    var contents = file.contents.toString();
    contents = contents.replace(/href=\".+?\.css/gi, function (res) {
        return res + "?" + config.uuid;
    });
    contents = contents.replace(/src=\".+?\.js/gi, function (res) {
        return res + "?" + config.uuid;
    });
    file.contents = Buffer.from(contents);
};

gulp.task("build:js", function () {
    gulp.src("src/scripts/*.js", option)
        .pipe(rollup(config.rollupConfig.arg1, config.rollupConfig.arg2))
        .on("error", jsErrorFunc)
        .pipe(plugins.rename(renameFunc))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc())
        .pipe(plugins.terser())
        .on("error", jsErrorFunc)
        .pipe(plugins.rename(renameMinFunc))
        .pipe(gulp.dest(dist));
});

gulp.task("build:scss", function () {
    gulp.src("src/styles/*.scss", option)
        .pipe(plugins.sass().on("error", plugins.sass.logError))
        .pipe(plugins.postcss(postcssConfig))
        .pipe(plugins.rename(renameFunc))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc())
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(renameMinFunc))
        .pipe(gulp.dest(dist));
});

gulp.task("build:html", function () {
    gulp.src(["src/htmls/*.html", "src/index.html"], option)
        .pipe(plugins.rename(renameFunc))
        .pipe(plugins.tap(addTimestamp))
        .pipe(gulp.dest(dist))
        .pipe(reloadFunc());
});

gulp.task("build:asset", function (cb) {
    gulp.src("src/assets/favicon.ico", option)
        .pipe(
            plugins.rename(function (path) {
                if (path.basename === "favicon" && path.extname === ".ico") {
                    path.dirname = "";
                }
            })
        )
        .pipe(gulp.dest(dist));
    copy("src/assets/**/*", path.join(dist, "assets"), function () {
        reloadFunc();
        cb();
    });
});

gulp.task("watch", function () {
    gulp.watch("src/scripts/**/*.js", ["build:js"]);
    gulp.watch("src/styles/**/*.scss", ["build:scss"]);
    gulp.watch(["src/htmls/**/*.html", "src/index.html"], ["build:html"]);
    gulp.watch("src/assets/**/*", ["build:asset"]);
});

gulp.task("server", function () {
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

gulp.task("clear", function (cb) {
    del(["dist/**/*"], cb);
});

gulp.task("release", ["build:js", "build:scss", "build:html", "build:asset"]);

gulp.task("default", ["release", "server", "watch"]);
