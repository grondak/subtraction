const CORPORATE_ACTIONS = [
  {
    id: "raise-rate-card",
    title: "Raise Rate Card",
    description: "Temporary revenue bump while customers reroute freight.",
    effectNote: "Rail impact: Higher yield, lower goodwill, slight service drag.",
  },
  {
    id: "drop-rate-card",
    title: "Drop Rate Card",
    description: "Win back volume with thinner yield per carload.",
    effectNote: "Rail impact: Better demand and sentiment, lower unit margin.",
  },
  {
    id: "defer-system-maintenance",
    title: "Defer System Maintenance",
    description: "Lower costs now, but line wear accelerates this month.",
    effectNote: "Rail impact: More wear and reliability risk across all active lines.",
  },
  {
    id: "perform-system-maintenance",
    title: "Perform System Maintenance",
    description: "Spend now to stabilize condition and reliability.",
    effectNote: "Rail impact: Network condition and fluidity improve this month.",
  },
  {
    id: "lease-locomotives",
    title: "Lease Emergency Locomotives",
    description: "Stabilizes service at the price of more debt.",
    effectNote: "Rail impact: Better surge capacity; debt and lease exposure increase.",
  },
  {
    id: "return-locomotives",
    title: "Return Emergency Locomotives",
    description: "Reduce debt and fixed lease burden, with less surge capacity.",
    effectNote: "Rail impact: Lower financial pressure, but tighter power availability.",
  },
  {
    id: "pay-down-jumbo-loan",
    title: "Pay Down Jumbo Loan",
    description: "Use cash to reduce bundled principal and future debt service.",
    effectNote: "Rail impact: Lower debt drag; cash cushion gets thinner this month.",
  },
  {
    id: "renegotiate-jumbo-loan",
    title: "Renegotiate Jumbo Loan",
    description: "Reset your loan rate to the current market rate (with legal fees).",
    effectNote: "Rail impact: Debt-service profile shifts with market conditions.",
  },
  {
    id: "cut-crew-overtime",
    title: "Cut Crew Overtime",
    description: "Immediate savings with morale and velocity penalties.",
    effectNote: "Rail impact: Fewer starts and slower service recovery.",
  },
  {
    id: "increase-crew-overtime",
    title: "Increase Crew Overtime",
    description: "Pay more to recover starts, velocity, and service confidence.",
    effectNote: "Rail impact: Better starts and velocity at higher crew cost.",
  },
  {
    id: "idle-month",
    title: "Idle Through Dispatch Crisis",
    description: "No direct intervention this month.",
    effectNote: "Rail impact: Existing congestion and wear trends continue.",
  },
];

const ECONOMY_STATES = [
  { label: "Terrible", multiplier: 0.72 },
  { label: "Soft", multiplier: 0.86 },
  { label: "Tepid", multiplier: 1 },
  { label: "Firm", multiplier: 1.12 },
  { label: "Terrific", multiplier: 1.28 },
];

