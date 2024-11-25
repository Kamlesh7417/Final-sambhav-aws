import React from 'react';
import { Order } from '../../types/orders';

interface OrdersTableRowProps {
  order: Order;
  onClick: () => void;
}

const OrdersTableRow: React.FC<OrdersTableRowProps> = ({ order, onClick }) => {
  return (
    <tr 
      onClick={onClick}
      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {order.order_id}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {new Date(order.timestamp).toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        }`}>
          {order.status}
        </span>
      </td>
    </tr>
  );
};

export default OrdersTableRow;