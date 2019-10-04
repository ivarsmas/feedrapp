const tracking = require("../tracking");
const showAdThreshold = 250;

const redisAds = module.exports = {
    trackSupportRequest() {
        tracking.track('feedr-ads', 'requestsSinceLastAd')
    },

    async getRequestsSinceLastAd() {
        return JSON.parse(await tracking.get('feedr-ads', 'requestsSinceLastAd')) || 0;
    },

    async aboveThreshold() {
        return (await redisAds.getRequestsSinceLastAd()) >= showAdThreshold;
    },

    async reset() {
        return await tracking.client.hset('feedr-ads', 'requestsSinceLastAd', 0);
    }
};