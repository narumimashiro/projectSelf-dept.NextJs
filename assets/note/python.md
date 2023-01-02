---
title: 'Python殴り書きメモ'
date: '20221127'
thumbnail: '/images/python.jpg'
---

# ***Python殴り書きメモ***

## **PythonAutoGUIで " @ ", " ^ ", " : " を使える用にする**

修正ファイル : 
C:\Python310\Lib\site-packages\pyautogui\_pyautogui_win.py

修正前)
```python
needsShift = pyautogui.isShiftCharacter(key)
```
修正後)
```python
needsShift = pyautogui.isShiftCharacter(key)
if key == '@': needsShift = False
if key == '^': needsShift = False
if key == ':': needsShift = False
```

## **Pythonのprintについて豆知識**

### **変数の型を知ることができる**

```python
type(XXX)のように記述する
print(num, type(num)) // 1 <class 'int'>
print(lang, type(lang)) // Python <class 'str'>
print(is_ok, type(is_ok)) // True <class 'bool'>
```

## **Pythonの計算あれこれ**

```python
17 / 3 
>> 5.66666666667

17 // 3
>> 5

5 * 5 * 5
>> 125

5 ** 3
>> 125
```
