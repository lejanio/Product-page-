import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Timer from '../Timer/Timer';
import QuantityRocker from '../QuantityRocker/QuantityRocker';
import Button from '../Button/Button';
import checkmark from '../../assets/images/checkmark_icon.png';
import promoLogo from '../../assets/images/march_expo_logo.png';
import chevron from '../../assets/images/chevron_icon.png';
import clock from '../../assets/images/clock_icon.png';
import shieldIcon from '../../assets/images/shield_icon.svg';
import visaLogo from '../../assets/images/visa_icon.svg';
import masterCardLogo from '../../assets/images/mastercard_icon.svg';
import applePayLogo from '../../assets/images/applepay_icon.svg';
import informationIcon from '../../assets/images/information_icon.png';
import mailIcon from '../../assets/images/mail_icon.png';
import star from '../../assets/images/star_icon.png';
import './Main.scss';
import '../../index.css';

type ProductType = {
  name: string;
  'tags': string [];
  'options': [
    {
      'label': string;
      'price': {
        'value': string;
        'currency': {
          'code': string;
          'symbol': string;
          'format': string;
        }
      },
      'old_price': {
        'value': string;
        'currency': {
          'code': string;
          'symbol': string;
          'format': string;
        }
      }
    },
    {
      'label': string;
      'price': {
        'value': string;
        'currency': {
          'code': string;
          'symbol': string;
          'format': string;
        }
      },
      'old_price': {
        'value': string;
        'currency': {
          'code': string;
          'symbol': string;
          'format': string;
        }
      }
    }
  ],
  'discount': {
    'amount': string;
    'end_date': string;
  },
  'gallery': [
    {
      'main': string;
    },
    {
      'main': string;
    }
  ],
  'shipping': {
    'method': {
      'country': string;
      'title': string;
      'shipping_time': {
        'value': string;
        'info': string;
      },
      'cost': {
        'value': string;
        'currency': {
          'code': string;
          'symbol': string;
          'format': string;
        }
      }
    },
    'lead_time': {
      'value': string;
      'info': string;
    },
    'props': {
      'ready_to_ship': boolean;
      'in_stock': boolean;
      'fast_dispatch': boolean;
    }
  },
  'reviews': {
    'rating': string;
    'count': number;
    'total_buyers': number;
  }
}

type RequestType = {
    product: ProductType;
    success: number;
}

