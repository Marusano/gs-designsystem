<script setup>
import AppNotificationBubble from '../components/ui/AppNotificationBubble.vue'

const IconBell = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const IconMessage = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
</script>

<template>
  <main class="ds-main">

    <!-- ── Title ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Notification Bubble</h1>
      <p class="ds-lead">2 variants · 2 shapes · count overflow at 99+</p>
      <p class="ds-body">
        A compact count indicator placed on top of icons, avatars, or navigation items to signal
        pending notifications or unread items. Two variants adapt to light and dark surfaces.
        The bubble is purely informational — it carries no click target of its own.
      </p>
    </section>

    <!-- ── Types ─────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Types</h2>
      <p class="ds-body">
        Two variants cover the two primary surface contexts. Use <strong>Elevated</strong> on white
        or light-grey backgrounds, and <strong>Flat</strong> on dark fills or image surfaces where
        the light bubble would be invisible.
      </p>
      <div class="ds-types-grid">

        <div class="ds-type-card">
          <div class="ds-type-card__demo">
            <div class="ds-icon-host">
              <span class="ds-icon-svg" v-html="IconBell" />
              <AppNotificationBubble :count="4" variant="elevated" style="position:absolute;top:-6px;right:-8px;" />
            </div>
          </div>
          <div class="ds-type-card__body">
            <p class="ds-type-card__name">Elevated</p>
            <p class="ds-body">Light azure background (<code>blue-azure-20</code>) with dark text. Use on white and light-grey surfaces — the default variant in most contexts.</p>
          </div>
        </div>

        <div class="ds-type-card">
          <div class="ds-type-card__demo ds-type-card__demo--dark">
            <div class="ds-icon-host">
              <span class="ds-icon-svg ds-icon-svg--light" v-html="IconBell" />
              <AppNotificationBubble :count="4" variant="flat" style="position:absolute;top:-6px;right:-8px;" />
            </div>
          </div>
          <div class="ds-type-card__body">
            <p class="ds-type-card__name">Flat</p>
            <p class="ds-body">Dark background (<code>grey-100</code>) with white text. Use on dark navigation bars, image thumbnails, or dark-fill avatars.</p>
          </div>
        </div>

        <div class="ds-type-card">
          <div class="ds-type-card__demo">
            <div class="ds-icon-host">
              <span class="ds-icon-svg" v-html="IconBell" />
              <AppNotificationBubble dot variant="elevated" style="position:absolute;top:-2px;right:-2px;" />
            </div>
          </div>
          <div class="ds-type-card__body">
            <p class="ds-type-card__name">Dot — Elevated</p>
            <p class="ds-body">8 × 8 px dot. Use when the presence of new activity matters but the count does not — e.g. any unread notification without a specific number.</p>
          </div>
        </div>

        <div class="ds-type-card">
          <div class="ds-type-card__demo ds-type-card__demo--dark">
            <div class="ds-icon-host">
              <span class="ds-icon-svg ds-icon-svg--light" v-html="IconBell" />
              <AppNotificationBubble dot variant="flat" style="position:absolute;top:-2px;right:-2px;" />
            </div>
          </div>
          <div class="ds-type-card__body">
            <p class="ds-type-card__name">Dot — Flat</p>
            <p class="ds-body">Dark dot on dark surfaces. Same semantic as Elevated dot, adapted for the dark surface context.</p>
          </div>
        </div>

      </div>
    </section>

    <!-- ── States ────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">States</h2>
      <p class="ds-body">The bubble renders in three count states. Counts above 99 are capped at <strong>99+</strong> to keep the pill width predictable.</p>
      <div class="ds-states-row">
        <div class="ds-state-item">
          <AppNotificationBubble :count="1" variant="elevated" />
          <span class="ds-state-label">Single digit</span>
        </div>
        <div class="ds-state-item">
          <AppNotificationBubble :count="12" variant="elevated" />
          <span class="ds-state-label">Double digit</span>
        </div>
        <div class="ds-state-item">
          <AppNotificationBubble :count="99" variant="elevated" />
          <span class="ds-state-label">Max count</span>
        </div>
        <div class="ds-state-item">
          <AppNotificationBubble :count="142" variant="elevated" />
          <span class="ds-state-label">Over 99 → 99+</span>
        </div>
        <div class="ds-state-item">
          <AppNotificationBubble dot variant="elevated" />
          <span class="ds-state-label">Dot (no count)</span>
        </div>
        <div class="ds-state-item" style="background:var(--grey-90);padding:12px;border-radius:8px;">
          <AppNotificationBubble :count="7" variant="flat" />
          <span class="ds-state-label" style="color:var(--grey-30)">Flat · dark bg</span>
        </div>
      </div>
    </section>

    <!-- ── Usage ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage Examples</h2>
      <p class="ds-body">The bubble is absolutely positioned relative to its parent. Wrap the host icon in a <code>position: relative</code> container, then place the bubble at a negative offset from the top-right corner.</p>
      <div class="ds-card ds-demo-flex">
        <div class="ds-demo-item">
          <div class="ds-icon-host">
            <span class="ds-icon-svg" v-html="IconBell" />
            <AppNotificationBubble :count="3" variant="elevated" style="position:absolute;top:-6px;right:-8px;" />
          </div>
          <span class="ds-state-label">Elevated on icon</span>
        </div>
        <div class="ds-demo-item">
          <div class="ds-icon-host ds-icon-host--dark">
            <span class="ds-icon-svg ds-icon-svg--light" v-html="IconBell" />
            <AppNotificationBubble :count="12" variant="flat" style="position:absolute;top:-6px;right:-8px;" />
          </div>
          <span class="ds-state-label">Flat on dark icon</span>
        </div>
        <div class="ds-demo-item">
          <div class="ds-icon-host">
            <span class="ds-icon-svg" v-html="IconMessage" />
            <AppNotificationBubble dot variant="elevated" style="position:absolute;top:-2px;right:-2px;" />
          </div>
          <span class="ds-state-label">Dot on message</span>
        </div>
        <div class="ds-demo-item">
          <div class="ds-avatar ds-avatar--demo">
            <span>AS</span>
            <AppNotificationBubble :count="5" variant="elevated" style="position:absolute;top:-4px;right:-6px;" />
          </div>
          <span class="ds-state-label">On avatar</span>
        </div>
        <div class="ds-demo-item">
          <div class="ds-avatar ds-avatar--demo ds-avatar--dark">
            <span>RK</span>
            <AppNotificationBubble :count="7" variant="flat" style="position:absolute;top:-4px;right:-6px;" />
          </div>
          <span class="ds-state-label">Flat on dark avatar</span>
        </div>
      </div>
    </section>

    <!-- ── Formatting ────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">
        The bubble is always absolutely positioned at the top-right of its host element using
        negative offsets. The standard offset for a count bubble on a 22–24 px icon is
        <code>top: -6px; right: -8px</code>. Dot indicators use a tighter offset
        (<code>top: -2px; right: -2px</code>) since they are smaller.
      </p>
      <div class="ds-format-table-wrap">
        <table class="ds-format-table">
          <thead>
            <tr><th>Shape</th><th>Min width</th><th>Height</th><th>Border-radius</th><th>Font</th></tr>
          </thead>
          <tbody>
            <tr><td>Count bubble</td><td>24 px</td><td>24 px</td><td>12 px (pill)</td><td>Inter SemiBold 14 px</td></tr>
            <tr><td>Dot</td><td>8 px</td><td>8 px</td><td>50%</td><td>—</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Interaction ────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Interaction</h2>
      <p class="ds-body">
        The notification bubble itself is <strong>non-interactive</strong> — it carries no click target.
        Clicking the host icon (bell, avatar, nav item) opens the notification panel or relevant view.
        The bubble count updates reactively when the underlying unread count changes; it disappears
        automatically when the count reaches zero.
      </p>
      <div class="ds-interaction-cards">
        <div class="ds-interaction-card">
          <span class="ds-ic-title">Show</span>
          <p class="ds-body">Display the bubble whenever the unread count is greater than zero. Never show a bubble with <code>:count="0"</code> — pass a falsy count or omit the component entirely.</p>
        </div>
        <div class="ds-interaction-card">
          <span class="ds-ic-title">Update</span>
          <p class="ds-body">The count prop is reactive. Bind it to a live data source; the bubble re-renders automatically. Do not animate the number change — keep it instant for simplicity.</p>
        </div>
        <div class="ds-interaction-card">
          <span class="ds-ic-title">Dot vs count</span>
          <p class="ds-body">Use <code>dot</code> when you know there is activity but have no count (e.g. "any unread"). Switch to a numeric bubble as soon as a count is available — it is more informative.</p>
        </div>
      </div>
    </section>

    <!-- ── Props ──────────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Props</h2>
      <div class="ds-table-wrap">
        <table class="ds-props-table">
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>variant</code></td>
              <td><code>'elevated' | 'flat'</code></td>
              <td><code>'elevated'</code></td>
              <td>Visual style. Use <code>elevated</code> on light surfaces, <code>flat</code> on dark ones.</td>
            </tr>
            <tr>
              <td><code>count</code></td>
              <td><code>number</code></td>
              <td>—</td>
              <td>The number to display. Values above 99 render as <code>99+</code>.</td>
            </tr>
            <tr>
              <td><code>dot</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Renders an 8 × 8 px dot instead of a count bubble. Overrides <code>count</code>.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Token Reference ────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Token Reference</h2>
      <div class="ds-table-wrap">
        <table class="ds-token-table">
          <thead>
            <tr><th>Token / Property</th><th>Value</th><th>Primitive</th><th>Used for</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Elevated background</td>
              <td><span class="swatch" style="background:var(--blue-azure-20)"></span><code>--blue-azure-20</code></td>
              <td>#d7eff9</td>
              <td>Elevated bubble fill</td>
            </tr>
            <tr>
              <td>Elevated text</td>
              <td><span class="swatch" style="background:var(--grey-90)"></span><code>--grey-90</code></td>
              <td>#36383b</td>
              <td>Elevated count text</td>
            </tr>
            <tr>
              <td>Flat background</td>
              <td><span class="swatch" style="background:var(--grey-100)"></span><code>--grey-100</code></td>
              <td>#1f2124</td>
              <td>Flat bubble fill</td>
            </tr>
            <tr>
              <td>Flat text</td>
              <td><span class="swatch" style="background:var(--grey-00);border:1px solid var(--grey-20)"></span><code>--grey-00</code></td>
              <td>#ffffff</td>
              <td>Flat count text</td>
            </tr>
            <tr>
              <td>Height (count)</td>
              <td>—</td>
              <td>24 px</td>
              <td>Bubble height · min-width matches height</td>
            </tr>
            <tr>
              <td>Border-radius (count)</td>
              <td>—</td>
              <td>12 px</td>
              <td>Pill shape for count bubble</td>
            </tr>
            <tr>
              <td>Dot size</td>
              <td>—</td>
              <td>8 × 8 px</td>
              <td>Width and height of dot variant</td>
            </tr>
            <tr>
              <td>Font</td>
              <td>—</td>
              <td>Inter SemiBold 14 px</td>
              <td>Count number typography</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────── */
