---
title: 'Pythonの制御文'
date: '20221204'
thumbnail: '/images/python.jpg'
---

# **Python 制御関連メモ**

## **制御に関連するメソッドや知識まとめ**

Pythonのif文など制御に関わることで調べたものを忘れないようにメモとして残しておくぺーじです。不定期(←ここ大事)で更新予定です。

## **if文制御の基本的な形**

```python
if 条件:
    処理内容
elif 条件:
    処理内容
else:
    処理内容
```
## **論理式**

- ==  : 同値だったら
- !=  : 同値でなかったら
- and : かつ条件(= &&)
- or  : or条件(= ||)

## **in / not**
```python
x = [1, 2, 3]
if x in 2: // xに2があるならTrue
if x not in 3 // xに3がないならTrue
```

## **not ? それとも != ?**

以下二つのサンプルコードは同じ処理をしているが、可読性を考えると下の!=を使う方が良いです。

```python
if not a == b
if a != b
```

## **notはどんなタイミングで使う?**

notを使うタイミングはboolean型の変数でif分岐をするときに使うことが多いです。

```python
if not boolean
```

## **Noneについて**

他の言語で見かけるNULLに相当するものが、pythonではNoneというもので存在している。
Noneでif分岐をするときは論理式を用いるのではなく、上記で登場したnotを用いることがほとんどのようです。

isは完全一致"==="のようなイメージになります。

```python
if 変数 is None
if 変数 is not None
```

## **while文制御**

以下のサンプルコードはカウントを出力してcount=5になったタイミングでループを抜け、"done"と出力し終了する単純なものですが、while文の中にあるelse分岐は途中でループがbreakして抜けだしたりしない場合に処理が行われるもので、2,3行目のコメントアウトが存在していなかった場合は0,1と出力したら、その後"done"を出力することなく、プログラムが修了します。

```python
count = 0
while count < 5:
    # if count == 2:
    #     break
    print(count)
    count += 1
else:
    print('done')
```

## **input関数:入力を受け付けるやつ**

input関数はユーザーに入力を促すもので、今回のサンプルコードの場合、okの入力を受け付けたらbreak文が走り無限ループを抜け出す。

```python
while True:
    word = input('Enter')
    if word == 'ok':
        break
    print('next')
```

## **for文を回す方法のアレコレ**

for文処理のいろいろな書き方

例)リストを回すとき
```python
list = [1, 2, 3, 4, 5]
for i in list:
    print('list item', i)
```

例)指定回数回したいとき
```python 
// 10回回す
for i in range(10):
    print(i) // 0,1,2,...9
// 2から9まで回す
for i in range(2,10):
    print(i) // 2,3,4,...9
// 2から3つ飛ばしで9までの範囲内で回す
for i in range(2,10,3):
    print(i) // 2,5,8
```

例)10回回したいが、indexの使用予定がないとき
```python
for _ in range(10):
```

- listのindexも知りたいとき
```python
for i, v in enumrate(['apple', 'orange', ...]):
    print(i, v) // 0 apple, 1 orange, ...
```

- listはまとめてfor文で回せる
```python
days = ['Mon', 'Tue', 'Wed',...]
fruits = ['Apple', 'Orange', 'Lemon',...]
drinks = ['Coffee', 'Juice', 'Tea',...]

// 以下のように実装もできるが...
for i in rage(len(dats)):
    print(days[i],fruits[i], drinks[i])

// zipを使ってまとめられる
for day, fruit, drink in zip(days, fruits, drinks):
    print(day, fruit, drink)
```

