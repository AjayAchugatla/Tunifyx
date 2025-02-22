import { Music } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import AlbumsTable from "./AlbumsTable"
import AddAlbumDialog from "./AddAlbumDialog"


const AlbumTabContent = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Music className="size-5 text-emerald-500" />
                            Albums Library
                        </CardTitle>
                        <CardDescription>Manage your Albums</CardDescription>
                    </div>
                    <AddAlbumDialog />
                </div>
            </CardHeader>
            <CardContent>
                <AlbumsTable />
            </CardContent>
        </Card>
    )
}

export default AlbumTabContent