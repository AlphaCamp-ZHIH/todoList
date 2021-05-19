# todoList
紀錄已完成或未完成的事

# 環境建置與需求
    "node.js": "v10.15.0" -執行環境
    "express": "^4.17.1"-框架(framwork)
    "body-parser": "^1.19.0"-中介軟體(middleware)
    "express-handlebars": "^5.3.2"-模板引擎(template engine)
    "method-override": "^3.0.0",-中介軟體(middleware)
    "connect-flash": "^0.1.1",-訊息顯示(middleware)
    "passport": "^0.4.1",-用戶驗證
    "passport-facebook": "^3.0.0",-用戶驗證
    "passport-local": "^1.0.0"-用戶驗證
    "mongoose": "^5.12.7"-MongoDB ODM
    "mongoDB": "v4.2.14"-資料庫
    "bcryptjs": "^2.4.3",-明碼hash
    "nodemon": "^2.0.7"-開發套件
    "dotenv": "^9.0.2",
# 安裝與使用
### 下載專案
git clone https://github.com/zhihdd/todoList.git
or
右上方 "code" 下載

### 安裝套件
```
npm install
```
### 使用
終端機orCMD中執行下列指令，執行程式 <br>
```
node app.js
```
開發環境下使用功能
```
nodemon app.js
```

# 功能
紀錄完成、未完成事項   
新增事項  
刪除事項  
編輯事項  
建立個人帳戶  
可用facebook授權登入  



