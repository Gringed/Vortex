import { PostSkeleton } from "../src/features/post/PostSkeleton";

export default function loader() {
  return (
    <>
      <div
        className="divide-y divide-muted border-r border-l border-secondary"
        style={{ flex: 1 }}
      >
        {Array.from({ length: 20 }).map((_, index) => {
          return <PostSkeleton key={index} />;
        })}
      </div>
      <div className="flex-1  break-all ">
        <h2>Chargement</h2>
      </div>
    </>
  );
}
