# Subtraction

A static web game where you run a shortline freight railroad into collapse.

## Run

No build tools are required.

1. Open `index.html` in your browser.
2. Click one action each month.
3. Watch the company snapshot table grow one row per month.
4. Track Observe/Orient signals in the monthly market table: economy grade plus shipper and receiver lane pressure.
5. Try to trigger one of the failure outcomes before month 25.

## Game Model

- Economy condition uses 5 grades (`Terrible`, `Soft`, `Tepid`, `Firm`, `Terrific`) and shifts every 4-6 months.
- Freight lanes are modeled shipper-to-receiver on explicit branch lines and spurs.
- Current network includes six lines:
	- `Timber Branch`
	- `Agri Branch`
	- `Stone Branch`
	- `Oil Spur`
	- `Timber Reload Spur`
	- `Chemical Plant Spur`
- Each month you can choose targeted branch actions: maintain, repair, or abandon.
- Corporate controls now include paired opposites: raise/drop rates, defer/perform system maintenance, lease/return emergency locomotives, and cut/increase crew overtime.
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

## Key Dashboards

- `Company Snapshot`: month, cash, debt, debt service next month, loan rate, covenant limit, months to covenant, moved carloads, and operating condition indicators.
- `Company Cost Ledger`: monthly expenditure breakout plus revenue and operating balance.
- `Observe and Orient`: lane-level demand, moved cars, unserved cars, and service rate.
- `Branch Infrastructure Ledger`: monthly group with branch sub-rows for status, costs, profit, and margin.

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

## Notes

- The game uses native ES modules (`game.js` + `simEngine.js`).
- Styling is in `styles.css`.
- This setup replaces a Python simulator with browser-native JavaScript.
