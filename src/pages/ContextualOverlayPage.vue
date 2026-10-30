<script setup>
import AppContextualOverlay from '../components/ui/AppContextualOverlay.vue'
import AppButton            from '../components/ui/AppButton.vue'
</script>

<template>
  <main class="ds-main">

    <!-- ── Header ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h1 class="ds-h1">Contextual Overlay</h1>
      <p class="ds-lead">4 types · 2 sizes · 8 statuses · optional actions</p>
      <p class="ds-body">
        Contextual overlays appear on the map view, anchored to a vehicle, driver, or trip marker.
        They show real-time status and key telemetry at a glance, with optional quick-action
        buttons in the footer. Two sizes accommodate different map zoom levels and screen densities.
      </p>
    </section>

    <!-- ── Component Usage ─────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Component usage</h2>
      <p class="ds-body">
        Use the <code>type</code>, <code>size</code>, and <code>status</code> props to control the
        outer shell. The header title, subtitle, and status tag are rendered automatically.
        Place data rows in <code>#body</code>, supporting sections in <code>#section</code>, and
        action buttons in <code>#footer</code>.
      </p>

      <!-- Live demo — plain md with footer -->
      <div class="co-demo-row">
        <AppContextualOverlay
          type="plain"
          size="md"
          title="Title"
          subtitle="subtitle 1"
          subtitle2="subtitle 2"
        >
          <template #footer>
            <AppButton variant="quiet" size="sm">Button label</AppButton>
            <AppButton variant="quiet" size="sm">Button label</AppButton>
          </template>
        </AppContextualOverlay>
      </div>

      <!-- Code snippet -->
      <div class="ds-code-block">
        <pre><code>&lt;!-- Plain overlay with footer actions --&gt;
&lt;AppContextualOverlay
  type="plain"
  size="md"
  title="Title"
  subtitle="subtitle 1"
  subtitle2="subtitle 2"
&gt;
  &lt;template #footer&gt;
    &lt;AppButton variant="quiet" size="sm"&gt;Button label&lt;/AppButton&gt;
    &lt;AppButton variant="quiet" size="sm"&gt;Button label&lt;/AppButton&gt;
  &lt;/template&gt;
&lt;/AppContextualOverlay&gt;

&lt;!-- Asset overlay on map (sm, driving) --&gt;
&lt;AppContextualOverlay
  type="asset"
  size="sm"
  status="asset-driving"
  title="Driving"
  subtitle="Elisabeth B. Keen"
&gt;
  &lt;template #body&gt;
    &lt;div class="co-data-row"&gt;
      &lt;span class="co-data-label"&gt;Duration&lt;/span&gt;
      &lt;span class="co-data-value"&gt;3h 30min&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  &lt;template #footer&gt;
    &lt;AppButton variant="quiet" size="xs"&gt;Go to driver&lt;/AppButton&gt;
  &lt;/template&gt;
