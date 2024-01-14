'use client'

import { createContext, useEffect, useState } from "react";

interface Order {
  count: number;
  _id: string;
}

interface OrdersContextProps {
  orders: Order[];
  orderCount: number; // New property to store the count
  addOrder: (order: Order) => void;
}

export const OrdersContext = createContext<OrdersContextProps>({
  orders: [],
  orderCount: 13, // Initialize count to 0
  addOrder: (order: Order) => {},
});

export default function OrdersProvider({ children }: any) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderCount, setOrderCount] = useState<number>(0);

  useEffect(() => {
    setOrderCount(orders.length);
  }, [orders]);

  function addOrder(order: Order) {
    setOrders((prevOrders) => [...prevOrders, order]);
    setOrderCount((prevCount) => prevCount + 1);
    console.log(orderCount);
  }

  return (
    <OrdersContext.Provider value={{ orders, orderCount, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}