# Ci-en Banner Blocker

Ci-en のマイページに表示されるバナーを非表示にするブラウザ拡張です。

## 対応ページ

- `https://ci-en.net/mypage`
- `https://ci-en.dlsite.com/mypage` (R18)

通常版と R18 版を、拡張機能のポップアップから個別にオン / オフできます。

## インストール前の準備

この拡張機能は Chrome ウェブストアなどから配布する形式ではなく、GitHub から取得したフォルダをブラウザに読み込んで使用します。

GitHub リポジトリ:

```text
https://github.com/yumineko-game/Hide_Ci-en_Banner_Swiper
```

### ZIP でダウンロードする場合

1. GitHub のリポジトリページを開きます。
2. `Code` ボタンを押します。
3. `Download ZIP` を選びます。
4. ダウンロードした ZIP ファイルを展開します。
5. 展開したフォルダを、後述のブラウザ設定画面で選択します。

### Git で clone する場合

```bash
git clone https://github.com/yumineko-game/Hide_Ci-en_Banner_Swiper.git
```

clone したフォルダを、後述のブラウザ設定画面で選択します。

## Chrome への導入方法

1. Chrome で `chrome://extensions/` を開きます。
2. 右上の「デベロッパー モード」をオンにします。
3. 「パッケージ化されていない拡張機能を読み込む」を押します。
4. GitHub から取得したこのリポジトリのフォルダを選択します。
   - `manifest.json` が入っているフォルダを選んでください。
5. 拡張機能一覧に `Ci-en Banner Blocker` が表示されれば導入完了です。

## Microsoft Edge への導入方法

1. Edge で `edge://extensions/` を開きます。
2. 左下の「開発者モード」をオンにします。
3. 「展開して読み込み」を押します。
4. GitHub から取得したこのリポジトリのフォルダを選択します。
   - `manifest.json` が入っているフォルダを選んでください。
5. 拡張機能一覧に `Ci-en Banner Blocker` が表示されれば導入完了です。

## 使い方

1. ブラウザの拡張機能アイコンから `Ci-en Banner Blocker` を開きます。
2. 非表示にしたい項目にチェックを入れます。
   - `ci-en.net のバナーを非表示にする`
   - `ci-en.dlsite.com (R18) のバナーを非表示にする`
3. 対象ページを開くか、すでに開いている場合はページを再読み込みします。

## 更新方法

GitHub 上の最新版を取得した後、拡張機能ページで `Ci-en Banner Blocker` の「再読み込み」ボタンを押してください。

ZIP で導入した場合は、最新版の ZIP を再ダウンロードして展開し直してください。

Git で導入した場合は、リポジトリのフォルダで以下を実行してください。

```bash
git pull
```

設定が反映されない場合は、対象ページも再読み込みしてください。
