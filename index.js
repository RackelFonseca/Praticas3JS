const prompt = require('prompt-sync')();
const fs = require('fs');


function adicionarCarros(lista, carro) {
  lista.push(carro);
  var json = JSON.stringify({ carros: lista });

  return new Promise((resolve, reject) => {
    fs.writeFile('./dcarros.json', json, (erro) => {
      if (erro) {
        reject(erro);
      }
      resolve('Carro adicionado com sucesso');
    });
  });
}

function obterCarros() {
  return new Promise((resolve, reject) => {
    fs.readFile('./dcarros.json', 'utf-8', (erro, data) => {
      if (erro) {
        reject(erro);
      }
      resolve(data);
    });
  });
}

async function listarCarros() {
  try {
    var json = await obterCarros();
    var carros = JSON.parse(json).carros;

    console.table(carros)
  }
  catch(erro) {
    console.log('Ocorreu um erro ao buscar os carros: ' + errp);
  }
}

async function incluirCarros() {
  var placa = prompt('Informe a Placa: ');
  var nome = prompt('Informe o Nome: ');
  var montadora = prompt('Informe a Montadora: ');

  var carro = { placa: placa, nome: nome, montadora: montadora };

  try {
    var carros = await obterCarros();
    //var carros = await obterCarros();
    var lista = JSON.parse(carros).carros;

    adicionarCarros(lista, carro)
    console.log('Carro cadastrado com sucesso...')
  }
  catch (erro) {
    console.log('Ocorreu um erro ao adicionar o carro: ' + erro);
  }
}

async function main() {
  var op;
  do {
    console.log(`Sistema de cadastro de carros
    1 - Listar Carros
    2 - Cadastar Carros
    3 - Sair 
    `);

    op = prompt('Digite a opção desejada: ');
    switch (op) {
      case '1':
        await listarCarros();
        prompt(`Digite Enter para continuar ...`);
        console.clear();
        break;
      case '2':
        await incluirCarros();
        prompt(`Digite Enter para continuar ...`);
        console.clear();
        break;
      case '3':
        console.log('Sistema Encerrando ...');
        break;
      default:
        console.log('Entrada inválida...');
        break;
    }
  } while (op !== '3');
}

main();