import User from '../models/user.model';
import User_Core from '../core/user';


export default class User_Classe {
    
    static async register(user: User) {
        try {
            const pwd = user.password;
            const newuser = await User_Core.register(user);
            const token = await User_Core.login(newuser.email, pwd);
            newuser.password = "";
            return {token, user: newuser};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async login(email: string, password: string) {
        try {
            const token = await User_Core.login(email, password);
            const user = await User_Core.getByToken(token);
            return {token, user};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}