
describe('', () => {

    beforeEach(function() {
        cy.visit("http://webdriveruniversity.com/")
    })

    it('shoulbe able to load Web Driver University site', () => {
        cy.url().should('include', 'webdriveruniversity')
        cy.title().should('eq', 'WebDriverUniversity.com')
        cy.get('.navbar-brand').contains('WebdriverUniversity.com (New Approach To Learning)')
    })

    it.only('Should not able to submit form without required fields', () => {
        cy.get('#contact-us').invoke('removeAttr', 'target').click({ force: true })
        cy.get('input[name="first_name"]').type('Rehan')
        cy.get('input[name="last_name"]').type('Khan')
        cy.get('input[name="email"]').type('testemail@yopmail.com')
        cy.get('input[value="SUBMIT"]').click()
        cy.get('body').contains('Error: all fields are required')       
    })

    it.only('Should able to submit contact us page with required fields', () => {
        cy.get('#contact-us').invoke('removeAttr', 'target').click({ force: true })
        cy.get('input[name="first_name"]').type('Rehan')
        cy.get('input[name="last_name"]').type('Khan')
        cy.get('input[name="email"]').type('testemail@yopmail.com')
        cy.get('textarea[name="message"]').type("testing")
        cy.get('input[value="SUBMIT"]').click()
        cy.get('h1').contains('Thank You for your Message!')        
    })

    it('Should able to click buttons', () => {
        cy.get('#button-clicks').invoke('removeAttr', 'target').click({ force: true })
        
        cy.get('#button1').click({ force: true })
        cy.get('h4').contains('Congratulations!')
        cy.xpath('(//button[.="Close"])[1]').click()
        
        cy.get('#button2').click({ force: true})
        cy.get('h4').contains('It’s that Easy!!')
        cy.xpath('(//button[.="Close"])[2]').click()
        
        cy.get('#button3').click({ force: true })
        cy.get('h4').contains('Well done! the ')
        cy.xpath('(//button[.="Close"])[3]').click()      
    })

    it('Should able to access elements withintwo domains', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#automation-test-store').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'automationteststore')
    })

    it('Should able to access elements withintwo Iframe', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#iframe').invoke('removeAttr', 'target').click()
        // cy.iframe('#frame').find('#button-find-out-more').click()
        // cy.get('h4').contains('Welcome to ')
        // cy.get('button').contains('Close').click()

        cy.get('#frame').then($iframe => {
            const body = $iframe.contents().find('body')
            cy.wrap(body).as('iframe')
        })     
        cy.get("@iframe").find('#button-find-out-more').click( {force:true})
        cy.pause()
        cy.get('@iframe').contains('Close').click({ force: true })        
    })

    it('Should able to select item from dropdown', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click()
        cy.get('#dropdowm-menu-1').select('c#').should('have.value', 'c#')
        cy.get('#dropdowm-menu-2').select('TestNG').contains('TestNG')
        cy.get('#dropdowm-menu-3').select('jquery').should('have.value', 'jquery')
    })

    it('Should able to select item from checkbox', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click()
        cy.get('input[value="option-1"]').check().should('be.checked')
        cy.xpath('(//input[@type="checkbox"])[2]').check()
        cy.xpath('(//input[@type="checkbox"])[3]').uncheck().should('not.be.checked')
        cy.xpath('(//input[@type="checkbox"])[4]').check()
    })

    it('Should able to select multiple checkboxs', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click()
        cy.get('input[type="checkbox"]').check([ 'option-1', 'option-2', 'option-3', 'option-4' ]).should('be.checked')        
    })

    
    it('Should able to select Radio Buttons', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click()
        cy.get('#radio-buttons').find('input[type="radio"]').first().check().should('be.checked') 
        cy.get('#radio-buttons').find('input[type="radio"]').eq(1).check().should('be.checked')          
    })

    it('Should able to check the Radio buttons state', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click()
        cy.get('input[value="lettuce"]').should('not.be.checked')
        cy.get('input[value="cabbage"]').should('be.disabled')
        cy.get('input[value="pumpkin"]').should('be.checked')                  
    })

    it('Should able to select from dropdown list', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click()
        cy.get('#fruit-selects').select('grape').contains('Grape')
        cy.get('#fruit-selects').find('[value="orange"]').should('be.disabled')                         
    })

    it('Handle js Alert', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click()
        cy.get('#button1').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('I am an alert box!')
        })                       
    })

    it('Accept js Alert', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click()
        cy.get('#button4').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Press a button!')
        }) 

        cy.on('window:confirm', (str) => {
            return true
        })
        cy.get('#confirm-alert-text').contains('You pressed OK!')                       
    })

    it('Cancel js Alert', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click()
        cy.get('#button4').click()
       
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Press a button!')
        })

        cy.on('window:confirm', (str) => {
            return false
        })
        
        cy.get('#confirm-alert-text').contains('You pressed Cancel!')                       
    })

    it('Auto Complete text field', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#autocomplete-textfield').invoke('removeAttr', 'target').click()
        cy.get('#myInput').type('A')
        cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
            const prod = $el.text()
            if(prod === "Apple") {
                $el.click()
                cy.get('#submit-button').click()
                cy.url().should('include', 'Apple')
            }
        }).then(() => {
            cy.get('#myInput').type('G')
            cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
                const prod = $el.text()
                if(prod === "Grapes") {
                    $el.click()
                    cy.get('#submit-button').click()
                    cy.url().should('include', 'Grapes')
                }
            })   
        }) 
    })

    it('drag and drop', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click()

        cy.get('#draggable').trigger('mousedown', {which: 1})
        cy.get('#droppable').trigger('mousemove').trigger('mouseup', {force: true})             
    })

    it('double click', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click()

        cy.get('#double-click').dblclick()                   
    })

    it('Hold down the left mouse button', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click()

        cy.get('#click-box').trigger('mousedown', {which: 1}).then(($element) => {
            expect($element).to.have.css('background-color', 'rgb(0, 255, 0)')
        })                 
    })

    it('Mouse Hover', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click()

        cy.get('button').contains('Hover Over Me First!').trigger('mousedown')
        cy.get('button').contains('Hover Over Me Second!').trigger('mouseover')
        cy.get('button').contains('Hover Over Me Third!').trigger('mouseover')                    
    })

    it('Upload File', () => {
        cy.visit("http://webdriveruniversity.com/")
        cy.get('#file-upload').scrollIntoView().invoke('removeAttr', 'target').click()

        cy.fixture('Automation.png', 'base64').then(fileContent => {
            cy.get('#myFile').attachFile(
                {
                    fileContent,
                    fileName: 'Automation.png',
                    mimeType: 'image/png'
                },
                {
                    uploadType: 'input'
                }
            )
        })

        cy.get('#submit-button').click()                         
    })

    // it.only('API Testing', () => {
    //     const result = cy.request("http://demo.traccar.org/api/devices")
    //     result.its('status').should('equal', 200)
    // })

})

