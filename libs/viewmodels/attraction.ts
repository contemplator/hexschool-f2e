export interface ScenicSpotTourismInfo {
  ID: string;                        // 景點代碼
  Name: string;                      // 景點名稱
  DescriptionDetail: string;         // 景點特色詳細說明
  Description: string;               // 景點特色精簡說明
  Phone: string;                     // 景點服務電話
  Address: string;                   // 景點地址
  ZipCode?: string;                   // 郵遞區號
  TravelInfo?: string;                // 交通資訊
  OpenTime: string;                  // 開放時間
  Picture: TourismPicture;                   // 景點照片
  MapUrl?: string;                    // 簡圖介紹網址
  Position: PointType;               // 景點位置
  Class1?: string;                    // 景點分類1
  Class2?: string;                    // 景點分類2
  Class3?: string;                    // 景點分類3
  Level?: string;                     // 古蹟分級
  WebsiteUrl?: string;                // 景點官方網站網址
  ParkingInfo?: string;               // 停車資訊
  ParkingPosition: PointType;           // 景點主要停車場位置
  TicketInfo?: string;                // 票價資訊
  Remarks?: string;                   // 警告及注意事項
  Keyword?: string;                   // 常用搜尋關鍵字
  City: string;                      // 所屬縣市
  SrcUpdateTime: string;             // 觀光局檔案更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string;                // 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
}
export interface TourismPicture {
  PictureUrl1?: string;                // 照片連結網址1
  PictureDescription1?: string;        // 照片說明1
  PictureUrl2?: string;                // 照片連結網址2
  PictureDescription2?: string;        // 照片說明2
  PictureUrl3?: string;                // 照片連結網址3
  PictureDescription3?: string;        // 照片說明3
}
export interface PointType {
  PositionLon?: number;        // 位置經度(WGS84)
  PositionLat?: number;        // 位置緯度(WGS84)
  GeoHash?: string;            // 地理空間編
}

export interface RestaurantTourismInfo {
  ID: string;                       // 餐飲店家代碼
  Name?: string;                    // 餐飲店家名稱
  Description?: string;             // 店家簡述
  Address?: string;                 // 店家地址
  ZipCode?: string;                 // 郵遞區號
  Phone?: string;                   // 預約電話
  OpenTime?: string;                // 營業時間
  WebsiteUrl?: string;              // 店家網站網址
  Picture?: TourismPicture;         // 店家照片
  Position?: PointType;             // 店家位置
  Class?: string;                   // 店家分類
  MapUrl?: string;                  // 店家地圖/簡圖介紹網址 
  ParkingInfo?: string;             // 停車資訊
  City?: string;                    // 所屬縣市
  SrcUpdateTime: string;            // 觀光局檔案更新時間(ISO8601格式: yyyy - MM - ddTHH: mm: sszzz)
  UpdateTime: string;               // 本平台資料更新時間(ISO8601格式: yyyy - MM - ddTHH: mm: sszzz)
}

export interface HotelTourismInfo {
  ID: string;                       // 旅館民宿代碼
  Name?: string;                    // 旅館民宿名稱
  Description?: string;             // 旅館民宿簡述
  Grade?: string;                   // 觀光旅館星級
  Address?: string;                 // 旅館民宿地址
  ZipCode?: string;                 // 郵遞區號
  Phone?: string;                   // 旅館民宿電話
  Fax?: string;                     // 旅館民宿傳真
  WebsiteUrl?: string;              // 旅館民宿網站網址
  Picture?: TourismPicture;         // 旅館民宿照片
  Position?: PointType;             // 旅館民宿位置
  Class?: string;                   // 旅館民宿分類
  MapUrl?: string;                  // 旅館民宿地點簡圖連結網址
  Spec?: string;                    // 房型、價目及數量說明
  ServiceInfo?: string;             // 服務內容介紹
  ParkingInfo?: string;             // 停車資訊
  City?: string;                    // 所屬縣市
  SrcUpdateTime: string;            // 觀光局檔案更新時間(ISO8601格式: yyyy-MM - ddTHH: mm:sszzz) 
  UpdateTime: string;               // 本平台資料更新時間(ISO8601格式: yyyy - MM - ddTHH: mm: sszzz)
}

export interface BusA1Data {
  PlateNumb: string;              // 車牌號碼
  OperatorID?: string;            // 營運業者代碼
  RouteUID?: string;              // 路線唯一識別代碼，規則為 {業管機關代碼} + {RouteID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID?: string;               // 地區既用中之路線代碼(為原資料內碼)
  TaiwanTripName?: NameType;      // 台灣好行路線名稱
  SubRouteUID?: string;           // 子路線唯一識別代碼，規則為 {業管機關代碼} + {SubRouteID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢
  SubRouteID?: string;            // 地區既用中之子路線代碼(為原資料內碼)
  SubRouteName?: NameType;        // 子路線名稱
  Direction?: number;             // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  BusPosition?: PointType;        // 車輛位置經度
  Speed: number;                  // 行駛速度(kph)
  Azimuth: number;                // 方位角
  DutyStatus: number;             // 勤務狀態 : [0:'正常',1:'開始',2:'結束']
  BusStatus: number;              // 行車狀況 : [0:'正常',1:'車禍',2:'故障',3:'塞車',4:'緊急求援',5:'加油',90:'不明',91:'去回不明',98:'偏移路線',99:'非營運狀態',100:'客滿',101:'包車出租',255:'未知']
  MessageType?: number;           // 資料型態種類 : [0:'未知',1:'定期',2:'非定期']
  GPSTime: string;                // 車機時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  TransTime?: string;             // 車機資料傳輸時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  SrcRecTime?: string;            // 來源端平台接收時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  SrcUpdateTime?: string;         // 來源端平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string;             // 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
}
export interface NameType {
  Zh_tw?: string;       // 中文繁體名稱,
  En?: string;          // 英文名稱
}