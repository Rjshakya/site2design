/**
 * Test seed data for the design-system modules.
 *
 * These CSS snippets are static test inputs — they are never imported by
 * runtime code, only by the tests in this folder. Each snippet is chosen to
 * exercise one mining/mapping behavior with easy-to-reason-about values
 * (hex colors, common units, standard selectors).
 */

/** Representative SaaS stylesheet: custom properties, typography, buttons,
 * cards, header/footer surfaces, focus ring, dark-mode variable overrides
 * and an @font-face. Used to lock in the end-to-end mine -> map outputs. */
export const sampleCss = `:root {
  --bg: #ffffff;
  --fg: #0a0a0a;
  --primary: #2563eb;
  --muted: #f4f4f5;
  --border: #e4e4e7;
}
body { background: var(--bg); color: var(--fg); font-family: "Inter", sans-serif; font-size: 16px; line-height: 1.5; }
h1, h2 { font-family: "Inter", sans-serif; font-size: 2rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
.btn { background: var(--primary); color: #ffffff; border-radius: 0.5rem; padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.btn:hover { background: #1d4ed8; }
.card { background: var(--muted); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; }
header { background: #ffffff; border-bottom: 1px solid #e4e4e7; }
a { color: var(--primary); }
footer { background: #fafafa; color: #52525b; }
input, textarea { border: 1px solid var(--border); }
*:focus { outline: 2px solid var(--primary); outline-offset: 2px; }
@media (prefers-color-scheme: dark) {
  :root { --bg: #09090b; --fg: #fafafa; --primary: #3b82f6; --muted: #18181b; --border: #27272a; }
}
@font-face { font-family: "Inter"; src: url(https://example.com/inter.woff2) format("woff2"); font-weight: 700; }`;


