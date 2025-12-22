import { FontFamily } from "@/types/menu";

export const GOOGLE_FONTS: {
    label: string;
    value: FontFamily;
    css: string;
    category: "serif" | "sans" | "display";
}[] = [
        // Serif
        { label: "Playfair Display", value: "Playfair Display", css: "'Playfair Display', serif", category: "serif" },
        { label: "Merriweather", value: "Merriweather", css: "'Merriweather', serif", category: "serif" },
        { label: "Lora", value: "Lora", css: "'Lora', serif", category: "serif" },
        { label: "Libre Baskerville", value: "Libre Baskerville", css: "'Libre Baskerville', serif", category: "serif" },
        { label: "Source Serif 4", value: "Source Serif 4", css: "'Source Serif 4', serif", category: "serif" },
        { label: "Crimson Pro", value: "Crimson Pro", css: "'Crimson Pro', serif", category: "serif" },

        // Sans
        { label: "Inter", value: "Inter", css: "'Inter', sans-serif", category: "sans" },
        { label: "Poppins", value: "Poppins", css: "'Poppins', sans-serif", category: "sans" },
        { label: "Roboto", value: "Roboto", css: "'Roboto', sans-serif", category: "sans" },
        { label: "Montserrat", value: "Montserrat", css: "'Montserrat', sans-serif", category: "sans" },
        { label: "Open Sans", value: "Open Sans", css: "'Open Sans', sans-serif", category: "sans" },
        { label: "Nunito", value: "Nunito", css: "'Nunito', sans-serif", category: "sans" },
        { label: "Raleway", value: "Raleway", css: "'Raleway', sans-serif", category: "sans" },

        // Display
        { label: "Oswald", value: "Oswald", css: "'Oswald', sans-serif", category: "display" },
        { label: "DM Sans", value: "DM Sans", css: "'DM Sans', sans-serif", category: "display" },
        { label: "Archivo", value: "Archivo", css: "'Archivo', sans-serif", category: "display" },
    ];
