import { NameType, PointType, SelectItem } from "."

export interface BusNews {
  NewsID: string;                     // 最新消息原單位發布代碼 ,
  Language: string;                   // 語系 ,
  Department: string;                 // 發布單位 ,
  Title: string;                      // 消息標題 ,
  NewsCategory: NewsCategoryEnum;     // 消息類別 : [1:'最新消息',2:'新聞稿',3:'營運資訊',4:'轉乘資訊',5:'活動訊息',6:'系統公告',7:'通阻資訊',99:'其他'] ,
  Description: string;                // 內容描述 ,
  ContactName: string;                // 聯絡人/單位 ,
  ContactPhone: string;               // 聯絡電話 ,
  NewsURL: string;                    // 報導網站連結 ,
  AttachmentURL: string;              // 相關網站連結 ,
  PublishTime: string;                // 消息公告日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  StartTime: string;                  // 開始時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  EndTime: string;                    // 結束時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  SrcUpdateTime: string;              // 來源端平台資料更新時間 ,
  UpdateTime: string;                 // 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)  
}

export enum NewsCategoryEnum {
  '最新消息' = 1,
  '新聞稿' = 2,
  '營運資訊' = 3,
  '轉乘資訊' = 4,
  '活動訊息' = 5,
  '系統公告' = 6,
  '通阻資訊' = 7,
  '其他' = 99,
}

export interface BusStop {
  StopUID: string;                    // 站牌唯一識別代碼，規則為 {業管機關簡碼} + {StopID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StopID: string;                     // 地區既用中之站牌代碼(為原資料內碼)
  AuthorityID: string;                // 業管機關代碼
  StopName: NameType;                 // 站牌名稱
  StopPosition: PointType;            // 站牌位置
  StopAddress?: string;               // 站牌地址
  Bearing?: string;                   // 方位角，E:東行;W:西行;S:南行;N:北行;SE:東南行;NE:東北行;SW:西南行;NW:西北行
  StationID?: string;                 // 站牌所屬的站位ID
  StationGroupID: string;             // 站牌所屬的組站位ID
  StopDescription?: string;           // 站牌詳細說明描述
  City?: string;                      // 站牌權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值]
  CityCode?: string;                  // 站牌權管所屬縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
  LocationCityCode?: string;          // 站牌位置縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
  UpdateTime: string;                 // 資料更新日期時間(ISO8601格式: yyyy-MM - ddTHH: mm:sszzz)
  VersionID: number;                  // 資料版本編號
}

export interface StationStop {
  StopUID: string;                    // 站牌唯一識別代碼，規則為 {業管機關簡碼} + {StopID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StopID: string;                     // 地區既用中之站牌代碼(為原資料內碼)
  StopName: NameType;                 // 站牌名稱
  RouteUID: string;                   // 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID: string;                    // 地區既用中之路線代碼(為原資料內碼)
  RouteName: NameType;                // 路線名稱
}

export interface BusStation {
  StationUID: string;                 // 站位唯一識別代碼，規則為 {業管機關簡碼} + {StationID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StationID: string;                  // 站位代碼
  StationName: NameType;              // 站位名稱
  StationPosition: PointType;         // 站位位置
  StationAddress?: string;            // 站位地址
  StationGroupID: string;             // 站牌所屬的組站位ID
  Stops?: StationStop[];              // 站牌與所行經此站牌之路線列表(資料會對路線展開，因此可能會有重複的站牌資料)
  LocationCityCode?: string;          // 站牌位置縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
  Bearing?: string;                   // 方位角，E:東行;W:西行;S:南行;N:北行;SE:東南行;NE:東北行;SW:西南行;NW:西北行
  UpdateTime: string;                 // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  VersionID: number;                  // (Int32): 資料版本編號
}

export interface BusStopOfRoute {
  RouteUID: string;                 // 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  RouteID: string;                  // 地區既用中之路線代碼(為原資料內碼) ,
  RouteName: NameType;              // 路線名稱 ,
  Operators?: RouteOperator[];       // 營運業者 ,
  SubRouteUID: string;              // 附屬路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  SubRouteID: string;               // 地區既用中之附屬路線代碼(為原資料內碼) ,
  SubRouteName: NameType;           // 附屬路線名稱 ,
  Direction?: number;               // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知'] ,
  City?: string;                    // 站牌權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值] ,
  CityCode?: string;                // 站牌權管所屬縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值] ,
  Stops: Stop[];                    // 所有經過站牌 ,
  UpdateTime: string;               // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  VersionID: number;                // 資料版本編號
}

