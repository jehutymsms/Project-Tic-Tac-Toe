(Tic_Tac_ToeGame = () =>{
    let newButton = document.getElementById('new-button');

    const gameBoardDisplay = ((player1 = 'player1', player2 = 'computer') => { 
        let gameBoardArray = [0,1,2,3,4,5,6,7,8];

        const cacheDom = (() => {
            let popupForm = document.getElementById('popupForm'),
            playArea = document.getElementById('play-area')

            return{popupForm:popupForm,playArea:playArea} 
        })()

        const domElementMaker = (tag,id ,cLass= "") => {
            let item = document.createElement(tag)
            item.id = id;
            item.className= cLass;
            return item;
        }

        const addDomElements = (array) =>{

            //3x3 Grid
            for(i=0; i < array.length;i++){
                let title = domElementMaker('div', 'block_' + array[i], 'block');
                cacheDom.playArea.append(title);
            }

            // Winner Displays
            for(i=1; i < 3;i++){
                let title = domElementMaker('h2', 'winner' + i, 'winner');
                cacheDom.playArea.append(title);
            }

            //Insert button inbetween Winner Displays
            let resetButton = domElementMaker('button', 'reset',)
            resetButton.innerHTML = "Reset Board";
            let winner2 = document.getElementById('winner2');
            cacheDom.playArea.insertBefore(resetButton, winner2);
            
        }

        // render DOM
        const render = (() => {})()


        // addDomElements(gameBoardArray)
        
        return {domElementMaker:domElementMaker};
})()

    const newGameButton = () => {

        // cache DOM elements
        const cacheDom = (() => {
            let newButton = document.getElementById('new-button'),
            playArea = document.getElementById('play-area');

            return{newButton:newButton, playArea:playArea}
        })()


        // Bind events
        const bindEvents = () =>{
            cacheDom.newButton.addEventListener('click' ,  () => {
                checkforGrid()
            })

            
        }

        const checkforGrid = () => {
            if (cacheDom.playArea.hasChildNodes()){
                alert("Game Already Started");
            }else {
                formData.render.openForm();
            }
        }

        bindEvents()
}



    const formData = (() =>{
        let data = [];

          // cache DOM elements
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
                formData();
            })

            cacheDom.computerSelectSwitch.addEventListener('click', () => {
                computerSelectionCheck()
            })
            
        }

        // Handle Form Submission Data
        function formData() {
            data = [];
            data.push(cacheDom.playerName.value);
            render.clearPlayer1Input();
            data.push(cacheDom.playerCharSelection.checked);
            data.push(cacheDom.computerSelection.checked);
            data.push(cacheDom.player2Name.value);
            console.log(data)
        }    

        // render DOM
        const render = (()=> {
            const openForm = () =>{
                cacheDom.form.style.display = "block";
            }
            const closeForm = () =>{
                cacheDom.form.style.display = "none";
            }
            const player2NameOpen = () => {
                cacheDom.formContainer2.style.display = "grid";
            }
            const player2NameClose = () => {
                cacheDom.formContainer2.style.display = "none";
                cacheDom.player2Name.value = '';
            }
            const clearPlayer1Input = () => {
                cacheDom.playerName.value = ''
            }

            return{openForm:openForm, closeForm:closeForm, player2NameOpen:player2NameOpen, player2NameClose:player2NameClose, clearPlayer1Input:clearPlayer1Input}
        })()

        const computerSelectionCheck = () =>{
            if (cacheDom.computerSelection.checked == true){
                render.player2NameClose();
            }else{
                render.player2NameOpen();
            }
        }

        computerSelectionCheck()
        bindEvents()
        return{render:render ,data:data}


})()
    // formData.render.openForm()
    newGameButton()
    
    // When new Player button is Clicked:
    // Board is Generated
    // New Player Form is opened:
    // Form needs to have a place to enter a name and a toggle to show a 2nd player name or computer player




})()