&lt;/AppContextualOverlay&gt;</code></pre>
      </div>

      <!-- Do / Don't -->
      <div class="ds-usage-grid">
        <div class="ds-usage-card ds-usage-card--do">
          <p class="ds-usage-card__label ds-usage-card__label--do">Do</p>
          <ul class="ds-usage-list">
            <li>Use <code>size="sm"</code> for map pin overlays and <code>size="md"</code> for sidebar or expanded panels</li>
            <li>Keep data rows to 3–5 items — overlays are glanceable, not detailed reports</li>
            <li>Match <code>status</code> to the live entity state so the header color is informative</li>
            <li>Limit footer to 2 action buttons maximum</li>
          </ul>
        </div>
        <div class="ds-usage-card ds-usage-card--dont">
          <p class="ds-usage-card__label ds-usage-card__label--dont">Don't</p>
          <ul class="ds-usage-list">
            <li>Don't mix data types — asset overlays show vehicle data, driver overlays show activity data</li>
            <li>Don't omit the <code>status</code> prop for asset/driver types — the header color carries meaning</li>
            <li>Don't use <code>type="plain"</code> with a status that implies entity context (asset-driving, asset-idling…)</li>
            <li>Don't place form inputs inside overlays — they're display-only components</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── Variants: Asset md ─────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Asset — md (fleet view)</h2>
      <p class="ds-body">
        Used in fleet management screens. The <code>md</code> size (341 px) shows full driver info,
        telemetry, and contextual severity alerts. The <code>#section</code> slot carries the grey
        data section; use it for structured key-value blocks between body and footer.
      </p>

      <div class="co-variants-row">

        <!-- Collapsed fleet (no section-detail → no chevron) -->
        <div class="co-variant">
          <p class="co-variant__label">Collapsed — fleet</p>
          <AppContextualOverlay
            type="asset"
            size="md"
            status="asset-driving"
            title="The blue truck"
            subtitle="DK 124 24 / Truck"
            subtitle2="Tamperebe"
          >
            <template #section>
              <div class="co-data-point">
                <span class="co-data-point__label">Current driver</span>
                <span class="co-data-point__value">Elisabeth B. Keen</span>
              </div>
            </template>
            <template #section-tag>
              <div class="co-section__tag">Driving</div>
            </template>
            <template #footer>
              <AppButton variant="quiet" size="sm">Go to asset</AppButton>
              <AppButton variant="quiet" size="sm">Follow asset</AppButton>
            </template>
          </AppContextualOverlay>
        </div>

        <!-- Expandable fleet (chevron toggles remaining times) -->
        <div class="co-variant">
          <p class="co-variant__label">Expanded — fleet</p>
          <AppContextualOverlay
            type="asset"
            size="md"
            status="asset-driving"
            title="The blue truck"
            subtitle="DK 124 24 / Truck"
            subtitle2="Current location"
          >
            <template #section>
              <div class="co-data-point">
                <span class="co-data-point__label">Current driver</span>
                <span class="co-data-point__value">Name Surname Here</span>
              </div>
            </template>
            <template #section-tag>
              <div class="co-section__tag">Driving</div>
            </template>
            <template #section-detail>
              <div class="co-severity co-severity--neutral">
                <span class="co-severity__label">Remaining drive time</span>
                <span class="co-severity__value">48:45</span>
              </div>
              <div class="co-severity co-severity--neutral">
                <span class="co-severity__label">Until next 15min break</span>
                <span class="co-severity__value">00:45</span>
              </div>
            </template>
            <template #footer>
              <AppButton variant="quiet" size="sm">Go to asset</AppButton>
              <AppButton variant="quiet" size="sm">Locate asset</AppButton>
            </template>
          </AppContextualOverlay>
        </div>

        <!-- Expandable fleet warning -->
        <div class="co-variant">
          <p class="co-variant__label">Expanded — fleet warning</p>
          <AppContextualOverlay
            type="asset"
            size="md"
            status="asset-driving"
            title="The blue truck"
            subtitle="DK 124 24 / Truck"
            subtitle2="Current location"
          >
            <template #section>
              <div class="co-data-point">
                <span class="co-data-point__label">Current driver</span>
                <span class="co-data-point__value">Name Surname Here</span>
              </div>
            </template>
            <template #section-tag>
              <div class="co-section__tag">Driving</div>
            </template>
            <template #section-detail>
              <div class="co-severity co-severity--neutral">
                <span class="co-severity__label">Until next break</span>
                <span class="co-severity__value">00:15</span>
              </div>
              <div class="co-severity co-severity--warning">
                <span class="co-severity__label">Until next 15min break</span>
                <span class="co-severity__value co-severity__value--warning">00:45</span>
              </div>
              <div class="co-severity co-severity--danger">
                <span class="co-severity__label">Remaining drive time</span>
                <span class="co-severity__value co-severity__value--danger">48:45</span>
              </div>
            </template>
            <template #footer>
              <AppButton variant="quiet" size="sm">Go to asset</AppButton>
              <AppButton variant="quiet" size="sm">Locate asset</AppButton>
            </template>
          </AppContextualOverlay>
        </div>

      </div>
    </section>

    <!-- ── Variants: Plain md ─────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Plain — md</h2>
      <p class="ds-body">
        A neutral overlay with no status context — use for generic tooltips, POI labels,
        or map annotations that do not represent a tracked entity.
      </p>

      <div class="co-variants-row">
        <div class="co-variant">
          <p class="co-variant__label">With actions</p>
          <AppContextualOverlay type="plain" size="md" title="Title" subtitle="subtitle 1" subtitle2="subtitle 2">
            <template #footer>
              <AppButton variant="quiet" size="sm">Button label</AppButton>
              <AppButton variant="quiet" size="sm">Button label</AppButton>
            </template>
          </AppContextualOverlay>
        </div>
        <div class="co-variant">
          <p class="co-variant__label">Without actions</p>
          <AppContextualOverlay type="plain" size="md" title="Title" subtitle="subtitle 1" subtitle2="subtitle 2" />
        </div>
      </div>
    </section>

    <!-- ── Variants: Driver sm ────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Driver — sm (with actions)</h2>
      <p class="ds-body">
        Compact 232 px wide overlays anchored to driver markers on the map. The header background
        reflects the driver's current activity status.
      </p>

      <div class="co-variants-row co-variants-row--wrap">

        <div class="co-variant">
          <p class="co-variant__label">Driving</p>
          <AppContextualOverlay type="driver" size="sm" status="driver-driving" title="Driving" subtitle="The blue truck #12">
            <template #body>
              <div class="co-data-row"><span class="co-data-label">Duration</span><span class="co-data-value">3h 30min</span></div>
              <div class="co-data-row"><span class="co-data-label">Start time</span><span class="co-data-value">09:00:15</span></div>
              <div class="co-data-row"><span class="co-data-label">End time</span><span class="co-data-value">12:00:15</span></div>
            </template>
            <template #footer>
              <AppButton variant="quiet" size="xs">Action here</AppButton>
            </template>
          </AppContextualOverlay>
        </div>

        <div class="co-variant">
          <p class="co-variant__label">Resting</p>
          <AppContextualOverlay type="driver" size="sm" status="driver-rest" title="Resting" subtitle="The blue truck #12">
            <template #body>
              <div class="co-data-row"><span class="co-data-label">Duration</span><span class="co-data-value">3h 30min</span></div>
              <div class="co-data-row"><span class="co-data-label">Start time</span><span class="co-data-value">09:00:15</span></div>
              <div class="co-data-row"><span class="co-data-label">End time</span><span class="co-data-value">12:00:15</span></div>
            </template>
            <template #footer>
              <AppButton variant="quiet" size="xs">Action here</AppButton>
            </template>
          </AppContextualOverlay>
        </div>

        <div class="co-variant">
          <p class="co-variant__label">Other work</p>
          <AppContextualOverlay type="driver" size="sm" status="driver-otherwork" title="Other work" subtitle="The blue truck #12">
            <template #body>
              <div class="co-data-row"><span class="co-data-label">Duration</span><span class="co-data-value">3h 30min</span></div>
              <div class="co-data-row"><span class="co-data-label">Start time</span><span class="co-data-value">09:00:15</span></div>
              <div class="co-data-row"><span class="co-data-label">End time</span><span class="co-data-value">12:00:15</span></div>
            </template>
            <template #footer>
              <AppButton variant="quiet" size="xs">Action here</AppButton>
            </template>
          </AppContextualOverlay>
        </div>

      </div>
    </section>

    <!-- ── Variants: Asset sm ─────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Asset — sm (all statuses)</h2>
      <p class="ds-body">
        Asset overlays on the map show the vehicle name and current status. The data body shows
        time-on-status and time bounds. Driving additionally shows distance, fuel, and speed.
      </p>

      <div class="co-variants-row co-variants-row--wrap">

        <div class="co-variant">
          <p class="co-variant__label">Driving</p>
          <AppContextualOverlay type="asset" size="sm" status="asset-driving" title="Driving" subtitle="Elisabeth B. Keen">
            <template #body>
              <div class="co-data-row"><span class="co-data-label">Duration</span><span class="co-data-value">3h 30min</span></div>
              <div class="co-data-row"><span class="co-data-label">Start time</span><span class="co-data-value">09:00:15</span></div>
              <div class="co-data-row"><span class="co-data-label">End time</span><span class="co-data-value">12:00:15</span></div>
              <div class="co-data-row"><span class="co-data-label">Distance</span><span class="co-data-value">167km</span></div>
              <div class="co-data-row"><span class="co-data-label">Fuel consumption</span><span class="co-data-value">123l/100km</span></div>
              <div class="co-data-row"><span class="co-data-label">Speed</span><span class="co-data-value">24km/h</span></div>
            </template>
            <template #footer>
              <AppButton variant="quiet" size="xs">Go to driver</AppButton>
            </template>
          </AppContextualOverlay>
        </div>

        <div class="co-variant">
          <p class="co-variant__label">Idling</p>
          <AppContextualOverlay type="asset" size="sm" status="asset-idling" title="Idling" subtitle="The blue truck">
            <template #body>
              <div class="co-data-row"><span class="co-data-label">Duration</span><span class="co-data-value">15min</span></div>
              <div class="co-data-row"><span class="co-data-label">Start time</span><span class="co-data-value">09:00:15</span></div>
              <div class="co-data-row"><span class="co-data-label">End time</span><span class="co-data-value">09:15:00</span></div>
            </template>
            <template #footer>
              <AppButton variant="quiet" size="xs">Go to asset</AppButton>
            </template>
          </AppContextualOverlay>
        </div>

        <div class="co-variant">
          <p class="co-variant__label">Engine off</p>
          <AppContextualOverlay type="asset" size="sm" status="asset-engineoff" title="Engine off" subtitle="The blue truck">
            <template #body>
              <div class="co-data-row"><span class="co-data-label">Duration</span><span class="co-data-value">45min</span></div>
              <div class="co-data-row"><span class="co-data-label">Start time</span><span class="co-data-value">09:00:15</span></div>
              <div class="co-data-row"><span class="co-data-label">End time</span><span class="co-data-value">09:15:00</span></div>
            </template>
            <template #footer>
              <AppButton variant="quiet" size="xs">Go to asset</AppButton>
            </template>
          </AppContextualOverlay>
        </div>

        <div class="co-variant">
          <p class="co-variant__label">Parked</p>
          <AppContextualOverlay type="asset" size="sm" status="asset-parking" title="Parked" subtitle="The blue truck">
            <template #body>
              <div class="co-data-row"><span class="co-data-label">Duration</span><span class="co-data-value">15min</span></div>
              <div class="co-data-row"><span class="co-data-label">Start time</span><span class="co-data-value">09:00:15</span></div>
              <div class="co-data-row"><span class="co-data-label">End time</span><span class="co-data-value">09:15:00</span></div>
            </template>
            <template #footer>
              <AppButton variant="quiet" size="xs">Go to asset</AppButton>
            </template>
          </AppContextualOverlay>
        </div>

      </div>
    </section>

    <!-- ── Status header colors ───────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Status header colors</h2>
      <p class="ds-body">
        The <code>status</code> prop drives both the header background and the auto-rendered
        status tag. Override the tag via the <code>#header-right</code> slot when needed.
      </p>

      <div class="co-status-grid">
        <div v-for="s in ['driver-driving','asset-driving','asset-idling','asset-parking','asset-engineoff','driver-rest','driver-otherwork','main']" :key="s" class="co-status-item">
          <p class="co-variant__label">{{ s }}</p>
          <AppContextualOverlay
            :type="s === 'main' ? 'plain' : s.startsWith('driver-') ? 'driver' : 'asset'"
            size="sm"
            :status="s"
            :title="s === 'main' ? 'Title' : s.replace(/^(driver|asset)-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())"
            subtitle="The blue truck"
          />
        </div>
      </div>
    </section>

    <!-- ── Props ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Props</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>type</code></td>
              <td><code>'plain' | 'asset' | 'driver' | 'trip'</code></td>
              <td><code>'plain'</code></td>
              <td>Entity type. Affects which status values make sense and whether a status tag is rendered.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'md' | 'sm'</code></td>
              <td><code>'md'</code></td>
              <td><code>md</code> = 341 px (sidebar / expanded panel). <code>sm</code> = 232 px (map pin tooltip).</td>
            </tr>
            <tr>
              <td><code>status</code></td>
              <td><code>'main' | 'driver-driving' | 'driver-rest' | 'driver-otherwork' | 'asset-driving' | 'asset-idling' | 'asset-engineoff' | 'asset-parking'</code></td>
              <td><code>'main'</code></td>
              <td>Current entity status. Drives the header background color and auto-rendered status tag.</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>String</code></td>
              <td><code>''</code></td>
              <td>Primary header line — vehicle name, driver name, or overlay title.</td>
            </tr>
            <tr>
              <td><code>subtitle</code></td>
              <td><code>String</code></td>
              <td><code>''</code></td>
              <td>Secondary header line — plate number/type, or contextual label.</td>
            </tr>
            <tr>
              <td><code>subtitle2</code></td>
              <td><code>String</code></td>
              <td><code>''</code></td>
              <td>Third header line (<code>md</code> size only) — e.g. current location string.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Slots ───────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Slots</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Slot</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>#header-right</code></td>
              <td>Overrides the auto-rendered status tag. Use when you need a custom action widget or badge on the right side of the header.</td>
            </tr>
            <tr>
              <td><code>#body</code></td>
              <td>Main content area (white bg, 12 px side padding). Use for data rows, condensed key-value lists, or driver info blocks.</td>
            </tr>
            <tr>
              <td><code>#section</code></td>
              <td>Additional section between body and footer — no automatic background or padding applied. Use a <code>.co-section</code> wrapper for the grey fleet section.</td>
            </tr>
            <tr>
              <td><code>#footer</code></td>
              <td>Action buttons (white bg, 12 px side padding, 4 px top/bottom). Use <code>&lt;AppButton variant="quiet" size="sm"&gt;</code> (md overlay) or <code>&lt;AppButton variant="quiet" size="xs"&gt;</code> (sm overlay). Maximum 2 buttons.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Tokens ──────────────────────────────────────────── -->
    <section class="ds-section">
      <h2 class="ds-h2">Tokens</h2>
      <div class="ds-table-wrap">
        <table class="ds-guide-table">
          <thead>
            <tr><th>Element</th><th>Property</th><th>Token</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td>Container</td><td>Width (md)</td><td>—</td><td>341 px</td></tr>
            <tr><td>Container</td><td>Width (sm)</td><td>—</td><td>232 px</td></tr>
            <tr><td>Container</td><td>Border radius</td><td>—</td><td>4 px</td></tr>
            <tr><td>Container</td><td>Drop shadow</td><td>—</td><td>0 4px 7.5px rgba(0,0,0,0.25)</td></tr>
            <tr><td>Header (driver-driving / asset-driving)</td><td>Background</td><td><code>--green-10</code></td><td>#f1fcf2</td></tr>
            <tr><td>Header (asset-idling)</td><td>Background</td><td><code>--blue-azure-10</code></td><td>#e8f6ff</td></tr>
            <tr><td>Header (asset-parking)</td><td>Background</td><td><code>--blue-azure-20</code></td><td>#d7eff9</td></tr>
            <tr><td>Header (asset-engineoff)</td><td>Background</td><td><code>--grey-05</code></td><td>#f7f7f8</td></tr>
            <tr><td>Header (driver-rest)</td><td>Background</td><td><code>--grey-10</code></td><td>#f1f1f2</td></tr>
            <tr><td>Header (driver-otherwork)</td><td>Background</td><td><code>--indigo-10</code></td><td>#f1ecff</td></tr>
            <tr><td>Status tag (driving)</td><td>Background</td><td><code>--green-90</code></td><td>#247a31</td></tr>
            <tr><td>Status tag (asset-idling)</td><td>Background</td><td><code>--blue-azure-90</code></td><td>#075985</td></tr>
            <tr><td>Status tag (driver-otherwork)</td><td>Background</td><td><code>--indigo-20</code></td><td>#e4daff</td></tr>
            <tr><td>Divider</td><td>Color</td><td><code>--grey-20</code></td><td>#e6e6e7</td></tr>
            <tr><td>Title</td><td>Font size (md)</td><td>—</td><td>14 px / 500</td></tr>
            <tr><td>Title</td><td>Font size (sm)</td><td>—</td><td>12 px / 500</td></tr>
            <tr><td>Subtitle</td><td>Color</td><td><code>--grey-70</code></td><td>#6f7176</td></tr>
            <tr><td>Severity (warning)</td><td>Background</td><td><code>--yellow-20</code></td><td>#ffeec7</td></tr>
            <tr><td>Severity (danger)</td><td>Background</td><td><code>--red-20</code></td><td>#fee2e2</td></tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>
