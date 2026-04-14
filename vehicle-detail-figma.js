// Vehicle Detail Page - Figma Plugin API
// 1280px wide layout with sidebar + content area

// ─── Constants ───────────────────────────────────────────────────────────────
const PAGE_WIDTH = 1280;
const SIDEBAR_WIDTH = 240;
const CONTENT_WIDTH = PAGE_WIDTH - SIDEBAR_WIDTH; // 1040px
const SPACING = 4;

// Colors
const SIDEBAR_BG = '#23272f';
const WHITE = '#ffffff';
const NATURAL_50 = '#f7f7f8';
const NATURAL_100 = '#efeff0';
const NATURAL_600 = '#626265';
const NATURAL_900 = '#09090b';
const BRAND_500 = '#0f82ea';
const POSITIVE_BG = '#d9f3e3';
const POSITIVE_TEXT = '#349a5d';

// Typography
const INTER = 'Inter';

// Shadow
const CARD_SHADOW = {
  type: 'DROP_SHADOW',
  color: { r: 9/255, g: 9/255, b: 11/255, a: 0.06 },
  offset: { x: 0, y: 1 },
  radius: 3,
  spread: 0,
  visible: true,
  blendMode: 'NORMAL'
};

const CARD_SHADOW_2 = {
  type: 'DROP_SHADOW',
  color: { r: 9/255, g: 9/255, b: 11/255, a: 0.04 },
  offset: { x: 0, y: 1 },
  radius: 2,
  spread: 0,
  visible: true,
  blendMode: 'NORMAL'
};

// ─── Helper Functions ────────────────────────────────────────────────────────

function createFrame(props) {
  const frame = figma.createFrame();
  frame.name = props.name || 'Frame';
  frame.x = props.x || 0;
  frame.y = props.y || 0;
  frame.resize(props.width || 100, props.height || 100);
  
  if (props.fills) frame.fills = props.fills;
  if (props.strokes) frame.strokes = props.strokes;
  if (props.strokeWeight !== undefined) frame.strokeWeight = props.strokeWeight;
  if (props.cornerRadius !== undefined) frame.cornerRadius = props.cornerRadius;
  if (props.effects) frame.effects = props.effects;
  if (props.layoutMode) {
    frame.layoutMode = props.layoutMode;
    frame.primaryAxisSizingMode = props.primaryAxisSizingMode || 'AUTO';
    frame.counterAxisSizingMode = props.counterAxisSizingMode || 'AUTO';
    frame.itemSpacing = props.itemSpacing || 0;
    frame.paddingLeft = props.paddingLeft || 0;
    frame.paddingRight = props.paddingRight || 0;
    frame.paddingTop = props.paddingTop || 0;
    frame.paddingBottom = props.paddingBottom || 0;
  }
  if (props.clipsContent !== undefined) frame.clipsContent = props.clipsContent;
  
  return frame;
}

function createText(props) {
  const text = figma.createText();
  text.name = props.name || 'Text';
  if (props.x !== undefined) text.x = props.x;
  if (props.y !== undefined) text.y = props.y;
  
  // Set font first
  text.fontName = { family: INTER, style: props.weight === 600 ? 'Semi Bold' : 'Regular' };
  text.fontSize = props.fontSize || 16;
  if (props.lineHeight) text.lineHeight = props.lineHeight;
  
  // Resize text container if specified
  if (props.width) text.resize(props.width, props.height || 20);
  
  text.characters = props.characters || '';
  if (props.fills) text.fills = props.fills;
  if (props.textAlignHorizontal) text.textAlignHorizontal = props.textAlignHorizontal;
  if (props.textAlignVertical) text.textAlignVertical = props.textAlignVertical;
  
  return text;
}

function hexToFigmaColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b, a: 1 };
}

function solidFill(hex) {
  return [{ type: 'SOLID', color: hexToFigmaColor(hex) }];
}

function createBadge(text, x, y, bgColor, textColor) {
  const badge = createFrame({
    name: 'Badge',
    x,
    y,
    width: 80,
    height: 20,
    fills: solidFill(bgColor),
    cornerRadius: 9999,
    layoutMode: 'HORIZONTAL',
    primaryAxisSizingMode: 'AUTO',
    counterAxisSizingMode: 'AUTO',
    itemSpacing: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  });
  
  const label = createText({
    name: 'Badge Text',
    characters: text,
    fontSize: 12,
    weight: 600,
    fills: solidFill(textColor),
    lineHeight: { type: 'AUTO' },
  });
  
  badge.appendChild(label);
  return badge;
}

