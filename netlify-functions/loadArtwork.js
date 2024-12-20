const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    const filePath = path.join(__dirname, '..', 'data', 'artwork.json');

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return { statusCode: 200, body: data };
    } catch (err) {
        return { statusCode: 500, body: 'Failed to load artwork' };
    }
};
