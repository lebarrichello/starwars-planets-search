describe('10 - Desenvolva testes para atingir 90% de cobertura total da aplicação', () => {
  it('Cobertura de "Statements" total deverá ser maior ou igual a 90.', () => {
    cy.getCoverage().its('total.statements.pct', { timeout: 0 }).should('be.gte', 90.00);
  });

  it('Cobertura de "Functions" total deverá ser maior ou igual a 90.', () => {
    cy.getCoverage().its('total.functions.pct', { timeout: 0 }).should('be.gte', 90.00);
  });

  it('Cobertura de "Branches" total deverá ser maior ou igual a 90.', () => {
    cy.getCoverage().its('total.branches.pct', { timeout: 0 }).should('be.gte', 90.00);
  });

  it('Cobertura de "Lines" total deverá ser maior ou igual a 90.', () => {
    cy.getCoverage().its('total.lines.pct', { timeout: 0 }).should('be.gte', 90.00);
  });
});
