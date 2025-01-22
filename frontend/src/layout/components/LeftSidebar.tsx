import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { HomeIcon, Library } from "lucide-react"
import { Link } from "react-router-dom"


const LeftSidebar = () => {

    const isLoading = true;

    return (
        <div className="h-full flex flex-col gap-2 "
        >
            {/* Left side top */}
            <div className="rounded-lg bg-zinc-900 p-4 flex justify-center">
                <div className="space-y-2">
                    <Link to={'/'}
                        className={cn(buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-zinc-800"
                        }))}
                    >
                        <HomeIcon className="size-5" />
                        <span className="hidden md:inline">Home </span>
                    </Link>
                </div>
            </div>

            {/* Left side library section */}

            <div className="flex-1 flex-col rounded-lg bg-zinc-900 p-4">
                <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center text-white px-2">
                        <Library className="size-5" />
                        <span className="hidden md:inline">Playlists </span>
                    </div>
                </div>

                <ScrollArea className="h-[calc(100vh-300px)] ">
                    <div className="space-y-2">
                        {
                            isLoading ? (
                                <PlaylistSkeleton />
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default LeftSidebar