<script setup>
// no reactive state needed
</script>

<template>
  <main class="ds-main">

    <!-- Header -->
    <section class="ds-section">
      <h1 class="ds-h1">Breadcrumb</h1>
      <p class="ds-lead">Secondary navigation · shows location in hierarchy</p>
      <p class="ds-body">
        The breadcrumb is a secondary navigation pattern. It shows users their current location
        relative to the information architecture and enable them to quickly move up to a parent
        level or previous step.
      </p>
    </section>

    <!-- Formatting / Anatomy -->
    <section class="ds-section">
      <h2 class="ds-h2">Formatting</h2>
      <p class="ds-body">A breadcrumb trail is made up of three elements: main links, separators, and the current-page item.</p>

      <div class="bc-anatomy-card">
        <!-- Annotated breadcrumb -->
        <div class="bc-example-row">
          <nav class="bc-nav" aria-label="Breadcrumb">
            <ol class="bc-list">
              <li class="bc-item">
                <a href="#" class="bc-link" @click.prevent>Home</a>
              </li>
              <li class="bc-sep" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </li>
              <li class="bc-item">
                <a href="#" class="bc-link" @click.prevent>Previous level</a>
              </li>
              <li class="bc-sep" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </li>
              <li class="bc-item">
                <span class="bc-current" aria-current="page">Current page</span>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Anatomy labels -->
        <div class="bc-anatomy-labels">
          <div class="bc-anatomy-label">
            <span class="bc-anatomy-badge bc-anatomy-badge--main">1</span>
            <div>
              <strong>1st level breadcrumb ("main")</strong>
              <p>Directs users to the parent-level page (or previous page)</p>
            </div>
          </div>
          <div class="bc-anatomy-label">
            <span class="bc-anatomy-badge bc-anatomy-badge--sep">2</span>
            <div>
              <strong>Separator</strong>
              <p>Clearly distinguishes between each page</p>
            </div>
          </div>
          <div class="bc-anatomy-label">
            <span class="bc-anatomy-badge bc-anatomy-badge--current">3</span>
            <div>
              <strong>2nd+ level breadcrumb ("current")</strong>
              <p>2nd level of page user is at right now</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- States -->
    <section class="ds-section">
      <h2 class="ds-h2">States</h2>
      <div class="ds-table-wrap">
        <table class="ds-state-table">
          <thead>
            <tr>
              <th class="ds-state-table__label">State</th>
              <th>Preview</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ds-state-table__label"><strong>Default</strong></td>
              <td>
                <nav class="bc-nav" aria-label="Breadcrumb">
                  <ol class="bc-list">
                    <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Settings</a></li>
                    <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
                    <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Users</a></li>
                    <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
                    <li class="bc-item"><span class="bc-current" aria-current="page">Elisabeth B. Keen</span></li>
                  </ol>
                </nav>
              </td>
              <td class="ds-state-table__desc">Normal resting state. Links are muted; current page is unlinked.</td>
            </tr>
            <tr>
              <td class="ds-state-table__label"><strong>Hover</strong></td>
              <td>
                <nav class="bc-nav" aria-label="Breadcrumb">
                  <ol class="bc-list">
                    <li class="bc-item"><a href="#" class="bc-link bc-link--hover" @click.prevent>Settings</a></li>
                    <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
                    <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Users</a></li>
                    <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
                    <li class="bc-item"><span class="bc-current" aria-current="page">Elisabeth B. Keen</span></li>
                  </ol>
                </nav>
              </td>
              <td class="ds-state-table__desc">Underline appears on the hovered link; colour shifts to primary text.</td>
            </tr>
            <tr>
              <td class="ds-state-table__label"><strong>Focus</strong></td>
              <td>
                <nav class="bc-nav" aria-label="Breadcrumb">
                  <ol class="bc-list">
                    <li class="bc-item"><a href="#" class="bc-link bc-link--focus" @click.prevent>Settings</a></li>
                    <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
                    <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Users</a></li>
                    <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
                    <li class="bc-item"><span class="bc-current" aria-current="page">Elisabeth B. Keen</span></li>
                  </ol>
                </nav>
              </td>
              <td class="ds-state-table__desc">Keyboard focus ring around the active link. Triggered by Tab.</td>
            </tr>
            <tr>
              <td class="ds-state-table__label"><strong>Current</strong></td>
              <td>
                <nav class="bc-nav" aria-label="Breadcrumb">
                  <ol class="bc-list">
                    <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Settings</a></li>
                    <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
                    <li class="bc-item"><span class="bc-current" aria-current="page">Current page</span></li>
                  </ol>
                </nav>
              </td>
              <td class="ds-state-table__desc">Last item — never a link. Uses <code>aria-current="page"</code>.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Variants / examples -->
    <section class="ds-section">
      <h2 class="ds-h2">Examples</h2>
      <div class="ds-card">

        <div class="bc-example-group">
          <p class="bc-example-label">Two levels</p>
          <nav class="bc-nav" aria-label="Breadcrumb">
            <ol class="bc-list">
              <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Home</a></li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><span class="bc-current" aria-current="page">Current breadcrumb</span></li>
            </ol>
          </nav>
        </div>

        <div class="bc-example-group">
          <p class="bc-example-label">Three levels</p>
          <nav class="bc-nav" aria-label="Breadcrumb">
            <ol class="bc-list">
              <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Home</a></li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Previous level</a></li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><span class="bc-current" aria-current="page">Current breadcrumb</span></li>
            </ol>
          </nav>
        </div>

        <div class="bc-example-group">
          <p class="bc-example-label">Four levels</p>
          <nav class="bc-nav" aria-label="Breadcrumb">
            <ol class="bc-list">
              <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Home</a></li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Level two</a></li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Previous level</a></li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><span class="bc-current" aria-current="page">Current breadcrumb</span></li>
            </ol>
          </nav>
        </div>

        <div class="bc-example-group">
          <p class="bc-example-label">Fleet context example</p>
          <nav class="bc-nav" aria-label="Breadcrumb">
            <ol class="bc-list">
              <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Settings</a></li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Users</a></li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><span class="bc-current" aria-current="page">Elisabeth B. Keen</span></li>
            </ol>
          </nav>
        </div>

      </div>
    </section>

    <!-- Truncating -->
    <section class="ds-section">
      <h2 class="ds-h2">Truncating</h2>
      <p class="ds-body">
        For most use cases at larger breakpoints, keep the first home breadcrumb link for as long as possible,
        even when an overflow might be present. Also for mobile or small viewpoints, start with the overflow
        first, followed by one breadcrumb.
      </p>
      <div class="ds-card bc-truncate-demo">

        <div class="bc-example-group">
          <p class="bc-example-label">Desktop — overflow collapses middle levels</p>
          <nav class="bc-nav" aria-label="Breadcrumb">
            <ol class="bc-list">
              <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Home</a></li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item">
                <button class="bc-overflow-btn" title="Show hidden levels" @click.prevent>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="8" r="1.25"/><circle cx="8" cy="8" r="1.25"/><circle cx="12" cy="8" r="1.25"/></svg>
                </button>
              </li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><a href="#" class="bc-link" @click.prevent>Previous level</a></li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><span class="bc-current" aria-current="page">Current breadcrumb</span></li>
            </ol>
          </nav>
        </div>

        <div class="bc-example-group">
          <p class="bc-example-label">Mobile — overflow first, then one level</p>
          <nav class="bc-nav" aria-label="Breadcrumb">
            <ol class="bc-list">
              <li class="bc-item">
                <button class="bc-overflow-btn" title="Show hidden levels" @click.prevent>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="8" r="1.25"/><circle cx="8" cy="8" r="1.25"/><circle cx="12" cy="8" r="1.25"/></svg>
                </button>
              </li>
              <li class="bc-sep" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
              <li class="bc-item"><span class="bc-current" aria-current="page">Current breadcrumb</span></li>
            </ol>
          </nav>
        </div>

      </div>
    </section>

    <!-- When to use / not use -->
    <section class="ds-section">
      <h2 class="ds-h2">Usage guidelines</h2>
      <div class="bc-guideline-grid">

        <div class="bc-guideline bc-guideline--do">
          <p class="bc-guideline__label bc-guideline__label--do">When to use</p>
          <p class="ds-body">
            Breadcrumbs are effective in products and experiences that have a large amount of content
            organized in a hierarchy of more than two levels. They take up little space but still
            provide context for the user's place in the navigation hierarchy.
          </p>
        </div>

        <div class="bc-guideline bc-guideline--dont">
          <p class="bc-guideline__label bc-guideline__label--dont">When not to use</p>
          <p class="ds-body">
            Breadcrumbs are always treated as secondary and should never entirely replace the primary
            navigation.
          </p>
        </div>

      </div>
    </section>

    <!-- Interactions -->
    <section class="ds-section">
      <h2 class="ds-h2">Interactions</h2>
      <p class="ds-body">
        All the pages in the breadcrumb component should be interactive (except the current page) and
        link to their respective pages.
      </p>
      <div class="bc-interaction-grid">

        <div class="bc-interaction-card">
          <div class="bc-interaction-card__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 4.5l5 5.5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.5" cy="4.5" r="1.5" fill="currentColor"/></svg>
          </div>
          <div>
            <strong class="bc-interaction-card__title">Mouse</strong>
            <p class="ds-body">
              Users can trigger an item by clicking on a breadcrumb page link.
              The separators between page links are not interactive.
            </p>
          </div>
        </div>

        <div class="bc-interaction-card">
          <div class="bc-interaction-card__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="5" y="3" width="10" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 7h4M8 10h4M8 13h2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
          </div>
          <div>
            <strong class="bc-interaction-card__title">Keyboard</strong>
            <p class="ds-body">
              Users can navigate between breadcrumb links by pressing <kbd>Tab</kbd> and
              <kbd>Shift + Tab</kbd>. Users can trigger a breadcrumb link by pressing
              <kbd>Enter</kbd> while the link has focus.
            </p>
          </div>
        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
