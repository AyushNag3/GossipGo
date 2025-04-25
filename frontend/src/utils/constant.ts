
export const Host = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTES = "api/auth"
export const Signup = `${AUTH_ROUTES}/signup`
export const get_user_info = `${AUTH_ROUTES}/userinfo` ;
export const update_profile_info = `${AUTH_ROUTES}/profile` ;
export const add_profile_img = `${AUTH_ROUTES}/add-profile-img` ;