(Tic_Tac_ToeGame = () =>{

    const gameBoardDisplay = (() => {

        // Cache Dom Elements
        const cacheDom = (() => {
            let popupForm = document.getElementById('popupForm'),
            playArea = document.getElementById('play-area'),
            roundwinnerDisplay = document.getElementById('round-winnerDisplay'),
            player1Name = document.getElementById('player1Name'),
            player1Selection = document.getElementById('player1Selection'),
            player1Score = document.getElementById('player1Score'),
            player2Name = document.getElementById('player2Name'),
            player2Selection = document.getElementById('player2Selection'),
            player2Score = document.getElementById('player2Score')

            return{popupForm:popupForm,playArea:playArea,
                roundwinnerDisplay:roundwinnerDisplay,player1Name:player1Name,player1Selection:player1Selection,player1Score:player1Score,player2Name:player2Name,player2Selection:player2Selection,player2Score:player2Score} 
        })()

        //Function List

        const nameUpdates = (player1 = 'Player 1', player1Selection = 'X',player2 = 'Computer', player2Selection = 'O') =>{
            render.player1NameUpdate(player1);
            render.player1SelectionUpdate(player1Selection);
            render.player2NameUpdate(player2);
            render.player2SelectionUpdate(player2Selection);
        };

        const hideBoard = () =>{
            render.hideBoard();
        };
        const showBoard = () =>{
            render.displayBoard();
        };

        // Render DOM
        const render = (()=>{
            const player1NameUpdate = (player1) =>{
                cacheDom.player1Name.innerHTML = player1;
            }
            const player1SelectionUpdate = (selection) =>{
                cacheDom.player1Selection.innerHTML  = selection;
            }
            const player2NameUpdate = (player2) =>{
                cacheDom.player2Name.innerHTML  = player2;
            }
            const player2SelectionUpdate = (selection) =>{
                cacheDom.player2Selection.innerHTML  = selection;
            }
            const displayBoard = () => {
                cacheDom.playArea.style.display = "grid";
                cacheDom.roundwinnerDisplay.style.display = "block";
            }
            const hideBoard = () => {
                cacheDom.playArea.style.display = "none";
                cacheDom.roundwinnerDisplay.style.display = "none";
            }
            
            return{player1NameUpdate:player1NameUpdate,player1SelectionUpdate:player1SelectionUpdate,player2NameUpdate:player2NameUpdate,player2SelectionUpdate:player2SelectionUpdate,displayBoard:displayBoard,hideBoard:hideBoard}
            
            
        })()

        return {nameUpdates:nameUpdates,hideBoard:hideBoard,showBoard:showBoard};

    })()

    const newGameButton = (() => {

        // cache DOM elements
        const cacheDom = (() => {
            let newButton = document.getElementById('new-button'),
            playArea = document.getElementById('play-area'),
            container = document.getElementById('container');

            return{newButton:newButton, playArea:playArea, container:container}
        })()


        // Bind events
        const bindEvents = () =>{
            cacheDom.newButton.addEventListener('click' ,  clear);
        }

        // Functions List
        const clear = () => {
            try {
                observer.disconnect();
                checkforGrid();
              }
              catch(err) {
                checkforGrid();
              }
        }

        const checkforGrid = () => {
            if (cacheDom.playArea.hasChildNodes()){
                removeGrid();
                gameLogic.boardClear();
                gameLogic.gameReset();
                formData.render.openForm();
            }else {
                formData.render.openForm();
            }
        }

        const removeGrid =() =>{
            gameBoardDisplay.hideBoard();
        }
        
        bindEvents()
        return{removeGrid:removeGrid}
    })()

    const formData = (() =>{

        // Cache Dom Elements
        const cacheDom = (() => {
            let form = document.getElementById('popupForm'), 
            formContainer = document.getElementById('formContainer'),
            formContainer2 = document.getElementById('formContainer2'),
            sumbmitButton = document.getElementById('sumbit-button'),
            playerName = document.getElementById('player1'),
            player2Name = document.getElementById('player2'),
            playerCharSelection = document.getElementById('playerselectX'),
            closeButton = document.getElementById('close-button'),
            computerSelectSwitch = document.getElementById('switch'),
            computerSelection = document.getElementById('playAgainstComp'),
            myFormData = document.getElementById('player1Form')

            return{formContainer:formContainer, sumbmitButton:sumbmitButton, playerName:playerName, playerCharSelection:playerCharSelection, computerSelection:computerSelection, player2Name:player2Name, form:form, closeButton:closeButton, formContainer2:formContainer2,computerSelectSwitch:computerSelectSwitch, myFormData:myFormData} 
        })()

        // bind events
        const bindEvents = () =>{
            cacheDom.closeButton.addEventListener('click', (event) => {
                event.preventDefault();
                render.closeForm();
            })

            cacheDom.sumbmitButton.addEventListener('click', (event) => {
                event.preventDefault();
                processFormData();
                render.closeForm();
            })

            cacheDom.computerSelectSwitch.addEventListener('click', () => {
                computerSelectionCheck()
            })
            
        }

        // Handle Form Submission Data
        function processFormData() {
            data = [];
            if(cacheDom.playerName.value == ""){
                data.push("Player 1");
            }else{
                data.push(cacheDom.playerName.value);
            };

            if(cacheDom.playerCharSelection.checked){
                data.push("X");
            }else{
                data.push("O");
            };

            if(!cacheDom.computerSelection.checked){
                data.push("Computer");
            }else{
                if(cacheDom.player2Name.value == ""){
                    data.push("Player 2");
                }else{
                    data.push(cacheDom.player2Name.value);
                };
            };

            if(data[1] == "X"){
                data.push("O");
            }else{
                data.push("X");
            };

            render.clearInput();
            render.player2NameClose();
            gameBoardDisplay.nameUpdates(...data);
            gameBoardDisplay.showBoard();
            gameLogic.unbindEvents();
            gameLogic.bindEvents();
            gameLogic.render.player1TurnDisplay();
            // restartGameButton();
        };    

        // render DOM
        const render = (()=> {
            const openForm = () =>{
                cacheDom.form.style.display = "block";
            }
            const closeForm = () =>{
                cacheDom.form.style.display = "none";
            }
            const player2NameClose = () => {
                cacheDom.formContainer2.style.display = "none";
            }
            const player2NameOpen = () => {
                cacheDom.formContainer2.style.display = "grid";
                cacheDom.player2Name.value = '';
            }
            const clearInput = () => {
                cacheDom.playerName.value = '';
                cacheDom.player2Name.value = '';
                cacheDom.computerSelection.checked = false;
                cacheDom.playerCharSelection.checked;
            }

            return{openForm:openForm, closeForm:closeForm, player2NameOpen:player2NameOpen, player2NameClose:player2NameClose, clearInput:clearInput}
        })()

        const computerSelectionCheck = () =>{
            if (cacheDom.computerSelection.checked){
                render.player2NameOpen();
            }else{
                render.player2NameClose();
            }
        }

        bindEvents()
        return{render:render, processFormData:processFormData}


    })()

    const gameLogic = (() =>{
        // cache DOM elements
        const cacheDom = (() => {
            let newButton = document.getElementById('new-button'), 
            playArea = document.getElementById('play-area'),
            roundWinnerDisplay = document.getElementById('round-winnerDisplay'),
            player1Display = document.getElementById('player1Display'),
            player1Name = document.getElementById('player1Name'),
            player1Selection = document.getElementById('player1Selection'),
            player1Score = document.getElementById('player1Score'),
            player2Display = document.getElementById('player2Display'),
            player2Name = document.getElementById('player2Name'),
            player2Selection = document.getElementById('player2Selection'),
            player2Score = document.getElementById('player2Score'),
            formContainer = document.getElementById('formContainer'),
            container = document.getElementById('container'),
            gridArea = document.getElementsByClassName('block')


            return {newButton:newButton, playArea:playArea,roundWinnerDisplay:roundWinnerDisplay,player1Display:player1Display ,player1Name:player1Name ,player1Selection:player1Selection, player1Score:player1Score,player2Display:player2Display,player2Name:player2Name ,player2Selection:player2Selection, player2Score:player2Score,formContainer:formContainer,container:container,gridArea:gridArea};
        })();

        //Variables 
        let playerScores = {player1:0, player2:0},
        board = [],
        round = 1,
        turn = 1;

        // bind events
        const bindEvents = () => {
            cacheDom.playArea.addEventListener('click', selection);
        };
    
        // Function List
        const changeTurnIndicator = () => {
            if (turn == 2){
                render.player2TurnDisplay();
            }else{
                render.player1TurnDisplay();
            }
        };

        const turnChange = ()=>{
            if(turn == 1){
                turn = 2;
            }else{
                turn = 1;
            };
        };

        const selection = (event) => {
            if(event.target.className == 'block' && event.target.innerHTML == ''){
                render.enterSelection(turnIndicator(), event.target);
                // gameLogic.gameProgress(event.target.innerHTML);
                if (cacheDom.player2Name.innerHTML == 'Computer'){
                    console.log('Computer Progres Runs')
                    gameLogic.gameComputerProgress();
                }else{
                    gameLogic.gameProgress(event.target.innerHTML);
                }
            }else if (event.target.className == 'block'){
                alert(`Selection present please Select another block`)
            }
        };

        const unbindEvents = () =>{
            cacheDom.playArea.removeEventListener('click', selection);
        };

        const turnIndicator = () => {
            if(player1Display.className.includes('turn')){
                return cacheDom.player1Selection;
            }else{
                return cacheDom.player2Selection;
            }
        };

        const checkWin = ( selection = 'X')=>{
            let gameBoardHTMl = [],
            grid = cacheDom.playArea.childNodes;
            
            // Extract HTML from Grid Elements
            // Add to grid
            for (let i=0; i < grid.length; i++){
                if(grid[i].className == 'block'){
                    gameBoardHTMl.push(grid[i].innerHTML);
                }
            }
            //Function List
            const win = (condition, gridSelection, selection) => {
                let winList = [];
                for(const condi of condition){
                    winList = [];
                    for(const index of condi){
                        if(gridSelection[index] == selection){
                            winList.push(gridSelection[index])
                                if(winList.length == 3){
                                    return 'Win';
                                }
                        }else{
                            winList = [];
                        }
                    }
                }
                return 'Loss'
            }
            const checkVerticalWin = (selection, gridselection)=>{
                let condition = [[0,3,6],[1,4,7],[2,5,8]];
                return win(condition, gridselection, selection);
            }
            const checkhorizontalWin = (selection, gridselection)=>{
                let condition = [[0,1,2],[3,4,5],[6,7,8]];
                return win(condition, gridselection, selection);
            }
            const checkDiagonalWin = (selection, gridselection)=>{
                let condition = [[0,4,8],[2,4,6]];
                return win(condition, gridselection, selection);
            }
            // Win checker Statements
            if(checkVerticalWin(selection,gameBoardHTMl) == 'Win'){
                return "Win";
            }else if(checkhorizontalWin(selection,gameBoardHTMl) == 'Win'){
                return "Win";
            }else if (checkDiagonalWin(selection,gameBoardHTMl) == 'Win'){
                return "Win";
            }else{
                return "Loss";
            }

            
        };

        const boardFull = () => {
            board = [];
            // Extract HTML from Grid Elements
            // Add to grid
            
            for (let i=0; i < cacheDom.gridArea.length; i++){
                if(cacheDom.gridArea[i].innerHTML != ''){
                    board.push(cacheDom.gridArea[i].innerHTML);
                }
            }
            const check = () =>{
                if (board.length == 9){
                    boardClear();
                    return 'Board Full Resetting'
                }else{
                    return 'Good'
                }
            };

            return check();

            // 
            // let observer = new MutationObserver(mutations => {
            //     if(mutations[0].addedNodes[0]== undefined){
            //         observer.disconnect();
            //     }else{
            //         board.push(mutations[0].addedNodes[0].textContent)
            //     }
                
            //     });

            // observer.observe(cacheDom.playArea, {
            //     childList: true,
            //     subtree: true 
            // });

            
        };

        const checkScore = (playerNumber) => {
            if (playerNumber == 1){
                if(playerScores.player1 >= 2){
                    return 'Win';
                }else{
                    return'Continue';
                }
            }else{
                if(playerScores.player2 >= 2){
                    return 'Win';
                }else{
                    return'Continue';
                }
            }
        };

        const boardClear = () =>{
            board = [];
            for(let element of cacheDom.gridArea){
                render.clearHTML(element);
            }
        }

        const scoreClear = () =>{
            playerScores.player1 = 0;
            playerScores.player2 = 0;
            render.scoreChange(1,0);
            render.scoreChange(2,0);
        };

        const roundChange = () =>{
            render.roundUpdate(round)
        };

        const roundWinner = (player) =>{
            render.winnerDisplayUpdate(`${player} Won Round!`)
        };

        const gameWinner = (player) =>{
            render.winnerDisplayUpdate(`${player} Won Game!`)
        };

        const gameReset = () =>{
            scoreClear()
            round = 1;
            render.roundUpdate(round)
        };
        // Testing way to pick variables based on user input
        const playerWin = (player) => {
            playerScores[player] += 1;
            round += 1;
            turnChange();
            roundWinner(cacheDom[`${player}Name`].innerHTML);
            unbindEvents();
            setTimeout(() => {
                roundChange();
                render.scoreChange(1, playerScores[player]);
                boardClear();
                changeTurnIndicator();
                bindEvents();
            }, 3000);
            if (checkScore(1) == 'Win') {
                gameWinner(cacheDom[`${player}Name`].innerHTML);
                setTimeout(() => {
                    gameReset();
                    changeTurnIndicator();
                    bindEvents();
                }, 3000);
            }
        }
        // Computer Selected Move
        // This should return the block number we want to enter
        //Should return let block = document.getElementById(`block_${item}`);
        const computerMove = () => {

            let gameBoardHTMl = [],
            grid = cacheDom.playArea.childNodes,
            empty = [];

            //Functions List
            const checkEmpty = (item) => {
                if (item == ''){
                    return 'add'
                }
            }

            //Enter Computer Selection in grid
            const computerselectionPlace = (item) =>{
                let block = document.getElementById(`block_${item}`);
                return block
            }

            const randomReturn = (array) =>{
                    return array[0];
            }

            // Get all Current Tiles
            for (i=0; i < grid.length; i++){
                if(grid[i].className == 'block'){
                    gameBoardHTMl.push(grid[i].innerHTML);
                }
            }
            // Determine which tiles are empty and add to empty array
            for (i=0; i < gameBoardHTMl.length; i++){
                if (checkEmpty(gameBoardHTMl[i]) == 'add'){
                    empty.push(i)
                }
            }
            


            return computerselectionPlace(randomReturn(empty))


        }

        // Game Against Computer
        const gameComputerProgress = () =>{
            unbindEvents();
            turnChange();
            changeTurnIndicator();
            setTimeout(function() {
                render.enterSelection(cacheDom.player2Selection, computerMove());
                if (checkWin(turnIndicator().textContent) == 'Win'){
                    if(cacheDom.player2Selection.innerHTML == turnIndicator().textContent){
                        playerWin('player2');
                    }else{
                        playerWin('player1');
                    }
                }else if(boardFull() =='Good'){
                    turnChange();
                    changeTurnIndicator();
                    bindEvents();
                }else{
                    alert('Board Full Clearing Board');
                    turnChange();
                    changeTurnIndicator();
                    bindEvents();
                }
            },2000)
            
            // Write game Computer Progress Function for when the computer makes moves
            
            
        };

        // Game Against Player
        const gameProgress = (selection) => {
            unbindEvents();
            if (checkWin(turnIndicator().textContent) == 'Win'){
                if(cacheDom.player1Selection.innerHTML == selection){
                    playerWin('player1');
                }else{
                    playerWin('player2');
                }
            }else if(boardFull() =='Good'){
                turnChange();
                changeTurnIndicator();
                bindEvents();
            }else{
                alert('Board Full Clearing Board');
                turnChange();
                changeTurnIndicator();
                bindEvents();
            }
        };
        const gameMode = () =>{
            if (cacheDom.player2Name == 'Computer'){
                gameReset();
                boardClear();
                gameComputerProgress();
            }else{
                gameReset();
                boardClear();
                gameProgress();
            }
        }

        // render DOM
        const render = (() => {

            const enterSelection = (selection, id) => {
                id.innerHTML = selection.innerHTML;
            }

            const player1TurnDisplay = () =>{
                player1Display.classList.add('turn');
                player2Display.classList.remove('turn');
            }

            const player2TurnDisplay = () =>{
                player1Display.classList.remove('turn');
                player2Display.classList.add('turn');
            }

            const roundUpdate = (round) =>{
                cacheDom.roundWinnerDisplay.innerHTML = `Round ${round}`;
            }
            const winnerDisplayUpdate = (string) =>{
                cacheDom.roundWinnerDisplay.innerHTML = string;
            }

            const scoreChange = (player, score) =>{      
                if (player == 1){
                    cacheDom.player1Score.innerHTML = `Score: ${score}`
                }else{
                    cacheDom.player2Score.innerHTML = `Score: ${score}`
                }
            }

            const clearHTML = (element) =>{
                element.innerHTML = ""
            }
        

            return{enterSelection:enterSelection, player1TurnDisplay:player1TurnDisplay, player2TurnDisplay:player2TurnDisplay, roundUpdate:roundUpdate, winnerDisplayUpdate:winnerDisplayUpdate, scoreChange:scoreChange,clearHTML:clearHTML}

        }) ()


        
        return{boardClear:boardClear,scoreClear:scoreClear,gameMode:gameMode,bindEvents:bindEvents,unbindEvents:unbindEvents,changeTurnIndicator:changeTurnIndicator,gameReset:gameReset,gameComputerProgress:gameComputerProgress,gameProgress:gameProgress,render:render}
    })()

    const restartGameButton = () => {
        // cache DOM elements
        const cacheDom = (() =>{
        let resetButton = document.getElementById('reset'),
            playArea = document.getElementById('play-area'),
            gridArea = document.getElementsByClassName('block'),
            player1Display = document.getElementById('player1Display'),
            player1Name = player1Display.childNodes[0].innerHTML,
            player1Selection = player1Display.childNodes[1].innerHTML,
            player2Display = document.getElementById('player2Display'),
            player2Name = player2Display.childNodes[0].innerHTML,
            player2Selection = player2Display.childNodes[1].innerHTML,
            openModalButton = document.querySelector('[data-modal-target]'),
            closeModalButton = document.querySelector('[data-close-button]'), restartGame = document.getElementById('restartGame'),
            overlay = document.getElementById('overlay'),
            openModalData = document.querySelector(openModalButton.dataset.modalTarget),
            closeModalTargets = closeModalButton.closest('.modal');

            return{resetButton:resetButton,playArea:playArea,gridArea:gridArea,player1Name:player1Name,player1Selection:player1Selection,player2Name:player2Name,player2Selection:player2Selection,openModalButton:openModalButton,closeModalButton:closeModalButton, restartGame:restartGame,overlay:overlay,openModalData:openModalData,closeModalTargets:closeModalTargets}
        })()

        // bind events
        const bindEvents = (() =>{
            cacheDom.openModalButton.addEventListener('click', ()=> {
                openModal(cacheDom.openModalData);
            })

            cacheDom.overlay.addEventListener('click', ()=> {
                const modals = document.querySelectorAll('.modal.active')
                modals.forEach(modal =>{ 
                    closeModal(modal);
                })  
            })

            cacheDom.closeModalButton.addEventListener('click', ()=> {
                closeModal(cacheDom.closeModalTargets);
            })
            
            cacheDom.restartGame.addEventListener('click', ()=> {
                boardClear();
            })

        })()

        // render DOM
        const render = (() =>{

            const modalShow = (modal) =>{
                modal.classList.add('active');
            }
            const modalHide = (modal) =>{
                modal.classList.remove('active');
            }
            const overlayShow = () =>{
                cacheDom.overlay.classList.add('active');
            }
            const overlayHide = () =>{
                cacheDom.overlay.classList.remove('active');
            }
            const clearHTML = (element) =>{
                element.innerHTML = ""
            }

            const player1TurnDisplay = () =>{
                player1Display.classList.add('turn');
                player2Display.classList.remove('turn');
            }


            return{modalShow:modalShow,modalHide:modalHide,overlayShow:overlayShow,overlayHide:overlayHide,clearHTML:clearHTML, player1TurnDisplay:player1TurnDisplay}
        })()

        // Function List
        const openModal = (modal)=>{
            if(modal == null) return
            render.modalShow(modal);
            render.overlayShow();
        }

        const closeModal = (modal)=>{
            if(modal == null) return
            render.modalHide(modal);
            render.overlayHide();
        }

        const boardClear = () =>{
            closeModal(cacheDom.openModalData);
            console.log(gameLogic.gameReset)
            gameLogic.gameReset();
            console.log(gameLogic.boardClear)
            gameLogic.boardClear();
            // render.player1TurnDisplay();
        }
    }

})()
