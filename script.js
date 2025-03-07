// script.js
document.getElementById('generateBtn').addEventListener('click', function() {
    var text = document.getElementById('textInput').value.trim();
    
    // Make API call to CLIP Drop
    var apiKey = '0d8b1c09003397d707115dd444182d8db4c9c55d6ff4f35c721378c24d90117d5e4127e21313d17c3a84c7d6c9953d17'; // Replace with your actual API key
    const form = new FormData();
    form.append('prompt', text);

    fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
        },
        body: form,
    })
    .then(response => response.arrayBuffer())
    .then(buffer => {
        // Convert the binary buffer to a Blob and create a URL
        var imageUrl = URL.createObjectURL(new Blob([buffer]));
        displayImage(imageUrl);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function displayImage(imageUrl) {
    var imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '<img src="' + imageUrl + '" alt="Generated Image">';
}
