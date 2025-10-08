import React from "react"
import Marquee from "@/src/components/Marquee.tsx"

interface KreaProps {
    children?: React.ReactNode
}

export const Krea = ({ children }: KreaProps) => {
    
    return (
        <div className="w-full relative justify-center items-center overflow-auto">
            <Marquee
                className="w-full m-4"
                baseVelocity={4}
                repeat={4}
                draggable={true}
                scrollSpringConfig={{ damping: 50, stiffness: 400 }}
                slowDownFactor={0.1}
                slowdownOnHover
                slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
                direction="left"
            >
                {children}
            </Marquee>
            <Marquee
                className="w-full m-4"
                baseVelocity={2}
                repeat={4}
                draggable={true}
                scrollSpringConfig={{ damping: 50, stiffness: 400 }}
                slowDownFactor={0.1}
                slowdownOnHover
                slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
                direction="right"
            >
                {children}
            </Marquee>
        </div>
    )
}