# Subtraction

A static web game where you run a shortline freight railroad into collapse.

## Run

No build tools are required.

1. Open `index.html` for the briefing/strategy page, then click through to `game.html`.
2. Enter a squeeze amount in the slush panel, then arm `Arm Squeeze` to divert that amount for yourself this month. The default is $50k.
3. Click one primary action each month.
4. The slush fund action (if armed) applies in addition to your primary action.
5. Slush allocation percentages must be non-negative and add up to exactly `100`.
6. Pick a scenario from the Scenario selector. The default run is `The Golden Parachute Quarter`, a six-month sale window focused on personal extraction before diligence.
7. The remaining anti-victory scenarios survive to turn 12, 24, or 36 to trigger the end notice.
8. The game auto-runs a baseline month before your first decision so initial revenue and branch economics are visible.
9. Watch the company snapshot table grow one row per month.
10. First actionable turn starts in Month 2 after baseline seeding.
11. Track Observe/Orient signals in the monthly market table: economy grade plus shipper and receiver lane pressure.
12. Try to trigger one of the failure outcomes before month 25.

## Game Model

- Economy condition uses 5 grades (`Terrible`, `Soft`, `Tepid`, `Firm`, `Terrific`) and shifts every 4-6 months.
- Freight lanes are modeled shipper-to-receiver on explicit branch lines and spurs.
- Current network includes six lines:
	- `Aerospace Parts Branch`
	- `Agri Branch`
	- `Stone Branch`
	- `Oil Spur`
	- `Timber Spur`
	- `Chemical Plant Spur`
- Each month you can choose targeted branch actions: maintain, repair, or abandon.
- Corporate controls now include paired opposites: raise/drop rates, defer/perform system maintenance, lease/return emergency locomotives, and cut/increase crew overtime.
- Service capacity is an explicit network stat that decays every month and is restored by system maintenance actions.
- Locomotive capacity is now an explicit monthly throughput cap layered on top of demand, service, condition, and crew effects.
- Leasing emergency locomotives increases locomotive capacity, while return actions are only available when leased units are active.
- A supplemental side-action, `Add to Slush Fund (Squeeze the Turnip)`, can be applied once per month in addition to the selected primary action.
- Slush fund allocation is split across five luxury projects each month you arm it, and percentages must total `100`.
- The squeeze amount is user-entered and defaults to $50k; the button itself now lives inside the slush allocation panel.
- Slush achievements trigger mini-party events at these thresholds: `Wild Party` ($10k), `Social Media-Fired Vacation Around the World` ($50k), `Three-Car Garage` ($100k), `Buy That Race Car` ($200k), and `Build That Yacht!` ($400k).
- Luxury unlocks now add flavor text and CEO lifestyle score instead of a generic morale hit.
- Three anti-victory scenarios are built in: survive to turn 12, 24, or 36 to trigger the stop notice.
- `The Golden Parachute Quarter` is the default scenario. It gives you six months before a sale and leans harder into personal extraction than operational recovery.
- The anti-victory scenarios remain available for 12, 24, and 36 turns if you want the longer target runs.
- Scenario selection lives in the game header and resets the run when changed.
- Jumbo loan controls include principal paydown and rate renegotiation to the current market rate.
- Abandoning a branch removes service for that branch's shipper and receiver.
- Lane pressure and moved cars are logged in row-per-month format.
- Branch infrastructure costs are tracked per branch by category: rail, roadbed, crossings, spurs, and bumpers.
- Branch profitability is tracked monthly per branch as revenue minus that branch's infrastructure cost.
- Branch operating margin is shown monthly as profit divided by branch revenue.
- Monthly branch ranking highlights the best and worst branch by profit.
- Company-level monthly expenditures are tracked in a cost ledger: crew payroll, locomotive lease, debt service, dispatch/ops, infrastructure, disruption costs, and policy spend.
- Customer businesses now carry viability states (`stable`, `distressed`, `critical`, `failed`).
- Economy conditions directly affect customer health drift and failure risk.
- Receivership triggers when cash falls below the covenant cash limit shown in Company Snapshot.
- `Months to Covenant` estimates runway using current operating balance and covenant distance.

## Key Dashboards

- `Company Snapshot`: month, cash, slush fund, debt, debt service next month, loan rate, covenant limit, months to covenant, moved carloads, locomotive capacity, service capacity, and operating condition indicators.
- `Current Month Badge`: live month indicator that starts at Month 2 after baseline seeding and advances each submitted turn.
- `Company Cost Ledger`: monthly expenditure breakout plus revenue and operating balance.
- `External Factors`: lane-level demand, moved cars, unserved cars, and service rate.
- `Branch Infrastructure Ledger`: monthly group with branch sub-rows for status, revenue, cost, profit, and margin.
- `Slush Fund Activities`: five progress tracks with allocation percentages and achievement unlocks.
- Ledger tables are viewport-capped to keep horizontal scrollbars nearby, with in-panel vertical scrolling after 3 rows (or 3 month groups in branch ledger).
- The slush panel now includes the squeeze amount input and the arm button, so the action label stays simple.

