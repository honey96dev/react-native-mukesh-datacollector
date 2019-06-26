interface UserProfile {
    accessToken?: string,
    role: string,
}

interface Server {
    isDeveloping: boolean,
    baseUrl: string,
}

const isValidEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
    if (email.length == 0 || !re.test(email)) {
        return false;
    } else {
        return true;
    }
};

export default class G {
    static Server: Server = {isDeveloping: true, baseUrl: 'http://192.168.200.16:3000/'};
    static UserProfile: UserProfile = {role: ''};
    static isValidEmail = isValidEmail;
}
