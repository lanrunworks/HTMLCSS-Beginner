/*
    ・茨城県、1日分のデータ
    https://www.jma.go.jp/bosai/forecast/data/overview_forecast/080000.json
    ・茨城県、3日分のデータ
    https://www.jma.go.jp/bosai/forecast/data/forecast/080000.json
*/
// 都道府県コードの連想配列
const PREF_LIST = [
    { value: "016000", name: '北海道' },
    { value: "020000", name: '青森県' },
    { value: "030000", name: '岩手県' },
    { value: "040000", name: '宮城県' },
    { value: "050000", name: '秋田県' },
    { value: "060000", name: '山形県' },
    { value: "070000", name: '福島県' },
    { value: "080000", name: '茨城県' },
    { value: "090000", name: '栃木県' },
    { value: "100000", name: '群馬県' },
    { value: "110000", name: '埼玉県' },
    { value: "120000", name: '千葉県' },
    { value: "130000", name: '東京都' },
    { value: "140000", name: '神奈川県' },
    { value: "150000", name: '新潟県' },
    { value: "160000", name: '富山県' },
    { value: "170000", name: '石川県' },
    { value: "180000", name: '福井県' },
    { value: "190000", name: '山梨県' },
    { value: "200000", name: '長野県' },
    { value: "210000", name: '岐阜県' },
    { value: "220000", name: '静岡県' },
    { value: "230000", name: '愛知県' },
    { value: "240000", name: '三重県' },
    { value: "250000", name: '滋賀県' },
    { value: "260000", name: '京都府' },
    { value: "270000", name: '大阪府' },
    { value: "280000", name: '兵庫県' },
    { value: "290000", name: '奈良県' },
    { value: "300000", name: '和歌山県' },
    { value: "310000", name: '鳥取県' },
    { value: "320000", name: '島根県' },
    { value: "330000", name: '岡山県' },
    { value: "340000", name: '広島県' },
    { value: "350000", name: '山口県' },
    { value: "360000", name: '徳島県' },
    { value: "370000", name: '香川県' },
    { value: "380000", name: '愛媛県' },
    { value: "390000", name: '高知県' },
    { value: "400000", name: '福岡県' },
    { value: "410000", name: '佐賀県' },
    { value: "420000", name: '長崎県' },
    { value: "430000", name: '熊本県' },
    { value: "440000", name: '大分県' },
    { value: "450000", name: '宮崎県' },
    { value: "460100", name: '鹿児島県' },
    { value: "471000", name: '沖縄県' }
  ];

/*
    ドロップダウンリストを作成
*/
// selectの要素を取得
// querySelector : 指定されたセレクターのグループに一致する、最初の要素を返す
const selectElement = document.querySelector('#pref');

// option要素の初期表示を作成
let optionString = '<option value="">選択してください</option>';

// option要素を配列から作成
PREF_LIST.forEach((item) => {
    // 都道府県ごとに value と name を反映
    optionString += `<option value="${item.value}">${item.name}</option>`;
});

// option要素をselect要素内に追加
selectElement.innerHTML = optionString;
console.log('ドロップダウンリスト作成！');

/*
    select が変更された時のイベント  
*/
selectElement.addEventListener('change', (event) => {
    // select の現在の値を取得
    const value = event.target.value;


    // 選択されていない場合
    if(value === ''){
        // 何もしない
        console.log('都道府県が選択されていません');
        return;
    }
    else{
        // 気象庁の.jsonファイルからデータの読み取りと表示
        weatherInfo(value);
    }
})

/*
    気象庁の.jsonファイルからデータの読み取りと表示

    戻り値 : なし
    引数
        preNum : selectで選ばれた値
*/
function weatherInfo (prefNum) {

    const fileName = prefNum;

    // データを取得する先のurlを作成
    const url = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${fileName}.json`;
    
    // fetch : 非同期通信でリクエスト、レスポンスを取得する
    fetch(url)
    // 取得成功
    .then(function(response) {
        // console.log(response.json);
        // JSONを読み取り、 JavaScriptのオブジェクトを作成し返す
        // 関数 weatherInfo は終了せず、次の処理(画面に書き出す)へ進む
        return response.json();
    })
    .then(function(weather) {

        // 画面に書き出す
        // 親要素.lastElementChild : 親要素の中の最後の子要素
        // 発表者
        document.getElementById("publishingOffice").lastElementChild.textContent
            = weather.publishingOffice;
        // 日時
        document.getElementById("reportDatetime").lastElementChild.textContent
            = weather.reportDatetime;
        // 対象地域
        document.getElementById("targetArea").lastElementChild.textContent
            = weather.targetArea;
        // 見出し
        document.getElementById("headlineText").lastElementChild.textContent
            = weather.headlineText;
        // 詳細
        document.getElementById("text").lastElementChild.innerHTML
            = weather.text.replace(/\n\n/g, '<br>');
        // 元データ
        document.getElementById("originalData").lastElementChild.innerHTML
            = `<a href="${url}">${url}</a>`;
    })
    .catch(function(error){
        console.log("データの取得に失敗しました。")
    });
}