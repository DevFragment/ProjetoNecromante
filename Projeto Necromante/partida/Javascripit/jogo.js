// Definição da classe Mesa
class Mesa {
    constructor() {
        // Inicialização dos atributos da classe
        this.bancoDeDados(); // Inicializa o banco de dados com as informações das cartas
        this.caveiras = { jogador1: 0, jogador2: 0 }; // Inicializa o contador de caveiras para cada jogador
        this.rodadas_v = { jogador1: 0, jogador2: 0 }; // Inicializa o contador de rodadas vencidas por jogador
        this.cartas_des = []; // Inicializa o array de cartas descartadas
        this.cartas_mao = { jogador1: [], jogador2: [] }; // Inicializa as mãos dos jogadores
        this.cartas_mesa = { jogador1: [], jogador2: [] }; // Inicializa as cartas na mesa de cada jogador
        this.cartas_compra = { jogador1: [], jogador2: [] }; // Inicializa as cartas disponíveis para compra de cada jogador
        this.deck = { jogador1: [], jogador2: [] }; // Inicializa o deck de cada jogador
        // Deck padrão com as cartas
        this.deckpadrao = [
            { card_name: "Uma Caveira", card_id: 0, card_cv_at: 1, card_cv_bs: 1, card_img: "" },
            { card_name: "Uma Caveira", card_id: 0, card_cv_at: 1, card_cv_bs: 1, card_img: "" },
            { card_name: "Uma Caveira", card_id: 0, card_cv_at: 1, card_cv_bs: 1, card_img: "" },
            { card_name: "Uma Caveira", card_id: 0, card_cv_at: 1, card_cv_bs: 1, card_img: "" },
            { card_name: "Duas Caveiras", card_id: 1, card_cv_at: 2, card_cv_bs: 2, card_img: "" },
            { card_name: "Duas Caveiras", card_id: 1, card_cv_at: 2, card_cv_bs: 2, card_img: "" },
            { card_name: "Duas Caveiras", card_id: 1, card_cv_at: 2, card_cv_bs: 2, card_img: "" },
            { card_name: "Três Caveiras", card_id: 2, card_cv_at: 3, card_cv_bs: 3, card_img: "" },
            { card_name: "Três Caveiras", card_id: 2, card_cv_at: 3, card_cv_bs: 3, card_img: "" },
            { card_name: "Cinco Caveiras", card_id: 3, card_cv_at: 5, card_cv_bs: 5, card_img: "" }
        ];
    }

    // Método para inicializar o banco de dados com as cartas base
    bancoDeDados() {
        this.cartas_base = [
            { card_name: "Uma Caveira", card_id: 0, card_cv_at: 1, card_cv_bs: 1, card_img: "" },
            { card_name: "Duas Caveiras", card_id: 1, card_cv_at: 2, card_cv_bs: 2, card_img: "" },
            { card_name: "Três Caveiras", card_id: 2, card_cv_at: 3, card_cv_bs: 3, card_img: "" },
            { card_name: "Cinco Caveiras", card_id: 3, card_cv_at: 5, card_cv_bs: 5, card_img: "" },
        ];
    }

    // Método para adicionar uma carta à mesa de um jogador
    adicionarCartaNaMesa(jogador, carta) {
        if (jogador == 1) {
            this.cartas_mesa.jogador1.push(carta);
        } else if (jogador == 2) {
            this.cartas_mesa.jogador2.push(carta);
        }
    }

    // Método para jogar uma carta da mão para a mesa
    jogarCartaNaMesa(jogador, posicao) {
        let texto = "jogador";
        texto += jogador; // Determina o jogador
        this.adicionarCartaNaMesa(jogador, this.cartas_mao[texto][posicao]);
        this.cartas_mao[texto] = this.retirarElementoDoArray(this.cartas_mao[texto], posicao);
        this.atualizarValores(); // Atualiza os valores após jogar a carta
    }

    // Método para atualizar os valores de caveiras na mesa de cada jogador
    atualizarValores() {
        // Calcula o total de caveiras na mesa para o jogador 1
        this.caveiras.jogador1 = 0;
        for (let x in this.cartas_mesa.jogador1) {
            this.caveiras.jogador1 += this.cartas_mesa.jogador1[x].card_cv_at;
        }

        // Calcula o total de caveiras na mesa para o jogador 2
        this.caveiras.jogador2 = 0;
        for (let x in this.cartas_mesa.jogador2) {
            this.caveiras.jogador2 += this.cartas_mesa.jogador2[x].card_cv_at;
        }
    }

    // Método para determinar o vencedor da rodada e descartar as cartas da mesa
    fim_da_rodada() {
        // Compara o total de caveiras na mesa de ambos os jogadores
        if (this.caveiras.jogador1 > this.caveiras.jogador2) {
            this.rodadas_v.jogador1 += 1; // Incrementa o contador de rodadas vencidas pelo jogador 1
        } else if (this.caveiras.jogador1 < this.caveiras.jogador2) {
            this.rodadas_v.jogador2 += 1; // Incrementa o contador de rodadas vencidas pelo jogador 2
        } else {
            // Se houver empate, incrementa o contador de rodadas vencidas de ambos os jogadores
            this.rodadas_v.jogador1 += 1;
            this.rodadas_v.jogador2 += 1;
        }
        this.descarte(); // Descarta as cartas da mesa
    }

    // Método para descartar as cartas da mesa
    descarte() {
        // Transfere as cartas da mesa para o monte de cartas descartadas
        for (let x in this.cartas_mesa.jogador1) {
            this.cartas_des.push(this.cartas_mesa.jogador1[x]);
        }
        for (let y in this.cartas_mesa.jogador2) {
            this.cartas_des.push(this.cartas_mesa.jogador2[y]);
        }
        this.cartas_mesa = { jogador1: [], jogador2: [] }; // Limpa as cartas da mesa
    }

    // Método para criar o deck e as cartas de compra para um jogador
    criarDeck(jogador, dec = Array) {
        let texto = "jogador";
        texto += jogador;
        console.log(texto);
        this.deck[texto] = dec;
        this.cartas_compra[texto] = dec;
    }

    // Método para separar as cartas iniciais para cada jogador
    separarCartasInicias(carta_iniciais = 4) {
        // Compra as cartas iniciais para ambos os jogadores
        this.comprarCartas(1, carta_iniciais);
        this.comprarCartas(2, carta_iniciais);
    }

    // Método para comprar cartas para um jogador
    comprarCartas(jogador, numero) {
        let texto = "jogador";
        texto += jogador;
        for (let x = 0; x < numero; x++) {
            let tamanho = this.cartas_compra[texto].length;
            this.cartas_compra[texto].sort(function () { return 0.5 - Math.random() }); // Embaralha o deck antes de comprar
            this.cartas_mao[texto].push(this.cartas_compra[texto][tamanho - 1]); // Adiciona a carta comprada à mão do jogador
            this.cartas_compra[texto].pop(); // Remove a carta comprada do deck de compra
        }
    }

    // Método de auxílio para retirar elemento do array
    retirarElementoDoArray(array = Array, posicao) {
        // Remove o elemento na posição especificada do array
        if (posicao == (array.length - 1)) {
            array.pop();
        } else {
            for (let index = 0; index < array.length; index++) {
                if (index == array.length - 1) {
                    array.pop();
                } else if (index >= posicao) {
                    array[index] = array[index + 1];
                }
            }
        }
        return array;
    }
}
