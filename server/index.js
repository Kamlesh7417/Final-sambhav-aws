import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '../dist')));

const orders = [
    {
        "order_id": "ORD334271",
        "order_placed_timestamp": "20/11/2024 15:55:03",
        "order_status": "Delivered",
        "product": {
            "name": "Apple Watch Series 9 GPS + Cellular",
            "dimensions": "15 x 10 x 5 cm",
            "weight": "0.3kg",
            "quantity": 1
        },
        "customer_address": "Emily Roberts, 45 Victoria Street, Manchester, M2 3NH, United Kingdom",
        "warehouse_address": "GADA RETAIL PRIVATE LIMITED, Suburb Residency Private Limited Plot No 01, Omshree Industrial Park PO, PS -, MUMBAI, 400001, INDIA",
        "seller_address": "GADA RETAIL PRIVATE LIMITED, Suburb Residency Private Limited Plot No 01, Omshree Industrial Park PO, PS -, MUMBAI, 400001, INDIA"
    },
    {
        "order_id": "ORD334280",
        "order_placed_timestamp": "21/11/2024 21:55:03",
        "order_status": "Open",
        "product": {
            "name": "iPhone 15 Pro Max",
            "dimensions": "15.9 x 7.67 x 0.83 cm",
            "weight": "0.221kg",
            "quantity": 2
        },
        "customer_address": "John Smith, 123 Main Street, New York, NY 10001, USA",
        "warehouse_address": "GADA RETAIL PRIVATE LIMITED, Suburb Residency Private Limited Plot No 01, Omshree Industrial Park PO, PS -, MUMBAI, 400001, INDIA",
        "seller_address": "GADA RETAIL PRIVATE LIMITED, Suburb Residency Private Limited Plot No 01, Omshree Industrial Park PO, PS -, MUMBAI, 400001, INDIA"
    }
];

// API Routes
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
    const order = orders.find(o => o.order_id === req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});