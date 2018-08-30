'use strict';

String.prototype.toLowerCaseWithoutSpaces = function () {
    if (this == null || this == undefined)
        return '';

    return this.toLocaleLowerCase().split(' ').join('_');
}

String.prototype.capitalize = function () {
    var aux = this.trim().split(' ');
    var result = '';

    for (var i = 0; i < aux.length; i++)
        result += aux[i].charAt(0).toUpperCase() + aux[i].slice(1) + ' ';

    return result.trim();
}

String.prototype.transformarPalavraChaveAmpla = function () {
    var kw = '';
    var aux = this.split(' ');

    for (let i = 0; i < aux.length; i++) {
        if (aux[i] == '')
            continue;

        kw += ` +${aux[i]}`;
    }

    return kw;
}

String.prototype.removeConectores = function (ordernarPalavras) {
    var kw = '';
    var aux = [];

    if (ordernarPalavras)
        aux = this.split(' ').sort();
    else
        aux = this.split(' ')

    for (let i = 0; i < aux.length; i++) {
        if (aux[i] == '')
            continue;

        if (Conectores.indexOf(aux[i]) == -1)
            kw += `${aux[i]} `;

    }

    return kw.trim();
}

String.prototype.tratarVirgulas = function () {
    if (this.indexOf(',') !== -1)
        return `"${this.trim()}"`;

    return this;
}

String.prototype.removeAcentos = function () {
    return this.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

function downloadCSV(csv, nomeArquivo) {
    if (csv == null) return;

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv);
    }

    var link = document.createElement('a');
    link.setAttribute('href', csv);
    link.setAttribute('download', nomeArquivo);
    link.click();
}

const Conectores = [
    "se",
    "que",
    "tão que",
    "tanto que",
    "tal que",
    "de modo que",
    "de forma que",
    "de sorte que",
    "de maneira que",
    "quando",
    "apenas",
    "enquanto",
    "antes que",
    "depois que",
    "logo que",
    "assim que",
    "desde que",
    "sempre que",
    "como é",
    "o que é",
    "e",
    "nem",
    "também",
    "tambem",
    "que",
    "mas",
    "mas também",
    "senão também",
    "como também",
    "porém",
    "todavia",
    "contudo",
    "entretanto",
    "senão",
    "ou",
    "ora",
    "já",
    "de",
    "da",
    "do",
    "das",
    "dos",
    "para",
    "a",
    "o",
    "os",
    "as",
    "às",
    "um",
    "uns",
    "uma",
    "umas",
    "pra",
    "pras",
    "algum",
    "alguns",
    "nos",
    "nas",
    "neles",
    "nelas",
    "naqueles",
    "naquelas",
    "em",
    "no",
    "na",
];