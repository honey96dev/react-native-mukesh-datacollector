interface UserProfile {
    accessToken?: string,
    data: any,
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
    // static Server: Server = {isDeveloping: true, baseUrl: 'http://192.168.200.16:3000'};
    // static Server: Server = {isDeveloping: false, baseUrl: 'http://139.180.195.22'};
    static Server: Server = {isDeveloping: false, baseUrl: 'http://10.1.99.247'};
    static axiosTimeout: number = 15000;
    static UserProfile: UserProfile = {data: {}};
    static isValidEmail = isValidEmail;
}
