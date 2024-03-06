// script.js
document.getElementById('generateBtn').addEventListener('click', function() {
    var text = document.getElementById('textInput').value.trim();
    
    // Make API call to CLIP Drop
    var apiKey = '19aa43845c714908cb21b9918b6184115c388b239fe0f9fdf471751591a8e29666234f1a9cce9890de85b2039a375743'; // Replace with your actual API key
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
