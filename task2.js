const orders = [
  {
    id: "ORD-1001",
    createdAt: "2026-03-29T10:15:00",
    customer: {
      id: 1,
      name: "Иван Петров",
      email: "ivan@example.com",
      phone: "+79990001122",
      address: {
        city: "Москва",
        street: "Ленина, 10",
        zip: "101000"
      }
    },
    items: [
      {
        sku: "KB-001",
        name: "Клавиатура",
        price: 3500,
        quantity: 1,
        category: "electronics"
      },
      {
        sku: "MS-002",
        name: "Мышь",
        price: 1800,
        quantity: 2,
        category: "electronics"
      }
    ],
    payment: {
      method: "card",
      status: "paid"
    },
    tags: ["new", "priority"],
    comment: "Доставить до 18:00"
  },
  {
    id: "ORD-1002",
    createdAt: "2026-03-29T11:20:00",
    customer: {
      id: 2,
      name: "Анна Смирнова",
      email: "anna@example.com",
      phone: null,
      address: {
        city: "Казань",
        street: "Пушкина, 5",
        zip: "420000"
      }
    },
    items: [
      {
        sku: "MN-010",
        name: "Монитор",
        price: 12500,
        quantity: 1,
        category: "electronics"
      }
    ],
    payment: {
      method: "cash",
      status: "pending"
    },
    tags: [],
    comment: ""
  },
  {
    id: "ORD-1003",
    createdAt: "2026-03-29T12:05:00",
    customer: {
      id: 3,
      name: "Дмитрий Волков",
      email: "d.volkov@example.com",
      phone: "+79995556677",
      address: {
        city: "Санкт-Петербург",
        street: "Невский, 25",
        zip: "190000"
      }
    },
    items: [
      {
        sku: "TB-777",
        name: "Планшет",
        price: 22000,
        quantity: 1,
        category: "electronics"
      },
      {
        sku: "CS-333",
        name: "Чехол",
        price: 1200,
        quantity: 1,
        category: "accessories"
      },
      {
        sku: "CB-444",
        name: "Кабель USB-C",
        price: 900,
        quantity: 3,
        category: "accessories"
      }
    ],
    payment: {
      method: "card",
      status: "paid"
    },
    tags: ["repeat"],
    comment: "Позвонить перед доставкой"
  },
  {
    id: "ORD-1004",
    createdAt: "2026-03-29T13:40:00",
    customer: {
      id: 4,
      name: "Елена Орлова",
      email: "elena@example.com",
      phone: "+79998887766",
      address: {
        city: "Екатеринбург",
        street: "Мира, 8",
        zip: "620000"
      }
    },
    items: [
      {
        sku: "LP-900",
        name: "Ноутбук",
        price: 68990,
        quantity: 1,
        category: "electronics"
      }
    ],
    payment: {
      method: "card",
      status: "failed"
    },
    tags: ["vip"],
    comment: null
  },
  {
    id: "ORD-1005",
    createdAt: "2026-03-29T15:10:00",
    customer: {
      id: 5,
      name: "Сергей Ким",
      email: "sergey@example.com",
      phone: "+79997775544",
      address: {
        city: "Новосибирск",
        street: "Советская, 12",
        zip: "630000"
      }
    },
    items: [
      {
        sku: "HD-100",
        name: "Жесткий диск",
        price: 5400,
        quantity: 2,
        category: "storage"
      },
      {
        sku: "FD-200",
        name: "Флешка",
        price: 950,
        quantity: 4,
        category: "storage"
      }
    ],
    payment: {
      method: "card",
      status: "paid"
    },
    tags: ["new"],
    comment: "Оставить у консьержа"
  }
];

const processedOrders = [];

for (const order of orders) {
  let totalCost = 0;
  let totalQuantity = 0;

  for (const item of order.items) {
    totalCost += item.price * item.quantity;
    totalQuantity += item.quantity;
  }

  const newOrder = {
    orderId: order.id,
    customerName: order.customer.name,
    city: order.customer.address.city,
    email: order.customer.email,
    totalCost: totalCost,
    totalQuantity: totalQuantity,
    itemsCount: order.items.length,
    paymentStatus: order.payment.status,
    paymentMethod: order.payment.method,
    hasComment: order.comment !== null && order.comment !== "",
    tagsCount: order.tags.length,
    isPriority: order.tags.includes("priority")
  };

  processedOrders.push(newOrder);
}

console.log("Обработанные заказы:");
console.log(processedOrders);

const paidOrders = [];

for (const order of processedOrders) {
  if (order.paymentStatus === "paid") {
    paidOrders.push(order);
  }
}

console.log("Только оплаченные:");
console.log(paidOrders);

let totalPaidOrdersSum = 0;

for (const order of processedOrders) {
  if (order.paymentStatus === "paid") {
    totalPaidOrdersSum += order.totalCost;
  }
}

console.log("Сумма оплаченных заказов:");
console.log(totalPaidOrdersSum);

let biggestOrder = null;

for (const order of processedOrders) {
  if (biggestOrder === null || order.totalCost > biggestOrder.totalCost) {
    biggestOrder = order;
  }
}

console.log("Самый дорогой заказ:");
console.log(biggestOrder);