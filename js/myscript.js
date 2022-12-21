// inview.js
// https://github.com/protonet/jquery.inview /で対応
$('.scroll').on('inview', function () { // .sxrollが表示されたら
    $(this).addClass('active'); //処理を記述
});

//slick kvのスライド
$(function() {
  $('.slider').slick({
    autoplay: true,//自動でスライドさせる
    autoplaySpeed: 0,//次の画像に切り替えるまでの時間 今回の場合は0
    speed: 13000,//画像が切り替わるまでの時間 今回の場合は何秒で1枚分動くか
    cssEase: 'linear',//動きの種類は等速に
    arrows:false,//左右に出る矢印を非表示
    swipe: false,//スワイプ禁止
    pauseOnFocus: false,//フォーカスが合っても止めない
    pauseOnHover: false,//hoverしても止めない
    centerMode: true,//一枚目を中心に表示させる
    initialSlide: 3,//最初に表示させる要素の番号を指定
    variableWidth: true,//スライドの要素の幅をcssで設定できるようにする 
    slidesToShow: 8,
  });
  $('.works-slider').slick({
    autoplay: true,//自動でスライドさせる
    autoplaySpeed: 0,//次の画像に切り替えるまでの時間 今回の場合は0
    speed: 13000,//画像が切り替わるまでの時間 今回の場合は何秒で1枚分動くか
    cssEase: 'linear',//動きの種類は等速に
    arrows:false,//左右に出る矢印を非表示
    swipe: false,//スワイプ禁止
    pauseOnFocus: false,//フォーカスが合っても止めない
    pauseOnHover: false,//hoverしても止めない
    centerMode: true,//一枚目を中心に表示させる
    initialSlide: 3,//最初に表示させる要素の番号を指定
    variableWidth: true,//スライドの要素の幅をcssで設定できるようにする 
    slidesToShow: 5,
  });
  $('.slider-reverse').slick({
    autoplay: true,//自動でスライドさせる
    autoplaySpeed: 0,//次の画像に切り替えるまでの時間 今回の場合は0
    speed: 13000,//画像が切り替わるまでの時間 今回の場合は何秒で1枚分動くか
    cssEase: 'linear',//動きの種類は等速に
    arrows:false,//左右に出る矢印を非表示
    swipe: false,//スワイプ禁止
    pauseOnFocus: false,//フォーカスが合っても止めない
    pauseOnHover: false,//hoverしても止めない
    centerMode: true,//一枚目を中心に表示させる
    initialSlide: 3,//最初に表示させる要素の番号を指定
    variableWidth: true,//スライドの要素の幅をcssで設定できるようにする 
    slidesToShow: 5,
    rtl: true,
  });
});
//wave 
var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
		canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#ECFAF2']);
	// 各キャンバスの初期化
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 700;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
		update();
}

function update() {
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    // setTimeout(update, 35);
    setTimeout(update, 150);
}


/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
*/
function draw(canvas, color) {
  // 対象のcanvasのコンテキストを取得
  var context = canvas.contextCache;
  // キャンバスの描画をクリア
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  //波を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
  drawWave(canvas, color[0], 1, 3, 0);//drawWave(canvas, color[0],0.5, 3, 0);とすると透過50%の波が出来る
}

