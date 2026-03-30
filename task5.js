const clients = [
  {
    id: 1,
    name: "ООО Вектор",
    role: "vip",
    source: "crm",
    contact: {
      email: "info@vector.ru",
      phone: "+74950000001"
    },
    address: {
      city: "Москва",
      country: "Россия"
    },
    tags: ["priority", "broker"]
  },
  {
    id: 2,
    name: "АО Спектр",
    role: null,
    source: "site",
    contact: {
      email: null,
      phone: "+74950000002"
    },
    address: {
      city: "Казань",
      country: "Россия"
    },
    tags: []
  },
  {
    id: 3,
    name: "ИП Соколов",
    role: "client",
    source: null,
    contact: null,
    address: null,
    tags: ["manual"]
  },
  {
    id: 4,
    name: "ООО Гранит",
    role: null,
    source: null,
    contact: {
      email: "office@granit.ru",
      phone: null
    },
    address: {
      city: "Екатеринбург",
      country: "Россия"
    },
    tags: null
  }
];

const normalizedClients = clients.map((client) => {
  const {
    id,
    name,
    role,
    source,
    contact,
    address,
    tags
  } = client;

  const email = contact?.email ?? "no-email";
  const phone = contact?.phone ?? "no-phone";
  const city = address?.city ?? "no-city";
  const country = address?.country ?? "no-country";
  const safeRole = role ?? "guest";
  const safeSource = source ?? "unknown";
  const safeTags = tags ?? [];

  return {
    clientId: id,
    clientName: name,
    role: safeRole,
    source: safeSource,
    email: email,
    phone: phone,
    city: city,
    country: country,
    tags: safeTags,
    tagsCount: safeTags.length,
    isPriority: safeTags.includes("priority"),
    label: `${name} (${safeRole}) — ${city}`
  };
});

console.log("normalizedClients");
console.log(normalizedClients);

const firstClientCopy = {
  ...normalizedClients[0],
  checked: true
};

console.log("firstClientCopy");
console.log(firstClientCopy);

//n8n
const result = items.map((item) => {
  const row = item.json;

  const symbol = row.symbol ?? "unknown";
  const price = row.price ?? null;
  const market = row.market ?? "no-market";

  return {
    json: {
      symbol,
      price,
      market,
      label: `${symbol} / ${market}`
    }
  };
});

return result;