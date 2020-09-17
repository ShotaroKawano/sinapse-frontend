module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
      },
      postcss: {
        plugins: [],
      },
    },
    extract: false,
  },
  // publicPath: process.env.NODE_ENV === "production" ? "/flowchart-vue" : "/"
  devServer: {
    proxy: {
      "http://127.0.0.1:8000/newsapp/": {
        target: "http://localhost:3000",
      }
    }
  }
};