## GitHub Pages

This project is a static site (no build step), so it works directly with GitHub Pages.

1. Push this folder to a GitHub repository.
2. In GitHub, open `Settings -> Pages`.
3. Under `Build and deployment`, set:
	 - `Source`: `Deploy from a branch`
	 - `Branch`: `main` (or your default branch), `/ (root)`
4. Save and wait for Pages to publish.

Site URL format:

- User/org site repository: `https://<user>.github.io/`
- Project site repository: `https://<user>.github.io/<repo>/`

Because all assets are relative paths (`./game.js`, `./styles.css`), no base-path rewrite is required.

## Fonts

The site now self-hosts its typography using the OFL-licensed font files in `assets/fonts/`.
The repo includes the corresponding license texts alongside the binaries.

## Change History

### 2026-06 Locomotive Capacity + Lease Action Gating

- Added explicit locomotive capacity as a monthly throughput bottleneck in movement calculations.
- Wired emergency locomotive leases to increase capacity while preserving lease/debt drag.
- Added `Loco Capacity` to the Company Snapshot table.
- Gated the `Return Emergency Locomotives` action so it appears only when leased units are currently active.

### 2026-06 Slush Amount + Labor Consequences Update

- Allowed the slush squeeze amount to be user-entered, with $50k as the default.
- Moved the arm button into the slush allocation panel and simplified its label.
- Added employee-facing consequences for burnout, quits, sabotage, unionization, and safety whistleblowing.
- Clarified the payroll model: crew payroll is morale-driven and separate from policy spend.
- Renamed the market panel to `External Factors` everywhere in the game UI.

### 2026-06 Anti-Victory Scenarios Update

- Added three built-in anti-victory scenarios: survive to turn 12, 24, or 36.
- Added a scenario selector in the game header so players can switch targets before starting a run.
- Tuned the longer anti-victory scenarios with their own starting parameters and rule relaxations.

### 2026-06 Slush Fund + UX Update

- Added configurable slush fund allocation across five project tracks, with totals required to equal `100`.
- Added unlockable slush achievements with mini-party events and morale penalties at each funding threshold.
- Added persistent slush progress cards and allocation controls in the main game panel.
- Added clickable railroad renaming (random or custom) with in-game cost and log entries.
- Standardized terminology around `Slush Fund` while preserving the `Squeeze the Turnip` joke where intended.
- Capped ledger viewport height so each table shows at most 3 rows (or 3 branch month groups) before vertical scrolling.

### 2026-06 Structure + Docs Refresh

- Clarified split entry points: `index.html` (briefing/how-to) and `game.html` (playable simulator UI).
- Clarified code ownership: core simulation in `simEngine.js`, UI rendering/wiring in `game.js`.
- Documented slush-fund allocation rule (must total exactly `100`) and achievement tracks.
- Documented staged track decay and post-maintenance grace behavior.
- Confirmed static deployment model: no build toolchain, deploy from `main` root on GitHub Pages.

### 2026-06 Freight Ops Update

- Reframed the simulator as a shortline freight railroad with monthly turns.
- Added six branch/spur lines with shipper/receiver pairs and branch-specific infrastructure costs.
- Added branch action groups (maintain, repair, abandon) with branch-level profitability and margin tracking.
- Expanded Observe and Orient reporting with offered demand, moved carloads, unserved cars, and service rate.
- Added customer viability states and economy-mixed customer failure behavior.
- Added debt and covenant visibility: debt service next month, loan rate, covenant limit, and months-to-covenant runway.
- Added jumbo loan controls (pay down principal, renegotiate to market rate).
- Added monthly cost ledger for visible expenditures.
- Added supplemental side-action: Add to Slush Fund (Squeeze the Turnip) (stackable with primary action).
- Added GNU LGPL v3 license and GitHub Pages-ready static deployment setup.

### 2026-06 Service Capacity Update

- Added explicit `Service Capacity` to the simulation state and Company Snapshot.
- Added per-month service capacity deterioration to represent network wear and congestion drag.
- Wired maintenance policy actions into capacity recovery/decline behavior.
- Updated movement/service calculations to use service capacity as a core throughput driver.

### 2026-06 Baseline Visibility Update

- Added automatic Month 1 baseline pre-simulation before player decisions.
- Seeded opening dashboards with real branch financial outcomes instead of zeroed startup rows.
- Updated branch ledger detail columns to show Revenue / Cost / Profit explicitly.

## License

This project is licensed under the GNU Lesser General Public License, version 3 (LGPL-3.0).
See [LICENSE](LICENSE).
