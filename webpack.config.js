const autoprefixer = require("autoprefixer");
const path = require("path");

module.exports = [
  {
    mode: "development",
    entry: ["./src/app.scss", "./src/app.js"],
    output: {
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: [path.resolve(__dirname, "src")],
          use: [
            {
              loader: "file-loader",
              options: {
                name: "bundle.css"
              }
            },
            { loader: "extract-loader" },
            { loader: "css-loader" },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [autoprefixer()]
              }
            },
            {
              loader: path.resolve("src/loader/sassload.js"),
              options: {
                includePaths: ["./node_modules"]
              }
            }
          ]
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-env"]
          }
        }
      ]
    }
  }
];
