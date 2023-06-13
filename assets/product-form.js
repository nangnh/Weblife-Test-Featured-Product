if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.form.querySelector('[name=id]').disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');
        if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id),
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        config.body = formData;

        fetch(`${routes.cart_add_url}`)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, { source: 'product-form', productVariantId: formData.get('id'), errors: response.description, message: response.message });
              this.handleErrorMessage(response.description);

              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButton.querySelector('span').classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
              window.location = window.routes.cart_url;
              return;
            }

            if (!this.error) publish(PUB_SUB_EVENTS.cartUpdate, { source: 'product-form', productVariantId: formData.get('id') });
            this.error = false;
            const quickAddModal = this.closest('quick-add-modal');
            if (quickAddModal) {
              document.body.addEventListener(
                'modalClosed',
                () => {
                  setTimeout(() => {
                    this.cart.renderContents(response);
                  });
                },
                { once: true },
              );
              quickAddModal.hide(true);
            } else {
              this.cart.renderContents(response);
            }
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            this.querySelector('.loading-overlay__spinner').classList.add('hidden');
          });
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    },
  );
}

// ローカルのJSONファイルの代わりに、JavaScriptのオブジェクトを直接定義します
var cart_return = [
  {
    id: 43548266004702,
    properties: {},
    quantity: 4,
    variant_id: 43548266004702,
    key: '43548266004702:e6583963b63a30e3d6693f441bd401ab',
    title: 'matrixify_予約商品',
    price: 10000000,
    original_price: 10000000,
    discounted_price: 10000000,
    line_price: 40000000,
    original_line_price: 40000000,
    total_discount: 0,
    discounts: [],
    sku: null,
    grams: 0,
    vendor: 'weblife-demo-store-basic',
    taxable: true,
    product_id: 7845679923422,
    product_has_only_default_variant: true,
    gift_card: false,
    final_price: 10000000,
    final_line_price: 40000000,
    url: '/products/matrixify_reservation_product_01?variant=43548266004702',
    featured_image: {
      aspect_ratio: 0.8,
      alt: 'matrixify_予約商品',
      height: 3000,
      url: 'https://cdn.shopify.com/s/files/1/0636/5259/3886/products/suchit-poojari-ljRiZl00n18-unsplash_47e2d66d-e021-43f5-8337-9b9ccf159646.jpg?v=1666229448',
      width: 2400,
    },
    image: 'https://cdn.shopify.com/s/files/1/0636/5259/3886/products/suchit-poojari-ljRiZl00n18-unsplash_47e2d66d-e021-43f5-8337-9b9ccf159646.jpg?v=1666229448',
    handle: 'matrixify_reservation_product_01',
    requires_shipping: true,
    product_type: '',
    product_title: 'matrixify_予約商品',
    untranslated_product_title: 'matrixify_予約商品',
    product_description: '予約商品はとてもハイクオリティな商品です。',
    variant_title: null,
    untranslated_variant_title: null,
    variant_options: ['Default Title'],
    options_with_values: [{ name: 'Title', value: 'Default Title' }],
    line_level_discount_allocations: [],
    line_level_total_discount: 0,
    sections: {
      'cart-notification-product':
        '\u003cdiv id="shopify-section-cart-notification-product" class="shopify-section"\u003e\u003cdiv id="cart-notification-product-43548266004702:e6583963b63a30e3d6693f441bd401ab" class="cart-item"\u003e\u003cdiv class="cart-notification-product__image global-media-settings"\u003e\n          \u003cimg\n            src="//cdn.shopify.com/s/files/1/0636/5259/3886/products/suchit-poojari-ljRiZl00n18-unsplash_47e2d66d-e021-43f5-8337-9b9ccf159646.jpg?v=1666229448\u0026width=140"\n            alt=""\n            width="70"\n            height="88"\n            loading="lazy"\n          \u003e\n        \u003c/div\u003e\u003cdiv\u003e\u003ch3 class="cart-notification-product__name h4"\u003ematrixify_予約商品\u003c/h3\u003e\n        \u003cdl\u003e\u003c/dl\u003e\u003c/div\u003e\n    \u003c/div\u003e\u003c/div\u003e',
      'cart-notification-button': '\u003cdiv id="shopify-section-cart-notification-button" class="shopify-section"\u003eカートを見る (4)\n\u003c/div\u003e',
      'cart-icon-bubble':
        '\u003cdiv id="shopify-section-cart-icon-bubble" class="shopify-section"\u003e\u003csvg\n  class="icon icon-cart"\n  aria-hidden="true"\n  focusable="false"\n  xmlns="http://www.w3.org/2000/svg"\n  viewBox="0 0 40 40"\n  fill="none"\n\u003e\n  \u003cpath fill="currentColor" fill-rule="evenodd" d="M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z"/\u003e\n\u003c/svg\u003e\n\u003cspan class="visually-hidden"\u003eカート\u003c/span\u003e\u003cdiv class="cart-count-bubble"\u003e\u003cspan aria-hidden="true"\u003e4\u003c/span\u003e\u003cspan class="visually-hidden"\u003e4個のアイテム\u003c/span\u003e\n  \u003c/div\u003e\u003c/div\u003e',
    },
  },
];
