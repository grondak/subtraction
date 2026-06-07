import { createGame } from "./simEngine.js";

const game = createGame();

const snapshotBodyEl = document.getElementById("snapshotBody");
const costBodyEl = document.getElementById("costBody");
const observeBodyEl = document.getElementById("observeBody");
const branchBodyEl = document.getElementById("branchBody");
const actionsEl = document.getElementById("actions");
const turnipBtn = document.getElementById("turnipBtn");
const slushActivitiesEl = document.getElementById("slushActivities");
const reportEl = document.getElementById("report");
const logEl = document.getElementById("log");
const restartBtn = document.getElementById("restartBtn");
const railroadNameEl = document.getElementById("railroadName");
const currentMonthEl = document.getElementById("currentMonth");
const turnipAmountInput = document.getElementById("turnip-amount");
const turnipAllocationInputs = {
  yacht: document.getElementById("alloc-yacht"),
  "race-car": document.getElementById("alloc-race-car"),
  garage: document.getElementById("alloc-garage"),
  vacation: document.getElementById("alloc-vacation"),
  "wild-party": document.getElementById("alloc-wild-party"),
};

let turnipArmed = false;
let turnipAllocation = null;
let turnipAmount = 50000;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthLabel(monthNumber) {
  const index = (monthNumber - 1) % 12;
  const year = Math.floor((monthNumber - 1) / 12) + 1;
  return `${MONTHS[index]} Y${year}`;
}

function renderCurrentMonth(state) {
  currentMonthEl.textContent = state.gameOver
    ? `Final Month Reached: ${monthLabel(state.month)}`
    : `Current Month: ${monthLabel(state.month)}`;
}

function renderRailroadName(state) {
  railroadNameEl.textContent = `Road Name: ${state.railroadName}`;
  railroadNameEl.title = "Click to rename road (cost: $10,000)";
}

function readTurnipAllocationInputs() {
  const ids = ["yacht", "race-car", "garage", "vacation", "wild-party"];
  const values = ids.map((id) => Number(turnipAllocationInputs[id]?.value));
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    return null;
  }

  const total = values.reduce((sum, value) => sum + value, 0);
  if (Math.abs(total - 100) > 0.0001) {
    return null;
  }

  return Object.fromEntries(ids.map((id, index) => [id, values[index] / total]));
}

function readTurnipAmountInput() {
  const amount = Number(turnipAmountInput?.value);
  if (!Number.isFinite(amount) || amount < 0) {
    return null;
  }

  return Math.round(amount);
}

function formatTurnipButtonLabel() {
  return "Arm Squeeze";
}

function lifestyleTitleForScore(score) {
  if (score >= 120) {
    return "Peak Corporate Hedonist";
  }
  if (score >= 80) {
    return "Executive Indulgence";
  }
  if (score >= 40) {
    return "Prestige with a Debt Problem";
  }
  if (score > 0) {
    return "Trying Very Hard";
  }
  return "Barely Decorating the Office";
}

