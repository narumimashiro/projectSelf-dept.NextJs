---
title: "Python List"
date: "2023-05-24"
thumbnail: "/images/HatsuneMikuVivid.jpg"
---

# ***List Library***
## **list型に関連するメソッドや知識まとめ**
---
## list型とは
```
配列を扱うもの
```

## **配列にデータを挿入、削除する**

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
