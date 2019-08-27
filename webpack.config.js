//Node 환경에서는 require를 쓰고 vue환경에서는 import 사용한다.
//vue의 버젼이랑 vue-template-compiler를 반드시 버전이 일치해야 한다.
// .vue 파일은 vue-loader가 처리한다.
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path"); //path는 노드가 만들어주는 절대경로 (node에서 제공하는 모듈)

//node의 모듈을 만든다. webpack이 webpack 처리할 때 사용한다. webpacking
module.exports = {
  mode: "development",
  devtool: "eval", //개발할 땐 eval , 배포할때는 hidden-source-map
  resolve: {
    extensions: [".js", ".vue"] //main.js에 NumberBaseball.vue를 import할 때 .vue를 없앨 수 있음
  },
  // 아래 4개가 필수이다 나머지는 부가요소
  /**
   *  entry : webpack의 목적인 script의 합체를 위해  script파일들 중 대표하는 파일
   */
  entry: {
    app: path.join(__dirname, "main.js") // app 은 하나로 합쳐질 파일의 이름. 나중에 script파일들이 app.js로 합쳐진다.
  },
  module: {
    //webpack 의 핵심
    // webpack은 javascript 파일만 합쳐준다 근데 NumberBaseball.vue 같이 js가 아닌 파일이 있으면 에러가 난다 이때
    // 필요한 것이 rules
    rules: [
      {
        // 합칠 때 100개가 됐든 수천개가 됐든 어떻게 합칠 지 처리할지 설정
        test: /\.vue$/, //파일명이 .vue 로 끝나느 파일
        use: "vue-loader" //loader를 use로 바꿔도됨
      }
    ]
  },
  plugins: [new VueLoaderPlugin()], //plugin에 이거 안넣어서 에러 났었음
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist") //dist 폴더가 생겨난다(distribution의 약어인데 임의로 dist라고 지은것임). /dist/app.js 여기서 path.join은 현재경로접근
  }
};
