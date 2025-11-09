import React from "react"
import Marquee from "@/src/components/Marquee.tsx"

interface KreaProps {
    children?: React.ReactNode
    direction?: "left" | "right"
    baseVelocity?: number
}

export const Krea = ({ children, direction = "left", baseVelocity = 4 }: KreaProps) => {    
    return (
        <Marquee
            className="w-full m-4 rotate-x-5 -rotate-y-10"
            baseVelocity={baseVelocity}
            repeat={4}
            draggable={true}
            scrollSpringConfig={{ damping: 50, stiffness: 1600 }}
            slowDownFactor={0.1}
            slowdownOnHover
            slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
            dragSensitivity={0.02}
            direction={direction}
        >
            {children}
        </Marquee>
    )
}