// ─── Main Page Frame ─────────────────────────────────────────────────────────
const page = createFrame({
  name: 'Vehicle Detail Page',
  x: 0,
  y: 0,
  width: PAGE_WIDTH,
  height: 900,
  fills: solidFill(WHITE),
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'FIXED',
  counterAxisSizingMode: 'AUTO',
  clipsContent: false,
});

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const sidebar = createFrame({
  name: 'Sidebar',
  x: 0,
  y: 0,
  width: SIDEBAR_WIDTH,
  height: 900,
  fills: solidFill(SIDEBAR_BG),
  layoutMode: 'VERTICAL',
  primaryAxisSizingMode: 'FIXED',
  counterAxisSizingMode: 'AUTO',
  itemSpacing: SPACING,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 24,
  paddingBottom: 24,
});

// Logo area
const logoFrame = createFrame({
  name: 'Logo',
  width: SIDEBAR_WIDTH - 32,
  height: 40,
  fills: [],
});

const logoText = createText({
  name: 'Logo Text',
  characters: 'DadyCar',
  fontSize: 20,
  weight: 600,
  fills: solidFill(WHITE),
  lineHeight: { type: 'AUTO' },
});
logoFrame.appendChild(logoText);
sidebar.appendChild(logoFrame);

// Nav separator
const navSeparator = createFrame({
  name: 'Separator',
  width: SIDEBAR_WIDTH - 32,
  height: 1,
  fills: solidFill('#2c3038'),
});
sidebar.appendChild(navSeparator);

// Nav items
const navItems = [
  { label: 'Dashboard', selected: false },
  { label: 'Vehicles', selected: true },
  { label: 'Drivers', selected: false },
  { label: 'Trips', selected: false },
  { label: 'Maintenance', selected: false },
  { label: 'Settings', selected: false },
];

navItems.forEach((item) => {
  const navItem = createFrame({
    name: `Nav: ${item.label}`,
    width: SIDEBAR_WIDTH - 32,
    height: 40,
    fills: item.selected ? solidFill(WHITE) : [],
    cornerRadius: item.selected ? 8 : 0,
    layoutMode: 'HORIZONTAL',
    primaryAxisSizingMode: 'AUTO',
    counterAxisSizingMode: 'AUTO',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
  });
  
  const navText = createText({
    characters: item.label,
    fontSize: 14,
    weight: 600,
    fills: item.selected ? solidFill(NATURAL_900) : solidFill(WHITE),
    lineHeight: { type: 'AUTO' },
  });
  
  navItem.appendChild(navText);
  sidebar.appendChild(navItem);
});

page.appendChild(sidebar);

// ─── Content Area ────────────────────────────────────────────────────────────
const contentArea = createFrame({
  name: 'Content Area',
  x: SIDEBAR_WIDTH,
  y: 0,
  width: CONTENT_WIDTH,
  height: 900,
  fills: solidFill(WHITE),
  layoutMode: 'VERTICAL',
  primaryAxisSizingMode: 'FIXED',
  counterAxisSizingMode: 'AUTO',
  clipsContent: false,
});

// ─── Top Bar (56px) ──────────────────────────────────────────────────────────
const topBar = createFrame({
  name: 'Top Bar',
  width: CONTENT_WIDTH,
  height: 56,
  fills: solidFill(WHITE),
  strokes: [{ type: 'SOLID', color: hexToFigmaColor(NATURAL_100) }],
  strokeWeight: 1,
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'AUTO',
  counterAxisSizingMode: 'FIXED',
  itemSpacing: 16,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 0,
  paddingBottom: 0,
  clipsContent: false,
});

// Breadcrumb
const breadcrumb = createText({
  name: 'Breadcrumb',
  characters: 'Fleet  ›  Vehicles  ›  AB-123-CD',
  fontSize: 14,
  weight: 400,
  fills: solidFill(NATURAL_600),
  lineHeight: { type: 'AUTO' },
});
topBar.appendChild(breadcrumb);

// Spacer to push buttons right
const spacer = createFrame({
  name: 'Spacer',
  width: 0,
  height: 1,
  fills: [],
  layoutGrow: 1,
});
topBar.appendChild(spacer);

