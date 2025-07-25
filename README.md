# Random Quote Plugin for Obsidian

[English](#english) | [日本語](#日本語)

--- 
# 🇺🇸 English

---


## Overview

Extracts a group of strings divided by arbitrary delimiter strings from all files in the specified directory.
Randomly extracts one string from that group and outputs it with quotation marks.

### ノートサンプル

If `## Quote:` is set as the starting marker, the quoted string is collected using the marker as the delimiter.

```
## Quote: aaaaa
bbbb
cccc

## Quote: dddd
eeee
ffff
```

### Output Result

Outputs the collected notes in the following format.

```
> [!tips]
> bbbb
> cccc

> [!tips]
> eeee
> ffff
```
## 📦 Installation

1. Download two files: `main.js` and `manifest.json`.
2. Place them in the specified location: `.obsidian/plugins/random-quote-plugin/`.
3. Activate the `random quote plugin` in the Obsidian settings window.

---

## ⚙️ Usage

1. Install the Random Quote Plugin.
2. Specify the delimiter string in the settings window.
3. Specify the shortcut (Cmd + Shift + Alt + P).
4. Execute the shortcut at any location.

---


## Local Development

If you want to modify the code, you can do so by executing the following commands.

```bash
git clone git@github.com:s2kw/obsidian-random-quote.git
cd obsidian-random-quote
npm install
npm run build
```

---

## 📄 License

MIT License

---


## ☕️ Support

If you find this plugin useful, we would appreciate your support.
If you have any requests, please add them to `Issue`.

Support @s2kw:  
<a href="https://buymeacoffee.com/s2kw" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 175px !important;" ></a>


---

# 🇯🇵 日本語

---

## 概要

指定ディレクトリ下にあるすべてのファイルから、任意の区切り文字列によって分割した文字列群を抽出します。
その文字列群からランダムに１つを抽出して、を引用符をつけて出力します。


### ノートサンプル

`## Quote:` を起点のマーカーとして設定していると、マーカーを区切り文字列として引用文字列を収集します。

```
## Quote: aaaaa
bbbb
cccc

## Quote: dddd
eeee
ffff
```

### 出力結果

収集したノートから下記のフォーマットで出力します。

```
> [!tips]
> bbbb
> cccc

> [!tips]
> eeee
> ffff
```

## 📦 インストール

1. ２ファイルをダウンロード `main.js`, `manifest.json`.
2. 指定の場所に配置 `.obsidian/plugins/random-quote-plugin/`
3. Obsidianの設定ウィンドウで、`random quote plugin`をアクティブにする

## ⚙️ 使い方

1. Random Quote Pluginをインストールします
2. 設定ウィンドウで、区切り文字列を指定する
3. ショートカットを指定する（Cmd + Shift + Alt + P）
4. 任意の場所でショートカットを実行


## ローカル開発

改変したい場合は下記を実行することで改変可能です。

```bash
git clone git@github.com:s2kw/obsidian-random-quote.git
cd obsidian-random-quote
npm install
npm run build
```

---

## 📄 License

MIT License

---

## ☕️ Support

もしこのプラグインが何かの役に立ったと感じたならサポートしてくれると嬉しいです。
要望などありましたら `Issue` に追加してください。

Support @s2kw:  
<a href="https://buymeacoffee.com/s2kw" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 175px !important;" ></a>
