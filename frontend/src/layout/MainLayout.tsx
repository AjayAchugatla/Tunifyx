import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar"
import AudioPlayer from "./components/AudioPlayer"
import PlayBackControls from "./components/PlayBackControls"
import { useEffect, useState } from "react"

const MainLayout = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return window.removeEventListener("resize", checkMobile)
    }, [])
    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden">
                <AudioPlayer />
                <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={20}>
                    <LeftSidebar />
                </ResizablePanel>
                <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

                <ResizablePanel defaultSize={isMobile ? 80 : 60} >
                    <Outlet />
                </ResizablePanel>
            </ResizablePanelGroup>

            <PlayBackControls />
        </div>
    )
}

export default MainLayout