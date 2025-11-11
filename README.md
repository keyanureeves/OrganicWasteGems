# OrganicWasteGems (OWG) Token & Carbon Credit System

OrganicWasteGems is a tokenized reward and carbon credit tracking system built for farmers who recycle organic waste.  
Farmers earn **OWG tokens** and **carbon credits** based on the amount of organic waste they process.

---

## 🚀 Features

### 👨‍🌾 Farmer System
- Farmers register themselves once.
- Farmers process organic waste and earn:
  - **OWG Tokens** (1 token per 10kg of waste)
  - **Carbon Credits** (400g CO₂ saved per kg of waste)
- Tracks:
  - Total waste processed
  - Total CO₂ saved
  - Products claimed
  - Workers paid & payout history

### 🌱 Token (OWG)
- ERC-20 token with **9 decimals**
- Minted when farmers process waste or claim product tokens

### 🌍 Carbon Credit Marketplace
- Carbon credits are stored in **grams**
- Corporates can **buy carbon credits** (sold in **tons**)
- Sold credits are deducted from the farmer’s balance

### 📊 View Functions
- View individual farmer impact
- View global platform stats
- View waste history and worker payment records
- Check available carbon credits:
  ```solidity
  getAvailableCarbonCredits(address farmer)
