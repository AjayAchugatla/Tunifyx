import Song from "../models/songModel.js"
import Album from "../models/albumModel.js"
import cloudinary from "../lib/cloudinary.js"

//helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
    try {
        const res = await cloudinary.uploader(file.tempFilePath, {
            resource_type: "auto"
        })
        return res.secure.url
    } catch (error) {
        console.log("Error in uploadtoCloudinary", error);

    }
}

export const addSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: "Please upload all files"
            })
        }

        const { title, artist, albumId, duration, } = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);
        const song = Song.create({
            title,
            artist,
            imageUrl,
            audioUrl,
            duration,
            albumId: albumId || null,
        })

        await song.save()
        // if a song belongs to an album, update the album's songs array
        if (albumId) {
            const al = await Album.findByIdAndUpdate(albumId, {
                $push: {
                    songs: song._id
                }
            })
        }
        res.status(201).json({
            success: true,
            song
        })
    } catch (error) {
        next(error)
    }
}

export const removeSong = async (req, res, next) => {
    try {
        const { id } = req.params;

        const song = await Song.findById(id)

        // if song belongs to an , also remove the song from the album

        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            })
        }
        await Song.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Song deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body
        const { imageFile } = req.files
        const imageUrl = await uploadToCloudinary(imageFile)
        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        })

        await album.save();

        res.status(201).json(album)
    } catch (error) {
        next(error)
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Album deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ isAdmin: true });
}