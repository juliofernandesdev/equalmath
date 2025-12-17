import { ConversionCategory } from '../types';

export const conversionCategories: ConversionCategory[] = [
  {
    id: 'length',
    name: 'Comprimento',
    icon: '📏',
    units: [
      { id: 'km', name: 'Quilômetro', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'm', name: 'Metro', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
      { id: 'cm', name: 'Centímetro', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: 'mm', name: 'Milímetro', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'mi', name: 'Milha', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: 'yd', name: 'Jarda', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: 'ft', name: 'Pé', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'in', name: 'Polegada', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: 'nm', name: 'Milha Náutica', symbol: 'nmi', toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
      { id: 'um', name: 'Micrômetro', symbol: 'µm', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: 'ly', name: 'Ano-luz', symbol: 'ly', toBase: (v) => v * 9.461e15, fromBase: (v) => v / 9.461e15 },
    ],
  },
  {
    id: 'mass',
    name: 'Massa',
    icon: '⚖️',
    units: [
      { id: 't', name: 'Tonelada', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'kg', name: 'Quilograma', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
      { id: 'g', name: 'Grama', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'mg', name: 'Miligrama', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: 'lb', name: 'Libra', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { id: 'oz', name: 'Onça', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      { id: 'st', name: 'Stone', symbol: 'st', toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
      { id: 'ct', name: 'Quilate', symbol: 'ct', toBase: (v) => v * 0.0002, fromBase: (v) => v / 0.0002 },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperatura',
    icon: '🌡️',
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
      { id: 'f', name: 'Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
      { id: 'k', name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
      { id: 'r', name: 'Rankine', symbol: '°R', toBase: (v) => (v - 491.67) * 5/9, fromBase: (v) => v * 9/5 + 491.67 },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: '🧊',
    units: [
      { id: 'm3', name: 'Metro Cúbico', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'l', name: 'Litro', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
      { id: 'ml', name: 'Mililitro', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'gal', name: 'Galão (US)', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { id: 'qt', name: 'Quarto (US)', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      { id: 'pt', name: 'Pinta (US)', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
      { id: 'cup', name: 'Xícara (US)', symbol: 'cup', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      { id: 'floz', name: 'Onça Fluida (US)', symbol: 'fl oz', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
      { id: 'tbsp', name: 'Colher de Sopa', symbol: 'tbsp', toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
      { id: 'tsp', name: 'Colher de Chá', symbol: 'tsp', toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
    ],
  },
  {
    id: 'area',
    name: 'Área',
    icon: '📐',
    units: [
      { id: 'km2', name: 'Quilômetro²', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'm2', name: 'Metro²', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
      { id: 'cm2', name: 'Centímetro²', symbol: 'cm²', toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      { id: 'ac', name: 'Acre', symbol: 'ac', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      { id: 'mi2', name: 'Milha²', symbol: 'mi²', toBase: (v) => v * 2589988.11, fromBase: (v) => v / 2589988.11 },
      { id: 'yd2', name: 'Jarda²', symbol: 'yd²', toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
      { id: 'ft2', name: 'Pé²', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { id: 'in2', name: 'Polegada²', symbol: 'in²', toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
    ],
  },
  {
    id: 'speed',
    name: 'Velocidade',
    icon: '🚀',
    units: [
      { id: 'mps', name: 'Metro/Segundo', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kmh', name: 'Quilômetro/Hora', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: 'mph', name: 'Milha/Hora', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: 'kn', name: 'Nó', symbol: 'kn', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
      { id: 'fps', name: 'Pé/Segundo', symbol: 'ft/s', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'mach', name: 'Mach', symbol: 'Ma', toBase: (v) => v * 343, fromBase: (v) => v / 343 },
      { id: 'c', name: 'Velocidade da Luz', symbol: 'c', toBase: (v) => v * 299792458, fromBase: (v) => v / 299792458 },
    ],
  },
  {
    id: 'time',
    name: 'Tempo',
    icon: '⏱️',
    units: [
      { id: 'y', name: 'Ano', symbol: 'ano', toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
      { id: 'mo', name: 'Mês', symbol: 'mês', toBase: (v) => v * 2628000, fromBase: (v) => v / 2628000 },
      { id: 'w', name: 'Semana', symbol: 'sem', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      { id: 'd', name: 'Dia', symbol: 'd', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: 'h', name: 'Hora', symbol: 'h', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: 'min', name: 'Minuto', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: 's', name: 'Segundo', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
      { id: 'ms', name: 'Milissegundo', symbol: 'ms', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'us', name: 'Microssegundo', symbol: 'µs', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: 'ns', name: 'Nanossegundo', symbol: 'ns', toBase: (v) => v / 1000000000, fromBase: (v) => v * 1000000000 },
    ],
  },
  {
    id: 'data',
    name: 'Dados',
    icon: '💾',
    units: [
      { id: 'tb', name: 'Terabyte', symbol: 'TB', toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
      { id: 'gb', name: 'Gigabyte', symbol: 'GB', toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      { id: 'mb', name: 'Megabyte', symbol: 'MB', toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      { id: 'kb', name: 'Kilobyte', symbol: 'KB', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: 'b', name: 'Byte', symbol: 'B', toBase: (v) => v, fromBase: (v) => v },
      { id: 'bit', name: 'Bit', symbol: 'bit', toBase: (v) => v / 8, fromBase: (v) => v * 8 },
      { id: 'tib', name: 'Tebibyte', symbol: 'TiB', toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
      { id: 'gib', name: 'Gibibyte', symbol: 'GiB', toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
    ],
  },
  {
    id: 'energy',
    name: 'Energia',
    icon: '⚡',
    units: [
      { id: 'j', name: 'Joule', symbol: 'J', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kj', name: 'Quilojoule', symbol: 'kJ', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'cal', name: 'Caloria', symbol: 'cal', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
      { id: 'kcal', name: 'Quilocaloria', symbol: 'kcal', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
      { id: 'wh', name: 'Watt-hora', symbol: 'Wh', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: 'kwh', name: 'Quilowatt-hora', symbol: 'kWh', toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
      { id: 'ev', name: 'Elétron-volt', symbol: 'eV', toBase: (v) => v * 1.602e-19, fromBase: (v) => v / 1.602e-19 },
      { id: 'btu', name: 'BTU', symbol: 'BTU', toBase: (v) => v * 1055.06, fromBase: (v) => v / 1055.06 },
    ],
  },
  {
    id: 'pressure',
    name: 'Pressão',
    icon: '🎈',
    units: [
      { id: 'pa', name: 'Pascal', symbol: 'Pa', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kpa', name: 'Quilopascal', symbol: 'kPa', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'bar', name: 'Bar', symbol: 'bar', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      { id: 'atm', name: 'Atmosfera', symbol: 'atm', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
      { id: 'psi', name: 'PSI', symbol: 'psi', toBase: (v) => v * 6894.76, fromBase: (v) => v / 6894.76 },
      { id: 'mmhg', name: 'mmHg', symbol: 'mmHg', toBase: (v) => v * 133.322, fromBase: (v) => v / 133.322 },
      { id: 'torr', name: 'Torr', symbol: 'Torr', toBase: (v) => v * 133.322, fromBase: (v) => v / 133.322 },
    ],
  },
  {
    id: 'angle',
    name: 'Ângulo',
    icon: '📐',
    units: [
      { id: 'deg', name: 'Grau', symbol: '°', toBase: (v) => v, fromBase: (v) => v },
      { id: 'rad', name: 'Radiano', symbol: 'rad', toBase: (v) => v * (180 / Math.PI), fromBase: (v) => v * (Math.PI / 180) },
      { id: 'grad', name: 'Grado', symbol: 'grad', toBase: (v) => v * 0.9, fromBase: (v) => v / 0.9 },
      { id: 'arcmin', name: 'Minuto de Arco', symbol: "'", toBase: (v) => v / 60, fromBase: (v) => v * 60 },
      { id: 'arcsec', name: 'Segundo de Arco', symbol: '"', toBase: (v) => v / 3600, fromBase: (v) => v * 3600 },
      { id: 'turn', name: 'Volta', symbol: 'volta', toBase: (v) => v * 360, fromBase: (v) => v / 360 },
    ],
  },
  {
    id: 'currency',
    name: 'Moeda',
    icon: '💰',
    units: [
      { id: 'brl', name: 'Real', symbol: 'R$', toBase: (v) => v, fromBase: (v) => v },
      { id: 'usd', name: 'Dólar', symbol: '$', toBase: (v) => v * 5.0, fromBase: (v) => v / 5.0 },
      { id: 'eur', name: 'Euro', symbol: '€', toBase: (v) => v * 5.4, fromBase: (v) => v / 5.4 },
      { id: 'gbp', name: 'Libra', symbol: '£', toBase: (v) => v * 6.3, fromBase: (v) => v / 6.3 },
      { id: 'jpy', name: 'Iene', symbol: '¥', toBase: (v) => v * 0.033, fromBase: (v) => v / 0.033 },
      { id: 'cny', name: 'Yuan', symbol: '¥', toBase: (v) => v * 0.69, fromBase: (v) => v / 0.69 },
      { id: 'ars', name: 'Peso Argentino', symbol: 'ARS', toBase: (v) => v * 0.005, fromBase: (v) => v / 0.005 },
    ],
  },
];

export function convert(value: number, fromUnit: string, toUnit: string, categoryId: string): number {
  const category = conversionCategories.find(c => c.id === categoryId);
  if (!category) return value;

  const from = category.units.find(u => u.id === fromUnit);
  const to = category.units.find(u => u.id === toUnit);

  if (!from || !to) return value;

  const baseValue = from.toBase(value);
  return to.fromBase(baseValue);
}
