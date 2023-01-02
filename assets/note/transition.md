---
title: 'Vueでアニメーションを実装'
date: '20221207'
thumbnail: '/images/NuxtJs.jpg'
---

# **Vueでアニメーションを実装**

## **Transitionタグについて**

Vueでアニメーションを実現するには、ページ内のアニメ―ションをつけたい要素をTransitionタグで囲みます。そうすることで、タグで囲まれた要素に対してCSSで記述していくためのクラスが自動的に付与されていきます。

## **状態遷移**

- **v-enter	enterの開始状態。**  
要素が挿入される前に追加され、要素が挿入された後に削除される。

- **v-enter-active	enterの活性状態。**  
要素が挿入される前に追加され、トランジション/アニメーションが終了すると削除される。

- **v-enter-to	enter の終了状態。**  
要素が挿入された後に追加され、トランジション/アニメーションが終了すると削除される。

- **v-leave	leaveの開始状態。**  
要素の削除が始まる前に追加され、開始直後に削除される。

- **v-leave-active	leaveの活性状態。**  
要素の削除が始まる前に追加され、トランジション/アニメーションが終了すると削除される。

- **v-leave-to	leaveの終了状態。**  
要素の削除が始まった直後に追加され、トランジション/アニメーションが終了すると削除されます。

## **状態遷移イメージ図**
```Text
              Enter
opacity: 0; ==========> opacity: 1;
    |                       |
  v-enter               v-enter-to
|___________________________________|
                |
          v-enter-active
============================================
              Leave
opacity: 1; ==========> opacity: 0;
    |                       |
  v-leave               v-leave-to
|___________________________________|
                |
          v-leave-active
```

# **Modalウィンドウを作ってみる**

## **サンプルtemplate**

以下にモーダルウィンドウを実装したときにサンプルコードを残しておきます。
ところどころ略されているところは目をつむっていただき、イメージをつかんでいただけたらなと思います。

name="modal"とすることで、アニメーションの名前を決定しています。
また、tag="div"の部分で、<transition>タグを何として扱うかを決定しています。

```html
<template>
  <transition apper name="modal" tag="div">
    <div class="modal-overlay" @click.self="closeModal">
      <div class="message-box">
        <header class="message-box-header">
        </header>
        <section class="message-box-body">
        </section>
        <footer class="message-box-footer">
        </footer>
      </div>
    </div>
  </transition>
</template>
```

## **サンプルCSS**

```css
.modal-enter-active,
.modal-leave-active {
  transition: opacity 1.39s;
  .message-box {
    transition: opacity .39s, transform .6s
  }
}
.modal-enter, .modal-leave-to {
  opacity: 0;
  .message-box {
    opacity: 0;
    transform: translateY(-39px);
  }
}
```

## **おまけ**

蛇足ですが、フェードインのアニメーションも記述しておきます。
今回取り上げたのは1つのプロパティに対するアニメーションでしたが、複数のプロパティに対してアニメーションを当てると面白いデザインのものができるので、調べてみると良いかもしれません。

```css
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 2s ease;
  opacity: 1;
}
.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}
```