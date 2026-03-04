
// Fix isEmpty - nhận string thay vì any
export const isEmpty = (val: string | null | undefined): boolean => {
    if (val === null || val === undefined) return true;
    return val.trim() === "";
}

const isPrivateIp = (hostname: string): boolean => {
    return (
        hostname.startsWith("10.") ||
        hostname.startsWith("192.168.") ||
        hostname.startsWith("172.16.") ||
        hostname === "localhost" ||
        hostname === "127.0.0.1"
    );
};

export const isValidUrl = (val: string | null | undefined): boolean => {
    if (!val) return false;

    const trimmed = val.trim();
    if (!trimmed) return false;

    try {
        const url = new URL(trimmed);

        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return false;
        }

        if (isPrivateIp(url.hostname)) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
};