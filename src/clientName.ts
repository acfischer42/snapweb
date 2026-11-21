export function browserClientName(clientId: string, userAgent: string, platform: string, maxTouchPoints: number): string {
    let device = 'Device';
    if (/Android/i.test(userAgent)) {
        device = 'Android';
    } else if (/iPad/i.test(userAgent) || /iPad/i.test(platform) || (platform === 'MacIntel' && maxTouchPoints > 1)) {
        device = 'iPad';
    } else if (/iPod/i.test(userAgent) || /iPod/i.test(platform)) {
        device = 'iPod';
    } else if (/iPhone/i.test(userAgent) || /iPhone/i.test(platform)) {
        device = 'iPhone';
    } else if (/Windows/i.test(userAgent) || /^Win/i.test(platform)) {
        device = 'Windows';
    } else if (/CrOS/i.test(userAgent)) {
        device = 'ChromeOS';
    } else if (/Mac/i.test(userAgent) || /^Mac/i.test(platform)) {
        device = 'macOS';
    } else if (/Linux/i.test(userAgent) || /Linux/i.test(platform)) {
        device = 'Linux';
    }

    return `Snapweb ${device} - ${clientId.slice(0, 8)}`;
}
