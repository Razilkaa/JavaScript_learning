const dealsJson = `{
  "meta": {
    "requestId": "req-7788",
    "source": "crm_api",
    "generatedAt": "2026-03-30T09:45:00Z"
  },
  "deals": [
    {
      "id": "DL-1001",
      "status": "open",
      "manager": {
        "id": 11,
        "name": "Алексей"
      },
      "client": {
        "id": 501,
        "name": "ООО Вектор",
        "inn": "7701234567",
        "contacts": {
          "email": "info@vector.ru",
          "phone": "+74950000001"
        }
      },
      "products": [
        {
          "symbol": "SBER",
          "quantity": 100,
          "price": 312.45
        },
        {
          "symbol": "GAZP",
          "quantity": 50,
          "price": 181.12
        }
      ],
      "comment": "Срочная сделка",
      "tags": ["priority", "broker"]
    },
    {
      "id": "DL-1002",
      "status": "closed",
      "manager": {
        "id": 12,
        "name": "Марина"
      },
      "client": {
        "id": 502,
        "name": "АО Спектр",
        "inn": "7733445566",
        "contacts": {
          "email": "trade@spektr.ru",
          "phone": null
        }
      },
      "products": [
        {
          "symbol": "LKOH",
          "quantity": 30,
          "price": 7210
        }
      ],
      "comment": "",
      "tags": []
    },
    {
      "id": "DL-1003",
      "status": "open",
      "manager": {
        "id": 11,
        "name": "Алексей"
      },
      "client": {
        "id": 503,
        "name": "ИП Соколов",
        "inn": "540998877665",
        "contacts": {
          "email": null,
          "phone": "+79161234567"
        }
      },
      "products": [
        {
          "symbol": "ROSN",
          "quantity": 80,
          "price": 598.4
        },
        {
          "symbol": "NVTK",
          "quantity": 20,
          "price": 1344.8
        },
        {
          "symbol": "YDEX",
          "quantity": 10,
          "price": 4180
        }
      ],
      "comment": null,
      "tags": ["manual"]
    }
  ]
}`;

const data = JSON.parse(dealsJson);

const processedDeals = [];

for (const deal of data.deals) {
  let totalQuantity = 0;
  let totalAmount = 0;

  for (const product of deal.products) {
    totalQuantity += product.quantity;
    totalAmount += product.quantity * product.price;
  }

  const newDeal = {
    dealId: deal.id,
    status: deal.status,
    managerName: deal.manager.name,
    clientName: deal.client.name,
    clientInn: deal.client.inn,
    clientEmail: deal.client.contacts.email,
    clientPhone: deal.client.contacts.phone,
    productsCount: deal.products.length,
    totalQuantity: totalQuantity,
    totalAmount: totalAmount,
    hasComment: deal.comment !== null && deal.comment !== "",
    tagsCount: deal.tags.length,
    isPriority: deal.tags.includes("priority"),
    source: data.meta.source
  };

  processedDeals.push(newDeal);
}

console.log("Обработанные сделки:");
console.log(processedDeals);

const openDeals = [];

for (const deal of processedDeals) {
  if (deal.status === "open") {
    openDeals.push(deal);
  }
}

console.log("Открытые сделки:");
console.log(openDeals);

let totalOpenDealsAmount = 0;

for (const deal of processedDeals) {
  if (deal.status === "open") {
    totalOpenDealsAmount += deal.totalAmount;
  }
}

console.log("Сумма открытых сделок:");
console.log(totalOpenDealsAmount);

const exportData = {
  exportSource: data.meta.source,
  exportedAt: data.meta.generatedAt,
  records: processedDeals
};

const prettyExportJson = JSON.stringify(exportData, null, 2);

console.log("JSON для выгрузки:");
console.log(prettyExportJson);