import React from 'react';
import { Card } from '@/components/card/Card';
import { ActivityItem } from '../../types';
import { FileText, Receipt, CreditCard, ShoppingBag, Package } from 'lucide-react';

interface RecentActivityWidgetProps {
  activities: ActivityItem[];
}

export const RecentActivityWidget: React.FC<RecentActivityWidgetProps> = ({ activities }) => {
  const icons = {
    SALES_CREATED: <Receipt className="h-4 w-4 text-primary" />,
    QUOTATION_CREATED: <FileText className="h-4 w-4 text-txtSecondary" />,
    PAYMENT_RECEIVED: <CreditCard className="h-4 w-4 text-success" />,
    PURCHASE_ADDED: <ShoppingBag className="h-4 w-4 text-warning" />,
    INVENTORY_UPDATED: <Package className="h-4 w-4 text-txtPrimary" />,
  };

  return (
    <Card>
      <div className="flex items-center justify-between pb-3 border-b border-borderClr mb-3">
        <h3 className="text-xs font-bold text-txtPrimary">Recent Business Activity</h3>
        <button className="text-[10px] font-bold text-primary hover:underline">View Log</button>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start gap-3 text-xs">
            <div className="p-2 rounded-xl bg-gray-50 border border-borderClr shrink-0 mt-0.5">
              {icons[act.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-txtPrimary truncate">{act.title}</p>
              <span className="text-[10px] text-txtSecondary">{act.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