.ds-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}
.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1  { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2  { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead { font-size: 16px; color: var(--grey-70); margin-top: -8px; }
.ds-body { font-size: 14px; color: var(--grey-70); line-height: 1.6; }
.ds-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 24px; }

code {
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  font-size: 12px;
  background: var(--grey-10);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--grey-80);
}

/* ── Types grid ──────────────────────────────────────────────── */
.ds-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
.ds-type-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  overflow: hidden;
}
.ds-type-card__demo {
  background: var(--grey-05);
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ds-type-card__demo--dark { background: var(--grey-90); }
.ds-type-card__body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ds-type-card__name { font-size: 14px; font-weight: 600; color: var(--grey-90); }

/* ── Icon host (relative container for bubble) ───────────────── */
.ds-icon-host {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.ds-icon-host--dark {
  background: var(--indigo-100);
  border-radius: 8px;
  padding: 6px;
}
.ds-icon-svg { display: inline-flex; color: var(--grey-70); }
.ds-icon-svg--light { color: var(--grey-00); }

/* ── States row ──────────────────────────────────────────────── */
.ds-states-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 32px;
  padding: 28px 24px;
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
}
.ds-state-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.ds-state-label {
  font-size: 11px;
  color: var(--grey-50);
  white-space: nowrap;
}

/* ── Demo flex (usage examples) ──────────────────────────────── */
.ds-demo-flex { display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-end; }
.ds-demo-item { display: flex; flex-direction: column; align-items: center; gap: 8px; }

/* ── Avatar demo ─────────────────────────────────────────────── */
.ds-avatar--demo {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  background: var(--blue-azure-10);
  color: var(--blue-azure-80);
}
.ds-avatar--demo span { line-height: 1; }
.ds-avatar--demo.ds-avatar--dark { background: var(--indigo-90); color: var(--grey-00); }

/* ── Formatting table ────────────────────────────────────────── */
.ds-format-table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-format-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 13px; }
.ds-format-table thead th {
  background: var(--grey-05);
  border-bottom: 1px solid var(--grey-20);
  padding: 10px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--grey-70);
  white-space: nowrap;
}
.ds-format-table td { padding: 10px 16px; border-bottom: 1px solid var(--grey-10); color: var(--grey-80); }
.ds-format-table tr:last-child td { border-bottom: none; }

/* ── Interaction cards ───────────────────────────────────────── */
.ds-interaction-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.ds-interaction-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ds-ic-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-90);
}

/* ── Props / Token tables ────────────────────────────────────── */
.ds-table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-props-table,
.ds-token-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 13px;
}
.ds-props-table thead th,
.ds-token-table thead th {
  background: var(--grey-05);
  border-bottom: 1px solid var(--grey-20);
  padding: 10px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--grey-70);
  white-space: nowrap;
}
.ds-props-table td,
.ds-token-table td {
  padding: 10px 16px;
  border-bottom: 1px solid var(--grey-10);
  color: var(--grey-80);
  vertical-align: middle;
}
.ds-props-table tr:last-child td,
.ds-token-table tr:last-child td { border-bottom: none; }
.ds-props-table tr:hover td,
.ds-token-table tr:hover td { background: var(--grey-05); }

.swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  vertical-align: middle;
  margin-right: 6px;
  flex-shrink: 0;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .ds-types-grid { grid-template-columns: 1fr; }
  .ds-interaction-cards { grid-template-columns: 1fr; }
}
</style>
