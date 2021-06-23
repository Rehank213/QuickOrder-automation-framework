describe('Tex-X Test Cases', () => {
    
    beforeEach(function() {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.closePopup()
        cy.visit("https://www.ten-x.com/", {retryOnStatusCodeFailure:true})  
    })

    it.only('shoulbe able to load Tex-X Web site', () => {
        cy.url().should('include', '.ten-x')
        cy.title().should('eq', 'Ten-X Commercial Real Estate')
        cy.xpath('//span[contains(text(),"The smarter, faster, better")]').contains('The smarter, faster, better')
    })
    
    it.only('shoulbe able to view Fetured Properties details', () => {
        cy.xpath("(//strong[@data-elm-id='item-starting-bid-amount'])[1]").invoke('text').then((start_bid) => {
            cy.xpath("(//span[@data-elm-id='item-property-name'])[1]").invoke('text').then((property_name) => {
                cy.xpath("(//div[@data-elm-id='item-property-address'])[1]").invoke('text').then((property_address) => {
                    cy.xpath("(//div[@data-elm-id='item-property-state'])[1]").invoke('text').then((property_state) => {
                        cy.xpath("(//a[@data-elm-id='property-item'])[1]").invoke('removeAttr', 'target').click( {force:true} )

                        cy.get("h1").contains(property_name, { matchCase: false })
                        cy.xpath("//span[@data-elm-id='bidding-box-starting-bid-value']/strong").contains(start_bid, { matchCase: false })
                        cy.xpath("//span[@data-elm-id='prop_address']").contains(property_address, { matchCase: false })
                        cy.xpath("//span[@data-elm-id='prop_address']").contains(property_state, { matchCase: false })
                    })
                })      
            })
        })
    
    })

    it('shoulbe able to view All Active Properties', () => {
        cy.xpath("//a[@data-elm-id='view-all-btn']").click( {force:true, timeout: 3000} ) 
        // cy.reload(true);        
        // cy.get("body").then($body => {
        //     var items = $body.find(".ant-pagination-item").length 
        //     for(let n = 0; n < items; n ++) {
        //         cy.get(".ant-pagination-item").eq(n).click()
                cy.xpath("//span[@data-elm-id='item-auction-status']/strong").each(($el) => {
                    expect($el).to.contain('Online Auction')
                })
        //     }
             
        // })         
    })

    it('shoulbe able to view All Sold Properties', () => {
        // cy.xpath("//img[@data-elm-id='header-logo']").click( {force:true, timeout: 3000} )
        cy.xpath("//a[@data-elm-id='view-closed-btn']").click( {force:true, timeout: 3000} )
        cy.xpath("//span[@data-elm-id='item-auction-status']/strong").each(($el) => {
                    expect($el).to.contain('Auction Closed')
                })
        
        // cy.get("body").then($body => {
        //     var items = $body.find(".ant-pagination-item").length  
        //     for(let n = 0; n < items; n ++) {
        //         cy.get(".ant-pagination-item").eq(n).click()
        //         cy.xpath("//span[@data-elm-id='item-auction-status']/strong").each(($el) => {
        //             expect($el).to.contain('Auction Closed')
        //         })
        //     } 
        // })         
    })

   

})