// "Edit Vehicle" button (secondary)
const editBtn = createFrame({
  name: 'Edit Vehicle',
  height: 36,
  width: 120,
  fills: solidFill(WHITE),
  strokes: [{ type: 'SOLID', color: hexToFigmaColor('#afafb1') }],
  strokeWeight: 1,
  cornerRadius: 8,
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'CENTER',
  counterAxisSizingMode: 'CENTER',
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 8,
  paddingBottom: 8,
});

const editText = createText({
  characters: 'Edit Vehicle',
  fontSize: 14,
  weight: 600,
  fills: solidFill(NATURAL_900),
  lineHeight: { type: 'AUTO' },
});
editBtn.appendChild(editText);
topBar.appendChild(editBtn);

// "Assign Driver" button (primary)
const assignBtn = createFrame({
  name: 'Assign Driver',
  height: 36,
  width: 130,
  fills: solidFill(BRAND_500),
  cornerRadius: 8,
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'CENTER',
  counterAxisSizingMode: 'CENTER',
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 8,
  paddingBottom: 8,
});

const assignText = createText({
  characters: 'Assign Driver',
  fontSize: 14,
  weight: 600,
  fills: solidFill(WHITE),
  lineHeight: { type: 'AUTO' },
});
assignBtn.appendChild(assignText);
topBar.appendChild(assignBtn);

contentArea.appendChild(topBar);

// ─── Hero Card ───────────────────────────────────────────────────────────────
const heroCard = createFrame({
  name: 'Hero Card',
  width: CONTENT_WIDTH - 48, // 24px margin each side
  height: 180,
  fills: solidFill(WHITE),
  strokes: [{ type: 'SOLID', color: hexToFigmaColor(NATURAL_100) }],
  strokeWeight: 1,
  cornerRadius: 8,
  effects: [CARD_SHADOW, CARD_SHADOW_2],
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'FIXED',
  counterAxisSizingMode: 'FIXED',
  itemSpacing: 24,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 24,
  paddingBottom: 24,
  x: 24,
});

// Vehicle image placeholder
const imagePlaceholder = createFrame({
  name: 'Vehicle Image',
  width: 220,
  height: 132,
  fills: solidFill(NATURAL_50),
  cornerRadius: 8,
});
heroCard.appendChild(imagePlaceholder);

// Vehicle info section
const vehicleInfo = createFrame({
  name: 'Vehicle Info',
  width: 0,
  height: 132,
  fills: [],
  layoutMode: 'VERTICAL',
  primaryAxisSizingMode: 'AUTO',
  counterAxisSizingMode: 'AUTO',
  layoutGrow: 1,
  itemSpacing: 8,
});

// Top row: plate + status
const topRow = createFrame({
  name: 'Top Row',
  width: 0,
  height: 24,
  fills: [],
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'AUTO',
  counterAxisSizingMode: 'AUTO',
  itemSpacing: 12,
  layoutAlign: 'STRETCH',
});

const plateBadge = createBadge('AB-123-CD', 0, 0, NATURAL_50, NATURAL_900);
plateBadge.strokes = [{ type: 'SOLID', color: hexToFigmaColor(NATURAL_200) }];
plateBadge.strokeWeight = 1;
topRow.appendChild(plateBadge);

const statusBadge = createBadge('Active', 0, 0, POSITIVE_BG, POSITIVE_TEXT);
statusBadge.strokes = [{ type: 'SOLID', color: hexToFigmaColor('#8ddaac') }];
statusBadge.strokeWeight = 1;
topRow.appendChild(statusBadge);

vehicleInfo.appendChild(topRow);

// Vehicle name
const vehicleName = createText({
  name: 'Vehicle Name',
  characters: 'Renault Clio 2022',
  fontSize: 24,
  weight: 600,
  fills: solidFill(NATURAL_900),
  lineHeight: { type: 'PIXELS', value: 32 },
  letterSpacing: -0.5,
});
vehicleInfo.appendChild(vehicleName);

// Mileage and service info
const detailsRow = createFrame({
  name: 'Details Row',
  width: 0,
  height: 24,
  fills: [],
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'AUTO',
  counterAxisSizingMode: 'AUTO',
  itemSpacing: 24,
});

const mileageText = createText({
  characters: '87,432 km',
  fontSize: 16,
  weight: 400,
  fills: solidFill(NATURAL_600),
  lineHeight: { type: 'AUTO' },
});
detailsRow.appendChild(mileageText);

const serviceLabel = createText({
  characters: 'Next service: ',
  fontSize: 14,
  weight: 400,
  fills: solidFill(NATURAL_600),
  lineHeight: { type: 'AUTO' },
});

