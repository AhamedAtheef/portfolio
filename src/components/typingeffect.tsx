import { useState, useEffect } from "react";

const skills = ["Full Stack Developer", "MERN Stack Developer", "UI/UX Designer"];

export default function Typewriter() {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = skills[index % skills.length];

        let typingSpeed = isDeleting ? 80 : 150;

        const timeout = setTimeout(() => {
            setText((prev) =>
                isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
            );

            if (!isDeleting && text === current) {
                setTimeout(() => setIsDeleting(true), 1000); // wait before deleting
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setIndex((prev) => prev + 1);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, index]);

    return (
        <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-[2.5rem] ">
            <span className="border-r-2 border-accent pr-1">{text}</span>
        </div>
    );
}
