import { getAllComments } from '@/app/actions/comments/getComments';
import { CommentCount } from './commentCount';

export async function CommentCountServer() {
  const comments = await getAllComments();
  const count = comments.length;

  return <CommentCount count={count} />;
}
