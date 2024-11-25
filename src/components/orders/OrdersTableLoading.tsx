import React from 'react';

const OrdersTableLoading: React.FC = () => {
  return (
    <tr>
      <td colSpan={3} className="px-6 py-4 text-center">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-500 border-t-transparent"></div>
        </div>
      </td>
    </tr>
  );
};

export default OrdersTableLoading;