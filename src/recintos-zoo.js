class RecintosZoo {
  animais = [{
    nome: 'LEAO',
    tamanho: 3,
    biomas: ['savana'],
    carnivoro: true,
    naoGostaDeFicarSozinho: false
  },{
    nome: 'LEOPARDO',
    tamanho: 2,
    biomas: ['savana'],
    carnivoro: true,
    naoGostaDeFicarSozinho: false
  }, {
    nome: 'CROCODILO',
    tamanho: 3,
    biomas: ['rio'],
    carnivoro: true,
    naoGostaDeFicarSozinho: false
  }, {
    nome: 'MACACO',
    tamanho: 1,
    biomas: ['savana', 'floresta'],
    carnivoro: false,
    naoGostaDeFicarSozinho: true
  }, {
    nome: 'GAZELA',
    tamanho: 2,
    biomas: ['savana'],
    carnivoro: false,
    naoGostaDeFicarSozinho: false
  }, {
    nome: 'HIPOPOTAMO',
    tamanho: 4,
    biomas: ['savana', 'rio'],
    carnivoro: true,
    naoGostaDeFicarSozinho: false
  }]

  recintos = [{
    numero: 1,
    biomas: ['savana'],
    tamanhoTotal: 10,
    animaisExistentes: [{ nome: 'MACACO', quantidade: 3 }]
  }, {
    numero: 2,
    biomas: ['floresta'],
    tamanhoTotal: 5,
    animaisExistentes: []
  }, {
    numero: 3,
    biomas: ['savana','rio'],
    tamanhoTotal: 7,
    animaisExistentes: [{ nome: 'GAZELA', quantidade: 1 }]
  }, {
    numero: 4,
    biomas: ['rio'],
    tamanhoTotal: 8,
    animaisExistentes: []
  }, {
    numero: 5,
    biomas: ['savana'],
    tamanhoTotal: 9,
    animaisExistentes: [{ nome: 'LEAO', quantidade: 1 }]
  }]

  analisaRecintos(animal, quantidade) {
    const animalCompleto = this.animais.find(animal_local => animal_local.nome === animal)
    if (!animalCompleto) return { erro: 'Animal inválido' }
    if (!quantidade) return { erro: 'Quantidade inválida' }
  
    const recintosViaveis = []

    this.recintos.forEach(recinto => {
      const totalOcupado = recinto.animaisExistentes.reduce((total, animalExistente) => {
        const tamanhoAnimal = this.animais.find(animalLocal => animalLocal.nome === animalExistente.nome).tamanho
        return total + tamanhoAnimal * animalExistente.quantidade
      }, 0)

      if(!recinto.biomas.some(bioma => animalCompleto.biomas.includes(bioma))) return

      if(animalCompleto.carnivoro && recinto.animaisExistentes.some(animalExiste => animalExiste.nome !== animal)) return

      if(recinto.animaisExistentes.some(animalExistente => {
        const animalExistenteCompleto = this.animais.find(animalLocal => animalLocal.nome === animalExistente.nome)
        if(animalExistenteCompleto.carnivoro && animalExistenteCompleto.nome !== animal) return true
      })) return

      if(animalCompleto.naoGostaDeFicarSozinho && quantidade === 1 && recinto.animaisExistentes.length === 0) return

      if( (animalCompleto.tamanho * quantidade) <= recinto.tamanhoTotal - totalOcupado) {
        console.log(recinto.tamanhoTotal - totalOcupado - animalCompleto.tamanho * quantidade, recinto.tamanhoTotal, totalOcupado, animalCompleto.tamanho * quantidade)
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - totalOcupado - animalCompleto.tamanho * quantidade} total: ${recinto.tamanhoTotal})`)
      }
    })

    if(!recintosViaveis.length) {
      return { erro: 'Não há recinto viável' }
    }

    return { recintosViaveis }
  }

}

export { RecintosZoo as RecintosZoo };
