# desktop_elf

**介绍**

使用electron框架+live2D做一个桌面精灵，实现打开网页，打开文件夹，移动模型，更换模型和修改设置的简单功能。模型有：22娘、33娘、狗

![](F:\learn\desktop_elf\01.png)

![02](F:\learn\desktop_elf\02.png)

![03](F:\learn\desktop_elf\03.png)

![04](F:\learn\desktop_elf\04.png)

## 使用



```bash

# 安装依赖
npm install
# 打开程序
npm start 
# 打包程序
npm run pack
```



## bug

- 移动桌面精灵出屏幕后窗口会出现黑色背景填充，不再是透明，待优化

## 注意

- 打包是要设置package.json build。防止配置文件被打包

```
"extraFiles":"setting.json"
```


