export const signUp = (user) => (
    $.ajax({
        method: 'post',
        url: '/api/users',
        data: { user } 
    })
);

export const logIn = (user) => (
    $.ajax({
        method: 'post',
        url: '/api/session',
        data: { user } 
    })
);

export const validateEmail = (email) => (
    $.ajax({
        method: 'patch',
        url: `/api/valid_email`,
        data: { email }
    })
);

export const updateUser = (user) => (
    $.ajax({
        method: 'patch',
        url: `/api/users/${user.id}`,
        data: { user }
    })
);

export const logOut = () => (
    $.ajax({
        method: 'delete',
        url: '/api/session'
    })
);