beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('IIO')
        cy.get('#email').type('iio@gmail.com')
        cy.get('[data-cy="name"]').type('Innocent')
        cy.get('#lastName').type('Okeke')
        cy.get('[data-testid="phoneNumberTestId"]').type('55667788')
        cy.get('input[name="password"]').type('MyTest')
        cy.get('[name="confirm"]').type('MyTest123')
        
        // Assert that submit button is not enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled') 

        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'block')
   
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('IIO')
        cy.get('#email').type('iio@gmail.com')
        cy.get('[data-cy="name"]').type('Innocent')
        cy.get('#lastName').type('Okeke')
        cy.get('[data-testid="phoneNumberTestId"]').type('55667788')
        cy.get('#vehicle2').click()
        cy.get('#cars').select('saab')
        cy.get('#animal').select('snake')
        cy.get('input[name="password"]').type('MyTest')
        cy.get('[name="confirm"]').type('MyTest')
        
        //Activating the submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        
        // Assert that both input and password error messages are not shown
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('#success_message').should('be.visible').contains('User successfully submitted registration')
        
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message
        cy.get('#username').type('IIO')
        cy.get('#email').type('iio@gmail.com')
        cy.get('[data-cy="name"]').type('Innocent')
        cy.get('#lastName').type('Okeke')
        cy.get('[data-testid="phoneNumberTestId"]').type('55667788')
        cy.get('input[name="password"]').type('MyTest')
        cy.get('[name="confirm"]').type('MyTest')

        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').contains('User successfully submitted registration')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
    })

    it('Input valid data to the page', () => {
        inputValidData()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // Create similar test for checking second picture
    it('Check that logo is correct and has correct size', () => {
        cy.log('Checks cypress logo source and size')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo');
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.within', 88, 116);

    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking second link to Cerebrum Hub homepage
    // Check that URL to Cerebrum Hub page is correct and clickable
    it('Check navigation part to cerebrumhub.com', () => {
        cy.get('nav').children().should('have.length', 2)
        
        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'https://cerebrumhub.com/').click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one
    it('Check that checkbox list are correct', () =>{
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')

         //Checking I and 2
         cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
         cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Your favourite animal dropdown', () => {
        // The animal dropdown has six choices
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('h2').contains('Select your favourite animal').scrollIntoView()

        //Check  that first & second elements in the dropdown are Dog  cat respectively 
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog') 
        cy.get('#animal').find('option').eq(1).should('have.text', 'Dog')  

        //Verify dropdown list options
        cy.get('#animal').find('option').eq(0).should('have.value','dog')
        cy.get('#animal').find('option').eq(1).should('have.value','cat')
        cy.get('#animal').find('option').eq(2).should('have.value','snake')
        cy.get('#animal').find('option').eq(3).should('have.value','hippo')
        cy.get('#animal').find('option').eq(4).should('have.value','spider')
        cy.get('#animal').find('option').eq(5).should('have.value','mouse')
    })

})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('II0')
    cy.get('#email').type('iio@gmail.com')
    cy.get('[data-cy="name"]').type('Innocent')
    cy.get('#lastName').type('Okeke')
    cy.get('[data-testid="phoneNumberTestId"]').type('55667788')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyTest')
    cy.get('#confirm').type('MyTest')
    cy.get('h2').contains('Password').click()
}