const serviceDate = createText({
  characters: 'May 15, 2026',
  fontSize: 14,
  weight: 600,
  fills: solidFill(BRAND_500),
  lineHeight: { type: 'AUTO' },
});

const serviceRow = createFrame({
  name: 'Service Row',
  width: 0,
  height: 20,
  fills: [],
  layoutMode: 'HORIZONTAL',
  itemSpacing: 0,
});
serviceRow.appendChild(serviceLabel);
serviceRow.appendChild(serviceDate);
detailsRow.appendChild(serviceRow);

vehicleInfo.appendChild(detailsRow);
heroCard.appendChild(vehicleInfo);
contentArea.appendChild(heroCard);

// ─── KPI Row ─────────────────────────────────────────────────────────────────
const kpiContainer = createFrame({
  name: 'KPI Container',
  width: CONTENT_WIDTH - 48,
  height: 140,
  fills: [],
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'AUTO',
  counterAxisSizingMode: 'FIXED',
  itemSpacing: 16,
  x: 24,
});

const kpiData = [
  { label: 'Distance', value: '3,842 km', trend: '+12%', trendType: 'positive' },
  { label: 'Fuel', value: '312 L', trend: '-5%', trendType: 'positive' },
  { label: 'Active Days', value: '18', trend: '0', trendType: 'neutral' },
  { label: 'Incidents', value: '0', trend: '', trendType: 'neutral' },
];

kpiData.forEach((kpi) => {
  const kpiCard = createFrame({
    name: `KPI: ${kpi.label}`,
    width: (CONTENT_WIDTH - 48 - 48) / 4, // equal width cards
    height: 140,
    fills: solidFill(WHITE),
    strokes: [{ type: 'SOLID', color: hexToFigmaColor(NATURAL_100) }],
    strokeWeight: 1,
    cornerRadius: 8,
    effects: [CARD_SHADOW, CARD_SHADOW_2],
    layoutMode: 'VERTICAL',
    primaryAxisSizingMode: 'AUTO',
    counterAxisSizingMode: 'AUTO',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
    paddingBottom: 24,
    itemSpacing: 4,
  });
  
  // KPI label
  const kpiLabel = createText({
    characters: kpi.label,
    fontSize: 14,
    weight: 400,
    fills: solidFill(NATURAL_600),
    lineHeight: { type: 'AUTO' },
  });
  kpiCard.appendChild(kpiLabel);
  
  // KPI value
  const kpiValue = createText({
    characters: kpi.value,
    fontSize: 32,
    weight: 600,
    fills: solidFill(NATURAL_900),
    lineHeight: { type: 'PIXELS', value: 40 },
    letterSpacing: -0.5,
  });
  kpiCard.appendChild(kpiValue);
  
  // Spacer to push trend to bottom-right
  const kpiSpacer = createFrame({
    name: 'KPI Spacer',
    width: 0,
    height: 0,
    fills: [],
    layoutGrow: 1,
  });
  kpiCard.appendChild(kpiSpacer);
  
  // Trend badge
  if (kpi.trend) {
    const trendColor = kpi.trendType === 'positive' 
      ? { bg: POSITIVE_BG, text: POSITIVE_TEXT }
      : { bg: NATURAL_50, text: NATURAL_600 };
    
    const trendBadge = createBadge(kpi.trend, 0, 0, trendColor.bg, trendColor.text);
    trendBadge.layoutAlign = 'MAX';
    kpiCard.appendChild(trendBadge);
  }
  
  kpiContainer.appendChild(kpiCard);
});

contentArea.appendChild(kpiContainer);

// ─── Bottom Section ──────────────────────────────────────────────────────────
const bottomSection = createFrame({
  name: 'Bottom Section',
  width: CONTENT_WIDTH - 48,
  height: 380,
  fills: [],
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'AUTO',
  counterAxisSizingMode: 'FIXED',
  itemSpacing: 16,
  x: 24,
});

// ─── Trip History Table (Left 65%) ───────────────────────────────────────────
const tableWidth = Math.floor((CONTENT_WIDTH - 48 - 16) * 0.65);

const tripTable = createFrame({
  name: 'Trip History',
  width: tableWidth,
  height: 380,
  fills: solidFill(WHITE),
  strokes: [{ type: 'SOLID', color: hexToFigmaColor(NATURAL_100) }],
  strokeWeight: 1,
  cornerRadius: 8,
  effects: [CARD_SHADOW, CARD_SHADOW_2],
  layoutMode: 'VERTICAL',
  primaryAxisSizingMode: 'FIXED',
  counterAxisSizingMode: 'FIXED',
  clipsContent: false,
});

