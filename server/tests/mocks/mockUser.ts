import shortid from 'shortid';
import User from '../../src/models/User'

export default class MockUser {
    public static readonly data = {
        admin: {
            _id: shortid.generate(),
            name: 'adminUser',
            email: 'noAdmin@test.cox',
            isAdmin: true,
        },
        noAdmin: {
            _id: shortid.generate(),
            name: 'noAdminUser',
            email: 'admin@test.cox',
            isAdmin: false,
        },
    };

    public static readonly user = {
        admin: new User(MockUser.data.admin),
        noAdmin: new User(MockUser.data.noAdmin),
    };

    public static readonly token = {
        admin: ()=>{return(MockUser.user.admin.generateAuthToken())},
        noAdmin: ()=>{return(MockUser.user.noAdmin.generateAuthToken())}
    }
}