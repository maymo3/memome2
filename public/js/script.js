$(function(){
    var $btn = $('#toggle-btn');
    var $side = $('#side');
    $btn.on( 'click', function() {
        if ( ! $side.hasClass('open') ) {
          $side.addClass('open');
        } else {
          $side.removeClass('open');
        }
      });

     // 目次の生成 
    $(function(){
      // 変数を定義
      var idcount = 1;
      var toc = '';
      var currentlevel = 0;
  
      // 見出しごとに繰り返す
      $('article h2,article h3,article h4',this).each(function(){
  
        // 見出しごとにidを保存
        this.id = "chapter-" + idcount;
          // ++ increase 1ずつ増やす
          idcount++;
  
        // 各見出しのレベルを設定
        var level = 0;
          // nodeName オブジェクトの要素名を取得
          // toLowerCase 大文字が含まれる場合小文字にして返す
        if(this.nodeName.toLowerCase() == "h2"){
          level = 1;
        } else if(this.nodeName.toLowerCase() == "h3"){
          level = 2;
        } else if(this.nodeName.toLowerCase() == "h4"){
          level = 3;
        }
  
        // 見出しのレベルが現在よりも大きければ（＝今のより小見出しなら）
        // <ol>を追加して入れ子にする
        while(currentlevel < level) {
          toc += '<ol class="chapter">';
          currentlevel++;
        }
  
        // そうでなければ</ol>で閉じて入れ子を終了する
        while(currentlevel > level) {
          toc += "</ol>";
          currentlevel--;
        }
  
        // リストを作る
        toc += '<li><a href="#' + this.id + '">' + $(this).html() + "</a></li>\n";
      });
  
      // 現在のレベルが0より上ならリストを閉じる
      while(currentlevel > 0) {
        toc += "</ol>";
        currentlevel--;
      };
  
      // id="toc" のところにHTMLを出力する
      $("#toc").html(toc);
  
      // する〜っとスクロール
      $('#toc li').click(function(){
        var speed = 800;
        var href = $(this).find('a').attr('href');
        var target = $(href == '#' || href == '' ? 'html' : href);
        var position = target.offset().top; //  - 70 ヘッダーがある場合被らないように下げる
        $('html, body').stop().animate({scrollTop:position}, speed);
        return false;
      });
    }); // 目次ここまで
});