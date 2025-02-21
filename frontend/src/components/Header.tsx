import { UserButton } from "@clerk/clerk-react"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"


const Header = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 mb-8">
                <Link to='/' className="text-3xl"><ArrowLeft /></Link>
                <div>
                    <h1 className="text-3xl font-bold">Music Manager</h1>
                    <p className="text-zinc-400 mt-1 "> Manage your music</p>
                </div>
            </div>
            <UserButton />
        </div>
    )
}

export default Header