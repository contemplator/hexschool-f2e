import { NameType, PointType } from ".";

export interface BikeStation {
  StationUID: string;                // 站點唯一識別代碼，規則為 {業管機關代碼} + {StationID}，其中 {業管機關代碼} 可於Authority API中的 AuthorityCode欄位查詢
  StationID: string;                 // 站點代碼
  AuthorityID: string;               // 業管單位代碼
  StationName: NameType;             // 站點名稱
  StationPosition: PointType;        // 站點位置
  StationAddress: NameType;          // 站點地址
  StopDescription: string;           // 站點描述
  BikesCapacity: number;             // 可容納之自行車總數
  ServiceType: number;               // 服務類型 : [1: 'YouBike1.0', 2: 'YouBike2.0'] 
  SrcUpdateTime: string;             // 來源端平台資料更新時間(ISO8601格式: yyyy-MM - ddTHH: mm:sszzz) 
  UpdateTime: string;                 // 資料更新日期時間(ISO8601格式: yyyy - MM - ddTHH: mm: sszzz)
}

export interface BikeAvailability {
  StationUID: string;                // 站點唯一識別代碼，規則為 {業管機關代碼} + {StationID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢 ,
  StationID: string;                 // 站點代碼 ,
  ServiceStatus: number;             // 服務狀態 : [0:'停止營運',1:'正常營運',2:'暫停營運'] ,
  ServiceType: number;               // 服務類型 : [1:'YouBike1.0',2:'YouBike2.0'] ,
  AvailableRentBikes: number;        // 可租借車數 ,
  AvailableReturnBikes: number;      // 可歸還車數 ,
  SrcUpdateTime: string;             // 來源端平台資料更新時間(ISO8601格式: yyyy-MM - ddTHH: mm:sszzz) ,
  UpdateTime: string;                 // 資料更新日期時間(ISO8601格式: yyyy - MM - ddTHH: mm: sszzz)
}

export class BikeStationInfo {
  StationUID: string;
  StationID: string;
  AuthorityID: string;
  StationName: NameType;
  StationPosition: PointType;
  StationAddress: NameType;
  StopDescription: string;
  BikesCapacity: number;
  ServiceType: number;
  SrcUpdateTime: string;
  ServiceStatus: number;
  AvailableRentBikes: number;
  AvailableReturnBikes: number;

  constructor(
    StationUID: string, 
    StationID: string, 
    AuthorityID: string, 
    StationName: NameType, 
    StationPosition: PointType, 
    StationAddress: NameType, 
    StopDescription: string, 
    BikesCapacity: number, 
    ServiceType: number, 
    SrcUpdateTime: string, 
    ServiceStatus: number, 
    AvailableRentBikes: number, 
    AvailableReturnBikes: number
) {
    this.StationUID = StationUID;
    this.StationID = StationID;
    this.AuthorityID = AuthorityID;
    this.StationName = StationName;
    this.StationPosition = StationPosition;
    this.StationAddress = StationAddress;
    this.StopDescription = StopDescription;
    this.BikesCapacity = BikesCapacity;
    this.ServiceType = ServiceType;
    this.SrcUpdateTime = SrcUpdateTime;
    this.ServiceStatus = ServiceStatus;
    this.AvailableRentBikes = AvailableRentBikes;
    this.AvailableReturnBikes = AvailableReturnBikes;
  }
}

export interface BikeShape {
  RouteName: string;                  // 路線名稱
  AuthorityName?: string;             // 業管機關名稱（可能包含多個業管機關）
  CityCode: string;                   // 路線所在縣市代碼
  City: string;                       // 路線所在縣市名稱
  Town?: string;                      // 路線所在鄉鎮名稱（可能包含多個鄉鎮）
  RoadSectionStart?: string;          // 路線起點描述
  RoadSectionEnd?: string;            // 路線迄點描述
  Direction?: string;                 // 自行車道車行方向
  CyclingType?: string;               // 自行車道類型
  CyclingLength?: number;             // 自行車道長度
  FinishedTime?: string;              // 自行車道完工日期時間
  UpdateTime: string;                 // 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  Geometry: string;                   // well-known text，為路線軌跡資料
  EncodedPolyline: string;            // 路線軌跡編碼(encoded polyline)
}