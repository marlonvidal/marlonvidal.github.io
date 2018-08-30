describe('GrupoAnuncioPorPalavraChave ', function() {
    it('deve criar instancia a partir de lista de palavras-chave', function() {
        var conteudo = `
        arquiteto interiores
        arquiteto de interiores
        arquitetos de interiores
        arquitetos e decoradores
        `;
        
        debugger;        
        var gapc = new GrupoAnuncioPorPalavraChave();
        gapc.inicializar(conteudo);
        
        expect(gapc.length).toBe(4);
    });
});
