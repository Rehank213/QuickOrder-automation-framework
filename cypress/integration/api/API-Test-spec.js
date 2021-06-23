context("Tes API from the Fake JSON Server", () => {

    it("Test GET functionality of JSON Server", () => {
        cy.request("http://localhost:3000/posts/1").its('body').should('have.property', 'id')
    })

    it("Test GET functionality of JSON Server", () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/posts',
            body: {
                "id": "3",
                "title": "Cypress API Automation",
                "author": "Rehan Khan"
              }
        }).then((res) => {
            expect(res.body).has.property('author', 'Rehan Khan')

            })
    })

        // it.only("Test POST functionality of JSON Server", () =>{
        //     cy.request({
        //         method:'POST',
        //         url:'http://localhost:3000/posts',
        //         body: {
        //             "id": 2,
        //             "title": "Executeautomation",
        //             "author": "KarthikKK"
        //         }
        //     }).then((res) =>{
        //         expect(res.body).has.property("title", "Executeautomation");
        //     })
        // })
    

})