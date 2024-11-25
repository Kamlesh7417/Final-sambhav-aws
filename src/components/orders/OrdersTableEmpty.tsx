import React from 'react';

const OrdersTableEmpty: React.FC = () => {
  return (
    <tr>
      <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
        No orders found
      </td>
    </tr>
  );
};

export default OrdersTableEmpty;