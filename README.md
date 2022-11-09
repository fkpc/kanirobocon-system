# kanirobocon-system / かにロボコン運営システム

かにロボコン得点システム、クライアント側 for iPad / PC

## 起動方法

[Deno](https://deno.land/)をインストールし下記で実行
```bash
deno run -A kanirobo-server.js
```
- [http://[::]:8000/](http://[::]:8000/)を開く

## 起動オプション

### IPv4でポート8888を使用して起動

```bash
deno run -A kanirobo-server.js --ipv4 8888
```
- [http://localhost:8888/](http://localhost:8888/)を開く

### キャッシュされたリソースの再読み込み

-r オプションにより、リモートリソースの再読み込みを行って起動

```bash
deno run -r -A kanirobo-server.js
```

## ID/パスワード

- id: kanirobo
- password: 29122  (運用時 [password.txt](password.txt) を編集して変更してください)

## 参加者設定

data/entry.csv に、参加者情報を記入してください
