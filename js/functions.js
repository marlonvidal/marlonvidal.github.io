"use strict";

ConteudoPlanilhaAnuncios.prototype.montarAnuncio = function (campanha, grupoAnuncio,
    headlinePrincipal, headlineSecundaria, descricao, path1, path2, url, separador) {
    var item = [
        campanha, //Campaign
        grupoAnuncio, //Ad Group
        '', //Labels
        headlinePrincipal, //Headline 1
        headlineSecundaria, //Headline 2
        descricao, //Description
        path1, //Path 1
        path2, //Path 2
        url, //Final URL
        '', //Final mobile URL
        '', //Tracking template
        '', //Final URL suffix
        '', //Custom parameters
        '', //Campaign Status
        '', //Ad Group Status
        '', //Status
        '', //Approval Status
        '', //Comment
    ];

    return item.join(separador) + '\n';
}

ConteudoPlanilhaAnuncios.prototype.montarConteudoPlanilha = function (gapc,
    cliente, campanha, url, path1, path2, headlinePadrao, usarHeadlinePadraoTodosAnuncios,
    headline1, descricao1, headline2, descricao2, headline3, descricao3) {
    var conteudo = '';
    var totalItens = 0;

    for (var grupoAnuncio in gapc) {
        var headline = '';

        if (usarHeadlinePadraoTodosAnuncios) {
            headline = headlinePadrao;
        } else {
            if (gapc[grupoAnuncio].nome.length > 30)
                headline = headlinePadrao;
            else
                headline = '{KeyWord:' + gapc[grupoAnuncio].nome + '}';
        }

        conteudo += this.montarAnuncio(campanha, gapc[grupoAnuncio].nome,
            headline, headline1, descricao1, path1, path2, url, this.separador);

        conteudo += this.montarAnuncio(campanha, gapc[grupoAnuncio].nome,
            headline, headline2, descricao2, path1, path2, url, this.separador);

        conteudo += this.montarAnuncio(campanha, gapc[grupoAnuncio].nome,
            headline, headline3, descricao3, path1, path2, url, this.separador);

        totalItens += 3;
    }

    this.conteudo += conteudo;
    this.totalItens += totalItens;
    this.nomeArquivo = `${cliente.toLowerCaseWithoutSpaces()}_${campanha.toLowerCaseWithoutSpaces()}_anuncios.csv`;
}

ConteudoPlanilhaGrupoAnuncio.prototype.montarConteudoPlanilha = function (gapc, cliente, campanha, cpc) {
    var conteudo = '';
    var totalItens = 0;
    var totalPalavrasChave = 0;

    for (var grupoAnuncio in gapc) {
        totalItens++;

        for (let j = 0; j < gapc[grupoAnuncio].palavras.length; j++) {

            var item = [
                campanha, //Campaign
                gapc[grupoAnuncio].nome, //Ad Group
                '', //Labels
                gapc[grupoAnuncio].palavras[j].texto, //Keyword
                gapc[grupoAnuncio].palavras[j].tipo.value, //Criterion Type
                cpc, //Max CPC
                '', //Max CPM
                '', //Max CPV
                '', //First page bid
                '', //Top of page bid
                '', //First position bid
                '', //Quality score
                '', //Landing page experience
                '', //Expected CTR
                '', //Ad relevance
                '', //Destination URL
                '', //Final URL
                '', //Final mobile URL
                '', //Tracking template
                '', //Final URL suffix
                '', //Custom parameters
                '', //Campaign Status
                '', //Ad Group Status
                '', //Status
                '', //Approval Status
                '', //Comment
            ]
            conteudo += item.join(this.separador) + '\n';
            totalPalavrasChave++;
        }
    }

    this.conteudo += conteudo;
    this.totalItens += totalItens;
    this.totalPalavrasChave += totalPalavrasChave;
    this.nomeArquivo = `${cliente.toLowerCaseWithoutSpaces()}_${campanha.toLowerCaseWithoutSpaces()}_grupoAnuncios.csv`;
}

GrupoAnuncioPorPalavraChave.prototype.montarGruposAnuncios = function (conteudo) {
    var itens = conteudo.split('\n').sort();

    for (let i = 0; i < itens.length; i++) {
        var palavra = itens[i];

        if (palavra.trim() == '')
            continue;

        var palavraSemConectores = palavra.removeConectores();
        var key = palavra.removeConectores(true).removeAcentos().capitalize();

        if (!this.grupoAnuncios[key]) {
            this.grupoAnuncios[key] = {
                nome: palavraSemConectores.capitalize(),
                palavras: []
            };
        }

        this.grupoAnuncios[key].palavras.push(
            new PalavraChave(TipoPalavraChave.Ampla, palavraSemConectores.transformarPalavraChaveAmpla())
        );

        if (palavraSemConectores != palavra) {
            this.grupoAnuncios[key].palavras.push(new PalavraChave(TipoPalavraChave.Frase, palavra));
            this.grupoAnuncios[key].palavras.push(new PalavraChave(TipoPalavraChave.Frase, palavraSemConectores));
            this.grupoAnuncios[key].palavras.push(new PalavraChave(TipoPalavraChave.Exata, palavra));
            this.grupoAnuncios[key].palavras.push(new PalavraChave(TipoPalavraChave.Exata, palavraSemConectores));
        }
        else {
            this.grupoAnuncios[key].palavras.push(new PalavraChave(TipoPalavraChave.Frase, palavra));
            this.grupoAnuncios[key].palavras.push(new PalavraChave(TipoPalavraChave.Exata, palavra));
        }
    }
}