// Table header
const tableHeader = createFrame({
  name: 'Table Header',
  width: tableWidth,
  height: 40,
  fills: solidFill(NATURAL_50),
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'AUTO',
  counterAxisSizingMode: 'FIXED',
  itemSpacing: 0,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 10,
  paddingBottom: 10,
});

const columns = [
  { name: 'Date', width: 90 },
  { name: 'Driver', width: 110 },
  { name: 'Origin', width: 120 },
  { name: 'Destination', width: 120 },
  { name: 'Distance', width: 80 },
  { name: 'Status', width: 80 },
];

columns.forEach((col) => {
  const colText = createText({
    characters: col.name,
    fontSize: 12,
    weight: 600,
    fills: solidFill(NATURAL_600),
    lineHeight: { type: 'AUTO' },
    width: col.width,
  });
  tableHeader.appendChild(colText);
});

tripTable.appendChild(tableHeader);

// Table rows
const tripData = [
  { date: 'Apr 12', driver: 'John Doe', origin: 'Paris', destination: 'Lyon', distance: '463 km', status: 'Completed', statusType: 'positive' },
  { date: 'Apr 11', driver: 'Jane Smith', origin: 'Marseille', destination: 'Nice', distance: '198 km', status: 'Completed', statusType: 'positive' },
  { date: 'Apr 10', driver: 'John Doe', origin: 'Lyon', destination: 'Paris', distance: '465 km', status: 'In Progress', statusType: 'info' },
  { date: 'Apr 09', driver: 'Mike Brown', origin: 'Bordeaux', destination: 'Toulouse', distance: '242 km', status: 'Completed', statusType: 'positive' },
  { date: 'Apr 08', driver: 'Jane Smith', origin: 'Nice', destination: 'Marseille', distance: '200 km', status: 'Cancelled', statusType: 'negative' },
];

const statusColors = {
  positive: { bg: POSITIVE_BG, text: POSITIVE_TEXT, border: '#8ddaac' },
  info: { bg: '#cfe6fb', text: '#0c68bb', border: '#6fb4f2' },
  negative: { bg: '#fcdada', text: '#bf3636', border: '#f58f8f' },
};

tripData.forEach((trip, index) => {
  const row = createFrame({
    name: `Row ${index + 1}`,
    width: tableWidth,
    height: 52,
    fills: solidFill(WHITE),
    layoutMode: 'HORIZONTAL',
    primaryAxisSizingMode: 'AUTO',
    counterAxisSizingMode: 'FIXED',
    itemSpacing: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  });
  
  // Bottom border
  if (index < tripData.length - 1) {
    row.strokes = [{ type: 'SOLID', color: hexToFigmaColor(NATURAL_100) }];
    row.strokeWeight = 1;
  }
  
  // Date
  const dateText = createText({
    characters: trip.date,
    fontSize: 14,
    weight: 400,
    fills: solidFill(NATURAL_900),
    lineHeight: { type: 'AUTO' },
    width: 90,
  });
  row.appendChild(dateText);
  
  // Driver
  const driverText = createText({
    characters: trip.driver,
    fontSize: 14,
    weight: 400,
    fills: solidFill(NATURAL_900),
    lineHeight: { type: 'AUTO' },
    width: 110,
  });
  row.appendChild(driverText);
  
  // Origin
  const originText = createText({
    characters: trip.origin,
    fontSize: 14,
    weight: 400,
    fills: solidFill(NATURAL_900),
    lineHeight: { type: 'AUTO' },
    width: 120,
  });
  row.appendChild(originText);
  
  // Destination
  const destText = createText({
    characters: trip.destination,
    fontSize: 14,
    weight: 400,
    fills: solidFill(NATURAL_900),
    lineHeight: { type: 'AUTO' },
    width: 120,
  });
  row.appendChild(destText);
  
  // Distance
  const distText = createText({
    characters: trip.distance,
    fontSize: 14,
    weight: 400,
    fills: solidFill(NATURAL_900),
    lineHeight: { type: 'AUTO' },
    width: 80,
  });
  row.appendChild(distText);
  
  // Status badge
  const statusStyle = statusColors[trip.statusType];
  const statusBadge = createBadge(trip.status, 0, 0, statusStyle.bg, statusStyle.text);
  statusBadge.strokes = [{ type: 'SOLID', color: hexToFigmaColor(statusStyle.border) }];
  statusBadge.strokeWeight = 1;
  row.appendChild(statusBadge);
  
  tripTable.appendChild(row);
});

