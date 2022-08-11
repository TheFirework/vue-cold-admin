interface Window {
    $message: MessageApiInjection;
    $loadingBar:LoadingBarInst;
    $dialog:DialogApiInjection;
    $notification:NotificationApiInjection;
  }

  declare type Recordable<T = any> = Record<string, T>;