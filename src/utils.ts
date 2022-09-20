export function currencyFormat(number: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  }
  
  export function percentFormat(number: number) {
    if (number <= 0) return '---';
  
    return Number(number).toLocaleString(undefined, {
      style: 'percent',
      minimumFractionDigits: 0,
    });
  }
  
  //describe a function "sum" which returns the sum of an array using typescript
  export function sum(array: number[]) {
    return array.reduce((a, b) => a + b, 0);
  }
  