import Album from "../models/albumModel.js"

export const getAlbum = (req, res, next) => {
    const { albumId } = req.params
    try {
        const album = Album.findById(albumId).populate("songs")
        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            })
        }
        res.status(200).json(album)
    } catch (error) {
        next(error)
    }
}

export const getAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums)
    } catch (error) {
        next(error)
    }
}