</template>

<style scoped>
.ds-main    { max-width: none; margin: 0; padding: 48px 40px 80px; display: flex; flex-direction: column; gap: 56px; }
.ds-section { display: flex; flex-direction: column; gap: 20px; }
.ds-h1      { font-size: 32px; font-weight: 700; color: var(--grey-100); line-height: 1.1; margin-bottom: 4px; }
.ds-h2      { font-size: 20px; font-weight: 600; color: var(--grey-90); }
.ds-lead    { font-size: 16px; color: var(--grey-70); font-weight: 400; }
.ds-body    { font-size: 14px; color: var(--grey-70); line-height: 1.6; }

@media (max-width: 768px) { .ds-main { padding: 32px 20px 60px; } }

/* Demo rows */
.co-demo-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.co-variants-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 4px;
}

.co-variants-row--wrap { flex-wrap: wrap; }

.co-variant {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.co-variant__label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-50);
  margin: 0;
}

/* Status grid */
.co-status-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
}

.co-status-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

/* Data rows (used inside #body slot) */
.co-data-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.25px;
  font-family: 'Inter', sans-serif;
}

.co-data-label { color: var(--grey-70); flex: 1; }
.co-data-value { color: var(--grey-90); white-space: nowrap; }

/* Data point (2-line label + value) */
.co-data-point {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.co-data-point__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--grey-70);
  letter-spacing: 0.25px;
  font-family: 'Inter', sans-serif;
}
.co-data-point__value {
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-90);
  font-family: 'Inter', sans-serif;
}