.ds-main {
  max-width: 1100px;
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

/* ── Table ──────────────────────────────────────────────────────── */
.ds-table-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--grey-20); }
.ds-state-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 13px; }
.ds-state-table thead th { background: var(--grey-05); border-bottom: 1px solid var(--grey-20); padding: 12px 20px; text-align: left; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--grey-70); white-space: nowrap; }
.ds-state-table tbody td { padding: 14px 20px; border-bottom: 1px solid var(--grey-10); vertical-align: middle; }
.ds-state-table tbody tr:last-child td { border-bottom: none; }
.ds-state-table__label { min-width: 120px; }
.ds-state-table__label strong { display: block; font-size: 13px; font-weight: 600; color: var(--grey-90); }
.ds-state-table__desc { font-size: 13px; color: var(--grey-60); max-width: 360px; }

/* ── Card ─────────────────────────────────────────────────────────── */
.ds-card { background: #fff; border: 1px solid var(--grey-20); border-radius: 8px; padding: 24px; display: flex; flex-direction: column; gap: 24px; }

/* ── Breadcrumb core ──────────────────────────────────────────────── */
.bc-nav { display: inline-block; }
.bc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
}
.bc-item { display: flex; align-items: center; }
.bc-sep  {
  display: flex;
  align-items: center;
  color: var(--grey-40);
  flex-shrink: 0;
}

