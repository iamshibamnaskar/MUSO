// api.js

import axios from 'axios';

// Base URL for the backend server
const BASE_URL = 'https://muso-backend.vercel.app';

/**
 * API class for interacting with YouTube endpoints
 */
class YouTubeAPI {
    /**
     * Fetch video details by URL
     * @param {string} videoUrl - The YouTube video URL
     * @returns {Promise<object>} - The video data
     */
    static async getVideoDetails(videoUrl) {
        try {
            const response = await axios.get(`${BASE_URL}/video`, {
                params: { url: videoUrl },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching video details:', error);
            throw new Error('Failed to fetch video details.');
        }
    }

    static async getAutocompletes(search) {
        try {
            const response = await axios.get(`${BASE_URL}/autocomplete`, {
                params: { txt: search },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching video details:', error);
            throw new Error('Failed to fetch video details.');
        }
    }

    static async getSearchResults(search) {
        try {
            const response = await axios.get(`${BASE_URL}/search`, {
                params: { txt: search },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching video details:', error);
            throw new Error('Failed to fetch video details.');
        }
    }

    /**
     * Fetch trending videos (homepage content)
     * @returns {Promise<object[]>} - An array of trending video data
     */
    static async getHomepageVideos() {
        try {
            const response = await axios.get(`${BASE_URL}/homepage`);
            return response.data.videos;
        } catch (error) {
            console.error('Error fetching homepage videos:', error);
            throw new Error('Failed to fetch homepage videos.');
        }
    }
}

export default YouTubeAPI;
