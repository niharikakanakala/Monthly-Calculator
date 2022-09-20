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
  
  //describe a function "sum" which returns the sum of an array by defining the types correctly
  export function sum([]) {
    
  }
  