const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

const postcssOption = [autoprefixer];
const browserSyncOption = {
	server: "src/"
};

gulp.task("html", () => {
	return gulp
		.src("dev/**/*.html")
		.pipe(gulp.dest("src/"));
})

gulp.task("sass", () => {
	return gulp
		.src("dev/**/*.scss")
		.pipe(sass({ outputStyle: "expanded" }))
		.pipe(postcss(postcssOption))
		.pipe(gulp.dest("src/css"));
})

gulp.task("serve", done => {
	browserSync.init(browserSyncOption);
	done();
})

gulp.task("watch", (done) => {
	const browserReload = (done) => {
		browserSync.reload();
		done();
	}
	gulp.watch("dev/**/*.html", gulp.series("html"));
	gulp.watch("dev/**/*.scss", gulp.series("sass"));
	gulp.watch("src/", browserReload);
})

gulp.task("default", gulp.series("serve", "watch"));