/// <reference types="Cypress" />
import loginpage from '../../page-objects/pages/LoginPage'
import cartpage from '../../page-objects/pages/CartPage'
import basepage from '../../page-objects/pages/BasePage'
import backOfficeage from '../../page-objects/pages/BackOfficePage'
import confirmationpage from '../../page-objects/pages/ConfirmationPage'
import banners from '../../page-objects/components/Banners'
import categories from '../../page-objects/components/category'
import shippingAddress from '../../page-objects/components/ShippingAddress'
import paymentMethods from '../../page-objects/components/PaymentMethods'
import submitOrder from '../../page-objects/components/SubmitOrder'
import creditCardInfo from '../../page-objects/components/CreditCardInfo'
import productsPage from '../../page-objects/pages/ProductsPage'
import filter from '../../page-objects/components/filter'
import icons from '../../page-objects/components/Icons'
import cart from '../../page-objects/components/Cart'
import { config } from 'chai'
// import { config } from 'chai'

describe('Login to Quick Order', () => {
    
    before(function() {

        cy.fixture('Shippingaddress').then(function(address) {
            globalThis.address = address
        })

        cy.fixture('CreditCards').then(function(creditCard) {
            globalThis.creditCard = creditCard
        })

        cy.fixture('LoginInfo').then(function(loginInfo) {
            globalThis.loginInfo = loginInfo
        })   

        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit("/" + "senegence/distributor_login.aspx", {retryOnStatusCodeFailure:true})

    })

    it('Should able to login to Quick Order', () => {
        if (Cypress.env('distid') && Cypress.env("password")) {
            let dist = {
                distid: Cypress.env('distid'),
                password: Cypress.env('password')
            }
            loginpage.login_to_BackOffice(dist.distid, dist.password)
        } else
        loginpage.login_to_BackOffice(loginInfo.distid, loginInfo.password)
    })

    it('Should display SeneChat', () => {
        banners.validate_SeneChat()
    })

    it('Should display 7 banners', () => {
        banners.validate_Banners()
    })

    it('should display category tabs', () => {
        categories.validate_Category_Links()
    })

    it('should able to search by category', () => {
        filter.search_by_category()
        filter.show_all_categories()
    })

    it('should able to search product by name', () => {
        filter.search_product_by_name()
        filter.show_all_products()
    })

    it('should able to search product by item number', () => {
        filter.search_product_by_item_number()
        filter.show_all_products()
    })

    it('should able to Remove items from cart', () => {
        cart.remove_all_items_from_cart()
        cart.validate_cart_emplty()
    })

    it('Should able to add product to cart', () => {
        productsPage.add_item_to_Cart()
        cart.click_Checkout()
    })

    it('Should able to continue to Review page from Cart page', () => {
        cartpage.click_Next()
    })

    it('should able to Delete shipping address', () => {
        shippingAddress.delete_shipping_address()
    })

    it('should able to Add shipping address', () => {
        shippingAddress.add_shipping_address(address)
    })

    it('should able to Edit shipping address', () => {
        shippingAddress.edit_shipping_address(address)
    })

   
    it('should dipaly Partner for Profit Icon', () => {
        icons.validate_partner_for_profit_icon()
    })

    it('should dipaly Demo Drop Ship Icon', () => {
       icons.validate_demo_drop_ship_icon()
    })

    it('should dipaly SeneBucks Icon', () => {
        icons.validate_SeneBucks_icon()
    })

    it('should dipaly SeneCash Icon', () => {
        icons.validate_SeneCash_icon()
    })

    it('should dipaly Discount Level Icon', () => {
        icons.validate_discount_level_icon()
    })

    it('should dipaly sold 70% of the Products Icon', () => {
        icons.validate_70Percent_icon()
    })

    it('should able to Delete payment methods', () => {
        paymentMethods.delete_payment_methods()
    })

    it('should able to submit order using New Credit Card', () => {
        creditCardInfo.select_enter_new_card()
        submitOrder.click_submit_order()
        creditCardInfo.enter_credit_card_info(creditCard)
    })

    it('should able to submit order successfully', () => {
        confirmationpage.validate_successful_message_displaying()
        confirmationpage.validate_order_number_displaying()

    })
    
})