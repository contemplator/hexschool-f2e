# Bus Go - 全台公車動態時刻查詢應用服務

## 作品說明

`建議使用手機載具操作`

[作品觀看連結](https://contemplator.github.io/hexschool-f2e-bus/#/index)

第一次進入頁面時會需要使用者設定預設的位置，之後的查詢動作都與此相關。

之後若要修改縣市地區，可以在進入後的右上角點選齒輪的圖示重新進行地區的選擇。

公車查詢方式提供兩個途徑：

1. 查詢站點
2. 查詢路線

### 查詢站點

首先需要輸入站點名稱關鍵字查詢，查詢後會將結果以清單的方式陳列在畫面下方，除了顯示站點名稱外，也會顯示經過該站點的公車路線。

### 查詢路線

首先需要輸入路線名稱關鍵字查詢，查詢後會將結果以清單的方式陳列在畫面下方，除了顯示路線名稱外，也會顯示起迄站名。

點選其中一條路線，會進入到顯示路線詳細資料的頁面，主要是提供該公車路線的動態資訊，顯示每一個站點預估到站時間。

點擊路線資訊卡右下角的翻轉圖示，將會切換路線方向。

點擊右上角的地圖圖示，將會顯示 Google Map 畫面，並且把站點標注在地圖上。

## 系統說明

專案運行方式請見 package.json 檔案。

使用 npm install 安裝依賴套件

使用 ng serve bus-go 運行公車動態時刻查詢的服務


## 資料夾說明

angular.json - angular 專案配置檔案

bus-go 專案請見 /apps/bus-go 資料夾

/apps/bus-go/src 原始碼

/apps/bus-go/src/app 主要介面及邏輯程式

/apps/bus-go/src/assets 靜態檔案

/libs/data 關於靜態資料，如縣市資料透過 API 取得後放置於此

/libs/util 關於 service 相關功能，負責處理資料面的工具都放置於此

/libs/ui 關於介面常用的元件及工具，介面工具都放置於此

/libs/viewmodels 關於物件描述都放置於此，如介面資料呈現的物件以及 API Service 取得的資料物件格式

## 使用技術

- Angular
- Nx
- Agm (Angular Google Map)

---
# Ubike Travel

## 使用技術

Angular、Google Maps、SCSS

## 線上觀看連結

https://contemplator.github.io/hexschool-f2e-ubike/search-map

## 原始檔位置

https://github.com/contemplator/hexschool-f2e

## 作品描述

首頁透過搜尋站點或直接顯示附近站點開始查詢想要的 Ubike 站。

提供以下功能：

1. 租借時間的計時
2. 探索目前使用者附近的美食與景點
