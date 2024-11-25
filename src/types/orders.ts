export interface Order {
  order_id: string;
  timestamp: string; // Adding timestamp field
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    specifications: {
      weight: string;
      dimensions: string;
      category: string;
    };
  }>;
  origin: string;
  destination: string;
  sellerAddress: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}