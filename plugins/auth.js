
export function isUser($router) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        if (user.email === "edhapp.edu@gmail.com") {
            $router.push("/admin");
            return false;
        } else {
            return true;
        }
    } else {
        $router.push("/login");
        return false;
    }
}

export function isAdmin($router) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        if (user.email !== "edhapp.edu@gmail.com") {
            $router.push("/");
            return false;
        } else {
            return true;
        }
    } else {
        $router.push("/login");
        return false;
    }
}

export function isLogout($router) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        if (user.email !== "edhapp.edu@gmail.com") {
            $router.push("/");
            return false;
        } else {
            $router.push("/admin");
            return false;
        }
    }
    else {
        return true;
    }
}