export interface RouteOperator {
  OperatorID: string;         // 營運業者代碼
  OperatorName: NameType;     // 營運業者名稱
  OperatorCode: string;       // 營運業者簡碼
  OperatorNo: string;         // 營運業者編號[交通部票證資料系統定義]
}

export interface Stop {
  StopUID: string;                // 站牌唯一識別代碼，規則為 {業管機關簡碼} + {StopID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StopID: string;                 // 地區既用中之站牌代碼(為原資料內碼)
  StopName: NameType;             // 站牌名稱
  StopBoarding?: number;          // 上下車站別 : [-1:'可下車',0:'可上下車',1:'可上車']
  StopSequence: number;           // 路線經過站牌之順序
  StopPosition: PointType;        // 站牌位置
  StationID?: string;             // 站牌所屬的站位ID
  StationGroupID: string;         // 站牌所屬的組站位ID
  LocationCityCode: string;       // 站牌位置縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
}

export class StopWithRoute {
  StopID: string;
  StopName: string;
  StopAddress: string;
  Routes: string[];

  /**
   * 站點及站點路線
   * @param StopID 站點編號
   * @param StopName 站點名稱
   * @param StopAddress 站點地址
   * @param Routes 相關路線資料
   */
  constructor(
    StopID: string,
    StopName: string,
    StopAddress: string,
    Routes: string[]
  ) {
    this.StopID = StopID;
    this.StopName = StopName;
    this.StopAddress = StopAddress;
    this.Routes = Routes;
  }
}

export interface BusRoute {
  RouteUID: string;                       // 路線唯一識別代碼，規則為 {業管機關簡碼} + {RouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID: string;                        // 地區既用中之路線代碼(為原資料內碼)
  HasSubRoutes: boolean;                  // 實際上是否有多條附屬路線。(此欄位值與SubRoutes結構並無強烈的絕對關聯。詳細說明請參閱swagger上方的【資料服務使用注意事項】)
  Operators: RouteOperator[];             // 營運業者
  AuthorityID: string;                    // 業管機關代碼
  ProviderID: string;                     // 資料提供平台代碼
  SubRoutes?: BusSubRoute[];              // 附屬路線資料(如果原始資料並無提供附屬路線ID，而本平台基於跨來源資料之一致性，會以SubRouteID=RouteID產製一份相對應的附屬路線資料(若有去返程，則會有兩筆))
  BusRouteType: BusRouteTypeEnum;         // 公車路線類別 : [11:'市區公車',12:'公路客運',13:'國道客運',14:'接駁車']
  RouteName: NameType;                    //  路線名稱
  DepartureStopNameZh?: string;           // 起站中文名稱
  DepartureStopNameEn?: string;           // 起站英文名稱
  DestinationStopNameZh?: string;         // 終點站中文名稱
  DestinationStopNameEn?: string;         // 終點站英文名稱
  TicketPriceDescriptionZh?: string;      // 票價中文敘述
  TicketPriceDescriptionEn?: string;      // 票價英文敘述
  FareBufferZoneDescriptionZh?: string;   // 收費緩衝區中文敘述
  FareBufferZoneDescriptionEn?: string;   // 收費緩衝區英文敘述
  RouteMapImageUrl?: string;              // 路線簡圖網址
  City?: string;                          // 路線權管所屬縣市(相當於市區公車API的City參數)[若為公路/國道客運路線則為空值]
  CityCode?: string;                      // 路線權管所屬縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
  UpdateTime: string;                     // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  VersionID: number;                      // 資料版本編號
}

export enum BusRouteTypeEnum {
  '市區公車' = 11,
  '公路客運' = 12,
  '國道客運' = 13,
  '接駁車' = 14,
}

export interface BusSubRoute {
  SubRouteUID: string;              // 附屬路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  SubRouteID: string;               // 地區既用中之附屬路線代碼(為原資料內碼)
  OperatorIDs: string[];            // 營運業者代碼
  SubRouteName: NameType;           // 附屬路線名稱
  Headsign?: string;                // 車頭描述
  HeadsignEn?: string;              // 車頭英文描述
  Direction: DirectionEnum;         // 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  FirstBusTime?: string;            // 平日第一班發車時間
  LastBusTime?: string;             // 平日返程第一班發車時間
  HolidayFirstBusTime?: string;     // 假日去程第一班發車時間
  HolidayLastBusTime?: string;      // 假日返程第一班發車時間
}

export enum DirectionEnum {
  '去程' = 0,
  '返程' = 1,
  '迴圈' = 2,
  '未知' = 255,
}

