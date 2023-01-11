import { UserSliceState } from '../../store/slices/user/types';

export const user: UserSliceState = {
    user: {
        _id: '618ebb5a6293c30f4156802a',
        email: 'test@gmail.com',
        fullname: 'Георгий Петренкo',
        password: '$2b$08$R.gsmRdXcysVzby/kzrV.Otca4eRDlCJgYR.B2Qr1H4x5q8.mglLi',
        createdAt: '2021-11-12T19:07:06.467Z',
        updatedAt: '2023-01-10T16:28:11.799Z',
        confirm_hash: '$2b$08$mNb1dRGb61OOh./IWpYDFOwRq8yDOhWCpV44iwelIKHO6B1WYRgrK',
        avatar: 'https://sample-cloud.storage.yandexcloud.net/AVATAR/0ecfda8b-3c55-49dd-be51-b3d35b7412d5.png',
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGViYjVhNjI5M2MzMGY0MTU2ODAyYSIsImlhdCI6MTY3MzM3NTAyNSwiZXhwIjoxNjc1OTY3MDI1fQ.Q4QVOA4BnxBzUSWWrabb5oduK9kB4VqAK3ix6ShpF6o',
    isAuth: false,
    samples: null,
    avatar: null,
    errorMessage: null,
};

export const payloadRegistration = { email: 'test@mgmail.com', fullname: 'georgy', password: '12345678' };

export const payloadLogin = {
    email: 'test@mgmail.com',
    password: '12345678',
};

export const userInitialState = {
    user: null,
    token: null,
    isAuth: false,
    samples: null,
    avatar: null,
    errorMessage: null,
};
