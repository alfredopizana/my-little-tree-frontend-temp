export declare type Plant = {
    nickname: String,
    plantType: String,
    description: String,
    wateringFrequency: number,
    lastWatered: Date,
    nextWatering?: Date,
    dismissedWatering?: Boolean,
    fertilizerFrequency: Number,
    lastFertilizer: Date,
    nextFertilizer?: Date,
    dismissedFertilizer?:Boolean
    imageUrl:String,
    userId?: String
}