import { RoomType, StyleType, BudgetLevel, ColorPalette, LightingAmbiance } from './types';

export const ROOM_TYPES: RoomType[] = ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Bathroom'];
export const STYLE_TYPES: StyleType[] = ['Modern', 'Minimal', 'Luxury', 'Scandinavian', 'Industrial', 'Bohemian'];
export const BUDGET_LEVELS: BudgetLevel[] = ['Economy', 'Mid-Range', 'Premium', 'Ultra-Luxury'];
export const COLOR_PALETTES: ColorPalette[] = ['Monochromatic', 'Earth Tones', 'Vibrant', 'Pastel', 'Dark & Moody', 'Warm & Cozy'];
export const LIGHTING_AMBIANCES: LightingAmbiance[] = ['Natural', 'Warm', 'Cool', 'Dramatic', 'Soft', 'Bright'];

export const MOCK_IMAGES: Record<string, string[]> = {
  // Living Room
  'Living Room-Modern': [
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=1200'
  ],
  'Living Room-Minimal': [
    'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200'
  ],
  'Living Room-Luxury': [
    'https://images.unsplash.com/photo-1600210491892-03d94ac25655?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200'
  ],
  'Living Room-Scandinavian': [
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1616489953149-7551bc3901f6?auto=format&fit=crop&q=80&w=1200'
  ],
  'Living Room-Industrial': [
    'https://images.unsplash.com/photo-1534433501711-ab3b03f0b24d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1594488650350-2f641777f98e?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1515542706656-8e6ef17a1ed2?auto=format&fit=crop&q=80&w=1200'
  ],
  'Living Room-Bohemian': [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=1200'
  ],
  // Bedroom
  'Bedroom-Modern': [
    'https://images.unsplash.com/photo-1505693413171-293669746a55?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1616594111791-ad421476921b?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200'
  ],
  'Bedroom-Minimal': [
    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200'
  ],
  'Bedroom-Luxury': [
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1616594111791-ad421476921b?auto=format&fit=crop&q=80&w=1200'
  ],
  'Bedroom-Scandinavian': [
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1616489953149-7551bc3901f6?auto=format&fit=crop&q=80&w=1200'
  ],
  'Bedroom-Industrial': [
    'https://images.unsplash.com/photo-1594488650350-2f641777f98e?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1515542706656-8e6ef17a1ed2?auto=format&fit=crop&q=80&w=1200'
  ],
  'Bedroom-Bohemian': [
    'https://images.unsplash.com/photo-1550226129-c3d5569424c5?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=1200'
  ],
  // Kitchen
  'Kitchen-Modern': [
    'https://images.unsplash.com/photo-1556912177-f5133917935a?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200'
  ],
  'Kitchen-Minimal': [
    'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600566752355-3979ff1040ad?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1200'
  ],
  'Kitchen-Luxury': [
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600210491892-03d94ac25655?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200'
  ],
  'Kitchen-Scandinavian': [
    'https://images.unsplash.com/photo-1556911220-e150213ff7ad?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1616489953149-7551bc3901f6?auto=format&fit=crop&q=80&w=1200'
  ],
  'Kitchen-Industrial': [
    'https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1534433501711-ab3b03f0b24d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1515542706656-8e6ef17a1ed2?auto=format&fit=crop&q=80&w=1200'
  ],
  'Kitchen-Bohemian': [
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=1200'
  ],
  // Office
  'Office-Modern': [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200'
  ],
  'Office-Minimal': [
    'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200'
  ],
  'Office-Luxury': [
    'https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1560185033-026868843954?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200'
  ],
  'Office-Scandinavian': [
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1616489953149-7551bc3901f6?auto=format&fit=crop&q=80&w=1200'
  ],
  'Office-Industrial': [
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1594488650350-2f641777f98e?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1515542706656-8e6ef17a1ed2?auto=format&fit=crop&q=80&w=1200'
  ],
  'Office-Bohemian': [
    'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200'
  ],
  // Bathroom
  'Bathroom-Modern': [
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200'
  ],
  'Bathroom-Minimal': [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200'
  ],
  'Bathroom-Luxury': [
    'https://images.unsplash.com/photo-1620626011761-9963d7b8970a?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200'
  ],
  'Bathroom-Scandinavian': [
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200'
  ],
  'Bathroom-Industrial': [
    'https://images.unsplash.com/photo-1581404476143-69335e4f4549?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1534433501711-ab3b03f0b24d?auto=format&fit=crop&q=80&w=1200'
  ],
  'Bathroom-Bohemian': [
    'https://images.unsplash.com/photo-1521783593447-5702b9bfd267?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200'
  ],
};

