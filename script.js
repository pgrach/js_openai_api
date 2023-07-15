async function getResponse() { // define an asynchronous function (it can perform operations that might take some time to complete without blocking the rest of your code from executing)
    const input = document.getElementById("userInput").value; // retrieve the current value of the input element
    
    // Next line is calling the fetch() function, 
    // which is a built-in function in JavaScript used for making HTTP requests. 
    // fetch() returns a Promise, which is an object 
    // that represents the eventual completion or failure of an asynchronous operation. 
    // The keyword await makes JavaScript wait until the Promise settles and returns its result. 
    // In this case, it's used to wait for the API call to OpenAI to complete.

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", // this method is used because we want to send our question to the server (to OpenAI's API)
        headers: { // this object includes HTTP headers that I want to include with my request
            "Content-Type": "application/json", // tells the server that I am sending JSON data
            "Authorization": "Bearer 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" // how you provide your OpenAI API key for authentication. Replace YOUR_OPENAI_KEY with my actual key (SECURITY ISSUE)
        },
        body: JSON.stringify({ // The data that I am sending to the server. We convert the JS object into a JSON string
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "system", "content": "You are a helpful assistant." },
                { "role": "user", "content": input }
            ]
        })
    })

    const data = await response.json() 
    // response.json() is a method that reads the response body to completion 
    // and returns a promise that resolves with the result of parsing the body text as JSON. 
    // The await keyword is used to wait for the Promise to settle.
    console.log(data)



    // Display the assistant's response
    document.getElementById("chatOutput").innerHTML += `<p>${data.choices[0].message.content}</p>`
}