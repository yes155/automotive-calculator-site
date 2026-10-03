export const toolCatalog = [
  { id: 'wheel-offset', number: '01', name: 'Wheel Offset', category: 'Wheels & Tires', categoryUrl: '/wheels-tires/', description: 'Compare inner clearance and outer poke.', units: 'in / mm' },
  { id: 'tire-size', number: '02', name: 'Tire Size', category: 'Wheels & Tires', categoryUrl: '/wheels-tires/', description: 'Compare dimensions and speedometer change.', units: 'mm / in / mph' },
  { id: 'compression-ratio', number: '03', name: 'Compression Ratio', category: 'Engine Geometry', categoryUrl: '/engine/', description: 'Calculate static compression from component volumes.', units: 'in / mm / cc' },
  { id: 'engine-displacement', number: '04', name: 'Engine Displacement', category: 'Engine Geometry', categoryUrl: '/engine/', description: 'Find displacement from bore, stroke, and cylinders.', units: 'cu in / L / cc' },
  { id: 'horsepower', number: '05', name: 'Horsepower', category: 'Performance', categoryUrl: '/performance/', description: 'Convert torque and engine speed into power.', units: 'lb-ft / RPM / hp' },
  { id: 'power-to-weight', number: '06', name: 'Power-to-Weight', category: 'Performance', categoryUrl: '/performance/', description: 'Put horsepower and vehicle weight in perspective.', units: 'hp / lb' },
  { id: 'quarter-mile', number: '07', name: 'Quarter Mile', category: 'Performance', categoryUrl: '/performance/', description: 'Estimate elapsed time and trap speed.', units: 'seconds / mph' },
  { id: 'fuel-injector', number: '08', name: 'Fuel Injector', category: 'Fueling', categoryUrl: '/fueling/', description: 'Size injector flow for your horsepower target.', units: 'lb/hr / cc/min' },
] as const;

export const toolHref = (id: string) => `/calculators/${id}/`;
