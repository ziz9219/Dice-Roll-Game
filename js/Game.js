/**
 * 
 */
class DiceGame {
    /**
     * class contructor
     */
    constructor() {
        /**
         * Declaring the fundamental game variables
         */
        this.scores;
        this.round_score;
        this.playing;
        this.current_player;

        /**
         * Initilizing the game
         */
        // this.init();

        const game = this;

        /**
         * Adding an event listener to the button that makes the dice roll (using an anonymous function)
         */
        document.querySelector('.btn-roll').addEventListener('click', function(){ game.roll()});

        /**
         * Adding an event listener to the button that allows to accumulate points ('hold')
         */
        document.querySelector('.btn-hold').addEventListener('click', function(){ game.hold()});

        /**
         * Adding an event listener to the button that serves to restart the game
         */
        document.querySelector(".btn-new").addEventListener('click', function(){ game.init()});
    }

    /**
     * Functionality that allows to accumulate points ('hold')
     */
    hold() {
        if(this.playing) {
            /**
             * Adding the current score to the global score
             */
            this.scores[this.current_player - 1] += this.round_score;

            /**
             * Updating the UI (user interface)
             */
            document.querySelector('#score-' + this.current_player).textContent = this.scores[this.current_player - 1];

            /**
             * Checking if the player won the game
             */
            if(this.scores[this.current_player - 1] >= 100) {
                /**
                 * Changing the name of the player to 'Winner!'
                 */
                document.querySelector('#name-' + this.current_player).textContent = 'Winner!';

                /**
                 * Hiding the dice
                 */
                document.querySelector('.dice').style.display = 'none';

                /**
                 * Adding the 'winner' class to the player
                 */
                document.querySelector('.player-' + this.current_player + '-panel').classList.add('winner');

                /**
                 * Removing the active player status from the winner
                 */
                document.querySelector('.player-' + this.current_player + '-panel').classList.remove('active');

                /**
                 * Changing the 'playing' variable to 'false'
                 */
                this.playing = false;
            }
            else {
                /**
                 * If the player wins the game, then it's the next player's turn
                 */
                this.nextPlayer();
            }
        }
    }

    /**
     * Function that initializes the game
     */
    init() {
        /**
         * Setting the 'gamePlaying' variable to 'true'
         */ 
        this.playing = true;

        /**
         * Setting both scores back to 0
         */
        this.scores = [0, 0];

        /**
         * Setting the activePlayer back to being 'Player 1'
         */
        this.current_player = 1;

        /**
         * Setting the roundScore back to 0
         */
        this.round_score = 0;

        /**
         * Hiding the dice right from the beggining of the game
         */
        document.querySelector('.dice').style.display = 'none';

        /**
         * Setting the scores to 0 by default (using the 'getElementById' method)
         */
        document.getElementById('score-1').textContent = '0';
        document.getElementById('score-2').textContent = '0';

        document.getElementById('current-1').textContent = '0';
        document.getElementById('current-2').textContent = '0'; 

        /**
         * Removing the 'winner status' from the winning player
         */
        document.getElementById('name-1').textContent = 'Player 1';
        document.getElementById('name-2').textContent = 'Player 2'; 

        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-2-panel').classList.remove('winner');

        /**
         * Removing the 'active status' from the winning player
         */
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-2-panel').classList.remove('active');

        /**
         * Make sure that the 'active status' from 'Player 2' is removed and given to 'Player 1'
         */
        document.querySelector('.player-2-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    }

    /**
     * Function that serves to change the current player
     */
    nextPlayer() {
        /**
         * It's the next player's turn if the dice number is 1 (using the ternary operator)
         */
        this.current_player === 1 ? this.current_player = 2 : this.current_player = 1;

        /**
         * Setting the roundScore back to 0
         */
        this.round_score = 0;

        /**
         * Setting the current score back to 0
         */
        document.getElementById('current-1').textContent = '0';
        document.getElementById('current-2').textContent = '0';

        /**
         * Adding the active class to the player who has the turn now
         */
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.player-2-panel').classList.toggle('active');

        /**
         * Hiding the dice after the active player changes
         */
        document.querySelector('.dice').style.display = 'none';
    }

    /**
     * function that manages the roll of the dice
     */
    roll() {
        /**
         * Checking if the game is being played
         */
        if(this.playing) {
            /**
             * Create a random number for the dice
             */
            const dice_number = Math.floor(Math.random() * 6) + 1;

            /**
             * Display the result
             */

            const dice_image = document.querySelector('.dice');
            dice_image.style.display = 'block';

            // dice_image.src = 'dice-' + dice_number + '.png';
            dice_image.src = './images/dice/dice-' + dice_number + '.png';

            /**
             * Update the round score if the rolled number was not a 1
             */

            if(dice_number !== 1) {
                /**
                 * Add score if the dice number is different from 1
                 */
                this.round_score += dice_number;
                document.querySelector('#current-' + this.current_player).textContent = this.round_score;
            }
            else {
                /**
                 * Next player's turn
                 */
                this.nextPlayer();
            }
        }
    }
}
