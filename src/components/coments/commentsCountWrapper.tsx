import { getAllComments } from '@/app/actions/comments/getComments';
import { CommentCount } from './commentCount';

export async function CommentCountWrapper() {
  const comments = await getAllComments();
  console.log(comments);
  const count = comments.length;

  return <CommentCount count={count} />;
}
