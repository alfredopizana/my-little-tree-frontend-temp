export declare type Plant = {
    nickname: string,
    plantType: string,
    description: string,
    wateringFrequency: Number,
    lastWatered: Date,
    nextWatering: Date,
    dismissedWatering: Boolean,
    fertilizerFrequency: Number,
    lastFertitlizer: Date,
    nextFertilizer: Date,
    dismissedFertilizer:Boolean
    imageUrl:string,
    userId: string
}