# International-Scholars-Research-Competition
A global research competition recognizing outstanding student scholarship.

**Prototype version's structure**
prototype_version/
├── index.html          ← Sign in + Register
├── icon.svg            ← Program icon
├── css/
│   └── style.css       ← All shared styles
├── js/
│   └── app.js          ← Shared auth, routing, navbar, utils
└── pages/
    ├── home.html        ← Homepage with hero, tracks, timeline, FAQ
    ├── documents.html   ← Rules with sticky sidebar navigation
    ├── payment.html     ← Pricing tiers + payment model
    ├── certificate.html ← Certificate + controls
    └── profile.html     ← User profile & quick actions

**Final version's structure**
final_version/
├── index.html              ← Public landing page (HOME)
├── icon.svg                ← Program icon
├── css/
|    └── style.css           ← All shared styles
├── js/              
|    └── app.js              ← Shared auth, nav renderers, toast, helpers
└── pages/
    ├── login.html           ← Only via nav or flow, never default
    ├── register.html        ← Step 1: Create Account
    ├── competition-reg.html ← Step 2: Competition details (requires auth)
    ├── dashboard.html       ← Post-login hub with 4 quick-action cards
    ├── submit.html          ← Research submission form (auth-gated)
    ├── submissions.html     ← View all submissions with status
    ├── payment.html         ← Pricing tiers + payment modal
    ├── certificate.html     ← Printable certificate
    └── profile.html         ← Account info + quick actions

Used tools:

Contact information
