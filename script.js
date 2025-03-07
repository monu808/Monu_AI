const API_KEY = '0d8b1c09003397d707115dd444182d8db4c9c55d6ff4f35c721378c24d90117d5e4127e21313d17c3a84c7d6c9953d17';
const ENDPOINTS = {
    'text-to-image': 'https://clipdrop-api.co/text-to-image/v1',
    'cleanup': 'https://clipdrop-api.co/cleanup/v1',
    'upscale': 'https://clipdrop-api.co/image-upscaling/v1',
    'depth-estimation': 'https://clipdrop-api.co/portrait-depth-estimation/v1',
    'surface-normals': 'https://clipdrop-api.co/portrait-surface-normals/v1',
    'product-photo': 'https://clipdrop-api.co/product-photography/v1',
    'reimagine': 'https://clipdrop-api.co/reimagine/v1',
    'remove-bg': 'https://clipdrop-api.co/remove-background/v1',
    'remove-text': 'https://clipdrop-api.co/remove-text/v1',
    'replace-bg': 'https://clipdrop-api.co/replace-background/v1',
    'text-inpainting': 'https://clipdrop-api.co/text-inpainting/v1',
    'uncrop': 'https://clipdrop-api.co/uncrop/v1'
};

document.getElementById('generateBtn').addEventListener('click', async () => {
    const mode = document.getElementById('modeSelect').value;
    const text = document.getElementById('textInput').value.trim();
    const fileInput = document.getElementById('fileInput');
    
    showLoading(true);

    try {
        const form = new FormData();
        
        // Handle different endpoint requirements
        if (mode === 'text-to-image') {
            form.append('prompt', text);
        } else {
            if (!fileInput.files[0]) throw new Error('Please upload an image');
            form.append('image_file', fileInput.files[0]);
            
            if (['replace-bg', 'text-inpainting'].includes(mode)) {
                form.append('prompt', text);
            }
        }

        const response = await fetch(ENDPOINTS[mode], {
            method: 'POST',
            headers: { 'x-api-key': API_KEY },
            body: form,
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const buffer = await response.arrayBuffer();
        const imageUrl = URL.createObjectURL(new Blob([buffer]));
        displayImage(imageUrl);
        
    } catch (error) {
        alert(`Error: ${error.message}`);
    } finally {
        showLoading(false);
    }
});

function displayImage(imageUrl) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
}

function showLoading(show) {
    const spinner = document.querySelector('.loading-spinner');
    spinner.style.display = show ? 'block' : 'none';
}

// Dynamic UI handling
document.getElementById('modeSelect').addEventListener('change', () => {
    const mode = document.getElementById('modeSelect').value;
    const textInput = document.getElementById('textInput');
    const uploadLabel = document.getElementById('uploadLabel');
    
    // Show/hide elements based on mode
    textInput.style.display = mode === 'text-to-image' ? 'block' : 'none';
    uploadLabel.style.display = mode === 'text-to-image' ? 'none' : 'block';
});
