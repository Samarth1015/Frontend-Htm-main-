export default function NewsCard({ data }) {
  console.log(data);
  return (
    <a href={data.url}>
      <div>
        <div
          className="card card-compact bg-base-100 w-96 shadow-sm
         shadow-cyan-100 border-collapse"
        >
          <figure>
            <img className="h-72 w-96" src="/new logo.jpg" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title ">
              <span className="font-extrabold underline">Author:</span>{" "}
              {data.author}
            </h2>
            <p>
              <span className="font-extrabold underline">Title: </span>
              {data.title}
            </p>
            <div className="card-actions justify-end">
              <p>
                <span className="font-extrabold underline">published at:</span>{" "}
                {new Date(data.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
