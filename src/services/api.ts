import axios from 'axios';

export interface Product {
    name: string;
    dimensions: string;
    weight: string;
    quantity: number;
}

export interface OrderResponse {
    order_id: string;
    order_placed_timestamp: string;
    order_status: string;
    product: Product;
    customer_address: string;
    warehouse_address: string;
    seller_address: string;
}

const api = axios.create({
    baseURL: '/api'
});

export const fetchOrders = async (): Promise<OrderResponse[]> => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const fetchOrderById = async (orderId: string): Promise<OrderResponse> => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching order ${orderId}:`, error);
        throw error;
    }
};