bottomSection.appendChild(tripTable);

// ─── Maintenance Timeline (Right 35%) ────────────────────────────────────────
const timelineWidth = Math.floor((CONTENT_WIDTH - 48 - 16) * 0.35);

const maintenanceTimeline = createFrame({
  name: 'Maintenance Timeline',
  width: timelineWidth,
  height: 380,
  fills: solidFill(WHITE),
  strokes: [{ type: 'SOLID', color: hexToFigmaColor(NATURAL_100) }],
  strokeWeight: 1,
  cornerRadius: 8,
  effects: [CARD_SHADOW, CARD_SHADOW_2],
  layoutMode: 'VERTICAL',
  primaryAxisSizingMode: 'AUTO',
  counterAxisSizingMode: 'FIXED',
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 24,
  paddingBottom: 24,
  itemSpacing: 16,
});

// Title
const timelineTitle = createText({
  characters: 'Maintenance',
  fontSize: 20,
  weight: 600,
  fills: solidFill(NATURAL_900),
  lineHeight: { type: 'PIXELS', value: 28 },
});
maintenanceTimeline.appendChild(timelineTitle);

// Timeline events
const events = [
  { date: 'Apr 10, 2026', title: 'Oil Change', status: 'Completed', statusType: 'positive', color: '#349a5d' },
  { date: 'Mar 22, 2026', title: 'Tire Rotation', status: 'Completed', statusType: 'positive', color: '#349a5d' },
  { date: 'May 15, 2026', title: 'Brake Inspection', status: 'Scheduled', statusType: 'info', color: BRAND_500 },
  { date: 'Jun 01, 2026', title: 'Annual Service', status: 'Scheduled', statusType: 'info', color: BRAND_500 },
];

events.forEach((event, index) => {
  const eventRow = createFrame({
    name: `Event ${index + 1}`,
    width: timelineWidth - 48,
    height: 48,
    fills: [],
    layoutMode: 'HORIZONTAL',
    primaryAxisSizingMode: 'AUTO',
    counterAxisSizingMode: 'AUTO',
    itemSpacing: 12,
  });
  
  // Colored dot
  const dot = createFrame({
    name: 'Dot',
    width: 10,
    height: 10,
    fills: solidFill(event.color),
    cornerRadius: 9999,
  });
  eventRow.appendChild(dot);
  
  // Event info
  const eventInfo = createFrame({
    name: 'Event Info',
    width: 0,
    height: 48,
    fills: [],
    layoutMode: 'VERTICAL',
    primaryAxisSizingMode: 'AUTO',
    counterAxisSizingMode: 'AUTO',
    layoutGrow: 1,
    itemSpacing: 4,
  });
  
  const eventTitle = createText({
    characters: event.title,
    fontSize: 14,
    weight: 600,
    fills: solidFill(NATURAL_900),
    lineHeight: { type: 'AUTO' },
  });
  eventInfo.appendChild(eventTitle);
  
  const eventDate = createText({
    characters: event.date,
    fontSize: 12,
    weight: 400,
    fills: solidFill(NATURAL_600),
    lineHeight: { type: 'AUTO' },
  });
  eventInfo.appendChild(eventDate);
  
  eventRow.appendChild(eventInfo);
  
  // Status badge
  const eventStatusStyle = statusColors[event.statusType];
  const eventBadge = createBadge(event.status, 0, 0, eventStatusStyle.bg, eventStatusStyle.text);
  eventBadge.strokes = [{ type: 'SOLID', color: hexToFigmaColor(eventStatusStyle.border) }];
  eventBadge.strokeWeight = 1;
  eventRow.appendChild(eventBadge);
  
  maintenanceTimeline.appendChild(eventRow);
});

bottomSection.appendChild(maintenanceTimeline);
contentArea.appendChild(bottomSection);

// Center the content area vertically if needed
page.appendChild(contentArea);

// ─── Set Font (async) ────────────────────────────────────────────────────────
// Ensure Inter font is loaded
async function loadFont() {
  try {
    await figma.loadFontAsync({ family: INTER, style: 'Regular' });
    await figma.loadFontAsync({ family: INTER, style: 'Semi Bold' });
    console.log('Inter font loaded successfully');
  } catch (err) {
    console.error('Font loading error:', err);
  }
}

// Notify completion
figma.notify('Vehicle Detail Page created successfully!');
