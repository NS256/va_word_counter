function countWords() {
    const TRANSCRIPTINPUT = document.querySelector(".input-container #transcript").value;

    var transcriptSplit = TRANSCRIPTINPUT.split(/\s+/);

    loopThroughTranscript(transcriptSplit);
}

function wordsToIgnore() {
    const TEXTBOX = document.querySelector(".words-to-remove-modal textarea").value;
    return TEXTBOX.split(/\s+/);
}

function loopThroughTranscript(transcriptArray){
    var resultArray = [];

    for (let i=0; i< transcriptArray.length; i++){
        var wordExists = false;
        var transcriptWord = {
                                word: modifyWord(transcriptArray[i]),
                                count: 1
                             };

        if (wordsToIgnore().includes(transcriptWord.word)){
            continue;
        }
        
        if ( transcriptWord.word == "" || transcriptWord.word == " " ){
            continue;
        }
        
        if (resultArray.length > 0 ) {                    
            for (let i=0; i < resultArray.length ; i++) {
                if ( transcriptWord.word == resultArray[i].word) {
                    wordExists = true;
                    resultArray[i].count++;
                } else {
                }
            }

            if (!wordExists) {
                resultArray.push(transcriptWord);
            }

        } else {
            resultArray.push(transcriptWord);
        }
    }
    var sortedResults = sortTable(resultArray);

    createResultsTable(sortedResults);
}

function createResultsTable(resultArray){
    clearTable(false);

    const RESULTTABLE = document.querySelector(".results-output #results-table");
    const MINCOUNT = document.querySelector(".details-to-ignore #minimum-count").value;

    //create a table row containing data for each item in result array
    if (resultArray.length >= 1){

        for (let i = 0; i < resultArray.length; i++){
            if (resultArray[i].count < MINCOUNT){
                continue;
            }
            var tableRow = document.createElement("tr");
            tableRow.setAttribute("class","word-count-result");
            
            var wordField = document.createElement("td");
            wordField.setAttribute("class","result-word");
            var wordText = document.createTextNode(resultArray[i].word);
            wordField.appendChild(wordText);
            
            var countField = document.createElement("td");
            countField.setAttribute("class","result-count");
            var countText = document.createTextNode(resultArray[i].count);
            countField.appendChild(countText);
            
            tableRow.appendChild(wordField);
            tableRow.appendChild(countField);
            RESULTTABLE.appendChild(tableRow);
        } 
    } else {
        var tableRow = document.createElement("tr");
        tableRow.setAttribute("class","word-count-result");

        var noResultField = document.createElement("td");
        noResultField.setAttribute("colspan","2");

        var noResultText = document.createTextNode("No results found, try adjusting your filters.");

        noResultField.appendChild(noResultText);
        tableRow.appendChild(noResultField);
        RESULTTABLE.appendChild(tableRow);
    } 
}

function clearTable(clearTranscript){
    var existingTableRows = document.querySelectorAll("#results-table tr");
    for (let i = 0; i < existingTableRows.length; i++){
        var id = existingTableRows[i].getAttribute("id");

        if (id != "heading-row"){
            var parentElement = existingTableRows[i].parentElement;
            parentElement.removeChild(existingTableRows[i]);
        }
    }

    if (clearTranscript){
        document.querySelector(".input-container #transcript").value = "";
        document.querySelector(".input-container #transcript").focus();
    }
}

function sortTable(resultsArray) {
    var runsWithoutChange;
    var changeMade;
    var keepSorting = true;
    var arrayLoopCount = 0;

    while (keepSorting) {
        arrayLoopCount++;
        keepSorting = false;
        changeMade = false;
        for (let i = 0; i < resultsArray.length; i++){
            if (i < (resultsArray.length - 1)) {
                if (resultsArray[i].count < resultsArray[i+1].count) {
                    changeMade = true;
                    var elementToMove = resultsArray.splice(i,1);
                    resultsArray.splice((i+1),0,elementToMove[0]);
                }
            }
        }

        if (changeMade){
            keepSorting = true;
        } else {
            keepSorting = false;
        }
    }

    return resultsArray;
}

function modifyWord(word) {
    var removeSymbols = document.querySelector(".details-to-ignore #symbols").checked;
    var word = word.toLowerCase();

    if (removeSymbols){
        word = word.replace(/[^a-zA-Z ]/g,'');
    }
    return word;
}

function showCustomWordsModal(){
    document.querySelector(".words-to-remove-modal-background").style.display = "flex";
}

function hideCustomWordsModal(){
    document.querySelector(".words-to-remove-modal-background").style.display = "none";
}

document.querySelector(".input-container #transcript").focus();

document.querySelector(".results-output #clear-results").addEventListener("click",function(){clearTable(true)},false);