import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Timer from '../Timer/Timer';
import QuantityRocker from '../QuantityRocker/QuantityRocker';
import Button from '../Button/Button';
import spinner from '../../assets/images/spinner.gif';
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
import { RequestType } from './types';
import { productInitialState, optionsInitialState } from './initialStates';

const Main = () => {
  const [product, setProduct] = useState(productInitialState);
  const [starRating, setStarRating] = useState<string[]>([]);
  const [optionQuantityValues, setOptionQuantityValues] = useState(optionsInitialState);
  const [totalCart, setTotalCart] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const {
    name, gallery, options, reviews, shipping, tags, discount,
  } = product;

  useEffect(() => {
    const fetchData = () => {
      axios.get<RequestType>('https://fe-assignment.vaimo.net/')
        .then((res) => {
          const result = res.data;

          setProduct(result.product);
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateRatingArray = () => {
      const ratingArray: any = [];
      for (let i = 0; i < Math.floor(Number(reviews.rating)); i += 1) {
        ratingArray.push(star);
      }

      setStarRating([...ratingArray]);
    };

    updateRatingArray();
  }, [product]);

  useEffect(() => {
    const calculateCartTotal = () => {
      let total = 0;
      optionQuantityValues.forEach(({ quantity, price }) => {
        total += (Number(quantity) * Number(price));
      });

      setTotalCart(total);
    };

    calculateCartTotal();
  }, [optionQuantityValues]);

  // This sorting is necessary for rendering the price interval

  const optionsSortedByPrice = (Object.values(options)).sort((a, b) => +a.price.value - +b.price.value);

  // This array is necessary for displaying options in the order provided in the design

  const productOptionEntries = Object.entries(options);

  return (
    <>
      {(isLoading)
        ? (
          <img src={spinner} alt="Loading..." className="spinner" />
        )
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
                    {tags.map((tag) => (
                      <span
                        key={tag}
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
                  <div>
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
                    {(Number(optionsSortedByPrice[0].price.value)).toLocaleString()}
                    {' '}
                    -
                    {' '}
                    {optionsSortedByPrice[optionsSortedByPrice.length - 1].price.currency.symbol}
                    {' '}
                    {(Number(optionsSortedByPrice[optionsSortedByPrice.length - 1].price.value)).toLocaleString()}
                  </div>
                </div>
                <div className="pricing__text">
                  <span>
                    / Option
                    {' '}
                    <span className="pipe">|</span>
                  </span>
                  &nbsp;
                  <span>
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
                    <Timer endDate={discount.end_date} />
                  </div>
                </div>
              </div>

              <div className="options-container">
                <div className="padding-top-12 large-display">Options:</div>
                <div className="options">
                  {productOptionEntries.map((item, index) => (
                    <div
                      key={item[1].label}
                      className="option"
                    >
                      <div>{item[1].label}</div>
                      <div>
                        {item[1].price.currency.symbol}
                        {' '}
                        {(Number(item[1].price.value)).toLocaleString()}
                      </div>
                      <div>
                        <QuantityRocker
                          inputValue={optionQuantityValues[index].quantity}
                          onChange={(value) => {
                            const elementIndex = optionQuantityValues.findIndex(
                              (element) => element.label === item[1].label,
                            );
                            const newArray = [...optionQuantityValues];
                            newArray[elementIndex] = { ...newArray[elementIndex], quantity: value };
                            setOptionQuantityValues(newArray);
                          }}
                        />
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
              <div className="added-products">
                {optionQuantityValues.map(({
                  price, quantity, label, currency,
                }, index) => (
                  (Number(quantity) > 0)
                    && (
                      <div
                        key={label}
                        className="added-product"
                      >
                        <div>{label}</div>
                        <div>{optionQuantityValues[index].quantity}</div>
                        {(totalCart >= 0) && (
                        <div className="flex gap-4">
                          <span>{currency}</span>
                          <span>{((Number(quantity) * Number(price))).toLocaleString()}</span>
                        </div>
                        )}
                      </div>
                    )
                ))}
              </div>
              <div className="summary-section">
                <div className="grid">
                  <div>
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
                    {totalCart.toLocaleString()}
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
