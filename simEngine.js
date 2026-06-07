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

const INFRA_COST_MULTIPLIER = 0.4;
const FREIGHT_REVENUE_MULTIPLIER = 2;
const RAILROAD_RENAME_COST = 10000;
const TURNIP_SQUEEZE_AMOUNT = 50000;
const LOCOMOTIVE_BASE_CAR_CAPACITY = 980;
const EMERGENCY_LOCO_CAR_BOOST = 220;

const SLUSH_ACTIVITIES = [
  {
    id: "yacht",
    name: "Build That Yacht!",
    target: 400000,
    lifestylePoints: 50,
    unlockFlavor:
      "The marina calls with mooring dimensions and a champagne-colored hull mockup. Executive status has clearly outgrown land.",
  },
  {
    id: "race-car",
    name: "Buy That Race Car",
    target: 200000,
    lifestylePoints: 40,
    unlockFlavor:
      "A track-day coordinator books your first closed-course slot. The garage starts smelling like money and hot brakes.",
  },
  {
    id: "garage",
    name: "Three-Car Garage",
    target: 100000,
    lifestylePoints: 30,
    unlockFlavor:
      "The third bay gets its own keypad and lighting scheme. Ownership has become architectural.",
  },
  {
    id: "vacation",
    name: "Social Media-Fired Vacation Around the World",
    target: 50000,
    lifestylePoints: 20,
    unlockFlavor:
      "The out-of-office message becomes a small travel empire. Passport stamps begin to outpace waybills.",
  },
  {
    id: "wild-party",
    name: "Wild Party",
    target: 10000,
    lifestylePoints: 10,
    unlockFlavor:
      "A rooftop party erupts into the kind of story that follows an executive for years and improves their self-image immediately.",
  },
];

const RAILROAD_NAME_PARTS_FIRST = [
  "Aerospace",
  "Frontier",
  "Summit",
  "Granite",
  "Riverbend",
  "Pioneer",
  "Iron",
  "Cedar",
  "Bluebird",
  "Redstone",
];

const RAILROAD_NAME_PARTS_LAST = [
  "Stone",
  "Valley",
  "Junction",
  "Canyon",
  "Timber",
  "Prairie",
  "Coastal",
  "Summit",
  "Basin",
  "Works",
];

const RAILROAD_NAME_SUFFIXES = ["RR", "Railroad", "Short Line", "Line", ""];

