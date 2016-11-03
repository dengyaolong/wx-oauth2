import fetch from 'node-fetch';
export default class WXOAuth2 {
    constructor(options={}) {
        if (!(this instanceof WXOAuth2)) {
            return new WXOAuth2(options);
        }
        if(options.appid === undefined) {
            throw Error('appid is required');
        }
        if(options.secret === undefined) {
            throw Error('secret is required');
        }
        this.options = options;
        this.url = {
        };
        
    }
    _accessTokenUrl(code) {
        return `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.options.appid}&secret=${this.options.secret}&code=${code}&grant_type=authorization_code`,
    }
    _userinfoUrl(access_code, openid) {
        return `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
    }
    _fetch() {
        return fetch.call(null, this.arguments)
        .then(res => res.json());
    }
    access_token(code) {
        return this._fetch(_accessTokenUrl(code)); 
    }
    userinfo(code) {
        return this._fetch(_userInfoUrl(code));
    }
    redirectUrl(redirect_uri, scope='userinfo', state='state') {
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.options.appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
    }
}
