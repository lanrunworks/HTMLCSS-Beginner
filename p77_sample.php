<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>入力結果</title>
    </head>
    <body>
        <!-- phpのプログラム -->
        <?php
            print("氏名：{$_GET['shimei']}<br>");
            print("受付番号：{$_GET['gakuseki']}<br>");
            print("性別：{$_GET['seibetu']}<br>");
            print("希望する模擬授業科目：{$_GET['kamoku']}<br>");
            print("希望する学部：{$_GET['gakubu']}<br>");
            print("希望すること：{$_GET['kibou']}<br>");
        ?>
        <!-- phpのプログラムはここまで -->
    </body>
</html>
