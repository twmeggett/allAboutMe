/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", // Ensures assets are loaded from the root path
    clean: true, // Clean the output directory before emitting new files
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    compress: true,
    port: 8080,
    open: false,
    historyApiFallback: true, // For React Router support
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Requiem",
      template: "./src/index.html",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "server", // Generates a static HTML file with the bundle report
      openAnalyzer: false, // Automatically open the report in the browser
      // reportFilename: 'bundle-report.html', // Name of the generated report file
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      fix: true, // Automatically fix linting errors when possible
      overrideConfigFile: path.resolve(__dirname, "eslint.config.mjs"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                // Allows using .module.css for modules and .css for global
                auto: true,
                // Customizes the generated class names (useful for debugging)
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              sourceType: "unambiguous", // Automatically detects ESM vs CJS
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jpg|jpeg|png|gif$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@Components": path.resolve(__dirname, "src/components/"), // Alias for components directory
      "@Pages": path.resolve(__dirname, "src/pages/"), // Alias for pages directory
      "@Layouts": path.resolve(__dirname, "src/layouts/"), // Alias for layouts directory
      "@Hooks": path.resolve(__dirname, "src/hooks/"), // Alias for hooks directory
    },
  },
};
