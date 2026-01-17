const ImageKit = require("imagekit");
require('dotenv').config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL,
});

async function uploadfile(file, filename) {
   const result = await imagekit.upload({
        file: file,
        fileName: filename,
    });
    return result;
}       



module.exports = ({ 
    uploadfile
})
