import { rest } from 'msw';
import { APIURL } from '../api';

export const handlers = [
  // Handles delete comment
  rest.delete(
    `http://localhost:3000/api/comments/:commentID`,

    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),

  rest.post(
    'http://localhost:3000/api/comments/:sessionID',

    (req, res, ctx) => {
      console.log(req.params.sessionID);
      return res(ctx.status(201));
    }
  ),

  rest.put(
    'http://localhost/to%20setup/friends/request/:requestID',
    (req, res, ctx) => {
      console.log(req.params.requestID);
      return res(ctx.status(200));
    }
  ),
];
