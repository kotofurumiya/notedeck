# NoteDeck

React NativeとExpoによるマルチプラットアプリケーションのデモ。

練習用であり、実用性はない。

## ビルド・起動

iPhone/Android端末にExpo Clientをインストールする。
各AppStoreからダウンロード可能。

依存モジュールをインストールする

```
npm install
```

次にExpoのダッシュボードを立ち上げる。以下のコマンドで自動的にブラウザが起動する。

```
npm start
```

ブラウザ上に表示されるQRコードをスマートフォンで読み取れば、Expo Client上でアプリが起動する。

## ブラウザ向け

スマートフォンの他に、ブラウザ上で動かすこともできる。

```
npm run web
```

## 注意

今回はウェブとの互換性を考え、ストレージに `AsyncStorage` を採用しているが、
これはすでにdeprecatedであるので本来は別の永続化方法を検討すべき。