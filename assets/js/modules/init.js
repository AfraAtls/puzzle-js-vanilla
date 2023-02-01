export const init = {
    ROWS:3,
    COLS:3,
    turns:0,
    currentCard:'',
    blankCard: '',
    otherCard:'',
    gameOver:false,
    winningPattern: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    imgOrder : ['9', '8', '7', '6', '5', '4', '3', '2', '1'],

     /**
     * Crée une modal permettant de lister les règles du jeu
     */
    displayRules: () => {
          const modal = document.createElement('div');
          modal.classList.add('modal');
          const modalContent = document.createElement('div');
          modalContent.classList.add('modal-content');
          modalContent.innerHTML = `
            <h2>Règles du jeu</h2>
            <ul>
                <li>Le jeu consiste à déplacer les cartes pour arriver à reproduire l'image complète</li>
                <li>Il y a une case vide dans le jeu, c'est celle qui ne contient aucun dessin.</li>
                <li>Vous pouvez uniquement déplacer les cartes sur la case vide.</li>
                <li>Les déplacements doivent être effectués de manière adjacente</li>
                <li>Une fois l'image formée, le jeu est terminé !</li>
            </ul>
          `;
          modal.appendChild(modalContent);
          document.body.appendChild(modal);
      },

    /**
     * Supprime la modal
     */
    HideRules : () => {
        document.querySelector('.modal').remove()
    },

    /**
     * Crée une grille de cards à partir des propriétés x et y
     * Chaque card est créée en utilisant la méthode `createCard`
     */
    drawBoard : () => {
        for(let x=1; x<init.ROWS+1; x++) {
            for(let y=1; y<init.COLS+1; y++) {
                init.createCard(x,y)
            }
        }
    },

    /**
     * Crée une card en utilisant les paramètres x et y
        * @param {number} x - La coordonnée des abscisses x de la carte
        * @param {number} y - La coordonnée y des ordonnées y de la carte
     */
    createCard : (x, y) => {
        const card = document.createElement("img");
        const cardsSrc = init.imgOrder
        card.dataset.x = x;
        card.dataset.y = y;
        card.classList.add('parts')
        card.src =`assets/img/parts/${cardsSrc.shift()}.jpg`
        card.id = (card.src.split("/"))[6].split(".")[0]
        document.getElementById('board').append(card)
    },

     /**
     * Retourne l'ensemble des cards (images) de la grille
     */
    getCards : () => {
        return [...document.querySelectorAll('.parts')]
    },

}
