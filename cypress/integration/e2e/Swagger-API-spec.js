describe("Get Request", () => {
    var result;
    it("Validate status code of the /posts api", () => {
        result = cy.request("https://petstore.swagger.io/v2/pet/findByStatus?status=available");
        result.its("status").should("equal", 200)
    })

    it("Validate /posts api contains the correct keys and values", () => {
        cy.request({
            method: "GET",
            url: "https://petstore.swagger.io/v2/pet/findByStatus?status=available",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body);

            expect(body[0]).has.property("id", 9222968140497083000);

            // expect(body[1]).has.property("title", "Spider");
        })
    })
})
