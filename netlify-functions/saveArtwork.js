const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { artwork } = JSON.parse(event.body);
    const filePath = path.join(__dirname, 'artwork.json');

    try {
        fs.writeFileSync(filePath, JSON.stringify({ artwork }));
        return { statusCode: 200, body: JSON.stringify({ message: 'Artwork saved successfully!' }) };
    } catch (err) {
        return { statusCode: 500, body: 'Error saving artwork' };
    }
};

