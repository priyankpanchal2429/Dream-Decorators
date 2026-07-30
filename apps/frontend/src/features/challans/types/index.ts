export interface DeliveryChallan {
  id: string;
  challanNumber: string;
  customerName: string;
  vehicleNumber: string;
  dispatchDate: string;
  itemCount: number;
  status: 'DELIVERED' | 'IN_TRANSIT' | 'RETURNED';
}