const initialState: ProductType = {
  name: '',
  tags: [],
  options: [
    {
      label: '',
      price: {
        value: '',
        currency: {
          code: '',
          symbol: '',
          format: '',
        },
      },
      old_price: {
        value: '',
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
        value: '',
        currency: {
          code: '',
          symbol: '',
          format: '',
        },
      },
      old_price: {
        value: '',
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
        value: '',
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

const Main = () => {
  const [product, setProduct] = useState(initialState);
  const [starRating, setStarRating] = useState<string[]>([]);

  const {
    name, gallery, options, reviews, shipping, tags, discount,
  } = product;

  const fetchData = async () => {
    await axios.get<RequestType>('https://fe-assignment.vaimo.net/')
      .then((res) => {
        const result = res.data;

        setProduct(result.product);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateRatingArray = () => {
    const ratingArray: any = [];
    for (let i = 0; i < Math.floor(+reviews.rating); i += 1) {
      ratingArray.push(star);
    }
    setStarRating([...ratingArray]);
  };

  useEffect(() => {
    updateRatingArray();
  }, [product]);

  const productOptionValuesArray = Object.values(options);
  const optionsSortedByPrice = productOptionValuesArray.sort((a, b) => +a.price.value - +b.price.value);

  const productOptionEntriesArray = Object.entries(options);

  return (
    <>
      {(name === '')
        ? (<span>Loading...</span>)
        : (
          <div className="main-section">
            <div className="image-section">
              <img src={gallery[0].main} alt={name} className="image" />
            </div>
            <section className="description-section">
              <div className="description-section__header">
                <div className="description-header__top">
                  {shipping.props.ready_to_ship && (
                  <div className="description-header-top__item colored-item first">
                    Ready to Ship
                  </div>
                  )}
                  {shipping.props.in_stock && (
                  <div className="description-header-top__item">
                    <div className="image-wrapper">
                      <img src={checkmark} alt="checkmark" />
                    </div>
                    <span>In Stock</span>
                  </div>
                  )}
                  {shipping.props.fast_dispatch && (
                  <div className="description-header-top__item last">
                    <div className="image-wrapper">
                      <img src={checkmark} alt="checkmark" />
                    </div>
                    <span>Fast Dispatch</span>
                  </div>
                  )}
                </div>
                <div className="heading-container">
                  <h1 className="heading">{name}</h1>
                  <div className="heading-tags">
                    {product.tags.map((tag) => (
                      <span
                        key={uuidv4()}
                        className="heading-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="reviews">
                <div className="rating">
                  <div className="rating-stars">
                    <div>
                      {(reviews.rating !== '')
                && starRating.map((item: string) => (<img src={item} alt="rating" key={uuidv4()} />))}
                    </div>
                    <div>
                      {reviews.rating}
                    </div>
                  </div>
                  <div className="rating-count">
                    {reviews.count}
                    {' '}
                    Reviews
                  </div>
                </div>
                <div className="buyers">
                  {reviews.total_buyers}
                  {' '}
                  buyers
                </div>
              </div>

              <div className="pricing">
                <div className="prices">
                  <div className="discounted-prices">
                    {optionsSortedByPrice[0].price.currency.symbol}
                    {' '}
                    {Number(optionsSortedByPrice[0].price.value).toFixed(2)}
                    {' '}
                    -
                    {' '}
                    {optionsSortedByPrice[optionsSortedByPrice.length - 1].price.currency.symbol}
                    {' '}
                    {Number(optionsSortedByPrice[optionsSortedByPrice.length - 1].price.value).toFixed(2)}
                  </div>
                </div>
                <div className="pricing__text">
                  <span>
                    / Option
                    {' '}
                    <span className="pipe">|</span>
                  </span>
                  &nbsp;
                  <span className="minimum-order">
                    <span className="option-count">
                      {optionsSortedByPrice.length}
                      {' '}
                      Options
                    </span>
                    &nbsp;
                    (Min.Order)
                  </span>
                </div>
                <div className="original-prices">
                  {optionsSortedByPrice[0].old_price.currency.symbol}
                  {' '}
                  {Number(optionsSortedByPrice[0].old_price.value).toFixed(2)}
                  {' '}
                  -
                  {' '}
                  {optionsSortedByPrice[optionsSortedByPrice.length - 1].old_price.currency.symbol}
                  {' '}
                  {Number(Number(optionsSortedByPrice[optionsSortedByPrice.length - 1]
                    .old_price.value).toFixed(2)).toLocaleString()}
                </div>
              </div>

              <div className="promo">
                <div className="promo-item">
                  <img src={promoLogo} alt="Promotion Logo" className="logo" />
                </div>
                <div className="promo-item">
                  • Free shipping (up to $40)
                </div>
                <div className="promo-item large-display">
                  • On-time delivery guaranteed
                </div>
                <div className="promo-item">
                  <div>
                    <img src={chevron} alt="chevron logo" className="logo" />
                  </div>
                </div>
              </div>

              <div className="discount">
                <div className="discount-amount">
                  {discount.amount}
                  {' '}
                  OFF
                </div>
                <div className="discount-end">
                  Discount ends in
                  <div className="discount-timer">
                    <img src={clock} alt="clock" />
                    {(discount.end_date !== '')
                      && (<Timer endDate={discount.end_date} />)}
                  </div>
                </div>
              </div>

              <div className="options-container">
                <div className="padding-top-12 large-display">Options:</div>
                <div className="options">
                  {(discount.end_date !== '')
              && productOptionEntriesArray.map((item) => (
                <div
                  key={uuidv4()}
                  className="option"
                >
                  <div className="option__title">{item[1].label}</div>
                  <div className="option__price">
                    {item[1].price.currency.symbol}
                    {' '}
                    {Number(item[1].price.value).toFixed(2)}
                  </div>
                  <div>
                    <QuantityRocker />
                  </div>
                </div>
              ))}
                </div>
              </div>

              <div className="description-section__footer">
                <div className="description-section__footer-item">
                  <img src={shieldIcon} alt="Shield" />
                  <span className="bold">Trade Assurance</span>
                  {' '}
                  protects your Alibaba.com orders
                </div>
                <div className="description-section__footer-item gap-4">
                  Payments:
                  {' '}
                  <img src={visaLogo} alt="Visa" />
                  <img src={masterCardLogo} alt="MasterCard" />
                  <img src={applePayLogo} alt="ApplePay" />
                </div>
                <div className="description-section__footer-item gap-24">
                  <span>Alibaba.com Logistics</span>
                  <span>Inspection Solutions</span>
                </div>
              </div>

            </section>
            <div className="sidebar">
              {/* <div className="cart"> */}
              {/*   (PRODUCTS) */}
              {/* </div> */}
              <div className="summary-section">
                <div className="grid">
                  <div className="shipment-information">
                    <div>
                      Ship to
                      {' '}
                      <span className="underlined">
                        {shipping.method.country}
                        {' '}
                      </span>
                    </div>
                    <div className="underlined">
                      by
                      {' '}
                      {shipping.method.title.slice(0, 15).concat('...')}
                    </div>
                  </div>
                  <div className="total-amount">
                    {shipping.method.cost.currency.symbol}
                    {' '}
                    {Number(Number(shipping.method.cost.value).toFixed(2)).toLocaleString()}
                  </div>
                </div>
                <div className="flex vertical-center gap-28">
                  Lead Time
                  {' '}
                  {shipping.lead_time.value}
                  <div
                    title={shipping.lead_time.info.concat(' ').concat(shipping.lead_time.value)}
                    className="flex"
                  >
                    <img src={informationIcon} alt="Info" />
                  </div>
                </div>
                <div className="flex vertical-center gap-28">
                  Shipping time
                  {' '}
                  {shipping.method.shipping_time.value}
                  <div
                    title={shipping.method.shipping_time.info}
                    className="flex"
                  >
                    <img src={informationIcon} alt="Info" />
                  </div>
                </div>
                <div className="buttons">
                  <Button
                    color="orange"
                  >
                    Login to Purchase
                  </Button>
                  <Button
                    icon={mailIcon}
                    color="white"
                  >
                    Contact the Supplier
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Main;
