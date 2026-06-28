async function shortenUrl() {
    const url = document.getElementById('urlInput').value.trim();

    const resultSection = document.getElementById('result');
    const errorBox = document.getElementById('error');

    // reset UI properly
    resultSection.hidden = true;
    errorBox.classList.remove('show');   // ✅ FIX

    if (!url) {
        alert('Please enter a URL');
        return;
    }

    try {
        const response = await fetch('/shorten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (!response.ok) {
            document.getElementById('errorText').textContent =
                'Error: ' + (data.error || 'Something went wrong');

            errorBox.classList.add('show');   // ✅ FIX
            return;
        }

        const resultUrl = document.getElementById('resultUrl');
        resultUrl.textContent = data.shortUrl;
        resultUrl.href = data.shortUrl;

        resultSection.hidden = false;

    } catch (err) {
        document.getElementById('errorText').textContent =
            'ERROR: ' + err.message;

        errorBox.classList.add('show');   // ✅ FIX
    }
}

document.getElementById('btn').addEventListener('click', shortenUrl);