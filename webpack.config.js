"use strict";
const path = require("path");
const { exec } = require("child_process");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SizePlugin = require("size-plugin");
const TerserPlugin = require("terser-webpack-plugin");

function compileStylusCommand(mode) {
  return (
    "stylus ./src/*.styl --out ./dist/" +
    (mode === "production" ? " --compress" : " -m")
  );
}

module.exports = (env, argv) => ({
  devtool: "sourcemap",
  stats: "errors-only",
  entry: {
    "refined-hacker-news": "./src/refined-hacker-news",
    background: "./src/background",
    popup: "./src/popup",
    "custom-css": "./src/custom-css",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new SizePlugin(),
    new CopyWebpackPlugin([
      {
        from: "*",
        context: "src",
        ignore: ["*.js", "*.styl"],
      },
      {
        from: "node_modules/webextension-polyfill/dist/browser-polyfill.min.js",
      },
    ]),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", () => {
          exec(compileStylusCommand(argv.mode), (err, stdout, stderr) => {
            if (stdout) {
              process.stdout.write(stdout);
            }

            if (stderr) {
              process.stderr.write(stderr);
            }
          });
        });
      },
    },
  ],
  resolve: {
    extensions: [".js"],
  },
  optimization: {
    // Without this, function names will be garbled and enableFeature won't work
    concatenateModules: true,

    // Automatically enabled on production; keeps it somewhat readable for AMO reviewers
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: false,
          compress: false,
          output: {
            beautify: true,
            indent_level: 2, // eslint-disable-line camelcase
          },
        },
      }),
    ],
  },
});