export const bigSample = `

/*! tailwindcss v4.2.1 | MIT License | https://tailwindcss.com */
@layer properties {
    @supports (((-webkit-hyphens: none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))) {
        *,:before,:after,::backdrop {
            --tw-translate-x:0;
            --tw-translate-y: 0;
            --tw-translate-z: 0;
            --tw-rotate-x: initial;
            --tw-rotate-y: initial;
            --tw-rotate-z: initial;
            --tw-skew-x: initial;
            --tw-skew-y: initial;
            --tw-space-y-reverse: 0;
            --tw-space-x-reverse: 0;
            --tw-divide-y-reverse: 0;
            --tw-border-style: solid;
            --tw-leading: initial;
            --tw-font-weight: initial;
            --tw-tracking: initial;
            --tw-ordinal: initial;
            --tw-slashed-zero: initial;
            --tw-numeric-figure: initial;
            --tw-numeric-spacing: initial;
            --tw-numeric-fraction: initial;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-color: initial;
            --tw-shadow-alpha: 100%;
            --tw-inset-shadow: 0 0 #0000;
            --tw-inset-shadow-color: initial;
            --tw-inset-shadow-alpha: 100%;
            --tw-ring-color: initial;
            --tw-ring-shadow: 0 0 #0000;
            --tw-inset-ring-color: initial;
            --tw-inset-ring-shadow: 0 0 #0000;
            --tw-ring-inset: initial;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-outline-style: solid;
            --tw-blur: initial;
            --tw-brightness: initial;
            --tw-contrast: initial;
            --tw-grayscale: initial;
            --tw-hue-rotate: initial;
            --tw-invert: initial;
            --tw-opacity: initial;
            --tw-saturate: initial;
            --tw-sepia: initial;
            --tw-drop-shadow: initial;
            --tw-drop-shadow-color: initial;
            --tw-drop-shadow-alpha: 100%;
            --tw-drop-shadow-size: initial;
            --tw-backdrop-blur: initial;
            --tw-backdrop-brightness: initial;
            --tw-backdrop-contrast: initial;
            --tw-backdrop-grayscale: initial;
            --tw-backdrop-hue-rotate: initial;
            --tw-backdrop-invert: initial;
            --tw-backdrop-opacity: initial;
            --tw-backdrop-saturate: initial;
            --tw-backdrop-sepia: initial;
            --tw-duration: initial;
            --tw-ease: initial;
            --tw-content: "";
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-scale-z: 1;
            --tw-gradient-position: initial;
            --tw-gradient-from: #0000;
            --tw-gradient-via: #0000;
            --tw-gradient-to: #0000;
            --tw-gradient-stops: initial;
            --tw-gradient-via-stops: initial;
            --tw-gradient-from-position: 0%;
            --tw-gradient-via-position: 50%;
            --tw-gradient-to-position: 100%;
            --tw-animation-delay: 0s;
            --tw-animation-direction: normal;
            --tw-animation-duration: initial;
            --tw-animation-fill-mode: none;
            --tw-animation-iteration-count: 1;
            --tw-enter-blur: 0;
            --tw-enter-opacity: 1;
            --tw-enter-rotate: 0;
            --tw-enter-scale: 1;
            --tw-enter-translate-x: 0;
            --tw-enter-translate-y: 0;
            --tw-exit-blur: 0;
            --tw-exit-opacity: 1;
            --tw-exit-rotate: 0;
            --tw-exit-scale: 1;
            --tw-exit-translate-x: 0;
            --tw-exit-translate-y: 0
        }
    }
}

@layer theme {
    :root,:host {
        --font-sans: "Manrope Variable", sans-serif;
        --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        --color-red-100: oklch(93.6% .032 17.717);
        --color-red-400: oklch(70.4% .191 22.216);
        --color-red-500: oklch(63.7% .237 25.331);
        --color-red-700: oklch(50.5% .213 27.518);
        --color-red-900: oklch(39.6% .141 25.723);
        --color-amber-100: oklch(96.2% .059 95.617);
        --color-amber-400: oklch(82.8% .189 84.429);
        --color-amber-500: oklch(76.9% .188 70.08);
        --color-amber-600: oklch(66.6% .179 58.318);
        --color-amber-700: oklch(55.5% .163 48.998);
        --color-amber-900: oklch(41.4% .112 45.904);
        --color-green-100: oklch(96.2% .044 156.743);
        --color-green-400: oklch(79.2% .209 151.711);
        --color-green-500: oklch(72.3% .219 149.579);
        --color-green-600: oklch(62.7% .194 149.214);
        --color-green-700: oklch(52.7% .154 150.069);
        --color-green-900: oklch(39.3% .095 152.535);
        --color-blue-400: oklch(70.7% .165 254.624);
        --color-gray-100: oklch(96.7% .003 264.542);
        --color-gray-400: oklch(70.7% .022 261.325);
        --color-gray-700: oklch(37.3% .034 259.733);
        --color-gray-800: oklch(27.8% .033 256.848);
        --color-zinc-100: oklch(96.7% .001 286.375);
        --color-zinc-400: oklch(70.5% .015 286.067);
        --color-zinc-900: oklch(21% .006 285.885);
        --color-black: #000;
        --color-white: #fff;
        --spacing: .25rem;
        --container-3xs: 16rem;
        --container-xs: 20rem;
        --container-sm: 24rem;
        --container-md: 28rem;
        --container-lg: 32rem;
        --container-xl: 36rem;
        --container-2xl: 42rem;
        --container-3xl: 48rem;
        --container-4xl: 56rem;
        --text-xs: .75rem;
        --text-xs--line-height: calc(1 / .75);
        --text-sm: .875rem;
        --text-sm--line-height: calc(1.25 / .875);
        --text-base: 1rem;
        --text-base--line-height: calc(1.5 / 1);
        --text-lg: 1.125rem;
        --text-lg--line-height: calc(1.75 / 1.125);
        --text-xl: 1.25rem;
        --text-xl--line-height: calc(1.75 / 1.25);
        --text-2xl: 1.5rem;
        --text-2xl--line-height: calc(2 / 1.5);
        --text-3xl: 1.875rem;
        --text-3xl--line-height: calc(2.25 / 1.875);
        --text-4xl: 2.25rem;
        --text-4xl--line-height: calc(2.5 / 2.25);
        --text-5xl: 3rem;
        --text-5xl--line-height: 1;
        --font-weight-normal: 400;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --tracking-tighter: -.05em;
        --tracking-tight: -.025em;
        --tracking-wide: .025em;
        --tracking-widest: .1em;
        --leading-tight: 1.25;
        --leading-snug: 1.375;
        --leading-relaxed: 1.625;
        --drop-shadow-2xl: 0 25px 25px #00000026;
        --ease-out: cubic-bezier(0, 0, .2, 1);
        --ease-in-out: cubic-bezier(.4, 0, .2, 1);
        --animate-spin: spin 1s linear infinite;
        --animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
        --blur-xs: 4px;
        --blur-md: 12px;
        --blur-2xl: 40px;
        --aspect-video: 16 / 9;
        --default-transition-duration: .15s;
        --default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
        --default-font-family: "Manrope Variable", sans-serif;
        --default-mono-font-family: var(--font-mono);
        --color-primary: var(--primary);
        --color-background: var(--background)
    }
}

@layer base {
    *,:after,:before,::backdrop {
        box-sizing: border-box;
        border: 0 solid;
        margin: 0;
        padding: 0
    }

    ::file-selector-button {
        box-sizing: border-box;
        border: 0 solid;
        margin: 0;
        padding: 0
    }

    html,: host {
        -webkit-text-size-adjust:100%;
        tab-size: 4;
        line-height: 1.5;
        font-family: var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
        font-feature-settings: var(--default-font-feature-settings,normal);
        font-variation-settings: var(--default-font-variation-settings,normal);
        -webkit-tap-highlight-color: transparent
    }

    hr {
        height: 0;
        color: inherit;
        border-top-width: 1px
    }

    abbr: where([title]) {
        -webkit-text-decoration:underline dotted;
        text-decoration: underline dotted
    }

    h1,h2,h3,h4,h5,h6 {
        font-size: inherit;
        font-weight: inherit
    }

    a {
        color: inherit;
        -webkit-text-decoration: inherit;
        -webkit-text-decoration: inherit;
        -webkit-text-decoration: inherit;
        -webkit-text-decoration: inherit;
        text-decoration: inherit
    }

    b,strong {
        font-weight: bolder
    }

    code,kbd,samp,pre {
        font-family: var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
        font-feature-settings: var(--default-mono-font-feature-settings,normal);
        font-variation-settings: var(--default-mono-font-variation-settings,normal);
        font-size: 1em
    }

    small {
        font-size: 80%
    }

    sub,sup {
        vertical-align: baseline;
        font-size: 75%;
        line-height: 0;
        position: relative
    }

    sub {
        bottom: -.25em
    }

    sup {
        top: -.5em
    }

    table {
        text-indent: 0;
        border-color: inherit;
        border-collapse: collapse
    }

    :-moz-focusring {
        outline: auto
    }

    progress {
        vertical-align: baseline
    }

    summary {
        display: list-item
    }

    ol,ul,menu {
        list-style: none
    }

    img,svg,video,canvas,audio,iframe,embed,object {
        vertical-align: middle;
        display: block
    }

    img,video {
        max-width: 100%;
        height: auto
    }

    button,input,select,optgroup,textarea {
        font: inherit;
        font-feature-settings: inherit;
        font-variation-settings: inherit;
        letter-spacing: inherit;
        color: inherit;
        opacity: 1;
        background-color: #0000;
        border-radius: 0
    }

    ::file-selector-button {
        font: inherit;
        font-feature-settings: inherit;
        font-variation-settings: inherit;
        letter-spacing: inherit;
        color: inherit;
        opacity: 1;
        background-color: #0000;
        border-radius: 0
    }

    :where(select: is([multiple],[size])) optgroup {
        font-weight:bolder
    }

    :where(select: is([multiple],[size])) optgroup option {
        padding-inline-start:20px
    }

    ::file-selector-button {
        margin-inline-end:4px}

    ::placeholder {
        opacity: 1
    }

    @supports (not ((-webkit-appearance: -apple-pay-button))) or (contain-intrinsic-size:1px) {
        ::placeholder {
            color:currentColor
        }

        @supports (color: color-mix(in lab, red, red)) {
            ::placeholder {
                color:color-mix(in oklab, currentcolor 50%, transparent)
            }
        }
    }

    textarea {
        resize: vertical
    }

    ::-webkit-search-decoration {
        -webkit-appearance: none
    }

    ::-webkit-date-and-time-value {
        min-height: 1lh;
        text-align: inherit
    }

    ::-webkit-datetime-edit {
        display: inline-flex
    }

    ::-webkit-datetime-edit-fields-wrapper {
        padding: 0
    }

    ::-webkit-datetime-edit {
        padding-block:0}

    ::-webkit-datetime-edit-year-field {
        padding-block:0}

    ::-webkit-datetime-edit-month-field {
        padding-block:0}

    ::-webkit-datetime-edit-day-field {
        padding-block:0}

    ::-webkit-datetime-edit-hour-field {
        padding-block:0}

    ::-webkit-datetime-edit-minute-field {
        padding-block:0}

    ::-webkit-datetime-edit-second-field {
        padding-block:0}

    ::-webkit-datetime-edit-millisecond-field {
        padding-block:0}

    ::-webkit-datetime-edit-meridiem-field {
        padding-block:0}

    ::-webkit-calendar-picker-indicator {
        line-height: 1
    }

    :-moz-ui-invalid {
        box-shadow: none
    }

    button,input: where([type=button],[type=reset],[type=submit]) {
        appearance:button
    }

    ::file-selector-button {
        appearance: button
    }

    ::-webkit-inner-spin-button {
        height: auto
    }

    ::-webkit-outer-spin-button {
        height: auto
    }

    [hidden]: where(:not([hidden=until-found])) {
        display:none!important
    }

    * {
        border-color: var(--border);
        outline-color: var(--ring)
    }

    @supports (color: color-mix(in lab, red, red)) {
        * {
            outline-color:color-mix(in oklab, var(--ring) 50%, transparent)
        }
    }

    body {
        background-color: var(--background);
        --tw-tracking: var(--tracking-tight);
        letter-spacing: var(--tracking-tight);
        color: var(--foreground);
        scrollbar-width: thin;
        scrollbar-color: gray transparent
    }

    button: not(:disabled),[role=button]:not(:disabled) {
        cursor:pointer
    }

    html {
        scrollbar-width: thin;
        scrollbar-color: gray transparent;
        font-family: Manrope Variable,sans-serif
    }
}

@layer components;@layer utilities {
    .\@container\/card {
        container: card/inline-size
    }

    .\@container\/card-header {
        container: card-header/inline-size
    }

    .\@container\/main {
        container: main/inline-size
    }

    .pointer-events-none {
        pointer-events: none
    }

    .invisible {
        visibility: hidden
    }

    .visible {
        visibility: visible
    }

    .sr-only {
        clip-path: inset(50%);
        white-space: nowrap;
        border-width: 0;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        position: absolute;
        overflow: hidden
    }

    .absolute {
        position: absolute
    }

    .fixed {
        position: fixed
    }

    .relative {
        position: relative
    }

    .static {
        position: static
    }

    .sticky {
        position: sticky
    }

    .inset-0 {
        inset: calc(var(--spacing) * 0)
    }

    .inset-x-0 {
        inset-inline: calc(var(--spacing) * 0)
    }

    .-inset-y-px {
        inset-block: -1px
    }

    .inset-y-0 {
        inset-block: calc(var(--spacing) * 0)
    }

    .start {
        inset-inline-start: var(--spacing)
    }

    .-end-px {
        inset-inline-end: -1px
    }

    .end {
        inset-inline-end: var(--spacing)
    }

    .top-0 {
        top: calc(var(--spacing) * 0)
    }

    .top-1\.5 {
        top: calc(var(--spacing) * 1.5)
    }

    .top-1\/2 {
        top: 50%
    }

    .top-1\/3 {
        top: 33.3333%
    }

    .top-3\.5 {
        top: calc(var(--spacing) * 3.5)
    }

    .top-4 {
        top: calc(var(--spacing) * 4)
    }

    .right-0 {
        right: calc(var(--spacing) * 0)
    }

    .right-1 {
        right: calc(var(--spacing) * 1)
    }

    .right-2 {
        right: calc(var(--spacing) * 2)
    }

    .right-3 {
        right: calc(var(--spacing) * 3)
    }

    .right-4 {
        right: calc(var(--spacing) * 4)
    }

    .bottom-0 {
        bottom: calc(var(--spacing) * 0)
    }

    .bottom-1 {
        bottom: calc(var(--spacing) * 1)
    }

    .left-0 {
        left: calc(var(--spacing) * 0)
    }

    .left-1\/2 {
        left: 50%
    }

    .isolate {
        isolation: isolate
    }

    .z-0 {
        z-index: 0
    }

    .z-10 {
        z-index: 10
    }

    .z-20 {
        z-index: 20
    }

    .z-50 {
        z-index: 50
    }

    .order-first {
        order: -9999
    }

    .order-last {
        order: 9999
    }

    .col-start-2 {
        grid-column-start: 2
    }

    .row-span-2 {
        grid-row: span 2/span 2
    }

    .row-start-1 {
        grid-row-start: 1
    }

    .container {
        width: 100%
    }

    @media (width>=40rem) {
        .container {
            max-width: 40rem
        }
    }

    @media (width>=48rem) {
        .container {
            max-width: 48rem
        }
    }

    @media (width>=64rem) {
        .container {
            max-width: 64rem
        }
    }

    @media (width>=80rem) {
        .container {
            max-width: 80rem
        }
    }

    @media (width>=96rem) {
        .container {
            max-width: 96rem
        }
    }

    .-mx-1 {
        margin-inline:calc(var(--spacing) * -1)}

    .mx-2 {
        margin-inline: calc(var(--spacing) * 2)
    }

    .mx-3\.5 {
        margin-inline: calc(var(--spacing) * 3.5)
    }

    .mx-auto {
        margin-inline:auto}

    .my-1 {
        margin-block:calc(var(--spacing) * 1)}

    .my-2 {
        margin-block: calc(var(--spacing) * 2)
    }

    .mt-0\.5 {
        margin-top: calc(var(--spacing) * .5)
    }

    .mt-1 {
        margin-top: calc(var(--spacing) * 1)
    }

    .mt-2 {
        margin-top: calc(var(--spacing) * 2)
    }

    .mt-3 {
        margin-top: calc(var(--spacing) * 3)
    }

    .mt-4 {
        margin-top: calc(var(--spacing) * 4)
    }

    .mt-12 {
        margin-top: calc(var(--spacing) * 12)
    }

    .mt-auto {
        margin-top: auto
    }

    .mr-1 {
        margin-right: calc(var(--spacing) * 1)
    }

    .mr-2 {
        margin-right: calc(var(--spacing) * 2)
    }

    .mb-1 {
        margin-bottom: calc(var(--spacing) * 1)
    }

    .mb-2 {
        margin-bottom: calc(var(--spacing) * 2)
    }

    .mb-3 {
        margin-bottom: calc(var(--spacing) * 3)
    }

    .mb-4 {
        margin-bottom: calc(var(--spacing) * 4)
    }

    .mb-6 {
        margin-bottom: calc(var(--spacing) * 6)
    }

    .mb-8 {
        margin-bottom: calc(var(--spacing) * 8)
    }

    .mb-12 {
        margin-bottom: calc(var(--spacing) * 12)
    }

    .mb-16 {
        margin-bottom: calc(var(--spacing) * 16)
    }

    .mb-20 {
        margin-bottom: calc(var(--spacing) * 20)
    }

    .mb-24 {
        margin-bottom: calc(var(--spacing) * 24)
    }

    .mb-30 {
        margin-bottom: calc(var(--spacing) * 30)
    }

    .-ml-1 {
        margin-left: calc(var(--spacing) * -1)
    }

    .ml-1 {
        margin-left: calc(var(--spacing) * 1)
    }

    .ml-auto {
        margin-left: auto
    }

    .line-clamp-1 {
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden
    }

    .line-clamp-2 {
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden
    }

    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none
    }

    .no-scrollbar::-webkit-scrollbar {
        display: none
    }

    .block {
        display: block
    }

    .contents {
        display: contents
    }

    .flex {
        display: flex
    }

    .grid {
        display: grid
    }

    .hidden {
        display: none
    }

    .inline {
        display: inline
    }

    .inline-block {
        display: inline-block
    }

    .inline-flex {
        display: inline-flex
    }

    .table {
        display: table
    }

    .field-sizing-content {
        field-sizing: content
    }

    .aspect-square {
        aspect-ratio: 1
    }

    .aspect-video {
        aspect-ratio: var(--aspect-video)
    }

    .size-2\.5 {
        width: calc(var(--spacing) * 2.5);
        height: calc(var(--spacing) * 2.5)
    }

    .size-3 {
        width: calc(var(--spacing) * 3);
        height: calc(var(--spacing) * 3)
    }

    .size-3\.5 {
        width: calc(var(--spacing) * 3.5);
        height: calc(var(--spacing) * 3.5)
    }

    .size-4 {
        width: calc(var(--spacing) * 4);
        height: calc(var(--spacing) * 4)
    }

    .size-5 {
        width: calc(var(--spacing) * 5);
        height: calc(var(--spacing) * 5)
    }

    .size-6 {
        width: calc(var(--spacing) * 6);
        height: calc(var(--spacing) * 6)
    }

    .size-7 {
        width: calc(var(--spacing) * 7);
        height: calc(var(--spacing) * 7)
    }

    .size-8 {
        width: calc(var(--spacing) * 8);
        height: calc(var(--spacing) * 8)
    }

    .size-9 {
        width: calc(var(--spacing) * 9);
        height: calc(var(--spacing) * 9)
    }

    .size-10 {
        width: calc(var(--spacing) * 10);
        height: calc(var(--spacing) * 10)
    }

    .size-12 {
        width: calc(var(--spacing) * 12);
        height: calc(var(--spacing) * 12)
    }

    .size-16 {
        width: calc(var(--spacing) * 16);
        height: calc(var(--spacing) * 16)
    }

    .size-full {
        width: 100%;
        height: 100%
    }

    .h-\(--header-height\) {
        height: var(--header-height)
    }

    .h-1\.5 {
        height: calc(var(--spacing) * 1.5)
    }

    .h-2\.5 {
        height: calc(var(--spacing) * 2.5)
    }

    .h-3 {
        height: calc(var(--spacing) * 3)
    }

    .h-3\.5 {
        height: calc(var(--spacing) * 3.5)
    }

    .h-4 {
        height: calc(var(--spacing) * 4)
    }

    .h-5 {
        height: calc(var(--spacing) * 5)
    }

    .h-6 {
        height: calc(var(--spacing) * 6)
    }

    .h-7 {
        height: calc(var(--spacing) * 7)
    }

    .h-8 {
        height: calc(var(--spacing) * 8)
    }

    .h-8\! {
        height: calc(var(--spacing) * 8)!important
    }

    .h-9 {
        height: calc(var(--spacing) * 9)
    }

    .h-10 {
        height: calc(var(--spacing) * 10)
    }

    .h-12 {
        height: calc(var(--spacing) * 12)
    }

    .h-16 {
        height: calc(var(--spacing) * 16)
    }

    .h-20 {
        height: calc(var(--spacing) * 20)
    }

    .h-24 {
        height: calc(var(--spacing) * 24)
    }

    .h-32 {
        height: calc(var(--spacing) * 32)
    }

    .h-40 {
        height: calc(var(--spacing) * 40)
    }

    .h-70 {
        height: calc(var(--spacing) * 70)
    }

    .h-\[250px\] {
        height: 250px
    }

    .h-\[calc\(--spacing\(5\.5\)\)\] {
        height: calc(calc(var(--spacing) * 5.5))
    }

    .h-\[calc\(100\%-1px\)\] {
        height: calc(100% - 1px)
    }

    .h-auto {
        height: auto
    }

    .h-dvh {
        height: 100dvh
    }

    .h-full {
        height: 100%
    }

    .h-px {
        height: 1px
    }

    .h-svh {
        height: 100svh
    }

    .max-h-\(--available-height\) {
        max-height: var(--available-height)
    }

    .max-h-72 {
        max-height: calc(var(--spacing) * 72)
    }

    .max-h-\[min\(calc\(--spacing\(72\)---spacing\(9\)\)\,calc\(var\(--available-height\)---spacing\(9\)\)\)\] {
        max-height: min(calc(calc(var(--spacing) * 72) - calc(var(--spacing) * 9)), calc(var(--available-height) - calc(var(--spacing) * 9)))
    }

    .min-h-0 {
        min-height: calc(var(--spacing) * 0)
    }

    .min-h-9 {
        min-height: calc(var(--spacing) * 9)
    }

    .min-h-16 {
        min-height: calc(var(--spacing) * 16)
    }

    .min-h-screen {
        min-height: 100vh
    }

    .min-h-svh {
        min-height: 100svh
    }

    .w-\(--anchor-width\) {
        width: var(--anchor-width)
    }

    .w-\(--radix-dropdown-menu-trigger-width\) {
        width: var(--radix-dropdown-menu-trigger-width)
    }

    .w-\(--sidebar-width\) {
        width: var(--sidebar-width)
    }

    .w-2\.5 {
        width: calc(var(--spacing) * 2.5)
    }

    .w-3 {
        width: calc(var(--spacing) * 3)
    }

    .w-3\.5 {
        width: calc(var(--spacing) * 3.5)
    }

    .w-3\/4 {
        width: 75%
    }

    .w-4 {
        width: calc(var(--spacing) * 4)
    }

    .w-5 {
        width: calc(var(--spacing) * 5)
    }

    .w-7 {
        width: calc(var(--spacing) * 7)
    }

    .w-8 {
        width: calc(var(--spacing) * 8)
    }

    .w-9 {
        width: calc(var(--spacing) * 9)
    }

    .w-10 {
        width: calc(var(--spacing) * 10)
    }

    .w-12 {
        width: calc(var(--spacing) * 12)
    }

    .w-16 {
        width: calc(var(--spacing) * 16)
    }

    .w-20 {
        width: calc(var(--spacing) * 20)
    }

    .w-24 {
        width: calc(var(--spacing) * 24)
    }

    .w-32 {
        width: calc(var(--spacing) * 32)
    }

    .w-40 {
        width: calc(var(--spacing) * 40)
    }

    .w-48 {
        width: calc(var(--spacing) * 48)
    }

    .w-56 {
        width: calc(var(--spacing) * 56)
    }

    .w-64 {
        width: calc(var(--spacing) * 64)
    }

    .w-72 {
        width: calc(var(--spacing) * 72)
    }

    .w-\[100px\] {
        width: 100px
    }

    .w-auto {
        width: auto
    }

    .w-fit {
        width: fit-content
    }

    .w-full {
        width: 100%
    }

    .max-w-\(--available-width\) {
        max-width: var(--available-width)
    }

    .max-w-\(--skeleton-width\) {
        max-width: var(--skeleton-width)
    }

    .max-w-2xl {
        max-width: var(--container-2xl)
    }

    .max-w-3xl {
        max-width: var(--container-3xl)
    }

    .max-w-3xs {
        max-width: var(--container-3xs)
    }

    .max-w-4xl {
        max-width: var(--container-4xl)
    }

    .max-w-50 {
        max-width: calc(var(--spacing) * 50)
    }

    .max-w-\[calc\(100\%-2rem\)\] {
        max-width: calc(100% - 2rem)
    }

    .max-w-lg {
        max-width: var(--container-lg)
    }

    .max-w-md {
        max-width: var(--container-md)
    }

    .max-w-sm {
        max-width: var(--container-sm)
    }

    .max-w-xs {
        max-width: var(--container-xs)
    }

    .min-w-0 {
        min-width: calc(var(--spacing) * 0)
    }

    .min-w-5 {
        min-width: calc(var(--spacing) * 5)
    }

    .min-w-8 {
        min-width: calc(var(--spacing) * 8)
    }

    .min-w-9 {
        min-width: calc(var(--spacing) * 9)
    }

    .min-w-10 {
        min-width: calc(var(--spacing) * 10)
    }

    .min-w-16 {
        min-width: calc(var(--spacing) * 16)
    }

    .min-w-32 {
        min-width: calc(var(--spacing) * 32)
    }

    .min-w-36 {
        min-width: calc(var(--spacing) * 36)
    }

    .min-w-56 {
        min-width: calc(var(--spacing) * 56)
    }

    .min-w-\[96px\] {
        min-width: 96px
    }

    .min-w-\[140px\] {
        min-width: 140px
    }

    .min-w-\[calc\(var\(--anchor-width\)\+--spacing\(7\)\)\] {
        min-width: calc(var(--anchor-width) + calc(var(--spacing) * 7))
    }

    .flex-1 {
        flex: 1
    }

    .flex-shrink-0 {
        flex-shrink: 0
    }

    .shrink {
        flex-shrink: 1
    }

    .shrink-0 {
        flex-shrink: 0
    }

    .grow {
        flex-grow: 1
    }

    .basis-full {
        flex-basis: 100%
    }

    .origin-\(--transform-origin\) {
        transform-origin: var(--transform-origin)
    }

    .-translate-x-1\/2 {
        --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .-translate-x-px {
        --tw-translate-x: -1px;
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .translate-x-px {
        --tw-translate-x: 1px;
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .-translate-y-1\/2 {
        --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .translate-y-0 {
        --tw-translate-y: calc(var(--spacing) * 0);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .translate-y-\[calc\(-50\%-2px\)\] {
        --tw-translate-y: calc(-50% - 2px);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .rotate-45 {
        rotate: 45deg
    }

    .transform {
        transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)
    }

    .animate-none\! {
        animation: none!important
    }

    .animate-pulse {
        animation: var(--animate-pulse)
    }

    .animate-spin {
        animation: var(--animate-spin)
    }

    .cursor-default {
        cursor: default
    }

    .cursor-pointer {
        cursor: pointer
    }

    .cursor-text {
        cursor: text
    }

    .touch-none {
        touch-action: none
    }

    .resize-none {
        resize: none
    }

    .scroll-my-1 {
        scroll-margin-block: calc(var(--spacing) * 1)
    }

    .scroll-py-1 {
        scroll-padding-block: calc(var(--spacing) * 1)
    }

    .auto-rows-min {
        grid-auto-rows: min-content
    }

    .grid-cols-1 {
        grid-template-columns: repeat(1,minmax(0,1fr))
    }

    .grid-cols-2 {
        grid-template-columns: repeat(2,minmax(0,1fr))
    }

    .grid-rows-\[auto_1fr\] {
        grid-template-rows: auto 1fr
    }

    .flex-col {
        flex-direction: column
    }

    .flex-col-reverse {
        flex-direction: column-reverse
    }

    .flex-row {
        flex-direction: row
    }

    .flex-wrap {
        flex-wrap: wrap
    }

    .place-content-center {
        place-content: center
    }

    .place-items-center {
        place-items: center
    }

    .items-baseline {
        align-items: baseline
    }

    .items-center {
        align-items: center
    }

    .items-start {
        align-items: flex-start
    }

    .justify-between {
        justify-content: space-between
    }

    .justify-center {
        justify-content: center
    }

    .justify-end {
        justify-content: flex-end
    }

    .justify-start {
        justify-content: flex-start
    }

    .gap-0 {
        gap: calc(var(--spacing) * 0)
    }

    .gap-0\.5 {
        gap: calc(var(--spacing) * .5)
    }

    .gap-1 {
        gap: calc(var(--spacing) * 1)
    }

    .gap-1\.5 {
        gap: calc(var(--spacing) * 1.5)
    }

    .gap-2 {
        gap: calc(var(--spacing) * 2)
    }

    .gap-2\.5 {
        gap: calc(var(--spacing) * 2.5)
    }

    .gap-3 {
        gap: calc(var(--spacing) * 3)
    }

    .gap-3\.5 {
        gap: calc(var(--spacing) * 3.5)
    }

    .gap-4 {
        gap: calc(var(--spacing) * 4)
    }

    .gap-6 {
        gap: calc(var(--spacing) * 6)
    }

    .gap-8 {
        gap: calc(var(--spacing) * 8)
    }

    :where(.space-y-1>:not(:last-child)) {
        --tw-space-y-reverse: 0;
        margin-block-start:calc(calc(var(--spacing) * 1) * var(--tw-space-y-reverse));margin-block-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-y-reverse)))
    }

    :where(.space-y-1\.5>: not(:last-child)) {
        --tw-space-y-reverse:0;
        margin-block-start:calc(calc(var(--spacing) * 1.5) * var(--tw-space-y-reverse));margin-block-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)))
    }

    :where(.space-y-2>:not(:last-child)) {
        --tw-space-y-reverse: 0;
        margin-block-start:calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))
    }

    :where(.space-y-3>:not(:last-child)) {
        --tw-space-y-reverse: 0;
        margin-block-start:calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))
    }

    :where(.space-y-4>:not(:last-child)) {
        --tw-space-y-reverse: 0;
        margin-block-start:calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))
    }

    :where(.space-y-6>:not(:last-child)) {
        --tw-space-y-reverse: 0;
        margin-block-start:calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));margin-block-end: calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)))
    }

    :where(.space-y-10>:not(:last-child)) {
        --tw-space-y-reverse: 0;
        margin-block-start:calc(calc(var(--spacing) * 10) * var(--tw-space-y-reverse));margin-block-end: calc(calc(var(--spacing) * 10) * calc(1 - var(--tw-space-y-reverse)))
    }

    .gap-x-4 {
        column-gap: calc(var(--spacing) * 4)
    }

    :where(.-space-x-2>:not(:last-child)) {
        --tw-space-x-reverse: 0;
        margin-inline-start:calc(calc(var(--spacing) * -2) * var(--tw-space-x-reverse));margin-inline-end: calc(calc(var(--spacing) * -2) * calc(1 - var(--tw-space-x-reverse)))
    }

    :where(.space-x-2>:not(:last-child)) {
        --tw-space-x-reverse: 0;
        margin-inline-start:calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))
    }

    .gap-y-1 {
        row-gap: calc(var(--spacing) * 1)
    }

    :where(.divide-y>:not(:last-child)) {
        --tw-divide-y-reverse: 0;
        border-bottom-style: var(--tw-border-style);
        border-top-style: var(--tw-border-style);
        border-top-width: calc(1px * var(--tw-divide-y-reverse));
        border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)))
    }

    :where(.divide-border>:not(:last-child)) {
        border-color: var(--border)
    }

    .self-start {
        align-self: flex-start
    }

    .justify-self-end {
        justify-self: flex-end
    }

    .truncate {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden
    }

    .overflow-auto {
        overflow: auto
    }

    .overflow-hidden {
        overflow: hidden
    }

    .overflow-x-auto {
        overflow-x: auto
    }

    .overflow-x-hidden {
        overflow-x: hidden
    }

    .overflow-y-auto {
        overflow-y: auto
    }

    .overscroll-contain {
        overscroll-behavior: contain
    }

    .rounded {
        border-radius: .25rem
    }

    .rounded-2xl {
        border-radius: calc(var(--radius) * 1.8)
    }

    .rounded-4xl {
        border-radius: calc(var(--radius) * 2.6)
    }

    .rounded-\[2px\] {
        border-radius: 2px
    }

    .rounded-\[6px\] {
        border-radius: 6px
    }

    .rounded-\[calc\(var\(--radius\)-5px\)\] {
        border-radius: calc(var(--radius) - 5px)
    }

    .rounded-\[inherit\] {
        border-radius: inherit
    }

    .rounded-full {
        border-radius: 3.40282e38px
    }

    .rounded-lg {
        border-radius: var(--radius)
    }

    .rounded-lg\! {
        border-radius: var(--radius)!important
    }

    .rounded-md {
        border-radius: calc(var(--radius) * .8)
    }

    .rounded-none {
        border-radius: 0
    }

    .rounded-sm {
        border-radius: calc(var(--radius) * .6)
    }

    .rounded-xl {
        border-radius: calc(var(--radius) * 1.4)
    }

    .rounded-xl\! {
        border-radius: calc(var(--radius) * 1.4)!important
    }

    .rounded-s-none {
        border-start-start-radius: 0;
        border-end-start-radius: 0
    }

    .rounded-e-md {
        border-start-end-radius: calc(var(--radius) * .8);
        border-end-end-radius: calc(var(--radius) * .8)
    }

    .rounded-t-xl {
        border-top-left-radius: calc(var(--radius) * 1.4);
        border-top-right-radius: calc(var(--radius) * 1.4)
    }

    .rounded-b-xl {
        border-bottom-right-radius: calc(var(--radius) * 1.4);
        border-bottom-left-radius: calc(var(--radius) * 1.4)
    }

    .border {
        border-style: var(--tw-border-style);
        border-width: 1px
    }

    .border-0 {
        border-style: var(--tw-border-style);
        border-width: 0
    }

    .border-2 {
        border-style: var(--tw-border-style);
        border-width: 2px
    }

    .border-t {
        border-top-style: var(--tw-border-style);
        border-top-width: 1px
    }

    .border-b {
        border-bottom-style: var(--tw-border-style);
        border-bottom-width: 1px
    }

    .border-l {
        border-left-style: var(--tw-border-style);
        border-left-width: 1px
    }

    .border-dashed {
        --tw-border-style: dashed;
        border-style: dashed
    }

    .border-border,.border-border\/20 {
        border-color: var(--border)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .border-border\/20 {
            border-color:color-mix(in oklab, var(--border) 20%, transparent)
        }
    }

    .border-border\/30 {
        border-color: var(--border)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .border-border\/30 {
            border-color:color-mix(in oklab, var(--border) 30%, transparent)
        }
    }

    .border-border\/40 {
        border-color: var(--border)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .border-border\/40 {
            border-color:color-mix(in oklab, var(--border) 40%, transparent)
        }
    }

    .border-border\/50 {
        border-color: var(--border)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .border-border\/50 {
            border-color:color-mix(in oklab, var(--border) 50%, transparent)
        }
    }

    .border-input,.border-input\/30 {
        border-color: var(--input)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .border-input\/30 {
            border-color:color-mix(in oklab, var(--input) 30%, transparent)
        }
    }

    .border-input\/50 {
        border-color: var(--input)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .border-input\/50 {
            border-color:color-mix(in oklab, var(--input) 50%, transparent)
        }
    }

    .border-primary {
        border-color: var(--primary)
    }

    .border-red-500 {
        border-color: var(--color-red-500)
    }

    .border-ring\/40 {
        border-color: var(--ring)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .border-ring\/40 {
            border-color:color-mix(in oklab, var(--ring) 40%, transparent)
        }
    }

    .border-sidebar-border {
        border-color: var(--sidebar-border)
    }

    .border-transparent {
        border-color: #0000
    }

    .bg-accent,.bg-accent\/50 {
        background-color: var(--accent)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-accent\/50 {
            background-color:color-mix(in oklab, var(--accent) 50%, transparent)
        }
    }

    .bg-amber-100 {
        background-color: var(--color-amber-100)
    }

    .bg-background,.bg-background\/80 {
        background-color: var(--background)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-background\/80 {
            background-color:color-mix(in oklab, var(--background) 80%, transparent)
        }
    }

    .bg-background\/95 {
        background-color: var(--background)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-background\/95 {
            background-color:color-mix(in oklab, var(--background) 95%, transparent)
        }
    }

    .bg-black\/10 {
        background-color: #0000001a
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-black\/10 {
            background-color:color-mix(in oklab, var(--color-black) 10%, transparent)
        }
    }

    .bg-black\/80 {
        background-color: #000c
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-black\/80 {
            background-color:color-mix(in oklab, var(--color-black) 80%, transparent)
        }
    }

    .bg-border,.bg-border\/50 {
        background-color: var(--border)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-border\/50 {
            background-color:color-mix(in oklab, var(--border) 50%, transparent)
        }
    }

    .bg-card {
        background-color: var(--card)
    }

    .bg-destructive\/10 {
        background-color: var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-destructive\/10 {
            background-color:color-mix(in oklab, var(--destructive) 10%, transparent)
        }
    }

    .bg-foreground {
        background-color: var(--foreground)
    }

    .bg-gray-100 {
        background-color: var(--color-gray-100)
    }

    .bg-green-100 {
        background-color: var(--color-green-100)
    }

    .bg-green-500 {
        background-color: var(--color-green-500)
    }

    .bg-input\/30 {
        background-color: var(--input)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-input\/30 {
            background-color:color-mix(in oklab, var(--input) 30%, transparent)
        }
    }

    .bg-muted,.bg-muted\/50 {
        background-color: var(--muted)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-muted\/50 {
            background-color:color-mix(in oklab, var(--muted) 50%, transparent)
        }
    }

    .bg-popover,.bg-popover\/70 {
        background-color: var(--popover)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-popover\/70 {
            background-color:color-mix(in oklab, var(--popover) 70%, transparent)
        }
    }

    .bg-primary,.bg-primary\/5 {
        background-color: var(--primary)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .bg-primary\/5 {
            background-color:color-mix(in oklab, var(--primary) 5%, transparent)
        }
    }

    .bg-red-100 {
        background-color: var(--color-red-100)
    }

    .bg-secondary {
        background-color: var(--secondary)
    }

    .bg-sidebar {
        background-color: var(--sidebar)
    }

    .bg-sidebar-accent {
        background-color: var(--sidebar-accent)
    }

    .bg-sidebar-border {
        background-color: var(--sidebar-border)
    }

    .bg-transparent {
        background-color: #0000
    }

    .bg-white {
        background-color: var(--color-white)
    }

    .bg-zinc-900 {
        background-color: var(--color-zinc-900)
    }

    .bg-clip-padding {
        background-clip: padding-box
    }

    .fill-foreground {
        fill: var(--foreground)
    }

    .object-cover {
        object-fit: cover
    }

    .p-0 {
        padding: calc(var(--spacing) * 0)
    }

    .p-1 {
        padding: calc(var(--spacing) * 1)
    }

    .p-1\.5 {
        padding: calc(var(--spacing) * 1.5)
    }

    .p-2 {
        padding: calc(var(--spacing) * 2)
    }

    .p-3 {
        padding: calc(var(--spacing) * 3)
    }

    .p-4 {
        padding: calc(var(--spacing) * 4)
    }

    .p-5 {
        padding: calc(var(--spacing) * 5)
    }

    .p-6 {
        padding: calc(var(--spacing) * 6)
    }

    .p-8 {
        padding: calc(var(--spacing) * 8)
    }

    .p-12 {
        padding: calc(var(--spacing) * 12)
    }

    .p-\[3px\] {
        padding: 3px
    }

    .p-px {
        padding: 1px
    }

    .px-0 {
        padding-inline:calc(var(--spacing) * 0)}

    .px-1 {
        padding-inline: calc(var(--spacing) * 1)
    }

    .px-1\.5 {
        padding-inline: calc(var(--spacing) * 1.5)
    }

    .px-2 {
        padding-inline:calc(var(--spacing) * 2)}

    .px-2\.5 {
        padding-inline: calc(var(--spacing) * 2.5)
    }

    .px-3 {
        padding-inline:calc(var(--spacing) * 3)}

    .px-3\.5 {
        padding-inline: calc(var(--spacing) * 3.5)
    }

    .px-4 {
        padding-inline:calc(var(--spacing) * 4)}

    .px-5 {
        padding-inline: calc(var(--spacing) * 5)
    }

    .px-6 {
        padding-inline:calc(var(--spacing) * 6)}

    .px-8 {
        padding-inline: calc(var(--spacing) * 8)
    }

    .py-0 {
        padding-block:calc(var(--spacing) * 0)}

    .py-0\.5 {
        padding-block: calc(var(--spacing) * .5)
    }

    .py-1 {
        padding-block:calc(var(--spacing) * 1)}

    .py-1\.5 {
        padding-block: calc(var(--spacing) * 1.5)
    }

    .py-2 {
        padding-block:calc(var(--spacing) * 2)}

    .py-2\.5 {
        padding-block: calc(var(--spacing) * 2.5)
    }

    .py-3 {
        padding-block:calc(var(--spacing) * 3)}

    .py-3\.5 {
        padding-block: calc(var(--spacing) * 3.5)
    }

    .py-4 {
        padding-block:calc(var(--spacing) * 4)}

    .py-6 {
        padding-block: calc(var(--spacing) * 6)
    }

    .py-8 {
        padding-block:calc(var(--spacing) * 8)}

    .py-10 {
        padding-block: calc(var(--spacing) * 10)
    }

    .py-16 {
        padding-block:calc(var(--spacing) * 16)}

    .py-18 {
        padding-block: calc(var(--spacing) * 18)
    }

    .py-24 {
        padding-block:calc(var(--spacing) * 24)}

    .ps-2 {
        padding-inline-start: calc(var(--spacing) * 2)
    }

    .pe-7 {
        padding-inline-end:calc(var(--spacing) * 7)}

    .pt-0 {
        padding-top: calc(var(--spacing) * 0)
    }

    .pt-1 {
        padding-top: calc(var(--spacing) * 1)
    }

    .pt-2 {
        padding-top: calc(var(--spacing) * 2)
    }

    .pt-4 {
        padding-top: calc(var(--spacing) * 4)
    }

    .pt-5 {
        padding-top: calc(var(--spacing) * 5)
    }

    .pt-8 {
        padding-top: calc(var(--spacing) * 8)
    }

    .pt-16 {
        padding-top: calc(var(--spacing) * 16)
    }

    .pt-32 {
        padding-top: calc(var(--spacing) * 32)
    }

    .pr-2 {
        padding-right: calc(var(--spacing) * 2)
    }

    .pr-8 {
        padding-right: calc(var(--spacing) * 8)
    }

    .pb-0 {
        padding-bottom: calc(var(--spacing) * 0)
    }

    .pb-2 {
        padding-bottom: calc(var(--spacing) * 2)
    }

    .pb-4 {
        padding-bottom: calc(var(--spacing) * 4)
    }

    .pb-5 {
        padding-bottom: calc(var(--spacing) * 5)
    }

    .pb-20 {
        padding-bottom: calc(var(--spacing) * 20)
    }

    .pl-1 {
        padding-left: calc(var(--spacing) * 1)
    }

    .pl-2 {
        padding-left: calc(var(--spacing) * 2)
    }

    .pl-3 {
        padding-left: calc(var(--spacing) * 3)
    }

    .text-center {
        text-align: center
    }

    .text-left {
        text-align: left
    }

    .font-heading {
        font-family: var(--font-sans)
    }

    .font-mono {
        font-family: var(--font-mono)
    }

    .font-sans {
        font-family: Manrope Variable,sans-serif
    }

    .text-2xl {
        font-size: var(--text-2xl);
        line-height: var(--tw-leading,var(--text-2xl--line-height))
    }

    .text-3xl {
        font-size: var(--text-3xl);
        line-height: var(--tw-leading,var(--text-3xl--line-height))
    }

    .text-4xl {
        font-size: var(--text-4xl);
        line-height: var(--tw-leading,var(--text-4xl--line-height))
    }

    .text-5xl {
        font-size: var(--text-5xl);
        line-height: var(--tw-leading,var(--text-5xl--line-height))
    }

    .text-base {
        font-size: var(--text-base);
        line-height: var(--tw-leading,var(--text-base--line-height))
    }

    .text-lg {
        font-size: var(--text-lg);
        line-height: var(--tw-leading,var(--text-lg--line-height))
    }

    .text-sm {
        font-size: var(--text-sm);
        line-height: var(--tw-leading,var(--text-sm--line-height))
    }

    .text-sm\/relaxed {
        font-size: var(--text-sm);
        line-height: var(--leading-relaxed)
    }

    .text-xl {
        font-size: var(--text-xl);
        line-height: var(--tw-leading,var(--text-xl--line-height))
    }

    .text-xs {
        font-size: var(--text-xs);
        line-height: var(--tw-leading,var(--text-xs--line-height))
    }

    .leading-none {
        --tw-leading: 1;
        line-height: 1
    }

    .leading-relaxed {
        --tw-leading: var(--leading-relaxed);
        line-height: var(--leading-relaxed)
    }

    .leading-snug {
        --tw-leading: var(--leading-snug);
        line-height: var(--leading-snug)
    }

    .leading-tight {
        --tw-leading: var(--leading-tight);
        line-height: var(--leading-tight)
    }

    .font-bold {
        --tw-font-weight: var(--font-weight-bold);
        font-weight: var(--font-weight-bold)
    }

    .font-medium {
        --tw-font-weight: var(--font-weight-medium);
        font-weight: var(--font-weight-medium)
    }

    .font-normal {
        --tw-font-weight: var(--font-weight-normal);
        font-weight: var(--font-weight-normal)
    }

    .font-semibold {
        --tw-font-weight: var(--font-weight-semibold);
        font-weight: var(--font-weight-semibold)
    }

    .tracking-\[-0\.06em\] {
        --tw-tracking: -.06em;
        letter-spacing: -.06em
    }

    .tracking-tight {
        --tw-tracking: var(--tracking-tight);
        letter-spacing: var(--tracking-tight)
    }

    .tracking-tighter {
        --tw-tracking: var(--tracking-tighter);
        letter-spacing: var(--tracking-tighter)
    }

    .tracking-wide {
        --tw-tracking: var(--tracking-wide);
        letter-spacing: var(--tracking-wide)
    }

    .tracking-widest {
        --tw-tracking: var(--tracking-widest);
        letter-spacing: var(--tracking-widest)
    }

    .text-balance {
        text-wrap: balance
    }

    .text-pretty {
        text-wrap: pretty
    }

    .break-all {
        word-break: break-all
    }

    .whitespace-nowrap {
        white-space: nowrap
    }

    .whitespace-pre {
        white-space: pre
    }

    .text-accent-foreground {
        color: var(--accent-foreground)
    }

    .text-amber-500 {
        color: var(--color-amber-500)
    }

    .text-amber-600 {
        color: var(--color-amber-600)
    }

    .text-amber-700 {
        color: var(--color-amber-700)
    }

    .text-background {
        color: var(--background)
    }

    .text-blue-400 {
        color: var(--color-blue-400)
    }

    .text-card-foreground {
        color: var(--card-foreground)
    }

    .text-current {
        color: currentColor
    }

    .text-destructive {
        color: var(--destructive)
    }

    .text-foreground,.text-foreground\/60 {
        color: var(--foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .text-foreground\/60 {
            color:color-mix(in oklab, var(--foreground) 60%, transparent)
        }
    }

    .text-gray-700 {
        color: var(--color-gray-700)
    }

    .text-green-500 {
        color: var(--color-green-500)
    }

    .text-green-600 {
        color: var(--color-green-600)
    }

    .text-green-700 {
        color: var(--color-green-700)
    }

    .text-muted-foreground,.text-muted-foreground\/50 {
        color: var(--muted-foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .text-muted-foreground\/50 {
            color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)
        }
    }

    .text-muted-foreground\/80 {
        color: var(--muted-foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .text-muted-foreground\/80 {
            color:color-mix(in oklab, var(--muted-foreground) 80%, transparent)
        }
    }

    .text-popover-foreground {
        color: var(--popover-foreground)
    }

    .text-primary {
        color: var(--primary)
    }

    .text-primary-foreground {
        color: var(--primary-foreground)
    }

    .text-red-500 {
        color: var(--color-red-500)
    }

    .text-red-700 {
        color: var(--color-red-700)
    }

    .text-secondary-foreground {
        color: var(--secondary-foreground)
    }

    .text-sidebar-accent-foreground {
        color: var(--sidebar-accent-foreground)
    }

    .text-sidebar-foreground,.text-sidebar-foreground\/70 {
        color: var(--sidebar-foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .text-sidebar-foreground\/70 {
            color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)
        }
    }

    .text-white {
        color: var(--color-white)
    }

    .text-zinc-400 {
        color: var(--color-zinc-400)
    }

    .capitalize {
        text-transform: capitalize
    }

    .italic {
        font-style: italic
    }

    .tabular-nums {
        --tw-numeric-spacing: tabular-nums;
        font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)
    }

    .underline {
        text-decoration-line: underline
    }

    .underline-offset-4 {
        text-underline-offset: 4px
    }

    .opacity-0 {
        opacity: 0
    }

    .opacity-50 {
        opacity: .5
    }

    .opacity-60 {
        opacity: .6
    }

    .opacity-100 {
        opacity: 1
    }

    .bg-blend-color {
        background-blend-mode: color
    }

    .shadow {
        --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .shadow-2xl {
        --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color,#00000040);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .shadow-\[0_0_0_1px_hsl\(var\(--sidebar-border\)\)\] {
        --tw-shadow: 0 0 0 1px var(--tw-shadow-color,hsl(var(--sidebar-border)));
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .shadow-lg {
        --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .shadow-md {
        --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .shadow-none {
        --tw-shadow: 0 0 #0000;
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .shadow-none\! {
        --tw-shadow: 0 0 #0000!important;
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important
    }

    .shadow-sm {
        --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .shadow-xs {
        --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color,#0000000d);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .ring {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .ring-0 {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .ring-1 {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .ring-2 {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .ring-background {
        --tw-ring-color: var(--background)
    }

    .ring-foreground\/5 {
        --tw-ring-color: var(--foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .ring-foreground\/5 {
            --tw-ring-color:color-mix(in oklab, var(--foreground) 5%, transparent)
        }
    }

    .ring-foreground\/10 {
        --tw-ring-color: var(--foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .ring-foreground\/10 {
            --tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)
        }
    }

    .ring-input {
        --tw-ring-color: var(--input)
    }

    .ring-ring\/30 {
        --tw-ring-color: var(--ring)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .ring-ring\/30 {
            --tw-ring-color:color-mix(in oklab, var(--ring) 30%, transparent)
        }
    }

    .ring-ring\/40 {
        --tw-ring-color: var(--ring)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .ring-ring\/40 {
            --tw-ring-color:color-mix(in oklab, var(--ring) 40%, transparent)
        }
    }

    .ring-ring\/50 {
        --tw-ring-color: var(--ring)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .ring-ring\/50 {
            --tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)
        }
    }

    .ring-ring\/70 {
        --tw-ring-color: var(--ring)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .ring-ring\/70 {
            --tw-ring-color:color-mix(in oklab, var(--ring) 70%, transparent)
        }
    }

    .ring-sidebar-ring {
        --tw-ring-color: var(--sidebar-ring)
    }

    .outline-hidden {
        --tw-outline-style: none;
        outline-style: none
    }

    @media (forced-colors:active) {
        .outline-hidden {
            outline-offset: 2px;
            outline: 2px solid #0000
        }
    }

    .outline {
        outline-style: var(--tw-outline-style);
        outline-width: 1px
    }

    .blur {
        --tw-blur: blur(8px);
        filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)
    }

    .drop-shadow-2xl {
        --tw-drop-shadow-size: drop-shadow(0 25px 25px var(--tw-drop-shadow-color,#00000026));
        --tw-drop-shadow: drop-shadow(var(--drop-shadow-2xl));
        filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)
    }

    .filter {
        filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)
    }

    .backdrop-blur-md {
        --tw-backdrop-blur: blur(var(--blur-md));
        -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
        backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)
    }

    .transition {
        transition-property: color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-\[color\,box-shadow\] {
        transition-property: color,box-shadow;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-\[left\,right\,width\] {
        transition-property: left,right,width;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-\[margin\,opacity\] {
        transition-property: margin,opacity;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-\[width\,height\,padding\] {
        transition-property: width,height,padding;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-\[width\] {
        transition-property: width;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-all {
        transition-property: all;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-colors {
        transition-property: color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-opacity {
        transition-property: opacity;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-shadow {
        transition-property: box-shadow;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-transform {
        transition-property: transform,translate,scale,rotate;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .transition-none {
        transition-property: none
    }

    .duration-100 {
        --tw-duration: .1s;
        transition-duration: .1s
    }

    .duration-200 {
        --tw-duration: .2s;
        transition-duration: .2s
    }

    .duration-300 {
        --tw-duration: .3s;
        transition-duration: .3s
    }

    .ease-in-out {
        --tw-ease: var(--ease-in-out);
        transition-timing-function: var(--ease-in-out)
    }

    .ease-linear {
        --tw-ease: linear;
        transition-timing-function: linear
    }

    .ease-out {
        --tw-ease: var(--ease-out);
        transition-timing-function: var(--ease-out)
    }

    .outline-none {
        --tw-outline-style: none;
        outline-style: none
    }

    .select-none {
        -webkit-user-select: none;
        user-select: none
    }

    .\[--color\: var\(--muted-foreground\)\] {
        --color:var(--muted-foreground)
    }

    .\[--shimmering-color\: var\(--foreground\)\] {
        --shimmering-color:var(--foreground)
    }

    .paused {
        animation-play-state: paused
    }

    .running {
        animation-play-state: running
    }

    :is(.\*\: not-first\:mt-2>*):not(:first-child) {
        margin-top:calc(var(--spacing) * 2)
    }

    .group-focus-within\/menu-item\: opacity-100:is(:where(.group\/menu-item):focus-within *) {
        opacity:1
    }

    @media (hover: hover) {
        .group-hover\/menu-item\:opacity-100:is(:where(.group\/menu-item):hover *) {
            opacity:1
        }
    }

    .group-focus\/dropdown-menu-item\: text-accent-foreground:is(:where(.group\/dropdown-menu-item):focus *) {
        color:var(--accent-foreground)
    }

    .group-has-disabled\/field\: opacity-50:is(:where(.group\/field):has(:disabled) *) {
        opacity:.5
    }

    .group-has-data-\[sidebar\=menu-action\]\/menu-item\: pr-8:is(:where(.group\/menu-item):has([data-sidebar=menu-action]) *) {
        padding-right:calc(var(--spacing) * 8)
    }

    .group-has-data-\[size\=lg\]\/avatar-group\: size-10:is(:where(.group\/avatar-group):has([data-size=lg]) *) {
        width:calc(var(--spacing) * 10);
        height: calc(var(--spacing) * 10)
    }

    .group-has-data-\[size\=sm\]\/avatar-group\: size-6:is(:where(.group\/avatar-group):has([data-size=sm]) *) {
        width:calc(var(--spacing) * 6);
        height: calc(var(--spacing) * 6)
    }

    .group-has-data-\[slot\=combobox-clear\]\/input-group\: hidden:is(:where(.group\/input-group):has([data-slot=combobox-clear]) *),.group-has-data-\[slot\=command-shortcut\]\/command-item\:hidden:is(:where(.group\/command-item):has([data-slot=command-shortcut]) *) {
        display:none
    }

    .group-has-data-\[slot\=item-description\]\/item\: translate-y-0\.5:is(:where(.group\/item):has([data-slot=item-description]) *) {
        --tw-translate-y:calc(var(--spacing) * .5);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .group-has-data-\[slot\=item-description\]\/item\: self-start:is(:where(.group\/item):has([data-slot=item-description]) *) {
        align-self:flex-start
    }

    .group-has-\[\>input\]\/input-group\: pt-2:is(:where(.group\/input-group):has(>input) *) {
        padding-top:calc(var(--spacing) * 2)
    }

    .group-has-\[\>input\]\/input-group\: pb-2:is(:where(.group\/input-group):has(>input) *) {
        padding-bottom:calc(var(--spacing) * 2)
    }

    .group-data-empty\/combobox-content\: flex:is(:where(.group\/combobox-content)[data-empty] *) {
        display:flex
    }

    .group-data-\[checked\=true\]\/command-item\: opacity-100:is(:where(.group\/command-item)[data-checked=true] *) {
        opacity:1
    }

    .group-data-\[collapsible\=icon\]\: -mt-8:is(:where(.group)[data-collapsible=icon] *) {
        margin-top:calc(var(--spacing) * -8)
    }

    .group-data-\[collapsible\=icon\]\: hidden:is(:where(.group)[data-collapsible=icon] *) {
        display:none
    }

    .group-data-\[collapsible\=icon\]\: size-8\!:is(:where(.group)[data-collapsible=icon] *) {
        width:calc(var(--spacing) * 8)!important;
        height: calc(var(--spacing) * 8)!important
    }

    .group-data-\[collapsible\=icon\]\: w-\(--sidebar-width-icon\):is(:where(.group)[data-collapsible=icon] *) {
        width:var(--sidebar-width-icon)
    }

    .group-data-\[collapsible\=icon\]\: w-\[calc\(var\(--sidebar-width-icon\)\+\(--spacing\(4\)\)\)\]:is(:where(.group)[data-collapsible=icon] *) {
        width:calc(var(--sidebar-width-icon) + (calc(var(--spacing) * 4)))
    }

    .group-data-\[collapsible\=icon\]\: w-\[calc\(var\(--sidebar-width-icon\)\+\(--spacing\(4\)\)\+2px\)\]:is(:where(.group)[data-collapsible=icon] *) {
        width:calc(var(--sidebar-width-icon) + (calc(var(--spacing) * 4)) + 2px)
    }

    .group-data-\[collapsible\=icon\]\: overflow-hidden:is(:where(.group)[data-collapsible=icon] *) {
        overflow:hidden
    }

    .group-data-\[collapsible\=icon\]\: p-0\!:is(:where(.group)[data-collapsible=icon] *) {
        padding:calc(var(--spacing) * 0)!important
    }

    .group-data-\[collapsible\=icon\]\: p-2\!:is(:where(.group)[data-collapsible=icon] *) {
        padding:calc(var(--spacing) * 2)!important
    }

    .group-data-\[collapsible\=icon\]\: opacity-0:is(:where(.group)[data-collapsible=icon] *) {
        opacity:0
    }

    .group-data-\[collapsible\=offcanvas\]\: w-0:is(:where(.group)[data-collapsible=offcanvas] *) {
        width:calc(var(--spacing) * 0)
    }

    .group-data-\[collapsible\=offcanvas\]\: translate-x-0:is(:where(.group)[data-collapsible=offcanvas] *) {
        --tw-translate-x:calc(var(--spacing) * 0);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .group-data-\[disabled\=true\]\: pointer-events-none:is(:where(.group)[data-disabled=true] *) {
        pointer-events:none
    }

    .group-data-\[disabled\=true\]\: opacity-50:is(:where(.group)[data-disabled=true] *),.group-data-\[disabled\=true\]\/input-group\:opacity-50:is(:where(.group\/input-group)[data-disabled=true] *) {
        opacity:.5
    }

    .group-data-\[side\=left\]\: -right-4:is(:where(.group)[data-side=left] *) {
        right:calc(var(--spacing) * -4)
    }

    .group-data-\[side\=left\]\: border-r:is(:where(.group)[data-side=left] *) {
        border-right-style:var(--tw-border-style);
        border-right-width: 1px
    }

    .group-data-\[side\=right\]\: left-0:is(:where(.group)[data-side=right] *) {
        left:calc(var(--spacing) * 0)
    }

    .group-data-\[side\=right\]\: rotate-180:is(:where(.group)[data-side=right] *) {
        rotate:180deg
    }

    .group-data-\[side\=right\]\: border-l:is(:where(.group)[data-side=right] *) {
        border-left-style:var(--tw-border-style);
        border-left-width: 1px
    }

    .group-data-\[size\=default\]\/avatar\: size-2\.5:is(:where(.group\/avatar)[data-size=default] *) {
        width:calc(var(--spacing) * 2.5);
        height: calc(var(--spacing) * 2.5)
    }

    .group-data-\[size\=default\]\/switch\: size-4:is(:where(.group\/switch)[data-size=default] *) {
        width:calc(var(--spacing) * 4);
        height: calc(var(--spacing) * 4)
    }

    .group-data-\[size\=lg\]\/avatar\: size-3:is(:where(.group\/avatar)[data-size=lg] *) {
        width:calc(var(--spacing) * 3);
        height: calc(var(--spacing) * 3)
    }

    .group-data-\[size\=sm\]\/alert-dialog-content\: grid:is(:where(.group\/alert-dialog-content)[data-size=sm] *) {
        display:grid
    }

    .group-data-\[size\=sm\]\/alert-dialog-content\: grid-cols-2:is(:where(.group\/alert-dialog-content)[data-size=sm] *) {
        grid-template-columns:repeat(2,minmax(0,1fr))
    }

    .group-data-\[size\=sm\]\/avatar\: size-2:is(:where(.group\/avatar)[data-size=sm] *) {
        width:calc(var(--spacing) * 2);
        height: calc(var(--spacing) * 2)
    }

    .group-data-\[size\=sm\]\/avatar\: text-xs:is(:where(.group\/avatar)[data-size=sm] *) {
        font-size:var(--text-xs);
        line-height: var(--tw-leading,var(--text-xs--line-height))
    }

    .group-data-\[size\=sm\]\/card\: px-4:is(:where(.group\/card)[data-size=sm] *) {
        padding-inline:calc(var(--spacing) * 4)
    }

    .group-data-\[size\=sm\]\/item\: size-8:is(:where(.group\/item)[data-size=sm] *) {
        width:calc(var(--spacing) * 8);
        height: calc(var(--spacing) * 8)
    }

    .group-data-\[size\=sm\]\/switch\: size-3:is(:where(.group\/switch)[data-size=sm] *) {
        width:calc(var(--spacing) * 3);
        height: calc(var(--spacing) * 3)
    }

    .group-data-\[size\=xs\]\/item\: size-6:is(:where(.group\/item)[data-size=xs] *) {
        width:calc(var(--spacing) * 6);
        height: calc(var(--spacing) * 6)
    }

    .group-data-\[size\=xs\]\/item\: gap-0\.5:is(:where(.group\/item)[data-size=xs] *) {
        gap:calc(var(--spacing) * .5)
    }

    .group-data-\[size\=xs\]\/item\: rounded-md:is(:where(.group\/item)[data-size=xs] *) {
        border-radius:calc(var(--radius) * .8)
    }

    .group-data-\[variant\=floating\]\: rounded-lg:is(:where(.group)[data-variant=floating] *) {
        border-radius:var(--radius)
    }

    .group-data-\[variant\=floating\]\: shadow-sm:is(:where(.group)[data-variant=floating] *) {
        --tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .group-data-\[variant\=floating\]\: ring-1:is(:where(.group)[data-variant=floating] *) {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .group-data-\[variant\=floating\]\: ring-sidebar-border:is(:where(.group)[data-variant=floating] *) {
        --tw-ring-color:var(--sidebar-border)
    }

    .group-data-\[variant\=line\]\/tabs-list\: bg-transparent:is(:where(.group\/tabs-list)[data-variant=line] *) {
        background-color:#0000
    }

    .group-data-\[vaul-drawer-direction\=bottom\]\/drawer-content\: block:is(:where(.group\/drawer-content)[data-vaul-drawer-direction=bottom] *) {
        display:block
    }

    .group-data-\[vaul-drawer-direction\=bottom\]\/drawer-content\: text-center:is(:where(.group\/drawer-content)[data-vaul-drawer-direction=bottom] *),.group-data-\[vaul-drawer-direction\=top\]\/drawer-content\:text-center:is(:where(.group\/drawer-content)[data-vaul-drawer-direction=top] *) {
        text-align:center
    }

    .group-data-selected\/command-item\: text-foreground:is(:where(.group\/command-item):where([data-selected=true]) *) {
        color:var(--foreground)
    }

    .group-data-horizontal\/tabs\: h-9:is(:where(.group\/tabs):where([data-orientation=horizontal]) *) {
        height:calc(var(--spacing) * 9)
    }

    .group-data-vertical\/tabs\: h-fit:is(:where(.group\/tabs):where([data-orientation=vertical]) *) {
        height:fit-content
    }

    .group-data-vertical\/tabs\: w-full:is(:where(.group\/tabs):where([data-orientation=vertical]) *) {
        width:100%
    }

    .group-data-vertical\/tabs\: flex-col:is(:where(.group\/tabs):where([data-orientation=vertical]) *) {
        flex-direction:column
    }

    .group-data-vertical\/tabs\: justify-start:is(:where(.group\/tabs):where([data-orientation=vertical]) *) {
        justify-content:flex-start
    }

    .group-data-vertical\/tabs\: rounded-2xl:is(:where(.group\/tabs):where([data-orientation=vertical]) *) {
        border-radius:calc(var(--radius) * 1.8)
    }

    .group-data-vertical\/tabs\: px-2\.5:is(:where(.group\/tabs):where([data-orientation=vertical]) *) {
        padding-inline:calc(var(--spacing) * 2.5)
    }

    .group-data-vertical\/tabs\: py-1\.5:is(:where(.group\/tabs):where([data-orientation=vertical]) *) {
        padding-block:calc(var(--spacing) * 1.5)
    }

    @media (hover: hover) {
        .peer-hover\/menu-button\:text-sidebar-accent-foreground:is(:where(.peer\/menu-button):hover~*) {
            color:var(--sidebar-accent-foreground)
        }
    }

    .peer-disabled\: cursor-not-allowed:is(:where(.peer):disabled~*) {
        cursor:not-allowed
    }

    .peer-disabled\: opacity-50:is(:where(.peer):disabled~*) {
        opacity:.5
    }

    .peer-data-\[size\=default\]\/menu-button\: top-1\.5:is(:where(.peer\/menu-button)[data-size=default]~*) {
        top:calc(var(--spacing) * 1.5)
    }

    .peer-data-\[size\=lg\]\/menu-button\: top-2\.5:is(:where(.peer\/menu-button)[data-size=lg]~*) {
        top:calc(var(--spacing) * 2.5)
    }

    .peer-data-\[size\=sm\]\/menu-button\: top-1:is(:where(.peer\/menu-button)[data-size=sm]~*) {
        top:calc(var(--spacing) * 1)
    }

    .peer-data-active\/menu-button\: text-sidebar-accent-foreground:is(:is(:where(.peer\/menu-button):where([data-state=active]),:where(.peer\/menu-button):where([data-active]:not([data-active=false])))~*) {
        color:var(--sidebar-accent-foreground)
    }

    .file\: inline-flex::file-selector-button {
        display:inline-flex
    }

    .file\: h-7::file-selector-button {
        height:calc(var(--spacing) * 7)
    }

    .file\: border-0::file-selector-button {
        border-style:var(--tw-border-style);
        border-width: 0
    }

    .file\: bg-transparent::file-selector-button {
        background-color:#0000
    }

    .file\: text-sm::file-selector-button {
        font-size:var(--text-sm);
        line-height: var(--tw-leading,var(--text-sm--line-height))
    }

    .file\: font-medium::file-selector-button {
        --tw-font-weight:var(--font-weight-medium);
        font-weight: var(--font-weight-medium)
    }

    .file\: text-foreground::file-selector-button {
        color:var(--foreground)
    }

    .placeholder\: text-muted-foreground::placeholder,.placeholder\:text-muted-foreground\/70::placeholder {
        color:var(--muted-foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .placeholder\:text-muted-foreground\/70::placeholder {
            color:color-mix(in oklab, var(--muted-foreground) 70%, transparent)
        }
    }

    .before\: pointer-events-none:before {
        content:var(--tw-content);
        pointer-events: none
    }

    .before\: absolute:before {
        content:var(--tw-content);
        position: absolute
    }

    .before\: inset-0:before {
        content:var(--tw-content);
        inset: calc(var(--spacing) * 0)
    }

    .before\: inset-2:before {
        content:var(--tw-content);
        inset: calc(var(--spacing) * 2)
    }

    .before\: -z-1:before {
        content:var(--tw-content);
        z-index: calc(1 * -1)
    }

    .before\: -z-10:before {
        content:var(--tw-content);
        z-index: calc(10 * -1)
    }

    .before\: rounded-4xl:before {
        content:var(--tw-content);
        border-radius: calc(var(--radius) * 2.6)
    }

    .before\: rounded-\[inherit\]:before {
        content:var(--tw-content);
        border-radius: inherit
    }

    .before\: border:before {
        content:var(--tw-content);
        border-style: var(--tw-border-style);
        border-width: 1px
    }

    .before\: border-border:before {
        content:var(--tw-content);
        border-color: var(--border)
    }

    .before\: bg-popover:before {
        content:var(--tw-content);
        background-color: var(--popover)
    }

    .before\: backdrop-blur-2xl:before {
        content:var(--tw-content);
        --tw-backdrop-blur: blur(var(--blur-2xl));
        -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
        backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)
    }

    .before\: backdrop-saturate-150:before {
        content:var(--tw-content);
        --tw-backdrop-saturate: saturate(150%);
        -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
        backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)
    }

    .after\: absolute:after {
        content:var(--tw-content);
        position: absolute
    }

    .after\: -inset-2:after {
        content:var(--tw-content);
        inset: calc(var(--spacing) * -2)
    }

    .after\: inset-0:after {
        content:var(--tw-content);
        inset: calc(var(--spacing) * 0)
    }

    .after\: -inset-x-3:after {
        content:var(--tw-content);
        inset-inline: calc(var(--spacing) * -3)
    }

    .after\: -inset-y-2:after {
        content:var(--tw-content);
        inset-block: calc(var(--spacing) * -2)
    }

    .after\: inset-y-0:after {
        content:var(--tw-content);
        inset-block: calc(var(--spacing) * 0)
    }

    .after\: inset-s-1\/2:after {
        content:var(--tw-content);
        inset-inline-start: 50%
    }

    .after\: rounded-full:after {
        content:var(--tw-content);
        border-radius: 3.40282e38px
    }

    .after\: border:after {
        content:var(--tw-content);
        border-style: var(--tw-border-style);
        border-width: 1px
    }

    .after\: border-border:after {
        content:var(--tw-content);
        border-color: var(--border)
    }

    .after\: bg-foreground:after {
        content:var(--tw-content);
        background-color: var(--foreground)
    }

    .after\: opacity-0:after {
        content:var(--tw-content);
        opacity: 0
    }

    .after\: mix-blend-darken:after {
        content:var(--tw-content);
        mix-blend-mode: darken
    }

    .after\: transition-opacity:after {
        content:var(--tw-content);
        transition-property: opacity;
        transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
        transition-duration: var(--tw-duration,var(--default-transition-duration))
    }

    .group-data-\[collapsible\=offcanvas\]\: after\:left-full:is(:where(.group)[data-collapsible=offcanvas] *):after {
        content:var(--tw-content);
        left: 100%
    }

    .group-data-horizontal\/tabs\: after\:inset-x-0:is(:where(.group\/tabs):where([data-orientation=horizontal]) *):after {
        content:var(--tw-content);
        inset-inline: calc(var(--spacing) * 0)
    }

    .group-data-horizontal\/tabs\: after\:bottom-\[-5px\]:is(:where(.group\/tabs):where([data-orientation=horizontal]) *):after {
        content:var(--tw-content);
        bottom: -5px
    }

    .group-data-horizontal\/tabs\: after\:h-0\.5:is(:where(.group\/tabs):where([data-orientation=horizontal]) *):after {
        content:var(--tw-content);
        height: calc(var(--spacing) * .5)
    }

    .group-data-vertical\/tabs\: after\:inset-y-0:is(:where(.group\/tabs):where([data-orientation=vertical]) *):after {
        content:var(--tw-content);
        inset-block: calc(var(--spacing) * 0)
    }

    .group-data-vertical\/tabs\: after\:-right-1:is(:where(.group\/tabs):where([data-orientation=vertical]) *):after {
        content:var(--tw-content);
        right: calc(var(--spacing) * -1)
    }

    .group-data-vertical\/tabs\: after\:w-0\.5:is(:where(.group\/tabs):where([data-orientation=vertical]) *):after {
        content:var(--tw-content);
        width: calc(var(--spacing) * .5)
    }

    .last\: border-b-0:last-child {
        border-bottom-style:var(--tw-border-style);
        border-bottom-width: 0
    }

    .focus-within\: border-ring:focus-within {
        border-color:var(--ring)
    }

    .focus-within\: ring-3:focus-within {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .focus-within\: ring-ring\/50:focus-within {
        --tw-ring-color:var(--ring)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .focus-within\:ring-ring\/50:focus-within {
            --tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)
        }
    }

    @media (hover: hover) {
        .hover\:scale-105:hover {
            --tw-scale-x:105%;
            --tw-scale-y: 105%;
            --tw-scale-z: 105%;
            scale: var(--tw-scale-x) var(--tw-scale-y)
        }

        .hover\:border-primary\/50:hover {
            border-color: var(--primary)
        }

        @supports (color: color-mix(in lab, red, red)) {
            .hover\:border-primary\/50:hover {
                border-color:color-mix(in oklab, var(--primary) 50%, transparent)
            }
        }

        .hover\:bg-accent:hover {
            background-color: var(--accent)
        }

        .hover\:bg-background:hover {
            background-color: var(--background)
        }

        .hover\:bg-destructive\/20:hover {
            background-color: var(--destructive)
        }

        @supports (color: color-mix(in lab, red, red)) {
            .hover\:bg-destructive\/20:hover {
                background-color:color-mix(in oklab, var(--destructive) 20%, transparent)
            }
        }

        .hover\:bg-input\/50:hover {
            background-color: var(--input)
        }

        @supports (color: color-mix(in lab, red, red)) {
            .hover\:bg-input\/50:hover {
                background-color:color-mix(in oklab, var(--input) 50%, transparent)
            }
        }

        .hover\:bg-muted:hover,.hover\:bg-muted\/50:hover {
            background-color: var(--muted)
        }

        @supports (color: color-mix(in lab, red, red)) {
            .hover\:bg-muted\/50:hover {
                background-color:color-mix(in oklab, var(--muted) 50%, transparent)
            }
        }

        .hover\:bg-primary\/80:hover {
            background-color: var(--primary)
        }

        @supports (color: color-mix(in lab, red, red)) {
            .hover\:bg-primary\/80:hover {
                background-color:color-mix(in oklab, var(--primary) 80%, transparent)
            }
        }

        .hover\:bg-secondary\/80:hover {
            background-color: var(--secondary)
        }

        @supports (color: color-mix(in lab, red, red)) {
            .hover\:bg-secondary\/80:hover {
                background-color:color-mix(in oklab, var(--secondary) 80%, transparent)
            }
        }

        .hover\:bg-sidebar-accent:hover {
            background-color: var(--sidebar-accent)
        }

        .hover\:text-accent-foreground:hover {
            color: var(--accent-foreground)
        }

        .hover\:text-foreground:hover {
            color: var(--foreground)
        }

        .hover\:text-muted-foreground:hover {
            color: var(--muted-foreground)
        }

        .hover\:text-sidebar-accent-foreground:hover {
            color: var(--sidebar-accent-foreground)
        }

        .hover\:underline:hover {
            text-decoration-line: underline
        }

        .hover\:opacity-100:hover {
            opacity: 1
        }

        .hover\:shadow-\[0_0_0_1px_hsl\(var\(--sidebar-accent\)\)\]: hover {
            --tw-shadow:0 0 0 1px var(--tw-shadow-color,hsl(var(--sidebar-accent)));
            box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
        }

        .hover\:ring-4:hover {
            --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
            box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
        }

        .hover\:group-data-\[collapsible\=offcanvas\]\:bg-sidebar:hover:is(:where(.group)[data-collapsible=offcanvas] *) {
            background-color: var(--sidebar)
        }

        .hover\:after\:bg-sidebar-border:hover:after {
            content: var(--tw-content);
            background-color: var(--sidebar-border)
        }
    }

    .focus\: bg-accent:focus {
        background-color:var(--accent)
    }

    .focus\: text-accent-foreground:focus {
        color:var(--accent-foreground)
    }

    .focus\: ring-2:focus {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .focus\: ring-ring:focus {
        --tw-ring-color:var(--ring)
    }

    .focus\: ring-offset-2:focus {
        --tw-ring-offset-width:2px;
        --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)
    }

    .focus\: outline-none:focus {
        --tw-outline-style:none;
        outline-style: none
    }

    :is(.focus\: \*\*\:text-accent-foreground:focus *),:is(.not-data-\[variant\=destructive\]\:focus\:\*\*\:text-accent-foreground:not([data-variant=destructive]):focus *) {
        color:var(--accent-foreground)
    }

    .focus-visible\: border-destructive\/40:focus-visible {
        border-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .focus-visible\:border-destructive\/40:focus-visible {
            border-color:color-mix(in oklab, var(--destructive) 40%, transparent)
        }
    }

    .focus-visible\: border-ring:focus-visible {
        border-color:var(--ring)
    }

    .focus-visible\: ring-0:focus-visible {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .focus-visible\: ring-2:focus-visible {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .focus-visible\: ring-3:focus-visible {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .focus-visible\: ring-4:focus-visible {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .focus-visible\: ring-\[3px\]:focus-visible {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .focus-visible\: ring-destructive\/20:focus-visible {
        --tw-ring-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .focus-visible\:ring-destructive\/20:focus-visible {
            --tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)
        }
    }

    .focus-visible\: ring-red-500:focus-visible {
        --tw-ring-color:var(--color-red-500)
    }

    .focus-visible\: ring-ring\/50:focus-visible {
        --tw-ring-color:var(--ring)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .focus-visible\:ring-ring\/50:focus-visible {
            --tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)
        }
    }

    .focus-visible\: outline-hidden:focus-visible {
        --tw-outline-style:none;
        outline-style: none
    }

    @media (forced-colors:active) {
        .focus-visible\:outline-hidden:focus-visible {
            outline-offset: 2px;
            outline: 2px solid #0000
        }
    }

    .focus-visible\: outline-1:focus-visible {
        outline-style:var(--tw-outline-style);
        outline-width: 1px
    }

    .focus-visible\: outline-ring:focus-visible {
        outline-color:var(--ring)
    }

    .active\: scale-95:active {
        --tw-scale-x:95%;
        --tw-scale-y: 95%;
        --tw-scale-z: 95%;
        scale: var(--tw-scale-x) var(--tw-scale-y)
    }

    .active\: bg-sidebar-accent:active {
        background-color:var(--sidebar-accent)
    }

    .active\: text-sidebar-accent-foreground:active {
        color:var(--sidebar-accent-foreground)
    }

    .active\: not-aria-\[haspopup\]\:translate-y-px:active:not([aria-haspopup]) {
        --tw-translate-y:1px;
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .disabled\: pointer-events-none:disabled {
        pointer-events:none
    }

    .disabled\: cursor-not-allowed:disabled {
        cursor:not-allowed
    }

    .disabled\: opacity-50:disabled {
        opacity:.5
    }

    :where([data-side=left]) .in-data-\[side\=left\]\: cursor-w-resize {
        cursor:w-resize
    }

    :where([data-side=right]) .in-data-\[side\=right\]\: cursor-e-resize {
        cursor:e-resize
    }

    :where([data-slot=combobox-content]) .in-data-\[slot\=combobox-content\]\: focus-within\:border-inherit:focus-within {
        border-color:inherit
    }

    :where([data-slot=combobox-content]) .in-data-\[slot\=combobox-content\]\: focus-within\:ring-0:focus-within {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    :where([data-slot=dialog-content]) .in-data-\[slot\=dialog-content\]\: rounded-lg\! {
        border-radius:var(--radius)!important
    }

    :where([data-slot=dropdown-menu-content]) .in-data-\[slot\=dropdown-menu-content\]\: p-0 {
        padding:calc(var(--spacing) * 0)
    }

    .has-disabled\: pointer-events-none:has(:disabled) {
        pointer-events:none
    }

    .has-disabled\: cursor-not-allowed:has(:disabled) {
        cursor:not-allowed
    }

    .has-disabled\: opacity-50:has(:disabled) {
        opacity:.5
    }

    .has-aria-invalid\: border-destructive:has([aria-invalid=true]) {
        border-color:var(--destructive)
    }

    .has-aria-invalid\: ring-3:has([aria-invalid=true]) {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .has-aria-invalid\: ring-destructive\/20:has([aria-invalid=true]) {
        --tw-ring-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .has-aria-invalid\:ring-destructive\/20:has([aria-invalid=true]) {
            --tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)
        }
    }

    .has-data-\[icon\=inline-end\]\: pr-1\.5:has([data-icon=inline-end]) {
        padding-right:calc(var(--spacing) * 1.5)
    }

    .has-data-\[icon\=inline-end\]\: pr-2:has([data-icon=inline-end]) {
        padding-right:calc(var(--spacing) * 2)
    }

    .has-data-\[icon\=inline-end\]\: pr-2\.5:has([data-icon=inline-end]) {
        padding-right:calc(var(--spacing) * 2.5)
    }

    .has-data-\[icon\=inline-end\]\: pr-3:has([data-icon=inline-end]) {
        padding-right:calc(var(--spacing) * 3)
    }

    .has-data-\[icon\=inline-start\]\: pl-1\.5:has([data-icon=inline-start]) {
        padding-left:calc(var(--spacing) * 1.5)
    }

    .has-data-\[icon\=inline-start\]\: pl-2:has([data-icon=inline-start]) {
        padding-left:calc(var(--spacing) * 2)
    }

    .has-data-\[icon\=inline-start\]\: pl-2\.5:has([data-icon=inline-start]) {
        padding-left:calc(var(--spacing) * 2.5)
    }

    .has-data-\[icon\=inline-start\]\: pl-3:has([data-icon=inline-start]) {
        padding-left:calc(var(--spacing) * 3)
    }

    .has-data-\[size\=sm\]\: gap-2\.5:has([data-size=sm]) {
        gap:calc(var(--spacing) * 2.5)
    }

    .has-data-\[size\=xs\]\: gap-2:has([data-size=xs]) {
        gap:calc(var(--spacing) * 2)
    }

    .has-data-\[slot\=alert-dialog-media\]\: grid-rows-\[auto_auto_1fr\]:has([data-slot=alert-dialog-media]) {
        grid-template-rows:auto auto 1fr
    }

    .has-data-\[slot\=alert-dialog-media\]\: gap-x-6:has([data-slot=alert-dialog-media]) {
        column-gap:calc(var(--spacing) * 6)
    }

    .has-data-\[slot\=card-action\]\: grid-cols-\[1fr_auto\]:has([data-slot=card-action]) {
        grid-template-columns:1fr auto
    }

    .has-data-\[slot\=card-description\]\: grid-rows-\[auto_auto\]:has([data-slot=card-description]) {
        grid-template-rows:auto auto
    }

    .has-data-\[slot\=combobox-chip\]\: px-1\.5:has([data-slot=combobox-chip]) {
        padding-inline:calc(var(--spacing) * 1.5)
    }

    .has-data-\[slot\=combobox-chip-remove\]\: pr-0:has([data-slot=combobox-chip-remove]) {
        padding-right:calc(var(--spacing) * 0)
    }

    .has-data-\[variant\=inset\]\: bg-sidebar:has([data-variant=inset]) {
        background-color:var(--sidebar)
    }

    .has-\[\[data-slot\=input-group-control\]\: focus-visible\]\:border-ring:has([data-slot=input-group-control]:focus-visible) {
        border-color:var(--ring)
    }

    .has-\[\[data-slot\=input-group-control\]\: focus-visible\]\:ring-3:has([data-slot=input-group-control]:focus-visible) {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .has-\[\[data-slot\=input-group-control\]\: focus-visible\]\:ring-ring\/50:has([data-slot=input-group-control]:focus-visible) {
        --tw-ring-color:var(--ring)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .has-\[\[data-slot\=input-group-control\]\:focus-visible\]\:ring-ring\/50:has([data-slot=input-group-control]:focus-visible) {
            --tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)
        }
    }

    .has-\[\[data-slot\]\[aria-invalid\=true\]\]\: border-destructive:has([data-slot][aria-invalid=true]) {
        border-color:var(--destructive)
    }

    .has-\[\[data-slot\]\[aria-invalid\=true\]\]\: ring-3:has([data-slot][aria-invalid=true]) {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .has-\[\[data-slot\]\[aria-invalid\=true\]\]\: ring-destructive\/20:has([data-slot][aria-invalid=true]) {
        --tw-ring-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .has-\[\[data-slot\]\[aria-invalid\=true\]\]\:ring-destructive\/20:has([data-slot][aria-invalid=true]) {
            --tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)
        }
    }

    .has-\[\>\[data-align\=block-end\]\]\: h-auto:has(>[data-align=block-end]) {
        height:auto
    }

    .has-\[\>\[data-align\=block-end\]\]\: flex-col:has(>[data-align=block-end]) {
        flex-direction:column
    }

    .has-\[\>\[data-align\=block-start\]\]\: h-auto:has(>[data-align=block-start]) {
        height:auto
    }

    .has-\[\>\[data-align\=block-start\]\]\: flex-col:has(>[data-align=block-start]) {
        flex-direction:column
    }

    .has-\[\>button\]\: -mr-1:has(>button) {
        margin-right:calc(var(--spacing) * -1)
    }

    .has-\[\>button\]\: -ml-1:has(>button) {
        margin-left:calc(var(--spacing) * -1)
    }

    .has-\[\>img\: first-child\]\:pt-0:has(>img:first-child) {
        padding-top:calc(var(--spacing) * 0)
    }

    .has-\[\>kbd\]\: mr-\[-0\.15rem\]:has(>kbd) {
        margin-right:-.15rem
    }

    .has-\[\>kbd\]\: ml-\[-0\.15rem\]:has(>kbd) {
        margin-left:-.15rem
    }

    .has-\[\>svg\]\: p-0:has(>svg) {
        padding:calc(var(--spacing) * 0)
    }

    .has-\[\>textarea\]\: h-auto:has(>textarea) {
        height:auto
    }

    .aria-disabled\: pointer-events-none[aria-disabled=true] {
        pointer-events:none
    }

    .aria-disabled\: opacity-50[aria-disabled=true] {
        opacity:.5
    }

    .aria-expanded\: bg-muted[aria-expanded=true] {
        background-color:var(--muted)
    }

    .aria-expanded\: bg-secondary[aria-expanded=true] {
        background-color:var(--secondary)
    }

    .aria-expanded\: text-foreground[aria-expanded=true] {
        color:var(--foreground)
    }

    .aria-expanded\: text-secondary-foreground[aria-expanded=true] {
        color:var(--secondary-foreground)
    }

    .aria-expanded\: opacity-100[aria-expanded=true] {
        opacity:1
    }

    .aria-invalid\: border-destructive[aria-invalid=true] {
        border-color:var(--destructive)
    }

    .aria-invalid\: ring-0[aria-invalid=true] {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .aria-invalid\: ring-3[aria-invalid=true],.aria-invalid\:ring-\[3px\][aria-invalid=true] {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    .aria-invalid\: ring-destructive\/20[aria-invalid=true] {
        --tw-ring-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .aria-invalid\:ring-destructive\/20[aria-invalid=true] {
            --tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)
        }
    }

    .aria-invalid\: aria-checked\:border-primary[aria-invalid=true][aria-checked=true] {
        border-color:var(--primary)
    }

    .aria-pressed\: bg-muted[aria-pressed=true] {
        background-color:var(--muted)
    }

    .data-empty\: p-0[data-empty] {
        padding:calc(var(--spacing) * 0)
    }

    .data-ending-style\: opacity-0[data-ending-style] {
        opacity:0
    }

    .data-highlighted\: bg-accent[data-highlighted] {
        background-color:var(--accent)
    }

    .data-highlighted\: text-accent-foreground[data-highlighted],:is(.not-data-\[variant\=destructive\]\:data-highlighted\:\*\*\:text-accent-foreground:not([data-variant=destructive])[data-highlighted] *) {
        color:var(--accent-foreground)
    }

    .data-inset\: pl-8[data-inset] {
        padding-left:calc(var(--spacing) * 8)
    }

    .data-placeholder\: text-muted-foreground[data-placeholder] {
        color:var(--muted-foreground)
    }

    .data-popup-open\: bg-accent[data-popup-open] {
        background-color:var(--accent)
    }

    .data-popup-open\: text-accent-foreground[data-popup-open] {
        color:var(--accent-foreground)
    }

    .data-pressed\: bg-transparent[data-pressed] {
        background-color:#0000
    }

    .data-starting-style\: opacity-0[data-starting-style] {
        opacity:0
    }

    .data-\[align-trigger\=true\]\: animate-none[data-align-trigger=true] {
        animation:none
    }

    .data-\[chips\=true\]\: min-w-\(--anchor-width\)[data-chips=true] {
        min-width:var(--anchor-width)
    }

    .data-\[disabled\=true\]\: pointer-events-none[data-disabled=true] {
        pointer-events:none
    }

    .data-\[disabled\=true\]\: opacity-50[data-disabled=true] {
        opacity:.5
    }

    .data-\[side\=bottom\]\: inset-x-0[data-side=bottom] {
        inset-inline:calc(var(--spacing) * 0)
    }

    .data-\[side\=bottom\]\: top-1[data-side=bottom] {
        top:calc(var(--spacing) * 1)
    }

    .data-\[side\=bottom\]\: bottom-0[data-side=bottom] {
        bottom:calc(var(--spacing) * 0)
    }

    .data-\[side\=bottom\]\: h-auto[data-side=bottom] {
        height:auto
    }

    .data-\[side\=bottom\]\: h-full[data-side=bottom] {
        height:100%
    }

    .data-\[side\=bottom\]\: border-t[data-side=bottom] {
        border-top-style:var(--tw-border-style);
        border-top-width: 1px
    }

    .data-\[side\=bottom\]\: slide-in-from-top-2[data-side=bottom] {
        --tw-enter-translate-y:calc(2*var(--spacing)*-1)
    }

    .data-\[side\=inline-end\]\: top-1\/2\![data-side=inline-end] {
        top:50%!important
    }

    .data-\[side\=inline-end\]\: -left-1[data-side=inline-end] {
        left:calc(var(--spacing) * -1)
    }

    .data-\[side\=inline-end\]\: -translate-y-1\/2[data-side=inline-end] {
        --tw-translate-y:calc(calc(1 / 2 * 100%) * -1);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .data-\[side\=inline-end\]\: slide-in-from-left-2[data-side=inline-end] {
        --tw-enter-translate-x:calc(2*var(--spacing)*-1)
    }

    .data-\[side\=inline-start\]\: top-1\/2\![data-side=inline-start] {
        top:50%!important
    }

    .data-\[side\=inline-start\]\: -right-1[data-side=inline-start] {
        right:calc(var(--spacing) * -1)
    }

    .data-\[side\=inline-start\]\: -translate-y-1\/2[data-side=inline-start] {
        --tw-translate-y:calc(calc(1 / 2 * 100%) * -1);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .data-\[side\=inline-start\]\: slide-in-from-right-2[data-side=inline-start] {
        --tw-enter-translate-x:calc(2*var(--spacing))
    }

    .data-\[side\=left\]\: inset-y-0[data-side=left] {
        inset-block:calc(var(--spacing) * 0)
    }

    .data-\[side\=left\]\: top-1\/2\![data-side=left] {
        top:50%!important
    }

    .data-\[side\=left\]\: -right-1[data-side=left] {
        right:calc(var(--spacing) * -1)
    }

    .data-\[side\=left\]\: left-0[data-side=left] {
        left:calc(var(--spacing) * 0)
    }

    .data-\[side\=left\]\: h-full[data-side=left] {
        height:100%
    }

    .data-\[side\=left\]\: w-3\/4[data-side=left] {
        width:75%
    }

    .data-\[side\=left\]\: -translate-y-1\/2[data-side=left] {
        --tw-translate-y:calc(calc(1 / 2 * 100%) * -1);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .data-\[side\=left\]\: border-r[data-side=left] {
        border-right-style:var(--tw-border-style);
        border-right-width: 1px
    }

    .data-\[side\=left\]\: slide-in-from-right-2[data-side=left] {
        --tw-enter-translate-x:calc(2*var(--spacing))
    }

    .data-\[side\=left\]\: group-data-\[collapsible\=offcanvas\]\:left-\[calc\(var\(--sidebar-width\)\*-1\)\][data-side=left]:is(:where(.group)[data-collapsible=offcanvas] *) {
        left:calc(var(--sidebar-width) * -1)
    }

    .data-\[side\=right\]\: inset-y-0[data-side=right] {
        inset-block:calc(var(--spacing) * 0)
    }

    .data-\[side\=right\]\: top-1\/2\![data-side=right] {
        top:50%!important
    }

    .data-\[side\=right\]\: right-0[data-side=right] {
        right:calc(var(--spacing) * 0)
    }

    .data-\[side\=right\]\: -left-1[data-side=right] {
        left:calc(var(--spacing) * -1)
    }

    .data-\[side\=right\]\: h-full[data-side=right] {
        height:100%
    }

    .data-\[side\=right\]\: w-3\/4[data-side=right] {
        width:75%
    }

    .data-\[side\=right\]\: -translate-y-1\/2[data-side=right] {
        --tw-translate-y:calc(calc(1 / 2 * 100%) * -1);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .data-\[side\=right\]\: border-l[data-side=right] {
        border-left-style:var(--tw-border-style);
        border-left-width: 1px
    }

    .data-\[side\=right\]\: slide-in-from-left-2[data-side=right] {
        --tw-enter-translate-x:calc(2*var(--spacing)*-1)
    }

    .data-\[side\=right\]\: group-data-\[collapsible\=offcanvas\]\:right-\[calc\(var\(--sidebar-width\)\*-1\)\][data-side=right]:is(:where(.group)[data-collapsible=offcanvas] *) {
        right:calc(var(--sidebar-width) * -1)
    }

    .data-\[side\=top\]\: inset-x-0[data-side=top] {
        inset-inline:calc(var(--spacing) * 0)
    }

    .data-\[side\=top\]\: top-0[data-side=top] {
        top:calc(var(--spacing) * 0)
    }

    .data-\[side\=top\]\: -bottom-2\.5[data-side=top] {
        bottom:calc(var(--spacing) * -2.5)
    }

    .data-\[side\=top\]\: h-auto[data-side=top] {
        height:auto
    }

    .data-\[side\=top\]\: border-b[data-side=top] {
        border-bottom-style:var(--tw-border-style);
        border-bottom-width: 1px
    }

    .data-\[side\=top\]\: slide-in-from-bottom-2[data-side=top] {
        --tw-enter-translate-y:calc(2*var(--spacing))
    }

    .data-\[size\=default\]\: h-9[data-size=default] {
        height:calc(var(--spacing) * 9)
    }

    .data-\[size\=default\]\: h-\[18\.4px\][data-size=default] {
        height:18.4px
    }

    .data-\[size\=default\]\: w-\[32px\][data-size=default] {
        width:32px
    }

    .data-\[size\=default\]\: max-w-xs[data-size=default] {
        max-width:var(--container-xs)
    }

    .data-\[size\=lg\]\: size-10[data-size=lg] {
        width:calc(var(--spacing) * 10);
        height: calc(var(--spacing) * 10)
    }

    .data-\[size\=md\]\: text-sm[data-size=md] {
        font-size:var(--text-sm);
        line-height: var(--tw-leading,var(--text-sm--line-height))
    }

    .data-\[size\=sm\]\: size-6[data-size=sm] {
        width:calc(var(--spacing) * 6);
        height: calc(var(--spacing) * 6)
    }

    .data-\[size\=sm\]\: h-8[data-size=sm] {
        height:calc(var(--spacing) * 8)
    }

    .data-\[size\=sm\]\: h-\[14px\][data-size=sm] {
        height:14px
    }

    .data-\[size\=sm\]\: w-\[24px\][data-size=sm] {
        width:24px
    }

    .data-\[size\=sm\]\: max-w-xs[data-size=sm] {
        max-width:var(--container-xs)
    }

    .data-\[size\=sm\]\: gap-4[data-size=sm] {
        gap:calc(var(--spacing) * 4)
    }

    .data-\[size\=sm\]\: py-4[data-size=sm] {
        padding-block:calc(var(--spacing) * 4)
    }

    .data-\[size\=sm\]\: text-xs[data-size=sm] {
        font-size:var(--text-xs);
        line-height: var(--tw-leading,var(--text-xs--line-height))
    }

    :is(.\*\*\: data-\[slot\$\=-item\]\:focus\:bg-foreground\/10 *)[data-slot$=-item]:focus {
        background-color:var(--foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        :is(.\*\*\:data-\[slot\$\=-item\]\:focus\:bg-foreground\/10 *)[data-slot$=-item]:focus {
            background-color:color-mix(in oklab, var(--foreground) 10%, transparent)
        }
    }

    :is(.\*\*\: data-\[slot\$\=-item\]\:data-highlighted\:bg-foreground\/10 *)[data-slot$=-item][data-highlighted] {
        background-color:var(--foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        :is(.\*\*\:data-\[slot\$\=-item\]\:data-highlighted\:bg-foreground\/10 *)[data-slot$=-item][data-highlighted] {
            background-color:color-mix(in oklab, var(--foreground) 10%, transparent)
        }
    }

    :is(.\*\*\: data-\[slot\$\=-separator\]\:bg-foreground\/5 *)[data-slot$=-separator] {
        background-color:var(--foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        :is(.\*\*\:data-\[slot\$\=-separator\]\:bg-foreground\/5 *)[data-slot$=-separator] {
            background-color:color-mix(in oklab, var(--foreground) 5%, transparent)
        }
    }

    :is(.\*\*\: data-\[slot\$\=-trigger\]\:focus\:bg-foreground\/10 *)[data-slot$=-trigger]:focus {
        background-color:var(--foreground)
    }

    @supports (color: color-mix(in lab, red, red)) {
        :is(.\*\*\:data-\[slot\$\=-trigger\]\:focus\:bg-foreground\/10 *)[data-slot$=-trigger]:focus {
            background-color:color-mix(in oklab, var(--foreground) 10%, transparent)
        }
    }

    :is(.\*\*\: data-\[slot\$\=-trigger\]\:aria-expanded\:bg-foreground\/10\!*)[data-slot$=-trigger][aria-expanded=true] {
        background-color:var(--foreground)!important
    }

    @supports (color: color-mix(in lab, red, red)) {
        :is(.\*\*\:data-\[slot\$\=-trigger\]\:aria-expanded\:bg-foreground\/10\!*)[data-slot$=-trigger][aria-expanded=true] {
            background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important
        }
    }

    :is(.\*\: data-\[slot\=avatar\]\:ring-2>*)[data-slot=avatar] {
        --tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    :is(.\*\: data-\[slot\=avatar\]\:ring-background>*)[data-slot=avatar] {
        --tw-ring-color:var(--background)
    }

    :is(.\*\: data-\[slot\=card\]\:from-primary\/5>*)[data-slot=card] {
        --tw-gradient-from:var(--primary)
    }

    @supports (color: color-mix(in lab, red, red)) {
        :is(.\*\:data-\[slot\=card\]\:from-primary\/5>*)[data-slot=card] {
            --tw-gradient-from:color-mix(in oklab, var(--primary) 5%, transparent)
        }
    }

    :is(.\*\: data-\[slot\=card\]\:from-primary\/5>*)[data-slot=card] {
        --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))
    }

    :is(.\*\: data-\[slot\=card\]\:to-card>*)[data-slot=card] {
        --tw-gradient-to:var(--card);
        --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))
    }

    :is(.\*\: data-\[slot\=card\]\:shadow-xs>*)[data-slot=card] {
        --tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    :is(.\*\: data-\[slot\=input-group\]\:m-1>*)[data-slot=input-group] {
        margin:calc(var(--spacing) * 1)
    }

    :is(.\*\: data-\[slot\=input-group\]\:mb-0>*)[data-slot=input-group] {
        margin-bottom:calc(var(--spacing) * 0)
    }

    :is(.\*\: data-\[slot\=input-group\]\:h-8>*)[data-slot=input-group] {
        height:calc(var(--spacing) * 8)
    }

    :is(.\*\: data-\[slot\=input-group\]\:border-input\/30>*)[data-slot=input-group] {
        border-color:var(--input)
    }

    @supports (color: color-mix(in lab, red, red)) {
        :is(.\*\:data-\[slot\=input-group\]\:border-input\/30>*)[data-slot=input-group] {
            border-color:color-mix(in oklab, var(--input) 30%, transparent)
        }
    }

    :is(.\*\: data-\[slot\=input-group\]\:bg-input\/30>*)[data-slot=input-group] {
        background-color:var(--input)
    }

    @supports (color: color-mix(in lab, red, red)) {
        :is(.\*\:data-\[slot\=input-group\]\:bg-input\/30>*)[data-slot=input-group] {
            background-color:color-mix(in oklab, var(--input) 30%, transparent)
        }
    }

    :is(.\*\: data-\[slot\=input-group\]\:shadow-none>*)[data-slot=input-group] {
        --tw-shadow:0 0 #0000;
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
    }

    :is(.\*\: data-\[slot\=input-group-addon\]\:pl-2\!>*)[data-slot=input-group-addon] {
        padding-left:calc(var(--spacing) * 2)!important
    }

    :is(.\*\: data-\[slot\=select-value\]\:line-clamp-1>*)[data-slot=select-value] {
        -webkit-line-clamp:1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden
    }

    :is(.\*\: data-\[slot\=select-value\]\:flex>*)[data-slot=select-value] {
        display:flex
    }

    :is(.\*\: data-\[slot\=select-value\]\:items-center>*)[data-slot=select-value] {
        align-items:center
    }

    :is(.\*\: data-\[slot\=select-value\]\:gap-1\.5>*)[data-slot=select-value] {
        gap:calc(var(--spacing) * 1.5)
    }

    .data-\[slot\=sidebar-menu-button\]\: p-1\.5\![data-slot=sidebar-menu-button] {
        padding:calc(var(--spacing) * 1.5)!important
    }

    .data-\[state\=delayed-open\]\: animate-in[data-state=delayed-open] {
        animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)
    }

    .data-\[state\=delayed-open\]\: fade-in-0[data-state=delayed-open] {
        --tw-enter-opacity:0
    }

    .data-\[state\=delayed-open\]\: zoom-in-95[data-state=delayed-open] {
        --tw-enter-scale:.95
    }

    .data-\[state\=open\]\: bg-sidebar-accent[data-state=open] {
        background-color:var(--sidebar-accent)
    }

    .data-\[state\=open\]\: text-sidebar-accent-foreground[data-state=open] {
        color:var(--sidebar-accent-foreground)
    }

    .data-\[variant\=destructive\]\: text-destructive[data-variant=destructive] {
        color:var(--destructive)
    }

    :is(:is(.\*\*\: data-\[variant\=destructive\]\:\*\*\:text-accent-foreground\!*)[data-variant=destructive] *),:is(.\*\*\:data-\[variant\=destructive\]\:text-accent-foreground\!*)[data-variant=destructive] {
        color:var(--accent-foreground)!important
    }

    .data-\[variant\=destructive\]\: focus\:bg-destructive\/10[data-variant=destructive]:focus {
        background-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .data-\[variant\=destructive\]\:focus\:bg-destructive\/10[data-variant=destructive]:focus {
            background-color:color-mix(in oklab, var(--destructive) 10%, transparent)
        }
    }

    .data-\[variant\=destructive\]\: focus\:text-destructive[data-variant=destructive]:focus {
        color:var(--destructive)
    }

    :is(.\*\*\: data-\[variant\=destructive\]\:focus\:bg-foreground\/10\!*)[data-variant=destructive]:focus {
        background-color:var(--foreground)!important
    }

    @supports (color: color-mix(in lab, red, red)) {
        :is(.\*\*\:data-\[variant\=destructive\]\:focus\:bg-foreground\/10\!*)[data-variant=destructive]:focus {
            background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important
        }
    }

    .data-\[variant\=line\]\: rounded-none[data-variant=line] {
        border-radius:0
    }

    .data-\[vaul-drawer-direction\=bottom\]\: inset-x-0[data-vaul-drawer-direction=bottom] {
        inset-inline:calc(var(--spacing) * 0)
    }

    .data-\[vaul-drawer-direction\=bottom\]\: bottom-0[data-vaul-drawer-direction=bottom] {
        bottom:calc(var(--spacing) * 0)
    }

    .data-\[vaul-drawer-direction\=bottom\]\: mt-24[data-vaul-drawer-direction=bottom] {
        margin-top:calc(var(--spacing) * 24)
    }

    .data-\[vaul-drawer-direction\=bottom\]\: max-h-\[80vh\][data-vaul-drawer-direction=bottom] {
        max-height:80vh
    }

    .data-\[vaul-drawer-direction\=left\]\: inset-y-0[data-vaul-drawer-direction=left] {
        inset-block:calc(var(--spacing) * 0)
    }

    .data-\[vaul-drawer-direction\=left\]\: left-0[data-vaul-drawer-direction=left] {
        left:calc(var(--spacing) * 0)
    }

    .data-\[vaul-drawer-direction\=left\]\: w-3\/4[data-vaul-drawer-direction=left] {
        width:75%
    }

    .data-\[vaul-drawer-direction\=right\]\: inset-y-0[data-vaul-drawer-direction=right] {
        inset-block:calc(var(--spacing) * 0)
    }

    .data-\[vaul-drawer-direction\=right\]\: right-0[data-vaul-drawer-direction=right] {
        right:calc(var(--spacing) * 0)
    }

    .data-\[vaul-drawer-direction\=right\]\: w-3\/4[data-vaul-drawer-direction=right] {
        width:75%
    }

    .data-\[vaul-drawer-direction\=top\]\: inset-x-0[data-vaul-drawer-direction=top] {
        inset-inline:calc(var(--spacing) * 0)
    }

    .data-\[vaul-drawer-direction\=top\]\: top-0[data-vaul-drawer-direction=top] {
        top:calc(var(--spacing) * 0)
    }

    .data-\[vaul-drawer-direction\=top\]\: mb-24[data-vaul-drawer-direction=top] {
        margin-bottom:calc(var(--spacing) * 24)
    }

    .data-\[vaul-drawer-direction\=top\]\: max-h-\[80vh\][data-vaul-drawer-direction=top] {
        max-height:80vh
    }

    @supports ((-webkit-backdrop-filter: var(--tw)) or (backdrop-filter:var(--tw))) {
        .supports-backdrop-filter\:backdrop-blur-xs {
            --tw-backdrop-blur:blur(var(--blur-xs));
            -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
            backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)
        }
    }

    @media (width>=40rem) {
        .sm\: col-span-2 {
            grid-column:span 2/span 2
        }

        .sm\:mb-20 {
            margin-bottom: calc(var(--spacing) * 20)
        }

        .sm\:mb-28 {
            margin-bottom: calc(var(--spacing) * 28)
        }

        .sm\:flex {
            display: flex
        }

        .sm\:size-9 {
            width: calc(var(--spacing) * 9);
            height: calc(var(--spacing) * 9)
        }

        .sm\:max-w-md {
            max-width: var(--container-md)
        }

        .sm\:grid-cols-2 {
            grid-template-columns: repeat(2,minmax(0,1fr))
        }

        .sm\:flex-row {
            flex-direction: row
        }

        .sm\:items-center {
            align-items: center
        }

        .sm\:justify-between {
            justify-content: space-between
        }

        .sm\:justify-end {
            justify-content: flex-end
        }

        .sm\:p-6 {
            padding: calc(var(--spacing) * 6)
        }

        .sm\:p-12 {
            padding: calc(var(--spacing) * 12)
        }

        .sm\:p-18 {
            padding: calc(var(--spacing) * 18)
        }

        .sm\:px-6 {
            padding-inline:calc(var(--spacing) * 6)}

        .sm\: py-32 {
            padding-block:calc(var(--spacing) * 32)
        }

        .sm\:text-4xl {
            font-size: var(--text-4xl);
            line-height: var(--tw-leading,var(--text-4xl--line-height))
        }

        .sm\:group-data-\[size\=default\]\/alert-dialog-content\:row-span-2:is(:where(.group\/alert-dialog-content)[data-size=default] *) {
            grid-row: span 2/span 2
        }

        .sm\:group-data-\[size\=default\]\/alert-dialog-content\:place-items-start:is(:where(.group\/alert-dialog-content)[data-size=default] *) {
            place-items: start
        }

        .sm\:group-data-\[size\=default\]\/alert-dialog-content\:text-left:is(:where(.group\/alert-dialog-content)[data-size=default] *) {
            text-align: left
        }

        .sm\:group-data-\[size\=default\]\/alert-dialog-content\:group-has-data-\[slot\=alert-dialog-media\]\/alert-dialog-content\:col-start-2:is(:where(.group\/alert-dialog-content)[data-size=default] *):is(:where(.group\/alert-dialog-content):has([data-slot=alert-dialog-media]) *) {
            grid-column-start: 2
        }

        .sm\:group-data-\[size\=default\]\/alert-dialog-content\:has-data-\[slot\=alert-dialog-media\]\:grid-rows-\[auto_1fr\]:is(:where(.group\/alert-dialog-content)[data-size=default] *):has([data-slot=alert-dialog-media]) {
            grid-template-rows: auto 1fr
        }

        .data-\[side\=left\]\:sm\:max-w-sm[data-side=left] {
            max-width: var(--container-sm)
        }

        .data-\[side\=right\]\:sm\:max-w-lg[data-side=right] {
            max-width: var(--container-lg)
        }

        .data-\[side\=right\]\:sm\:max-w-sm[data-side=right] {
            max-width: var(--container-sm)
        }

        .data-\[side\=right\]\:sm\:max-w-xl[data-side=right] {
            max-width: var(--container-xl)
        }

        .data-\[size\=default\]\:sm\:max-w-md[data-size=default] {
            max-width: var(--container-md)
        }

        .data-\[vaul-drawer-direction\=left\]\:sm\:max-w-sm[data-vaul-drawer-direction=left],.data-\[vaul-drawer-direction\=right\]\:sm\:max-w-sm[data-vaul-drawer-direction=right] {
            max-width: var(--container-sm)
        }
    }

    @media (width>=48rem) {
        .md\: col-span-2 {
            grid-column:span 2/span 2
        }

        .md\:block {
            display: block
        }

        .md\:flex {
            display: flex
        }

        .md\:hidden {
            display: none
        }

        .md\:grid-cols-2 {
            grid-template-columns: repeat(2,minmax(0,1fr))
        }

        .md\:gap-1\.5 {
            gap: calc(var(--spacing) * 1.5)
        }

        .md\:p-6 {
            padding: calc(var(--spacing) * 6)
        }

        .md\:p-8 {
            padding: calc(var(--spacing) * 8)
        }

        .md\:py-8 {
            padding-block:calc(var(--spacing) * 8)}

        .md\: text-left {
            text-align:left
        }

        .md\:text-3xl {
            font-size: var(--text-3xl);
            line-height: var(--tw-leading,var(--text-3xl--line-height))
        }

        .md\:text-sm {
            font-size: var(--text-sm);
            line-height: var(--tw-leading,var(--text-sm--line-height))
        }

        .md\:text-pretty {
            text-wrap: pretty
        }

        .md\:opacity-0 {
            opacity: 0
        }

        .md\:peer-data-\[variant\=inset\]\:m-2:is(:where(.peer)[data-variant=inset]~*) {
            margin: calc(var(--spacing) * 2)
        }

        .md\:peer-data-\[variant\=inset\]\:ml-0:is(:where(.peer)[data-variant=inset]~*) {
            margin-left: calc(var(--spacing) * 0)
        }

        .md\:peer-data-\[variant\=inset\]\:rounded-xl:is(:where(.peer)[data-variant=inset]~*) {
            border-radius: calc(var(--radius) * 1.4)
        }

        .md\:peer-data-\[variant\=inset\]\:shadow-sm:is(:where(.peer)[data-variant=inset]~*) {
            --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);
            box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
        }

        .md\:peer-data-\[variant\=inset\]\:peer-data-\[state\=collapsed\]\:ml-2:is(:where(.peer)[data-variant=inset]~*):is(:where(.peer)[data-state=collapsed]~*) {
            margin-left: calc(var(--spacing) * 2)
        }

        .md\:after\:hidden:after {
            content: var(--tw-content);
            display: none
        }
    }

    @media (width>=64rem) {
        .lg\: col-span-1 {
            grid-column:span 1/span 1
        }

        .lg\:col-span-2 {
            grid-column: span 2/span 2
        }

        .lg\:grid-cols-2 {
            grid-template-columns: repeat(2,minmax(0,1fr))
        }

        .lg\:grid-cols-3 {
            grid-template-columns: repeat(3,minmax(0,1fr))
        }

        .lg\:gap-2 {
            gap: calc(var(--spacing) * 2)
        }

        .lg\:p-16 {
            padding: calc(var(--spacing) * 16)
        }

        .lg\:px-6 {
            padding-inline:calc(var(--spacing) * 6)}

        .lg\: pt-40 {
            padding-top:calc(var(--spacing) * 40)
        }

        .lg\:pb-32 {
            padding-bottom: calc(var(--spacing) * 32)
        }
    }

    @media (width>=80rem) {
        .xl\: grid-cols-4 {
            grid-template-columns:repeat(4,minmax(0,1fr))
        }
    }

    @container card (width>=250px) {
        .\@\[250px\]\/card\: text-3xl {
            font-size:var(--text-3xl);
            line-height: var(--tw-leading,var(--text-3xl--line-height))
        }
    }

    @container main (width>=36rem) {
        .\@xl\/main\: grid-cols-2 {
            grid-template-columns:repeat(2,minmax(0,1fr))
        }
    }

    @container main (width>=64rem) {
        .\@5xl\/main\: grid-cols-4 {
            grid-template-columns:repeat(4,minmax(0,1fr))
        }
    }

    .ltr\: -translate-x-1\/2:where(:not(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)),[dir=ltr],[dir=ltr] *),.rtl\:-translate-x-1\/2:where(:is(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)),[dir=rtl],[dir=rtl] *) {
        --tw-translate-x:calc(calc(1 / 2 * 100%) * -1);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .dark\: border-border:is(.dark *) {
        border-color:var(--border)
    }

    .dark\: border-input\/50:is(.dark *) {
        border-color:var(--input)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:border-input\/50:is(.dark *) {
            border-color:color-mix(in oklab, var(--input) 50%, transparent)
        }
    }

    .dark\: border-secondary\/50:is(.dark *) {
        border-color:var(--secondary)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:border-secondary\/50:is(.dark *) {
            border-color:color-mix(in oklab, var(--secondary) 50%, transparent)
        }
    }

    .dark\: bg-amber-900\/30:is(.dark *) {
        background-color:#7b33064d
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:bg-amber-900\/30:is(.dark *) {
            background-color:color-mix(in oklab, var(--color-amber-900) 30%, transparent)
        }
    }

    .dark\: bg-card:is(.dark *) {
        background-color:var(--card)
    }

    .dark\: bg-destructive\/20:is(.dark *) {
        background-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:bg-destructive\/20:is(.dark *) {
            background-color:color-mix(in oklab, var(--destructive) 20%, transparent)
        }
    }

    .dark\: bg-gray-800:is(.dark *) {
        background-color:var(--color-gray-800)
    }

    .dark\: bg-green-900\/30:is(.dark *) {
        background-color:#0d542b4d
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:bg-green-900\/30:is(.dark *) {
            background-color:color-mix(in oklab, var(--color-green-900) 30%, transparent)
        }
    }

    .dark\: bg-input\/30:is(.dark *) {
        background-color:var(--input)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:bg-input\/30:is(.dark *) {
            background-color:color-mix(in oklab, var(--input) 30%, transparent)
        }
    }

    .dark\: bg-red-900\/30:is(.dark *) {
        background-color:#82181a4d
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:bg-red-900\/30:is(.dark *) {
            background-color:color-mix(in oklab, var(--color-red-900) 30%, transparent)
        }
    }

    .dark\: bg-secondary:is(.dark *),.dark\:bg-secondary\/20:is(.dark *) {
        background-color:var(--secondary)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:bg-secondary\/20:is(.dark *) {
            background-color:color-mix(in oklab, var(--secondary) 20%, transparent)
        }
    }

    .dark\: bg-transparent:is(.dark *) {
        background-color:#0000
    }

    .dark\: bg-zinc-100:is(.dark *) {
        background-color:var(--color-zinc-100)
    }

    .dark\: text-amber-400:is(.dark *) {
        color:var(--color-amber-400)
    }

    .dark\: text-gray-400:is(.dark *) {
        color:var(--color-gray-400)
    }

    .dark\: text-green-400:is(.dark *) {
        color:var(--color-green-400)
    }

    .dark\: text-muted-foreground:is(.dark *) {
        color:var(--muted-foreground)
    }

    .dark\: text-red-400:is(.dark *) {
        color:var(--color-red-400)
    }

    .dark\: text-zinc-900:is(.dark *) {
        color:var(--color-zinc-900)
    }

    .dark\: ring-input:is(.dark *) {
        --tw-ring-color:var(--input)
    }

    .dark\: after\:mix-blend-lighten:is(.dark *):after {
        content:var(--tw-content);
        mix-blend-mode: lighten
    }

    @media (hover: hover) {
        .dark\:hover\:bg-destructive\/30:is(.dark *):hover {
            background-color:var(--destructive)
        }

        @supports (color: color-mix(in lab, red, red)) {
            .dark\:hover\:bg-destructive\/30:is(.dark *):hover {
                background-color:color-mix(in oklab, var(--destructive) 30%, transparent)
            }
        }

        .dark\:hover\:bg-input\/50:is(.dark *):hover {
            background-color: var(--input)
        }

        @supports (color: color-mix(in lab, red, red)) {
            .dark\:hover\:bg-input\/50:is(.dark *):hover {
                background-color:color-mix(in oklab, var(--input) 50%, transparent)
            }
        }

        .dark\:hover\:bg-muted\/50:is(.dark *):hover {
            background-color: var(--muted)
        }

        @supports (color: color-mix(in lab, red, red)) {
            .dark\:hover\:bg-muted\/50:is(.dark *):hover {
                background-color:color-mix(in oklab, var(--muted) 50%, transparent)
            }
        }

        .dark\:hover\:bg-secondary:is(.dark *):hover {
            background-color: var(--secondary)
        }

        .dark\:hover\:text-foreground:is(.dark *):hover {
            color: var(--foreground)
        }
    }

    .dark\: focus-visible\:ring-destructive\/40:is(.dark *):focus-visible {
        --tw-ring-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:focus-visible\:ring-destructive\/40:is(.dark *):focus-visible {
            --tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)
        }
    }

    .dark\: has-aria-invalid\:border-destructive\/50:is(.dark *):has([aria-invalid=true]) {
        border-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:has-aria-invalid\:border-destructive\/50:is(.dark *):has([aria-invalid=true]) {
            border-color:color-mix(in oklab, var(--destructive) 50%, transparent)
        }
    }

    .dark\: has-aria-invalid\:ring-destructive\/40:is(.dark *):has([aria-invalid=true]) {
        --tw-ring-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:has-aria-invalid\:ring-destructive\/40:is(.dark *):has([aria-invalid=true]) {
            --tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)
        }
    }

    .dark\: has-\[\[data-slot\]\[aria-invalid\=true\]\]\:ring-destructive\/40:is(.dark *):has([data-slot][aria-invalid=true]) {
        --tw-ring-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:has-\[\[data-slot\]\[aria-invalid\=true\]\]\:ring-destructive\/40:is(.dark *):has([data-slot][aria-invalid=true]) {
            --tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)
        }
    }

    .dark\: aria-invalid\:border-destructive\/50:is(.dark *)[aria-invalid=true] {
        border-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:aria-invalid\:border-destructive\/50:is(.dark *)[aria-invalid=true] {
            border-color:color-mix(in oklab, var(--destructive) 50%, transparent)
        }
    }

    .dark\: aria-invalid\:ring-destructive\/40:is(.dark *)[aria-invalid=true] {
        --tw-ring-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:aria-invalid\:ring-destructive\/40:is(.dark *)[aria-invalid=true] {
            --tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)
        }
    }

    :is(.dark\: \*\:data-\[slot\=card\]\:bg-card:is(.dark *)>*)[data-slot=card] {
        background-color:var(--card)
    }

    .dark\: data-\[variant\=destructive\]\:focus\:bg-destructive\/20:is(.dark *)[data-variant=destructive]:focus {
        background-color:var(--destructive)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:data-\[variant\=destructive\]\:focus\:bg-destructive\/20:is(.dark *)[data-variant=destructive]:focus {
            background-color:color-mix(in oklab, var(--destructive) 20%, transparent)
        }
    }

    .data-open\: animate-in:where([data-state=open]),.data-open\:animate-in:where([data-open]:not([data-open=false])) {
        animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)
    }

    .data-open\: bg-accent:where([data-state=open]),.data-open\:bg-accent:where([data-open]:not([data-open=false])) {
        background-color:var(--accent)
    }

    .data-open\: text-accent-foreground:where([data-state=open]),.data-open\:text-accent-foreground:where([data-open]:not([data-open=false])) {
        color:var(--accent-foreground)
    }

    .data-open\: fade-in-0:where([data-state=open]),.data-open\:fade-in-0:where([data-open]:not([data-open=false])) {
        --tw-enter-opacity:0
    }

    .data-open\: zoom-in-95:where([data-state=open]),.data-open\:zoom-in-95:where([data-open]:not([data-open=false])) {
        --tw-enter-scale:.95
    }

    @media (hover: hover) {
        :is(.data-open\:hover\:bg-sidebar-accent:where([data-state=open]),.data-open\:hover\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover {
            background-color:var(--sidebar-accent)
        }

        :is(.data-open\:hover\:text-sidebar-accent-foreground:where([data-state=open]),.data-open\:hover\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover {
            color: var(--sidebar-accent-foreground)
        }
    }

    .data-\[side\=bottom\]\: data-open\:slide-in-from-bottom-10[data-side=bottom]:where([data-state=open]),.data-\[side\=bottom\]\:data-open\:slide-in-from-bottom-10[data-side=bottom]:where([data-open]:not([data-open=false])) {
        --tw-enter-translate-y:calc(.1*100%)
    }

    .data-\[side\=left\]\: data-open\:slide-in-from-left-10[data-side=left]:where([data-state=open]),.data-\[side\=left\]\:data-open\:slide-in-from-left-10[data-side=left]:where([data-open]:not([data-open=false])) {
        --tw-enter-translate-x:calc(.1*-100%)
    }

    .data-\[side\=right\]\: data-open\:slide-in-from-right-10[data-side=right]:where([data-state=open]),.data-\[side\=right\]\:data-open\:slide-in-from-right-10[data-side=right]:where([data-open]:not([data-open=false])) {
        --tw-enter-translate-x:calc(.1*100%)
    }

    .data-\[side\=top\]\: data-open\:slide-in-from-top-10[data-side=top]:where([data-state=open]),.data-\[side\=top\]\:data-open\:slide-in-from-top-10[data-side=top]:where([data-open]:not([data-open=false])) {
        --tw-enter-translate-y:calc(.1*-100%)
    }

    .data-closed\: animate-out:where([data-state=closed]),.data-closed\:animate-out:where([data-closed]:not([data-closed=false])) {
        animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)
    }

    .data-closed\: overflow-hidden:where([data-state=closed]),.data-closed\:overflow-hidden:where([data-closed]:not([data-closed=false])) {
        overflow:hidden
    }

    .data-closed\: fade-out-0:where([data-state=closed]),.data-closed\:fade-out-0:where([data-closed]:not([data-closed=false])) {
        --tw-exit-opacity:0
    }

    .data-closed\: zoom-out-95:where([data-state=closed]),.data-closed\:zoom-out-95:where([data-closed]:not([data-closed=false])) {
        --tw-exit-scale:.95
    }

    .data-\[side\=bottom\]\: data-closed\:slide-out-to-bottom-10[data-side=bottom]:where([data-state=closed]),.data-\[side\=bottom\]\:data-closed\:slide-out-to-bottom-10[data-side=bottom]:where([data-closed]:not([data-closed=false])) {
        --tw-exit-translate-y:calc(.1*100%)
    }

    .data-\[side\=left\]\: data-closed\:slide-out-to-left-10[data-side=left]:where([data-state=closed]),.data-\[side\=left\]\:data-closed\:slide-out-to-left-10[data-side=left]:where([data-closed]:not([data-closed=false])) {
        --tw-exit-translate-x:calc(.1*-100%)
    }

    .data-\[side\=right\]\: data-closed\:slide-out-to-right-10[data-side=right]:where([data-state=closed]),.data-\[side\=right\]\:data-closed\:slide-out-to-right-10[data-side=right]:where([data-closed]:not([data-closed=false])) {
        --tw-exit-translate-x:calc(.1*100%)
    }

    .data-\[side\=top\]\: data-closed\:slide-out-to-top-10[data-side=top]:where([data-state=closed]),.data-\[side\=top\]\:data-closed\:slide-out-to-top-10[data-side=top]:where([data-closed]:not([data-closed=false])) {
        --tw-exit-translate-y:calc(.1*-100%)
    }

    .data-checked\: border-primary:where([data-state=checked]),.data-checked\:border-primary:where([data-checked]:not([data-checked=false])) {
        border-color:var(--primary)
    }

    .data-checked\: bg-primary:where([data-state=checked]),.data-checked\:bg-primary:where([data-checked]:not([data-checked=false])) {
        background-color:var(--primary)
    }

    .data-checked\: text-primary-foreground:where([data-state=checked]),.data-checked\:text-primary-foreground:where([data-checked]:not([data-checked=false])) {
        color:var(--primary-foreground)
    }

    .group-data-\[size\=default\]\/switch\: data-checked\:translate-x-\[calc\(100\%-2px\)\]:is(:where(.group\/switch)[data-size=default] *):where([data-state=checked]),.group-data-\[size\=default\]\/switch\:data-checked\:translate-x-\[calc\(100\%-2px\)\]:is(:where(.group\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.group-data-\[size\=sm\]\/switch\:data-checked\:translate-x-\[calc\(100\%-2px\)\]:is(:where(.group\/switch)[data-size=sm] *):where([data-state=checked]),.group-data-\[size\=sm\]\/switch\:data-checked\:translate-x-\[calc\(100\%-2px\)\]:is(:where(.group\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])) {
        --tw-translate-x:calc(100% - 2px);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .dark\: data-checked\:bg-primary:is(.dark *):where([data-state=checked]),.dark\:data-checked\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])) {
        background-color:var(--primary)
    }

    .dark\: data-checked\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.dark\:data-checked\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])) {
        background-color:var(--primary-foreground)
    }

    .data-unchecked\: bg-input:where([data-state=unchecked]),.data-unchecked\:bg-input:where([data-unchecked]:not([data-unchecked=false])) {
        background-color:var(--input)
    }

    .group-data-\[size\=default\]\/switch\: data-unchecked\:translate-x-0:is(:where(.group\/switch)[data-size=default] *):where([data-state=unchecked]),.group-data-\[size\=default\]\/switch\:data-unchecked\:translate-x-0:is(:where(.group\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.group-data-\[size\=sm\]\/switch\:data-unchecked\:translate-x-0:is(:where(.group\/switch)[data-size=sm] *):where([data-state=unchecked]),.group-data-\[size\=sm\]\/switch\:data-unchecked\:translate-x-0:is(:where(.group\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])) {
        --tw-translate-x:calc(var(--spacing) * 0);
        translate: var(--tw-translate-x) var(--tw-translate-y)
    }

    .dark\: data-unchecked\:bg-foreground:is(.dark *):where([data-state=unchecked]),.dark\:data-unchecked\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])) {
        background-color:var(--foreground)
    }

    .dark\: data-unchecked\:bg-input\/80:is(.dark *):where([data-state=unchecked]),.dark\:data-unchecked\:bg-input\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])) {
        background-color:var(--input)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:data-unchecked\:bg-input\/80:is(.dark *):where([data-state=unchecked]),.dark\:data-unchecked\:bg-input\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])) {
            background-color:color-mix(in oklab, var(--input) 80%, transparent)
        }
    }

    .data-selected\: bg-muted:where([data-selected=true]) {
        background-color:var(--muted)
    }

    .data-selected\: text-foreground:where([data-selected=true]) {
        color:var(--foreground)
    }

    .data-disabled\: pointer-events-none:where([data-disabled=true]),.data-disabled\:pointer-events-none:where([data-disabled]:not([data-disabled=false])) {
        pointer-events:none
    }

    .data-disabled\: cursor-not-allowed:where([data-disabled=true]),.data-disabled\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])) {
        cursor:not-allowed
    }

    .data-disabled\: opacity-50:where([data-disabled=true]),.data-disabled\:opacity-50:where([data-disabled]:not([data-disabled=false])) {
        opacity:.5
    }

    .data-active\: bg-background:where([data-state=active]),.data-active\:bg-background:where([data-active]:not([data-active=false])) {
        background-color:var(--background)
    }

    .data-active\: bg-sidebar-accent:where([data-state=active]),.data-active\:bg-sidebar-accent:where([data-active]:not([data-active=false])) {
        background-color:var(--sidebar-accent)
    }

    .data-active\: font-medium:where([data-state=active]),.data-active\:font-medium:where([data-active]:not([data-active=false])) {
        --tw-font-weight:var(--font-weight-medium);
        font-weight: var(--font-weight-medium)
    }

    .data-active\: text-foreground:where([data-state=active]),.data-active\:text-foreground:where([data-active]:not([data-active=false])) {
        color:var(--foreground)
    }

    .data-active\: text-sidebar-accent-foreground:where([data-state=active]),.data-active\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])) {
        color:var(--sidebar-accent-foreground)
    }

    .group-data-\[variant\=line\]\/tabs-list\: data-active\:bg-transparent:is(:where(.group\/tabs-list)[data-variant=line] *):where([data-state=active]),.group-data-\[variant\=line\]\/tabs-list\:data-active\:bg-transparent:is(:where(.group\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])) {
        background-color:#0000
    }

    :is(.group-data-\[variant\=line\]\/tabs-list\: data-active\:after\:opacity-100:is(:where(.group\/tabs-list)[data-variant=line] *):where([data-state=active]),.group-data-\[variant\=line\]\/tabs-list\:data-active\:after\:opacity-100:is(:where(.group\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after {
        content:var(--tw-content);
        opacity: 1
    }

    .dark\: data-active\:border-input:is(.dark *):where([data-state=active]),.dark\:data-active\:border-input:is(.dark *):where([data-active]:not([data-active=false])) {
        border-color:var(--input)
    }

    .dark\: data-active\:bg-input\/30:is(.dark *):where([data-state=active]),.dark\:data-active\:bg-input\/30:is(.dark *):where([data-active]:not([data-active=false])) {
        background-color:var(--input)
    }

    @supports (color: color-mix(in lab, red, red)) {
        .dark\:data-active\:bg-input\/30:is(.dark *):where([data-state=active]),.dark\:data-active\:bg-input\/30:is(.dark *):where([data-active]:not([data-active=false])) {
            background-color:color-mix(in oklab, var(--input) 30%, transparent)
        }
    }

    .dark\: data-active\:text-foreground:is(.dark *):where([data-state=active]),.dark\:data-active\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])) {
        color:var(--foreground)
    }

    .dark\: group-data-\[variant\=line\]\/tabs-list\:data-active\:border-transparent:is(.dark *):is(:where(.group\/tabs-list)[data-variant=line] *):where([data-state=active]),.dark\:group-data-\[variant\=line\]\/tabs-list\:data-active\:border-transparent:is(.dark *):is(:where(.group\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])) {
        border-color:#0000
    }

    .dark\: group-data-\[variant\=line\]\/tabs-list\:data-active\:bg-transparent:is(.dark *):is(:where(.group\/tabs-list)[data-variant=line] *):where([data-state=active]),.dark\:group-data-\[variant\=line\]\/tabs-list\:data-active\:bg-transparent:is(.dark *):is(:where(.group\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])) {
        background-color:#0000
    }

    .data-horizontal\: h-2\.5:where([data-orientation=horizontal]) {
        height:calc(var(--spacing) * 2.5)
    }

    .data-horizontal\: h-3:where([data-orientation=horizontal]) {
        height:calc(var(--spacing) * 3)
    }

    .data-horizontal\: h-full:where([data-orientation=horizontal]) {
        height:100%
    }

    .data-horizontal\: h-px:where([data-orientation=horizontal]) {
        height:1px
    }

    .data-horizontal\: w-full:where([data-orientation=horizontal]) {
        width:100%
    }

    .data-horizontal\: flex-col:where([data-orientation=horizontal]) {
        flex-direction:column
    }

    .data-horizontal\: border-t:where([data-orientation=horizontal]) {
        border-top-style:var(--tw-border-style);
        border-top-width: 1px
    }

    .data-horizontal\: border-t-transparent:where([data-orientation=horizontal]) {
        border-top-color:#0000
    }

    .data-vertical\: h-full:where([data-orientation=vertical]) {
        height:100%
    }

    .data-vertical\: min-h-40:where([data-orientation=vertical]) {
        min-height:calc(var(--spacing) * 40)
    }

    .data-vertical\: w-2\.5:where([data-orientation=vertical]) {
        width:calc(var(--spacing) * 2.5)
    }

    .data-vertical\: w-3:where([data-orientation=vertical]) {
        width:calc(var(--spacing) * 3)
    }

    .data-vertical\: w-auto:where([data-orientation=vertical]) {
        width:auto
    }

    .data-vertical\: w-full:where([data-orientation=vertical]) {
        width:100%
    }

    .data-vertical\: w-px:where([data-orientation=vertical]) {
        width:1px
    }

    .data-vertical\: flex-col:where([data-orientation=vertical]) {
        flex-direction:column
    }

    .data-vertical\: self-stretch:where([data-orientation=vertical]) {
        align-self:stretch
    }

    .data-vertical\: border-l:where([data-orientation=vertical]) {
        border-left-style:var(--tw-border-style);
        border-left-width: 1px
    }

    .data-vertical\: border-l-transparent:where([data-orientation=vertical]) {
        border-left-color:#0000
    }

    .\[\&_img\]\: size-full img {
        width:100%;
        height: 100%
    }

    .\[\&_img\]\: object-cover img {
        object-fit:cover
    }

    .\[\&_svg\]\: pointer-events-none svg {
        pointer-events:none
    }

    .\[\&_svg\]\: size-4 svg {
        width:calc(var(--spacing) * 4);
        height: calc(var(--spacing) * 4)
    }

    .\[\&_svg\]\: shrink-0 svg {
        flex-shrink:0
    }

    .\[\&_svg\: not\(\[class\*\=\'size-\'\]\)\]\:size-3 svg:not([class*=size-]){width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.\[\&_svg\:not\(\[class\*\=\'size-\'\]\)\]\:size-4 svg:not([class*=size-]){width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.\[\&_svg\:not\(\[class\*\=\'size-\'\]\)\]\:size-6 svg:not([class*=size-]){width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.\[\&\+\[data-slot\=item-content\]\]\:flex-none+[data-slot=item-content]{flex:none}.\[\.border-b\]\:pb-2.border-b{padding-bottom:calc(var(--spacing) * 2)}.\[\.border-b\]\:pb-6.border-b{padding-bottom:calc(var(--spacing) * 6)}.group-data-\[size\=sm\]\/card\:\[\.border-b\]\:pb-4:is(:where(.group\/card)[data-size=sm] *).border-b{padding-bottom:calc(var(--spacing) * 4)}.\[\.border-t\]\:pt-2.border-t{padding-top:calc(var(--spacing) * 2)}.\[\.border-t\]\:pt-6.border-t{padding-top:calc(var(--spacing) * 6)}.group-data-\[size\=sm\]\/card\:\[\.border-t\]\:pt-4:is(:where(.group\/card)[data-size=sm] *).border-t{padding-top:calc(var(--spacing) * 4)}:is(.\*\*\:\[\[cmdk-group-heading\]\]\:px-2 *)[cmdk-group-heading]{padding-inline:calc(var(--spacing) * 2)}:is(.\*\*\:\[\[cmdk-group-heading\]\]\:py-1\.5 *)[cmdk-group-heading]{padding-block:calc(var(--spacing) * 1.5)}:is(.\*\*\:\[\[cmdk-group-heading\]\]\:text-xs *)[cmdk-group-heading]{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}:is(.\*\*\:\[\[cmdk-group-heading\]\]\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}:is(.\*\*\:\[\[cmdk-group-heading\]\]\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}.\[a\]\:transition-colors:is(a){transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}:is(.\*\:\[a\]\:underline>*):is(a){text-decoration-line:underline}:is(.\*\:\[a\]\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.\[a\]\:hover\:bg-destructive\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.\[a\]\:hover\:bg-destructive\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.\[a\]\:hover\:bg-muted:is(a):hover{background-color:var(--muted)}.\[a\]\:hover\:bg-primary\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.\[a\]\:hover\:bg-primary\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.\[a\]\:hover\:bg-secondary\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.\[a\]\:hover\:bg-secondary\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.\[a\]\:hover\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.\*\:\[a\]\:hover\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.\*\:\[img\:first-child\]\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.\*\:\[img\:last-child\]\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.\*\:\[span\]\:last\:flex>*):is(span):last-child{display:flex}:is(.\*\:\[span\]\:last\:items-center>*):is(span):last-child{align-items:center}:is(.\*\:\[span\]\:last\:gap-2>*):is(span):last-child{gap:calc(var(--spacing) * 2)}:is(.data-\[variant\=destructive\]\:\*\:\[svg\]\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.data-selected\:\*\*\:\[svg\]\:text-foreground:where([data-selected=true]) *):is(svg){color:var(--foreground)}:is(.\*\:\[svg\:not\(\[class\*\=\'size-\'\]\)\]\:size-8>*):is(svg:not([class*=size-])){width:calc(var(--spacing) * 8);height:calc(var(--spacing) * 8)}.\[\&\>a\]\:underline>a{text-decoration-line:underline}.\[\&\>a\]\:underline-offset-4>a{text-underline-offset:4px}.\[\&\>a\:hover\]\:text-primary>a:hover{color:var(--primary)}.\[\&\>button\]\:hidden>button{display:none}.has-\[\>\[data-align\=block-end\]\]\:\[\&\>input\]\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(var(--spacing) * 3)}.has-\[\>\[data-align\=block-start\]\]\:\[\&\>input\]\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(var(--spacing) * 3)}.has-\[\>\[data-align\=inline-end\]\]\:\[\&\>input\]\:pr-1\.5:has(>[data-align=inline-end])>input{padding-right:calc(var(--spacing) * 1.5)}.has-\[\>\[data-align\=inline-start\]\]\:\[\&\>input\]\:pl-1\.5:has(>[data-align=inline-start])>input{padding-left:calc(var(--spacing) * 1.5)}.\[\&\>kbd\]\:rounded-\[calc\(var\(--radius\)-5px\)\]>kbd{border-radius:calc(var(--radius) - 5px)}.\[\&\>span\:last-child\]\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.\[\&\>svg\]\:pointer-events-none>svg{pointer-events:none}.\[\&\>svg\]\:size-3\!>svg{width:calc(var(--spacing) * 3)!important;height:calc(var(--spacing) * 3)!important}.\[\&\>svg\]\:size-3\.5>svg{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.\[\&\>svg\]\:size-4>svg{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.\[\&\>svg\]\:shrink-0>svg{flex-shrink:0}.\[\&\>svg\]\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.group-has-data-\[size\=lg\]\/avatar-group\:\[\&\>svg\]\:size-5:is(:where(.group\/avatar-group):has([data-size=lg]) *)>svg{width:calc(var(--spacing) * 5);height:calc(var(--spacing) * 5)}.group-has-data-\[size\=sm\]\/avatar-group\:\[\&\>svg\]\:size-3:is(:where(.group\/avatar-group):has([data-size=sm]) *)>svg{width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.group-data-\[size\=default\]\/avatar\:\[\&\>svg\]\:size-2:is(:where(.group\/avatar)[data-size=default] *)>svg,.group-data-\[size\=lg\]\/avatar\:\[\&\>svg\]\:size-2:is(:where(.group\/avatar)[data-size=lg] *)>svg{width:calc(var(--spacing) * 2);height:calc(var(--spacing) * 2)}.group-data-\[size\=sm\]\/avatar\:\[\&\>svg\]\:hidden:is(:where(.group\/avatar)[data-size=sm] *)>svg{display:none}.\[\&\>svg\:not\(\[class\*\=\'size-\'\]\)\]\:size-3\.5>svg:not([class*=size-]){width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.\[\&\>svg\:not\(\[class\*\=\'size-\'\]\)\]\:size-4>svg:not([class*=size-]){width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}[data-side=left][data-collapsible=offcanvas] .\[\[data-side\=left\]\[data-collapsible\=offcanvas\]_\&\]\:-right-2{right:calc(var(--spacing) * -2)}[data-side=left][data-state=collapsed] .\[\[data-side\=left\]\[data-state\=collapsed\]_\&\]\:cursor-e-resize{cursor:e-resize}[data-side=right][data-collapsible=offcanvas] .\[\[data-side\=right\]\[data-collapsible\=offcanvas\]_\&\]\:-left-2{left:calc(var(--spacing) * -2)}[data-side=right][data-state=collapsed] .\[\[data-side\=right\]\[data-state\=collapsed\]_\&\]\:cursor-w-resize{cursor:w-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:Merriweather Variable;font-style:normal;font-display:swap;font-weight:300 900;src:url(/assets/merriweather-cyrillic-ext-wght-normal-Bkm5NjZG.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Merriweather Variable;font-style:normal;font-display:swap;font-weight:300 900;src:url(/assets/merriweather-cyrillic-wght-normal-BWxnF87P.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:Merriweather Variable;font-style:normal;font-display:swap;font-weight:300 900;src:url(/assets/merriweather-vietnamese-wght-normal-BXYScXBD.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Merriweather Variable;font-style:normal;font-display:swap;font-weight:300 900;src:url(/assets/merriweather-latin-ext-wght-normal-BZx4mOJf.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Merriweather Variable;font-style:normal;font-display:swap;font-weight:300 900;src:url(/assets/merriweather-latin-wght-normal-BovdrKvB.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Manrope Variable;font-style:normal;font-display:swap;font-weight:200 800;src:url(data:font/woff2;base64,d09GMgABAAAAAAn4ABMAAAAAEwQAAAmOAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGjQbgnQcLj9IVkFSgQEGYD9TVEFUgQIAgQovahEICok0h0ULIAAwhzoBNgIkAzwEIAWHJgeBDgwHG6QQUdRKTmoBFD8K42bniObKrG3LZFcMWZzFmrjTFhQ6TVTqPJcInrfrvzq3b2PGn1wwMiNYGTy9ViREYARlL1zAGcPdPqBt3gNWrfKthv4xnM+b9caw+wmjgEUVRjHXhS6jgCK6zf5HiWQacJpGdAgdrbV6g/Rf1BfxRqZVQnrxRVWSJb6RLFnyu0elilmjeoSQCKnxsmwLaddUMjnksriSYuuPl06EAl7KfAiWQjCUETz0zNZ3EII94CDQtzkMfZ/9IkkY8tZRZTDky5ZVwBAM+GYpdd4ZVAWYImnLkiTg48l79gGx3D+VBtLeyg8u7bJAd4uo0pFuQBFysE9C95l0W4Fkiao6GfrDbu77lVU7wk9cV3uqOsXmQiMkhVKl1ugjzUAJBSIkkVWHijkpkVSyUFsgVBuJMA0N+ZnXtyUv5yMigGdfQRmwL1AAjQ3YXG6iIFNSUdPQo8+AISPGAltBMDQRAtyf4ZspLlZkpyOVoMZPvFGWzvk8p5SUC/NWPMj6T2/Yas2EdlON5GkfdkeFwVGjta825H89NIenlLWAPAp5h1KDtRhCaAQWMsFKtEvOKpIhgLHlXPARokkgEGEOAkqxJRQpKYq4ezahIiLHP6hZpqMbV0pUF2vdvEimLEQ/iIUYLgYWs0VXGVlLTOPdaPmFfCC/XrtzqVo1ez7vz6+Kd2+7o11ZJ+4MreLbB5BKVGxobAq4jZYalZ5aX2CKJiwUuc9GNJyi4M8bGyKcdjSRrG4JohdF8buJfmQefbYYREnMFsOoiNliFDVxmRgL0XUmUMLqzW0A4gCQAhWGYCQpFNukwXhIkPMsbRI19ewtw8Cp2Wj/Ro5cM2OTAbJAvZ/L4opBXb9+UHscYuOKM/W8isgwN26Exexjizmfnlp9dE3hOSqdZ/F5QqbckIlPb+oKfXxd6hftJ7Sm/uyPYpONza84CRlMNk/uhOrLpyf53982++zRkXNu3g3VF8qFbx1+7fbHZ9DrB3VXWNSmhnT2vrwS1+1Z+kHGBaZIhnnvuLBTNDeA340D1DWu5/jEa9pVfl6+Jij+yo3EELNixXCLjr173Q5eDP7Y7/L4iQFHbjpaJLFoP4cCsYP6sAPL7gMHNg53yYjqxqTDrYqLDl5DzW/eTLjYxCvucprjI3yl2ykKowKUC2Ox2FJLFo6Fa1HBWLC2jMCIIBEmklkYhmkpmBhTm/LCvJAH5oGcMKcgFEP1xUdho8ANPa6RFD99/PN60fjj9eXy2Eex4B5MpmRapXidzFk1p4uLk3+hn6jAP9ovJcXPPwk8o/0ltizbdbnTprvx4PSxT0VZ3Xc772aN7RflgbXRYwc3hLNO+k878nxGwfuVM8m8Gs7WEoVGWLHwSpx4vNSHBCMNqJ4m15Kp/TfHHVkQd++eY7PGN4W5byTs+6Ft8Ozvb/D60btv37de8ER0mS3P/0sLW84qGjEVkwztPzz06eGUWwKLwPb0D/WFd3vltl2aP276KpM0JNz6AfnAnZ5ADlF2zVyZ2OkxHSMxWPMnSZLbbDR3F1UjPVqp4d68da13F1YZujdWw7271iecO2l9+/4p47Oztjck355/75wFOI+VdGDqbNGs+ISgxg3iB2jb2r+b0CWsNLHIM4sdv8SDSFBP/Oromz6FNCWw2iMTxV0R8QLyBTkpe0j5+pSSJOOTB5Mck/gh3IopuNQnhKj02t3FL80gGbEh89SZcwTxcYt5cZT/nMnB3uXfPy8BSpVMBuRx+ZhACGzDBmwHsJRAjhotOnzuj2wDz3ug2wOUAY2NgZln9/TK/enG/oE4rO1wxvGUFMAxsZ0qNjRC7hl9d17e7imbgDt6uJXhUobDg7v3RX/yRCKxgMhfyiKcZfbpk0wmCcdQlIAOHeakXLvCNt++WfKiozNqSZxxJotn+c0a7DdPsx7DPYgKIDxwwYUZDg9aJbxocTjcwovr9WAsVV32mQoiiIOCHc60Oltst9qCQYuCqN1yHo0Kj60OgI2OqmiuBUWrNA0NDhYCDcdpmMrs1fZZ0xdTzMr1HdPtIHstYhqaPDDA5YxUDx7J4fJiisBSDI/L6G/bn34GNy8Q2g044ZTulAdFLb0tI6NNxfj3DzLjWiNGxje1pz7aXOcNV68lDPEd2SXl6VfBuwmHzdf1gxFy1HvA7pD8I2BnnmyGw852Cg5XbgIdEEGE5UCzen5jTlG6JCU5iajlxVcsXvbcS0SAcg1dcesWJLVK8+hYHOYQ+Pjy+EyVGXP0aPTFagrV9E03hCQvYx+g47KGq+1GsLj8uBIyihNw33YUe8PNC4BOJ3Lm1AglLV3nCuvUdIP+v15tVGbWIwgxLVpPkfpthCGpTKG+oA/DQfsKKvxhScqaN6FuElAUtTKv2UYgOmQegsN/n7njHUju8wM4VTcm+Q8xfX9SFwjTzdVqu95UOWSIGOabH8OGBEba//8Yxl3GcPdP/dMBOoSX/0z5SZmBoLbaPs+9asaMpb36yknKaw6FqWZa6A5vDa02mhkOba1q6KtLV208xrkwmW5C4VD6n2fvRjADy2qDYYnNy+H10Fq0LMbNzS863gkO7iQ8eC48/Ny5m59tOcEso3u7Qg3yrqDL6eKXwJAuWnhylfbWrRObe66rzX59+XDtzusnL66dI/86ArmtLlzED860Ef3bFPV78OX/zFTA11fcBn2Vntb7qiGBSgLBHyuv/uEaqqoTgSpOyjlzh86me1Vriv7i9rLPLvtghWmSnblRbAsBJL/4dScSQTBxOivHMO5QvBBY0iheJvfwWLxLOGzYKZyM4zVc2Cll46zEpeUV4MqGEWZj22SdOxhGAjgs9AEnfT+RoiMfcDb0GS5NncKVxju4Nt/mRk13O9Gz3FLct5oCD6wkwUNrCfHIUg6SMf8LwQGyVaBUqpLPW5BaMpRshEpl8nS1qw5dgnzlik8QBXmdy5UrIH74heTKZKMSilQso4hsRiGraQZRzxpNGqlEJMsXuAU7GlcR8mWSykUpVkWGyIf0a8v4qEQp5CtGsMiZa+4ESYQy+WilCiguHzxMXO54ogShooTV2bj2z1zL6DYSoImoQ8lFUWxMLBNQQgLkV2tHYgUoIbkuREz+fJHKxxWBcnvu3KQppFCxLkguB1NyVSp/TknRvNwYlCdbblWu3ze6owHdWluhE5tgQ6ej2SV65CijijoaRfSiH4Nqz1OpfEW+WeI/oU0ly60zkV9YzOQSYtZVEGYmrysTZAJkY4qZtIBD9/LYTIK7Nww3vMiYBwA=)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Manrope Variable;font-style:normal;font-display:swap;font-weight:200 800;src:url(/assets/manrope-cyrillic-wght-normal-Dvxsihut.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:Manrope Variable;font-style:normal;font-display:swap;font-weight:200 800;src:url(/assets/manrope-greek-wght-normal-DL7QRZyv.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:Manrope Variable;font-style:normal;font-display:swap;font-weight:200 800;src:url(/assets/manrope-vietnamese-wght-normal-usUDDRr7.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Manrope Variable;font-style:normal;font-display:swap;font-weight:200 800;src:url(/assets/manrope-latin-ext-wght-normal-Ch3YOpNY.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Manrope Variable;font-style:normal;font-display:swap;font-weight:200 800;src:url(/assets/manrope-latin-wght-normal-DHIcAJRg.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}:root{--background:oklch(100% 0 0);--foreground:oklch(14.8% .004 228.8);--card:oklch(100% 0 0);--card-foreground:oklch(14.8% .004 228.8);--popover:oklch(100% 0 0);--popover-foreground:oklch(14.8% .004 228.8);--primary:oklch(0% 0 0);--primary-foreground:oklch(97.9% .021 166.113);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.3% .002 197.1);--muted-foreground:oklch(56% .021 213.5);--accent:oklch(96.3% .002 197.1);--accent-foreground:oklch(21.8% .008 223.9);--destructive:oklch(57.7% .245 27.325);--border:oklch(92.5% .005 214.3);--input:oklch(92.5% .005 214.3);--ring:oklch(72.3% .014 214.4);--chart-1:oklch(83.7% .128 66.29);--chart-2:oklch(70.5% .213 47.604);--chart-3:oklch(64.6% .222 41.116);--chart-4:oklch(55.3% .195 38.402);--chart-5:oklch(47% .157 37.304);--radius:.625rem;--sidebar:oklch(98.5% 0 0);--sidebar-foreground:oklch(14.5% 0 0);--sidebar-primary:oklch(59.6% .145 163.225);--sidebar-primary-foreground:oklch(97.9% .021 166.113);--sidebar-accent:oklch(97% 0 0);--sidebar-accent-foreground:oklch(20.5% 0 0);--sidebar-border:oklch(92.2% 0 0);--sidebar-ring:oklch(70.8% 0 0);--chart-background:oklch(100% 0 0);--chart-foreground:oklch(14.5% .004 285);--chart-foreground-muted:oklch(55% .014 260);--chart-line-primary:oklch(62.3% .214 255);--chart-line-secondary:oklch(70.5% .015 265);--chart-crosshair:oklch(40% .1828 274.34);--chart-grid:oklch(90% 0 0);--chart-tooltip-foreground:oklch(98.5% 0 0);--chart-tooltip-muted:oklch(65% .01 260);--chart-marker-background:oklch(97% .005 260);--chart-marker-border:oklch(85% .01 260);--chart-marker-foreground:oklch(30% .01 260);--chart-marker-badge-background:oklch(0% 0 0);--chart-marker-badge-foreground:oklch(100% 0 0);--chart-segment-background:oklch(50% 0 0/.06);--chart-segment-line:oklch(50% 0 0/.25)}.dark{--background:oklch(14.8% .004 228.8);--foreground:oklch(98.7% .002 197.1);--card:oklch(20.5% 0 0);--card-foreground:oklch(98.7% .002 197.1);--popover:oklch(23.44% 0 0);--popover-foreground:oklch(98.7% .002 197.1);--primary:oklch(100% 0 0);--primary-foreground:oklch(0% 0 0);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.42% 0 0);--muted-foreground:oklch(72.3% .014 214.4);--accent:oklch(26.9% 0 0);--accent-foreground:oklch(98.7% .002 197.1);--destructive:oklch(70.4% .191 22.216);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(35.06% .006 84.4);--chart-1:oklch(83.7% .128 66.29);--chart-2:oklch(70.5% .213 47.604);--chart-3:oklch(64.6% .222 41.116);--chart-4:oklch(55.3% .195 38.402);--chart-5:oklch(47% .157 37.304);--sidebar:oklch(20.5% 0 0);--sidebar-foreground:oklch(98.5% 0 0);--sidebar-primary:oklch(69.6% .17 162.48);--sidebar-primary-foreground:oklch(26.2% .051 172.552);--sidebar-accent:oklch(26.9% 0 0);--sidebar-accent-foreground:oklch(98.5% 0 0);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(55.6% 0 0);--chart-background:oklch(14.5% 0 0);--chart-foreground:oklch(45% 0 0);--chart-crosshair:oklch(45% 0 0);--chart-grid:oklch(25% 0 0);--chart-marker-background:oklch(25% .01 260);--chart-marker-border:oklch(40% .01 260);--chart-marker-foreground:oklch(90% 0 0);--chart-marker-badge-background:oklch(100% 0 0);--chart-marker-badge-foreground:oklch(15% 0 0);--chart-segment-background:oklch(100% 0 0/.06);--chart-segment-line:oklch(100% 0 0/.25)}.container{width:100%;max-width:var(--container-3xl)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;in
itial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}

`

