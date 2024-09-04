// src/cookies/cookieHelper.js
import Cookies from 'js-cookie';

// Hàm lấy cookie
export function getCookie(cname) {
    return Cookies.get(cname);
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