/* Section slot helper classes */
.co-section__tag {
  background: var(--green-90);
  color: var(--green-10);
  font-size: 12px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  padding: 4px 6px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Severity rows */
.co-severity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
}

.co-severity--neutral  { background: var(--grey-10); }
.co-severity--warning  { background: var(--yellow-20); }
.co-severity--danger   { background: var(--red-20); }

.co-severity__label {
  font-weight: 500;
  color: var(--grey-70);
  letter-spacing: 0.25px;
  flex: 1;
}

.co-severity__value {
  font-weight: 500;
  color: var(--grey-90);
  white-space: nowrap;
}

.co-severity__value--warning { color: var(--yellow-100); }
.co-severity__value--danger  { color: var(--red-80); }

/* Code block */
.ds-code-block {
  background: var(--grey-05);
  border: 1px solid var(--grey-20);
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
}
.ds-code-block pre { margin: 0; }
.ds-code-block code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  color: var(--grey-90);
  line-height: 1.6;
}

/* Do / Don't */
.ds-usage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 640px) { .ds-usage-grid { grid-template-columns: 1fr; } }

.ds-usage-card {
  padding: 16px 20px;
  border-radius: 6px;
  background: var(--grey-00);
  box-shadow: inset 0 0 0 1px var(--grey-20);
}
.ds-usage-card--do   { box-shadow: inset 0 0 0 1px var(--green-60); }
.ds-usage-card--dont { box-shadow: inset 0 0 0 1px var(--red-60); }

.ds-usage-card__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin: 0 0 10px;
}
.ds-usage-card__label--do   { color: var(--green-90); }
.ds-usage-card__label--dont { color: var(--red-70); }

.ds-usage-list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ds-usage-list li {
  font-size: 13px;
  color: var(--grey-70);
  line-height: 1.5;
}

/* Tables */
.ds-table-wrap { overflow-x: auto; }
.ds-guide-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.ds-guide-table th {
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey-60);
  padding: 10px 12px;
  border-bottom: 1px solid var(--grey-20);
  background: var(--grey-05);
}
.ds-guide-table td {
  padding: 10px 12px;
  color: var(--grey-80);
  border-bottom: 1px solid var(--grey-10);
  line-height: 1.45;
  vertical-align: top;
}
.ds-guide-table tr:last-child td { border-bottom: none; }
.ds-guide-table tr:hover td { background: var(--grey-05); }
.ds-guide-table code {
  font-size: 11px;
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  color: var(--grey-80);
  background: var(--grey-05);
  padding: 2px 5px;
  border-radius: 3px;
}
</style>
