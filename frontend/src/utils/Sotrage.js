const logout = () => {
    window.localStorage.clear();
    window.location.href = "/";
}

export { logout }