function renderSlushActivities(state) {
  const activities = state.slushActivities ?? [];
  const lifestyleTitle = lifestyleTitleForScore(state.ceoLifestyleScore);
  const allocationText = turnipAllocation
    ? activities
        .map((activity) => `${activity.name}: ${Math.round((turnipAllocation[activity.id] ?? 0) * 100)}%`)
        .join(" | ")
    : "No squeeze allocation set for this month.";

  slushActivitiesEl.innerHTML = `
    <p class="slush-caption slush-score">CEO Lifestyle Score: ${state.ceoLifestyleScore} (${lifestyleTitle})</p>
    <p class="slush-caption">Slush Fund Allocation: ${allocationText}</p>
    <div class="slush-grid">
      ${activities
        .map((activity) => {
          const pct = Math.min(100, (activity.funded / activity.target) * 100);
          const lifestylePoints = activity.lifestylePoints ?? 0;
          const achieved = activity.achieved
            ? `<span class="slush-badge">Achievement: Month ${monthLabel(activity.achievedMonth)}</span>`
            : "";
          return `
            <article class="slush-card ${activity.achieved ? "is-complete" : ""}">
              <h3>${activity.name}</h3>
              <p>$${activity.funded.toLocaleString()} / $${activity.target.toLocaleString()}</p>
              <p class="slush-flavor">Lifestyle ${lifestylePoints > 0 ? `+${lifestylePoints}` : "+0"}: ${activity.unlockFlavor}</p>
              <div class="slush-bar">
                <span style="width: ${pct.toFixed(1)}%"></span>
              </div>
              ${achieved}
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function statClass(key, value) {
  if (key === "cash" && value < 0) return "is-danger";
  if (key === "trackCondition" && value < 25) return "is-danger";
  if (key === "morale" && value < 25) return "is-danger";
  if (key === "confidence" && value < 25) return "is-danger";
  return "";
}

function formatMonthsToCovenant(value) {
  if (value === null) {
    return "Safe";
  }
  if (value === 0) {
    return "At/Below Limit";
  }
  return `${value} mo`;
}

function renderStats(state) {
  const rows = [...state.history].reverse();
  snapshotBodyEl.innerHTML = rows
    .map((row) => {
      return `
        <tr>
          <td class="col-month">${monthLabel(row.month)}</td>
          <td class="col-cash ${statClass("cash", row.cash)}">$${row.cash.toLocaleString()}</td>
          <td class="col-slush">$${row.slushFund.toLocaleString()}</td>
          <td class="col-lifestyle">${row.ceoLifestyleScore}</td>
          <td class="col-debt">$${row.debt.toLocaleString()}</td>
          <td class="col-debt-service">$${row.debtServiceNextMonth.toLocaleString()}</td>
          <td class="col-loan-rate">${row.loanRatePct.toFixed(2)}%</td>
          <td class="col-covenant">$${row.covenantLimitCash.toLocaleString()}</td>
          <td class="col-covenant-runway">${formatMonthsToCovenant(row.monthsToCovenant)}</td>
          <td class="col-carloads">${row.carloads.toLocaleString()}</td>
          <td class="col-loco-cap">${row.locomotiveCapacity.toLocaleString()}</td>
          <td class="col-service">${row.serviceCapacity}%</td>
          <td class="col-track ${statClass("trackCondition", row.trackCondition)}">${row.trackCondition}%</td>
          <td class="col-morale ${statClass("morale", row.morale)}">${row.morale}%</td>
          <td class="col-confidence ${statClass("confidence", row.confidence)}">${row.confidence}%</td>
          <td class="col-line">${row.lineMiles} mi</td>
          <td class="col-lease">${row.leaseUnits}</td>
        </tr>
      `;
    })
    .join("");
}

function laneByKey(row, key) {
  return row.lanes.find((lane) => lane.key === key);
}

function branchByKey(row, key) {
  return row.branches.find((branch) => branch.key === key);
}

function renderObserve(state) {
  const rows = [...state.marketHistory].reverse();
  observeBodyEl.innerHTML = rows
    .map((row) => {
      const aerospaceParts = laneByKey(row, "aerospace-parts");
      const grain = laneByKey(row, "agri-branch");
      const quarry = laneByKey(row, "stone-branch");
      const oil = laneByKey(row, "oil-spur");
      const timberReload = laneByKey(row, "timber-spur");
      const chemical = laneByKey(row, "chemical-spur");
      const unserved = Math.max(0, row.totalOffered - row.totalMoved);
      const serviceRate = row.totalOffered > 0 ? (row.totalMoved / row.totalOffered) * 100 : 0;

      return `
        <tr>
          <td>${monthLabel(row.month)}</td>
          <td>${row.economy}</td>
          <td>${aerospaceParts ? `${aerospaceParts.shipperCars}/${aerospaceParts.receiverCars} (${aerospaceParts.status})` : "-"}</td>
          <td>${grain ? `${grain.shipperCars}/${grain.receiverCars} (${grain.status})` : "-"}</td>
          <td>${quarry ? `${quarry.shipperCars}/${quarry.receiverCars} (${quarry.status})` : "-"}</td>
          <td>${oil ? `${oil.shipperCars}/${oil.receiverCars} (${oil.status})` : "-"}</td>
          <td>${timberReload ? `${timberReload.shipperCars}/${timberReload.receiverCars} (${timberReload.status})` : "-"}</td>
          <td>${chemical ? `${chemical.shipperCars}/${chemical.receiverCars} (${chemical.status})` : "-"}</td>
          <td>${row.totalOffered.toLocaleString()}</td>
          <td>${row.totalMoved.toLocaleString()}</td>
          <td>${unserved.toLocaleString()}</td>
          <td>${serviceRate.toFixed(1)}%</td>
        </tr>
      `;
    })
    .join("");
}

function renderCosts(state) {
  const rows = [...state.costHistory].reverse();
  costBodyEl.innerHTML = rows
    .map((row) => {
      return `
        <tr>
          <td>${monthLabel(row.month)}</td>
          <td>${ledgerMoneyCell(row.crewPayroll, "ledger-expense")}</td>
          <td>${ledgerMoneyCell(row.locomotiveLease, "ledger-expense")}</td>
          <td>${ledgerMoneyCell(row.debtService, "ledger-expense")}</td>
          <td>${ledgerMoneyCell(row.dispatchOps, "ledger-expense")}</td>
          <td>${ledgerMoneyCell(row.infrastructure, "ledger-expense")}</td>
          <td>${ledgerMoneyCell(row.disruptionCosts, "ledger-expense")}</td>
          <td>${ledgerMoneyCell(row.policySpend, "ledger-expense")}</td>
          <td>${ledgerMoneyCell(row.totalExpenditure, "ledger-expense-total")}</td>
          <td>${ledgerMoneyCell(row.revenue, "ledger-revenue")}</td>
          <td>${ledgerMoneyCell(row.operatingBalance, "ledger-balance")}</td>
        </tr>
      `;
    })
    .join("");
}

function branchRevenueCell(branch) {
  if (branch?.status !== "active") {
    return "-";
  }

  return moneyCell(branch.revenue);
}

function branchTotalCostCell(branch) {
  if (branch?.status !== "active") {
    return "-";
  }

  return moneyCell(-branch.totalCost);
}

function moneyCell(value) {
  const css = value < 0 ? "is-danger" : "";
  return `<span class="${css}">$${value.toLocaleString()}</span>`;
}

function ledgerMoneyCell(value, tone) {
  const negativeClass = value < 0 ? " is-danger" : "";
  return `<span class="ledger-money ${tone}${negativeClass}">$${value.toLocaleString()}</span>`;
}

function marginCell(branch) {
  if (branch?.status !== "active") {
    return "-";
  }

  if (branch.revenue <= 0) {
    return "0.0%";
  }

  const margin = (branch.profit / branch.revenue) * 100;
  const css = margin < 0 ? "is-danger" : "";
  return `<span class="${css}">${margin.toFixed(1)}%</span>`;
}

function rankingCell(row) {
  const active = row.branches.filter((branch) => branch.status === "active");
  if (active.length === 0) {
    return "No active branches";
  }

  const ordered = [...active].sort((a, b) => b.profit - a.profit);
  const best = ordered[0];
  const worst = ordered.at(-1);
  return `Best: ${best.name} (${moneyCell(best.profit)}) | Worst: ${worst.name} (${moneyCell(worst.profit)})`;
}

function branchStatusLabel(branch) {
  if (!branch) {
    return "-";
  }

  if (branch.status === "active") {
    const customer = branch.customerStatus ?? "stable";
    return `${Math.round(branch.condition)}% (Active, Cust ${customer})`;
  }

  return "Abandoned";
}

function renderBranchLedger(state) {
  const rows = [...state.marketHistory].reverse();
  branchBodyEl.innerHTML = rows
    .map((row) => {
      const branchOrder = row.branches.map((branch) => branch.key);
      const branches = branchOrder.map((key) => branchByKey(row, key));
      const branchRows = branches.length;
      const activeCost = row.branches
        .filter((branch) => branch.status === "active")
        .reduce((sum, branch) => sum + branch.totalCost, 0);

      return branches
        .map((branch, index) => {
          const monthSummary =
            index === 0
              ? `
                <td rowspan="${branchRows}">${monthLabel(row.month)}</td>
              `
              : "";

          const totals =
            index === 0
              ? `
                <td rowspan="${branchRows}">$${activeCost.toLocaleString()}</td>
                <td rowspan="${branchRows}">${moneyCell(row.totalBranchProfit ?? 0)}</td>
                <td rowspan="${branchRows}">${rankingCell(row)}</td>
              `
              : "";

          return `
            <tr class="ledger-subrow ${index === 0 ? "ledger-month-start" : ""}">
              ${monthSummary}
              <td>${branch?.name ?? "-"}</td>
              <td>${branchStatusLabel(branch)}</td>
              <td>${branchRevenueCell(branch)}</td>
              <td>${branchTotalCostCell(branch)}</td>
              <td>${branch ? moneyCell(branch.profit) : "-"}</td>
              <td>${marginCell(branch)}</td>
              ${totals}
            </tr>
          `;
        })
        .join("");
    })
    .join("");
}

function renderActions(state) {
  actionsEl.innerHTML = "";
  turnipBtn.disabled = state.gameOver;
  turnipBtn.classList.toggle("is-armed", turnipArmed && !state.gameOver);
  turnipBtn.setAttribute("aria-pressed", turnipArmed ? "true" : "false");
  turnipBtn.textContent = turnipArmed ? "ARMED: Squeeze Armed" : formatTurnipButtonLabel();

  const actions = game.getActions();
  const branchGroups = new Map();
  const corporateActions = [];

  for (const action of actions) {
    if (!action.id.startsWith("branch:")) {
      corporateActions.push(action);
      continue;
    }

    const [, , branchKey] = action.id.split(":");
    const label = action.title.replace(/^(Maintain|Repair|Abandon)\s+/u, "");
    if (!branchGroups.has(branchKey)) {
      branchGroups.set(branchKey, { label, actions: [] });
    }
    branchGroups.get(branchKey).actions.push(action);
  }

  const branchSection = document.createElement("div");
  branchSection.className = "branch-groups";

  for (const [, group] of branchGroups) {
    const box = document.createElement("section");
    box.className = "branch-action-box";

    const heading = document.createElement("h3");
    heading.className = "branch-action-title";
    heading.textContent = group.label;
    box.appendChild(heading);

    const row = document.createElement("div");
    row.className = "branch-action-row";

    for (const action of group.actions) {
      row.appendChild(createActionButton(action, state.gameOver));
    }

    box.appendChild(row);
    branchSection.appendChild(box);
  }

  actionsEl.appendChild(branchSection);

  const corporateSection = document.createElement("div");
  corporateSection.className = "corporate-actions";
  for (const action of corporateActions) {
    corporateSection.appendChild(createActionButton(action, state.gameOver));
  }
  actionsEl.appendChild(corporateSection);
}

function createActionButton(action, disabled) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "action-btn";
  button.disabled = disabled;
  button.innerHTML = `
    <strong>${action.title}</strong>
    <span class="action-desc">${action.description}</span>
    <span class="action-note">${action.effectNote ?? "Rail impact: No additional advisory."}</span>
  `;

  button.addEventListener("click", () => {
    game.step(action.id, { squeezeTurnip: turnipArmed, turnipAllocation });
    turnipArmed = false;
    turnipAllocation = null;
    render();
  });

  return button;
}

