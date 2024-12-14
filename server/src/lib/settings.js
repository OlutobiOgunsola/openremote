const ROUTE_INDEX = {
    AUTH: "/auth",
    USER: "/users",
    MESSAGE: "/messages"
};

const ROUTES = {
    SIGNUP: `/signup`,
    SIGNIN: `/signin/:email`,
    GET_USER: `/:identifier`,
    GET_USERS: `/`,
    GET_USERS_SIDEBAR: `/sidebar`,
    POST_MESSAGE: `/`,
    READ_MESSAGE: `/:message_id`,
    GET_MESSAGES: `/`,
    GET_LAST_MESSAGE: '/end/:contact_id',
    GET_CONTACT_MESSAGES: '/:contact_id'
};

const RESPONSE_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    UNAUTHENTICATED: 401,
    FORBIDDEN: 403,
    MALFORMED_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    INTERNAL_ERROR: 500
};

const RESPONSE_STATUS = {
    SUCCESS: "success",
    FAILURE: "failure"
};

const RESPONSE = {
    SUCCESS: {
        code: RESPONSE_CODES.SUCCESS,
        status: RESPONSE_STATUS.SUCCESS
    },
    FAILURE: {
        code: RESPONSE_CODES.SERVER_ERROR,
        status: RESPONSE_STATUS.FAILURE
    }
};

module.exports = {
    ROUTE_INDEX, ROUTES, RESPONSE_CODES, RESPONSE_STATUS, RESPONSE
};