// EstimateTime: [當StopStatus値為2~4或PlateNumb値為-1時，EstimateTime値為null; 當StopStatus値為1時， EstimateTime値多數為null，僅部分路線因有固定發車時間，故EstimateTime有値; 當StopStatus値為0時，EstimateTime有値。] ,
export interface BusN1EstimateTime {
  PlateNumb?: string;               // 車牌號碼 [値為値為-1時，表示目前該站位無車輛行駛]
  StopUID?: string;                 // 站牌唯一識別代碼，規則為 {業管機關簡碼} + {StopID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StopID?: string;                  // 地區既用中之站牌代碼(為原資料內碼)
  StopName?: NameType;              // 站牌名
  RouteUID?: string;                // 路線唯一識別代碼，規則為 {業管機關代碼} + {RouteID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteID?: string;                 // 地區既用中之路線代碼(為原資料內碼)
  RouteName?: NameType;             // 路線名稱
  SubRouteUID?: string;             // 子路線唯一識別代碼，規則為 {業管機關簡碼} + {SubRouteID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  SubRouteID?: string;              // 地區既用中之子路線代碼(為原資料內碼)
  SubRouteName?: NameType;          // 子路線名稱
  Direction: DirectionEnum;         // 去返程(該方向指的是此車牌車輛目前所在路線的去返程方向，非指站站牌所在路線的去返程方向，使用時請加值業者多加注意) : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  EstimateTime?: number;            // 到站時間預估(秒)
  StopCountDown?: number;           // 車輛距離本站站數
  CurrentStop?: string;             // 車輛目前所在站牌代碼
  DestinationStop?: string;         // 車輛目的站牌代碼
  StopSequence?: number;            // 路線經過站牌之順序
  StopStatus?: StopStatusEnum;      // 車輛狀態備註 : [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運']
  MessageType?: number;             // 資料型態種類 : [0:'未知',1:'定期',2:'非定期']
  NextBusTime?: string;             // 下一班公車到達時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  IsLastBus?: boolean;              // 是否為末班車
  Estimates?: Estimate[];           // 到站時間預估
  DataTime?: string;                // 系統演算該筆預估到站資料的時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[目前僅公總提供此欄位資訊]
  TransTime?: string;               // 車機資料傳輸時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz))[該欄位在N1資料中無意義]
  SrcRecTime?: string;              // 來源端平台接收時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz))[該欄位在N1資料中無意義]
  SrcTransTime?: string;            // 來源端平台資料傳出時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[公總使用動態即時推播故有提供此欄位, 而非公總系統因使用整包資料更新, 故沒有提供此欄位]
  SrcUpdateTime?: string;           // 來源端平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)[公總使用動態即時推播故沒有提供此欄位, 而非公總系統因提供整包資料更新, 故有提供此欄]
  UpdateTime: string;               // 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
}

export enum StopStatusEnum {
  '讀取中' = -1, // 自己加的
  '正常' = 0,
  '未發車' = 1,
  '交管不停靠' = 2,
  '末班車已過' = 3,
  '今日未營運' = 4,
}

export interface Estimate {
  PlateNumb?: string;                               // 車輛車牌號碼
  EstimateTime?: number;                            // 車輛之到站時間
  IsLastBus?: boolean;                              // 是否為末班車
  VehicleStopStatus?: VehicleStopStatusEnum;        // 車輛於該站之進離站狀態 : [0:'離站',1:'進站']
}

export enum VehicleStopStatusEnum {
  '離站' = 0,
  '進站' = 1,
}

export class BusStopEstimateTime {
  StopUID: string;
  StopName: string;
  PlateNumb: string;
  Direction: DirectionEnum;
  StopStatus: StopStatusEnum;
  EstimateTime: number;
  lat: number;
  lon: number;
  UpdateTime: string;

  /**
   * 公車預估到時間
   * @param StopUID 車站編號
   * @param StopName 車站名稱
   * @param PlateNumb 到站車牌號碼
   * @param Direction 方向
   * @param StopStatus 車站狀態
   * @param EstimateTime 預估到站時間（秒）
   * @param lat 緯度
   * @param lon 經度
   * @param UpdateTime 更新時間
   */
  constructor(
    StopUID: string,
    StopName: string,
    PlateNumb: string,
    Direction: DirectionEnum,
    StopStatus: StopStatusEnum,
    EstimateTime: number,
    lat: number,
    lon: number,
    UpdateTime: string
  ) {
    this.StopUID = StopUID;
    this.StopName = StopName;
    this.PlateNumb = PlateNumb;
    this.Direction = Direction;
    this.StopStatus = StopStatus;
    this.EstimateTime = EstimateTime;
    this.lat = lat;
    this.lon = lon;
    this.UpdateTime = UpdateTime;
  }
}