.bc-link {
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-60);
  text-decoration: none;
  padding: 2px 0;
  border-radius: 2px;
  transition: color 100ms;
}
.bc-link:hover,
.bc-link--hover {
  color: var(--grey-90);
  text-decoration: underline;
}
.bc-link--focus {
  color: var(--grey-90);
  outline: 2px solid var(--blue-azure-50);
  outline-offset: 2px;
  border-radius: 2px;
  text-decoration: none;
}
.bc-link:focus-visible {
  outline: 2px solid var(--blue-azure-50);
  outline-offset: 2px;
  border-radius: 2px;
}

.bc-current {
  font-size: 14px;
  font-weight: 400;
  color: var(--grey-90);
}

/* ── Overflow / truncation button ─────────────────────────────────── */
.bc-overflow-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--grey-10);
  border: 1px solid var(--grey-20);
  border-radius: 4px;
  width: 28px;
  height: 22px;
  cursor: pointer;
  color: var(--grey-60);
  padding: 0;
  transition: background 100ms, color 100ms;
}
.bc-overflow-btn:hover { background: var(--grey-20); color: var(--grey-90); }

/* ── Anatomy card ─────────────────────────────────────────────────── */
.bc-anatomy-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.bc-example-row { display: flex; align-items: center; }

.bc-anatomy-labels {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 4px;
  border-top: 1px solid var(--grey-10);
}
.bc-anatomy-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.bc-anatomy-label strong { font-size: 13px; font-weight: 600; color: var(--grey-90); display: block; margin-bottom: 2px; }
.bc-anatomy-label p  { font-size: 13px; color: var(--grey-60); line-height: 1.5; margin: 0; }

.bc-anatomy-badge {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}
.bc-anatomy-badge--main    { background: var(--blue-azure-10); color: var(--blue-azure-70); }
.bc-anatomy-badge--sep     { background: var(--grey-10); color: var(--grey-60); }
.bc-anatomy-badge--current { background: #f1f1f2; color: var(--grey-90); }

/* ── Examples ─────────────────────────────────────────────────────── */
.bc-example-group { display: flex; flex-direction: column; gap: 8px; }
.bc-example-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--grey-50);
  text-transform: uppercase;
  letter-spacing: .07em;
}

/* ── Truncation card ───────────────────────────────────────────────── */
.bc-truncate-demo { gap: 20px; }

/* ── Guideline grid ─────────────────────────────────────────────────── */
.bc-guideline-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.bc-guideline {
  padding: 20px;
  border-radius: 8px;
  border-top: 3px solid;
  background: #fff;
  border-left: 1px solid var(--grey-20);
  border-right: 1px solid var(--grey-20);
  border-bottom: 1px solid var(--grey-20);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.bc-guideline--do   { border-top-color: var(--green-60); }
.bc-guideline--dont { border-top-color: var(--red-60); }

.bc-guideline__label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
}
.bc-guideline__label--do   { color: var(--green-90); }
.bc-guideline__label--dont { color: var(--red-70); }

/* ── Interaction cards ─────────────────────────────────────────────── */
.bc-interaction-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.bc-interaction-card {
  background: #fff;
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.bc-interaction-card__icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background: var(--grey-05);
  border: 1px solid var(--grey-20);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--grey-70);
  margin-top: 1px;
}
.bc-interaction-card__title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--grey-90);
  margin-bottom: 6px;
}

kbd {
  font-family: 'Inter', monospace;
  font-size: 12px;
  font-weight: 500;
  background: var(--grey-10);
  border: 1px solid var(--grey-30);
  border-radius: 4px;
  padding: 1px 5px;
  color: var(--grey-80);
}

@media (max-width: 768px) {
  .ds-main { padding: 32px 20px 60px; }
  .bc-guideline-grid,
  .bc-interaction-grid { grid-template-columns: 1fr; }
}
</style>
