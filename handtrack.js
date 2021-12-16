console.log(handTrack);

const video = document.getElementById("myvideo");
const canvas = document.getElementById("mycanvas");
let model;

const options = {
  flipHorizontal: false, //水平方向反転
  maxNumBoxes: 3, //検出ボックスの最大数
  scoreThreshold: 0.7, //予測信頼度のしきい値
};

let context = canvas.getContext("2d");

handTrack.load(options).then(function (modelData) {
  model = modelData;
  console.log(model);

  //webカメラを起動する
  handTrack.startVideo(video).then(function (status) {
    if (status) {
      console.log(status);
      startDetection();
    } else {
      console.log("failed");
    }
  });
});

function startDetection() {
  model.detect(video).then((predections) => {
    model.renderPredictions(predections, canvas, context, video);

    //「手」の検出と結果の出力を繰り返し実行する
    requestAnimationFrame(startDetection);
  });
}
