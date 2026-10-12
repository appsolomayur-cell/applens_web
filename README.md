# AppLens – Official Marketing & Landing Page Website 🚀

A high-converting, modern, mobile and desktop responsive static HTML marketing template built for **AppLens & AppLens Pro** (Android App Inspector & APK Analyzer).

---

## 🌟 Key Highlights & Architecture

- **100% Static & Blazing Fast**: Pure Semantic HTML5, Vanilla CSS3, and Zero-Dependency JavaScript. No bulky frameworks needed.
- **Cybersecurity & Dark-Mode Aesthetic**: Premium dark mode by default with glowing mesh gradients, glassmorphic cards, and high-contrast typography.
- **Dark / Light Mode Toggle**: Instant toggle with `localStorage` memory and OS theme preference detection.
- **Interactive Live Tools**:
  - **Live Permission Risk Calculator**: Interactive permission toggles with animated SVG gauge calculating security scores in real-time.
  - **Framework Inspector Simulator**: Shows how AppLens reverse-engineers Flutter, React Native, Native Kotlin, Unity, and Unreal.
- **High-Res Screenshots Carousel & Lightbox**: Interactive gallery featuring Play Store screenshots with touch swipe and modal zoom.
- **Free vs. Pro (₹99) Feature Comparison Matrix**: Clearly highlights value props to drive monetization and in-app upgrades.
- **Zero-Network & Privacy Pledge**: Demonstrates the absence of `android.permission.INTERNET` in AndroidManifest.xml.
- **Full SEO & Structured Data**: Pre-configured OpenGraph cards, Twitter cards, meta descriptions, and Google `SoftwareApplication` JSON-LD schema.
- **Mobile-First & 100% Responsive**: Seamless layout on phones, tablets, and 4K desktop screens.

---

## 📁 Folder Structure

```text
marketing-website/
├── index.html                 # Main landing page
├── privacy-policy.html        # AppLens privacy policy
├── css/
│   └── style.css              # Custom styling, animations, tokens, responsive rules
├── js/
│   └── main.js                # Theme switcher, carousel, interactive calculator, modal
├── assets/
│   └── images/
│       ├── app-logo.png       # High-res app icon
│       ├── favicon.png        # Browser favicon
│       ├── screenshot-01.png  # Play Store screenshot 1
│       └── ...                # Screenshots 02 to 13
└── README.md                  # Deployment & customization instructions
```

---

## 🚀 How to Run Locally

You can test the website immediately on your computer:

### Option 1: Direct File Open
Double-click `marketing-website/index.html` to open it directly in Google Chrome, Safari, or Brave.

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
cd marketing-website
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

Using Node.js:
```bash
npx serve marketing-website
```

---

## 🌐 Free 1-Click Deployment Options

### 1. GitHub Pages (Free with your custom domain or github.io)
1. Push this folder to a GitHub repository (e.g. `applens-landing`).
2. Go to **Repository Settings** > **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch** > branch: `main` > folder: `/` (root) or `/marketing-website`.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### 2. Vercel (Free & Instant SSL)
1. Install Vercel CLI: `npm i -g vercel`
2. Run inside the directory:
   ```bash
   cd marketing-website
   vercel
   ```
3. Your site will be live instantly with global CDN and automated SSL!

### 3. Cloudflare Pages
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Upload Assets**.
3. Drag & drop the `marketing-website` folder.
4. Set your custom domain with 1 click.

---

## ✏️ Quick Customizations

1. **Google Play Store URL**:
   Search for `https://play.google.com/store/apps/details?id=com.applens` in `index.html` and replace it with your final package link if needed.
2. **Contact Email**:
   Search for `app.solo.mayur@gmail.com` in `index.html` to update support emails.
3. **Pro Pricing**:
   Update `₹99` or add multi-currency values in the `#pricing` section of `index.html`.
