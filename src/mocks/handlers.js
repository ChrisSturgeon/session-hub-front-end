import { rest } from 'msw';
import { APIURL } from '../api';

export const handlers = [
  // Handles delete comment
  rest.delete(
    `${APIURL}/comments/:commentID`,

    (req, res, ctx) => {
      console.log(req.params.commentID);
      return res(ctx.status(200));
    }
  ),
];
