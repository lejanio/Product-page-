import { ProductType } from './types';

export const productInitialState: ProductType = {
  name: '',
  tags: [],
  options: [
    {
      label: '',
      price: {
        value: 0,
        currency: {
          code: '',
          symbol: '',
          format: '',
        },
      },
      old_price: {
        value: 0,
        currency: {
          code: '',
          symbol: '',
          format: '',
        },
      },
    },
    {
      label: '',
      price: {
        value: 0,
        currency: {
          code: '',
          symbol: '',
          format: '',
        },
      },
      old_price: {
        value: 0,
        currency: {
          code: '',
          symbol: '',
          format: '',
        },
      },
    },
  ],
  discount: {
    amount: '',
    end_date: '',
  },
  gallery: [
    {
      main: '',
    },
    {
      main: '',
    },
  ],
  shipping: {
    method: {
      country: '',
      title: '',
      shipping_time: {
        value: '',
        info: '',
      },
      cost: {
        value: 0,
        currency: {
          code: '',
          symbol: '',
          format: '',
        },
      },
    },
    lead_time: {
      value: '',
      info: '',
    },
    props: {
      ready_to_ship: false,
      in_stock: false,
      fast_dispatch: false,
    },
  },
  reviews: {
    rating: '',
    count: 0,
    total_buyers: 0,
  },
};

export const optionsInitialState = [
  {
    label: '1080p',
    currency: 'R',
    price: '833.99',
    quantity: '0',
  },
  {
    label: '4K',
    currency: 'R',
    price: '895.31',
    quantity: '0',
  },
  {
    label: 'Battery (Accessories)',
    currency: 'R',
    price: '78.50',
    quantity: '0',
  },
];
