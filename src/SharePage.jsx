import React from "react";

const SharePage = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    const pathSegments = window.location.pathname.split("/");
    const postIndex = pathSegments.indexOf("event");
    const id =
        postIndex !== -1 && pathSegments.length > postIndex + 1
            ? pathSegments[postIndex + 1]
            : null;

    let dynamicLink = `http://37.27.196.76/event/${id}`;

    const referrer = document.referrer;
    const isFacebook =
        referrer.includes("facebook.com") || referrer.includes("m.facebook.com");
    const noReferrer = !referrer;

    if (isMobile && (isFacebook || noReferrer)) {
        dynamicLink = `windowee://post/${id}`; // deep link
    }

    return (
        <div style={styles.body}>
            <div style={styles.contentContainer}>
                <h1 style={styles.h1}>Windowee</h1>
                <h2 style={styles.h2}>Curate Your Experiences</h2>
                <p style={styles.p}>
                    Discover and reserve the finest dining establishments, premier shows,
                    cinemas, theaters, and exclusive outdoor experiences.
                    Your world of exceptional moments, all in one place with Windowee.
                </p>

                <a
                    id="dynamic-link"
                    style={styles.button(styles.primaryButton)}
                    href={dynamicLink}
                >
                    See The Post
                </a>

                {/* Desktop Download Links */}
                {!isMobile && (
                    <div id="desktop-links" style={styles.downloadButtons}>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.windowee.app&amp;hl=el"
                            style={styles.downloadBtn(styles.android)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Android Download
                        </a>
                        <a
                            href="https://apps.apple.com/gr/app/windowee/id6740997202?l=el"
                            style={styles.downloadBtn(styles.ios)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            iOS Download
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    body: {
        fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif",
        textAlign: "center",
        background: "linear-gradient(to bottom, #4a0082, #b22266)",
        color: "white",
        minHeight: "100vh",
        margin: 0,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainer: {
        maxWidth: "800px",
        padding: "40px",
        borderRadius: "16px",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    h1: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "3.5rem",
        fontWeight: "700",
        marginBottom: "10px",
        letterSpacing: "1px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        color: "#ffffff",
    },
    h2: {
        fontSize: "1.5rem",
        fontWeight: "400",
        marginBottom: "30px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#f8f8f8",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
    },
    p: {
        fontSize: "1.1rem",
        lineHeight: "1.8",
        maxWidth: "600px",
        marginBottom: "40px",
        fontWeight: "300",
        margin: "0 auto 40px",
        color: "#ffffff",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
    },
    button: (buttonStyle) => ({
        display: "block",
        width: "100%",
        maxWidth: "350px",
        padding: "16px",
        margin: "10px auto",
        borderRadius: "50px",
        textDecoration: "none",
        fontWeight: "600",
        letterSpacing: "1px",
        textTransform: "uppercase",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
        backgroundColor: buttonStyle.backgroundColor,
        color: buttonStyle.color,
        border: buttonStyle.border || "none",
    }),
    primaryButton: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        color: "#4a0082",
        border: "none",
    },
    downloadButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginTop: "30px",
    },
    downloadBtn: (buttonStyle) => ({
        padding: "14px 24px",
        borderRadius: "50px",
        textDecoration: "none",
        fontWeight: "600",
        letterSpacing: "1px",
        textTransform: "uppercase",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        backgroundColor: buttonStyle.backgroundColor,
        color: buttonStyle.color,
        border: buttonStyle.border || "none",
        minWidth: "180px",
        textAlign: "center",
    }),
    android: {
        backgroundColor: "#5cb85c",
        color: "#ffffff",
        border: "none",
    },
    ios: {
        backgroundColor: "#000000",
        color: "#ffffff",
        border: "none",
    },
};

export default SharePage;


