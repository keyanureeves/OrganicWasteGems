// Farmer Data Types
export interface FarmerData {
  isRegistered: boolean
  totalWasteKg: bigint
  totalCO2Saved: bigint
  totalProductKg: bigint
  totalWorkersPaid: bigint
  totalPayoutKES: bigint
}

export interface WasteCollection {
  kgCollected: bigint
  timestamp: bigint
  workersInvolved: bigint
  workersPaymentKES: bigint
  wasteType: string
}

export interface WorkerPayment {
  worker: string
  amountKES: bigint
  timestamp: bigint
}

export interface CarbonCredits {
  availableTons: bigint
  totalEarnedTons: bigint
  soldTons: bigint
}

export interface GlobalStats {
  farmersCount: bigint
  wasteKg: bigint
  co2SavedKg: bigint
  tokensCirculating: bigint
  carbonCreditsSoldTons: bigint
}

export interface FarmerImpact {
  wasteKg: bigint
  productKg: bigint
  co2Grams: bigint
  co2Kg: bigint
  tokens: bigint
  workersPaid: bigint
  totalPayoutKES: bigint
}

// Form Input Types
export interface ProcessWasteInput {
  collectedWasteKg: number
  wasteType: string
  workersInvolved: number
  workersPaymentKES: number
}

export interface ClaimTokensInput {
  productKg: number
}

export interface BuyCarbonCreditsInput {
  farmerAddress: string
  tonsCO2: number
  priceKES: number
}