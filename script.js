// TODO: the editable div is not adjusted accordingly. 
function adjustInputSize(div) {
    const lineHeight = parseInt(getComputedStyle(div).lineHeight);
    const minHeight = parseInt(getComputedStyle(div).minHeight);

    // Calculate the height based on the content
    const contentHeight = div.scrollHeight;

    // Increase the div height if needed
    const newHeight = Math.max(minHeight, contentHeight);
    console.log("new height = " + newHeight);
    console.log("scroll height = " + div.scrollHeight);
    div.style.height = newHeight + 'px';
}




function updateLineNumbers(div, lines) {
    let lineNumberContainer = document.querySelector(".line-numbers");
    let lineCount = 0; // Initialize the line count to 0
    let lineHeight = parseInt(getComputedStyle(div).lineHeight);

    // Calculate the div's width
    const divWidth = div.clientWidth;

    // Calculate the maximum number of characters per line
    const maxCharsPerLine = Math.floor(divWidth / (div.scrollWidth / div.cols));

    // Calculate the number of lines based on word wrapping
    for (let i = 0; i < lines.length; i++) {
        lineCount += Math.ceil(lines[i].length / maxCharsPerLine);
    }

    // Generate the line numbers content
    let lineNumbersHTML = '';
    for (let i = 1; i <= lineCount; i++) {
        lineNumbersHTML += '<div style="line-height: ' + lineHeight + 'px;">' + i + '</div>';
    }

    // Set the line numbers content and update the container height
    lineNumberContainer.innerHTML = lineNumbersHTML;
    lineNumberContainer.style.height = div.style.height;
}

function updateWordCount() {
    const div = document.querySelector('.adjustable-input');

    totalWords = 0;
    const text = div.innerText.trim();
    if (text !== '') {
        totalWords = text.split(/\s+/).length;
    }
    const wordCountRow = document.getElementById('wordCountRow');
    wordCountRow.textContent = `${totalWords} words`;
}

// Update the word count initially
updateWordCount();

function handleCopyButtonClick() {
    const div = document.querySelector('.adjustable-input');
    let formattedText = div.textContent;

    // Copy the formatted text to the clipboard
    copyToClipboard(formattedText);
    showCopiedPopup();
}

function showCopiedPopup() {
    const copiedPopup = document.getElementById('copiedPopup');
    copiedPopup.style.display = 'block';
    setTimeout(() => {
        copiedPopup.style.display = 'none';
    }, 1500);
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', handleCopyButtonClick);

// Explain and Hint Buttons
let explanationActive = false;
let hintActive = false;
explainButton = document.querySelector('#explainButton');
hintButton = document.querySelector('#hintButton');
function enableExplanation() {
    const spanElements = document.querySelectorAll('.incorrect');
// TODO: Indicate which button is active by giving it a different color
    if (!explanationActive) {
        explainButton.style.backgroundColor = '#F0C945';
        // Remove hint event listeners if active
        if (hintActive) {
            disableHint();
        }

        spanElements.forEach((span) => {
            const newSpan = span.cloneNode(true);
            span.parentNode.replaceChild(newSpan, span);
            newSpan.style.cursor = 'pointer';
            newSpan.addEventListener('click', handleExplanation);
        });

        explanationActive = true;
    } else {
        spanElements.forEach((span) => {
            span.style.cursor = 'default';
            span.removeEventListener('click', handleExplanation);
        });

        explanationActive = false;
    }
}

function enableHint() {
    const spanElements = document.querySelectorAll('.incorrect');

    if (!hintActive) {
        hintButton.style.backgroundColor = '#F0C945';
        // Remove explanation event listeners if active
        if (explanationActive) {
            disableExplanation();
        }

        spanElements.forEach((span) => {
            const newSpan = span.cloneNode(true);
            span.parentNode.replaceChild(newSpan, span);
            newSpan.style.cursor = 'pointer';
            newSpan.addEventListener('click', handleHint);
        });

        hintActive = true;
    } else {
        spanElements.forEach((span) => {
            span.style.cursor = 'default';
            span.removeEventListener('click', handleHint);
        });

        hintActive = false;
    }
}

function disableExplanation() {
    explainButton.style.backgroundColor = '#FF7486';
    const spanElements = document.querySelectorAll('.incorrect');
    spanElements.forEach((span) => {
        span.style.cursor = 'default';
        span.removeEventListener('click', handleExplanation);
    });
    explanationActive = false;
}

function disableHint() {
    hintButton.style.backgroundColor = '#FF7486';
    const spanElements = document.querySelectorAll('.incorrect');
    spanElements.forEach((span) => {
        span.style.cursor = 'default';
        span.removeEventListener('click', handleHint);
    });
    hintActive = false;
}


function handleExplanation(event) {
    const clickedSpan = event.target;
    Send2(clickedSpan.textContent);
    console.log('I am giving an explanation: Clicked span:', clickedSpan.textContent);
}


function handleHint(event) {
    const clickedSpan = event.target;
    Send3(clickedSpan.textContent);
    console.log('I am giving a hint: Clicked span:', clickedSpan.textContent);
}