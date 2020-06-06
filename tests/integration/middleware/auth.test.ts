import createApp from '../../../src/startup/server';
import request from 'supertest';
import { Express } from 'express';
import User from '../../../src/models/User';
import Genre from '../../../src/models/Genre';
import { environment } from '../../../src/config/config';

let app: Express;

const testGenres = [
    {
        _id: 'm6FKELe8f',
        name: 'genre1',
    }, {
        _id: 'iJ16mNFWz',
        name: 'genre2',
    }, {
        _id: 'm0TrT6rjz',
        name: 'genre3',
    },
];

describe('auth middleware', () => {
    let token: string;

    beforeEach(async () => {
        app = createApp();
        await Genre.collection.insertMany(testGenres);
        token = new User().generateAuthToken();
    });

    afterEach(async (done) => {
        await Genre.deleteMany({});
        done();
    });

    afterAll(() => {
        if(environment.nodeEnv !== "test") throw new Error("Asked to drop collection outside of test!!")
        Genre.collection.drop();});


    const exec = () => {
        return request(app)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({name: 'newGenre'});

    };

    it('should return 401 if no token is provided', async (done) => {
        token = '';
        exec().expect(401).end((err, res) => {
            done()
        } );
    });

    it('should return 400 if token is invalid', async (done) => {
        token = 'abc123';
        exec().expect(400).end((err, res) => {
            done()
        } );
    });

    it('should return 200 if token is valid', async (done) => {
        exec().expect(200).end((err, res) => {
            done()
        } );
    });
});