export const PRELOAD_IMAGES = Object.values(MOCK_IMAGES).flat();

export const STYLE_DESCRIPTIONS: Record<StyleType, { palette: string[], furniture: string[], lighting: string, summary: string }> = {
  Modern: {
    palette: ['#2C3E50', '#ECF0F1', '#E74C3C', '#BDC3C7'],
    furniture: ['Sleek leather modular sofa', 'Matte black metal shelving', 'Glass-top minimalist desk'],
    lighting: 'Linear LED architectural strips and architectural spotlights.',
    summary: 'A clean, high-contrast aesthetic prioritizing geometric precision and innovative materials.'
  },
  Minimal: {
    palette: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#BDBDBD'],
    furniture: ['Low-profile platform base', 'Handle-less cabinetry', 'Single monolithic stone table'],
    lighting: 'Soft, indirect perimeter lighting and integrated ceiling wash.',
    summary: 'Reductive design focusing on negative space, pure form, and silent luxury.'
  },
  Luxury: {
    palette: ['#1A1A1A', '#C5A021', '#4A0E0E', '#2D2D2D'],
    furniture: ['Polished marble surfaces', 'Velvet upholstered seating', 'Gold-leaf architectural accents'],
    lighting: 'Custom crystal feature installations and warm hidden accent lamps.',
    summary: 'Unapologetic opulence combined with masterful craftsmanship and premium material palettes.'
  },
  Scandinavian: {
    palette: ['#F9F9F9', '#D1D5DB', '#9CA3AF', '#4B5563'],
    furniture: ['White-washed oak frame bed', 'Wool-textured lounge chair', 'Nested wooden tables'],
    lighting: 'Warm 2700K floor lamps and natural daylight optimization.',
    summary: 'Human-centric design blending functionality with organic textures for maximum comfort.'
  },
  Industrial: {
    palette: ['#3D3D3D', '#8C7851', '#2C2C2C', '#54473F'],
    furniture: ['Aged cognac leather armchair', 'Raw steel workstation', 'Exposed brick feature wall'],
    lighting: 'Vintage-inspired filament bulbs and heavy-duty metal pendant shades.',
    summary: 'Rugged urban character celebrating raw structure and honest material exposure.'
  },
  Bohemian: {
    palette: ['#9A3412', '#065F46', '#B45309', '#BE123C'],
    furniture: ['Woven rattan hanging nook', 'Low-seated carved wooden table', 'Eclectic patterned textiles'],
    lighting: 'Pierced metal lanterns and layered string ambiance.',
    summary: 'A soulful, free-spirited curation of global textures and unconventional color stories.'
  }
};

export const CHAT_RESPONSES: Record<string, string> = {
  'hello': 'Greetings. I am your LuxeSpace AI concierge. How can I assist with your spatial refinement today?',
  'hi': 'Welcome to the studio. Are we looking to explore a new aesthetic direction for your space?',
  'price': 'LuxeSpace AI is currently in its private alpha phase. All spatial reconstructions are complimentary for our early adopters.',
  'help': 'I can assist with room categorization, style selection, or clarifying the neural synthesis process. What is on your mind?',
  'default': 'Fascinating. Our neural engine can certainly interpret that direction. Would you like to proceed with a specific room capture?'
};