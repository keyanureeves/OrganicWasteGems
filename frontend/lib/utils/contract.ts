import { formatUnits, parseUnits } from 'viem'

// Format bigint to human-readable number
export function formatBigInt(value: bigint, decimals: number = 0): string {
  if (decimals === 0) {
    return value.toString()
  }
  return formatUnits(value, decimals)
}

// Convert number to bigint for contract calls
export function toBigInt(value: number, decimals: number = 0): bigint {
  if (decimals === 0) {
    return BigInt(value)
  }
  return parseUnits(value.toString(), decimals)
}

// Format token balance (OWG has 9 decimals)
export function formatTokenBalance(balance: bigint): string {
  return formatUnits(balance, 9)
}

// Parse token amount to bigint
export function parseTokenAmount(amount: string): bigint {
  return parseUnits(amount, 9)
}

// Format address (short version)
export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Format timestamp to date
export function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Convert grams to kg
export function gramsToKg(grams: bigint): string {
  return (Number(grams) / 1000).toFixed(2)
}

// Convert grams to tons
export function gramsToTons(grams: bigint): string {
  return (Number(grams) / 1000000).toFixed(2)
}

// Format KES currency
export function formatKES(amount: bigint): string {
  return `KES ${Number(amount).toLocaleString()}`
}

// Format large numbers with commas
export function formatNumber(value: bigint | number): string {
  return Number(value).toLocaleString()
}