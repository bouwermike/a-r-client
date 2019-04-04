const isImage = (files) => {
    let mimeType = files[0]['type']
    console.log(mimeType);

}

const newFileSelected = async (event) => {
    let reader = new FileReader();
    reader.addEventListener("loadend", async () => {
        let image = reader.result;
        console.log(image);
    });

    reader.readAsText(event.target.files[0]);
}


module.exports = {
    isImage
}