function renderLog(state) {
  logEl.innerHTML = state.log.map((entry) => `<li>${entry}</li>`).join("");
}

function capLedgerWrapByRows(tbodyEl, options = {}) {
  const wrap = tbodyEl.closest(".table-wrap");
  if (!wrap) {
    return;
  }

  const table = wrap.querySelector("table");
  if (!table) {
    return;
  }

  const targetRows = options.targetRows ?? 3;
  const groupSelector = options.groupSelector ?? null;
  const extraSpace = options.extraSpace ?? 56;
  const rows = [...tbodyEl.querySelectorAll("tr")];
  if (rows.length === 0) {
    wrap.style.maxHeight = "";
    return;
  }

  const headerHeight = table.tHead?.getBoundingClientRect().height ?? 0;
  let bodyHeight = 0;

  if (groupSelector) {
    let groupsSeen = 0;
    for (const row of rows) {
      if (row.matches(groupSelector)) {
        groupsSeen += 1;
      }
      if (groupsSeen > targetRows) {
        break;
      }
      bodyHeight += row.getBoundingClientRect().height;
    }
  } else {
    for (let i = 0; i < Math.min(targetRows, rows.length); i += 1) {
      bodyHeight += rows[i].getBoundingClientRect().height;
    }
  }

  wrap.style.maxHeight = `${Math.ceil(headerHeight + bodyHeight + extraSpace)}px`;
}

