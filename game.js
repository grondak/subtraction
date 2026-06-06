import { createGame } from "./simEngine.js";

const game = createGame();

const snapshotBodyEl = document.getElementById("snapshotBody");
const costBodyEl = document.getElementById("costBody");
const observeBodyEl = document.getElementById("observeBody");
const branchBodyEl = document.getElementById("branchBody");
const actionsEl = document.getElementById("actions");
const turnipBtn = document.getElementById("turnipBtn");
const reportEl = document.getElementById("report");
const logEl = document.getElementById("log");
const restartBtn = document.getElementById("restartBtn");
const currentMonthEl = document.getElementById("currentMonth");

let turnipArmed = false;

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
          <td class="col-debt">$${row.debt.toLocaleString()}</td>
          <td class="col-debt-service">$${row.debtServiceNextMonth.toLocaleString()}</td>
          <td class="col-loan-rate">${row.loanRatePct.toFixed(2)}%</td>
          <td class="col-covenant">$${row.covenantLimitCash.toLocaleString()}</td>
          <td class="col-covenant-runway">${formatMonthsToCovenant(row.monthsToCovenant)}</td>
          <td class="col-carloads">${row.carloads.toLocaleString()}</td>
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
      const logging = laneByKey(row, "timber-branch");
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
          <td>${logging ? `${logging.shipperCars}/${logging.receiverCars} (${logging.status})` : "-"}</td>
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

function branchCostCell(branch) {
  if (!branch) {
    return "-";
  }

  if (branch.status === "abandoned") {
    return "Abandoned";
  }

  return `Rail $${branch.costs.rail.toLocaleString()} | Roadbed $${branch.costs.roadbed.toLocaleString()} | Crossings $${branch.costs.crossings.toLocaleString()} | Spurs $${branch.costs.spurs.toLocaleString()} | Bumpers $${branch.costs.bumpers.toLocaleString()}`;
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
    return `${branch.condition}% (Active, Cust ${customer})`;
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
              <td>${branchCostCell(branch)}</td>
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
    game.step(action.id, { squeezeTurnip: turnipArmed });
    turnipArmed = false;
    render();
  });

  return button;
}

function renderLog(state) {
  logEl.innerHTML = state.log.map((entry) => `<li>${entry}</li>`).join("");
}

function render() {
  const state = game.getState();

  renderStats(state);
  renderCosts(state);
  renderObserve(state);
  renderBranchLedger(state);
  renderActions(state);
  renderLog(state);
  renderCurrentMonth(state);

  reportEl.textContent = state.gameOver
    ? `${state.report} Outcome: ${state.result}.`
    : state.report;
}

restartBtn.addEventListener("click", () => {
  turnipArmed = false;
  game.reset();
  render();
});

turnipBtn.addEventListener("click", () => {
  if (game.getState().gameOver) {
    return;
  }

  turnipArmed = !turnipArmed;
  renderActions(game.getState());
});

render();
