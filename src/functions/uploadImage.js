import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: 'public_ckIhiN3Di+ZHIFF6aPozfEMYwhQ=',
    privateKey: 'private_BC4VixtIwlbn5CuOZUqbjRRSulQ=',
    urlEndpoint: 'https://ik.imagekit.io/nz0ptgnila',
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