function applyLedgerScrollCaps() {
  capLedgerWrapByRows(snapshotBodyEl, { targetRows: 3 });
  capLedgerWrapByRows(costBodyEl, { targetRows: 3 });
  capLedgerWrapByRows(observeBodyEl, { targetRows: 3 });
  capLedgerWrapByRows(branchBodyEl, { targetRows: 3, groupSelector: ".ledger-month-start" });
}

function render() {
  const state = game.getState();

  renderStats(state);
  renderCosts(state);
  renderObserve(state);
  renderBranchLedger(state);
  renderActions(state);
  renderSlushActivities(state);
  renderLog(state);
  renderRailroadName(state);
  renderCurrentMonth(state);
  applyLedgerScrollCaps();

  reportEl.textContent = state.gameOver
    ? `${state.report} Outcome: ${state.result}.`
    : state.report;
}

restartBtn.addEventListener("click", () => {
  turnipArmed = false;
  turnipAllocation = null;
  turnipAmount = 50000;
  if (turnipAmountInput) {
    turnipAmountInput.value = "50000";
  }
  game.reset();
  render();
});

turnipBtn.addEventListener("click", () => {
  if (game.getState().gameOver) {
    return;
  }

  if (turnipArmed) {
    turnipArmed = false;
    turnipAllocation = null;
    render();
    return;
  }

  const amount = readTurnipAmountInput();
  if (amount === null) {
    globalThis.alert("Squeeze amount must be zero or greater.");
    return;
  }

  const allocation = readTurnipAllocationInputs();
  if (!allocation) {
    globalThis.alert("Allocation percentages must be non-negative and add up to exactly 100.");
    return;
  }

  turnipAmount = amount;
  turnipAllocation = allocation;
  turnipArmed = true;
  render();
});

turnipAmountInput?.addEventListener("input", () => {
  if (!turnipArmed) {
    render();
  }
});

railroadNameEl.addEventListener("click", () => {
  const state = game.getState();
  if (state.gameOver) {
    return;
  }

  const input = globalThis.prompt(
    "Rename railroad (cost: $10,000). Enter a custom name, or leave blank / type /random for a random generated name.",
    state.railroadName,
  );

  if (input === null) {
    return;
  }

  const trimmed = input.trim();
  const useRandom = trimmed.length === 0 || trimmed.toLowerCase() === "/random";
  const outcome = useRandom ? game.renameRailroad() : game.renameRailroad(trimmed);

  if (!outcome.ok) {
    globalThis.alert(outcome.message);
  }

  render();
});

render();
