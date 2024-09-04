import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import sassGlob from "gulp-sass-glob";
import server from "gulp-server-livereload";
import clean from "gulp-clean";
import fs from "fs";
import sourceMaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import csso from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: `Error <%= error.message %>`,
      sound: false,
    }),
  };
};

gulp.task("clean", function (done) {
  if (fs.existsSync("./src/css/")) {
    return gulp.src("./src/css/", { read: false }).pipe(clean());
  }
  done();
});

gulp.task("cleanProd", function (done) {
  if (fs.existsSync("./dist/")) {
    return gulp.src("./dist/", { read: false }).pipe(clean());
  }
  done();
});

gulp.task("sass", function () {
  return (
    gulp
      .src("./src/sass/*.scss")
      .pipe(plumber(plumberNotify("SCSS")))
      .pipe(sourceMaps.init())
      // .pipe(autoprefixer())
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(csso())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest("./src/css"))
  );
});

gulp.task("sassProd", function () {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(plumber(plumberNotify("SCSS")))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("sasslibs", function () {
  return gulp.src("./src/sass/libs/*.scss").pipe(sass()).pipe(csso()).pipe(gulp.dest("./src/css"));
});

gulp.task("sasslibsProd", function () {
  return gulp.src("./src/sass/libs/*.scss").pipe(sass()).pipe(csso()).pipe(gulp.dest("./dist/css"));
});

gulp.task("htmlProd", function () {
  return gulp.src("./src/*.html").pipe(gulp.dest("./dist/"));
});

gulp.task("assetsProd", function () {
  return gulp.src("./src/assets/**/*", { encoding: false }).pipe(gulp.dest("./dist/assets"));
});

gulp.task("jsProd", function () {
  return gulp.src("./src/js/**/*", { encoding: false }).pipe(gulp.dest("./dist/js"));
});

gulp.task("server", function () {
  return gulp.src("./src/").pipe(
    server({
      livereload: true,
      open: true,
    })
  );
});

gulp.task("watch", function () {
  gulp.watch("./src/sass/**/*.scss", gulp.parallel("sass"));
  gulp.watch("./src/sass/**/*.scss", gulp.parallel("sasslibs"));
});

gulp.task(
  "default",
  gulp.series("clean", gulp.parallel("sass", "sasslibs"), gulp.parallel("watch", "server"))
);

gulp.task(
  "prod",
  gulp.series(
    "cleanProd",
    gulp.parallel("sassProd", "sasslibsProd", "htmlProd", "assetsProd", "jsProd")
  )
);
