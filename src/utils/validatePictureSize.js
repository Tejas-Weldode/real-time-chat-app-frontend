function checkSize(inputString) {
    // Convert the string to a Blob
    const blob = new Blob([inputString]);

    // Get the size of the Blob in bytes
    const sizeInBytes = blob.size;

    // Convert bytes to megabytes
    const sizeInMB = sizeInBytes / (1024 * 1024);

    // Check if the size is less than or equal to 15 MB
    return sizeInMB <= 15;
}

const validatePictureSize = (str) => {
    if (checkSize(str)) return true;
    return false;
};

export default validatePictureSize;
