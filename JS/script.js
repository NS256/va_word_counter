function countWords() {
    const TRANSCRIPTINPUT = document.querySelector(".input-container #transcript").value;

    var transcriptSplit = TRANSCRIPTINPUT.split(/\s+/);

    loopThroughTranscript(transcriptSplit);
}

function loopThroughTranscript(transcriptArray){
    var resultArray = [];

    for (let i=0; i< transcriptArray.length; i++){
        var wordExists = false;
        var transcriptWord = {
                                word: transcriptArray[i].toLowerCase(),
                                count: 1
                             };
        
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
    createResultsTable(resultArray)
}

function createResultsTable(resultArray){
    clearTable();

    const RESULTTABLE = document.querySelector(".results-output #results-table");

    //create a table row containing data for each item in result array
    for (let i = 0; i < resultArray.length; i++){
        var tableRow = document.createElement("tr");
        
        var wordField = document.createElement("td");
        var wordText = document.createTextNode(resultArray[i].word);
        wordField.appendChild(wordText)
        
        var countField = document.createElement("td");
        var countText = document.createTextNode(resultArray[i].count);
        countField.appendChild(countText);
        
        tableRow.appendChild(wordField);
        tableRow.appendChild(countField);
        RESULTTABLE.appendChild(tableRow);
    }
}

function clearTable(){
    var existingTableRows = document.querySelectorAll("#results-table tr");
    for (let i = 0; i < existingTableRows.length; i++){
        var id = existingTableRows[i].getAttribute("id");

        if (id != "heading-row"){
            var parentElement = existingTableRows[i].parentElement;
            parentElement.removeChild(existingTableRows[i]);
        }
    }
}