const BRANCH_TEMPLATES = [
  {
    key: "timber-branch",
    name: "Timber Branch",
    miles: 22,
    shipper: "Pine Ridge Logging",
    receiver: "North River Paper Mill",
    shipperBase: 380,
    receiverBase: 360,
    costs: {
      rail: 46000,
      roadbed: 23000,
      crossings: 14000,
      spurs: 12000,
      bumpers: 6000,
    },
  },
  {
    key: "agri-branch",
    name: "Agri Branch",
    miles: 18,
    shipper: "Valley Grain Cooperative",
    receiver: "Riverside Feed Mill",
    shipperBase: 290,
    receiverBase: 280,
    costs: {
      rail: 36000,
      roadbed: 18000,
      crossings: 11000,
      spurs: 9000,
      bumpers: 5000,
    },
  },
  {
    key: "stone-branch",
    name: "Stone Branch",
    miles: 18,
    shipper: "Granite Spur Quarry",
    receiver: "Metro Cement Terminal",
    shipperBase: 260,
    receiverBase: 250,
    costs: {
      rail: 32000,
      roadbed: 17000,
      crossings: 9000,
      spurs: 8000,
      bumpers: 4000,
    },
  },
  {
    key: "oil-spur",
    name: "Oil Spur",
    miles: 9,
    shipper: "Prairie Crude Transload",
    receiver: "Gulf River Refinery",
    shipperBase: 210,
    receiverBase: 205,
    costs: {
      rail: 24000,
      roadbed: 12000,
      crossings: 7000,
      spurs: 11000,
      bumpers: 5000,
    },
  },
  {
    key: "timber-spur",
    name: "Timber Reload Spur",
    miles: 8,
    shipper: "Cedar Ridge Sawmill",
    receiver: "North River Paper Mill",
    shipperBase: 190,
    receiverBase: 185,
    costs: {
      rail: 22000,
      roadbed: 10000,
      crossings: 6000,
      spurs: 10000,
      bumpers: 4500,
    },
  },
  {
    key: "chemical-spur",
    name: "Chemical Plant Spur",
    miles: 7,
    shipper: "MidState Chemical Works",
    receiver: "Riverbend Chemical Plant",
    shipperBase: 170,
    receiverBase: 165,
    costs: {
      rail: 21000,
      roadbed: 9500,
      crossings: 5500,
      spurs: 9500,
      bumpers: 4200,
    },
  },
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sumCosts(costs) {
  return costs.rail + costs.roadbed + costs.crossings + costs.spurs + costs.bumpers;
}

function currentEconomy(state) {
  return ECONOMY_STATES[state.economyIndex];
}

function createBranches() {
  return BRANCH_TEMPLATES.map((template) => ({
    ...template,
    costs: { ...template.costs },
    status: "active",
    condition: randomInt(62, 82),
    customerHealth: randomInt(64, 84),
    customerStatus: "stable",
  }));
}

function activeBranches(state) {
  return state.branches.filter((branch) => branch.status === "active");
}

function recalcLineMiles(state) {
  state.lineMiles = activeBranches(state).reduce((sum, branch) => sum + branch.miles, 0);
}

function recalcTrackCondition(state) {
  const active = activeBranches(state);
  if (active.length === 0) {
    state.trackCondition = 0;
    return;
  }

  const total = active.reduce((sum, branch) => sum + branch.condition, 0);
  state.trackCondition = Math.round(total / active.length);
}

function marketBaseline(state) {
  const economy = currentEconomy(state);
  const lanes = state.branches.map((branch) => {
    if (branch.status === "abandoned") {
      return {
        key: branch.key,
        branchName: branch.name,
        shipper: branch.shipper,
        receiver: branch.receiver,
        status: "Abandoned",
        shipperCars: 0,
        receiverCars: 0,
        offeredCars: 0,
        movedCars: 0,
      };
    }

    if (branch.customerStatus === "failed") {
      return {
        key: branch.key,
        branchName: branch.name,
        shipper: branch.shipper,
        receiver: branch.receiver,
        status: "Failed Customer",
        shipperCars: 0,
        receiverCars: 0,
        offeredCars: 0,
        movedCars: 0,
      };
    }

    const branchDemandFactor = clamp(branch.condition / 85, 0.55, 1.15);
    const shipperCars = Math.max(
      45,
      Math.round(branch.shipperBase * economy.multiplier * branchDemandFactor) + randomInt(-26, 26),
    );
    const receiverCars = Math.max(
      45,
      Math.round(branch.receiverBase * economy.multiplier * branchDemandFactor) + randomInt(-20, 20),
    );
    const offeredCars = Math.max(20, Math.min(shipperCars, receiverCars));

    return {
      key: branch.key,
      branchName: branch.name,
      shipper: branch.shipper,
      receiver: branch.receiver,
      status: "Active",
      shipperCars,
      receiverCars,
      offeredCars,
      movedCars: 0,
    };
  });

  return {
    month: state.month,
    economy: economy.label,
    lanes,
    branches: state.branches.map((branch) => ({
      key: branch.key,
      name: branch.name,
      status: branch.status,
      condition: branch.condition,
      customerHealth: branch.customerHealth,
      customerStatus: branch.customerStatus,
      costs: { ...branch.costs },
      totalCost: sumCosts(branch.costs),
      revenue: 0,
      profit: 0,
    })),
    totalOffered: lanes.reduce((sum, lane) => sum + lane.offeredCars, 0),
    totalMoved: 0,
    totalRevenue: 0,
    totalBranchProfit: 0,
  };
}

function maybeShiftEconomy(state) {
  state.monthsToEconomyShift -= 1;
  if (state.monthsToEconomyShift > 0) {
    return;
  }

  let direction = Math.random() < 0.5 ? -1 : 1;
  if (state.economyIndex === 0) {
    direction = 1;
  }
  if (state.economyIndex === ECONOMY_STATES.length - 1) {
    direction = -1;
  }

  state.economyIndex = clamp(state.economyIndex + direction, 0, ECONOMY_STATES.length - 1);
  state.monthsToEconomyShift = randomInt(4, 6);
}

function marketRateForEconomy(economyIndex) {
  const baseByEconomy = [0.017, 0.014, 0.012, 0.0105, 0.009];
  const base = baseByEconomy[economyIndex] ?? 0.012;
  const noise = randomInt(-8, 8) / 10000;
  return clamp(base + noise, 0.007, 0.021);
}

function nextMonthDebtService(state) {
  return Math.round(state.debt * state.loanInterestRateMonthly);
}

function estimateMonthsToCovenant(state) {
  const gap = state.cash - state.covenantCashLimit;
  if (gap <= 0) {
    return 0;
  }

  const burn = -(state.monthlyCosts?.operatingBalance ?? 0);
  if (burn <= 0) {
    return null;
  }

  return Math.ceil(gap / burn);
}

function emptyCostRow(month) {
  return {
    month,
    crewPayroll: 0,
    locomotiveLease: 0,
    debtService: 0,
    dispatchOps: 0,
    infrastructure: 0,
    disruptionCosts: 0,
    policySpend: 0,
    totalExpenditure: 0,
    revenue: 0,
    operatingBalance: 0,
  };
}

function baseState() {
  const state = {
    month: 1,
    cash: 2450000,
    debt: 1200000,
    carloads: 920,
    trackCondition: 76,
    morale: 68,
    confidence: 64,
    lineMiles: 58,
    covenantCashLimit: -850000,
    economyIndex: 2,
    monthsToEconomyShift: randomInt(4, 6),
    gameOver: false,
    result: "",
    report: "Month 1 opens with thin margins, worn rail, and demanding shippers.",
    log: ["You inherited a fragile shortline with old locomotives and aggressive lenders."],
    history: [],
    costHistory: [],
    marketHistory: [],
    market: null,
    branches: createBranches(),
    pricePerCarload: 240,
    disruptionPenalty: 0,
    monthlyWearModifier: 0,
    emergencyLeaseUnits: 0,
    lowTrafficMonths: 0,
    loanInterestRateMonthly: 0.0125,
    currentMarketRateMonthly: 0.012,
    monthlyCosts: emptyCostRow(1),
    pendingActionCashDelta: 0,
  };

  state.currentMarketRateMonthly = marketRateForEconomy(state.economyIndex);

  recalcLineMiles(state);
  recalcTrackCondition(state);
  return state;
}

function snapshotRow(state) {
  return {
    month: state.month,
    cash: state.cash,
    debt: state.debt,
    debtServiceNextMonth: nextMonthDebtService(state),
    loanRatePct: state.loanInterestRateMonthly * 100,
    covenantLimitCash: state.covenantCashLimit,
    monthsToCovenant: estimateMonthsToCovenant(state),
    carloads: state.carloads,
    trackCondition: state.trackCondition,
    morale: state.morale,
    confidence: state.confidence,
    lineMiles: state.lineMiles,
    leaseUnits: state.emergencyLeaseUnits,
  };
}

function writeHistoryRow(state) {
  const row = snapshotRow(state);
  const last = state.history[state.history.length - 1];
  if (last && last.month === row.month) {
    state.history[state.history.length - 1] = row;
  } else {
    state.history.push(row);
    if (state.history.length > 24) {
      state.history.shift();
    }
  }
}

function writeCostRow(state) {
  const row = { ...state.monthlyCosts };
  const last = state.costHistory[state.costHistory.length - 1];
  if (last && last.month === row.month) {
    state.costHistory[state.costHistory.length - 1] = row;
  } else {
    state.costHistory.push(row);
    if (state.costHistory.length > 24) {
      state.costHistory.shift();
    }
  }
}

function writeMarketRow(state) {
  const row = {
    month: state.market.month,
    economy: state.market.economy,
    totalOffered: state.market.totalOffered,
    totalMoved: state.market.totalMoved,
    totalRevenue: state.market.totalRevenue,
    totalBranchProfit: state.market.totalBranchProfit,
    lanes: state.market.lanes.map((lane) => ({ ...lane })),
    branches: state.market.branches.map((branch) => ({
      ...branch,
      costs: { ...branch.costs },
    })),
  };

  const last = state.marketHistory[state.marketHistory.length - 1];
  if (last && last.month === row.month) {
    state.marketHistory[state.marketHistory.length - 1] = row;
  } else {
    state.marketHistory.push(row);
    if (state.marketHistory.length > 24) {
      state.marketHistory.shift();
    }
  }
}

function findBranch(state, branchKey) {
  return state.branches.find((branch) => branch.key === branchKey);
}

function applyBranchAction(state, actionId) {
  const [, verb, branchKey] = actionId.split(":");
  const branch = findBranch(state, branchKey);

  if (!branch) {
    return "Dispatching could not find that branch line.";
  }

  if (branch.status === "abandoned") {
    return `${branch.name} is already abandoned and cannot be serviced.`;
  }

  if (verb === "maintain") {
    const spend = Math.round(sumCosts(branch.costs) * 0.7);
    state.cash -= spend;
    branch.condition += randomInt(6, 12);
    state.disruptionPenalty -= 0.03;
    state.morale += randomInt(1, 3);
    recalcTrackCondition(state);
    return `Maintenance gang focused on ${branch.name} for $${spend.toLocaleString()}.`;
  }

  if (verb === "repair") {
    const spend = Math.round(sumCosts(branch.costs) * 1.45) + 90000;
    state.cash -= spend;
    branch.condition += randomInt(18, 30);
    state.disruptionPenalty -= 0.06;
    state.confidence += randomInt(2, 5);
    recalcTrackCondition(state);
    return `Major repair program executed on ${branch.name} at $${spend.toLocaleString()}.`;
  }

  if (verb === "abandon") {
    branch.status = "abandoned";
    branch.condition = 0;
    const salvage = Math.round((branch.costs.rail + branch.costs.spurs + branch.costs.bumpers) * 6.2);
    state.cash += salvage;
    state.confidence -= randomInt(6, 11);
    state.morale -= randomInt(3, 6);
    state.disruptionPenalty += 0.08;
    recalcLineMiles(state);
    recalcTrackCondition(state);
    return `${branch.name} abandoned. ${branch.shipper} and ${branch.receiver} are no longer rail-served.`;
  }

  return "No branch decision recorded.";
}

function applyCorporateAction(state, actionId) {
  switch (actionId) {
    case "raise-rate-card":
      state.cash += 190000;
      state.confidence -= randomInt(6, 10);
      state.morale -= randomInt(2, 5);
      state.pricePerCarload += 28;
      state.disruptionPenalty += 0.05;
      return "You raised freight rates. Cash improved briefly as customers called competing roads.";
    case "drop-rate-card":
      state.cash -= 120000;
      state.confidence += randomInt(4, 8);
      state.morale += randomInt(1, 3);
      state.pricePerCarload = Math.max(180, state.pricePerCarload - 26);
      state.disruptionPenalty -= 0.03;
      return "You cut rates to defend traffic. Revenue softened, but shipper sentiment improved.";
    case "defer-system-maintenance":
      state.cash += 170000;
      state.monthlyWearModifier += 1.4;
      state.confidence -= randomInt(3, 6);
      state.disruptionPenalty += 0.03;
      return "System maintenance was deferred. This month will run rougher than usual.";
    case "perform-system-maintenance":
      state.cash -= 230000;
      state.monthlyWearModifier -= 1.2;
      for (const branch of activeBranches(state)) {
        branch.condition += randomInt(3, 7);
      }
      recalcTrackCondition(state);
      state.confidence += randomInt(2, 5);
      state.disruptionPenalty -= 0.04;
      return "System maintenance surge completed. Condition and reliability improved network-wide.";
    case "lease-locomotives":
      state.cash += 420000;
      state.debt += 560000;
      state.emergencyLeaseUnits += 1;
      state.confidence -= randomInt(1, 4);
      state.disruptionPenalty -= 0.04;
      return "Emergency lease signed. The locomotives run; the balance sheet groans.";
    case "return-locomotives":
      if (state.emergencyLeaseUnits <= 0) {
        state.confidence -= 1;
        return "No emergency lease units are currently on property to return.";
      }

      state.emergencyLeaseUnits -= 1;
      state.cash -= 150000;
      state.debt = Math.max(0, state.debt - 380000);
      state.disruptionPenalty += 0.03;
      state.confidence += randomInt(1, 3);
      return "An emergency locomotive lease was returned. Debt pressure eased, but surge capacity tightened.";
    case "pay-down-jumbo-loan": {
      if (state.debt <= 0) {
        return "The jumbo loan is already retired.";
      }

      const principalPayment = Math.min(state.debt, 220000);
      state.cash -= principalPayment;
      state.debt -= principalPayment;
      state.confidence += randomInt(1, 2);
      return `You paid down $${principalPayment.toLocaleString()} of jumbo principal.`;
    }
    case "renegotiate-jumbo-loan": {
      const priorRate = state.loanInterestRateMonthly;
      const targetRate = state.currentMarketRateMonthly;
      const fee = 70000;
      state.cash -= fee;
      state.loanInterestRateMonthly = targetRate;
      if (targetRate < priorRate) {
        state.confidence += randomInt(1, 3);
      } else if (targetRate > priorRate) {
        state.confidence -= randomInt(1, 2);
      }
      return `Jumbo loan repriced from ${(priorRate * 100).toFixed(2)}% to ${(targetRate * 100).toFixed(2)}% monthly at a $${fee.toLocaleString()} fee.`;
    }
    case "cut-crew-overtime":
      state.cash += 240000;
      state.morale -= randomInt(10, 18);
      state.disruptionPenalty += 0.07;
      return "Overtime was slashed. Crew starts slipped and dwell times climbed.";
    case "increase-crew-overtime":
      state.cash -= 180000;
      state.morale += randomInt(7, 13);
      state.confidence += randomInt(2, 5);
      state.disruptionPenalty -= 0.06;
      return "Overtime was expanded. Starts recovered and service fluidity improved.";
    case "idle-month":
      state.cash -= 100000;
      state.morale -= randomInt(1, 3);
      state.disruptionPenalty += 0.03;
      return "No intervention this month. Congestion and delay handled the rest.";
    default:
      return "No decision recorded.";
  }
}

function applyAction(state, actionId) {
  if (actionId.startsWith("branch:")) {
    return applyBranchAction(state, actionId);
  }

  return applyCorporateAction(state, actionId);
}

function applyTurnipSqueeze(state) {
  state.cash += 50000;
  state.confidence -= randomInt(1, 2);
  state.morale -= randomInt(1, 2);
  return "Owners squeezed the turnip for $50,000 of extra cash.";
}

function customerStatusFromHealth(health) {
  if (health >= 60) {
    return "stable";
  }
  if (health >= 35) {
    return "distressed";
  }
  return "critical";
}

function updateCustomerViability(state) {
  const economyPenaltyByIndex = [8, 4, 0, -3, -6];
  const economyPenalty = economyPenaltyByIndex[state.economyIndex] ?? 0;

  for (const lane of state.market.lanes) {
    const branch = findBranch(state, lane.key);
    if (!branch || branch.status === "abandoned" || branch.customerStatus === "failed") {
      continue;
    }

    const serviceRatio = lane.offeredCars > 0 ? lane.movedCars / lane.offeredCars : 1;
    let healthDelta = Math.round((serviceRatio - 0.8) * 24) - economyPenalty + randomInt(-3, 3);
    if (serviceRatio < 0.55) {
      healthDelta -= randomInt(4, 9);
    }

    branch.customerHealth = clamp(branch.customerHealth + healthDelta, 0, 100);
    branch.customerStatus = customerStatusFromHealth(branch.customerHealth);

    if (branch.customerHealth <= 18) {
      const economyFailureLiftByIndex = [0.1, 0.05, 0, -0.03, -0.06];
      const failureChance = clamp(0.12 + economyFailureLiftByIndex[state.economyIndex], 0.03, 0.34);
      if (Math.random() < failureChance) {
        branch.customerStatus = "failed";
        branch.customerHealth = 0;
        lane.shipperCars = 0;
        lane.receiverCars = 0;
        lane.offeredCars = 0;
        lane.movedCars = 0;
        state.confidence -= randomInt(3, 7);
        state.report += ` ${branch.shipper} / ${branch.receiver} failed as a customer base under ${currentEconomy(state).label.toLowerCase()} conditions.`;
      }
    }
  }
}

function applyMonthlyDrag(state) {
  const interest = nextMonthDebtService(state);
  const payroll = 180000 + Math.round((72 - state.morale) * 1700);
  const dispatchOps = 120000;
  const locomotiveLease = state.emergencyLeaseUnits * 65000;
  state.cash -= interest + payroll + dispatchOps + locomotiveLease;

  let branchCostTotal = 0;
  let disruptionCosts = 0;
  for (const branch of activeBranches(state)) {
    const infraCost = sumCosts(branch.costs);
    branchCostTotal += infraCost;

    const wear = randomInt(2, 5) + state.monthlyWearModifier;
    branch.condition -= wear;

    if (branch.condition < 35 && Math.random() < 0.35) {
      const incidentCost = randomInt(50000, 135000);
      state.cash -= incidentCost;
      disruptionCosts += incidentCost;
      state.confidence -= randomInt(2, 6);
      state.report += ` ${branch.name} suffered a track incident costing $${incidentCost.toLocaleString()}.`;
    }
  }

  state.cash -= branchCostTotal;

  if (state.morale < 35 && Math.random() < 0.4) {
    const strikeLoss = randomInt(90000, 210000);
    state.cash -= strikeLoss;
    disruptionCosts += strikeLoss;
    state.disruptionPenalty += 0.08;
    state.report += ` Crew shortages delayed trains and burned $${strikeLoss.toLocaleString()} in extra costs.`;
  }

  const networkBaseService = (state.trackCondition * 0.42 + state.morale * 0.3 + state.confidence * 0.28) / 100;
  const serviceFactor = clamp(networkBaseService - state.disruptionPenalty, 0.2, 1.05);

  let movedCars = 0;
  const movedByBranch = {};
  for (const lane of state.market.lanes) {
    if (lane.status === "Abandoned") {
      lane.movedCars = 0;
      movedByBranch[lane.key] = 0;
      continue;
    }

    const branch = findBranch(state, lane.key);
    const branchFactor = branch ? clamp(branch.condition / 100, 0.28, 1.02) : 0.2;
    const laneMoved = clamp(
      Math.round(lane.offeredCars * serviceFactor * branchFactor) + randomInt(-8, 8),
      0,
      lane.offeredCars,
    );
    lane.movedCars = laneMoved;
    movedCars += laneMoved;
    movedByBranch[lane.key] = laneMoved;
  }

  updateCustomerViability(state);

  const monthlyRate = state.pricePerCarload;
  let totalRevenue = 0;
  let totalBranchProfit = 0;
  state.market.branches = state.branches.map((liveBranch) => {
    if (liveBranch.status !== "active") {
      return {
        key: liveBranch.key,
        name: liveBranch.name,
        status: liveBranch.status,
        condition: liveBranch.condition,
        customerHealth: liveBranch.customerHealth,
        customerStatus: liveBranch.customerStatus,
        costs: { ...liveBranch.costs },
        totalCost: sumCosts(liveBranch.costs),
        revenue: 0,
        profit: 0,
      };
    }

    const movedCarsForBranch = movedByBranch[liveBranch.key] ?? 0;
    const totalCost = sumCosts(liveBranch.costs);
    const revenue = Math.round(movedCarsForBranch * monthlyRate);
    const profit = revenue - totalCost;
    totalRevenue += revenue;
    totalBranchProfit += profit;
    return {
      key: liveBranch.key,
      name: liveBranch.name,
      status: liveBranch.status,
      condition: liveBranch.condition,
      customerHealth: liveBranch.customerHealth,
      customerStatus: liveBranch.customerStatus,
      costs: { ...liveBranch.costs },
      totalCost,
      revenue,
      profit,
    };
  });

  state.market.totalMoved = movedCars;
  state.market.totalRevenue = totalRevenue;
  state.market.totalBranchProfit = totalBranchProfit;
  state.carloads = movedCars;
  state.cash += totalRevenue;

  const policySpend = Math.max(0, -state.pendingActionCashDelta);
  const totalExpenditure =
    payroll + locomotiveLease + interest + dispatchOps + branchCostTotal + disruptionCosts + policySpend;
  state.monthlyCosts = {
    month: state.month,
    crewPayroll: payroll,
    locomotiveLease,
    debtService: interest,
    dispatchOps,
    infrastructure: branchCostTotal,
    disruptionCosts,
    policySpend,
    totalExpenditure,
    revenue: totalRevenue,
    operatingBalance: totalRevenue - totalExpenditure,
  };
  state.pendingActionCashDelta = 0;

  recalcLineMiles(state);
  recalcTrackCondition(state);

  state.trackCondition = clamp(state.trackCondition, 0, 100);
  state.morale = clamp(state.morale, 0, 100);
  state.confidence = clamp(state.confidence, 0, 100);
  state.disruptionPenalty = clamp(state.disruptionPenalty * 0.5, -0.12, 0.24);
  state.pricePerCarload = Math.max(200, Math.round(state.pricePerCarload * 0.97));
  state.monthlyWearModifier = 0;
}

function evaluateEnding(state) {
  if (state.cash < state.covenantCashLimit) {
    state.gameOver = true;
    state.result = "Receivership";
    return `Cash fell below the covenant limit of $${state.covenantCashLimit.toLocaleString()} and lenders forced the railroad into receivership.`;
  }

  if (state.trackCondition <= 10 && activeBranches(state).length > 0) {
    state.gameOver = true;
    state.result = "FRA Shutdown";
    return "Track condition collapsed. Federal inspectors suspended operating authority.";
  }

  if (activeBranches(state).length === 0) {
    state.gameOver = true;
    state.result = "No Service Territory";
    return "All branch lines were abandoned. No customers remain rail-served.";
  }

  const activeCount = activeBranches(state).length;
  const lowTrafficFloor = activeCount <= 1 ? 170 : 110;
  if (state.carloads <= lowTrafficFloor) {
    state.lowTrafficMonths += 1;
  } else {
    state.lowTrafficMonths = 0;
  }

  if (state.lowTrafficMonths === 1) {
    state.report += " Traffic Warning: 1 of 2 consecutive low-traffic months. Stabilize volume next month to avoid collapse.";
  }

  if (state.lowTrafficMonths >= 2) {
    state.gameOver = true;
    state.result = "Traffic Collapse";
    return "Traffic stayed below sustainable levels for consecutive months and service economics collapsed.";
  }

  if (state.month > 24) {
    state.gameOver = true;
    state.result = "Barely Solvent";
    return "You survived 24 months of strategic decline. The railroad still operates, somehow.";
  }

  return "";
}

function branchActionSet(branch) {
  if (branch.status !== "active") {
    return [];
  }

  return [
    {
      id: `branch:maintain:${branch.key}`,
      title: `Maintain ${branch.name}`,
      description: `${branch.shipper} -> ${branch.receiver}.`,
      effectNote: "Rail impact: Modest condition gain and steadier service on this branch.",
    },
    {
      id: `branch:repair:${branch.key}`,
      title: `Repair ${branch.name}`,
      description: `Heavy work package on rail, roadbed, and crossings.`,
      effectNote: "Rail impact: Strong condition recovery and better branch throughput.",
    },
    {
      id: `branch:abandon:${branch.key}`,
      title: `Abandon ${branch.name}`,
      description: `Drops ${branch.shipper} and ${branch.receiver} from service.`,
      effectNote: "Rail impact: Line removed; branch customers lose rail service permanently.",
    },
  ];
}

export function createGame() {
  let state = baseState();
  state.market = marketBaseline(state);
  writeHistoryRow(state);
  writeCostRow(state);
  writeMarketRow(state);

  function step(actionId, options = {}) {
    if (state.gameOver) {
      return state;
    }

    const cashBeforeAction = state.cash;
    const actionSummary = applyAction(state, actionId);
    const notes = [actionSummary];

    if (options.squeezeTurnip) {
      notes.push(applyTurnipSqueeze(state));
    }

    state.pendingActionCashDelta = state.cash - cashBeforeAction;
    state.report = notes.join(" ");

    state.market = marketBaseline(state);
    applyMonthlyDrag(state);

    const ending = evaluateEnding(state);
    state.log.unshift(`Month ${state.month} (${state.market.economy} economy): ${notes.join(" ")}`);

    writeHistoryRow(state);
    writeCostRow(state);
    writeMarketRow(state);

    if (ending) {
      state.report += ` ${ending}`;
      state.log.unshift(`Final: ${state.result} - ${ending}`);
    } else {
      state.month += 1;
      maybeShiftEconomy(state);
      state.currentMarketRateMonthly = marketRateForEconomy(state.economyIndex);
      state.market = marketBaseline(state);
      state.log.unshift(`Month ${state.month} opens with cash at $${state.cash.toLocaleString()}.`);
    }

    state.log = state.log.slice(0, 24);
    return state;
  }

  function reset() {
    state = baseState();
    state.market = marketBaseline(state);
    writeHistoryRow(state);
    writeCostRow(state);
    writeMarketRow(state);
    return state;
  }

  function getState() {
    return state;
  }

  function getActions() {
    const dynamicBranchActions = state.branches.flatMap((branch) => branchActionSet(branch));
    return [...dynamicBranchActions, ...CORPORATE_ACTIONS];
  }

  return {
    step,
    reset,
    getState,
    getActions,
  };
}
