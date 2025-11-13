import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h2 className="mb-4 text-3xl font-bold">Not Found</h2>
      <p className="mb-6">Could not find requested resource</p>
      <Link className="text-blue-600 hover:underline" href="/">
        Return Home
      </Link>
    </div>
  );
}
