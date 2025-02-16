import { create } from "zustand";
import { Song } from "@/types";

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        })
    },

    playAlbum(songs: Song[], startIndex = 0) {
        if (songs.length === 0) return;
        const song = songs[startIndex];
        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true
        })
    },
    setCurrentSong(song: Song | null) {
        if (!song) return;

        const songIndex = get().queue.findIndex(s => s._id === song._id)

        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex
        })
    },
    togglePlay() {
        set({
            isPlaying: !get().isPlaying
        });
    },

    playNext() {
        const { currentIndex, queue } = get()
        const next = currentIndex + 1;

        if (next < queue.length) {
            const nextSong = queue[next];
            set({
                currentSong: nextSong,
                currentIndex: next,
                isPlaying: true
            })
        } else {
            set({
                currentIndex: 0,
                currentSong: queue[0],
                isPlaying: true
            })
        }
    },

    playPrevious() {
        const { currentIndex, queue } = get()
        const prev = currentIndex - 1;

        if (prev > -1) {
            const prevSong = queue[prev];
            set({
                currentSong: prevSong,
                currentIndex: prev,
                isPlaying: true
            })
        } else {
            const n = queue.length
            set({
                currentIndex: n - 1,
                currentSong: queue[n - 1],
                isPlaying: true
            })
        }
    },
}))

