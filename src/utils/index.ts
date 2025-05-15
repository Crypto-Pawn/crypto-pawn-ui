export function formatAddress(address: string, length = 4) {
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}
export function formatAddress2(address: string) {
  return address;
}