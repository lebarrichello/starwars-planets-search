describe('8 - Desenvolva testes para atingir 60% de cobertura total da aplicação', () => {
  it('Cobertura de "Statements" total deverá ser maior ou igual a 60.', () => {
    cy.getCoverage().its('total.statements.pct', { timeout: 0 }).should('be.gte', 60.00);
  });

  it('Cobertura de "Functions" total deverá ser maior ou igual a 60.', () => {
    cy.getCoverage().its('total.functions.pct', { timeout: 0 }).should('be.gte', 60.00);
  });

  it('Cobertura de "Branches" total deverá ser maior ou igual a 60.', () => {
    cy.getCoverage().its('total.branches.pct', { timeout: 0 }).should('be.gte', 60.00);
  });

  it('Cobertura de "Lines" total deverá ser maior ou igual a 60.', () => {
    cy.getCoverage().its('total.lines.pct', { timeout: 0 }).should('be.gte', 60.00);
  });
});
