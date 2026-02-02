"use client";

import { useEffect, useRef } from "react";

interface ModelViewerProps {
    src: string;
    poster?: string;
    alt?: string;
}

const ModelViewer = ({ src, poster, alt }: ModelViewerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Dynamically load the model-viewer script
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden glass border border-white/10 relative">
            {/* Fallback/Loading message if script not yet loaded or not supported */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 -z-10">
                جاري تحميل العرض ثلاثي الأبعاد...
            </div>

            <model-viewer
                src={src}
                ios-src=""
                poster={poster}
                alt={alt || "3D Model"}
                shadow-intensity="1"
                camera-controls
                auto-rotate
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-orbit="45deg 55deg 2.5m"
                style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
            >
                <button slot="ar-button" className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                    عرض في غرفتك (AR)
                </button>
            </model-viewer>
        </div>
    );
};

export default ModelViewer;
