// function highlightDifferences(text2, text1) {
//     const words1 = text1.trim().split(/\s+/);
//     const words2 = text2.trim().split(/\s+/);

//     let result = '';
//     const maxLength = Math.max(words1.length, words2.length);

//     for (let i = 0; i < maxLength; i++) {
//       if (words1[i] !== words2[i]) {
//         result += `<span style="background-color: yellow" >${words2[i] || ''}</span> `;
//       } else {
//         result += words2[i] ? `${words2[i]} ` : ' ';
//       }
//     }

//     return result;
// }

function Send1(command) {
  // var sQuestion = txtMsg.value;
  // var sQuestion = "Can you correct the following german text and explain the mistakes?:" + txtMsg.value;
  var sQuestion = command + txtMsg.textContent;
  originalText = txtMsg.textContent;
  if (sQuestion == "") {
    alert("Type in your question!");
    txtMsg.focus();
    return;
  }

  // spMsg.innerHTML = "Chat GPT is thinking...";

  var sUrl = "https://api.openai.com/v1/completions";
  // var sModel = selModel.value;// "text-davinci-003";
  var sModel = "gpt-3.5-turbo";
  console.log(sModel);
  if (sModel.indexOf("gpt-3.5-turbo") != -1 || sModel.indexOf("gpt-4") != -1) {
    //https://openai.com/research/gpt-4
    sUrl = "https://api.openai.com/v1/chat/completions";
  }

  var oHttp = new XMLHttpRequest();
  oHttp.open("POST", sUrl);
  oHttp.setRequestHeader("Accept", "application/json");
  oHttp.setRequestHeader("Content-Type", "application/json");
  oHttp.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY);

  oHttp.onreadystatechange = function () {
    if (oHttp.readyState === 4) {
      //console.log(oHttp.status);

      spMsg.innerHTML = "";

      var oJson = {};
      if (txtMsg.value != "") txtMsg.value += "\n";

      try {
        oJson = JSON.parse(oHttp.responseText);
      } catch (ex) {
        txtMsg.value += "Error: " + ex.message;
      }

      if (oJson.error && oJson.error.message) {
        txtMsg.value += "Error: " + oJson.error.message;
      } else if (oJson.choices) {
        var s = "";

        if (oJson.choices[0].text) {
          s = oJson.choices[0].text;
        } else if (oJson.choices[0].message) {
          //GPT-4
          s = oJson.choices[0].message.content;
        }

        if (s == "") {
          s = "No response";
        } else {
          modifiedText = s;
          console.log("Original Text: " + originalText);
          console.log("Modified Text: " + modifiedText);
          console.log("original: " + originalText);
          highlightedText = highlightDifferences(originalText, modifiedText);
          // txtMsg.value += highlightedText;
          // highlightedTextDiv = document.querySelector('#highlightedTextDiv');
          editableDiv = document.querySelector(".adjustable-input");
          // highlightedTextDiv.innerHTML = highlightedText;
          editableDiv.innerHTML = highlightedText;
          console.log(s.split());
        }
      }
    }
  };

  var iMaxTokens = 2048;
  var sUserId = "1";
  var dTemperature = 0.5;

  var data = {
    model: sModel,
    prompt: sQuestion,
    max_tokens: iMaxTokens,
    user: sUserId,
    temperature: dTemperature,
    frequency_penalty: 0.0, //Number between -2.0 and 2.0
    //Positive value decrease the model's likelihood
    //to repeat the same line verbatim.
    presence_penalty: 0.0, //Number between -2.0 and 2.0.
    //Positive values increase the model's likelihood
    //to talk about new topics.
    stop: ["#", ";"], //Up to 4 sequences where the API will stop generating
    //further tokens. The returned text will not contain
    //the stop sequence.
  };

  //chat GPT-4 gpt-4
  if (sModel.indexOf("gpt-3.5-turbo") != -1 || sModel.indexOf("gpt-4") != -1) {
    data = {
      model: sModel,
      messages: [
        //{
        //    "role": "system",
        //    "content": "You are a helpful assistant."
        //                assistant messages help store prior responses
        //},
        {
          role: "user", //system,user,assistant
          content: sQuestion,
        },
      ],
    };
  }

  oHttp.send(JSON.stringify(data));

  if (txtMsg.value != "") txtMsg.value += "\n";
  // txtMsg.value += "Me: " + sQuestion;
  // txtMsg.value = "";
}

