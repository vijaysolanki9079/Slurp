import { useState } from "react";

function BlurImage({ src, placeholder, alt, height = "auto" }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div style={{ position: "relative", overflow: "hidden", height: height, width: "100%" }}>
            {/* Blur placeholder */}
            <img
                src={placeholder}
                alt={alt}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    filter: "blur(20px)",
                    transform: "scale(1.1)",
                    transition: "opacity 0.5s ease",
                    opacity: loaded ? 0 : 1,
                    objectFit: "cover",
                    zIndex: 1
                }}
            />

            {/* Real image */}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                style={{
                    width: "100%",
                    height: height === "auto" ? "auto" : "100%",
                    display: "block",
                    transition: "opacity 0.5s ease",
                    opacity: loaded ? 1 : 0,
                    objectFit: height === "auto" ? "initial" : "cover",
                    position: "relative",
                    zIndex: 2
                }}
            />
        </div>
    );
}

export default BlurImage;
