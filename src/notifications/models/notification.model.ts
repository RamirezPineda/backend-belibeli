export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  private: boolean;
  date: Date;
  hour: Date;
  orderId: string;
}

export interface CreateNotification
  extends Omit<Notification, 'id' | 'private' | 'read' | 'date' | 'hour'> {
  private?: boolean;
}