function Send2(incorrectWord) {
  // var sQuestion = txtMsg.value;
  // var sQuestion = "Can you correct the following german text and explain the mistakes?:" + txtMsg.value;
  var sQuestion =
    "Given the following text tell me why the word" +
    incorrectWord +
    "is wrong in this context and keep it short:" +
    txtMsg.textContent;
  if (sQuestion == "") {
    alert("Type in your question!");
    txtMsg.focus();
    return;
  }

  // spMsg.innerHTML = "Chat GPT is thinking...";
  outputDiv = document.querySelector("#output");
  outputDiv.innerHTML = "Smarty is thinking...";
  smartyThinkingImage = document.querySelector("#smarty-img");
  console.log(smartyThinkingImage);
  smartyThinkingImage.classList.remove("hide");

  var sUrl = "https://api.openai.com/v1/completions";
  // var sModel = selModel.value;// "text-davinci-003";
  var sModel = "gpt-3.5-turbo";
  console.log(sModel);
  if (sModel.indexOf("gpt-3.5-turbo") != -1 || sModel.indexOf("gpt-4") != -1) {
    //https://openai.com/research/gpt-4
    sUrl = "https://api.openai.com/v1/chat/completions";
  }

  var oHttp = new XMLHttpRequest();
  oHttp.open("POST", sUrl);
  oHttp.setRequestHeader("Accept", "application/json");
  oHttp.setRequestHeader("Content-Type", "application/json");
  oHttp.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY);

  oHttp.onreadystatechange = function () {
    if (oHttp.readyState === 4) {
      //console.log(oHttp.status);

      spMsg.innerHTML = "";

      var oJson = {};
      if (txtMsg.value != "") txtMsg.value += "\n";

      try {
        oJson = JSON.parse(oHttp.responseText);
      } catch (ex) {
        txtMsg.value += "Error: " + ex.message;
      }

      if (oJson.error && oJson.error.message) {
        txtMsg.value += "Error: " + oJson.error.message;
      } else if (oJson.choices) {
        var s = "";

        if (oJson.choices[0].text) {
          s = oJson.choices[0].text;
        } else if (oJson.choices[0].message) {
          //GPT-4
          s = oJson.choices[0].message.content;
        }

        if (s == "") {
          s = "No response";
        } else {
          outputDiv = document.querySelector("#output");
          outputDiv.innerHTML = "Explanation: " + s;
          // txtMsg.value += "Chat GPT: " + s;
          console.log(s.split());
        }
      }
    }
  };

  var iMaxTokens = 2048;
  var sUserId = "1";
  var dTemperature = 0.5;

  var data = {
    model: sModel,
    prompt: sQuestion,
    max_tokens: iMaxTokens,
    user: sUserId,
    temperature: dTemperature,
    frequency_penalty: 0.0, //Number between -2.0 and 2.0
    //Positive value decrease the model's likelihood
    //to repeat the same line verbatim.
    presence_penalty: 0.0, //Number between -2.0 and 2.0.
    //Positive values increase the model's likelihood
    //to talk about new topics.
    stop: ["#", ";"], //Up to 4 sequences where the API will stop generating
    //further tokens. The returned text will not contain
    //the stop sequence.
  };

  //chat GPT-4 gpt-4
  if (sModel.indexOf("gpt-3.5-turbo") != -1 || sModel.indexOf("gpt-4") != -1) {
    data = {
      model: sModel,
      messages: [
        //{
        //    "role": "system",
        //    "content": "You are a helpful assistant."
        //                assistant messages help store prior responses
        //},
        {
          role: "user", //system,user,assistant
          content: sQuestion,
        },
      ],
    };
  }

  oHttp.send(JSON.stringify(data));

  if (txtMsg.value != "") txtMsg.value += "\n";
  txtMsg.value += "Me: " + sQuestion;
  txtMsg.value = "";
}

