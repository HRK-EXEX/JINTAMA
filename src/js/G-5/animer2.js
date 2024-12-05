export class ImageMover {
    constructor(imageSrc, imgId, overlayClass = 'overlay', imgClass = 'image-style') {
      this.overlayClass = overlayClass;
      this.imgClass = imgClass;
      this.imageSrc = imageSrc;
      this.imgId = imgId;
  
      // オーバーレイの作成
      this.overlay = document.createElement('div');
      this.overlay.classList.add(this.overlayClass);
      document.body.appendChild(this.overlay);
      
      // 画像の作成
      this.img = document.createElement('img');
      this.img.src = this.imageSrc;
      this.img.style.position = 'absolute';
      this.img.style.width = '100px'; // 初期サイズ
      this.img.style.height = '100px';
      this.img.style.top = '-300px'; // 画面外（上）に配置
      this.img.style.left = 'calc(50% - 100px)'; 
      this.img.classList.add(this.imgClass);
      this.img.id = this.imgId;
      document.body.appendChild(this.img);
      
    }
  
    startAnimation() {
        anime({
          targets: `#${this.imgId}`,
          width: '200px', // 幅を200pxにアニメーション
          height: '200px', // 高さを200pxにアニメーション
          translateY: [0, 600], // 初期位置から中央までのY軸移動
          duration: 1200, // アニメーションの時間
          easing: 'easeOutBounce',
          begin: () => {
            // アニメーション開始時に背景を暗くする
            this.overlay.style.display = 'block';
          },
          complete: () => {
            // アニメーション終了後に画像を変更してアニメーションを再生
            this.playExplosionAnimation();
            this.showDialog(); // ダイアログ表示
          }
        });
      }
      
      playExplosionAnimation() {
        // 爆発アニメーションのコードをここに追加
        console.log('Explosion animation triggered');
      }
      
      showDialog() {
        // ダイアログを作成
        this.dialog = document.createElement('div');
        this.dialog.style.position = 'absolute';
        this.dialog.style.top = 'calc(50% + 150px)'; // 卵の下に配置
        this.dialog.style.left = '50%';
        this.dialog.style.transform = 'translateX(-50%)';
        this.dialog.style.padding = '20px';
        this.dialog.style.backgroundColor = 'black'; // 背景色を黒
        this.dialog.style.border = '2px solid white'; // ふちの色を白
        this.dialog.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
        this.dialog.style.textAlign = 'center';
        this.dialog.style.fontSize = '16px';
        this.dialog.style.color = 'white'; // 文字色を白
        this.dialog.style.zIndex = '1000';
        this.dialog.style.fontFamily = '"dot-regular", sans-serif'; 
        // ダイアログの内容
        this.dialog.innerText = 'OO卵を授かった！たいせつにしてね！';
      
        // ダイアログを表示
        document.body.appendChild(this.dialog);
      
        // Enterキーでオーバーレイ、卵、ダイアログを非表示にする
        this.addEnterKeyListener();
      }
      addEnterKeyListener() {
        // Enterキーが押されたときに非表示にする処理
        const hideElements = (event) => {
          if (event.key === 'Enter') {
            // 他の操作に影響を与えないように、イベントのデフォルト動作をキャンセル
            event.preventDefault();
            event.stopPropagation();  // イベントの伝播を停止
      
            // 卵、ダイアログを非表示にする
            this.img.style.display = 'none'; // 卵も非表示
            this.dialog.style.display = 'none';
      
            // オーバーレイを非表示にする
            this.overlay.style.display = 'none';
      
            // イベントリスナーを削除して、再度処理が実行されないようにする
            document.removeEventListener('keydown', hideElements);
          }
        };
      
        document.addEventListener('keydown', hideElements);
      }
      
    playExplosionAnimation() {
      // 爆発アニメーションのコードをここに追加
      console.log('Explosion animation triggered');
    }
  }
  