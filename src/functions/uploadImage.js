import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: `${import.meta.env.VITE_Imagekit_PUBLIC_KEY}`,
    privateKey: `${import.meta.env.VITE_Imagekit_PRIVATE_KEY}`,
    urlEndpoint: `${import.meta.env.VITE_Imagekit_UrlEndPoint}`,
});

export const uploadImage = async (uploadedFiles, folderName) => {

    try {
        const promises = uploadedFiles.map(async (file, idx) => {
            const uploadResponse = await imagekit.upload({
                file: file,
                fileName: `rvl_hotel_image-${folderName}-${idx + 1}-${Date.now()}`,
                folder: folderName,
            });
            return uploadResponse;
        });

        const results = await Promise.all(promises);
        return results;

    } catch (error) {
        console.error(error);
    }
}