/** `#ffffff` ≡ `white` ≡ `#FFF` — all must collapse into one mined entry. */
export const canonicalizationCss = `body { background: #ffffff; }
.banner { background: white; }
.tag { background-color: #FFF; }`;

/** `.dark` selector scopes produce dark-only entries. */
export const darkSelectorCss = `body { background: #ffffff; }
.dark body { background: #111111; }`;

/** Gradients are collected verbatim and don't leak colors into the palette. */
export const gradientCss = `.hero { background: linear-gradient(180deg, #ffffff, #e5e5e5); }`;

/** min-width media queries are named sm/md/lg/xl/2xl. */
export const breakpointsCss = `@media (min-width: 768px) { .card { padding: 24px; } }
@media (min-width: 1024px) { .card { padding: 32px; } }`;

/** Border shorthands yield a width/style/color triple + a border-color entry. */
export const borderShorthandCss = `.card { border: 1px solid #e5e5e5; }
header { border-bottom: 1px solid #e5e5e5; }`;

/** Stand-in extractor output used by mapDesignSystem tests. */
export const fakeExtractOutput = {
  page_url: "https://example.com",
  title: "Example",
  description: null,
  csslinks: [],
  inline_styles: [sampleCss],
  fonturls: [],
  og_image: null,
  brand_assets: [],
};
