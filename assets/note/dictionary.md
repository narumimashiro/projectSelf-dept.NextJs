---
title: 'Python 辞書型'
date: '20221202'
thumbnail: '/images/python.jpg'
---

# **Python 辞書型**

## **辞書型に関連するメソッドや知識まとめ**

殴り書きのメモ状態です...

### **辞書型はObjectみたいなもの**
```python
dict = {'x': 10, 'y': 20}
```
### **keyやvalueを一覧で取得する**
```python
dict = {'x': 10, 'y': 20}
dict.keys() // dict_keys(['x', 'y'])
dict.values() // dict_values([10, 20])
```

### **辞書型は合体だったり中身を取得、削除したりできる**
```python
dict = {'x': 10, 'y': 20}
dict2 = {'x': 30, 'z': 100}
// update()で同じKeyは上書き、違うものは挿入
dict.update(dict2) // {'x': 30, 'y': 20, 'z': 100}
// get(key)でValueの取得
dict.get('x') // 30
// pop(key)で要素の削除
dict.pop('x') // 30, dict = {'y': 20, 'z': 100}
```

### **辞書型の中身をチェックできる**
```python
dict = {'x': 10, 'y': 20}
'y' in dict // True
```

### **辞書型もリスト型と同じで参照渡しでコピーするので、値渡しにしたい場合はcopy()を使う**

List型のところに具体例があります。


### **中身をリストアップできる**

```python
dict = {'x': 10, 'y': 20}

print(dict.items()) // dict_items([('x', 10), ('y', 20)])
```