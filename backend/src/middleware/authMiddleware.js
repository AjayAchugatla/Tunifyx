import { clerkClient } from "@clerk/express"

export const protectRoute = async (req, res, next) => {
    if (!req.auth.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised - you must be logged in"
        })
    }
    next()
}


export const requireAdmin = async (req, res, next) => {
    try {
        const curUser = await clerkClient.users.getUser(req.auth.userId)
        const isAdmin = process.env.ADMIN_EMAIL === curUser.primaryEmailAddress?.emailAddress

        if (!isAdmin) {
            return res.status(401).json({
                success: false,
                message: "Unauthorised - you must be an admin "
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}