'use strict';

function GrupoAnuncioPorPalavraChave() {
    this.grupoAnuncios = [];
}

function GrupoAnuncio() {
    this.nome = "";
    this.url = "";
    this.palavras = [];

    this.validate = function () {
        if (this.nome.length > 30)
            throw new Error(`Grupo de anuncio ${this.nome} possui mais que 30 caracteres`);
    }
}

function PalavraChave(tipoPalavraChave, texto) {
    this.tipo = tipoPalavraChave; 
    this.texto = texto;
}

function ConteudoPlanilhaAnuncios() {
    this.separador = ',';
    this.conteudo = '';
    this.nomeArquivo = '';
    this.totalItens = 0;
    this.conteudoCSV = function() {
        const cabecalho = [
            'Campaign',
            'Ad Group',
            'Labels',
            'Headline 1',
            'Headline 2',
            'Description',
            'Path 1',
            'Path 2',
            'Final URL',
            'Final mobile URL',
            'Tracking template',
            'Final URL suffix',
            'Custom parameters',
            'Campaign Status',
            'Ad Group Status',
            'Status',
            'Approval Status',
            'Comment'
        ];

        return cabecalho.join(this.separador) + '\n' + this.conteudo;
    }
}

function ConteudoPlanilhaGrupoAnuncio() {
    this.separador = ',';
    this.conteudo = '';
    this.nomeArquivo = '';
    this.totalItens = 0;
    this.totalPalavrasChave = 0;
    this.conteudoCSV = function() {
        const cabecalho = [
            'Campaign',
            'Ad Group',
            'Labels',
            'Keyword',
            'Criterion Type',
            'Max CPC',
            'Max CPM',
            'Max CPV',
            'First page bid',
            'Top of page bid',
            'First position bid',
            'Quality score',
            'Landing page experience',
            'Expected CTR',
            'Ad relevance',
            'Destination URL',
            'Final URL',
            'Final mobile URL',
            'Tracking template',
            'Final URL suffix',
            'Custom parameters',
            'Campaign Status',
            'Ad Group Status',
            'Status',
            'Approval Status',
            'Comment'
        ];
        
        return cabecalho.join(this.separador) + '\n' + this.conteudo;
    }
}