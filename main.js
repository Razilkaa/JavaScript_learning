function analyzePortfolio() {
    const report = {
      generatedAt: "2026-03-16T09:30:00Z",
      environment: "training",
      status: "ok",
      account: {
        id: "ACC-78421",
        owner: {
          name: "Alex",
          region: "EU",
          riskProfile: "balanced"
        },
        baseCurrency: "USD",
        limits: {
          dailyLossLimit: -1500,
          concentrationLimit: 0.4
        }
      },
      market: {
        session: "open",
        indexes: {
          SPX: { value: 5288.4, changePct: 0.42 },
          NDX: { value: 18642.1, changePct: 0.91 },
          VIX: { value: 14.2, changePct: -3.8 }
        },
        fx: {
          EURUSD: 1.09,
          USDJPY: 149.8
        }
      },
      portfolio: {
        cash: 12500,
        positions: [
          {
            ticker: "AAPL",
            type: "stock",
            sector: "Technology",
            quantity: 20,
            averagePrice: 182.5,
            quote: {
              last: 190.2,
              previousClose: 188.9,
              bid: 190.15,
              ask: 190.25
            },
            tags: ["core", "us-equity"]
          },
          {
            ticker: "MSFT",
            type: "stock",
            sector: "Technology",
            quantity: 10,
            averagePrice: 410,
            quote: {
              last: 405.3,
              previousClose: 408.4,
              bid: 405.2,
              ask: 405.4
            },
            tags: ["core", "ai"]
          },
          {
            ticker: "NVDA",
            type: "stock",
            sector: "Technology",
            quantity: 14,
            averagePrice: 118.4,
            quote: {
              last: 132.8,
              previousClose: 129.1,
              bid: 132.75,
              ask: 132.9
            },
            tags: ["growth", "ai"]
          },
          {
            ticker: "TLT",
            type: "bond-etf",
            sector: "Fixed Income",
            quantity: 35,
            averagePrice: 91.2,
            quote: {
              last: 89.7,
              previousClose: 90.05,
              bid: 89.68,
              ask: 89.72
            },
            tags: ["defensive", "rates"]
          },
          {
            ticker: "XOM",
            type: "stock",
            sector: "Energy",
            quantity: 18,
            averagePrice: 114.8,
            quote: {
              last: 118.1,
              previousClose: 117.4,
              bid: 118.05,
              ask: 118.15
            },
            tags: ["value", "dividend"]
          }
        ],
        watchlist: [
          { ticker: "AMD", targetBuyBelow: 155, currentPrice: 162.7 },
          { ticker: "GOOGL", targetBuyBelow: 168, currentPrice: 166.4 },
          { ticker: "TSLA", targetBuyBelow: 210, currentPrice: 214.2 }
        ]
      },
      alerts: [
        { code: "PRICE_GAP", enabled: true, thresholdPct: 3 },
        { code: "DAY_LOSS", enabled: true, thresholdUsd: -1000 },
        { code: "CONCENTRATION", enabled: true, thresholdPct: 40 }
      ]
    };
  
    if (report.status !== "ok") {
      return {
        ok: false,
        message: "Report status is not ok"
      };
    }
  
    if (report.market.session !== "open") {
      return {
        ok: false,
        message: "Market is closed"
      };
    }
  
    const positions = report.portfolio.positions;
  
    if (positions.length === 0) {
      return {
        ok: false,
        message: "No positions in portfolio"
      };
    }
  
    let marketValue = 0;
    let costValue = 0;
    let dayPnL = 0;
    let totalPnL = 0;
    let technologyExposure = 0;
    let defensiveExposure = 0;
    let bestPerformer = null;
    let worstPerformer = null;
    let buyCandidates = [];
    let triggeredAlerts = [];
  
    for (let i = 0; i < positions.length; i++) {
      const position = positions[i];
  
      const positionMarketValue = position.quantity * position.quote.last;
      const positionCostValue = position.quantity * position.averagePrice;
      const positionDayPnL =
        (position.quote.last - position.quote.previousClose) * position.quantity;
      const positionTotalPnL =
        (position.quote.last - position.averagePrice) * position.quantity;
      const positionDayChangePct =
        ((position.quote.last - position.quote.previousClose) /
          position.quote.previousClose) *
        100;
  
      marketValue += positionMarketValue;
      costValue += positionCostValue;
      dayPnL += positionDayPnL;
      totalPnL += positionTotalPnL;
  
      if (position.sector === "Technology") {
        technologyExposure += positionMarketValue;
      }
  
      if (position.type === "bond-etf" || position.tags.includes("defensive")) {
        defensiveExposure += positionMarketValue;
      }
  
      if (bestPerformer === null || positionTotalPnL > bestPerformer.totalPnL) {
        bestPerformer = {
          ticker: position.ticker,
          totalPnL: positionTotalPnL,
          dayChangePct: positionDayChangePct
        };
      }
  
      if (worstPerformer === null || positionTotalPnL < worstPerformer.totalPnL) {
        worstPerformer = {
          ticker: position.ticker,
          totalPnL: positionTotalPnL,
          dayChangePct: positionDayChangePct
        };
      }
  
      const priceGapAlert = report.alerts.find(
        (alert) => alert.code === "PRICE_GAP" && alert.enabled
      );
  
      if (
        priceGapAlert &&
        Math.abs(positionDayChangePct) >= priceGapAlert.thresholdPct
      ) {
        triggeredAlerts.push({
          type: "PRICE_GAP",
          ticker: position.ticker,
          value: Number(positionDayChangePct.toFixed(2))
        });
      }
    }
  
    const totalPortfolioValue = report.portfolio.cash + marketValue;
    const techWeight = technologyExposure / totalPortfolioValue;
    const defensiveWeight = defensiveExposure / totalPortfolioValue;
  
    const concentrationAlert = report.alerts.find(
      (alert) => alert.code === "CONCENTRATION" && alert.enabled
    );
  
    if (
      concentrationAlert &&
      techWeight * 100 > concentrationAlert.thresholdPct
    ) {
      triggeredAlerts.push({
        type: "CONCENTRATION",
        sector: "Technology",
        value: Number((techWeight * 100).toFixed(2))
      });
    }
  
    const dayLossAlert = report.alerts.find(
      (alert) => alert.code === "DAY_LOSS" && alert.enabled
    );
  
    if (dayLossAlert && dayPnL <= dayLossAlert.thresholdUsd) {
      triggeredAlerts.push({
        type: "DAY_LOSS",
        value: Number(dayPnL.toFixed(2))
      });
    }
  
    for (let i = 0; i < report.portfolio.watchlist.length; i++) {
      const item = report.portfolio.watchlist[i];
  
      if (item.currentPrice <= item.targetBuyBelow) {
        buyCandidates.push({
          ticker: item.ticker,
          currentPrice: item.currentPrice,
          targetBuyBelow: item.targetBuyBelow
        });
      }
    }
  
    let portfolioTone = "neutral";
  
    if (dayPnL > 250 && totalPnL > 0) {
      portfolioTone = "strong";
    } else if (dayPnL < 0 && totalPnL < 0) {
      portfolioTone = "weak";
    } else if (defensiveWeight > 0.25) {
      portfolioTone = "defensive";
    }
  
    const summary = {
      ok: true,
      owner: report.account.owner.name,
      baseCurrency: report.account.baseCurrency,
      cash: report.portfolio.cash,
      marketValue: Number(marketValue.toFixed(2)),
      totalPortfolioValue: Number(totalPortfolioValue.toFixed(2)),
      costValue: Number(costValue.toFixed(2)),
      dayPnL: Number(dayPnL.toFixed(2)),
      totalPnL: Number(totalPnL.toFixed(2)),
      techWeightPct: Number((techWeight * 100).toFixed(2)),
      defensiveWeightPct: Number((defensiveWeight * 100).toFixed(2)),
      bestPerformer,
      worstPerformer,
      buyCandidates,
      triggeredAlerts,
      portfolioTone
    };
  
    if (
      summary.totalPortfolioValue > 30000 &&
      summary.buyCandidates.length > 0 &&
      summary.triggeredAlerts.length === 0
    ) {
      return {
        ...summary,
        decision: "Portfolio is healthy, watchlist has opportunities"
      };
    }
  
    if (summary.triggeredAlerts.length >= 2) {
      return {
        ...summary,
        decision: "Risk review required"
      };
    }
  
    if (summary.dayPnL > 0 && summary.totalPnL > 0) {
      return {
        ...summary,
        decision: "Portfolio is in positive territory"
      };
    }
  
    return {
      ...summary,
      decision: "Mixed conditions"
    };
  }