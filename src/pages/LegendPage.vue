<template>
  <main class="ds-main">

    <!-- Title -->
    <section class="ds-section">
      <h1 class="ds-h1">Legend</h1>
      <p class="ds-lead">Color-coded status and activity indicators used in timelines and charts</p>
      <p class="ds-body">Legend items communicate the meaning of colors and symbols used in data visualisations, schedules, and timeline views. Each item pairs a visual marker with a label to help users identify categories at a glance.</p>
    </section>

    <!-- Component preview -->
    <section class="ds-section">
      <h2 class="ds-h2">Overview</h2>
      <div class="lg-preview">
        <div class="lg-strip">
          <div class="lg-item">
            <span class="lg-dot lg-dot--normal"></span>
            <span class="lg-label">normal</span>
          </div>
          <div class="lg-item">
            <span class="lg-dot lg-dot--moderate"></span>
            <span class="lg-label">moderate</span>
          </div>
          <div class="lg-item">
            <span class="lg-dot lg-dot--critical"></span>
            <span class="lg-label">critical</span>
          </div>
        </div>
        <div class="lg-strip">
          <div class="lg-item">
            <span class="lg-dash"></span>
            <span class="lg-label">work</span>
          </div>
          <div class="lg-item">
            <span class="lg-dot lg-dot--drive"></span>
            <span class="lg-label">drive</span>
          </div>
          <div class="lg-item">
            <span class="lg-dot lg-dot--other-work"></span>
            <span class="lg-label">other work</span>
          </div>
          <div class="lg-item">
            <span class="lg-dot lg-dot--rest"></span>
            <span class="lg-label">rest</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Usage -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage</h2>
      <div class="ds-usage-grid">
        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Do</p>
          <ul class="ds-usage-list">
            <li>Copy to be added.</li>
          </ul>
        </div>
        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Don't</p>
          <ul class="ds-usage-list">
            <li>Copy to be added.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Formatting -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">Copy to be added.</p>
    </section>

    <!-- Interaction -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction</h2>
      <p class="ds-body">Copy to be added.</p>
    </section>

    <!-- Tokens -->
    <section class="ds-section">
      <h2 class="ds-h2">Tokens</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Marker</th>
              <th>Color</th>
              <th>CSS variable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Normal</td>
              <td><span class="lg-dot lg-dot--normal"></span></td>
              <td>#d1fae5</td>
              <td><code>—</code></td>
            </tr>
            <tr>
              <td>Moderate</td>
              <td><span class="lg-dot lg-dot--moderate"></span></td>
              <td>#fef3c7</td>
              <td><code>—</code></td>
            </tr>
            <tr>
              <td>Critical</td>
              <td><span class="lg-dot lg-dot--critical"></span></td>
              <td>#fee2e2</td>
              <td><code>--red-20</code></td>
            </tr>
            <tr>
              <td>Work</td>
              <td><span class="lg-dash"></span></td>
              <td>#1f2124</td>
              <td><code>--grey-100</code></td>
            </tr>
            <tr>
              <td>Drive</td>
              <td><span class="lg-dot lg-dot--drive"></span></td>
              <td>#247a31</td>
              <td><code>--green-90</code></td>
            </tr>
            <tr>
              <td>Other work</td>
              <td><span class="lg-dot lg-dot--other-work"></span></td>
              <td>#e0d7f8</td>
              <td><code>—</code></td>
            </tr>
            <tr>
              <td>Rest</td>
              <td><span class="lg-dot lg-dot--rest"></span></td>
              <td>#e6e6e7</td>
              <td><code>--grey-20</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>
</template>

<style scoped>
.ds-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1      { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2      { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead    { font-size: 16px; color: var(--grey-70); margin-top: -8px; }
.ds-body    { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

/* Legend preview */
.lg-preview {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  background: var(--grey-10);
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 16px 20px;
  border-style: dashed;
}

.lg-strip {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.lg-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.lg-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.lg-dot--normal     { background: #d1fae5; }
.lg-dot--moderate   { background: #fef3c7; }
.lg-dot--critical   { background: var(--red-20); }
.lg-dot--drive      { background: #247a31; }
.lg-dot--other-work { background: #e0d7f8; }
.lg-dot--rest       { background: #e6e6e7; }

.lg-dash {
  display: inline-block;
  width: 12px;
  height: 2px;
  background: #1f2124;
  border-radius: 1px;
  flex-shrink: 0;
}

.lg-label {
  font-size: 13px;
  color: var(--grey-80);
}

/* Usage cards */
.ds-usage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-usage-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 20px; padding-top: 0; overflow: hidden; }
.ds-usage-card--do   { border-top: 3px solid var(--green-60); }
.ds-usage-card--dont { border-top: 3px solid var(--red-60); }
.ds-usage-card__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 12px; padding-top: 16px; }
.ds-usage-card__label--do   { color: var(--green-90); }
.ds-usage-card__label--dont { color: var(--red-70); }
.ds-usage-list { padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
.ds-usage-list li { font-size: 13px; color: var(--grey-80); line-height: 1.5; padding-left: 14px; position: relative; }
.ds-usage-list li::before { content: '·'; position: absolute; left: 0; color: var(--grey-50); }

/* Guide table (tokens) */
.ds-table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-guide-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 13px; }
.ds-guide-table thead th { background: var(--grey-05); border-bottom: 1px solid var(--grey-20); padding: 10px 16px; text-align: left; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); white-space: nowrap; }
.ds-guide-table tbody td { padding: 12px 16px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; color: var(--grey-80); font-size: 13px; line-height: 1.5; }
.ds-guide-table tbody tr:last-child td { border-bottom: none; }
.ds-guide-table code { font-size: 11px; font-family: 'SFMono-Regular', 'Consolas', monospace; color: var(--grey-80); background: var(--grey-05); padding: 2px 5px; border-radius: 3px; }

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-usage-grid { grid-template-columns: 1fr; }
}
</style>