const BRANCH_TEMPLATES = [
  {
    key: "aerospace-parts",
    name: "Aerospace Parts Branch",
    miles: 22,
    shipper: "SkyForge Components",
    receiver: "Orbital Assembly Works",
    profitabilityTier: "profitable",
    revenueFactor: 1.2,
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
    profitabilityTier: "marginal",
    revenueFactor: 1,
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
    profitabilityTier: "marginal",
    revenueFactor: 0.98,
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
    profitabilityTier: "profitable",
    revenueFactor: 1.18,
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
    name: "Timber Spur",
    miles: 8,
    shipper: "Cedar Ridge Sawmill",
    receiver: "North River Paper Mill",
    profitabilityTier: "losing",
    revenueFactor: 0.64,
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
    profitabilityTier: "losing",
    revenueFactor: 0.58,
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

function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}

function allRailroadNames() {
  const names = [];
  for (const first of RAILROAD_NAME_PARTS_FIRST) {
    for (const last of RAILROAD_NAME_PARTS_LAST) {
      for (const suffix of RAILROAD_NAME_SUFFIXES) {
        const base = `${first} ${last}`;
        names.push(suffix ? `${base} ${suffix}` : base);
      }
    }
  }
  return names;
}

const RAILROAD_NAME_POOL = allRailroadNames();
if (RAILROAD_NAME_POOL.length !== 500) {
  throw new Error(`Expected 500 railroad names, found ${RAILROAD_NAME_POOL.length}.`);
}

function pickRailroadName() {
  return RAILROAD_NAME_POOL[randomInt(0, RAILROAD_NAME_POOL.length - 1)];
}

function createSlushActivities() {
  return SLUSH_ACTIVITIES.map((activity) => ({
    ...activity,
    funded: 0,
    achieved: false,
    achievedMonth: null,
  }));
}

function pickDifferentRailroadName(currentName) {
  if (RAILROAD_NAME_POOL.length <= 1) {
    return currentName;
  }

  for (let attempts = 0; attempts < 12; attempts += 1) {
    const candidate = pickRailroadName();
    if (candidate !== currentName) {
      return candidate;
    }
  }

  return RAILROAD_NAME_POOL.find((name) => name !== currentName) ?? currentName;
}

function sanitizeRailroadName(input) {
  return input.replace(/\s+/gu, " ").trim().slice(0, 72);
}

function normalizedAllocation(state, allocationInput) {
  const activities = state.slushActivities ?? [];
  const validIds = new Set(activities.map((activity) => activity.id));
  const raw = {};

  if (allocationInput && typeof allocationInput === "object") {
    for (const [id, value] of Object.entries(allocationInput)) {
      if (!validIds.has(id)) {
        continue;
      }
      const numeric = Number(value);
      if (!Number.isFinite(numeric) || numeric <= 0) {
        continue;
      }
      raw[id] = numeric;
    }
  }

  const total = Object.values(raw).reduce((sum, value) => sum + value, 0);
  const isPercentScale = Math.abs(total - 100) <= 0.0001;
  const isFractionScale = Math.abs(total - 1) <= 0.0001;
  if (!isPercentScale && !isFractionScale) {
    return null;
  }

  return Object.fromEntries(
    activities.map((activity) => [activity.id, (raw[activity.id] ?? 0) / total]),
  );
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sumCosts(costs) {
  return Math.round((costs.rail + costs.roadbed + costs.crossings + costs.spurs + costs.bumpers) * INFRA_COST_MULTIPLIER);
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
    profitabilityTier: template.profitabilityTier,
    revenueFactor: template.revenueFactor,
    decayGraceMonths: 0,
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
  state.trackCondition = clamp(Math.round(total / active.length), 0, 100);
}

function clampQualityMetrics(state) {
  state.trackCondition = clamp(state.trackCondition, 0, 100);
  state.serviceCapacity = clamp(state.serviceCapacity, 20, 100);
  state.morale = clamp(state.morale, 0, 100);
  state.confidence = clamp(state.confidence, 0, 100);

  for (const branch of state.branches) {
    branch.condition = clamp(branch.condition, 0, 100);
    branch.decayGraceMonths = Math.max(0, Math.floor(branch.decayGraceMonths ?? 0));
    branch.customerHealth = clamp(branch.customerHealth, 0, 100);
  }
}

function stagedConditionDecay(condition) {
  if (condition >= 80) {
    return 0.5;
  }
  if (condition >= 60) {
    return randomFloat(1, 2);
  }
  if (condition >= 40) {
    return randomFloat(2, 4);
  }
  return randomFloat(4, 7);
}

function applyRepairGainWithDiminishingReturns(branch, nominalGain) {
  if (branch.condition >= 95) {
    return nominalGain * 0.2;
  }
  if (branch.condition >= 90) {
    return nominalGain * 0.4;
  }
  return nominalGain;
}

function estimateLocomotiveCapacity(state) {
  const powerCapacity = LOCOMOTIVE_BASE_CAR_CAPACITY + state.emergencyLeaseUnits * EMERGENCY_LOCO_CAR_BOOST;
  const crewFactor = clamp(0.72 + state.morale / 220, 0.5, 1.15);
  const serviceFactor = clamp(0.55 + state.serviceCapacity / 200, 0.45, 1.1);
  return Math.max(120, Math.round(powerCapacity * crewFactor * serviceFactor));
}

function applyLocomotiveCapacityCap(state, movedByBranch, totalMoved) {
  const locomotiveCapacity = estimateLocomotiveCapacity(state);
  state.locomotiveCapacity = locomotiveCapacity;

  if (totalMoved <= locomotiveCapacity) {
    return { movedByBranch, totalMoved };
  }

  const ratio = locomotiveCapacity / totalMoved;
  const entries = Object.entries(movedByBranch).map(([key, moved]) => {
    const scaled = moved * ratio;
    const assigned = Math.floor(scaled);
    return { key, assigned, fractional: scaled - assigned };
  });

  let assignedTotal = entries.reduce((sum, entry) => sum + entry.assigned, 0);
  let remainder = locomotiveCapacity - assignedTotal;
  entries.sort((a, b) => b.fractional - a.fractional);

  for (const entry of entries) {
    if (remainder <= 0) {
      break;
    }
    entry.assigned += 1;
    remainder -= 1;
  }

  const cappedByBranch = Object.fromEntries(entries.map((entry) => [entry.key, entry.assigned]));
  return { movedByBranch: cappedByBranch, totalMoved: locomotiveCapacity };
}

function employeePressureScore(state, movedCars, serviceFactor) {
  const workloadRatio = movedCars / Math.max(1, state.locomotiveCapacity);
  const moraleDrag = (100 - state.morale) / 100;
  const confidenceDrag = (100 - state.confidence) / 100;
  const serviceDrag = (100 - state.serviceCapacity) / 100;
  const overworkDrag = clamp((workloadRatio - 0.75) * 1.5, 0, 0.35);
  const safetyRelief = state.safetyScrutinyMonths > 0 ? 0.08 : 0;
  return clamp(moraleDrag * 0.38 + confidenceDrag * 0.24 + serviceDrag * 0.2 + (1 - serviceFactor) * 0.1 + overworkDrag - safetyRelief, 0, 1);
}

function applySafetyScrutinyTick(state) {
  if (state.safetyScrutinyMonths <= 0) {
    return null;
  }

  state.safetyScrutinyMonths -= 1;
  state.confidence += randomInt(1, 3);
  return "Safety scrutiny forced extra inspections and calmed some crew complaints.";
}

function maybeApplyUnionization(state, pressure) {
  if (state.unionized || (state.morale >= 60 && pressure <= 0.45)) {
    return null;
  }

  const unionChance = clamp(0.08 + pressure * 0.14 + (60 - state.morale) / 240, 0.04, 0.26);
  if (Math.random() >= unionChance) {
    return null;
  }

  state.unionized = true;
  state.morale += randomInt(2, 5);
  state.confidence += randomInt(1, 3);
  state.disruptionPenalty += 0.02;
  return "Crew voted to unionize. Work rules tightened, wages will run hotter, and management lost some flexibility.";
}

function maybeApplyBurnout(state, pressure) {
  if (state.morale >= 58 || pressure <= 0.3) {
    return null;
  }

  const burnoutChance = clamp(0.06 + pressure * 0.22 + (58 - state.morale) / 220, 0.05, 0.28);
  if (Math.random() >= burnoutChance) {
    return null;
  }

  state.morale -= randomInt(2, 5);
  state.confidence -= randomInt(1, 3);
  state.disruptionPenalty += 0.02;
  return "Crew burnout set in. Fatigue spread through the roster and the dispatcher started fighting small failures all month.";
}

function maybeApplyQuits(state, pressure) {
  if (state.morale >= 45 || pressure <= 0.35) {
    return null;
  }

  const quitChance = clamp(0.05 + pressure * 0.2 + (45 - state.morale) / 180, 0.04, 0.24);
  if (Math.random() >= quitChance) {
    return null;
  }

  const tempLaborCost = randomInt(40000, 90000);
  state.cash -= tempLaborCost;
  state.serviceCapacity -= randomInt(2, 5);
  state.morale -= randomInt(3, 6);
  state.confidence -= randomInt(2, 4);
  return `A handful of employees quit. Overtime and temp labor cost $${tempLaborCost.toLocaleString()} just to keep the railroad moving.`;
}

function maybeApplyWhistleblower(state) {
  if (state.trackCondition >= 62 || state.confidence >= 58) {
    return null;
  }

  const whistleblowerChance = clamp(0.06 + (62 - state.trackCondition) / 180 + (58 - state.confidence) / 240, 0.05, 0.22);
  if (Math.random() >= whistleblowerChance) {
    return null;
  }

  const complianceCost = randomInt(25000, 65000);
  state.cash -= complianceCost;
  state.safetyScrutinyMonths = Math.max(state.safetyScrutinyMonths ?? 0, randomInt(2, 4));
  state.confidence += randomInt(2, 4);
  return `A safety whistleblower escalated issues to management. Inspections and remediation cost $${complianceCost.toLocaleString()} but forced the railroad to confront the worst risks.`;
}

function maybeApplySabotage(state, pressure) {
  if (state.morale >= 40 || state.confidence >= 48) {
    return null;
  }

  const sabotageChance = clamp(0.03 + pressure * 0.1 + (40 - state.morale) / 220 + (48 - state.confidence) / 260, 0.03, 0.16);
  if (Math.random() >= sabotageChance) {
    return null;
  }

  const sabotageCost = randomInt(60000, 130000);
  state.cash -= sabotageCost;
  state.disruptionPenalty += 0.06;
  state.trackCondition -= randomInt(1, 4);
  state.confidence -= randomInt(3, 6);
  return `Sabotage hit dispatch and equipment. The railroad burned $${sabotageCost.toLocaleString()} cleaning up the damage.`;
}

function applyEmployeeConsequences(state, movedCars, serviceFactor) {
  const pressure = employeePressureScore(state, movedCars, serviceFactor);
  const notes = [];

  const scrutinyNote = applySafetyScrutinyTick(state);
  if (scrutinyNote) {
    notes.push(scrutinyNote);
  }

  const unionNote = maybeApplyUnionization(state, pressure);
  if (unionNote) {
    notes.push(unionNote);
  }

  const burnoutNote = maybeApplyBurnout(state, pressure);
  if (burnoutNote) {
    notes.push(burnoutNote);
  }

  const quitNote = maybeApplyQuits(state, pressure);
  if (quitNote) {
    notes.push(quitNote);
  }

  const whistleblowerNote = maybeApplyWhistleblower(state);
  if (whistleblowerNote) {
    notes.push(whistleblowerNote);
  }

  const sabotageNote = maybeApplySabotage(state, pressure);
  if (sabotageNote) {
    notes.push(sabotageNote);
  }

  return notes;
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
      profitabilityTier: branch.profitabilityTier,
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

function tierProfitAdjustment(tier) {
  if (tier === "profitable") {
    return 12000;
  }
  if (tier === "losing") {
    return -18000;
  }
  return 0;
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
    railroadName: pickRailroadName(),
    cash: 2450000,
    debt: 1200000,
    carloads: 920,
    serviceCapacity: 80,
    trackCondition: 76,
    morale: 68,
    confidence: 64,
    lineMiles: 58,
    covenantCashLimit: -2500000,
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
    locomotiveCapacity: LOCOMOTIVE_BASE_CAR_CAPACITY,
    lowTrafficMonths: 0,
    slushFund: 0,
    ceoLifestyleScore: 0,
    slushActivities: createSlushActivities(),
    unionized: false,
    safetyScrutinyMonths: 0,
    loanInterestRateMonthly: 0.0125,
    currentMarketRateMonthly: 0.012,
    monthlyCosts: emptyCostRow(1),
    pendingActionCashDelta: 0,
  };

  state.currentMarketRateMonthly = marketRateForEconomy(state.economyIndex);

  recalcLineMiles(state);
  recalcTrackCondition(state);
  state.locomotiveCapacity = estimateLocomotiveCapacity(state);
  return state;
}

function snapshotRow(state) {
  return {
    month: state.month,
    cash: state.cash,
    slushFund: state.slushFund,
    ceoLifestyleScore: state.ceoLifestyleScore,
    debt: state.debt,
    debtServiceNextMonth: nextMonthDebtService(state),
    loanRatePct: state.loanInterestRateMonthly * 100,
    covenantLimitCash: state.covenantCashLimit,
    monthsToCovenant: estimateMonthsToCovenant(state),
    carloads: state.carloads,
    locomotiveCapacity: state.locomotiveCapacity,
    serviceCapacity: Math.round(state.serviceCapacity),
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
    branch.decayGraceMonths = Math.max(branch.decayGraceMonths ?? 0, randomInt(4, 7));
    state.disruptionPenalty -= 0.03;
    state.morale += randomInt(1, 3);
    recalcTrackCondition(state);
    return `Maintenance gang focused on ${branch.name} for $${spend.toLocaleString()}.`;
  }

  if (verb === "repair") {
    const spend = Math.round(sumCosts(branch.costs) * 1.45) + 90000;
    state.cash -= spend;
    const nominalGain = randomInt(18, 30);
    branch.condition += applyRepairGainWithDiminishingReturns(branch, nominalGain);
    branch.decayGraceMonths = Math.max(branch.decayGraceMonths ?? 0, randomInt(4, 7));
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
      state.serviceCapacity -= randomInt(2, 4);
      state.confidence -= randomInt(3, 6);
      state.disruptionPenalty += 0.03;
      return "System maintenance was deferred. This month will run rougher than usual.";
    case "perform-system-maintenance":
      state.cash -= 230000;
      state.monthlyWearModifier -= 1.2;
      state.serviceCapacity += randomInt(6, 10);
      for (const branch of activeBranches(state)) {
        branch.condition += randomInt(3, 7);
        branch.decayGraceMonths = Math.max(branch.decayGraceMonths ?? 0, randomInt(6, 12));
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

function applyTurnipSqueeze(state, allocationInput, amountInput) {
  const fractions = normalizedAllocation(state, allocationInput);
  if (!fractions) {
    return "Slush fund transfer canceled: allocation percentages must add up to exactly 100%.";
  }

  const amount = Number(amountInput);
  if (!Number.isFinite(amount) || amount < 0) {
    return "Slush fund transfer canceled: squeeze amount must be zero or greater.";
  }

  const squeezeAmount = Math.round(amount);

  state.cash -= squeezeAmount;
  state.slushFund += squeezeAmount;
  state.confidence -= randomInt(1, 2);
  state.morale -= randomInt(1, 2);
  const activities = state.slushActivities ?? [];
  const allocationSummary = activities
    .map((activity) => {
      const ratio = fractions[activity.id] ?? 0;
      return `${activity.name} ${(ratio * 100).toFixed(0)}%`;
    })
    .join(" | ");
  let remaining = squeezeAmount;

  for (let i = 0; i < activities.length; i += 1) {
    const activity = activities[i];
    const isLast = i === activities.length - 1;
    const allocation = isLast
      ? remaining
      : Math.min(remaining, Math.round(squeezeAmount * (fractions[activity.id] ?? 0)));
    activity.funded += allocation;
    remaining -= allocation;
  }

  const unlocked = [];
  for (const activity of activities) {
    if (!activity.achieved && activity.funded >= activity.target) {
      activity.achieved = true;
      activity.achievedMonth = state.month;
      const lifestylePoints = activity.lifestylePoints ?? 0;
      state.ceoLifestyleScore += lifestylePoints;
      unlocked.push({
        name: activity.name,
        flavor: activity.unlockFlavor,
        lifestylePoints,
      });
    }
  }

  if (unlocked.length > 0) {
    const unlockLines = unlocked.map((activity) => {
      const scoreText = activity.lifestylePoints > 0 ? ` CEO lifestyle score +${activity.lifestylePoints}.` : "";
      return `${activity.name}: ${activity.flavor}${scoreText}`;
    });
    for (const line of unlockLines) {
      state.log.unshift(`Month ${state.month}: ${line}`);
    }
    return `Owners squeezed the turnip into the slush fund: $${squeezeAmount.toLocaleString()} diverted and allocated (${allocationSummary}). ${unlockLines.join(" ")}`;
  }

  return `Owners squeezed the turnip into the slush fund: $${squeezeAmount.toLocaleString()} diverted and allocated (${allocationSummary}).`;
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

function applyBranchMonthlyDrag(state, branch) {
  const infraCost = sumCosts(branch.costs);
  if ((branch.decayGraceMonths ?? 0) > 0) {
    branch.decayGraceMonths -= 1;
  } else {
    const stagedDecay = stagedConditionDecay(branch.condition);
    const wear = clamp(stagedDecay + state.monthlyWearModifier, 0, 8);
    branch.condition -= wear;
  }

  let incidentCost = 0;
  const incidentChance = state.safetyScrutinyMonths > 0 ? 0.22 : 0.35;
  if (branch.condition < 35 && Math.random() < incidentChance) {
    incidentCost = randomInt(50000, 135000);
    state.cash -= incidentCost;
    state.confidence -= randomInt(2, 6);
    state.report += ` ${branch.name} suffered a track incident costing $${incidentCost.toLocaleString()}.`;
  }

  return { infraCost, incidentCost };
}

function moveMarketLanes(state, serviceFactor) {
  let movedCars = 0;
  const movedByBranch = {};

  for (const lane of state.market.lanes) {
    if (lane.status === "Abandoned") {
      lane.movedCars = 0;
      movedByBranch[lane.key] = 0;
      continue;
    }

    const branch = findBranch(state, lane.key);
    const branchAdjustment = branch ? (branch.condition - 70) / 350 : -0.08;
    const laneService = clamp(serviceFactor + branchAdjustment, 0.2, 1.05);
    const laneMoved = clamp(
      Math.round(lane.offeredCars * laneService) + randomInt(-8, 8),
      0,
      lane.offeredCars,
    );
    lane.movedCars = laneMoved;
    movedCars += laneMoved;
    movedByBranch[lane.key] = laneMoved;
  }

  const capped = applyLocomotiveCapacityCap(state, movedByBranch, movedCars);

  for (const lane of state.market.lanes) {
    if (lane.status === "Abandoned") {
      lane.movedCars = 0;
      continue;
    }
    lane.movedCars = capped.movedByBranch[lane.key] ?? 0;
  }

  return capped;
}

function applyMonthlyDrag(state) {
  const interest = nextMonthDebtService(state);
  const unionPayrollMultiplier = state.unionized ? 1.12 : 1;
  const payroll = Math.round((180000 + Math.round((72 - state.morale) * 1700)) * unionPayrollMultiplier);
  const dispatchOps = 120000;
  const locomotiveLease = state.emergencyLeaseUnits * 65000;
  state.cash -= interest + payroll + dispatchOps + locomotiveLease;

  let branchCostTotal = 0;
  let disruptionCosts = 0;
  for (const branch of activeBranches(state)) {
    const branchMonthly = applyBranchMonthlyDrag(state, branch);
    branchCostTotal += branchMonthly.infraCost;
    disruptionCosts += branchMonthly.incidentCost;
  }

  state.cash -= branchCostTotal;

  if (state.morale < 35 && Math.random() < 0.4) {
    const strikeLoss = randomInt(90000, 210000);
    state.cash -= strikeLoss;
    disruptionCosts += strikeLoss;
    state.disruptionPenalty += 0.08;
    state.report += ` Crew shortages delayed trains and burned $${strikeLoss.toLocaleString()} in extra costs.`;
  }

  const monthlyCapacityDecay =
    1.7 + Math.max(0, state.disruptionPenalty) * 8 + Math.max(0, (70 - state.trackCondition) * 0.03);
  state.serviceCapacity -= monthlyCapacityDecay;

  const operationalQuality = (state.trackCondition * 0.4 + state.morale * 0.32 + state.confidence * 0.28) / 100;
  const networkBaseService = state.serviceCapacity / 100 * 0.72 + operationalQuality * 0.28;
  const serviceFactor = clamp(networkBaseService - state.disruptionPenalty, 0.2, 1.05);

  const capped = moveMarketLanes(state, serviceFactor);
  const movedCars = capped.totalMoved;

  updateCustomerViability(state);
  const employeeNotes = applyEmployeeConsequences(state, movedCars, serviceFactor);
  for (const note of employeeNotes) {
    state.report += ` ${note}`;
  }

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
        profitabilityTier: liveBranch.profitabilityTier,
        costs: { ...liveBranch.costs },
        totalCost: sumCosts(liveBranch.costs),
        revenue: 0,
        profit: 0,
      };
    }

    const movedCarsForBranch = capped.movedByBranch[liveBranch.key] ?? 0;
    const totalCost = sumCosts(liveBranch.costs);
    const revenue = Math.round(movedCarsForBranch * monthlyRate * FREIGHT_REVENUE_MULTIPLIER * (liveBranch.revenueFactor ?? 1));
    const profit = revenue - totalCost + tierProfitAdjustment(liveBranch.profitabilityTier);
    totalRevenue += revenue;
    totalBranchProfit += profit;
    return {
      key: liveBranch.key,
      name: liveBranch.name,
      status: liveBranch.status,
      condition: liveBranch.condition,
      customerHealth: liveBranch.customerHealth,
      customerStatus: liveBranch.customerStatus,
      profitabilityTier: liveBranch.profitabilityTier,
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
  clampQualityMetrics(state);
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

function determineVerdict(state) {
  const extractionRatio = state.slushFund / Math.max(1, state.slushFund + Math.max(state.cash, 0));

  if (state.result === "Barely Solvent") {
    return extractionRatio >= 0.18 ? "Cowardly Solvency" : "Stewardship Failure";
  }

  if (state.result === "Receivership") {
    if (state.slushFund >= 400000) {
      return "Fast Strip-Mine";
    }
    return "Bridge-Funded Poverty";
  }

  if (state.result === "No Service Territory" || state.result === "Traffic Collapse") {
    if (state.slushFund >= 300000) {
      return "Catastrophic Harvest";
    }
    return "Stewardship Failure";
  }

  if (state.result === "FRA Shutdown") {
    return state.slushFund >= 250000 ? "Catastrophic Harvest" : "Stewardship Failure";
  }

  if (state.slushFund >= 450000) {
    return "Fast Strip-Mine";
  }

  return "Clean Extraction";
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

function initializeWithBaselineMonth(state) {
  state.report =
    "Baseline month auto-ran to seed revenue visibility. Review branch Revenue / Cost / Profit before choosing Month 2 actions.";

  state.market = marketBaseline(state);
  applyMonthlyDrag(state);

  writeHistoryRow(state);
  writeCostRow(state);
  writeMarketRow(state);

  state.log.unshift(
    `Month ${state.month} baseline (${state.market.economy} economy): network operated with no policy intervention to establish reference performance.`,
  );

  state.month += 1;
  maybeShiftEconomy(state);
  state.currentMarketRateMonthly = marketRateForEconomy(state.economyIndex);
  state.market = marketBaseline(state);
  state.log.unshift(`Month ${state.month} opens with cash at $${state.cash.toLocaleString()}.`);
  state.log = state.log.slice(0, 24);
}

export function createGame() {
  let state = baseState();
  initializeWithBaselineMonth(state);

  function step(actionId, options = {}) {
    if (state.gameOver) {
      return state;
    }

    const cashBeforeAction = state.cash;
    const actionSummary = applyAction(state, actionId);
    clampQualityMetrics(state);
    const notes = [actionSummary];

    if (options.squeezeTurnip) {
      notes.push(applyTurnipSqueeze(state, options.turnipAllocation, options.turnipAmount));
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
      const verdict = determineVerdict(state);
      const slushLine = `Slush fund extracted: $${state.slushFund.toLocaleString()}.`;
      const verdictLine = `Verdict: ${verdict}.`;
      state.report += ` ${ending} ${slushLine} ${verdictLine}`;
      state.log.unshift(`Final: ${state.result} - ${ending} ${slushLine} ${verdictLine}`);
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
    initializeWithBaselineMonth(state);
    return state;
  }

  function renameRailroad(proposedName) {
    if (state.gameOver) {
      return { ok: false, message: "Cannot rename after the game has ended." };
    }

    if (state.cash < RAILROAD_RENAME_COST) {
      return { ok: false, message: `Renaming costs $${RAILROAD_RENAME_COST.toLocaleString()}, but cash is too low.` };
    }

    const oldName = state.railroadName;
    let nextName = "";

    if (typeof proposedName === "string") {
      const cleaned = sanitizeRailroadName(proposedName);
      nextName = cleaned.length > 0 ? cleaned : pickDifferentRailroadName(oldName);
    } else {
      nextName = pickDifferentRailroadName(oldName);
    }

    if (nextName === oldName) {
      return { ok: false, message: "Road name unchanged." };
    }

    state.cash -= RAILROAD_RENAME_COST;
    state.railroadName = nextName;
    state.report = `Road renamed from ${oldName} to ${nextName} for $${RAILROAD_RENAME_COST.toLocaleString()}.`;
    state.log.unshift(
      `Month ${state.month}: Road renamed from ${oldName} to ${nextName} for $${RAILROAD_RENAME_COST.toLocaleString()}.`,
    );
    state.log = state.log.slice(0, 24);

    return { ok: true, message: state.report };
  }

  function getState() {
    return state;
  }

  function getActions() {
    const dynamicBranchActions = state.branches.flatMap((branch) => branchActionSet(branch));
    const availableCorporateActions = CORPORATE_ACTIONS.filter((action) => {
      if (action.id === "return-locomotives") {
        return state.emergencyLeaseUnits > 0;
      }
      return true;
    });
    return [...dynamicBranchActions, ...availableCorporateActions];
  }

  return {
    step,
    reset,
    renameRailroad,
    getState,
    getActions,
  };
}
