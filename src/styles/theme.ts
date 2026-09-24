const breakpoints = {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
};

const theme = {
    colors: {
        primary: "#005bff",
        secondary: "#6c757d",
        success: "#4caf50",
        warning: "#ff9800",
        error: "#f44336",
        info: "#2196f3",
        text: {
            gray1: "rgba(0,26,52,0.6)",
        },
    },
    breakpoints,
    media: {
        xs: `(max-width: ${breakpoints.xs})`,
        sm: `(max-width: ${breakpoints.sm})`,
        md: `(max-width: ${breakpoints.md})`,
        lg: `(max-width: ${breakpoints.lg})`,
        xl: `(max-width: ${breakpoints.xl})`,
        "2xl": `(max-width: ${breakpoints["2xl"]})`,
    },
};

export default theme;