function Send3(incorrectWord) {
  // var sQuestion = txtMsg.value;
  // var sQuestion = "Can you correct the following german text and explain the mistakes?:" + txtMsg.value;
  var sQuestion =
    "The word " +
    incorrectWord +
    " is wrong in the following sentence, could you give me a hint on what is wrong without giving me the correct answer?: " +
    txtMsg.textContent;
  if (sQuestion == "") {
    alert("Type in your question!");
    txtMsg.focus();
    return;
  }

  // spMsg.innerHTML = "Chat GPT is thinking...";
  outputDiv = document.querySelector("#output");
  outputDiv.innerHTML = "Smarty is thinking...";

  var sUrl = "https://api.openai.com/v1/completions";
  // var sModel = selModel.value;// "text-davinci-003";
  var sModel = "gpt-3.5-turbo";
  console.log(sModel);
  if (sModel.indexOf("gpt-3.5-turbo") != -1 || sModel.indexOf("gpt-4") != -1) {
    //https://openai.com/research/gpt-4
    sUrl = "https://api.openai.com/v1/chat/completions";
  }

  var oHttp = new XMLHttpRequest();
  oHttp.open("POST", sUrl);
  oHttp.setRequestHeader("Accept", "application/json");
  oHttp.setRequestHeader("Content-Type", "application/json");
  oHttp.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY);

  oHttp.onreadystatechange = function () {
    if (oHttp.readyState === 4) {
      //console.log(oHttp.status);

      spMsg.innerHTML = "";

      var oJson = {};
      if (txtMsg.value != "") txtMsg.value += "\n";

      try {
        oJson = JSON.parse(oHttp.responseText);
      } catch (ex) {
        txtMsg.value += "Error: " + ex.message;
      }

      if (oJson.error && oJson.error.message) {
        txtMsg.value += "Error: " + oJson.error.message;
      } else if (oJson.choices) {
        var s = "";

        if (oJson.choices[0].text) {
          s = oJson.choices[0].text;
        } else if (oJson.choices[0].message) {
          //GPT-4
          s = oJson.choices[0].message.content;
        }

        if (s == "") {
          s = "No response";
        } else {
          outputDiv = document.querySelector("#output");
          outputDiv.innerHTML = "Hint: " + s;
          // txtMsg.value += "Chat GPT: " + s;
          console.log(s.split());
        }
      }
    }
  };

  var iMaxTokens = 2048;
  var sUserId = "1";
  var dTemperature = 0.5;

  var data = {
    model: sModel,
    prompt: sQuestion,
    max_tokens: iMaxTokens,
    user: sUserId,
    temperature: dTemperature,
    frequency_penalty: 0.0, //Number between -2.0 and 2.0
    //Positive value decrease the model's likelihood
    //to repeat the same line verbatim.
    presence_penalty: 0.0, //Number between -2.0 and 2.0.
    //Positive values increase the model's likelihood
    //to talk about new topics.
    stop: ["#", ";"], //Up to 4 sequences where the API will stop generating
    //further tokens. The returned text will not contain
    //the stop sequence.
  };

  //chat GPT-4 gpt-4
  if (sModel.indexOf("gpt-3.5-turbo") != -1 || sModel.indexOf("gpt-4") != -1) {
    data = {
      model: sModel,
      messages: [
        //{
        //    "role": "system",
        //    "content": "You are a helpful assistant."
        //                assistant messages help store prior responses
        //},
        {
          role: "user", //system,user,assistant
          content: sQuestion,
        },
      ],
    };
  }

  oHttp.send(JSON.stringify(data));

  if (txtMsg.value != "") txtMsg.value += "\n";
  txtMsg.value += "Me: " + sQuestion;
  txtMsg.value = "";
}

function callGPT() {
  outputDiv = document.querySelector("#output");
  outputDiv.innerHTML = "";
  if (!(txtMsg.textContent == "")) {
    explanationHintsContainer = document.querySelector("#explanation-hints");
    explanationHintsContainer.classList.remove("hide");
  }
  Send1("Can you give me the corrected german text and nothing else?:");
  // Send2('Correct the following sentence. No pleasantries are necessary. Just give hints with regards to the mistakes and put it in a bulletlist. Don\'t give the correct answer.');
  // Send2('schoener');
  // Send3('Schoener is not correct in the following text. Can you give me the correct version of the word?: Es isst ein schoener Montagmorgen.');
}
