const rupees = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export function formatInr(amount: number): string {
  return rupees.format(amount)
}