/**
 * 波を描画
 * drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
  var context = canvas.contextCache;
  context.fillStyle = color;//塗りの色
  context.globalAlpha = alpha;
  context.beginPath(); //パスの開始
  drawSine(canvas, info.t / 0.5, zoom, delay);
  context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
  context.lineTo(0, canvas.height); //パスをCanvasの左下へ
  context.closePath() //パスを閉じる
  context.fill(); //波を塗りつぶす
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawSine(canvas, t, zoom, delay) {
  var xAxis = Math.floor(canvas.height/2);
  var yAxis = 0;
  var context = canvas.contextCache;
  // Set the initial x and y, starting at 0,0 and translating to the origin on
  // the canvas.
  var x = t; //時間を横の位置とする
  var y = Math.sin(x)/zoom;
  context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く
  
  // Loop to draw segments (横幅の分、波を描画)
  for (i = yAxis; i <= canvas.width + 10; i += 10) {
    x = t+(-yAxis+i)/unit/zoom;
    y = Math.sin(x - delay)/3;
    context.lineTo(i, unit*y+xAxis);
  }
}
init();


/*
hukidashiアニメーション
*/
// $('.bounce').on('inview',function(){
  $('.bounce').one('inview',function(){
    anime({
      targets: '.bounce > div',
    scaleY: [0,1],
    duration: 1200,
    // duration: 1500,
    delay: anime.stagger(120),
    easing: 'easeOutElastic(0,0.3)',
    loop: false,

  });
  // }).finished.then(function(){
  //   anime({
  //     targets: '.bounce > div',
  //     scaleY: [
  //       {value: [1,0.8],easing: 'easeInElastic(0,2)'},
  //       {value: [0.8,1],easing: 'easeOutElastic(0,2)'}
  //     ],
  //     duration: 2000,
  //     // loop: true,
  //     loop: false,
  //     delay: anime.stagger(100,{start: 2000})
  //   });
  // });
});
// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime(){

  //ふわっと動くきっかけのクラス名と動きのクラス名の設定
  $('.fadeUpTrigger').each(function(){ //fadeInUpTriggerというクラス名が
      var elemPos = $(this).offset().top-50; //要素より、50px上の
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight){
      $(this).addClass('fadeUp');
      // 画面内に入ったらfadeInというクラス名を追記
      
      }
      });
      $('.fadeLeftTrigger').each(function(){ //fadeInUpTriggerというクラス名が
        var elemPos = $(this).offset().top-50; //要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight){
        $(this).addClass('fadeLeft');
        // 画面内に入ったらfadeInというクラス名を追記
        
        }
      });  
      $('.fadeRightTrigger').each(function(){ //fadeInUpTriggerというクラス名が
          var elemPos = $(this).offset().top-50; //要素より、50px上の
          var scroll = $(window).scrollTop();
          var windowHeight = $(window).height();
          if (scroll >= elemPos - windowHeight){
          $(this).addClass('fadeRight');
          // 画面内に入ったらfadeInというクラス名を追記
          }
      });  
      $('.fadeInTrigger').each(function(){ //fadeInUpTriggerというクラス名が
        var elemPos = $(this).offset().top-50; //要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight){
        $(this).addClass('fadeIn');
        // 画面内に入ったらfadeInというクラス名を追記
        }
    });  
  }

//アコーディオンをクリックした時の動作
$('.title').on('click', function() {//タイトル要素をクリックしたら
	var findElm = $(this).next(".box");//直後のアコーディオンを行うエリアを取得し
	$(findElm).slideToggle();//アコーディオンの上下動作
	if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
		$(this).removeClass('close');//クラス名を除去し
	}else{//それ以外は
    // $(this).addClass('plus');
		$(this).addClass('close');//クラス名closeを付与
	}
});
// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  fadeAnime();
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  fadeAnime();
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

//scroll hint
if (window.matchMedia('(max-width: 767px)').matches) {
  //スマホ処理
  new ScrollHint('.js-scrollable');
} 
// else if (window.matchMedia('(min-width:768px)').matches) {
//     //PC処理
//   }
  

//スムーズスクロール
$(function(){
  // #で始まるアンカーをクリックした場合に処理
  $('a[href^="#"]').click(function(){
    // 移動先を50px上にずらす
    var adjust = 50;
    // スクロールの速度
    var speed = 400; // ミリ秒
    // アンカーの値取得
    var href= $(this).attr("href");
    // 移動先を取得
    var target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を調整
    var position = target.offset().top - adjust;
    // スムーススクロール
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});

//iframeの縦スクロール対策
// 子画面の要素を取得
var elm = document.getElementById("parentframe");
// 子画面のコンテンツサイズに合わせてサイズを変更する関数
function changeParentHeight(){
  elm.style.height = elm.contentWindow.document.body.scrollHeight + "px";
}
// 親画面 iframe の高さを変更するイベント
// 1. 子画面の読み込み完了時点で処理を行う
elm.contentWindow.onload = function(){ changeParentHeight(); };
// 2. 子画面のウィンドウサイズ変更が完了した時点で処理を行う
var timer = 0;
elm.contentWindow.onresize = function () {
  if (timer > 0) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    changeParentHeight();
  }, 100);
};