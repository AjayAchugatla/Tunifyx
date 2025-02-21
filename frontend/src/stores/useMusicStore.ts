import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import { create } from "zustand"

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];
    stats: Stats


    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (albumId: string) => Promise<void>;
    fetchfeaturedSongs: () => Promise<void>;
    fetchmadeForYouSongs: () => Promise<void>;
    fetchtrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    featuredSongs: [],
    madeForYouSongs: [],
    trendingSongs: [],
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtists: 0,
    },

    fetchAlbums: async () => {
        set({
            isLoading: true,
            error: null,
        });
        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: response.data })
            set({ isLoading: false })
        } catch (error: any) {
            set({ error: error.response.data.message })
        }
    },

    fetchAlbumById: async (albumId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${albumId}`);
            set({ currentAlbum: response.data })
            set({ isLoading: false })
        } catch (error: any) {
            set({ error: error.response.data.message })
        }
    },

    fetchfeaturedSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/featured");
            set({ featuredSongs: response.data })
        } catch (error: any) {
            set({ error: error.response.data.message })
        } finally {
            set({ isLoading: false })
        }
    },

    fetchmadeForYouSongs: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get("/songs/made-for-you")
            set({ madeForYouSongs: response.data })
        } catch (error: any) {
            set({ error: error.response.data.message })
        } finally {
            set({ isLoading: false })
        }
    },
    fetchtrendingSongs: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get("/songs/trending")
            set({ trendingSongs: response.data })
        } catch (error: any) {
            set({ error: error.response.data.message })
        } finally {
            set({ isLoading: false })
        }
    },

    fetchStats: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get("/stats")
            set({ stats: response.data })
        } catch (error: any) {
            set({ error: error.response.data.message })
        } finally {
            set({ isLoading: false })
        }
    },

    fetchSongs: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get("/songs")
            set({ songs: response.data })
        } catch (error: any) {
            set({ error: error.response.data.message })
        } finally {
            set({ isLoading: false })
        }
    },
}))