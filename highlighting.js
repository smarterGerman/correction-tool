function highlightDifferences(text2, text1) {
    const words1 = text1.trim().split(/\s+/);
    const words2 = text2.trim().split(/\s+/);

    let result = '';
    const maxLength = Math.max(words1.length, words2.length);

    for (let i = 0; i < maxLength; i++) {
      if (words1[i] !== words2[i]) {
        result += `<span class="incorrect"style="background-color: yellow" >${words2[i] || ''}</span> `;
      } else {
        result += words2[i] ? `${words2[i]} ` : ' ';
      }
    }
    if (words2 == '') {
      result = '';
    }
    if(text1 == text2.trim()){
      outputDiv = document.querySelector('#output');
      outputDiv.innerHTML = "All good.";
    }
    return result;
}