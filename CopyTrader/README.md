# CopyTrader — Step-by-Step Install Guide

A React Native app that copies trades from one master Tradovate account to multiple follower accounts in real time.

---

## What you need (one-time setup)

- A Mac computer with Xcode installed
- An iPhone (to test on real device)
- Node.js installed on your Mac
- The Expo Go app on your iPhone (free from the App Store)

---

## Step 1 — Install Node.js (if you haven't)

1. Open your Mac's web browser and go to: https://nodejs.org
2. Click the big green "LTS" download button
3. Open the downloaded file and follow the installer
4. When done, open Terminal (press Cmd+Space, type "Terminal", press Enter)
5. Type this and press Enter to confirm it worked:
   ```
   node --version
   ```
   You should see something like `v20.11.0`

---

## Step 2 — Install Expo CLI

In Terminal, type this and press Enter:
```bash
npm install -g expo-cli
```
Wait for it to finish (1–2 minutes).

---

## Step 3 — Put the project on your Mac

1. Download the CopyTrader project folder (the ZIP file)
2. Unzip it — you'll get a folder called `CopyTrader`
3. In Terminal, navigate into it:
   ```bash
   cd ~/Downloads/CopyTrader
   ```
   (adjust path if you saved it somewhere else)

---

## Step 4 — Install app dependencies

In Terminal (inside the CopyTrader folder), run:
```bash
npm install
```
This downloads all the required packages. Takes 2–5 minutes.

---

## Step 5 — Install Expo Go on your iPhone

1. Open the App Store on your iPhone
2. Search for **"Expo Go"**
3. Download and install it (it's free)

---

## Step 6 — Start the app

In Terminal, run:
```bash
npx expo start
```

A QR code will appear in the Terminal window.

---

## Step 7 — Open on your iPhone

1. Open the **Camera** app on your iPhone
2. Point it at the QR code in Terminal
3. Tap the notification that appears: "Open in Expo Go"
4. The CopyTrader app will load on your iPhone!

> **Both your iPhone and Mac must be on the same WiFi network.**

---

## Step 8 — Add your Tradovate accounts

1. In the app, tap **Accounts** at the bottom
2. Tap **+ Add**
3. Fill in:
   - **Account nickname** — a name you'll recognize (e.g. "Topstep Live")
   - **Prop firm** — select your firm
   - **Environment** — start with **Demo** for testing!
   - **Username** — your Tradovate login email/username
   - **Password** — your Tradovate password
4. Tap **Add account**
5. Repeat for each account (add at least 2 — one master, one follower)

---

## Step 9 — Set your master account

1. In the **Accounts** tab, find the account you trade on
2. Tap **Set as master** — it will get a green "MASTER" badge
3. All other accounts become followers automatically

---

## Step 10 — Configure follower accounts

For each follower account you can:
- **Toggle on/off** — enable or disable copying to that account
- **Set multiplier** — 0.5x = half size, 1x = same size, 2x = double size

---

## Step 11 — Test the connection

1. Tap **Test connection** on each account
2. You should see "Connected! authenticated successfully"
3. If you see an error, double-check your username and password

---

## Step 12 — Start copying!

1. Go to the **Home** tab
2. Toggle the **Copy trading** switch to ON
3. The status dot turns green and shows "LIVE"
4. Place a trade on your master account — it will be copied to all enabled followers!

---

## Troubleshooting

**"Connection failed"**
- Double-check your Tradovate username and password
- Make sure you selected the right environment (Demo vs Live)
- Try logging into tradovate.com to confirm credentials work

**QR code doesn't work**
- Make sure your iPhone and Mac are on the same WiFi
- Try typing the URL shown in Terminal manually into Expo Go

**App crashes on open**
- Try running `npm install` again
- Make sure you have Node.js 18 or newer: `node --version`

---

## Important notes

- **Always test on Demo first** before using Live accounts
- Your credentials are encrypted on your device and only sent directly to Tradovate
- The copy engine runs only while the app is open (background execution requires a paid Apple Developer account for full deployment)
- For 24/7 automated copying, consider running this on a Mac Mini or server instead

---

## Getting the API credentials (CID / SEC)

Most users only need username + password. CID/SEC are only needed if:
- Your prop firm requires API-based authentication
- You want to use Tradovate's OAuth flow

To get them:
1. Log in to https://trader.tradovate.com
2. Go to Account → API Access
3. Create a new application
4. Copy the Client ID (CID) and Client Secret (SEC)

---

## Questions?

Refer to the Tradovate API documentation: https://api.tradovate.com
