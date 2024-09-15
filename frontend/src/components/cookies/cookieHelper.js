// src/cookies/cookieHelper.js
import Cookies from 'js-cookie';

// Hàm lấy cookie
export function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;

}

// Hàm tạo cookie
export function setCookie(cname, cvalue, exdays) {
    Cookies.set(cname, cvalue, { expires: exdays });
}

// Hàm xóa cookie
export function deleteCookie(cname) {
    Cookies.remove(cname);
}

// Hàm xóa tất cả cookie
export function deleteAllCookies() {
    Cookies.get().forEach(cookie => {
        Cookies.remove(cookie);
    });
}
