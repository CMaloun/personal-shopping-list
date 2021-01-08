class Recipe {
    constructor(id, title, imageUri, description, s3Key) {
        this.id = id;
        this.title = title;
        this.imageUri = imageUri;
        this.description = description;
        this.s3Key = s3Key;
    }
}

export default Recipe;