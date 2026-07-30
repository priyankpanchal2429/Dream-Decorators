export function numberToWordsINR(num: number): string {
  if (!num || isNaN(num)) return 'ZERO RUPEES ONLY';

  const a = [
    '', 'ONE ', 'TWO ', 'THREE ', 'FOUR ', 'FIVE ', 'SIX ', 'SEVEN ', 'EIGHT ', 'NINE ', 'TEN ',
    'ELEVEN ', 'TWELVE ', 'THIRTEEN ', 'FOURTEEN ', 'FIFTEEN ', 'SIXTEEN ', 'SEVENTEEN ', 'EIGHTEEN ', 'NINETEEN '
  ];
  const b = ['', '', 'TWENTY ', 'THIRTY ', 'FORTY ', 'FIFTY ', 'SIXTY ', 'SEVENTY ', 'EIGHTY ', 'NINETY '];

  function inWords(n: number): string {
    if (n < 20) return a[n];
    const digit = n % 10;
    return b[Math.floor(n / 10)] + a[digit];
  }

  const roundedNum = Math.round(num);
  let str = '';

  const crore = Math.floor(roundedNum / 10000000);
  let remainder = roundedNum % 10000000;

  const lakh = Math.floor(remainder / 100000);
  remainder = remainder % 100000;

  const thousand = Math.floor(remainder / 1000);
  remainder = remainder % 1000;

  const hundred = Math.floor(remainder / 100);
  remainder = remainder % 100;

  if (crore > 0) {
    str += inWords(crore) + 'CRORE ';
  }
  if (lakh > 0) {
    str += inWords(lakh) + 'LAKH ';
  }
  if (thousand > 0) {
    str += inWords(thousand) + 'THOUSAND ';
  }
  if (hundred > 0) {
    str += inWords(hundred) + 'HUNDRED ';
  }
  if (remainder > 0) {
    str += inWords(remainder);
  }

  return (str.trim() + ' RUPEES ONLY').toUpperCase();
}
