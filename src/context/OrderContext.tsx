import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';
import type { Product, ProductSize } from '../data/products';

/* ─── Types ────────────────────────────────────── */

export interface OrderItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

interface OrderState {
  items: OrderItem[];
}

type OrderAction =
  | { type: 'ADD_ITEM'; product: Product; size: ProductSize; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string; sizeLabel: string }
  | { type: 'UPDATE_QTY'; productId: string; sizeLabel: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: OrderItem[] };

interface OrderContextValue {
  items: OrderItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, size: ProductSize, quantity: number) => void;
  removeItem: (productId: string, sizeLabel: string) => void;
  updateQuantity: (productId: string, sizeLabel: string, quantity: number) => void;
  clearOrder: () => void;
}

/* ─── Reducer ──────────────────────────────────── */

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id && i.size.label === action.size.label
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id && i.size.label === action.size.label
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { product: action.product, size: action.size, quantity: action.quantity },
        ],
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (i) => !(i.product.id === action.productId && i.size.label === action.sizeLabel)
        ),
      };
    case 'UPDATE_QTY': {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.product.id === action.productId && i.size.label === action.sizeLabel)
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId && i.size.label === action.sizeLabel
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case 'CLEAR':
      return { items: [] };
    case 'HYDRATE':
      return { items: action.items };
    default:
      return state;
  }
}

/* ─── Context ──────────────────────────────────── */

const OrderContext = createContext<OrderContextValue | null>(null);

const STORAGE_KEY = 'khanshab-order';

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as OrderItem[];
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', items: parsed });
        }
      }
    } catch {
      // ignore corrupt data
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // quota exceeded — ignore
    }
  }, [state.items]);

  const addItem = useCallback(
    (product: Product, size: ProductSize, quantity: number) => {
      dispatch({ type: 'ADD_ITEM', product, size, quantity });
    },
    []
  );

  const removeItem = useCallback((productId: string, sizeLabel: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId, sizeLabel });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, sizeLabel: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QTY', productId, sizeLabel, quantity });
    },
    []
  );

  const clearOrder = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.size.price * i.quantity, 0);

  return (
    <OrderContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within <OrderProvider>');
  return ctx;
}
