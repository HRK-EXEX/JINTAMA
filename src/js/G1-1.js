window.onload = function() {
    const image = document.getElementById('title'); // ロゴ画像の要素を取得
  
    image.animate(
      [
        { transform: 'translateY(0)' },       // 開始位置（元の位置）
        { transform: 'translateY(200px)' }    // 終了位置（200px下）
      ],
      {
        fill: 'forwards',  // アニメーションが終わった後の状態を保持
        duration: 1000     // アニメーションの実行時間（1秒）
      }
    );
  };
  