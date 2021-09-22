# 電商網站 - The Glasses Backstage(重構)
此作品為虛擬購物商店後台，含產品管理、訂單管理、優惠券管理，並包含後台API串接。
## Demo:
https://simonliu0911.github.io/The_Glasses_Backstage_Vue2
## 重構部分:
1. 利用lazyload-view加載每個頁面
2. 建立一個layout底層
3. 新增plugin: Bootstrap-notify
4. 使用全局註冊: Base
5. 使用utils將共用Function統一管理
6. scss使用module
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
