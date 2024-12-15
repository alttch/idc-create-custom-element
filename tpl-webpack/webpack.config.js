const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "%NAME%.js",
    libraryTarget: "umd",
    library: "idce_%NAME%"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "@eva-ics/webengine": "EvaWE",
    "@eva-ics/webengine-react": "EvaWER",
  },
  mode: "production"
};
