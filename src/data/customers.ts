export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  orders: number;
  lastOrder: Date;
}

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Harriet Santiago',
    email: 'harriet.santiago@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Harriet',
    totalSpent: 1204.75,
    orders: 5,
    lastOrder: new Date('2025-03-15'),
  },
  {
    id: '2',
    name: 'Sara Graham',
    email: 'sara.graham@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Sara',
    totalSpent: 3250.50,
    orders: 12,
    lastOrder: new Date('2025-03-10'),
  },
  {
    id: '3',
    name: 'Elmer McGee',
    email: 'elmer.mcgee@example.com',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Elmer',
    totalSpent: 875.25,
    orders: 3,
    lastOrder: new Date('2025-02-28'),
  },
  {
    id: '4',
    name: 'Victor Arnold',
    email: 'victor.arnold@example.com',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Victor',
    totalSpent: 1650.00,
    orders: 7,
    lastOrder: new Date('2025-03-05'),
  },
  {
    id: '5',
    name: 'Harriett Scott',
    email: 'harriett.scott@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Harriett',
    totalSpent: 425.75,
    orders: 2,
    lastOrder: new Date('2025-02-20'),
  },
  {
    id: '6',
    name: 'Patricia Vaughn',
    email: 'patricia.vaughn@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Patricia',
    totalSpent: 2175.50,
    orders: 9,
    lastOrder: new Date('2025-03-12'),
  },
  {
    id: '7',
    name: 'Earl Hopkins',
    email: 'earl.hopkins@example.com',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Earl',
    totalSpent: 750.00,
    orders: 4,
    lastOrder: new Date('2025-02-25'),
  },
  {
    id: '8',
    name: 'Melissa Chen',
    email: 'melissa.chen@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Melissa',
    totalSpent: 1875.25,
    orders: 8,
    lastOrder: new Date('2025-03-08'),
  },
  {
    id: '9',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Robert',
    totalSpent: 3450.75,
    orders: 14,
    lastOrder: new Date('2025-03-18'),
  },
  {
    id: '10',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Emma',
    totalSpent: 925.50,
    orders: 5,
    lastOrder: new Date('2025-03-02'),
  },
  {
    id: '11',
    name: 'David Lee',
    email: 'david.lee@example.com',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=David',
    totalSpent: 2750.25,
    orders: 11,
    lastOrder: new Date('2025-03-14'),
  },
  {
    id: '12',
    name: 'Sophia Martinez',
    email: 'sophia.martinez@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Sophia',
    totalSpent: 1525.75,
    orders: 6,
    lastOrder: new Date('2025-03-07'),
  }
]; 