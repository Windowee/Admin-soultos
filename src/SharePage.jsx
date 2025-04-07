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
            <h1 style={styles.h1}>Windowee</h1>
            <h2>Here we create memories!</h2>
            <p style={styles.p}>
                Discover and reserve the best dining spots, shows, cinemas, theaters,
                and outdoor experiences. All in one place with Windowee.
            </p>

            <a
                id="dynamic-link"
                style={styles.button(styles.androidButton)}
                href={dynamicLink}
            >
                Open on app
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
                        Download for Android
                    </a>
                    <a
                        href="https://apps.apple.com/gr/app/windowee/id6740997202?l=el"
                        style={styles.downloadBtn(styles.ios)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download for iOS
                    </a>
                </div>
            )}
        </div>
    );
};

const styles = {
    body: {
        fontFamily: "Arial, sans-serif",
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
    h1: {
        fontFamily: "cursive",
        fontSize: "3rem",
    },
    p: {
        maxWidth: "600px",
        marginBottom: "30px",
    },
    button: (buttonStyle) => ({
        display: "block",
        width: "100%",
        maxWidth: "350px",
        padding: "12px",
        margin: "10px 0",
        borderRadius: "5px",
        textDecoration: "none",
        fontWeight: "bold",
        backgroundColor: buttonStyle.backgroundColor,
        color: buttonStyle.color,
    }),
    androidButton: {
        backgroundColor: "#5cb85c",
        color: "white",
    },
    iosButton: {
        backgroundColor: "#1a0a14",
        color: "white",
    },
    downloadButtons: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    downloadBtn: (buttonStyle) => ({
        padding: "12px",
        margin: "10px 0",
        borderRadius: "5px",
        textDecoration: "none",
        fontWeight: "bold",
        width: "80%",
        maxWidth: "350px",
        backgroundColor: buttonStyle.backgroundColor,
        color: buttonStyle.color,
    }),
    android: {
        backgroundColor: "#5cb85c",
        color: "white",
    },
    ios: {
        backgroundColor: "#1a0a14",
        color: "white",
    },
};

export default SharePage;

