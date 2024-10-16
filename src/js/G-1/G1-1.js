window.onload = function() {
  const image = document.getElementById('title');
  image.animate(
      [
          { transform: 'translateY(0)' },
          { transform: 'translateY(28vw)' }
      ],
      {
          fill: 'forwards',
          duration: 3000
      }
  );

  const showLater = document.getElementById("show-later");
  function switchDisplay() {
      showLater.classList.add("visible"); // 3秒後に一気に表示
  }
  setTimeout(switchDisplay, 3000); // 3秒後にクラス追加
};
