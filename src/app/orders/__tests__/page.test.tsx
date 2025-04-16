import { render, screen, fireEvent } from '@testing-library/react';
import OrdersPage from '../page';
import { OrderProvider } from '@/context/OrderContext';
import { DialogProvider } from '@/services/DialogService';

// Mock the hooks and components
jest.mock('@/hooks/usePagination', () => ({
  usePagination: jest.fn().mockReturnValue({
    currentPage: 1,
    setCurrentPage: jest.fn(),
    paginatedItems: [],
    totalItems: 0,
  }),
}));

describe('OrdersPage', () => {
  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
  });

  it('renders the search bar with correct placeholder', () => {
    render(
      <DialogProvider>
        <OrderProvider>
          <OrdersPage />
        </OrderProvider>
      </DialogProvider>
    );
    
    const searchBar = screen.getByPlaceholderText('Search by Order ID or Customer Name');
    expect(searchBar).toBeInTheDocument();
  });

  it('updates search query when typing in search bar', () => {
    render(
      <DialogProvider>
        <OrderProvider>
          <OrdersPage />
        </OrderProvider>
      </DialogProvider>
    );
    
    const searchBar = screen.getByPlaceholderText('Search by Order ID or Customer Name');
    fireEvent.change(searchBar, { target: { value: '121 091' } });
    
    // The state update would normally filter the list
    // In a more comprehensive test, we would verify the filtered results
    expect(searchBar).toHaveValue('121 091');
  });
}); 