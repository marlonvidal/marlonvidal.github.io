'use strict';

$(document).ready(function () {

    var planilhaGA = new ConteudoPlanilhaGrupoAnuncio();
    var planilhaA = new ConteudoPlanilhaAnuncios();

    $('form').submit(function () {
        try {
            var gapc = new GrupoAnuncioPorPalavraChave();
            gapc.montarGruposAnuncios($('#txtDadosCampanha').val());

            var cliente = $('#txtNomeCliente').val(),
                campanha = $('#txtNomeCampanha').val(),
                url = $('#txtPaginaDestino').val(),
                path1 = $('#txtPath1').val(),
                path2 = $('#txtPath2').val(),
                headlinePadrao = $('#txtHeadlinePadrao').val(),
                headline1 = $('#txtVariacaoUm').val(),
                descricao1 = $('#txtDescricaoUm').val().tratarVirgulas(),
                headline2 = $('#txtVariacaoDois').val(),
                descricao2 = $('#txtDescricaoDois').val().tratarVirgulas(),
                headline3 = $('#txtVariacaoTres').val(),
                descricao3 = $('#txtDescricaoTres').val().tratarVirgulas();

            planilhaGA.montarConteudoPlanilha(gapc.grupoAnuncios, cliente, campanha, '0.30');

            planilhaA.montarConteudoPlanilha(gapc.grupoAnuncios,
                cliente, campanha, url, path1, path2, headlinePadrao,
                headline1, descricao1, headline2, descricao2, headline3, descricao3
            );

            SomaTotalizadores('#totalGrupoAnuncios', planilhaGA.totalItens);
            SomaTotalizadores('#totalPalavrasChave', planilhaGA.totalPalavrasChave);
            SomaTotalizadores('#totalAnuncios', planilhaA.totalItens);

            $('#txtGruposAnuncio').val(planilhaGA.conteudo);
            $('#txtAnuncios').val(planilhaA.conteudo);
        }
        catch (e) {
            console.error(e);
            alert(e);
        }

        return false;
    });

    $('#btnLimpar').click(function () {
        var opcao = confirm('Tem certeza que deseja limpar todos os dados?');

        if (opcao) {
            window.location.reload(true);
        }
    })

    $('#btnGerarArquivo').click(function () {
        downloadCSV(planilhaA.conteudoCSV(), planilhaA.nomeArquivo);
        downloadCSV(planilhaGA.conteudoCSV(), planilhaGA.nomeArquivo);
    });
});

function SomaTotalizadores(idTotalizador, quantidadeTotalItens) {
    var qtdItensOriginal = parseInt($(idTotalizador).text());
    $(idTotalizador).text(qtdItensOriginal + quantidadeTotalItens);
}

function AgrupaConteudos(idTextArea, conteudo) {
    var conteudoOriginal = $(idTextArea).val();
    $(idTextArea).val(conteudoOriginal + conteudo);
}
