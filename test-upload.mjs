const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dmitw9qcc";
const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default";

async function testUpload() {
    const formData = new FormData();
    formData.append("file", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR4nGP6zwAAZgD/J+P1eAAAAABJRU5ErkJggg==");
    formData.append("upload_preset", preset);

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
        });
        
        const text = await res.text();
        console.log("Status:", res.status);
        console.log("Response:", text);
    } catch (e) {
        console.error("Fetch threw an error:", e);
    }
}

testUpload();
