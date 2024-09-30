class AppStateSingleton {
  private static instance: AppStateSingleton;
  private isSkipAllScanDocument: boolean;

  private constructor() {
    this.isSkipAllScanDocument = false;
  }

  public static getInstance(): AppStateSingleton {
    if (!AppStateSingleton.instance) {
      AppStateSingleton.instance = new AppStateSingleton();
    }
    return AppStateSingleton.instance;
  }

  setIsSkipAllScanDocument(isSkipAllScanDocument: boolean) {
    this.isSkipAllScanDocument = isSkipAllScanDocument;
  }

  getIsSkipAllScanDocument() {
    return this.isSkipAllScanDocument;
  }
}

export default AppStateSingleton;
