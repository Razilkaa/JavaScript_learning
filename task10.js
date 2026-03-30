const quotes = [
  {
    symbol: "SBER",
    info: {
      price: "312.45",
      currency: "RUB"
    },
    meta: {
      source: "moex_api",
      takenAt: "2026-03-30T10:30:00Z",
      slot: "10:30"
    }
  },
  {
    symbol: "GAZP",
    info: {
      price: "181.12",
      currency: "RUB"
    },
    meta: {
      source: "moex_api",
      takenAt: "2026-03-30T10:30:00Z",
      slot: "10:30"
    }
  },
  {
    symbol: "LKOH",
    info: {
      price: "7210",
      currency: "RUB"
    },
    meta: {
      source: "moex_api",
      takenAt: "2026-03-30T10:30:00Z",
      slot: "10:30"
    }
  },
  {
    symbol: "SBER",
    info: {
      price: "312.45",
      currency: "RUB"
    },
    meta: {
      source: "moex_api",
      takenAt: "2026-03-30T10:30:00Z",
      slot: "10:30"
    }
  },
  {
    symbol: "YDEX",
    info: {
      price: "bad-price",
      currency: "RUB"
    },
    meta: {
      source: "moex_api",
      takenAt: "2026-03-30T10:30:00Z",
      slot: "10:30"
    }
  },
  {
    symbol: "",
    info: {
      price: "4180.5",
      currency: "RUB"
    },
    meta: {
      source: "moex_api",
      takenAt: "2026-03-30T10:30:00Z",
      slot: "10:30"
    }
  },
  {
    symbol: "ROSN",
    info: {
      price: "598.4",
      currency: null
    },
    meta: {
      source: "moex_api",
      takenAt: null,
      slot: "10:30"
    }
  }
];

// SQL example
// CREATE TABLE price_quotes (
//   symbol text,
//   price numeric,
//   currency text,
//   source text,
//   taken_at timestamptz,
//   slot text
// );


const sqlReadyRows = [];
const seen = new Set();

for (const quote of quotes) {
  if (!quote.symbol || quote.symbol.trim() === "") {
    continue;
  }

  const price = Number(quote.info?.price);

  if (Number.isNaN(price)) {
    continue;
  }

  const row = {
    symbol: quote.symbol.trim(),
    price: price,
    currency: quote.info?.currency ?? "UNKNOWN",
    source: quote.meta?.source ?? "unknown_source",
    taken_at: quote.meta?.takenAt ?? null,
    slot: quote.meta?.slot ?? "unknown_slot"
  };

  const dedupeKey = `${row.symbol}|${row.taken_at}|${row.slot}|${row.source}`;

  if (seen.has(dedupeKey)) {
    continue;
  }

  seen.add(dedupeKey);
  sqlReadyRows.push(row);
}

console.log(sqlReadyRows);