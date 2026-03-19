export interface MenuItem {
  id: string;
  name: string;
  category: 'Burgers' | 'Chicken' | 'Sides' | 'Drinks' | 'Desserts' | 'Vegan' | 'Kids';
  price: number;
  calories: number;
  image: string;
  description: string;
  popular?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'whopper',
    name: 'Whopper',
    category: 'Burgers',
    price: 6.49,
    calories: 660,
    image: 'https://picsum.photos/seed/whopper/400/300',
    description: 'The iconic flame-grilled beef patty topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
    popular: true
  },
  {
    id: 'double-whopper',
    name: 'Double Whopper',
    category: 'Burgers',
    price: 8.29,
    calories: 900,
    image: 'https://picsum.photos/seed/doublewhopper/400/300',
    description: 'Two flame-grilled beef patties with all the classic Whopper toppings.',
    popular: true
  },
  {
    id: 'impossible-whopper',
    name: 'Impossible Whopper',
    category: 'Vegan',
    price: 7.49,
    calories: 630,
    image: 'https://picsum.photos/seed/impossible/400/300',
    description: '100% Whopper, 0% Beef. A flame-grilled patty made from plants.',
    popular: true
  },
  {
    id: 'chicken-fries',
    name: 'Chicken Fries',
    category: 'Chicken',
    price: 4.99,
    calories: 280,
    image: 'https://picsum.photos/seed/chickenfries/400/300',
    description: 'Crispy, breaded white meat chicken shaped like fries.',
    popular: true
  },
  {
    id: 'french-fries',
    name: 'French Fries',
    category: 'Sides',
    price: 2.99,
    calories: 380,
    image: 'https://picsum.photos/seed/fries/400/300',
    description: 'Hot and crispy golden fries.'
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    category: 'Sides',
    price: 3.49,
    calories: 410,
    image: 'https://picsum.photos/seed/onionrings/400/300',
    description: 'Crunchy, golden-brown onion rings.'
  },
  {
    id: 'coke',
    name: 'Coca-Cola',
    category: 'Drinks',
    price: 2.49,
    calories: 210,
    image: 'https://picsum.photos/seed/coke/400/300',
    description: 'Refreshing classic Coca-Cola.'
  },
  {
    id: 'hersheys-pie',
    name: "Hershey's Sundae Pie",
    category: 'Desserts',
    price: 2.99,
    calories: 310,
    image: 'https://picsum.photos/seed/pie/400/300',
    description: 'One part crunchy chocolate crust and one part chocolate-crème filling.'
  }
];

export const DEALS = [
  {
    id: 'deal-1',
    title: '2 for $6 Mix n Match',
    description: 'Choose any two hero products for just $6.',
    code: 'BK26',
    expiry: '2026-04-01T00:00:00Z'
  },
  {
    id: 'deal-2',
    title: 'Free Whopper with $3+ Order',
    description: 'New app users only. Limited time offer.',
    code: 'FREEWHOP',
    expiry: '2026-03-25T00:00:00Z'
  }
];

export const LOCATIONS = [
  {
    id: 'loc-1',
    name: 'BK Downtown',
    address: '123 Main St, New York, NY 10001',
    lat: 40.7128,
    lng: -74.0060,
    hours: '24 Hours',
    driveThru: true
  },
  {
    id: 'loc-2',
    name: 'BK Brooklyn Heights',
    address: '456 Fulton St, Brooklyn, NY 11201',
    lat: 40.6925,
    lng: -73.9903,
    hours: '6:00 AM - 12:00 AM',
    driveThru: false
  }
];
