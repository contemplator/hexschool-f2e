export interface AutoCompleteSearchEvent {
  originalEvent: InputEvent;
  query: string;
}

export enum SeverityEnum {
  'success' = 'success',
  'info' = 'info',
  'warn' = 'warn',
  'error' = 'error'
}

// 系統訊息
export class ToastMsg {
  severity: SeverityEnum;
  summary: string;
  detail: string;
  life?: number;

  constructor(severity: SeverityEnum, summary: string, detail: string, life = 3000) {
    this.severity = severity;
    this.summary = summary;
    this.detail = detail;
    this.life = life;
  }
}

// 警告加上建議操作的訊息
export class ConfirmMsg {
  header: string;
  message: string;
  acceptVisible: boolean;
  acceptLabel: string;
  accept: () => void;
  rejectVisible: boolean;
  rejectLabel: string;
  reject: () => void;
  key?: string;
  icon?: string;

  /**
   * Prime Ng 的 ConfirmationService.confirm 物件
   * @param header 標題
   * @param message 內容
   * @param acceptVisible 確認按鈕是否可見
   * @param acceptLabel 確認按鈕文字
   * @param accept 確認按鈕執行的邏輯
   * @param rejectVisible 取消按鈕是否可見
   * @param rejectLabel 取消按鈕文字
   * @param reject 取消按鈕執行的邏輯
   * @param icon 內容開頭的圖示
   * @param key 唯一鍵
   */
  constructor(
    header: string,
    message: string,
    acceptVisible: boolean = true,
    acceptLabel: string = '确认',
    accept: () => void,
    rejectVisible: boolean = false,
    rejectLabel: string = '取消',
    reject: () => void,
    icon?: string,
    key?: string
  ) {
    this.header = header;
    this.message = message;
    this.acceptVisible = acceptVisible;
    this.acceptLabel = acceptLabel;
    this.accept = accept;
    this.rejectVisible = rejectVisible;
    this.rejectLabel = rejectLabel;
    this.reject = reject;
  }
}

export interface TabChangeEvent {
  originalEvent: MouseEvent;
  index: number;
}

export class Column {
  field: string;
  header: string;
  width: number;

  /**
   * 用於 Primeng Table Column、Excel Column
   * @param field 資料欄位
   * @param header 欄位標題
   * @param width 欄位寬度
   */
  constructor(field: string, header: string, width: number) {
    this.field = field;
    this.header = header;
    this.width = width;
  }
}

export class SelectItem {
  label: string;
  value: any;
  disabled?: boolean;

  constructor(label: string, value: any) {
    this.label = label;
    this.value = value;
  }
}

export interface DropdwonChangeEvent {
  originalEvent: any;
  value: any;
}