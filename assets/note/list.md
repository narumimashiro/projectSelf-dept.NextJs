---
title: '非同期処理のあれこれ'
date: '20221220'
thumbnail: '/images/program.jpg'
---

# ***List Library***
## **list型に関連するメソッドや知識まとめ**
---
## **■ list型とは**
```
配列を扱うもの
```

### **最後に挿入**
```python
list = [1, 2, 3, 4, 5]
list.append(6)  // [1, 2, 3, 4, 5, 6]
```

### **指定箇所に挿入する**
```python
list = [1, 2, 3, 4, 5, 6]
list.insert(3, 7) // [1, 2, 3, 7, 4, 5, 6]
```

### **最後を削除する、戻り値に削除した値を取得**
```python
list = [1, 2, 3, 7, 4, 5, 6]
res = list.pop() // [1, 2, 3, 7, 4, 5]
print(res) // 6
pop(X)と指定すればそこを取り出せる
list.pop(0) // 1
```

### **指定箇所を削除する**
```python
list = [1, 2, 3, 7, 4, 5]
del list[2] // [1, 2, 7, 4, 5]
```

### **指定した値を削除できる**
```python
list = [1, 2, 7, 4, 5]
list.remove(7) // [1, 2, 4, 5]
list.remove(7) // ValueError: list.remove(x): x not in list
```

### **list同士の連結**
```python
li1 = [1, 2, 3]
li2 = [4, 5, 6]
li1 += li2
print(li1) // [1, 2, 3, 4, 5, 6]
or
li1.extend(li2) // [1, 2, 3, 4, 5, 6]
```

### **検索文字が何番目にあるかを返してくれる**
```python
li = [1, 2, 3, 4, 5]
li.index(3) // 2
```

### **検索文字がいくつあるか返してくれる**
```python
li = [1, 2, 3, 4, 5, 3, 3, 5]
li.count(3)  // 3
```

### **リストに検索文字が存在しているか確認できる**
```python
li = [1, 2, 3, 4, 5, 3, 3, 5]
if 2 in li
    print('exist')
// 2はリストに存在しているので、existが出力される
```

### **リスト内のソート**
```python
li = [2, 3, 1, 4, 5, 3, 3, 5]
// 通常のソート
li.sort() // [1, 2, 3, 3, 3, 4, 5, 5]
// 降順
li.sort(reverse=True) // [5, 4, 3, 3, 3, 2, 1]
// 反転
li = [2, 3, 1, 4, 5, 3, 3, 5]
li.reverse() // [5, 3, 3, 5, 4, 1, 3, 2]
```

### **指定文字で切り分け格納**
```python
word = 'My name is'
word.split(' ') // ['My', 'name', 'is']
```

### **指定文字で連結もできる**
```typescript
word = ['My', 'name', 'is']
word1 = ' '.join(word)
print(word1) // My name is
```

### **リストのコピーは参照渡し**
#### リストや辞書型は参照渡しになる、数値や文字列は値渡し
```typescript
i = [1,2,3,4]
j = i
j[0] = 100
print(i) // [100,2,3,4]

// id()でアドレス的なものを知ることができる
id(i) // 2308790429248
id(j) // 2308790429248
```

### **参照渡しを避けるには一般的にはcopy()を使う**
```typescript
i = [1,2,3,4]
j = copy(i)
or
j = i[:]
```

### **タプル型(tuple)**
#### 新しく値の代入をすることのできない配列のようなもの
```typescript
t = (1,2,3,4,5,6)
// リスト型のときに使えた関数を持っている
t[2] // 3
t.index(4) // 3

t=([1,2,3], [4,5,6])
t[0][0] = 100 // これは書き換えできる...なぜなんだ...
```

### **tupleの使いどころ**
```typescript
range = 1,100
min, max = range
print(min) // 1
print(max) // 100
```
```typescript
// 数値の入れ替えとかに使える
a = 100
b = 200
a, b = b, a
```
