//Mesa

class Mesa{
   constructor(){
        this.bancoDeDados()
        this.caveiras = {jogador1: 0, jogador2: 0}
        this.rodadas_v = {jogador1: 0, jogador2: 0}
        this.cartas_des = []
        this.cartas_mao = {jogador1: [], jogador2:[]}
        this.cartas_mesa = {jogador1: [], jogador2:[]}
        this.cartas_compra =  {jogador1: [], jogador2:[]}
        this.deck = {jogador1: [], jogador2:[]}
        this.deckpadrao = [ {card_name:"Uma Caveira",card_id:0, card_cv_at:1, card_cv_bs:1, card_img:"", },{card_name:"Uma Caveira",card_id:0, card_cv_at:1, card_cv_bs:1, card_img:"", },{card_name:"Uma Caveira",card_id:0, card_cv_at:1, card_cv_bs:1, card_img:"", },{card_name:"Uma Caveira",card_id:0, card_cv_at:1, card_cv_bs:1, card_img:"", },{card_name:"Duas Caveiras",card_id:1, card_cv_at:2, card_cv_bs:2, card_img:"", },{card_name:"Duas Caveiras",card_id:1, card_cv_at:2, card_cv_bs:2, card_img:"", },{card_name:"Duas Caveiras",card_id:1, card_cv_at:2, card_cv_bs:2, card_img:"", },{card_name:"Três Caveiras",card_id:2, card_cv_at:3, card_cv_bs:3, card_img:"", },{card_name:"Três Caveiras",card_id:2, card_cv_at:3, card_cv_bs:3, card_img:"", },{card_name:"Cinco Caveiras",card_id:3, card_cv_at:5, card_cv_bs:5, card_img:"", },]

    }
    bancoDeDados(){
        this.cartas_base = [
            {card_name:"Uma Caveira",card_id:0, card_cv_at:1, card_cv_bs:1, card_img:"", },
            {card_name:"Duas Caveiras",card_id:1, card_cv_at:2, card_cv_bs:2, card_img:"", },
            {card_name:"Três Caveiras",card_id:2, card_cv_at:3, card_cv_bs:3, card_img:"", },
            {card_name:"Cinco Caveiras",card_id:3, card_cv_at:5, card_cv_bs:5, card_img:"", },
        ]
    }
    adicionarCartaNaMesa(jogador,carta){
        if(jogador == 1){
            this.cartas_mesa.jogador1.push(carta)
        }else if(jogador == 2){
            this.cartas_mesa.jogador2.push(carta)
        }

    }
    jogarCartaNaMesa(jogador,posicao){
        let texto = "jogador"
        texto += jogador//jogador 1 ou 2
        this.adicionarCartaNaMesa(jogador,this.cartas_mao[texto][posicao])
        this.cartas_mao[texto] = this.retirarElementoDoArray(this.cartas_mao[texto], posicao)
        this.atualizarValores()
        

    }
    

    atualizarValores(){
        
        this.caveiras.jogador1 = 0
        for (let x in this.cartas_mesa.jogador1){
            this.caveiras.jogador1 += this.cartas_mesa.jogador1[x].card_cv_at
        }

        this.caveiras.jogador2 = 0
        for (let x in this.cartas_mesa.jogador2){
            this.caveiras.jogador2 += this.cartas_mesa.jogador2[x].card_cv_at
        }
    }
    fim_da_rodada(){
        if (this.caveiras.jogador1 > this.caveiras.jogador2){
            this.rodadas_v.jogador1 += 1
        }else if (this.caveiras.jogador1 < this.caveiras.jogador2){
            this.rodadas_v.jogador2 += 1
        }else{
            this.rodadas_v.jogador1 += 1
            this.rodadas_v.jogador2 += 1
        }
        this.descarte()

    }
    descarte(){
        for (let x in this.cartas_mesa.jogador1){
            this.cartas_des.push( this.cartas_mesa.jogador1[x])
        }
        for (let y in this.cartas_mesa.jogador2){
            this.cartas_des.push( this.cartas_mesa.jogador2[y])
        }
        this.cartas_mesa = {jogador1: [], jogador2:[]}
    }
    criarDeck( jogador, dec = Array){
        let texto = "jogador"
        texto += jogador
        console.log(texto)
        this.deck[texto] = dec
        this.cartas_compra[texto] = dec
    }
    separarCartasInicias(carta_iniciais = 4){
        this.comprarCartas(1,carta_iniciais)
        this.comprarCartas(2,carta_iniciais)
    }
    comprarCartas(jogador,numero){
        let texto = "jogador"
        texto += jogador
        for (let x = 0; x < numero; x++){
            let tamanho = this.cartas_compra[texto].length
            this.cartas_compra[texto].sort(function(){return 0.5 - Math.random()});
            this.cartas_mao[texto].push( this.cartas_compra[texto][tamanho-1])
            this.cartas_compra[texto].pop()
        }
    }
//funçao de auxilio 
    retirarElementoDoArray(array = Array,posicao ){
        if (posicao == (array.length-1)){
            array.pop()
        }else{//array = [1,3,5,2,2]
            for (let index = 0; index < array.length; index++) {
                if (index == array.length-1){
                    array.pop()
                }else if(index >= posicao){
                    array [index] = array[index+1]
                }
            }
        }
        return array;
    }
}
